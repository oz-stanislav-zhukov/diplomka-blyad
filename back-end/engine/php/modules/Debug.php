<?php
namespace ozLEngine\Core;
use Monolog\Level as MLevel;
use Monolog\Logger as MLogger;
use Monolog\Handler\StreamHandler;

class Debug {
  private static $format = ["{title}: ", "{text}.", "<br>In File: {file}", "<br>Params:<br>{params}"];
  public static $core;

  public static function register() : MLogger
  {
    self::$core = (new Logger('Core', 'core.log'))->getLogger();
    
    $ip = $_SERVER["HTTP_CF_CONNECTING_IP"] ?? $_SERVER['REMOTE_ADDR'];
    self::log("ozLEngine started in ".date("d.m.Y H:i:s"), [time(), $ip]);
    return self::$core;
  }

  public static function print(string $title, string $text, DebugLevel $level = DebugLevel::INFO, array $params = [], string $file = null) : void {
    $format = self::LineFormat($title, $text, $params, $file);
    if(DEV_MODE) print "<div style=\"color:".$level->getColor()."; font-size: 16px; padding: 5px 10px;\">[".$level->getName()."] $format </div>";
  }

  public static function log(string $text, array $params = [], DebugLevel $level = DebugLevel::INFO) : void {
    self::$core->log($level->getMLevel(), $text, $params);
  }

  public static function debug(string $title, string $text, array $params = []) : void {
    self::$core->debug("$title: $text", $params);
  }

  public static function error(string $title, string $text, array $params = [], string $file = null) : void {
    self::$core->error("$title: $text", $params);
    self::print($title, $text, DebugLevel::ERROR, $params, $file);
  }

  public static function critical(string $title, string $text, array $params = [], string $file = null) : never {
    self::$core->critical($text, $params);
    self::print($title, $text, DebugLevel::CRITICAL, $params, $file);
    exit;
  }

  public static function warning(string $title, string $text, array $params = [], string $file = null) : void {
    self::$core->warning("$title: $text", $params);
    self::print($title, $text, DebugLevel::WARNING, $params, $file);
  }

  public static function success(string $title, string $text, array $params = []) : void {
    self::$core->info("$title: $text", $params);
  }

  private static function LineFormat(string $title, string $text, array $params = [], string $file = null) : string {
    if(isset($title)) $line = str_replace('{title}', $title, self::$format[0]);
    $line = str_replace('{text}', $text, self::$format[1]);
    if(isset($file)) $line .= str_replace('{file}', $file, self::$format[2]);
    if(count($params) > 0) $line .= str_replace('{params}', json_encode($params), self::$format[3]);

    return $line;
  }
}

class Logger {
  private $logger;

  public function __construct(string $name, string $path) {
    $this->logger = (new MLogger($name))->pushHandler(new StreamHandler(DOCUMENT_ROOT."/data/logs/$path"));
  }

  public function getLogger() : MLogger {
    return $this->logger;
  }

  public function __destruct() {
    $this->logger->close();
  }
}

enum DebugLevel: int
{
  case DEBUG     = 0;
  case INFO      = 1;
  case NOTICE    = 2;
  case WARNING   = 3;
  case ERROR     = 4;
  case CRITICAL  = 5;
  case ALERT     = 6;
  case SUCCESS   = 7;

  public function getMLevel() : MLevel
  {
    return match ($this) {
      self::DEBUG => MLevel::Debug,
      self::INFO => MLevel::Info,
      self::NOTICE => MLevel::Notice,
      self::WARNING => MLevel::Warning,
      self::ERROR => MLevel::Error,
      self::CRITICAL => MLevel::Critical,
      self::ALERT => MLevel::Alert,
      self::SUCCESS => MLevel::Info,
    };
  }

  public function getColor() : string
  {
    return match ($this) {
      self::DEBUG => '#4c4c4c',
      self::INFO => '#00adff',
      self::NOTICE => '#00adff',
      self::WARNING => '#ff9800',
      self::ERROR => '#ff4a4a',
      self::CRITICAL => 'red',
      self::ALERT => '#009688',
      self::SUCCESS => '#4caf50'
    };
  }

  public function getName() : string
  {
    return match ($this) {
      self::DEBUG => 'DEBUG',
      self::INFO => 'INFO',
      self::NOTICE => 'NOTICE',
      self::WARNING => 'WARNING',
      self::ERROR => 'ERROR',
      self::CRITICAL => 'CRITICAL',
      self::ALERT => 'ALERT',
      self::SUCCESS => 'SUCCESS'
    };
  }
}
