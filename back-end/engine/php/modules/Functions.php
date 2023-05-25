<?php
namespace ozLEngine\Core;

class Functions {
  public static function GenCode(int $amount = 13, bool $uuid = false, bool $number = false) : string {
		$result = '';
		if($number) $array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
		else $array = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

		for ($i = 0; $i < $amount; $i++) {
			$rand1 = rand(1, count($array)) - 1;
			$rand2 = rand(0, 1);
			if(is_integer($array[$rand1])) {
				$result .= $array[$rand1];
			} else {
				if ($rand2 === 1) $result .= strtoupper($array[$rand1]);
				else $result .= $array[$rand1];
			}
		}

		if(!$uuid) return $result;
		return implode('-', str_split(substr(strtoupper(md5($result)), 0, 16), 4));
	}
    
	/** 
	 * Функция вырезки
	 * @param <string> $str 
	 * @return <string> 
	 */ 
	public static function clearstr(string $str) : string { 
		$sru = 'ёйцукенгшщзхъфывапролджэячсмитьбю'; 
		$s1 = array_merge(self::utf8_str_split($sru), self::utf8_str_split(strtoupper($sru)), range('A', 'Z'), range('a','z'), range('0', '9'), array('&',' ','#',';','%','?',':','(',')','-','_','=','+','[',']',',','.','/','\\')); 
		$codes = array(); 
		for ($i=0; $i<count($s1); $i++) $codes[] = ord($s1[$i]);

		$str_s = self::utf8_str_split($str); 
		for ($i=0; $i<count($str_s); $i++){ 
			if(!in_array(ord($str_s[$i]), $codes)) $str = str_replace($str_s[$i], '', $str);
		}

		return $str; 
	}

	public static function utf8_str_split(string $str) : array { 
		// place each character of the string into and array 
		$split = 1; 
		$array = array(); 
		for ( $i=0; $i < strlen( $str ); ){ 
			$value = ord($str[$i]); 
			if($value > 127){ 
				if($value >= 192 && $value <= 223) $split=2; 
				else if($value >= 224 && $value <= 239) $split=3; 
				else if($value >= 240 && $value <= 247) $split=4; 
			} else $split=1;

      $key = NULL;
			for ( $j = 0; $j < $split; $j++, $i++ ) $key .= $str[$i];
			array_push( $array, $key ); 
		}

		return $array; 
	}

	public static function strFormater(string $str, bool $rus = false) : string {
		if($rus) return preg_replace('/[^a-zA-Zа-яА-Я0-9]/ui', '', $str);
		else return preg_replace('/[^a-zA-Z0-9]/ui', '', $str);
	}

	public static function IsNullOrEmptyString($str){
    return ($str === null || trim($str) === '');
	}
}