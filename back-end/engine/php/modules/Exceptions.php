<?php
namespace ozLEngine\Core;

class ozException extends \Exception {
  private $title = 'ozException';

  public function __construct(string $message, string $title = '', int $code = 0, \Throwable $previous = null) {
    $this->title = $title;
    parent::__construct($message, $code, $previous);
  }

  public function __toString() : string {
    return __CLASS__ . ": [{$this->code}]: {$this->message}\n";
  }

  public function getTitle() : string {
    return $this->title;
  }
}

class zException extends \Exception {
  public function __construct(string $message, int $code = 0, \Throwable $previous = null) {
    parent::__construct($message, $code, $previous);
  }

  public function __toString() : string {
    return __CLASS__ . ": [{$this->code}]: {$this->message}\n";
  }
}