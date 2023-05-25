<?php
namespace ozLEngine\Core;

class Storage {
  public static function is(string $name) : bool {
    return isset($_COOKIE[$name]);
  }

  public static function set(string $name, string|int $value, bool $crypt = true, int $time = 2419200) : bool {
    setcookie($name, $value, time()+$time, "/", Settings::GetSiteUrl(false), 'SameSite=strict');
    return true;
  }

  public static function get(string $name, bool $crypt = true) : string|float|int|null|bool {
    if(!self::is($name)) return false;
    return $_COOKIE[$name];
  }
}