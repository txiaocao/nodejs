<?php

$file = $argv['1'];

if(is_file($file)){
	$content = php_strip_whitespace($file);
	
	file_put_contents($file,$content);
}