<?php
use ozLEngine\Core\Core;
use ozLEngine\Core\Account;
use ozLEngine\Api\Valider;
use ozLEngine\Api\Configurator;
use ozLEngine\Core\Functions;

class A_Store {
  public static function pay(){
    if(!Valider::isValidParams(['cart_id', 'price', 'products_id'])) return Configurator::getError('incorrect_data');
    $user_id = Valider::isValidToken();
    // Тут оплата

    $response = array(
      "paid" => true,
      "check" => [
        "id" => -1,
        "price" => 0,
      ]
    );
    return Configurator::Response($response);
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

  public static function getProduct(){
    if(!Valider::isValidParams(['id'])) return Configurator::getError('incorrect_data');
    $r = Core::$MySql->Select('products', 'id', $_REQUEST['id']);
    if(!$r || (bool) $r['is_deleted']) return Configurator::getError('incorrect_id');
    $response = P_Store::GetProduct($r);
    return Configurator::Response($response);
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
    $response = P_Store::getProducts($r);
    return Configurator::Response($response);
  }
  
  public static function addProduct(){
    if(!Valider::isValidParams(['info'])) return Configurator::getError('incorrect_data');
    $user_id = Valider::isValidToken();
    if(Account::GetAdminLvl($user_id) < 3) return Configurator::getError('access_denied');
    $info = json_decode($_REQUEST['info'], true);

    $discount = $info['discount'];
    $discount = $discount < 0 ? 0 : ($discount > 100 ? 100 : $discount);
    $count = $info['count'];
    $count = $count < 0 ? 0 : ($count > 100000 ? 100000 : $count);

    $r = Core::$MySql->Insert('products', [
      'image' => $info['image'],
      'name_ru' => $info['name']['ru'],
      'name_en' => $info['name']['en'],
      'desc_ru' => $info['desc']['ru'],
      'desc_en' => $info['desc']['en'],
      'type' => (int) $info['type'],
      'count' => (int) $info['count'],
      'is_sale' => (bool) $info['is_sale'],
      'is_disabled' => (bool) $info['is_disabled'],
      'category_id' => (int) $info['category_id'],
      'guarantee' => (int) $info['guarantee'],
      'discount' => (int) $discount,
      'price' => (int) $info['price'],
      'created_time' => time()
    ]);

    return Configurator::Response($r);
  }
  
  public static function editProduct(){
    if(!Valider::isValidParams(['info', 'id'])) return Configurator::getError('incorrect_data');
    $user_id = Valider::isValidToken();
    if(Account::GetAdminLvl($user_id) < 3) return Configurator::getError('access_denied');
    $info = json_decode($_REQUEST['info'], true);
    $id = $_REQUEST['id'];

    $r = Core::$MySql->Select('products', 'id', $id);
    if(!$r) return Configurator::getError('incorrect_id');

    $discount = $info['discount'];
    $discount = $discount < 0 ? 0 : ($discount > 100 ? 100 : $discount);
    $count = $info['count'];
    $count = $count < 0 ? 0 : ($count > 100000 ? 100000 : $count);

    $r = Core::$MySql->Update('products', 'id', $id, [
      'image' => $info['image'],
      'name_ru' => $info['name']['ru'],
      'name_en' => $info['name']['en'],
      'desc_ru' => $info['desc']['ru'],
      'desc_en' => $info['desc']['en'],
      'type' => (int) $info['type'],
      'count' => (int) $info['count'],
      'is_sale' => (bool) $info['is_sale'],
      'is_disabled' => (bool) $info['is_disabled'],
      'category_id' => (int) $info['category_id'],
      'guarantee' => (int) $info['guarantee'],
      'discount' => (int) $discount,
      'price' => (int) $info['price'],
      'edited_time' => time()
    ]);

    return Configurator::Response($r);
  }
}

class P_Store {
  public static function GetCategories($r){
    $categories = array(self::GetDefaultCategory());
    if($r) foreach($r as $t) $categories[] = self::GetCategory($t);
    return $categories;
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

  public static function GetDefaultCategory(){
    return array(
      "id" => -1,
      "icon" => 'bi bi-box-seam',
      "name" => [
        "ru" => 'Все товары',
        "en" => 'All products'
      ],
    );
  }

  public static function GetProducts($arr){
    $products = array();
    if(!$arr) return $products;
    foreach ($arr as $i => $r) {
      $product = self::GetProduct($r);
      $products[-1][] = $product;
      $products[$r['category_id']][] = $product;
    }

    return $products;
  }

  public static function GetProduct($r){
    if(!$r) return null;

    return array(
      "id" => (int) $r['id'],
      "image" => $r['image'] ?: '',
      "type" => (int) $r['type'],
      "count" => (int) $r['count'],
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