<?php
include_once '../dbconnector.php';
//include_once '../toLog.php';

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

//$log = new ErrorLog();

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
	
		
		$xml = simplexml_load_string($_POST['file']);
                
		if($xml === false)
		{
			echo "Failed loading XML: ";
    		        foreach(libxml_get_errors() as $error) {
        		      echo "<br>", $error->message;
			}
		}
		else
		{	
			if(insertData($xml)) {
		  		echo "Data imported successfully.";
                                //return "true";
			}
			
		}
	
}

function insertData($xml) {

   $db = new DatabaseConnector();
   $takenCourses = array();

   foreach($xml->children() as $rows) {

         if ($rows->getName() == "baseData") {
             $baseData = $rows;
	     foreach($baseData->children() as $studentInfo) {
                 if ($studentInfo->getName() == "firstName")
                    $first = $studentInfo;
                 elseif ($studentInfo->getName() == "lastName") 
                    $last = $studentInfo;
                 elseif ($studentInfo->getName() == "userName") 
                    $userName = $studentInfo;
                 elseif ($studentInfo->getName() == "email") 
                    $email = $studentInfo;
                 elseif ($studentInfo->getName() == "majorName") 
                    $majorName = $studentInfo;
                 elseif ($studentInfo->getName() == "declaredDate") 
                    $declaredDate = $studentInfo;
                 elseif ($studentInfo->getName() == "gpa") 
                    $gpa = $studentInfo;
             }

             // Register user
             $password = strtolower($first);
             $hash_password = password_hash($password, PASSWORD_DEFAULT);
             $params = array($email, $userName, $hash_password, $first, $last);   
             $db->query("INSERT INTO Users (email, userName, password, firstName, lastName, type) VALUES (?, ?, ?, ?, ?, 0)", $params);

             
             //$log->toLog(0, __METHOD__, "User Registered: email:$email, user name:$userName, first name:$first, last name:$last");

             // Getting userID
             $params = array($userName);
             $stmt = $db->select("SELECT userID FROM Users WHERE userName = ?", $params);
             $userID = $stmt[0][0];

             // Inserting gpa
             $params = array($gpa, $userID);   
             $db->query("UPDATE Users SET gpa = ? WHERE userID = ?", $params);

             // Inserting major
             $params = array($userID, $majorName);   
             $db->query("INSERT INTO StudentMajor (userID, majorID, declaredDate) VALUES (?, (SELECT majorID from Major WHERE majorName = ?), '1000-01-01')", $params);
	 }
         elseif ($rows->getName() == "courseTaken") {
             $courseTaken = $rows;
             foreach($courseTaken->children() as $courseTakenInfo) {
                 if ($courseTakenInfo->getName() == "bucket")
                    $takenBucket = $courseTakenInfo;
                 elseif ($courseTakenInfo->getName() == "courseID")
                    $takenID = $courseTakenInfo;
                 elseif ($courseTakenInfo->getName() == "courseName")
                    $takenName = $courseTakenInfo;
                 elseif ($courseTakenInfo->getName() == "grade")
                    $takenGrade = $courseTakenInfo;
                 elseif ($courseTakenInfo->getName() == "credits")
                    $takenCredits = $courseTakenInfo;
                 elseif ($courseTakenInfo->getName() == "semester")
                    $takenSemester = $courseTakenInfo;
                 elseif ($courseTakenInfo->getName() == "year")
                    $takenYear = $courseTakenInfo;
              }
    
             // Check if course is in database
             $params = array($takenID);
             $stmt = $db->select("SELECT courseInfoID FROM CourseInfo WHERE courseID = ?", $params);
             $count = $stmt[0][0];

             // If course is not in database then insert
             if (count($count) == 0) {
                $params = array($takenID, $takenName, $takenCredits);   
                $db->query("INSERT INTO CourseInfo (courseID, courseName, credits) VALUES (?, ?, ?)", $params);
             }

             array_push($takenCourses, array($takenID, $takenGrade));

             // Insert course
             $params = array($takenGrade, $takenSemester, $takenYear, $takenID, $userID);
             $db->query("INSERT INTO StudentCourse (grade, weight, relevance, semester, year,
                         courseInfoID, selected, userID) VALUES (?, 0, 0, ?, ?, (SELECT CourseInfoID FROM CourseInfo
                         WHERE courseID = ?), 0, ?)", $params);
         }
         elseif ($rows->getName() == "courseIP") {
             $courseIP = $rows;
             foreach($courseIP->children() as $courseIPInfo) {
                 if ($courseIPInfo->getName() == "bucket")
                    $IPBucket = $courseIPInfo;
                 elseif ($courseIPInfo->getName() == "courseID")
                    $IPID = $courseIPInfo;
                 elseif ($courseIPInfo->getName() == "courseName")
                    $IPName = $courseIPInfo;
                 elseif ($courseIPInfo->getName() == "credits")
                    $IPCredits = $courseIPInfo;
                 elseif ($courseIPInfo->getName() == "semester")
                    $IPSemester = $courseIPInfo;
                 elseif ($courseIPInfo->getName() == "year")
                    $IPYear = $courseIPInfo;
              }

              $IPGrade = 'IP';
              // Check if course is in database
              $params = array($IPID);
              $stmt = $db->select("SELECT courseInfoID FROM CourseInfo WHERE courseID = ?", $params);
              $count = $stmt[0][0];

             // If course is not in database then insert
             if (count($count) == 0) {
                $params = array($IPID, $IPName, $IPCredits);   
                $db->query("INSERT INTO CourseInfo (courseID, courseName, credits) VALUES (?, ?, ?)", $params);
             }

             array_push($takenCourses, array($IPID, $IPGrade));

             // Insert course
             $params = array($IPGrade, $IPSemester, $IPYear, $IPID, $userID);
             $db->query("INSERT INTO StudentCourse (grade, weight, relevance, semester, year,
                         courseInfoID, selected, userID) VALUES (?, 0, 0, ?, ?, (SELECT CourseInfoID FROM CourseInfo
                         WHERE courseID = ?), 0, ?)", $params);
         }

   }

   echo "User ID: $userID\nPassword: $password\n";
   instantiateNeeded($takenCourses, $userID);
   return true;

}

 function instantiateNeeded($takenCourses, $userID)
    {
        $conn = new DatabaseConnector();

        $param = array($userID);
        $buckets = $conn->select("SELECT MajorBucket.bucketID, MajorBucket.allRequired, MajorBucket.quantityNeeded,
                          MajorBucket.quantification, MajorBucket.description FROM MajorBucket WHERE MajorBucket.parentID IS NULL AND
                          MajorBucket.majorID IN (SELECT StudentMajor.majorID FROM StudentMajor
                          WHERE StudentMajor.userID = ?)", $param);

        foreach ($buckets as $bucket) {
           // if ($bucket[4] == 'UCC' and $uccComplete)
             //   continue;

            checkBucket($takenCourses, $bucket, $userID);
        }
    }

 function checkBucket($takenCourses, $bucket, $userID)
    {
        $conn = new DatabaseConnector();

        $params = array($bucket[0]);
        $childBuckets = $conn->select("SELECT bucketID, allRequired, quantityNeeded, quantification, description
        FROM MajorBucket WHERE MajorBucket.parentID = ?", $params);

        if (count($childBuckets) > 0) {
            foreach ($childBuckets as $childBucket)
                checkBucket($takenCourses, $childBucket, $userID);
        } else {
            $bucketCourses = $conn->select("SELECT CourseInfo.courseID, CourseInfo.credits, CourseInfo.courseInfoID,
            MajorBucketRequiredCourses.minimumGrade FROM CourseInfo INNER JOIN MajorBucketRequiredCourses on
            CourseInfo.courseInfoID = MajorBucketRequiredCourses.courseInfoID
            WHERE MajorBucketRequiredCourses.bucketID = ?", $params);

            $counter = 0;
            $coursesNotTaken = array();
            $bucketCompleted = false;

            foreach ($bucketCourses as $bucketCourse) {
                $passed = false;

                $keys = search($takenCourses, '0', $bucketCourse[0]);

                foreach ($keys as $key) {
                    $grade = convertGrade($key[1]);
                    $minGrade = convertGrade($bucketCourse[3]);

                    if ($minGrade > $grade)
                        continue;

                    if ($bucket[3] == "credits")
                        $counter += $bucketCourse[1];
                    else
                        $counter++;
                    $passed = true;
                    break;
                }

                if (!$passed)
                    array_push($coursesNotTaken, $bucketCourse[2]);

                if ($counter >= $bucket[2]) {
                    $bucketCompleted = true;
                    break;
                }
            }

            if (!$bucketCompleted) {

                foreach ($coursesNotTaken as $courseNotTaken) {
                    $params = array($courseNotTaken, $userID);
                    $conn->query("INSERT INTO StudentCourse (grade, weight, relevance, semester, year, courseInfoID,
                selected, userID) VALUES ('ND', 0, 0, '', 0, ?, 0, ?)", $params);
                }
            }
        }
    }

 function search($array, $key, $value)
    {
        $results = array();

        if (is_array($array)) {
            if (isset($array[$key]) && $array[$key] == $value) {
                $results[] = $array;
            }

            foreach ($array as $subarray) {
                $results = array_merge($results, search($subarray, $key, $value));
            }
        }
        return $results;
    }

 function convertGrade($grade)
    {
        switch ($grade) {
            case 'A':
                return 4.0;
                break;
            case 'A-':
                return 3.7;
                break;
            case 'B+':
                return 3.3;
                break;
            case 'B':
                return 3.0;
                break;
            case 'B-':
                return 2.7;
                break;
            case 'C+':
                return 2.3;
                break;
            case 'C':
                return 2.0;
                break;
            case 'C-':
                return 1.7;
                break;
            case 'D+':
                return 1.3;
                break;
            case 'D':
                return 1.0;
                break;
            case 'D-':
                return .7;
                break;
            case 'F':
                return 0;
                break;
            case 'IP':
                return 5;
                break;

        }
    }

