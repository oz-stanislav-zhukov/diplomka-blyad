<?php
namespace ozLEngine\Api;

class Configurator {
	public static function Response(mixed $data, string $status = "success", mixed $return = null) : string { // array|string|bool|null|int|float
		$response = array("status" => $status);
		if(!is_null($return)) $response['return'] = $return;
		$response['response'] = $data;
		
		return json_encode($response);
	}
	
	public static function Error(string $error_name, string $error_msg, int $code = 0, array $array = null) : string {
		$response = array(
			"status" => "error",
			"error_name" => $error_name,
			"error_msg" => $error_msg
		);
		
    if($code != 0) $response['error_code'] = $code;
    if(isset($array)) $response = array_merge($response, $array);
		return json_encode($response);
	}
	
	public static function Warning(string $warning_name, string $warning_msg, int $code = 0, array $array = null) : string {
		$response = array(
			"status" => "warning",
			"warning_name" => $warning_name,
			"warning_msg" => $warning_msg
		);
		
    if($code != 0) $response['warning_code'] = $code;
    if(isset($array)) $response = array_merge($response, $array);
		return json_encode($response);
	}

	public static function getError(string $error, string $param = '') : string {
		$errors = file_get_contents(DOCUMENT_ROOT.'/api/methods/api_errors.json');
		$errors = json_decode($errors, true);
		return self::Error($error, str_replace('{param}', $param, $errors[$error]));
	}
	
	public static function CheckType($param){
		if(is_bool($param)) return (bool)$param;
		else if(is_int($param)) return (int)$param;
		else if(is_float($param)) return (float)$param;
		else if(is_numeric($param)) return (int)$param;
		else if(is_string($param)) return (string)$param;
		else if(is_array($param)) return (array)$param;
		else if(is_object($param)) return (array)$param;
		
		return $param;
	}
	
	public static function CheckBlackList(string $blacklist, string $field) : bool {
		$blacklist = explode("|", $blacklist);
		
		foreach ($blacklist as $name){
			if($name == $field) return true;
		}
		
		return false;
	}
}