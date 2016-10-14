<?php
   include_once 'db_connect.php';
	include_once 'functions.php';
	include_once 'psl-config.php';


    sec_session_start();
    $username = $_SESSION['username'];
    $conn = new mysqli(HOST, USER, PASSWORD, DATABASE);



			
    //Check if user is an admin.
	 $userID = $_SESSION['userID'];
    if($stmt = $conn->prepare("SELECT type
                               From Users
                               Where userID = ?")) {
        $stmt->bind_param('s', $userID);
        $stmt->execute();
        $stmt->store_result();
       
        $stmt->bind_result($type);

	$typeUser;
    while($stmt->fetch())
    {
        $typeUser = $type;
    }
        //echo $type;
    


						

        if ($type == "1") {
            $sql = "INSERT INTO CourseInfo (courseID, courseName, credits) VALUES ('"  .
                $_POST['courseID']   .
                "', '"               .
                $_POST['courseName'] .
                "', '"               .
                $_POST['credits']     .
                "')";

            if($conn->query($sql) === TRUE)
            {
                echo "<h1>Course Entered</h1>";
            }
            else
            {
                echo "<h1>Error</h1>";
            }
        } else {
            header('Location: ../index.php?error=1');
        }
    }
?>
