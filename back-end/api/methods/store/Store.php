<?php
use ozLEngine\Core\Core;
use ozLEngine\Core\Account;
use ozLEngine\Api\Valider;
use ozLEngine\Api\Configurator;
use ozLEngine\Core\Functions;

class A_Store {
  public static function pay(){
    if(!Valider::isValidParams(['number', 'name', 'date', 'code', 'price'])) return Configurator::getError('incorrect_data');
    return Configurator::Response(true);
  }
  

  public static function getCategories(){
    if(!Valider::isValidParams(['client'])) return Configurator::getError('incorrect_data');
    $response = P_Store::GetCategories(Core::$MySql->SelectData('categories', ['deleted' => 0], false, 10000));
    return Configurator::Response($response);
  }
  
  public static function deleteCategory(){
    if(!Valider::isValidParams(['category_id'])) return Configurator::getError('incorrect_data');
    $user_id = Valider::isValidToken();
    if(Account::GetAdminLvl($user_id) < 3) return Configurator::getError('access_denied');

    $category_id = (int) $_REQUEST['category_id'];
    $force = (bool) ($_REQUEST['force'] ?? false);
    if($force) $r = Core::$MySql->Delete('categories', ['id' => $category_id]);
    else $r = Core::$MySql->Update('categories', 'id', $category_id, ['deleted' => 1]);
    return Configurator::Response($r);
  }
  
  public static function addCategory(){
    if(!Valider::isValidParams(['name_ru', 'name_en', 'icon'])) return Configurator::getError('incorrect_data');
    $user_id = Valider::isValidToken();
    if(Account::GetAdminLvl($user_id) < 2) return Configurator::getError('access_denied');

    $name_ru = $_REQUEST['name_ru'];
    $name_en = $_REQUEST['name_en'];
    $icon = $_REQUEST['icon'];

    $r = Core::$MySql->Insert('categories', [
      'name_ru' => $name_ru,
      'name_en' => $name_en,
      'icon' => $icon
    ]);

    return Configurator::Response($r);
  }

  public static function getProducts(){
    if(!Valider::isValidParams(['client'])) return Configurator::getError('incorrect_data');
    $limit = (int) ($_REQUEST['limit'] ?? 100000);
    $offset = (int) ($_REQUEST['offset'] ?? 0);
    $limit = $limit <= 0 ? 0 : $limit;
    $offset = $offset <= 0 ? 0 : $offset;

    $r = Core::$MySql->SelectData('products', ['is_disabled' => 0], false, $limit, $offset, 'id');
    $response = P_Store::getProducts($r);
    return Configurator::Response($response);
  }

  public static function getAllProducts(){
    if(!Valider::isValidParams(['client'])) return Configurator::getError('incorrect_data');
    $user_id = Valider::isValidToken();
    if(Account::GetAdminLvl($user_id) < 2) return Configurator::getError('access_denied');
    
    $limit = (int) ($_REQUEST['limit'] ?? 100000);
    $offset = (int) ($_REQUEST['offset'] ?? 0);
    $limit = $limit <= 0 ? 0 : $limit;
    $offset = $offset <= 0 ? 0 : $offset;

    $r = Core::$MySql->SelectData('products', ['is_deleted' => 0], false, $limit, $offset, 'id');
    $response = array();
    if($r) foreach($r as $t) $response[] = P_Store::GetProduct($t);
    return Configurator::Response($response);
  }
  
  public static function addProduct(){
    if(!Valider::isValidParams(['info'])) return Configurator::getError('incorrect_data');
    $user_id = Valider::isValidToken();
    if(Account::GetAdminLvl($user_id) < 3) return Configurator::getError('access_denied');
    $info = json_decode($_REQUEST['info'], true);

    $r = Core::$MySql->Insert('products', [
      'image' => $info['image'],
      'name_ru' => $info['name_ru'],
      'name_en' => $info['name_en'],
      'desc_ru' => $info['desc_ru'],
      'desc_en' => $info['desc_en'],
      'type' => (int) $info['type'],
      'is_sale' => (bool) $info['is_sale'],
      'is_disabled' => (bool) $info['is_disabled'],
      'category_id' => (int) $info['category_id'],
      'guarantee' => (int) $info['guarantee'],
      'discount' => (int) $info['discount'],
      'price' => (int) $info['price'],
      'created_time' => time()
    ]);

    return Configurator::Response($r);
  }
}

class P_Store {
  public static function GetCategories($r){
    $categories = array();
    if($r) foreach($r as $t) $categories[] = self::GetCategory($t);
    return array_reverse($categories);
  }

  public static function GetCategory($r){
    return array(
      "id" => (int) ($r['id'] ?? -1),
      "icon" => $r['icon'] ?: 'bi bi-x-lg',
      "name" => [
        "ru" => $r['name_ru'] ?: 'name_ru',
        "en" => $r['name_en'] ?: 'name_en'
      ],
    );
  }

  public static function GetProducts($arr){
    $products = array();
    if(!$arr) return $products;
    foreach ($arr as $i => $r) $products[$r['category_id']][] = self::GetProduct($r);
    return $products;
  }

  public static function GetProduct($r){
    if(!$r) return null;

    return array(
      "id" => (int) $r['id'],
      "image" => $r['image'] ?: '',
      "type" => (int) $r['type'],
      "price" => (int) $r['price'],
      "discount" => (int) $r['discount'],
      "guarantee" => (int) $r['guarantee'],
      "category_id" => (int) $r['category_id'],
      "is_sale" => (bool) $r['is_sale'],
      "is_disabled" => (bool) $r['is_disabled'],
      "name" => [
        "ru" => $r['name_ru'] ?: 'name_ru',
        "en" => $r['name_en'] ?: 'name_en'
      ],
      "desc" => [
        "ru" => $r['desc_ru'] ?: '',
        "en" => $r['desc_en'] ?: ''
      ],
    );
  }
}