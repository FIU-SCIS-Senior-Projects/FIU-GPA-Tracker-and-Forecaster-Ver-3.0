<?php
include_once 'psl-config.php';
include_once 'functions.php';

sec_session_start();

if(isset($_SESSION['username']))
{
    echo "<li><a href=\"../overallgpadashboard/OvrlDash.html\">GPA Dashboard</a></li>";
    echo "<li><a href=\"../sem_dashboard/semesterDashboard.html\">Semester Dashboard</a></li>";
	echo "<li><a href=\"../common_files/settings.html\">Settings</a></li>";
    echo "<li><a href=../common_files/help.html>Help</a></li>";
    echo "<li><a href=../common_files/logout.php>Logout</a></li>";
}
else
{
    echo "<li><a href=\"register.html\">Register</a></li>";
    echo "<li><a href=\"../login.html\">Log in</a></li>";
    echo "<li><a href=../common_files/help.html>About</a></li>";
}
?>
