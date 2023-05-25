<?php
namespace ozLEngine\Core;

class Account {
  public static function Register(string $login, string $pass, int $sex, int $birthday, string $first_name, string $middle_name, string $last_name) : bool {
    if(self::LoginExists($login)) return false;

    return (bool) Core::$MySql->Insert('accounts', [
      'login' => $login,
      'pass' => self::GetHash($pass),
      'sex' => $sex,
      'birthday' => $birthday,
      'first_name' => $first_name,
      'middle_name' => $middle_name,
      'last_name' => $last_name
    ]);
	}

  public static function LoginExists(string $login) : bool {
    return (bool) Core::$MySql->Select('accounts', 'login', $login);
	}

  public static function Get(int $user_id) : array|bool {
    return Core::$MySql->Select('accounts', 'id', $user_id);
	}

  public static function GetTokenInfo(string $access_token) : array|bool {
    return Core::$MySql->Select('tokens', 'access_token', $access_token);
	}

  public static function GetByLogin(string $login) : array|bool {
    return Core::$MySql->Select('accounts', 'login', $login);
	}

  public static function GetAdminLvl(int $user_id) : int {
    $acc = self::Get($user_id);
    return $acc ? (int) $acc['admin_lvl'] : 0;
	}

  public static function CheckAuthByID(int $user_id, string $pass) : bool {
    $acc = self::Get($user_id);
    return $acc ? self::GetHash($pass) == $acc['pass'] : false;
	}

  public static function CheckAuth(string $login, string $pass) : int|bool {
    $acc = self::GetByLogin($login);
    return $acc && self::GetHash($pass) == $acc['pass'] ? (int) $acc['id'] : false;
	}

  private static function GetHash(string $pass) : string {
    return md5($pass).strrev(md5($pass));           // Это лучше поменять
	}

  public static function GenToken(int $user_id, int $expired_seconds = 2592000) : string|bool {
    $acc = self::Get($user_id);
    if(!$acc) return false;
    
    $token = Functions::GenCode(80);
    $ip = $_SERVER["HTTP_CF_CONNECTING_IP"] ?? $_SERVER['REMOTE_ADDR'];
    $country = $_SERVER["HTTP_CF_IPCOUNTRY"] ?? '';

    $b = Core::$MySql->Insert('tokens', [
      "user_id" => $user_id,
      "app_id" => 0,                                // Система приложений отсутствует
      "access_token" => $token,
      "created_time" => time(),
      "expired_time" => time() + $expired_seconds,
      "last_active_time" => time(),
      "last_active_country" => $country,
      "last_active_ip" => $ip
    ]);

    return $b ? $token : false;
	}

  public static function isValidToken(string $access_token, int $app_id = 0) : int|bool {
    $r = self::GetTokenInfo($access_token);
    if(!$r || !$r['user_id'] || time() >= $r['expired_time'] || ($app_id && $app_id != $r['app_id'])) return false;
    self::UpdateActivity((int) $r['user_id'], $access_token, $r);
    return (int) $r['user_id'];
	}

  public static function UpdateActivity(int $user_id, string $access_token, array|null $tkn = null) : string|bool {
    $acc = self::Get($user_id);
    if(!$tkn) $tkn = self::GetTokenInfo($access_token);
    if(!$acc || !$tkn) return false;
    
    $ip = $_SERVER["HTTP_CF_CONNECTING_IP"] ?? $_SERVER['REMOTE_ADDR'];
    $country = $_SERVER["HTTP_CF_IPCOUNTRY"] ?? '';

    $t = Core::$MySql->Update('tokens', 'access_token', $access_token, [
      "last_active_time" => time(),
      "last_active_country" => $country,
      "last_active_ip" => $ip
    ]);

    $a = Core::$MySql->Update('accounts', 'id', $user_id, [
      "last_active_time" => time(),
      "last_token_id" => $tkn['id']
    ]);

    return $t && $a;
	}

  /**
   * Вызывается в Session::register();
   * Вызывайте лучше по крону | https://example.ru/api/methods/cron.clearExpiredTokens?client=cron-back
   */
  public static function ClearExpiredTokens() : bool {
    $time = time() - 3600;
    return (bool) Core::$MySql->RunMysqlCode("DELETE FROM tokens WHERE expired_time < $time");
	}
}