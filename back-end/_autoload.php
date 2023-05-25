<?php
namespace ozLEngine\Core;
require_once __DIR__.'/vendor/autoload.php';
require_once __DIR__.'/engine/php/config.php';

class AutoLoader {
	public static function register() : void
	{
		spl_autoload_register(function ($namespace) {
			$space = explode(DIRECTORY_SEPARATOR, str_replace('\\', DIRECTORY_SEPARATOR, $namespace));
			$class = $space[count($space)-1];
			
			if($space[0] == 'ozLEngine'){
				if($space[1] == 'Core') $dir = MODULES_DIR;
				else if($space[1] == 'Api') $dir = API_MODULES_DIR;
				else $dir = DOCUMENT_ROOT;

				if(strpos($class, 'Exception') !== false) $file = $dir.'Exceptions.php';
				else $file = $dir.$class.'.php';
			} else $file = $namespace;

			if(file_exists($file)) { require_once $file; return true; }
			return false;
		});
	}
}

AutoLoader::register();
Debug::register();