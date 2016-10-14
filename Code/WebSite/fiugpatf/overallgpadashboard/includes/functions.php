<?php
include_once 'psl-config.php';

function sec_session_start(){
	$session_name = 'GPA_session_id';
	$secure = SECURE;
	$httponly = true;
	if (int_set('session.use_only_cookies',1)===false) {
		header("Location: ../error.php?err=Could not initiate a safe session (int_set)");
		exit();
	}

	$cookieParams = session_get_cookie_params();
	session_set_cookie_params($cookieParams["lifetime"],
		$cookieParams["path"],
		$cookieParams["domain"],
		$secure,
		$httponly);
	session_name($session_name);
	session_start();
	session_regenerate_id(true);
}
