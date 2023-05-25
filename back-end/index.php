<?php
require_once __DIR__.'/_Core.php';

use ozLEngine\Core\Core;
use ozLEngine\Core\Debug as Debug;
use ozLEngine\Core\DebugLevel;

Debug::print('Access Denied', 'You are not allowed to access this site', DebugLevel::ERROR);