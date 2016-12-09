<?php
class workerThread extends Thread {
    protected $id;
    protected $info; 
    protected $settings; 

    protected $root = "";
    //protected $root = '/home/sproject/GPA2/Code/WebSite/fiugpatf';
   
    public function __construct($id, $info){
        $this->root = ROOT;
        $this->id = $id;
        $this->info = $info;
        $this->msgSemKey = sem_get(9876543210);
        $this->queKey = msg_get_queue(123456788);
    }

    public function run(){

        $settingSemKey = sem_get(9876543212);
        $settingMemKey = shm_attach(123456788);

	if ($settingMemKey === false)
	{
    	echo "Fail to attach shared memory.\n";
    	sem_remove($settingMemKey);
    	exit;
	}

        $settingKey = 666666666;

        sem_acquire($settingSemKey);

        if (shm_has_var($settingMemKey, $settingKey))
        {
           $this->settings = shm_get_var($settingMemKey, $settingKey);
        }
        else
        {
           $this->settings = parse_ini_file("$this->root/common_files/settings.ini", true);
           shm_put_var($settingMemKey, $settingKey, $this->settings);
           //echo "no var\n";
        }
         
        sem_release($settingSemKey);

        $this->printt();

    }


    function printt(){
        sem_acquire($this->msgSemKey);

        $mode = $this->settings['error_mode']['mode'];
        //error_log("In toLog, this->settings['error_mode']['mode'] = ".$mode . "\n",3,"/tmp/phplog.txt");
        //error_log("In toLog, this->id'] = " . $this->id . "\n",3,"/tmp/phplog.txt");

        if ($mode == 'DEBUG')
        {
            //Debug log level: Print all Log level types
        }
        else if ($mode == 'INFO')
        {
            //Info log level: Print all log levels except Debug
            if ($this->id == 0){
                sem_release($this->msgSemKey);
                return;
            }
        }
        else if ($mode == 'WARNING')
        {
            //Warning log level: Print all log levels except Debug and Info
            if ($this->id == 0){
                sem_release($this->msgSemKey);
                return;
            }
            else if($this->id == 1){
                sem_release($this->msgSemKey);
                return;
            }
        }
        else if ($mode == 'ERROR')
        {
            //Error log Level: Print all log levels except Debug,Info and Warning
            if ($this->id == 0){
                sem_release($this->msgSemKey);
                return;
            }
            else if($this->id == 1){
                sem_release($this->msgSemKey);
                return;
            }
            else if($this->id == 2){
                sem_release($this->msgSemKey);
                return;
            }

        }

//		echo "Ready for debug error write!";
        $x = $this->info;
        $time = microtime(true);
        $dFormat = "m/d/Y - H:i:s:";
        $mSecs = $time - floor($time);
        $mSecs = substr($mSecs, 2, 4);
        $date = sprintf('%s%s', date($dFormat), $mSecs);

        $type = $this->settings['error_types'][$this->id];

        msg_send($this->queKey, 1, "$date $type $x\n");

        sem_release($this->msgSemKey);

       $this->checkConsumer();
    }

    function checkConsumer(){
        $flgSemKey = sem_get(9876543211);
        $memKey = shm_attach(123456789);
        $flgKey = 555555555;

//123456788 <- msg queue key
        sem_acquire($flgSemKey);

        if (shm_has_var($memKey, $flgKey))
        {

            $flag = shm_get_var($memKey, $flgKey);
            if ($flag == 0)
            {
                exec("(cd $this->root/common_files/ && exec php consumer.php > /dev/null 2>/dev/null &)");
                $flag = 1;
                shm_put_var($memKey, $flgKey, $flag);
            }
        }
        else
        {
            exec("(cd $this->root/common_files/ && exec php consumer.php > /dev/null 2>/dev/null &)");
            $flag = 1;
            shm_put_var($memKey, $flgKey, $flag);
        }

        sem_release($flgSemKey);
    }

}

class ErrorLog {
    protected $host;

    public function __construct() {
        $this->host = php_uname('n');
    }

    public function toLog($error_id, $location, $details){

        $worker = new workerThread("$error_id", "$location $this->host $details");

        $worker->start();
        return $error_id;
    }

}
?>

