<?php
namespace ozLEngine\Api;
use ozLEngine\Core\Account;

class Valider {
	public static function isValidAllows() : bool {
		if(API_CLIENTS_ALLOW != '*'){
			if(!isset($_REQUEST['client'])) return false;
			$clients = explode(',', API_CLIENTS_ALLOW);
			if(!in_array($_REQUEST['client'], $clients)) return false;
		}

		if(API_APPS_ALLOW != '*'){
			if(!isset($_REQUEST['client_id'])) return false;
			$apps = explode(',', API_APPS_ALLOW);
			if(!in_array($_REQUEST['client_id'], $apps)) return false;
		}

		/**
		 * API_APP_VERIFY
		 * Вырезан, создайте свою систему приложений
		 */

		return true;
	}

	public static function isValidParams(array $params, array $or = null) : bool {
		foreach ($params as $param){
			if(!isset($_REQUEST[$param])) return false;
		}

		if($or != null){
			$s = array();
			for($i=0;$i<count($or);$i++){
				$s[$i] = true;
				foreach ($or[$i] as $p){
					if(!isset($_REQUEST[$p])) $s[$i] = false;
				}
			}

			if(!in_array(true, $s)) return false;
		}

		return true;
	}

	public static function isValidToken() : int|bool {
		if(!isset($_REQUEST['access_token'])) exit(Configurator::getError('token_no_passed'));
		$user_id = Account::isValidToken($_REQUEST['access_token']);
		if(!$user_id) exit(Configurator::getError('token_invalid'));
		return $user_id;
	}

	public static function isValidClient() : bool {
		if(!isset($_REQUEST['client']) || $_REQUEST['client'] != API_CURRENT_CLIENT) return false;
		if(!isset($_REQUEST['v']) || $_REQUEST['v'] != API_CURRENT_VERSION) return false;
		return true;
	}

	public static function isClient(string $name) : bool {
		if(!isset($_REQUEST['client'])) return false;
		if($_REQUEST['client'] != $name) return false;
		return true;
	}

	public static function checkEngineVer(string $client_ver) : bool {
		return (explode('.', $client_ver)[0] != explode('.', ENGINE_VER)[0] || explode('.', $client_ver)[1] != explode('.', ENGINE_VER)[1]);
	}

	public static function getError(string $error, string $param = '') : string {
		return Configurator::getError($error, $param);
	}
}