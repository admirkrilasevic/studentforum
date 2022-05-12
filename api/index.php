<?php
require_once dirname(__FILE__) . './vendor/autoload.php';

Flight::set('flight.log_errors', TRUE);

//error handling
Flight::map('error', function (Exception $ex) {
  Flight::json(["message" => $ex->getMessage()], $ex->getCode() ? $ex->getCode() : 500);
});

Flight::start();
