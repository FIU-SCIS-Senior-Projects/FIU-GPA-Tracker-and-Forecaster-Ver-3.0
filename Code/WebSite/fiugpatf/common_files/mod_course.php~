<?php
include_once 'db_connect.php';
include_once 'functions.php';


sec_session_start();





if (isset($_POST['action'])) {
    
    //echo json_encode('inside isset');
    $action = $_POST['action'];
}


else {
    var_dump($_POST);
    echo 'inside else';
    $action = "";
}


if ($action == "courseMod") {
    
    

    $stmt = $mysqli->prepare("SELECT courseID, course_name, credits FROM course_info ");
    
    
    $stmt->execute();
    $stmt->bind_result($CID, $CName, $credit);
    $output = array();
    while ($stmt->fetch()) {
        array_push($output, array(
            $CID,
            $CName,
            $credit
        ));
    }
    echo json_encode($output);  
 }

if ($action == "deleteItem") {
    
    
    if (isset($_POST['courseID'])) {
        $courseID = $_POST['courseID'];
    } else {
        $courseID = "";
    }
    
 
    $sql  = "DELETE FROM course_info WHERE courseID = '".$courseID."' ";
    
    if ($mysqli->query($sql) === TRUE) {
        //mysql_query($sql);
        $result = array(
            'success' => true
        );
    } else {
        $result = array(
            'success' => false,
            'message' => 'Item could not be deleted'
        );
    }
    
    
    
    
    echo json_encode($result);
}

if ($action == "modCourse") {
    
    
    if (isset($_POST['courseID'])) {
        $courseID = $_POST['courseID'];
    } else {
        $courseID = "";
    }
    
    
    if (isset($_POST['modifiedCourse'])) {
        $modifiedCourse = $_POST['modifiedCourse'];
    } else {
        $modifiedCourse = "";
    }
    
    if (isset($_POST['modifiedName'])) {
        $modifiedName = $_POST['modifiedName'];
    } else {
        $modifiedName = "";
    }
    
 if (isset($_POST['modifiedCredits'])) {
        $modifiedCredits = $_POST['modifiedCredits'];
    } else {
        $modifiedCredits = "";
    }
    
    
    
    
    $sql  = "UPDATE course_info SET  courseID ='".$modifiedCourse."', credits ='".$modifiedCredits."', course_name = '".$modifiedName."' WHERE courseID = '".$courseID."' ";
    
    
    
    if ($mysqli->query($sql) === TRUE) {
        
        $result = array(
            'success' => true
        );
    } else {
        $result = array(
            'success' => false,
            'message' => 'Item could not be deleted'
        );
    }
    
    
    
    
    echo json_encode($result);
    
    
}

?>
