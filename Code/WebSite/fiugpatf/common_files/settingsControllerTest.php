<?php

include_once'../common_files/dbconnector.php';
include_once 'settingscontroller.php';

class settingsControllerTest extends PHPUnit_Framework_TestCase {

    /*Purpose: Ensure that the correct major is pushed into the database when a logged in user imports a GPA Audit
      Preconditions:
      1. UserID 31 exists as new user
      2. UserID 31 logs in and imports Computers Science major GPA Audit
      Follow up: when test drivers are completed save audit template
    */
    public function test01() {
        // Arrange
        $db = new DatabaseConnector();

        // Act
        $stmt = "SELECT StudentMajor.majorID FROM StudentMajor WHERE StudentMajor.userID = ?";
        $params = array("31");
        $out = $db->select($stmt, $params);

        $expected = "select majorID from Major where majorName = ?";
        $params2 = array("Computer Science");
        $expectedout = $db->select($expected, $params2);
        // Assert
        $this->assertEquals($out[0], $expectedout[0]);
    }

    //Purpose: Ensure that the correct gpa is pushed into the database when a logged in user imports a GPA Audit
    public function test02() {
        // Arrange
        $db = new DatabaseConnector();

        // Act
        $stmt = "SELECT gpa FROM Users WHERE userID = ?";
        $params = array("31");
        $out = $db->select($stmt, $params);

        $expected = [[3.22]];

        // Assert
        $this->assertEquals($out[0], $expected[0]);
    }

    //Purpose: Ensure that the correct courses and courses info are pushed into the database when a logged in user imports a GPA Audit
    public function test03() {
        // Arrange
        $db = new DatabaseConnector();

        // Act
        $stmt = "SELECT grade, semester, year, courseInfoID FROM StudentCourse WHERE userID = ?";
        $params = array("31");
        $out = $db->select($stmt, $params);

        $expected = [
            ["B+", "Fall", "2011", "4"],
            ["A", "Fall", "2011", "5"],
            ["B", "Fall", "2011", "333"],
            ["B", "Fall", "2011", "334"],
            ["A", "Fall", "2011", "241"],
            ["A", "Fall", "2011", "25"],
            ["B+", "Spring", "2012", "37"],
            ["C+", "Spring", "2012", "26"],
            ["C+", "Spring", "2012", "57"],
            ["A", "Spring", "2012", "34"],
            ["A-", "Spring", "2012", "802"],
            ["A", "Fall", "2012", "1"],
            ["B+", "Fall", "2012", "320"],
            ["A-", "Fall", "2012", "210"],
            ["A-", "Fall", "2012", "44"],
            ["A", "Fall", "2012", "35"],
            ["A", "Spring", "2013", "42"],
            ["B+", "Spring", "2013", "766"],
            ["DR", "Spring", "2013", "2"],
            ["DR", "Spring", "2013", "763"],
            ["A", "Spring", "2013", "63"],
            ["C+", "Summer", "2013", "17"],
            ["C+", "Summer", "2013", "2"],
            ["P", "Fall", "2013", "46"],
            ["C+", "Fall", "2013", "3"],
            ["A", "Fall", "2013", "763"],
            ["DR", "Fall", "2013", "396"],
            ["F", "Spring", "2014", "59"],
            ["F", "Spring", "2014", "14"],
            ["DR", "Spring", "2014", "16"],
            ["C", "Summer", "2014", "59"],
            ["B+", "Summer", "2014", "19"],
            ["F", "Fall", "2014", "54"],
            ["F", "Fall", "2014", "50"],
            ["B", "Spring", "2015", "14"],
            ["A", "Spring", "2015", "394"],
            ["A", "Summer", "2015", "16"],
            ["A", "Summer", "2015", "392"],
            ["D", "Fall", "2015", "39"],
            ["C+", "Fall", "2015", "54"],
            ["B+", "Fall", "2015", "41"],
            ["A", "Spring", "2016", "39"],
            ["DR", "Spring", "2016", "377"],
            ["A-", "Spring", "2016", "36"],
            ["B", "Summer", "2016", "60"],
            ["A", "Summer", "2016", "20"],
            ["IP", "Fall", "2016", "370"],
            ["IP", "Fall", "2016", "377"]
        ];

        // Assert
        $this->assertEquals($out, $expected);
    }

    //Purpose: Ensure that a user's courses are deleted from the database when a the user deletes data
    public function test04() {
        // Arrange
        $db = new DatabaseConnector();

        // Act
        $stmt = "SELECT grade, weight, relevance, semester, year, courseInfoID FROM StudentCourse WHERE userID = ?";
        $params = array("35");
        $out = $db->select($stmt, $params);

        $expected = [];

        // Assert
        $this->assertEquals($out, $expected);
    }

    //Purpose: Ensure that the correct user's course info is pushed into the database for a user that imports data
    public function test05() {
        // Arrange
        $db = new DatabaseConnector();

        // Act
        $stmt = "SELECT grade, semester, year, courseInfoID FROM StudentCourse WHERE userID = ?";
        $params = array("36");
        $out = $db->select($stmt, $params);

        $expected = [
            ["B+", "Fall", "2011", "4"],
            ["A", "Fall", "2011", "5"],
            ["B", "Fall", "2011", "333"],
            ["B", "Fall", "2011", "334"],
            ["A", "Fall", "2011", "241"],
            ["A", "Fall", "2011", "25"],
            ["B+", "Spring", "2012", "37"],
            ["C+", "Spring", "2012", "26"],
            ["C+", "Spring", "2012", "57"],
            ["A", "Spring", "2012", "34"],
            ["A-", "Spring", "2012", "802"],
            ["A", "Fall", "2012", "1"],
            ["B+", "Fall", "2012", "320"],
            ["A-", "Fall", "2012", "210"],
            ["A-", "Fall", "2012", "44"],
            ["A", "Fall", "2012", "35"],
            ["A", "Spring", "2013", "42"],
            ["B+", "Spring", "2013", "766"],
            ["DR", "Spring", "2013", "2"],
            ["DR", "Spring", "2013", "763"],
            ["A", "Spring", "2013", "63"],
            ["C+", "Summer", "2013", "17"],
            ["C+", "Summer", "2013", "2"],
            ["P", "Fall", "2013", "46"],
            ["C+", "Fall", "2013", "3"],
            ["A", "Fall", "2013", "763"],
            ["DR", "Fall", "2013", "396"],
            ["F", "Spring", "2014", "59"],
            ["F", "Spring", "2014", "14"],
            ["DR", "Spring", "2014", "16"],
            ["C", "Summer", "2014", "59"],
            ["B+", "Summer", "2014", "19"],
            ["F", "Fall", "2014", "54"],
            ["F", "Fall", "2014", "50"],
            ["B", "Spring", "2015", "14"],
            ["A", "Spring", "2015", "394"],
            ["A", "Summer", "2015", "16"],
            ["A", "Summer", "2015", "392"],
            ["D", "Fall", "2015", "39"],
            ["C+", "Fall", "2015", "54"],
            ["B+", "Fall", "2015", "41"],
            ["A", "Spring", "2016", "39"],
            ["DR", "Spring", "2016", "377"],
            ["A-", "Spring", "2016", "36"],
            ["B", "Summer", "2016", "60"],
            ["A", "Summer", "2016", "20"],
            ["IP", "Fall", "2016", "370"],
            ["IP", "Fall", "2016", "377"]
        ];

        // Assert
        $this->assertEquals($out, $expected);
    }
}
