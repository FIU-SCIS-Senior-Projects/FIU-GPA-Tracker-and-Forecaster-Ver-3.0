<?php
//include_once 'db_connect.php';
//include_once 'functions.php';

//sec_session_start();

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

//For test purposes only
if(!isset($_SESSION['userID']))
{
	$_SESSION['userID'] = 2;
}

if (isset($_POST['action'])) {
    $action = $_POST['action'];
} else {
    $action = "";
}

if($action == "currCourses") {
    if (isset($_SESSION['userID'])) {
        $mysqli = new mysqli("localhost","sec_user","Uzg82t=u%#bNgPJw","GPA_Tracker");
        $user = $_SESSION['userID'];
        $user = 2; //Test purposes
        $stmt = $mysqli->prepare("SELECT courseID, courseName, credits         
        FROM   CourseInfo     
        WHERE courseInfoID in (select S.courseInfoID         
        	FROM   StudentCourse as S        
        	WHERE grade = 'IP' AND userID = ?)");
        $stmt->bind_param('s', $user);
        $stmt->execute();
        $stmt->bind_result($coid, $con, $credit);
        $output = array();
        while ($stmt->fetch()) {
			$grade = getGrade($user, $coid);
			if($grade != 'No Grades') {
				array_push($output, array($coid, $con, $credit, round($grade, 2)));
			}
			else
			{
				array_push($output, array($coid, $con, $credit, $grade));
			}
        }
        echo json_encode($output);

    } else {
        echo "log in";
      }
}

if($action == 'remove')
{
    if(isset($_SESSION['userID']) AND isset($_POST['id']))
    {
        $mysqli = new mysqli("localhost","root","sqliscool","GPA_Tracker");
        $user = $_SESSION['userID'];
        $user = 2; //Test purposes
        $stmt = $mysqli->prepare("Delete 
        FROM StudentCourse 
        WHERE userID = ? 
        AND 
        grade = 'IP'
        AND courseInfoID in (SELECT C.courseInfoID
        	FROM CourseInfo C
        	Where courseID = ?)");
        $stmt->bind_param('ss', $user, $_POST['id']);
        $stmt->execute();
        echo "true";
    }
}

function getGrade($user, $course)
{
	$user = 2; //Test purposes
	$mysqli = new mysqli("localhost","sec_user","Uzg82t=u%#bNgPJw","GPA_Tracker");
    $stmt = $mysqli->prepare("SELECT assessmentName, percentage
    FROM   AssessmentType
    WHERE  studentCourseID in (SELECT studentCourseID
        FROM StudentCourse
        WHERE grade = 'IP' and userID = ? and courseInfoID in (select courseInfoID 
            FROM CourseInfo 
            WHERE courseID = ?))");
    $stmt->bind_param('ss', $user, $course);
    $stmt->execute();
    $stmt->bind_result($bucket, $per);

    $average = 0;
    $grade;
    $totalPer = 0;
    while($stmt->fetch())
    {
        $grade = averageAssess($bucket, $user, $course);
        if($grade != " ")
        {
            $average += $grade * $per;
            $totalPer += $per;
        }
    }

    if($totalPer == 0)
    {
        return "No Grades";
    }
    else{
        return $average/$totalPer;
    }
}

function averageAssess($category, $user, $course)
{
	$user = 2; //Test purposes
    $conn = new mysqli("localhost","sec_user","Uzg82t=u%#bNgPJw","GPA_Tracker");
    $stmt = $conn->prepare("SELECT grade
        FROM   Assessment
        WHERE  assessmentTypeID in (select assessmentTypeID 
        	FROM AssessmentType 
        	WHERE AssessmentName = ?) 
        AND 
        studentCourseID in (SELECT studentCourseID
        	FROM StudentCourse
			WHERE grade = 'IP' and userID = ? 
			AND courseInfoID in (select courseInfoID 
				FROM CourseInfo 
				WHERE courseID = ?))");
    $stmt->bind_param('sss', $category, $user, $course);
    $stmt->execute();
    $stmt->bind_result($Assessgrade);
    $runAvg = 0;
    $count = 0;
    while($stmt->fetch())
    {
        $runAvg += $Assessgrade;
        $count++;
    }
    if($count != 0)
    {
        return round($runAvg / $count, 2);
    }
    else{
        return " ";
    }
}
?>
