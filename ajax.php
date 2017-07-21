<?php

//error_reporting(0);

require_once('db.php');
require_once('functions.php');


if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest'){
     $name = isset($_POST['name']) ?  filter_var($_POST['name'], FILTER_SANITIZE_STRING) : '';
     $email = isset($_POST['email']) ? filter_var($_POST['email'], FILTER_SANITIZE_EMAIL) : '';
     $subject = isset($_POST['subject']) ? filter_var($_POST['subject'], FILTER_SANITIZE_STRING) : '';
     $message = isset($_POST['message']) ? filter_var($_POST['message'], FILTER_SANITIZE_STRING) : '';
     $captcha = isset($_POST['g-recaptcha-response']) ? filter_var($_POST['g-recaptcha-response'], FILTER_SANITIZE_STRING) : '';
     $website = isset($_POST['website']) ? filter_var($_POST['website'], FILTER_SANITIZE_STRING) : '';

     $myWebsites = array('profile');

     $errors = array();
     if(empty($name)){
         $errors['name']['empty'] = 'Please Enter Your Name';   
     }
     if(empty($email)){
         $errors['email']['empty'] = 'Please Enter Your Email';   
     }
     if(empty($subject)){
         $errors['subject']['empty'] = 'Please Enter Your Subject';   
     }
     if(empty($message)){
         $errors['message']['empty'] = 'Please Enter Your Message';   
     }
     if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
         $errors['email']['notvalid'] = 'Please Write Valid Email';
     }
     if(strlen($name) < 5){
         $errors['name']['minlength'] = 'Name Should Be At Least 5 Characters';
     }
     if(strlen($name) > 50){
         $errors['name']['maxlength'] = 'Name Should Be At Most 50 Characters';
     }
     if(strlen($subject) < 10){
         $errors['subject']['minlength'] = 'Subject Should Be At Least 10 Characters';
     }
     if(strlen($subject) > 255){
         $errors['subject']['maxlength'] = 'Subject Should Be At Most 255 Characters';
     }
     if(strlen($message) < 10){
         $errors['message']['minlength'] = 'Message Should Be At Least 10 Characters';
     }
     if(strlen($message) > 1000){
         $errors['message']['maxlength'] = 'Message Should Be At Most 1000 Characters';
     }
     if(strlen($email) > 100){
         $errors['email']['maxlength'] = 'Email Should Be At Most 100 Characters';
     }
     if(empty($website) || !in_array($website, $myWebsites)){
         $errors['website']['changed_by_user'] = 'Please Do Not Change Form Fields Manually';
     }
     if(empty($captcha)){
        $errors['captcha']['empty'] = 'Captcha Should Be Solved';
     }else{
        $url = 'https://www.google.com/recaptcha/api/siteverify?secret=';
        $secret = '6LdJUCQUAAAAANJ-A9Ty12tye4Hjl-cWtR0t7q3D'; // Change it later 
        $response = json_decode(file_get_contents($url.$secret."&response=".$captcha."&remoteip=".$_SERVER["REMOTE_ADDR"]), true);
        if ($response["success"] == false) {
            $errors['captcha']['wrong'] = 'The Captcha Is Incorrect';
        }
     }
     if(count($errors) > 0){
         echo json_encode(array('errors' => $errors));
     }else{

        $sql = "INSERT INTO `messages` SET Name = :name, Email = :email, Subject = :subject, Message = :message, Date = NOW(), Website = :website";
        $stmt = $con->prepare($sql);
        $stmt->bindParam(':name', $name, PDO::PARAM_STR);
        $stmt->bindParam(':email', $email, PDO::PARAM_STR);
        $stmt->bindParam(':subject', $subject, PDO::PARAM_STR);
        $stmt->bindParam(':message', $message, PDO::PARAM_STR);
        $stmt->bindParam(':website', $website, PDO::PARAM_STR);
        if($stmt->execute()){
            echo json_encode(array('success' => 'Your message has been sent successfully'));
        }else{
            echo json_encode(array('internal_error' => 'Sorry, server problem! Please try agin later'));
        }
    }
     
} else{
    $json['status'] = 'error'; 
    echo json_encode($json);
}