<?php
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

if (isset($_POST['action'])) {
    $action = $_POST['action'];
} else {
    $action = "";
}


if($action == "toXmlFile") 
{
   $xml = simplexml_load_string($_POST['file']);
   
   echo $xml->asXML();
}

if($action == "importFile") {
	
		/*$xml = "<?xml version=’1.0′ encoding=’UTF-8′?><whatever></whatever>;";*/
		$xml = simplexml_load_string($_POST['file']);
                //var_dump($xml);
		if($xml === false)
		{
			echo "Failed loading XML: ";
    		foreach(libxml_get_errors() as $error) {
        		echo "<br>", $error->message;
			}
		}
		else
		{	
			insertData($xml);
			
		}
	
}

function insertData($xml) {

   $mysqli = new mysqli("localhost","sec_user","Uzg82t=u%#bNgPJw","GPA_Tracker");

   foreach($xml->main[0]->children() as $rows) {

      //foreach($data->children() as $rows) {

         if($rows['name'] == "baseData") {

            $first = $rows->field[0];
            $last = $rows->field[1];
            $username = $rows->field[3];
            $email = $rows->field[4];
            $major = $rows->field[5];
            $date = $rows->field[6];
            $gpa = $rows->field[7];
var_dump($last);

            // Register user
            $password = strtolower($first + $last);
            $hash_password = password_hash($password, PASSWORD_DEFAULT);
            $stmt = $mysqli->prepare("INSERT INTO Users (email, username, password, firstName, lastName, type) 
		VALUES (?, ?, ?, ?, ?, 0)");
            $stmt->bind_param('sssss', $email, $username, $hash_password, $first, $last);
            $stmt->execute();
            
            // Getting userID
            $stmt = $mysqli->prepare("SELECT userID FROM Users WHERE username = ?");
            $stmt->bind_param('s', $username);
            $stmt->execute();
            $stmt->bind_result($user);
            $stmt->fetch();
            

            // Inserting gpa
            $stmt = $mysqli->prepare("UPDATE Users SET gpa = ? WHERE userID = ?");
	    $stmt->bind_param('ss',$gpa, $user);
            $stmt->execute();

            // Inserting major
            $stmt = $mysqli->prepare("INSERT INTO StudentMajor (userID, majorID, declaredDate) VALUES (?, ?, ?)
                                      ON DUPLICATE KEY UPDATE declaredDate=VALUES(declaredDate)");
	    $stmt->bind_param('sss', $user, $rows->field[4], $rows->field[5]);
    	    $stmt->execute();
         
         }

         if($data['name'] == "courseTaken") {

            $bucket = $rows->field[0];
            $courseID = $rows->field[1];
            $grade = $rows->field[2];
            $credits = $rows->field[3];
            $semester = $rows->field[4];
            $year = $rows->field[5];

            // Check if course is in database
            $courseInfoID = $mysqli->select("SELECT courseInfoID FROM CourseInfo WHERE courseID = ?", $courseID);

            // If course is not in database then insert
            if (count($courseInfoID) == 0) {
                
                $params = array($courseID, $courseName, $credits);
                $mysqli->query("INSERT INTO CourseInfo (courseID, courseName, credits) VALUES (?, ?, ?)", $params);
            }

            // Insert course
            $params = array($grade, $semester, $year, $courseID, $user);
            $stmt = $mysqli->prepare("INSERT INTO StudentCourse (grade, weight, relevance, semester, year,
           courseInfoID, selected, userID) VALUES (?, 0, 0, ?, ?, (SELECT CourseInfoID FROM CourseInfo
           WHERE courseID = ?), 0, ?)", $params);
    	    $stmt->execute();


         }
      //}
   }






}








