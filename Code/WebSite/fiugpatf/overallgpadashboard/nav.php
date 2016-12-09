<?php
include_once '../common_files/psl-config.php';
include_once '../common_files/functions.php';

sec_session_start();

if (isset($_SESSION['username'])) {
	echo "<li><a href=\"./OvrlDash.html\">GPA Dashboard</a></li>";
    echo "<li><a href=\"../sem_dashboard/current.html\">Grade Dashboard</a></li>";
    echo "<li><a href=#>Logout</a></li>";
} else {
    echo "<li><a href=\"../common_files/register.html\">Register</a></li>";
    echo "<li><a href=\"../login.html\">Log in</a></li>";
    echo "<li><a href=#>About</a></li>";
}
?>
