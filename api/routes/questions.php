<?php

/**
 * @OA\Get(path="/user/question",tags={"x-user","question"},security={{"ApiKeyAuth": {}}},
 *     @OA\Parameter(@OA\Schema(type="integer"), in="query", name="offset", default=0, description="Offset for pagination"),
 *     @OA\Parameter(@OA\Schema(type="integer"), in="query", name="limit", default=25, description="Limit for pagination"),
 *     @OA\Parameter(@OA\Schema(type="integer"), in="query", name="answer_id", default=1, description="Search questions by answer"),
 *     @OA\Parameter(@OA\Schema(type="string"), in="query", name="search", description="Search string for questions. Case insensitive search"),
 *     @OA\Parameter(@OA\Schema(type="string"), in="query", name="status", default="ACTIVE", description="Status of the question"),
 *     @OA\Parameter(@OA\Schema(type="string"), in="query", name="order", default="-id", description="Sorting for return elements. -column_name ascending order by column_name, +column_name descending order by column_name"),
 *     @OA\Response(response="200", description="Get your accounts questions")
 * )
 */
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

/**
 * @OA\Get(path="/user/question-by-answer/{answer_id}",tags={"x-user","question"},security={{"ApiKeyAuth": {}}},
 *     @OA\Parameter(type="integer", in="path", name="answer_id", default=1, description="id of an answer"),
 *     @OA\Parameter(@OA\Schema(type="integer"), in="query", name="offset", default=0, description="Offset for pagination"),
 *     @OA\Parameter(@OA\Schema(type="integer"), in="query", name="limit", default=25, description="Limit for pagination"),
 *     @OA\Parameter(@OA\Schema(type="string"), in="query", name="order", default="-id", description="Sorting for return elements. -column_name ascending order by column_name, +column_name descending order by column_name"),
 *     @OA\Parameter(@OA\Schema(type="string"), in="query", name="status", default="ACTIVE", description="Status of the question"),
 *     @OA\Response(response="200", description="Get questions by answer id")
 * )
 */
Flight::route("GET /user/questions-by-answer/@answer_id", function ($answer_id) {
	$offset = Flight::query("offset", 0);
	$limit = Flight::query("limit", 1);
	$status = Flight::query('status', 'ACTIVE');
	$order = urldecode(Flight::query('order', '-id'));
	Flight::json(Flight::questionService()->get_questions(null, $offset, $limit, null, $order, $status, $answer_id));
});

/**
 * @OA\Get(path="/user/question/hot",tags={"x-user","question"},security={{"ApiKeyAuth": {}}},
 *     @OA\Parameter(@OA\Schema(type="string"), in="query", name="status", default="ACTIVE", description="Status of the question"),
 *     @OA\Response(response="200", description="Get hottest questions in the past 7 days from your department")
 * )
 */
Flight::route("GET /user/questions/hot", function () {
	$status = Flight::query('status', 'ACTIVE');
	Flight::json(Flight::questionService()->get_weeks_hottest_questions($status, Flight::get("user")["d_id"]));
});

/**
 * @OA\Get(path="/user/question-count",tags={"x-user","question"},security={{"ApiKeyAuth": {}}},
 *     @OA\Response(response="200", description="Get your question count")
 * )
 */
Flight::route("GET /user/questions-count", function () {
	Flight::json(Flight::questionService()->get_question_count(Flight::get("user")["id"]));
});

/**
 * @OA\Get(path="/user/question/{id}",tags={"x-user","question"},security={{"ApiKeyAuth": {}}},
 *     @OA\Parameter(type="integer", in="path", allowReserved=true, name="id", default=1, description="id of a question"),
 *     @OA\Response(response="200", description="Get your questions by id")
 * )
 */
Flight::route("GET /user/questions/@id", function ($id) {
	Flight::json(Flight::questionService()->get_questions_by_question_id(Flight::get("user")["id"], $id));
});

/**
 * @OA\Get(path="/questions/@id",tags={"question"},
 *     @OA\Parameter(@OA\Schema(type="string"), in="query", name="order", default="-id", description="Sorting for return elements. -column_name ascending order by column_name, +column_name descending order by column_name"),
 *     @OA\Parameter(@OA\Schema(type="integer"), in="path", name="course_id", description="id of course"),
 *     @OA\Parameter(@OA\Schema(type="integer"), in="query", name="limit", description="limit for pagination),
 *     @OA\Parameter(@OA\Schema(type="integer"), in="query", name="offset", description="offset for pagination"),
 *     @OA\Parameter(@OA\Schema(type="string"), in="query", name="status", default="ACTIVE", description="Status of the question"),
 *     @OA\Response(response="200", description="Get questions")
 * )
 */
Flight::route("GET /questions/@id", function ($id) {
	$limit = Flight::query('limit', 25);
	$offset = Flight::query('offset', 0);
	$order = urldecode(Flight::query('order', '-id'));
	$status = Flight::query('status', 'ACTIVE');
	$total = Flight::questionService()->get_questions_for_course($limit, $offset, $order, $id, $status, TRUE);
	header('total-records: ' . $total['total']);
	Flight::json(Flight::questionService()->get_questions_for_course($limit, $offset, $order, $id, $status));
});

/**
 * @OA\Get(path="/admin/question",tags={"x-admin","question"},security={{"ApiKeyAuth": {}}},
 *     @OA\Parameter(@OA\Schema(type="integer"), in="query", name="user_id", default=92, description="Users id"),
 *     @OA\Parameter(@OA\Schema(type="integer"), in="query", name="offset", default=0, description="Offset for pagination"),
 *     @OA\Parameter(@OA\Schema(type="integer"), in="query", name="limit", default=25, description="Limit for pagination"),
 *     @OA\Parameter(@OA\Schema(type="integer"), in="query", name="answer_id", default=1, description="Search question by answer"),
 *     @OA\Parameter(@OA\Schema(type="string"), in="query", name="search", description="Search string for questions. Case insensitive search"),
 *     @OA\Parameter(@OA\Schema(type="string"), in="query", name="status", default="ACTIVE", description="Status of the question"),
 *     @OA\Parameter(@OA\Schema(type="string"), in="query", name="order", default="-id", description="Sorting for return elements. -column_name ascending order by column_name, +column_name descending order by column_name"),
 *     @OA\Response(response="200", description="Get questions from database, admin")
 * )
 */
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

/**
 * @OA\Put(path="/admin/remove/question/{id}",tags={"x-admin","question"},security={{"ApiKeyAuth": {}}},
 *     @OA\Parameter(type="integer", in="path", allowReserved=true, name="id", default=1, description="id of a question"),
 *     @OA\Response(response="200", description="Remove a question")
 * )
 */
Flight::route("PUT /admin/remove/questions/@id", function ($id) {
	Flight::json(Flight::questionService()->remove_question($id));
});

/**
 * @OA\Put(path="/admin/retrieve/question/{id}",tags={"x-admin","question"},security={{"ApiKeyAuth": {}}},
 *     @OA\Parameter(type="integer", in="path", allowReserved=true, name="id", default=1, description="id of a question"),
 *     @OA\Response(response="200", description="Retrieve a question")
 * )
 */
Flight::route("PUT /admin/retrieve/questions/@id", function ($id) {
	Flight::json(Flight::questionService()->retrieve_question($id));
});

/**
 * @OA\Post(path="/user/questions",tags={"x-user","question"},security={{"ApiKeyAuth": {}}},
 * @OA\RequestBody(description="Question info", required=true,
 *    @OA\MediaType(
 *      mediaType="application/json",
 *      @OA\Schema(
 *        @OA\Property(property="subject", type="string", example="Some subject", desctiption="Subject of the question"),
 *        @OA\Property(property="body", type="string", example="Some body", desctiption="Body of the question"),
 *        @OA\Property(property="department_id", type="integer", example=1, desctiption="Department that the question is meant for"),
 *        @OA\Property(property="course_id", type="integer", example=1, desctiption="Course that the question is meant for"),
 *        @OA\Property(property="semester_id", type="integer", example=1, desctiption="Semester that the question is meant for")
 *      )
 *    )
 *   ),
 * @OA\Response(response="200", description="Success message")
 * )
 */
Flight::route("POST /user/questions", function () {
	$data = Flight::request()->data->getData();
	Flight::questionService()->post_question(Flight::get("user"), $data);
	Flight::json(["message" => "Your question has been posted"]);
});

/**
 * @OA\Post(path="/admin/question",tags={"x-admin","question"},security={{"ApiKeyAuth": {}}},
 * @OA\RequestBody(description="Question info", required=true,
 *    @OA\MediaType(
 *      mediaType="application/json",
 *      @OA\Schema(
 *        @OA\Property(property="subject", type="string", example="Some subject", desctiption="Subject of the question"),
 *        @OA\Property(property="body", type="string", example="Some body", desctiption="Body of the question"),
 *        @OA\Property(property="department_id", type="integer", example=1, desctiption="Department that the question is meant for"),
 *        @OA\Property(property="course_id", type="integer", example=1, desctiption="Course that the question is meant for"),
 *        @OA\Property(property="semester_id", type="integer", example=1, desctiption="Semester that the question is meant for"),
 *        @OA\Property(property="user_id", type="integer", example=1, desctiption="User that is posting the question")
 *      )
 *    )
 *   ),
 * @OA\Response(response="200", description="Question that has been added to the database")
 * )
 */
Flight::route("POST /admin/questions", function () {
	Flight::json(Flight::questionService()->add(Flight::request()->data->getData()));
});

/**
 * @OA\Put(path="/user/question/{id}",tags={"x-user","question"},security={{"ApiKeyAuth": {}}},
 * @OA\Parameter(type="integer", in="path", name="id", default=1),
 * @OA\RequestBody(description="Question info", required=true,
 *    @OA\MediaType(
 *      mediaType="application/json",
 *      @OA\Schema(
 *        @OA\Property(property="subject", type="string", example="Some subject", desctiption="Subject of the question"),
 *        @OA\Property(property="body", type="string", example="Some body", desctiption="Body of the question"),
 *        @OA\Property(property="department_id", type="integer", example=1, desctiption="Department that the question is meant for"),
 *        @OA\Property(property="course_id", type="integer", example=1, desctiption="Course that the question is meant for"),
 *        @OA\Property(property="semester_id", type="integer", example=1, desctiption="Semester that the question is meant for")
 *      )
 *    )
 *   ),
 * @OA\Response(response="200", description="Updated question")
 * )
 */
Flight::route("PUT /user/questions/@id", function ($id) {
	$data = Flight::request()->data->getData();
	Flight::json(Flight::questionService()->update_question(Flight::get("user"), $id, $data));
});

/**
 * @OA\Put(path="/admin/question/{id}",tags={"x-admin","question"},security={{"ApiKeyAuth": {}}},
 * @OA\Parameter(type="integer", in="path", name="id", default=1),
 * @OA\RequestBody(description="Question info", required=true,
 *    @OA\MediaType(
 *      mediaType="application/json",
 *      @OA\Schema(
 *        @OA\Property(property="subject", type="string", example="Some subject", desctiption="Subject of the question"),
 *        @OA\Property(property="body", type="string", example="Some body", desctiption="Body of the question"),
 *        @OA\Property(property="department_id", type="integer", example=1, desctiption="Department that the question is meant for"),
 *        @OA\Property(property="course_id", type="integer", example=1, desctiption="Course that the question is meant for"),
 *        @OA\Property(property="semester_id", type="integer", example=1, desctiption="Semester that the question is meant for")
 *      )
 *    )
 *   ),
 * @OA\Response(response="200", description="Updated question")
 * )
 */
Flight::route("PUT /admin/questions/@id", function ($id) {
	Flight::json(Flight::questionService()->update($id, Flight::request()->data->getData()));
});
