<?php

require_once dirname(__FILE__) . './vendor/autoload.php';
require_once dirname(__FILE__) . '/services/UserService.class.php';

Flight::set('flight.log_errors', TRUE);

//error handling
Flight::map('error', function (Exception $ex) {
  Flight::json(["message" => $ex->getMessage()], $ex->getCode() ? $ex->getCode() : 500);
});

//reading query params from URL
Flight::map('query', function ($name, $default_value = NULL) {
  $request = Flight::request();
  $query_param = @$request->query->getData()[$name];
  $query_param = $query_param ? $query_param : $default_value;
  return $query_param;
});

Flight::map('header', function ($name) {
  $headers = getallheaders();
  return @$headers[$name];
});

Flight::map('jwt', function ($user) {
  $jwt = Firebase\JWT\JWT::encode(["exp" => (time() + Config::JWT_TOKEN_TIME), "id" => $user["id"], "r" => $user["role"], "d_id" => $user["department_id"]], Config::JWT_SECRET());
  return ["token" => $jwt];
});

//register BLL services
Flight::register('userService', 'UserService');

//include all routes
require_once dirname(__FILE__) . "/routes/middleware.php";
require_once dirname(__FILE__) . "/routes/users.php";


Flight::start();
