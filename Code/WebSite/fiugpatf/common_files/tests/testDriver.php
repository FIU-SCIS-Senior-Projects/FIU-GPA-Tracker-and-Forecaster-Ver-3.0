<?php
include_once '../toLog.php';
$session_name = 'sec_session_id';   // Set a custom session name
$secure = FALSE;
// This stops JavaScript being able to access the session id.
$httponly = true;
// Forces sessions to only use cookies.
if (ini_set('session.use_only_cookies', 1) === FALSE) {
    header("Location: ../error.php?err=Could not initiate a safe session (ini_set)");
    exit();
}
// Gets current cookies params.
$cookieParams = session_get_cookie_params();
session_set_cookie_params($cookieParams["lifetime"],
    $cookieParams["path"],
    $cookieParams["domain"],
    $secure,
    $httponly);
// Sets the session name to the one set above.
session_name($session_name);
session_start();

$log = new ErrorLog();

if (isset($_POST['action'])) {
    $action = $_POST['action'];
} else {
    $action = "";
}


if($action == "toXmlFile") 
{
   $xml = simplexml_load_string($_POST['file']);
   
   echo $xml->asXML();

   $log->toLog(0, __METHOD__, "New XML Generated: $xml");
   $log->toLog(1, __METHOD__, "XML imported successfully");
}


