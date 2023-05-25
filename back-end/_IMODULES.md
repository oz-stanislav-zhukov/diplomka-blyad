# Создание и импорт модулей

### Как создать свой модуль?
```PHP
<?php
namespace ozLEngine\Core;

class ModuleName {
  public static function register() {
    
    Debug::log("ModuleName started!", [time()]);
  }
  
  public static function myStaticFunction() {
    Debug::log("Hi", ['ModuleName::myStaticFunction()']);
  }
  
  public function myFunction() {
    Debug::log("Hi", ['(new ModuleName())->myFunction();']);
  }
}
```
> Если класс одиночка, то делай static

###### Затем его закинуть по этому пути
> /engine/php/modules/

### Как импортировать модуль?
```PHP
use ozLEngine\Core\ModuleName;

$ModuleName = new ModuleName();
$ModuleName->myFunction();

ModuleName::myStaticFunction();
```


### Как запустить register() при запуске?
###### В Core::register() добавь это
```PHP
ModuleName::register();
```
![image](https://user-images.githubusercontent.com/35627391/177164638-d22662ca-c7d8-4de4-b800-09928c1346ae.png)

