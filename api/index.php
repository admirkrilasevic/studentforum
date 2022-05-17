<?php

require_once dirname(__FILE__) . '/vendor/autoload.php';
require_once dirname(__FILE__) . '/services/UserService.class.php';
require_once dirname(__FILE__) . '/services/QuestionService.class.php';

header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

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
	$jwt = Firebase\JWT\JWT::encode(["exp" => (time() + Config::JWT_TOKEN_TIME), "id" => $user["id"], "r" => $user["role"], "d_id" => $user["department_id"]], Config::JWT_SECRET(), 'HS256');
	return ["token" => $jwt];
});

//register BLL services
Flight::register('userService', 'UserService');
Flight::register('questionService', 'QuestionService');

//include all routes
require_once dirname(__FILE__) . "/routes/middleware.php";
require_once dirname(__FILE__) . "/routes/users.php";
require_once dirname(__FILE__) . "/routes/questions.php";


Flight::start();
