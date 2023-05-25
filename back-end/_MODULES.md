# Модули

### Оглавление
0. [Список всех модулей](#Список-всех-модулей)
1. [Storage & Cookie](#Storage--cookie)
2. [Functions](#Functions)
3. [Exceptions](#Exceptions)
4. [MySql](#MySql)
5. [Crypto](#Crypto)
6. [Session](#Session)
7. [Debug](#Debug)
8. [Mailer](#Mailer)
9. [Smtp](#Smtp)

### Список всех модулей
- `use ozLEngine\Core\Crypto` - Шифрование для разговора между Бэкендом и Фронтом
- `use ozLEngine\Core\Debug` - Функции откладки для разработчиков
- `use ozLEngine\Core\Exceptions` - Исключения
- `use ozLEngine\Core\Functions` - Функции всякие
- `use ozLEngine\Core\Mailer` - Отправка почты (Нужен SMTP сервер)
- `use ozLEngine\Core\MySql` - Функции Базы данных
- `use ozLEngine\Core\Session` - Модуль сессии
- `use ozLEngine\Core\Smtp` - Модуль подключения к SMTP

### Functions
`use ozLEngine\Core\Functions`

### Exceptions
`use ozLEngine\Core\Exceptions`

```PHP
new ozException(string $message, string $title = '', int $code = 0, \Throwable $previous = null);
new zException(string $message, int $code = 0, \Throwable $previous = null);
```

```PHP
try {
  if(!file_exists(__DIR__.'/config.ini')) throw new ozException('File config.ini not found');
} catch (ozException $e){
  Debug::critical($e->getTitle(), $e->getMessage(), [], $e->getFile());
}
```
![image](https://user-images.githubusercontent.com/35627391/177192482-3f6b146a-c905-4c41-b461-a09d05d39837.png)
```PHP
Debug::critical($e->getTitle(), $e->getMessage(), ['p1'=>'data', 'p2'=>['2', '1', 3], 'p3', 'p4'], $e->getFile());
```
![image](https://user-images.githubusercontent.com/35627391/177193578-1f8830ed-371d-4717-9def-97f6bb660259.png)

### MySql
`use ozLEngine\Core\MySql`
###### MySqlConnect
```PHP
$connect = MySqlConnect(
  public string $database = 'edu_system',
  public string $user = 'root',
  public string $password = '',
  public string $host = 'localhost',
  public int|null $port = null,
  public MySqlDriver $driver = MySqlDriver::MySQLi,
  public string $charset = 'utf8mb4'
);
```
###### MySqlDriver
```PHP
MySqlDriver::MySQLi = "mysqli";
MySqlDriver::PDO = "pdo_mysql";
```

###### Подключение
```PHP
$my_mysql = new MySql(MySqlConnect $connect);
// Возвращает имя таблицы
$my_mysql->getTableName(string $name) : string;
// Проверяет подключение
$my_mysql->isConnected() : bool;
// Удаляет запись ('users', ['id'=>1, ...])
$my_mysql->Delete(string $table, array $data) : \mysqli_result|bool|null;
// Добавляет запись ('users', ['id'=>1, 'name'=>'Имя', ...])
$my_mysql->Insert(string $table, array $data) : \mysqli_result|bool|null;
// Обновляет запись ('users', 'id', 1, ['name'=>'Новое имя', ...])
$my_mysql->Update(string $table, string $wc, string $wv, array $data) : \mysqli_result|bool|null;
// Получет запись ('users', 'id', 1)
$my_mysql->Select(string $table, string $column, string $value, bool $to_array = true) : \mysqli_result|bool|array|null;
// Получет записи ('users', 'id', [1, 2, 4])
$my_mysql->SelectIn(string $table, string $column, string|array $values, bool $to_array = true) : \mysqli_result|bool|array|null;
// Получет записи где встречано .co ('users', 'id', '.co')
$my_mysql->SelectLike(string $table, string $column, string $value, bool $to_array = true) : \mysqli_result|bool|array|null;
// Получет все записи ('users', 100)
$my_mysql->SelectAll(string $table, bool|int $limit = false, bool $to_array = false) : \mysqli_result|bool|array|null;
// Получет записи у которых есть такие данные ('users', ['group'=>1, 'eball'=>5]), в данном примере всех пользователей с 1 группы и Е-Баллом 5
$my_mysql->SelectData(string $table, array $data, bool $to_array = true, int $limit = 0, int $offset = 0, string|null $desc = null, bool $use_or = false) : \mysqli_result|bool|array|null;
// Есть ли запись? ('users', 'id', 1)
$my_mysql->IsExistsRecord(string $table, string $column, string $value) : bool;
// Получет последний INSERT id. Используйте просто GetInsertID();
$my_mysql->GetInsertID(\MySQLi $connect = null) : \mysqli_result|bool|null|int|string;
// Если нужно выполнить кастомнный код
$my_mysql->RunMysqlCode(string $code, bool $getid = false) : \mysqli_result|bool|null|int|string; // $getid = true, вернёт id при INSERT
$my_mysql->GetConnect() : \MySQLi; // Возвращает класс MySQLi
```

###### Подключение и получение MySQLi класса
> В таком случаи Вы будете работать напрямую с MySQLi
- Вам нужно будет вручную защищаться от SQL Инъекций!
- Вам нужно вручную узнавать имя таблицы
```PHP
$my_mysql = (new MySql(MySqlConnect $connect))->GetConnect();
```
> Лучше использовать так и когда Вам нужен будет оригинальный MySQLi класс, получите его
```PHP
$my_mysql = new MySql(MySqlConnect $connect);
$tables = $my_mysql->SelectAll('tables', 100); // пример с использованием нашего модуля

/* Пример использования оригинального MySQLi класса */
$table = $my_mysql->getTableName('tables');
$tables = ($my_mysql->GetConnect())->query("SELECT * FROM $table ORDER BY id DESC LIMIT 100;");
```
> А можно вообще вот так
```PHP
$my_mysql = new MySql(MySqlConnect $connect);
$table = $my_mysql->getTableName('tables');
$tables = $my_mysql->RunMysqlCode("SELECT * FROM $table ORDER BY id DESC LIMIT 100;");
```

### Crypto
`use ozLEngine\Core\Crypto`

### Session
`use ozLEngine\Core\Session`

### Debug
`use ozLEngine\Core\Debug`
###### Debug levels
1. `DEBUG`
2. `INFO`
3. `NOTICE`
4. `WARNING`
5. `ERROR`
6. `CRITICAL`
7. `ALERT`
8. `SUCCESS`

```PHP
Debug::log(string $text, array $params = [], DebugLevel $level = DebugLevel::INFO) : void;
Debug::debug(string $title, string $text, array $params = []) : void;
Debug::error(string $title, string $text, array $params = [], string $file = null) : void;
Debug::critical(string $title, string $text, array $params = [], string $file = null) : never; // Выводит сообщение и exit;
Debug::warning(string $title, string $text, array $params = [], string $file = null) : void;
Debug::success(string $title, string $text, array $params = []) : void;
Debug::print(string $title, string $text, DebugLevel $level = DebugLevel::INFO, array $params = [], string $file = null) : void;
```

### Mailer
`use ozLEngine\Core\Mailer`

### Smtp
`use ozLEngine\Core\Smtp`