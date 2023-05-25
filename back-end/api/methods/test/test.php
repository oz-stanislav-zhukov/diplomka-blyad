<?php
use ozLEngine\Core\Core;
use ozLEngine\Api\Valider;
use ozLEngine\Api\Configurator;

class A_Test {
  public static function getTables(){
    foreach(Core::$MySql->SelectAll('tables', 100) as $table){
      $response['tables'][] = $table['name'];
    }
    return Configurator::Response($response);
  }

  public static function getError(){
    if(!Valider::isValidParams(['error'])) return Configurator::getError('incorrect_data');
    return Configurator::getError($_REQUEST['error']);
  }

  /**
   * https://example.ru/api/methods/test.ping?client=ozfront&text=1&a=1&b=3
   * https://example.ru/api/methods/test.ping?client=ozfront&text=1&c=8&d=6
   */
  public static function ping(){
    if(!Valider::isValidParams(['client', 'text'], [['a', 'b'], ['c', 'd']])) return Configurator::getError('incorrect_data');
    $text = $_REQUEST['text'];
    $sum = isset($_REQUEST['a']) ? $_REQUEST['a'] + $_REQUEST['b'] : (isset($_REQUEST['c']) ? $_REQUEST['c'] + $_REQUEST['d'] : 0);
    $response = "Pong: $text. Sum: $sum";
    return Configurator::Response($response);
  }

  // Дальше просто функции и не нужно создавать файлы
}