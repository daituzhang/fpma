<?php

return array(
    '*' => array(
        'tablePrefix' => 'craft',
    ),
    'localhost' => array(
        'server' => 'localhost',
        'user' => 'root',
        'password' => '',
        'database' => 'fpma',
    ),
    // Treat *.vagrantshare.com the same as localhost
    'vagrantshare.com' => array(
        'server' => 'localhost',
        'user' => 'root',
        'password' => '',
        'database' => 'fpma',
    ),
    'staging' => array(
        'server' => 'localhost',
        'user' => '',
        'password' => '',
        'database' => '',
    ),
    // '.com' => array(
    //     'server' => 'localhost',
    //     'user' => '',
    //     'password' => '',
    //     'database' => '',
    // ),
);
