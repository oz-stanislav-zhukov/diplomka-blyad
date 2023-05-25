<?php
use ozLEngine\Api\Valider;
use ozLEngine\Api\Configurator;

$err_not_found = '{"status":"error","error_name":"method_not_found","error_msg":"Method not found."}';

if(!isset($_REQUEST['htr']) || (int) $_REQUEST['htr'] == 0) {
  header('HTTP/1.1 403 forbidden method');
  exit($err_not_found);
} else if(isset($_REQUEST['p1']) && isset($_REQUEST['p1'])) {
  $method = $_REQUEST['p1'];
  $class = 'A_'.$_REQUEST['p1'];
  $func = $_REQUEST['p2'];
} else exit($err_not_found);

if($method == '_methods') exit($err_not_found);
else if(!FileExists('methods/'.$method.'/'.$method.'.php')) exit($err_not_found);

if(FileExists('methods/'.$method.'/_config.php')) require_once 'methods/'.$method.'/_config.php';
else require_once 'methods/_config.php';
if(FileExists('methods/'.$method.'/_allows.php')) require_once 'methods/'.$method.'/_allows.php';
else require_once 'methods/_allows.php';

if(substr($func, 0, 1) != '_'){
  require_once '_includer.php';
}

if(FileExists('methods/'.$method.'/'.$func.'.php')){
  RequireOnce('methods/'.$method.'/'.$func.'.php');
  return;
}

RequireOnce('methods/'.$method.'/'.$method.'.php');
if(!method_exists($class, $func)) exit($err_not_found);
else if(!Valider::isValidAllows()) exit(Configurator::getError('incorrect_client'));
else exit($class::$func());

function FileExists($fileName) {
  if(file_exists($fileName)) return true;
  $fileArray = glob(dirname($fileName) . '/*', GLOB_NOSORT);
  $fileNameLowerCase = strtolower($fileName);
  foreach($fileArray as $file) {
    if(strtolower($file) == $fileNameLowerCase) return true;
  }
  return false;
}

function RequireOnce($path) {
  if(file_exists($path)) { require_once $path; return true; }
  $fileArray = glob(dirname($path) . '/*', GLOB_NOSORT);
  $fileNameLowerCase = strtolower($path);
  foreach($fileArray as $file) { 
    if(strtolower($file) == $fileNameLowerCase) require_once $file;
  }
  return false;
}