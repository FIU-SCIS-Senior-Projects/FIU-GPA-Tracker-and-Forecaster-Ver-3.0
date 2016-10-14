<?php
if(password_verify($_GET['password'], $_GET['hash']))
{
	echo "true";
}
else
{
	echo "false";
}
?>
