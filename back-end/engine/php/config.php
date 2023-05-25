<?php
define('DEV_MODE', true);
define('ENGINE_VER', '5.3.0');
define('ENGINE_DATE', '2022-01-22T11:22:53+06:00');
define('MODULES_DIR', __DIR__.'/modules/');
define('DOCUMENT_ROOT', $_SERVER['DOCUMENT_ROOT']);
define('API_MODULES_DIR', DOCUMENT_ROOT.'/api/modules/');
define('API_METHODS_DIR', DOCUMENT_ROOT.'/api/methods/');

$_CONFIG['SERVER_HTTPS'] = true;
$_CONFIG['SERVER_TIMEZONE'] = 'UTC';
$_CONFIG['SERVER_ENCODING'] = 'UTF-8';

$_CONFIG['DATABASE'] = array(
  "name" => "f0220387_ustore",
  "user" => "f0220387_ustore",
  "pass" => "69qbb82b",
  "prefix" => "",
  "host" => "141.8.192.54",
  "port" => 3306,
  "driver" => "mysqli",
  "charset" => "utf8mb4"
);

$_CONFIG['SMTP'] = array(
  "host" => "smtp.yandex.ru",
  "port" => 25,
  "mail" => "no-reply@example.ru",
  "pass" => "",
  "from" => "no-reply@example.ru",
  "title" => "ozLiginus",
  "protocol" => "tcp"
);