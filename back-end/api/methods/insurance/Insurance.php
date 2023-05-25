<?php
use ozLEngine\Core\Core;
use ozLEngine\Core\Account;
use ozLEngine\Api\Valider;
use ozLEngine\Api\Configurator;
use ozLEngine\Core\Functions;

class A_Insurance {
  public static function pay(){
    if(!Valider::isValidParams(['number', 'name', 'date', 'code', 'price'])) return Configurator::getError('incorrect_data');
    return Configurator::Response(true);
  }

  public static function get(){
    if(!Valider::isValidParams(['client', 'id'])) return Configurator::getError('incorrect_data');
    $r = Core::$MySql->Select('insurance', 'public_id', $_REQUEST['id']);
    if(!$r || (bool) $r['is_deleted']) return Configurator::getError('incorrect_id');
    $response = P_Insurance::GetInsurance($r);
    return Configurator::Response($response);
  }

  public static function getInsurances(){
    if(!Valider::isValidParams(['client'])) return Configurator::getError('incorrect_data');
    $limit = (int) ($_REQUEST['limit'] ?? 100000);
    $offset = (int) ($_REQUEST['offset'] ?? 0);
    $limit = $limit <= 0 ? 0 : $limit;
    $offset = $offset <= 0 ? 0 : $offset;

    $r = Core::$MySql->SelectData('insurance', ['is_deleted' => 0], false, $limit, $offset, 'id');
    if(!$r) return Configurator::getError('incorrect_id');
    $response = P_Insurance::GetInsurances($r);
    return Configurator::Response($response);
  }

  public static function getAutos(){
    if(!Valider::isValidParams(['client'])) return Configurator::getError('incorrect_data');
    $response = P_Insurance::GetAutos(Core::$MySql->SelectData('autos', ['deleted' => 0], false, 10000));
    return Configurator::Response($response);
  }
  
  public static function deleteAuto(){
    if(!Valider::isValidParams(['auto_id'])) return Configurator::getError('incorrect_data');
    $user_id = Valider::isValidToken();
    if(Account::GetAdminLvl($user_id) < 3) return Configurator::getError('access_denied');

    $auto_id = (int) $_REQUEST['auto_id'];
    $force = (bool) ($_REQUEST['force'] ?? false);
    if($force) $r = Core::$MySql->Delete('autos', ['id' => $auto_id]);
    else $r = Core::$MySql->Update('autos', 'id', $auto_id, ['deleted' => 1]);
    return Configurator::Response($r);
  }
  
  public static function addAuto(){
    if(!Valider::isValidParams(['name', 'brand'])) return Configurator::getError('incorrect_data');
    $user_id = Valider::isValidToken();
    if(Account::GetAdminLvl($user_id) < 3) return Configurator::getError('access_denied');

    $name = $_REQUEST['name'];
    $brand = $_REQUEST['brand'];

    $r = Core::$MySql->Insert('autos', [
      'name' => $name,
      'brand' => $brand,
    ]);

    return Configurator::Response($r);
  }

  public static function reg(){
    if(!Valider::isValidParams(['client', 'info'])) return Configurator::getError('incorrect_data');
    $user_id = Valider::isValidToken();
    //if(Account::GetAdminLvl($user_id) < 5) return Configurator::getError('access_denied');
    $info = json_decode($_REQUEST['info'], true);

    $r = Core::$MySql->Select('insurance', 'number', $info['number']);
    if($r) return Configurator::getError('vehicle_insured');

    $r = Core::$MySql->Insert('insurance', [
      'last_name' => $info['last_name'],
      'first_name' => $info['first_name'],
      'middle_name' => $info['middle_name'],
      'public_id' => Functions::GenCode(10, false, true),
      'type' => (int) $info['type'],
      'purpose_of_use' => (int) $info['purpose_of_use'],
      'vin' => $info['vin'] ?? '',
      'iin' => $info['iin'] ?? '',
      'rnn' => $info['rnn'] ?? '',
      'number_doc' => $info['number_doc'] ?? '',
      'driver_license' => $info['driver_license'] ?? '',
      'body_number' => $info['body_number'] ?? '',
      'chassis_number' => $info['chassis_number'] ?? '',
      'email' => $info['email'] ?? '',
      'phone' => $info['phone'] ?? '',
      'number' => $info['number'] ?? '',
      'year_of_issue' => $info['year_of_issue'] ?? '',
      'engine_capacity' => $info['engine_capacity'] ?? '',
      'certificate_reg' => $info['certificate_reg'] ?? '',
      'region_reg' => $info['region_reg'] ?? '',
      "number_of_seats" => (int) $info['number_of_seats'],
      "driving_experience" => (int) $info['driving_experience'],
      "price" => (int) $info['price'],
      'is_rent' => (bool) $info['is_rent'],
      'is_other_format' => (bool) $info['is_other_format'],
      'is_not_registered' => (bool) $info['is_not_registered'],
      'is_entity' => (bool) $info['is_entity'],
      'is_resident' => (bool) $info['is_resident'],
      'is_married' => (bool) $info['is_married'],
      'is_city_significance' => (bool) $info['is_city_significance'],
      'auto_id' => (int) $info['auto_id'],
      'drivers' => json_encode($info['drivers']),
      'created_time' => time(),
      'expired_time' => time() + 31536000
    ]);

    if(!$r) return Configurator::getError('unknown_error');
    $r = Core::$MySql->Select('insurance', 'number', $info['number']);
    if(!$r) return Configurator::getError('unknown_error');
    $response = P_Insurance::GetInsurance($r);
    return Configurator::Response($response);
  }

  public static function update(){
    if(!Valider::isValidParams(['client', 'info', 'id'])) return Configurator::getError('incorrect_data');
    $user_id = Valider::isValidToken();
    if(Account::GetAdminLvl($user_id) < 5) return Configurator::getError('access_denied');
    $public_id = $_REQUEST['id'];
    $info = json_decode($_REQUEST['info'], true);

    $r = Core::$MySql->Select('insurance', 'public_id', $public_id);
    if(!$r) return Configurator::getError('incorrect_id');

    $r = Core::$MySql->Update('insurance', 'public_id', $public_id, [
      'last_name' => $info['last_name'],
      'first_name' => $info['first_name'],
      'middle_name' => $info['middle_name'],
      'type' => (int) $info['type'],
      'purpose_of_use' => (int) $info['purpose_of_use'],
      'vin' => $info['vin'] ?? '',
      'iin' => $info['iin'] ?? '',
      'rnn' => $info['rnn'] ?? '',
      'number_doc' => $info['number_doc'] ?? '',
      'driver_license' => $info['driver_license'] ?? '',
      'body_number' => $info['body_number'] ?? '',
      'chassis_number' => $info['chassis_number'] ?? '',
      'email' => $info['email'] ?? '',
      'phone' => $info['phone'] ?? '',
      'number' => $info['number'] ?? '',
      'year_of_issue' => $info['year_of_issue'] ?? '',
      'engine_capacity' => $info['engine_capacity'] ?? '',
      'certificate_reg' => $info['certificate_reg'] ?? '',
      'region_reg' => $info['region_reg'] ?? '',
      "number_of_seats" => (int) $info['number_of_seats'],
      "driving_experience" => (int) $info['driving_experience'],
      "price" => (int) $info['price'],
      'is_rent' => (bool) $info['is_rent'],
      'is_other_format' => (bool) $info['is_other_format'],
      'is_not_registered' => (bool) $info['is_not_registered'],
      'is_entity' => (bool) $info['is_entity'],
      'is_resident' => (bool) $info['is_resident'],
      'is_married' => (bool) $info['is_married'],
      'is_city_significance' => (bool) $info['is_city_significance'],
      'auto_id' => (int) $info['auto_id'],
      'drivers' => json_encode($info['drivers']),
      'edited_time' => time()
    ]);

    if(!$r) return Configurator::getError('unknown_error');
    $r = Core::$MySql->Select('insurance', 'public_id', $public_id);
    if(!$r) return Configurator::getError('unknown_error');
    $response = P_Insurance::GetInsurance($r);
    return Configurator::Response($response);
  }

  public static function extend(){
    if(!Valider::isValidParams(['client', 'seconds', 'id'])) return Configurator::getError('incorrect_data');
    $user_id = Valider::isValidToken();
    if(Account::GetAdminLvl($user_id) < 5) return Configurator::getError('access_denied');
    $public_id = $_REQUEST['id'];
    $seconds = (int) $_REQUEST['seconds'];

    $r = Core::$MySql->Select('insurance', 'public_id', $public_id);
    if(!$r) return Configurator::getError('incorrect_id');

    $r = Core::$MySql->Update('insurance', 'public_id', $public_id, [
      'expired_time' => time() + $seconds,
      'edited_time' => time()
    ]);

    if(!$r) return Configurator::getError('unknown_error');
    $r = Core::$MySql->Select('insurance', 'public_id', $public_id);
    if(!$r) return Configurator::getError('unknown_error');
    $response = P_Insurance::GetInsurance($r);
    return Configurator::Response($response);
  }
}

class P_Insurance {
  public static function GetAutos($r){
    $autos = array();
    foreach($r as $t) $autos[] = self::GetAuto($t);
    return array_reverse($autos);
  }

  public static function GetAuto($r){
    return array(
      "id" => (int) ($r['id'] ?? -1),
      "brand" => $r['brand'] ?? 'Deleted',
      "name" => $r['name'] ?? 'Car'
    );
  }

  public static function GetInsurances($r){
    $insurances = array();
    foreach($r as $t) $insurances[] = self::GetInsurance($t);
    return $insurances;
  }

  public static function GetInsurance($r){
    return array(
      "id" => (int) $r['id'],
      "public_id" => $r['public_id'],
      "type" => (int) $r['type'],
      "purpose_of_use" => (int) $r['purpose_of_use'],
      "auto" => self::GetAuto(Core::$MySql->Select('autos', 'id', (int) $r['auto_id'])),
      "vin" => $r['vin'],
      "iin" => $r['iin'],
      "rnn" => $r['rnn'],
      "number_doc" => $r['number_doc'],
      "driver_license" => $r['driver_license'],
      "body_number" => $r['body_number'],
      "chassis_number" => $r['chassis_number'],
      "first_name" => $r['first_name'],
      "last_name" => $r['last_name'],
      "middle_name" => $r['middle_name'],
      "email" => $r['email'],
      "phone" => $r['phone'],
      "number" => $r['number'],
      "year_of_issue" => $r['year_of_issue'],
      "engine_capacity" => $r['engine_capacity'],
      "certificate_reg" => $r['certificate_reg'],
      "region_reg" => $r['region_reg'],
      "number_of_seats" => (int) $r['number_of_seats'],
      "driving_experience" => (int) $r['driving_experience'],
      "price" => (int) $r['price'],
      'drivers' => json_decode($r['drivers'], true),
      "is_rent" => (bool) $r['is_rent'],
      "is_other_format" => (bool) $r['is_other_format'],
      "is_not_registered" => (bool) $r['is_not_registered'],
      "is_entity" => (bool) $r['is_entity'],
      "is_resident" => (bool) $r['is_resident'],
      "is_married" => (bool) $r['is_married'],
      "is_city_significance" => (bool) $r['is_city_significance'],
      "created_time" => (int) $r['created_time'],
      "extension_time" => (int) $r['extension_time'],
      "expired_time" => (int) $r['expired_time'],
    );
  }
}