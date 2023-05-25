<?php
namespace ozLEngine\Core;

class Settings {
	public static $domain = ['', '', ''];

  public static function register() : bool {
    global $_CONFIG;
    date_default_timezone_set($_CONFIG['SERVER_TIMEZONE']);
		mb_internal_encoding($_CONFIG['SERVER_ENCODING']);
		
		Core::$MySql = new MySql(new MySqlConnect(
			$_CONFIG['DATABASE']['name'],
			$_CONFIG['DATABASE']['user'],
			$_CONFIG['DATABASE']['pass'],
			$_CONFIG['DATABASE']['prefix'],
			$_CONFIG['DATABASE']['host'],
			$_CONFIG['DATABASE']['port'],
			MySqlDriver::getDriver($_CONFIG['DATABASE']['driver']),
			$_CONFIG['DATABASE']['charset']
		), true);

		if(!self::NextSettings()) return false;
    //Debug::log("Settings started!", [time()]);
		return true;
  }
	
	/**
  *  Other Settings
	*/
	private static function NextSettings() : bool {
    global $_CONFIG;
		$_CONFIG['SERVER_HTTPS'] = isset($_SERVER['HTTPS']) ? $_SERVER['HTTPS'] : false;
		$_CONFIG['SERVER_NAME'] = $_SERVER['SERVER_NAME'];
		$_CONFIG['SERVER_DIR'] = self::GetDirName();
		
		self::$domain = [self::getSubDomain($_CONFIG['SERVER_NAME']), self::getDomain($_CONFIG['SERVER_NAME']), self::getRegion($_CONFIG['SERVER_NAME'])];
		return true;
	}
	
	/**
	*  Domain and Sub Domain Settings
	*/
	public static function GetSiteUrl(bool $full = false, string $url = '') : string {
		if(self::$domain[0] != '' and $full == true) $url = self::$domain[0].'.';
		$url .= self::$domain[1].'.'.self::$domain[2];
		return $url;
	}
	
	public static function GetSiteDomain(int $n = 0) : string {
		return self::$domain[$n];
	}
	
	private static function GetDirName() : string{
		$pp = pathinfo($_SERVER['DOCUMENT_ROOT']);
		if($pp['basename'] != 'public_html') return $pp['dirname'];
	  return $_SERVER['DOCUMENT_ROOT'];
	}
	
	private static function getSubDomain(string $url) : string {
		$tmp = explode('.', $url);
		$tmp = array_slice($tmp, 0, -2);
		$str = implode(".", $tmp);
		return $str;
	}
	
	private static function getDomain(string $url) : string {
		$tmp = explode('.', $url);
		if(count($tmp) == 3) $tmp = array_slice($tmp, 1, -1);
		else if(count($tmp) == 2) $tmp = array_slice($tmp, 0, 1);
		$str = implode(".", $tmp);
		return $str;
	}
	
	private static function getRegion(string $url) : string {
		$tmp = explode('.', $url);
		if(count($tmp) == 3) $tmp = array_slice($tmp, 2, 1);
		else if(count($tmp) == 2) $tmp = array_slice($tmp, 1, 1);
		$str = implode(".", $tmp);
		return $str;
	}
}