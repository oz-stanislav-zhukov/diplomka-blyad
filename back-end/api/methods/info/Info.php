<?php
use ozLEngine\Core\Core;
use ozLEngine\Api\Valider;
use ozLEngine\Api\Configurator;
use ozLEngine\Core\Account;

class A_Info {
  public static function getAbout(){
    if(!Valider::isValidParams(['client'])) return Configurator::getError('incorrect_data');
    $lang = $_REQUEST['lang'] ?? 'ru';
    $response = P_Info::GetAbout($lang);
    return Configurator::Response($response);
  }

  public static function getReviews(){
    if(!Valider::isValidParams(['client'])) return Configurator::getError('incorrect_data');
    $limit = (int) ($_REQUEST['limit'] ?? 20);
    $offset = (int) ($_REQUEST['offset'] ?? 0);
    $limit = $limit <= 0 ? 0 : $limit;
    $offset = $offset <= 0 ? 0 : $offset;

    $is_admin = false;
    if(isset($_REQUEST['access_token']) && isset($_REQUEST['status'])){
      $user_id = Valider::isValidToken();
      if(Account::GetAdminLvl($user_id) >= 1) $is_admin = true;
    }

    $args = ['status' => $is_admin ? (int) $_REQUEST['status'] : 1];
    if(isset($_REQUEST['product_id'])) $args['product_id'] = (int) $_REQUEST['product_id'];
    else if(!$is_admin) $args['product_id'] = -1;

    $response['reviews'] = array();
    $reviews = Core::$MySql->SelectData('reviews', $args, false, $limit, $offset, 'id');
    if($reviews) foreach($reviews as $review) $response['reviews'][] = P_Info::GetReview($review);
    return Configurator::Response($response);
  }

  public static function addAnonReview(){
    if(!Valider::isValidParams(['name', 'text'])) return Configurator::getError('incorrect_data');

    $r = Core::$MySql->Insert('reviews', [
      "user_id" => 0,
      "product_id" => (int) ($_REQUEST['product_id'] ?? -1),
      "name" => $_REQUEST['name'],
      "text" => $_REQUEST['text'],
      "time" => time(),
      "status" => 0
    ]);

    if($r) {
      $review_id = Core::$MySql->GetInsertID();
      $r = self::GetReview(Core::$MySql->Select('reviews', 'id', $review_id));
    }

    return Configurator::Response($r);
  }

  public static function addReview(){
    if(!Valider::isValidParams(['name', 'text'])) return Configurator::getError('incorrect_data');
    $user_id = Valider::isValidToken();

    $r = Core::$MySql->Insert('reviews', [
      "user_id" => $user_id,
      "product_id" => (int) ($_REQUEST['product_id'] ?? -1),
      "name" => $_REQUEST['name'],
      "text" => $_REQUEST['text'],
      "time" => time(),
      "status" => 0
    ]);

    if($r) {
      $review_id = Core::$MySql->GetInsertID();
      $r = self::GetReview(Core::$MySql->Select('reviews', 'id', $review_id));
    }

    return Configurator::Response($r);
  }

  public static function moderateReview(){
    if(!Valider::isValidParams(['review_id', 'status'])) return Configurator::getError('incorrect_data');
    $user_id = Valider::isValidToken();
    if(Account::GetAdminLvl($user_id) < 2) return Configurator::getError('access_denied');

    $r = Core::$MySql->Update('reviews', 'id', (int) $_REQUEST['review_id'], [
      "status" => (int) $_REQUEST['status']
    ]);

    return Configurator::Response($r);
  }

  public static function deleteReview(){
    if(!Valider::isValidParams(['review_id'])) return Configurator::getError('incorrect_data');
    $user_id = Valider::isValidToken();
    if(Account::GetAdminLvl($user_id) < 2) return Configurator::getError('access_denied');

    $r = Core::$MySql->Delete('reviews', ['id' => (int) $_REQUEST['review_id']]);
    return Configurator::Response($r);
  }

  public static function likeReview(){
    if(!Valider::isValidParams(['review_id'])) return Configurator::getError('incorrect_data');
    $user_id = Valider::isValidToken();

    $review = Core::$MySql->Select('reviews', 'id', (int) $_REQUEST['review_id']);
    if(!$review) return Configurator::Response(false);

    $r = Core::$MySql->Update('reviews', 'id', (int) $_REQUEST['review_id'], [
      "likes" => $review['likes'] + 1
    ]);

    return Configurator::Response($r);
  }

  public static function getReview(){
    if(!Valider::isValidParams(['review_id'])) return Configurator::getError('incorrect_data');

    $is_admin = false;
    if(isset($_REQUEST['access_token']) && isset($_REQUEST['status'])){
      $user_id = Valider::isValidToken();
      if(Account::GetAdminLvl($user_id) >= 2) $is_admin = true;
    }

    if($is_admin) $review = Core::$MySql->Select('reviews', 'id', (int) $_REQUEST['review_id']);
    else $review = Core::$MySql->SelectData('reviews', ['id' => (int) $_REQUEST['review_id'], 'status' => 1]);
    return Configurator::Response($review ?: null);
  }
}

class P_Info {
  public static function GetAbout($lang = 'ru') : array {
    if($lang == 'ru') return array(
      'filials' => array(
      ),
      'about' => array(
        'name' => 'ТОО "ЮНИКОД"',
        'tel' => '+7 (7182) 32-78-71',
        'whatsapp' => '+7 (701) 916-55-05',
        'address' => 'Павлодарская область, Лермонтова, 45/2',
        'supervisor' => 'Стешенко Михаил Михайлович'
      )
    );
    else return array(
      'filials' => array(
      ),
      'about' => array(
        'name' => 'LLP "UNICODE"',
        'tel' => '+7 (7182) 32-78-71',
        'whatsapp' => '+7 (701) 916-55-05',
        'address' => 'Pavlodarskaya oblast\', Lermontova, 45/2',
        'supervisor' => 'Steshenko Mikhail Mikhailovich'
      )
    );
  }

  public static function GetAccount(bool|array $account){
    if(!$account) return null;

    return array(
      "id" => (int) $account['id'],
      "sex" => (int) $account['sex'],
      "avatar" => $account['avatar'],
      "overlay" => $account['overlay'],
      "first_name" => $account['first_name'],
      "middle_name" => $account['middle_name'],
      "last_name" => $account['last_name'],
      "blocked" => (int) $account['blocked'],
      "online" => (int) $account['last_active_time']
    );
  }

  public static function GetReview(array $review) : array {
    if(!$review) return null;

    return array(
      "id" => (int) $review['id'],
      "user_id" => (int) $review['user_id'],
      "product_id" => (int) $review['product_id'],
      "user" => (int) $review['user_id'] ? self::GetAccount(Account::Get((int) $review['user_id'])) : null,
      "name" => $review['name'],
      "text" => $review['text'],
      "status" => (int) $review['status'],
      "time" => (int) $review['time'],
      "likes" => (int) $review['likes']
    );
  }
}