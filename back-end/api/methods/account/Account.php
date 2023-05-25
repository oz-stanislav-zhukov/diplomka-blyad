<?php
use ozLEngine\Core\Core;
use ozLEngine\Core\Debug;
use ozLEngine\Core\Account;
use ozLEngine\Api\Valider;
use ozLEngine\Api\Configurator;

class A_Account {
  public static function auth(){
    if(!Valider::isValidParams(['login', 'pass'])) return Configurator::getError('incorrect_data');
    $user_id = Account::CheckAuth($_REQUEST['login'], $_REQUEST['pass']);
    if(!$user_id) return Configurator::getError('auth_error');

    $expired = (int) ($_REQUEST['expired'] ?? 2592000);
    $access_token = Account::GenToken($user_id, $expired);

    $country = $_SERVER["HTTP_CF_IPCOUNTRY"] ?? '';
    $ip = $_SERVER["HTTP_CF_CONNECTING_IP"] ?? $_SERVER['REMOTE_ADDR'];
    Debug::log("User (id$user_id) is authorized in ".date("d.m.Y H:i:s"), [time(), $ip, $country]);

    return Configurator::Response([
      "user_id" => $user_id,
      "user_login" => $_REQUEST['login'],
      "access_token" => $access_token,
      "expired_time" => $expired
    ]);
  }

  public static function reg(){
    if(!Valider::isValidParams(['first_name', 'last_name', 'middle_name', 'login', 'password', 'replay_password', 'birthday', 'sex'])) return Configurator::getError('incorrect_data');

    $first_name = $_REQUEST['first_name'];
    $middle_name = $_REQUEST['middle_name'];
    $last_name = $_REQUEST['last_name'];
    $login = $_REQUEST['login'];
    $pass = $_REQUEST['password'];
    $pass2 = $_REQUEST['replay_password'];
    $sex = (int) $_REQUEST['sex'];
    $birthday = (int) $_REQUEST['birthday'];

    if(Account::LoginExists($login)) return Configurator::getError('login_busy');
    if($pass != $pass2
    || strlen($first_name) > 50 || strlen($middle_name) > 50 || strlen($last_name) > 50 || strlen($login) > 50 || strlen($pass) > 50
    || strlen($first_name) < 2 || strlen($middle_name) < 2 || strlen($last_name) < 2 || strlen($login) < 4 || strlen($pass) < 6
    ) return Configurator::getError('incorrect_data');

    $r = Account::Register($login, $pass, $sex, $birthday, $first_name, $middle_name, $last_name);
    if(!$r) return Configurator::getError('reg_error');
    return Configurator::Response($r);
  }

  public static function edit(){
    if(!Valider::isValidParams(['first_name', 'last_name', 'middle_name', 'birthday', 'sex'])) return Configurator::getError('incorrect_data');
    $user_id = Valider::isValidToken();
    $first_name = $_REQUEST['first_name'];
    $middle_name = $_REQUEST['middle_name'];
    $last_name = $_REQUEST['last_name'];
    $phone = $_REQUEST['phone'] ?? '';
    $email = $_REQUEST['email'] ?? '';
    $avatar = $_REQUEST['avatar'] ?? '';
    $overlay = $_REQUEST['overlay'] ?? '';
    $vk_id = $_REQUEST['vk_id'] ?? '';
    $ozaccount_id = $_REQUEST['ozaccount_id'] ?? '';
    $iin = $_REQUEST['iin'] ?? '';
    $sex = (int) $_REQUEST['sex'];
    $birthday = (int) $_REQUEST['birthday'];

    if(strlen($first_name) > 50 || strlen($middle_name) > 50 || strlen($last_name) > 50
    || strlen($first_name) < 2 || strlen($middle_name) < 2 || strlen($last_name) < 2
    ) return Configurator::getError('incorrect_data');

    Core::$MySql->Update('accounts', 'id', $user_id, [
      "first_name" => $first_name ?: 'Name',
      "middle_name" => $middle_name,
      "last_name" => $last_name ?: 'Surname',
      "phone" => $phone,
      "email" => $email,
      "avatar" => $avatar,
      "overlay" => $overlay,
      "vk_id" => $vk_id,
      "ozaccount_id" => $ozaccount_id,
      "iin" => $iin,
      "sex" => $sex,
      "birthday" => $birthday,
    ]);
    
    $r = P_Account::GetAccount(Account::Get($user_id));
    return Configurator::Response($r);
  }

  public static function logout(){
    if(!Valider::isValidParams(['access_token'])) return Configurator::getError('incorrect_data');
    $user_id = Valider::isValidToken();
    $r = Core::$MySql->Delete('tokens', ['access_token' => $_REQUEST['access_token']]);
    return Configurator::Response($r);
  }

  public static function isAuthed(){
    if(!Valider::isValidParams(['access_token'])) return Configurator::getError('incorrect_data');
    $user_id = Valider::isValidToken();
    $account = P_Account::GetAccount(Account::Get($user_id), true);
    if(!$account) return Configurator::getError('unknown_error');
    return Configurator::Response($account);
  }
}

class P_Account {
  public static function GetAccount(array $account, bool $show_private = false){
    $r = array(
      "id" => (int) $account['id'],
      "login" => $account['login'],
      "birthday" => (int) $account['birthday'],
      "sex" => (int) $account['sex'],
      "avatar" => $account['avatar'],
      "overlay" => $account['overlay'],
      "first_name" => $account['first_name'],
      "middle_name" => $account['middle_name'],
      "last_name" => $account['last_name'],
      "email" => $account['email'],
      "phone" => $account['phone'],
      "blocked" => (int) $account['blocked'],
      "vk_id" => (int) $account['vk_id'],
      "ozaccount_id" => (int) $account['ozaccount_id'],
      "online" => (int) $account['last_active_time']
    );

    if($show_private){
      $r['iin'] = $account['iin'];
      $r['admin_lvl'] = (int) $account['admin_lvl'];
      $r['last_token_id'] = (int) $account['last_token_id'];
    }

    return $r;
  }
}