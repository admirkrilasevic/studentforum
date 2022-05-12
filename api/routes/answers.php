<?php

Flight::route("GET /user/answers", function () {
	$offset = Flight::query("offset", 0);
	$limit = Flight::query("limit", 10);
	$status = Flight::query("status", "ACTIVE");
	$search = Flight::query('search');
	$order = Flight::query('order', '-id');
	$total = Flight::answerService()->get_answers(Flight::get("user")["id"], $offset, $limit, $status, $search, $order, TRUE);
	header("total-records: " . $total["total"]);
	Flight::json(Flight::answerService()->get_answers(Flight::get("user")["id"], $offset, $limit, $status, $search, $order));
});

Flight::route("GET /admin/answers", function () {
	$offset = Flight::query("offset", 0);
	$limit = Flight::query("limit", 25);
	$user_id = Flight::query("user_id");
	$status = Flight::query("status", "ACTIVE");
	$search = Flight::query('search');
	$order = urldecode(Flight::query('order', '-id'));
	$total = Flight::answerService()->get_answers($user_id, $offset, $limit, $status, $search, $order, TRUE);
	header("total-records: " . $total["total"]);
	Flight::json(Flight::answerService()->get_answers($user_id, $offset, $limit, $status, $search, $order));
});

Flight::route("PUT /admin/remove/answer/@id", function ($id) {
	Flight::json(Flight::answerService()->remove_answer($id));
});

Flight::route("PUT /admin/retrieve/answer/@id", function ($id) {
	Flight::json(Flight::answerService()->retrieve_answer($id));
});

Flight::route("GET /user/answers-count", function () {
	Flight::json(Flight::answerService()->get_answer_count(Flight::get("user")["id"]));
});

Flight::route("GET /user/answers/@id", function ($id) {
	Flight::json(Flight::answerService()->get_answer_by_answer_id(Flight::get("user")["id"], $id));
});

Flight::route("GET /user/answers-by-question/@id", function ($id) {
	$order = Flight::query('order', '-id');
	$status = Flight::query("status", "ACTIVE");
	Flight::json(Flight::answerService()->get_answer_by_question_id($id, $order, $status));
});

Flight::route("POST /user/answers", function () {
	$data = Flight::request()->data->getData();
	Flight::answerService()->post_answer(Flight::get("user"), $data);
	Flight::json(["message" => "Your answer has been posted"]);
});

Flight::route("PUT /user/answers/@id", function ($id) {
	$data = Flight::request()->data->getData();
	Flight::json(Flight::answerService()->update_answer(Flight::get("user"), $id, $data));
});

Flight::route("PUT /user/answers/pin/@id/@quesiton/@set", function ($id, $question, $set) {
	Flight::json(Flight::answerService()->pin_answer(Flight::get("user")["id"], $id, $question, $set));
});
