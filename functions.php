<?php

function getUserIP()
{
    $client  = @$_SERVER['HTTP_CLIENT_IP'];
    $forward = @$_SERVER['HTTP_X_FORWARDED_FOR'];
    $remoteAddress  = $_SERVER['REMOTE_ADDR'];

    if(filter_var($client, FILTER_VALIDATE_IP)){
        $ip = $client;
    }else if(filter_var($forward, FILTER_VALIDATE_IP)) {
        $ip = $forward;
    }else{
        $ip = $remoteAddress;
    }
    
    return $ip;
}
