<?php
include_once 'db_connect.php';
include_once 'functions.php';

sec_session_start();

class major {
    private $username;
    private $majorID;
    private $d_month;
    private $d_year;

    public function __construct($un, $maj, $dm, $dy)
    {
        $this->username = $un;
        $this->majorID = $maj;
        $this->d_month = $dm;
        $this->d_year =$dy;
    }

    public function prepare_conjunction()
    {
        $date = $this->d_year . $this->d_month;
        return "(major_id = " . $this->majorID . " AND date_start <= " . $date . " AND date_end >= " . $date . ")";
    }
}

    function prepare_row($ID, $name, $cred)
    {
        return '<tr><td><input type = "checkbox" name ="' . $ID . '"</td>' .
                    '<td>' . $ID . '</td>' .
                    '<td>' . $name . '</td>' .
                    '<td>' . $cred . '</td></tr>';
    }
if(isset($_SESSION['username']))
{
    //Get student major(s)
    $user = $_SESSION['username'];

    $stmt = $mysqli->prepare("SELECT major_id, declared_month, declared_year
                      FROM   student_major
                      WHERE  username = ?");
    $stmt->bind_param('s', $user);
    $stmt->execute();    // Execute the prepared query.

    $stmt->bind_result($maj, $decm, $decy);

    $major = array();
    while($stmt->fetch())
    {
        $major[] = new major($user, $maj, $decm, $decy);
    }


    $disjunction = $major[0]->prepare_conjunction();
    for($i=1;$i<count($major); $i++)
    {
        $disjunction = $disjunction . " OR " . $major[$i]->prepare_conjunction();
    }

    //Get courses required for that the student needs
    /*
    echo "SELECT courseID, course_name, credits
                              FROM course_info
                              WHERE courseID in (SELECT courseID
                                                 FROM major_required_courses
                                                 WHERE " . $disjunction .")
                                    AND
                                    NOT courseID in (SELECT courseID
                                                     FROM   student_course
                                                     WHERE  username = ?)";
    */

    $stmt = $mysqli->prepare("SELECT courseID, course_name, credits
                              FROM course_info
                              WHERE courseID in (SELECT courseID
                                                 FROM major_required_courses
                                                 WHERE " . $disjunction .")
                                    AND
                                    NOT courseID in (SELECT courseID
                                                     FROM   student_course
                                                     WHERE  username = ?)");
    $stmt->bind_param('s', $user);
    $stmt->execute();    // Execute the prepared query.
    $stmt->store_result();
    $stmt->bind_result( $cid, $cn, $cr);
    while($stmt->fetch())
    {
        echo prepare_row($cid, $cn, $cr, $index);
    }
}
else
{
    echo "Please sign in.";
}
?>