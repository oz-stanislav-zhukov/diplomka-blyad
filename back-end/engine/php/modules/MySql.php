<?php
namespace ozLEngine\Core;

class MySql {
	private \MySQLi $connect;
	private array $tables;
	private float $start_in;
 
	public function __construct(MySqlConnect $connect, bool $allow_exit = false) {
    $this->start_in = microtime(true);
		$this->Connect($connect, $allow_exit);
	}
	
	private function Connect(MySqlConnect $connect, bool $allow_exit = false) : void {
    //Debug::log("MySQL connecting", [time()]);

    try{
      $this->connect = new \MySQLi($connect->host, $connect->user, $connect->pass, $connect->database, $connect->port);
    } catch(\mysqli_sql_exception  $e){
      if($allow_exit) Session::Error('db_connection_failed', 'Failed to connect to database.');
      throw new ozException('Failed to connect to database. ('.$e->getMessage().')', '', $e->getCode());
    }

    $this->connect->set_charset($connect->charset);
    $this->LoadTables();
	}
	
	private function LoadTables() : bool {
		if(!$this->isConnected()) return false;
		$tables = $this->connect->query("SELECT * FROM tables");
		foreach($tables as $table) $this->tables[$table['name']] = $table['table'];
    $ms = round(microtime(true)-$this->start_in, 3);
    Debug::log("MySQL connected in $ms ms!", [time()]); //, $this->tables);
    return true;
	}
	
	public function getTableName(string $name) : string {
		if(isset($this->tables[$name])) return $this->tables[$name];
		return $name;
	}
	
	public function isConnected() : bool {
		if (!$this->connect) return false;
		return true;
	}
	
	/*
		Sql Methods
	*/
	public function Delete(string $table, array $data) : \mysqli_result|bool|null {
		if(!$this->isConnected()) return false;
		$table = $this->getTableName($table);
		$data = $this->parseMysqlDataDelete($data);
		
		return $this->connect->query("DELETE FROM $table WHERE $data");
	}
	
	public function Insert(string $table, array $data) : \mysqli_result|bool|null {
		if(!$this->isConnected()) return false;
		$table = $this->getTableName($table);
		$data = $this->parseMysqlData($data);
		
		return $this->connect->query("INSERT INTO $table ($data[0]) VALUE ($data[1])");
	}
	
	public function Update(string $table, string $wc, string $wv, array $data) : \mysqli_result|bool|null {
		if(!$this->isConnected()) return false;
		$table = $this->getTableName($table);
		$data = $this->parseMysqlDataOneLine($data);
		
		$wc = $this->AntiSqlInjection($wc);
		$wv = $this->AntiSqlInjection($wv);
		return $this->connect->query("UPDATE $table SET $data WHERE `$wc` = '$wv'");
	}
	
	public function Select(string $table, string $column, string $value, bool $to_array = true) : \mysqli_result|bool|array|null {
		if(!$this->isConnected()) return false;
		$table = $this->getTableName($table);
		
		$value = $this->AntiSqlInjection($value);
		$result = $this->connect->query("SELECT * FROM $table WHERE `$column` = '$value'");
    
		if($result->num_rows == 0) return false;
		if($to_array) return $result->fetch_array();
		return $result;
	}
	
	public function SelectIn(string $table, string $column, string|array $values, bool $to_array = true) : \mysqli_result|bool|array|null {
		if(!$this->isConnected()) return false;
		if(!$table || !$column || !$values) return false;
		$table = $this->getTableName($table);
		
		if(is_array($values)){
			$pvalues = "";
			foreach($values as $value){ $pvalues .= "'".$this->AntiSqlInjection($value)."',"; }
			$pvalues = substr($pvalues,0,-1);
		} else { $pvalues = $this->AntiSqlInjection($values); }
		
		$result = $this->connect->query("SELECT * FROM $table WHERE `$column` IN ($pvalues)");
		if($result->num_rows == 0) return false;
		
		if($to_array) return $result->fetch_array();
		return $result;
	}
	
	public function SelectLike(string $table, string $column, string $value, bool $to_array = true) : \mysqli_result|bool|array|null {
		if(!$this->isConnected()) return false;
		$table = $this->getTableName($table);
		
		$result = $this->connect->query("SELECT * FROM $table WHERE `$column` LIKE '%$value%'");
		if($result->num_rows == 0) return false;
		
		if($to_array) return $result->fetch_array();
		return $result;
	}
	
	public function SelectAll(string $table, bool|int $limit = false, bool $to_array = false) : \mysqli_result|bool|array|null {
		if(!$this->isConnected()) return false;
		$table = $this->getTableName($table);

		if(!$limit) $result = $this->connect->query("SELECT * FROM $table");
		else $result = $this->connect->query("SELECT * FROM $table ORDER BY id DESC LIMIT $limit;");
		if($result->num_rows == 0) return false;

		if($to_array) return $result->fetch_array();
		return $result;
	}
	
	public function SelectData(string $table, array $data, bool $to_array = true, int $limit = 0, int $offset = 0, string|null $desc = null, bool $use_or = false) : \mysqli_result|bool|array|null {
		if(!$this->isConnected()) return false;
		$table = $this->getTableName($table);
		if($use_or) { $data = $this->parseMysqlDataOR($data); $q = "SELECT * FROM $table WHERE $data"; }
		else { $data = $this->parseMysqlData($data); $q = "SELECT * FROM $table WHERE ($data[0]) = ($data[1])"; }
		
		if($desc) $q .= " ORDER BY `$desc` DESC";
		if($limit) $q .= " LIMIT $offset,$limit";
		
		$result = $this->connect->query($q);
		if($result->num_rows == 0) return false;
		if($to_array) return $result->fetch_array();
		return $result;
	}
	
	public function IsExistsRecord(string $table, string $column, string $value) : bool {
		if(!$this->isConnected()) return false;
		$table = $this->getTableName($table);
		
		$value = $this->AntiSqlInjection($value);
		$result = $this->connect->query("SELECT * FROM $table WHERE `$column` = '$value'");
		if($result->num_rows == 0) return false;
		return true;
	}
	
	public function GetInsertID(bool|\MySQLi $connect = null) : \mysqli_result|bool|null|int|string {
		if(!$connect) $connect = $this->connect;
		return $connect->insert_id;
	}
	
	public function RunMysqlCode(string $code, bool $getid = false) : \mysqli_result|bool|null|int|string {
		if(!$this->isConnected()) return false;
		$run = $this->connect->query($code);
		if($getid) return $this->connect->insert_id;
		return $run;
	}
	
	public function GetConnect() : \MySQLi {
		return $this->connect;
	}
	
	/*
		Special Methods
	*/
	public function AntiSqlInjection(string $data) : string {
		$data = isset($data) ? str_replace("'", '', $data) : $data;
		$data = $this->connect->real_escape_string($data);
		return $data;
	}
	
	private function parseMysqlData(array $data) : array {
		$column = ""; $value = "";
		
		foreach ($data as $key => $v){
			$column .= "`".$this->AntiSqlInjection($key)."`,";
			$value .= "'".$this->AntiSqlInjection($v)."',";
		}
		
		$column = substr($column, 0, -1);
		$value = substr($value, 0, -1);
		
		return array($column, $value);
	}
	
	private function parseMysqlDataOneLine(array $data) : string {
		$value = "";
		foreach ($data as $key => $v){ $value .= "`".$this->AntiSqlInjection($key)."` = '".$this->AntiSqlInjection($v)."',"; }
		$value = substr($value, 0, -1);
		return $value;
	}
	
	private function parseMysqlDataDelete(array $data) : string {
		$value = "";
		foreach ($data as $key => $v){ $value .= "`".$this->AntiSqlInjection($key)."` = '".$this->AntiSqlInjection($v)."' AND "; }
		$value = substr($value, 0, -5);
		return $value;
	}
	
	private function parseMysqlDataOR(array $data) : string {
		$value = "";
		foreach ($data as $key => $v){ $value .= "`".$this->AntiSqlInjection($key)."` = '".$this->AntiSqlInjection($v)."' OR "; }
		$value = substr($value, 0, -4);
		return $value;
	}
}

class MySqlConnect {
  public function __construct(
    public string $database = 'edu_system',
    public string $user = 'root',
    public string $pass = '',
    public string $prefix = 'edu_',
    public string $host = 'localhost',
    public int|null $port = 3306,
    public MySqlDriver $driver = MySqlDriver::MySQLi,
    public string $charset = 'utf8mb4'
  ) {
		$this->database = $database;
		$this->user = $user;
		$this->pass = $pass;
		$this->host = $host;
		$this->port = $port;
		$this->prefix = $prefix;
		$this->driver = $driver;
		$this->charset = $charset;
	}
}

enum MySqlDriver: string {
  case MySQLi = "mysqli";
  case PDO = "pdo_mysql";
  
  public static function getDriver($name) : MySqlDriver
  {
    return match ($name) {
      'mysqli' => self::MySQLi,
      'pdo_mysql' => self::PDO
    };
  }
}