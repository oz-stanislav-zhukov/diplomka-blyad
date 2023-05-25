<?php
namespace ozLEngine\Core;
require_once __DIR__.'/_autoload.php';

class Core {
	public static Mysql $MySql;

	public static function register(){
		if(!Settings::register()) Session::Error('configuration_error', 'Failed to load server settings.');

		Session::register();
	}
}

Core::register();