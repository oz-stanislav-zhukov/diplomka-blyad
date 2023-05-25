<?php
namespace ozLEngine\Core;

class Session {
  public static function register() {
    session_start();
    Account::ClearExpiredTokens();
    //Debug::log("Session started!", [time()]);
  }

  public static function Error(string $error_name, string $error_msg, string $status = 'error', int $code = 0, array $array = null) : never {
    $response = array(
      "status" => $status,
      "error_name" => $error_name,
      "error_msg" => $error_msg
    );

    if($code != 0) $response['error_code'] = $code;
    if(isset($array)) $response = array_merge($response, $array);
    exit(json_encode($response));
	}
}