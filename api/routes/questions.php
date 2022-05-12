<?php

Flight::route("GET /user/questions", function () {
	$offset = Flight::query("offset", 0);
	$limit = Flight::query("limit", 25);
	$search = Flight::query('search');
	$answer_id = Flight::query('answer_id');
	$order = urldecode(Flight::query('order', '-id'));
	$status = Flight::query('status', 'ACTIVE');
	$total = Flight::questionService()->get_questions(Flight::get("user")["id"], $offset, $limit, $search, $order, $status, $answer_id, TRUE);
	header('total-records: ' . $total['total']);
	Flight::json(Flight::questionService()->get_questions(Flight::get("user")["id"], $offset, $limit, $search, $order, $status, $answer_id));
});

Flight::route("GET /user/questions-by-answer/@answer_id", function ($answer_id) {
	$offset = Flight::query("offset", 0);
	$limit = Flight::query("limit", 1);
	$status = Flight::query('status', 'ACTIVE');
	$order = urldecode(Flight::query('order', '-id'));
	Flight::json(Flight::questionService()->get_questions(null, $offset, $limit, null, $order, $status, $answer_id));
});

Flight::route("GET /user/questions/hot", function () {
	$status = Flight::query('status', 'ACTIVE');
	Flight::json(Flight::questionService()->get_weeks_hottest_questions($status, Flight::get("user")["d_id"]));
});

Flight::route("GET /user/questions-count", function () {
	Flight::json(Flight::questionService()->get_question_count(Flight::get("user")["id"]));
});

Flight::route("GET /user/questions/@id", function ($id) {
	Flight::json(Flight::questionService()->get_questions_by_question_id(Flight::get("user")["id"], $id));
});

Flight::route("GET /questions", function () {
	$department_id = Flight::query("department_id");
	$semester_id = Flight::query('semester_id', 1);
	$limit = Flight::query('limit', 25);
	$offset = Flight::query('offset', 0);
	$course_id = Flight::query('course_id');
	$order = urldecode(Flight::query('order', '-id'));
	$status = Flight::query('status', 'ACTIVE');
	$total = Flight::questionService()->get_questions_for_departments($limit, $offset, $order, $department_id, $semester_id, $course_id, $status, TRUE);
	header('total-records: ' . $total['total']);
	Flight::json(Flight::questionService()->get_questions_for_departments($limit, $offset, $order, $department_id, $semester_id, $course_id, $status));
});

Flight::route("GET /admin/questions", function () {
	$user_id = Flight::query('user_id');
	$offset = Flight::query("offset", 0);
	$limit = Flight::query("limit", 25);
	$search = Flight::query('search');
	$answer_id = Flight::query('answer_id');
	$order = urldecode(Flight::query('order', '-id'));
	$status = Flight::query('status', 'ACTIVE');
	$total = Flight::questionService()->get_questions($user_id, $offset, $limit, $search, $order, $status, $answer_id, TRUE);
	header('total-records: ' . $total['total']);
	Flight::json(Flight::questionService()->get_questions($user_id, $offset, $limit, $search, $order, $status, $answer_id));
});

Flight::route("PUT /admin/remove/questions/@id", function ($id) {
	Flight::json(Flight::questionService()->remove_question($id));
});

Flight::route("PUT /admin/retrieve/questions/@id", function ($id) {
	Flight::json(Flight::questionService()->retrieve_question($id));
});

Flight::route("POST /user/questions", function () {
	$data = Flight::request()->data->getData();
	Flight::questionService()->post_question(Flight::get("user"), $data);
	Flight::json(["message" => "Your question has been posted"]);
});

Flight::route("POST /admin/questions", function () {
	Flight::json(Flight::questionService()->add(Flight::request()->data->getData()));
});

Flight::route("PUT /user/questions/@id", function ($id) {
	$data = Flight::request()->data->getData();
	Flight::json(Flight::questionService()->update_question(Flight::get("user"), $id, $data));
});

Flight::route("PUT /admin/questions/@id", function ($id) {
	Flight::json(Flight::questionService()->update($id, Flight::request()->data->getData()));
});
