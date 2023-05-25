<?php
use ozLEngine\Core\Core;
use ozLEngine\Api\Valider;
use ozLEngine\Api\Configurator;
use ozLEngine\Core\Account;

class A_Cron {

  /**
   * Очистка просроченых токенов
   * https://example.ru/api/methods/cron.clearExpiredTokens?client=cron-back
   */
  public static function clearExpiredTokens(){
    return Configurator::Response(Account::ClearExpiredTokens());
  }
}