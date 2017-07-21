<?php

try{
    $con = new PDO('mysql:host=localhost;dbname=myweb01;charset=utf8mb4', 'root', '', [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::MYSQL_ATTR_INIT_COMMAND => 'set names utf8mb4'
    ]);
}catch(PDOException $e){
    echo 'Error Connecting to database!';
}