<?php
include_once 'db_connect.php';
include_once 'functions.php';

sec_session_start();

foreach ($_POST as $key => $value){
    if($value == "on")
    {
        $conn = new mysqli(HOST, USER, PASSWORD, DATABASE);

        if($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $sql="INSERT INTO student_course (username, courseID, grade, weight, relevance)
                                                  VALUES (\"{$_SESSION['username']}\", \"{$key}\", \"IP\", 1, 1)";
        $conn->query($sql);
        /*
        echo "INSERT INTO student_course (username, courseID, grade, weight, relevance)
                                                  VALUES (?, ?, \"IP\", 1, 1)";
        $stmt = $sqli->prepare("INSERT INTO student_course (username, courseID, grade, weight, relevance)
                                                  VALUES (?, ?, \"IP\", 1, 1);");
        $stmt->bind_param('ss', $_SESSION['username'], $key);
        echo "1";
        $stmt->execute();
        echo "2";
        $stmt->fetch();
        */
    }
}
?>