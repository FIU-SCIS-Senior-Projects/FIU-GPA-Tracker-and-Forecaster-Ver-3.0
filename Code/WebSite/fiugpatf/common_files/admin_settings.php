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
if($action == "importReq") {
	$file = file_get_contents($_FILES['file']['tmp_name']);
	$adminData = simplexml_load_string($file);
	
	if($adminData == false)
	{
		echo "Error loading string. Check File.";
	}
	else
	{
		importDataAdmin($adminData);
	}
}

function importDataAdmin($adminData){
	$mysqli = new mysqli("localhost","sec_user","Uzg82t=u%#bNgPJw","GPA_Tracker");
	foreach($adminData->database[0]->children() as $table_data)
	{
		foreach($table_data->children() as $rows)
		{
			if($table_data['name'] == 'MajorBucket')
			{
				if($rows->field[7] == "null")
				{
					$majorID = $rows->field[0];
					$stmt = $mysqli->prepare("INSERT INTO MajorBucket (majorID, dateStart, dateEnd, description, allRequired, quantityNeeded, quantification, parentID) VALUES (?, ?, ?, ?, ?, ?, ?, null)
                                          ON DUPLICATE KEY UPDATE dateStart=VALUES(dateStart), dateEnd=VALUES(dateEnd), allRequired=VALUES(allRequired), quantification=VALUES(quantification), parentID=VALUES(parentID)");
					$stmt->bind_param('sssssss', $rows->field[0], $rows->field[1], $rows->field[2], $rows->field[3], $rows->field[4], $rows->field[5], $rows->field[6]);
					$stmt->execute();
				}
				else
				{
					$stmt = $mysqli->prepare("SELECT bucketID FROM MajorBucket WHERE majorID = ? and description = ?");
					$stmt->bind_param('ss', $rows->field[0], $rows->field[7]);
					$stmt->execute();
					$stmt->bind_result($parentID);
					$stmt->fetch();
					              
					$mysqli = new mysqli("localhost","sec_user","Uzg82t=u%#bNgPJw","GPA_Tracker");
					$stmt = $mysqli->prepare("INSERT INTO MajorBucket (majorID, dateStart, dateEnd, description, allRequired, quantityNeeded, quantification, parentID) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                                          ON DUPLICATE KEY UPDATE dateStart=VALUES(dateStart), dateEnd=VALUES(dateEnd), allRequired=VALUES(allRequired), quantification=VALUES(quantification), parentID=VALUES(parentID)");
					if($stmt == false)
					{
						echo $stmt->error;
					}
					else
					{
						$stmt->bind_param('sssssssi', $rows->field[0], $rows->field[1], $rows->field[2], $rows->field[3], $rows->field[4], $rows->field[5], $rows->field[6], $parentID);
						$stmt->execute();
					}
				}
			}
			else if($table_data['name'] == 'CourseInfo'){
				$stmt = $mysqli->prepare("INSERT INTO CourseInfo (courseID, courseName, credits) VALUES (?, ?, ?)
                                          ON DUPLICATE KEY UPDATE courseName=VALUES(courseName), credits=VALUES(credits)");
                $stmt->bind_param('sss', $rows->field[0], $rows->field[1], $rows->field[2]);
                $stmt->execute();
			}
			else if($table_data['name'] == 'MajorBucketRequiredCourses'){
				$stmt = $mysqli->prepare("INSERT INTO MajorBucketRequiredCourses (courseInfoID, bucketID, minimumGrade) VALUES ((SELECT courseInfoID FROM CourseInfo WHERE courseID = ?), (SELECT bucketID FROM MajorBucket WHERE majorID = ? and description = ?), ?)
                                          ON DUPLICATE KEY UPDATE courseInfoID=VALUES(courseInfoID), bucketID=VALUES(bucketID), minimumGrade=VALUES(minimumGrade)");
                $stmt->bind_param('ssss', $rows->field[0], $majorID, $rows->field[1], $rows->field[2]);
                $stmt->execute();
			}
		}
	}
}

if($action == "prepareTable") {
	if (isset($_SESSION['username'])) {

$mysqli = new mysqli("localhost","sec_user","Uzg82t=u%#bNgPJw","GPA_Tracker");
        $stmt = $mysqli->prepare("SELECT type
        FROM Users
        WHERE userID=?");
        $stmt->bind_param('s', $_SESSION['userID']);
        $stmt->execute();
        $stmt->bind_result($admin);
        $stmt->fetch();
		$output = array();
		array_push($output, array("Change Password", ""));
		array_push($output, array("Change Major", ""));
		array_push($output, array("Change Themes", ""));
		array_push($output, array("Export Data", '<button type="button" id="ExportButton">Admin Export Data</button>'));
		array_push($output, array("Import Data", '<input type="file" id="ImportFile">'));
		array_push($output, array("Delete Data", '<button type="button" id="DeleteButton">Delete Data</button>'));
		array_push($output, array("Import GPA Audit (PDF)", '<form id="PDFimport" action="settings.php" enctype="multipart/form-data" method="post"><input type="file" name="file" id="Whatif"><input type="hidden" name="action" value="importWhatif"></form>'));
		if($admin == 1)
		{
			array_push($output, array("Import Requirments", '<form id="Reqimport" action="settings.php" enctype="multipart/form-data" method="post"><input type="file" name="file" id="ImportReqirments"><input type="hidden" name="action" value="importReq"></form>'));
		}
		
		echo json_encode($output);
	}
}

if($action == "exportData") {
	if (isset($_SESSION['username'])) {
		$user = $_SESSION['username'];
		$dump = shell_exec('mysqldump --user=root --password=sqliscool --host=localhost --no-create-info --xml GPA_Tracker Users  StudentCourse  StudentMajor  AssessmentType Assessment ');
		echo $dump;
	}
}
?>
