<?php

Flight::route('GET /admin/user', function () {
	$offset = Flight::query("offset", 0);
	$limit = Flight::query("limit", 10);
	$search = Flight::query('search');
	$order = urldecode(Flight::query('order', '-id'));
	$total = Flight::userService()->get_users($search, $offset, $limit, $order, TRUE);
	header('total-records: ' . $total['total']);
	Flight::json(Flight::userService()->get_users($search, $offset, $limit, $order));
});

Flight::route('GET /admin/user/@id', function ($id) {
	Flight::json(Flight::userService()->get_by_id($id));
});

Flight::route('GET /user/account', function () {
	Flight::json(Flight::userService()->get_by_id(Flight::get("user")["id"]));
});

Flight::route('POST /register', function () {
	$data = Flight::request()->data->getData();
	Flight::json(Flight::userService()->register($data));
});

Flight::route('PUT /admin/user/@id', function ($id) {
	$data = Flight::request()->data->getData();
	Flight::json(Flight::userService()->update($id, $data));
});

Flight::route('PUT /user/account', function () {
	$data = Flight::request()->data->getData();
	Flight::json(Flight::userService()->update(Flight::get("user")["id"], $data));
});

Flight::route('GET /confirm/@token', function ($token) {
    Flight::jwt(Flight::userService()->confirm($token));
    header("Location: " . '//' . $_SERVER["SERVER_NAME"] . str_replace("studentforum/api/index.php", "/login", $_SERVER["SCRIPT_NAME"]));
    exit();
});

Flight::route('POST /login', function () {
	Flight::json(Flight::jwt(Flight::userService()->login(Flight::request()->data->getData())));
});

Flight::route('POST /forgot', function () {
	$data = Flight::request()->data->getData();
	Flight::userService()->forgot($data);
	Flight::json(["message" => "Recovery link has been sent to your email."]);
});

Flight::route('POST /reset', function () {
	Flight::json(Flight::jwt(Flight::userService()->reset(Flight::request()->data->getData())));
});
