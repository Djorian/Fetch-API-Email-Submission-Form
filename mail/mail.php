<?php

if (isset($_POST['subject']) && isset($_POST['email']) && isset($_POST['message'])) {
	if(empty($_POST['subject'])   ||
	  empty($_POST['email'])     ||
	  empty($_POST['message'])   ||
	  !filter_var($_POST['email'],FILTER_VALIDATE_EMAIL))
	  {
        echo 2;
		exit; 
	  }

	$subject = (string) trim(strip_tags(htmlspecialchars($_POST['subject'])));
	$email = (string) trim(strip_tags(htmlspecialchars($_POST['email'])));
	$message = (string) trim(strip_tags(htmlspecialchars($_POST['message'])));

    function __autoload($class) {
        include "../Classes/$class.php";
    }

    $sendMail = new Mail();
    echo $sendMail->send("$email", "$subject", "$message");
}
?>
