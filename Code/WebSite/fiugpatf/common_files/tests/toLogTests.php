<?php

error_reporting(E_ALL);
ini_set('display_errors', '1');

include_once '../dbconnector.php';
include_once '../toLog.php';



/**
 * Created by PhpStorm.
 * User: Johann Henao
 * Date: 10/13/16
 * Time: 7:01 PM
 */
class toLogTests extends PHPUnit_Framework_TestCase
{

    /*
     * These PHP Unit tests check that the proper log entry is created
     * as well as the proper inclusion of all other test levels as follows:
     *
     * Error should only Write Error log entries and nothing else.
     * Warning should write Warning log entries and Error log entries
     * Info should write:  Info, Warning and Error.
     * Debug should write: Debug, Info, Warning and Error.
     *
     */

    protected $standardMsg = "PHP Unit toLog Test: ";
    protected $MSGError = "PHP Unit toLog Test: ERROR ";
    protected $MSGWarning = "PHP Unit toLog Test: WARNING ";
    protected $MSGInfo = "PHP Unit toLog Test: INFO ";
    protected $MSGDebug = "PHP Unit toLog Test: DEBUG ";
    protected $savedLogStateMsg = " Current Log Level is: ";
    protected $testScenarioBreak = "\n================================================================\n";
    //Set of unit tests ensuring log entry was in fact added to the log file.

    public function findCurrentLogLevel()
    {
        $root = ROOT . "/common_files/settings.ini";

        $settings = parse_ini_file($root , true);
        error_log(date(DATE_RFC2822) . " " .$this->standardMsg . " executed. " . $this->savedLogStateMsg .
            $settings['error_mode']['mode'], 0);
        echo "\n". date(DATE_RFC2822) ." " . $this->standardMsg . " executed. " . $this->savedLogStateMsg  .
            $settings['error_mode']['mode'];
        echo $this->testScenarioBreak;

    }

    public function setLogLevelStateBack()
    {
        //echo "\nin: " . __METHOD__ ;
        $lines = file('/var/log/php_errors.log');
        $counter = 0;
        $lastLogStateFound = 0;
        $foundLastLogState = false;
        foreach($lines as $line)
        {
            // Check if the line contains the string we're looking for, and print if it does
            if(strpos($line, $this->savedLogStateMsg) !== false)
            {
                $lastLogStateFound = $counter;
                $foundLastLogState = true;
            }
            $counter++;
        }

        $logState = substr($lines[$lastLogStateFound],strpos($lines[$lastLogStateFound],$this->savedLogStateMsg) +
            strlen($this->savedLogStateMsg),strlen($lines[$lastLogStateFound]));
        $logState = str_replace(array("\r", "\n"), '', $logState);
        echo "last log state level is: " .$lines[$lastLogStateFound];
        echo "adjusted last log level found: " . $logState;
        $this->updateSettingsFile($logState);
    }

    public function updateSettingsFile($logLevel)
    {

        echo "\nin: " . __METHOD__ . "passed argument is: " . $logLevel;
        $lines = file('../settings.ini');
        $counter = 0;
        foreach($lines as $line)
        {
            // Check if the line contains the string we're looking for, and print if it does
            if(strpos($line, "mode =") !== false)
                break;
            $counter++;
        }

        //echo "\ncounter is: " . $counter;
        $lines[$counter] = "mode = '" .$logLevel . "'";
        $new_content = implode('', $lines);
        $h = fopen('../settings.ini', 'w');
        fwrite($h, $new_content);
        fclose($h);
        //Clear ShareMemory!!!!
        exec("(exec php ../clearMem.php > /dev/null 2>/dev/null &)");
        usleep(500000);
    }

    function testErrorLevel_EntryExists()
    {

        $this->findCurrentLogLevel();
        //First update appropiate log Level and clear Shared Memory
        $this->updateSettingsFile("ERROR");

        $currentTime = microtime(true);
        $msgError = $this->MSGError . $currentTime;
        $msgWarning = $this->MSGWarning . $currentTime;
        $msgInfo = $this->MSGInfo . $currentTime;
        $msgDebug = $this->MSGDebug . $currentTime;

        //Attemt to writ all log level cases, only Error should succeed.
        $log = new ErrorLog();
        $log->toLog(3, __METHOD__, $msgError);
        $log->toLog(2, __METHOD__, $msgWarning);
        $log->toLog(1, __METHOD__, $msgInfo);
        $log->toLog(0, __METHOD__, $msgDebug);
        // Read from file
        $lines = file('../log.txt');
        $foundString ="";
        foreach($lines as $line)
        {
            // Check if the line contains the string we're looking for, and print if it does
            if(strpos($line, $msgError) !== false)
                $foundString = $line;
        }

        echo "\n\n" . __METHOD__ ;
        echo "\nFound log entry String in log.txt file:\n" . $foundString;
        //echo "Position: " . strpos($foundString,$msgError) . "\n";
        $foundString = substr($foundString,strpos($foundString,$msgError));
        $foundString = str_replace(array("\n\r", "\n", "\r"),'',$foundString);
        echo "String passed in toLog():\n" , $msgError . "\n";
        echo "String found in log.txt file is:\n" . $foundString;
        $this->assertEquals($msgError, $foundString);
        echo $this->testScenarioBreak;
    }


    function testWarningLevel_EntryExists()
    {
        //First update appropiate log Level and clear Shared Memory
        $this->updateSettingsFile("WARNING");
        $currentTime = microtime(true);
        $msgError = $this->MSGError . $currentTime;
        $msgWarning = $this->MSGWarning . $currentTime;
        $msgInfo = $this->MSGInfo . $currentTime;
        $msgDebug = $this->MSGDebug . $currentTime;

        //Attemt to writ all log level cases, only Error and Warning should succeed.
        $log = new ErrorLog();
        $log->toLog(3, __METHOD__, $msgError);
        $log->toLog(2, __METHOD__, $msgWarning);
        $log->toLog(1, __METHOD__, $msgInfo);
        $log->toLog(0, __METHOD__, $msgDebug);
        // Read from file
        $lines = file('../log.txt');
        $foundString ="";
        foreach($lines as $line)
        {
            // Check if the line contains the string we're looking for, and print if it does
            if(strpos($line, $msgWarning) !== false)
                $foundString = $line;
        }

        echo "\n\n" . __METHOD__ ;
        echo "\nFound log entry String in log.txt file:\n" . $foundString;
        //echo "Position: " . strpos($foundString,$msgWarning) . "\n";
        $foundString = substr($foundString,strpos($foundString,$msgWarning));
        $foundString = str_replace(array("\n\r", "\n", "\r"),'',$foundString);
        echo "String passed in toLog():\n" , $msgWarning . "\n";
        echo "String found in log.txt file is:\n" . $foundString;
        $this->assertEquals($msgWarning, $foundString);
        echo $this->testScenarioBreak;
    }


    function testInfoLevel_EntryExists()
    {
        //First update appropiate log Level and clear Shared Memory
        $this->updateSettingsFile("INFO");

        $currentTime = microtime(true);
        $msgError = $this->MSGError . $currentTime;
        $msgWarning = $this->MSGWarning . $currentTime;
        $msgInfo = $this->MSGInfo . $currentTime;
        $msgDebug = $this->MSGDebug . $currentTime;

        //Attemt to writ all log level cases, only Error. Warnign and Info should succeed.
        $log = new ErrorLog();
        $log->toLog(3, __METHOD__, $msgError);
        $log->toLog(2, __METHOD__, $msgWarning);
        $log->toLog(1, __METHOD__, $msgInfo);
        $log->toLog(0, __METHOD__, $msgDebug);
        // Read from file
        $lines = file('../log.txt');
        $foundString ="";
        foreach($lines as $line)
        {
            // Check if the line contains the string we're looking for, and print if it does
            if(strpos($line, $msgInfo) !== false)
                $foundString = $line;
        }

        echo "\n\n" . __METHOD__ ;
        echo "\nFound log entry String in log.txt file:\n" . $foundString;
        //echo "Position: " . strpos($foundString,$msgInfo) . "\n";
        $foundString = substr($foundString,strpos($foundString,$msgInfo));
        $foundString = str_replace(array("\n\r", "\n", "\r"),'',$foundString);
        echo "String passed in toLog():\n" , $msgInfo . "\n";
        echo "String found in log.txt file is:\n" . $foundString;
        echo "String found in log.txt file is:\n" . $foundString;
        $this->assertEquals($msgInfo, $foundString);
        echo $this->testScenarioBreak;
    }

    function testDebugLevel_EntryExists()
    {
        //First update appropiate log Level and clear Shared Memory
        $this->updateSettingsFile("DEBUG");

        $currentTime = microtime(true);
        $msgError = $this->MSGError . $currentTime;
        $msgWarning = $this->MSGWarning . $currentTime;
        $msgInfo = $this->MSGInfo . $currentTime;
        $msgDebug = $this->MSGDebug . $currentTime;

        //Attemt to writ all log level cases, only Error, Warning, Info and Debug should succeed.
        $log = new ErrorLog();
        $log->toLog(3, __METHOD__, $msgError);
        $log->toLog(2, __METHOD__, $msgWarning);
        $log->toLog(1, __METHOD__, $msgInfo);
        $log->toLog(0, __METHOD__, $msgDebug);
        // Read from file
        $lines = file('../log.txt');
        $foundString ="";
        foreach($lines as $line)
        {
            // Check if the line contains the string we're looking for, and print if it does
            if(strpos($line, $msgDebug) !== false)
                $foundString = $line;
        }

        echo "\n\n" . __METHOD__ ;
        echo "\nFound log entry String in log.txt file:\n" . $foundString;
        //echo "Position: " . strpos($foundString,$msgDebug) . "\n";
        $foundString = substr($foundString,strpos($foundString,$msgDebug));
        $foundString = str_replace(array("\n\r", "\n", "\r"),'',$foundString);
        echo "String passed in toLog():\n" , $msgDebug . "\n";
        echo "String found in log.txt file is:\n" . $foundString;
        $this->assertEquals($msgDebug, $foundString);
        echo $this->testScenarioBreak;
    }


    /*Set of unit tests ensuring the correct # of log entries were in fact added to the log file.
    - Error should only add one entry to the log file (Error).
    - Warning should only add two entries to the log file (Error and Warning)
    - Info should only add three entries to the log file( Error, Warning and Info)
    - Debug should add four entries to the log file (Error, Warning, Info and Debug)
    */

    function testErrorLevel_LogEntryCount()
    {
        //First update appropiate log Level and clear Shared Memory
        $this->updateSettingsFile("ERROR");
        $currentTime = microtime(true);
        $msg = $this->standardMsg . $currentTime;

        $log = new ErrorLog();
        $log->toLog(3, __METHOD__, $msg);
        $log->toLog(2, __METHOD__, $msg);
        $log->toLog(1, __METHOD__, $msg);
        $log->toLog(0, __METHOD__, $msg);
        // Read from file
        $lines = file('../log.txt');
        $counter = 0;
        foreach($lines as $line)
        {
            // Check if the line contains the string we're looking for, and print if it does
            if(strpos($line, $msg) !== false)
                $counter ++;
        }

        echo "\n\n" . __METHOD__ ;
        echo "\nNumber of entries found: " . $counter . "\n";
        echo
        $this->assertEquals(1, $counter);
        echo $this->testScenarioBreak;
    }

    function testWarningLevel_LogEntryCount()
    {
        //First update appropiate log Level and clear Shared Memory
        $this->updateSettingsFile("WARNING");
        $currentTime = microtime(true);
        $msg = $this->standardMsg . $currentTime;

        $log = new ErrorLog();
        $log->toLog(3, __METHOD__, $msg);
        $log->toLog(2, __METHOD__, $msg);
        $log->toLog(1, __METHOD__, $msg);
        $log->toLog(0, __METHOD__, $msg);
        // Read from file
        $lines = file('../log.txt');
        $counter = 0;
        foreach($lines as $line)
        {
            // Check if the line contains the string we're looking for, and print if it does
            if(strpos($line, $msg) !== false)
                $counter ++;
        }

        echo "\n\n" . __METHOD__ ;
        echo "\nNumber of entries found: " . $counter . "\n";

        $this->assertEquals(2, $counter);
        echo $this->testScenarioBreak;
    }

    function testInfoLevel_LogEntryCount()
    {
        //First update appropiate log Level and clear Shared Memory
        $this->updateSettingsFile("INFO");
        $currentTime = microtime(true);
        $msg = $this->standardMsg . $currentTime;

        $log = new ErrorLog();
        $log->toLog(3, __METHOD__, $msg);
        $log->toLog(2, __METHOD__, $msg);
        $log->toLog(1, __METHOD__, $msg);
        $log->toLog(0, __METHOD__, $msg);
        // Read from file
        $lines = file('../log.txt');
        $counter = 0;
        foreach($lines as $line)
        {
            // Check if the line contains the string we're looking for, and print if it does
            if(strpos($line, $msg) !== false)
                $counter ++;
        }

        echo "\n\n" . __METHOD__ ;
        echo "\nNumber of entries found: " . $counter . "\n";

        $this->assertEquals(3, $counter);
        echo $this->testScenarioBreak;
    }

    function testDEBUGLevel_LogEntryCount()
    {
        //First update appropiate log Level and clear Shared Memory

        $this->updateSettingsFile("DEBUG");
        $currentTime = microtime(true);
        $msg = $this->standardMsg . $currentTime;

        $log = new ErrorLog();
        $log->toLog(3, __METHOD__, $msg);
        $log->toLog(2, __METHOD__, $msg);
        $log->toLog(1, __METHOD__, $msg);
        $log->toLog(0, __METHOD__, $msg);
        // Read from file
        $lines = file('../log.txt');
        $counter = 0;
        foreach($lines as $line)
        {
            // Check if the line contains the string we're looking for, and print if it does
            if(strpos($line, $msg) !== false)
                $counter ++;
        }

        echo "\n\n" . __METHOD__ ;
        echo "\nNumber of entries found: " . $counter . "\n";

        $this->assertEquals(4, $counter);
        echo $this->testScenarioBreak;
        echo $this->testScenarioBreak;
        $this->setLogLevelStateBack();
        echo $this->testScenarioBreak;

    }



}
