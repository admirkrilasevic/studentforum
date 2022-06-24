<?php

/**
 * @OA\Get(path="/user/answer",tags={"x-user","answer"},security={{"ApiKeyAuth": {}}},
 *     @OA\Parameter(@OA\Schema(type="integer"), in="query", name="offset", default=0, description="Offset for pagination"),
 *     @OA\Parameter(@OA\Schema(type="integer"), in="query", name="limit", default=25, description="Limit for pagination"),
 *     @OA\Parameter(@OA\Schema(type="string"), in="query", name="status", default="ACTIVE", description="Search by status"),
 *     @OA\Parameter(@OA\Schema(type="string"), in="query", name="search", description="Search string for answers. Case insensitive search"),
 *     @OA\Parameter(@OA\Schema(type="string"), in="query", name="order", default="-id", description="Sorting for return elements. -column_name ascending order by column_name, +column_name descending order by column_name"),
 *     @OA\Response(response="200", description="Get your accounts get_answer_by_question_id")
 * )
 */
Flight::route("GET /user/answers", function () {
    $offset = Flight::query("offset", 0);
    $limit = Flight::query("limit", 10);
    $status = Flight::query("status", "ACTIVE");
    $search = Flight::query('search');
    $order = Flight::query('order', '-id');
    $total = Flight::answerService()->get_answers(
        Flight::get("user")["id"],
        $offset,
        $limit,
        $status,
        $search,
        $order,
        TRUE
    );
    header("total-records: " . $total["total"]);
    Flight::json(Flight::answerService()->get_answers(
        Flight::get("user")["id"],
        $offset,
        $limit,
        $status,
        $search,
        $order
    ));
});

/**
 * @OA\Get(path="/admin/answers",tags={"x-admin","answer"},security={{"ApiKeyAuth": {}}},
 *     @OA\Parameter(@OA\Schema(type="integer"), in="query", name="offset", default=0, description="Offset for pagination"),
 *     @OA\Parameter(@OA\Schema(type="integer"), in="query", name="limit", default=25,description="Limit for pagination"),
 *     @OA\Parameter(@OA\Schema(type="integer"), in="query", name="user_id", description="id of user"),
 *     @OA\Parameter(@OA\Schema(type="string"), in="query", name="status", description="Search by status"),
 *     @OA\Parameter(@OA\Schema(type="string"), in="query", name="search", description="Search string for answers. Case insensitive search"),
 *     @OA\Parameter(@OA\Schema(type="string"), in="query", name="order", default="-id", description="Sorting for return elements. -column_name ascending order by column_name, +column_name descending order by column_name"),
 *     @OA\Response(response="200", description="admin get answers")
 * )
 */
Flight::route("GET /admin/answers", function () {
    $offset = Flight::query("offset", 0);
    $limit = Flight::query("limit", 25);
    $user_id = Flight::query("user_id");
    $status = Flight::query("status", "ACTIVE");
    $search = Flight::query('search');
    $order = urldecode(Flight::query('order', '-id'));
    $total = Flight::answerService()->get_answers(
        $user_id,
        $offset,
        $limit,
        $status,
        $search,
        $order,
        TRUE
    );
    header("total-records: " . $total["total"]);
    Flight::json(Flight::answerService()->get_answers(
        $user_id,
        $offset,
        $limit,
        $status,
        $search,
        $order
    ));
});

/**
 * @OA\Put(path="/admin/remove/answer/{id}",tags={"x-admin","answer"},security={{"ApiKeyAuth": {}}},
 *     @OA\Parameter(type="integer", in="path", allowReserved=true, name="id", default=1, description="id of an answer"),
 *     @OA\Response(response="200", description="Remove an answer")
 * )
 */
Flight::route("PUT /admin/remove/answer/@id", function ($id) {
    Flight::json(Flight::answerService()->remove_answer($id));
});

/**
 * @OA\Put(path="/admin/retrieve/answer/{id}",tags={"x-admin","answer"},security={{"ApiKeyAuth": {}}},
 *     @OA\Parameter(type="integer", in="path", allowReserved=true, name="id", default=1, description="id of an answer"),
 *     @OA\Response(response="200", description="Retrieve an answer")
 * )
 */
Flight::route("PUT /admin/retrieve/answer/@id", function ($id) {
    Flight::json(Flight::answerService()->retrieve_answer($id));
});

/**
 * @OA\Get(path="/user/answer-count",tags={"x-user","answer"},security={{"ApiKeyAuth": {}}},
 *     @OA\Response(response="200", description="Get your answer count")
 * )
 */
Flight::route("GET /user/answers-count", function () {
    Flight::json(Flight::answerService()
        ->get_answer_count(Flight::get("user")["id"]));
});

/**
 * @OA\Get(path="/user/answer/{id}",tags={"x-user","answer"},security={{"ApiKeyAuth": {}}},
 *     @OA\Parameter(type="integer", in="path", allowReserved=true, name="id", default=1, description="id of an answer"),
 *     @OA\Response(response="200", description="Get your answer by id")
 * )
 */
Flight::route("GET /user/answers/@id", function ($id) {
    Flight::json(Flight::answerService()
        ->get_answer_by_answer_id(Flight::get("user")["id"], $id));
});

/**
 * @OA\Get(path="/answers-by-question/{id}",tags={"x-user","answer"},
 *     @OA\Parameter(type="integer", in="path", allowReserved=true, name="id", default=1, description="id of a question"),
 *     @OA\Parameter(@OA\Schema(type="string"), in="query", name="status", description="Search by status"),
 *     @OA\Parameter(@OA\Schema(type="string"), in="query", name="order", default="-id", description="Sorting for return elements. -column_name ascending order by column_name, +column_name descending order by column_name"),
 *     @OA\Response(response="200", description="Get answers by question id")
 * )
 */
Flight::route("GET /answers-by-question/@id", function ($id) {
    $order = Flight::query('order', '-id');
    $status = Flight::query("status", "ACTIVE");
    Flight::json(Flight::answerService()
        ->get_answer_by_question_id($id, $order, $status));
});

/**
 * @OA\Post(path="/user/answers",tags={"x-user","answer"},security={{"ApiKeyAuth": {}}},
 * @OA\RequestBody(description="Answer info", required=true,
 *    @OA\MediaType(
 *      mediaType="application/json",
 *      @OA\Schema(
 *        @OA\Property(property="body", type="string", example="Some body", desctiption="Body of the answer"),
 *        @OA\Property(property="question_id", type="integer", example=1, desctiption="Question for this answer")
 *      )
 *    )
 *   ),
 * @OA\Response(response="200", description="Success message")
 * )
 */
Flight::route("POST /user/answers", function () {
    $data = Flight::request()->data->getData();
    Flight::answerService()->post_answer(Flight::get("user"), $data);
    Flight::json(["message" => "Your answer has been posted"]);
});

/**
 * @OA\Put(path="/user/answers/{id}",tags={"x-user","answer"},security={{"ApiKeyAuth": {}}},
 * @OA\Parameter(type="integer", in="path", name="id", default=1),
 * @OA\RequestBody(description="Answer info", required=true,
 *    @OA\MediaType(
 *      mediaType="application/json",
 *      @OA\Schema(
 *        @OA\Property(property="body", type="string", example="Some body", desctiption="Body of the answer")
 *      )
 *    )
 *   ),
 * @OA\Response(response="200", description="Updated your answer")
 * )
 */
Flight::route("PUT /user/answers/@id", function ($id) {
    $data = Flight::request()->data->getData();
    Flight::json(Flight::answerService()
        ->update_answer(Flight::get("user"), $id, $data));
});

/**
 * @OA\Put(path="/user/answers/pin/{id}/{question}/{set}",tags={"x-user","answer"},security={{"ApiKeyAuth": {}}},
 *     @OA\Parameter(type="integer", in="path", allowReserved=true, name="id", default=1, description="id of a answer"),
 *     @OA\Parameter(@OA\Schema(type="integer"), in="query", name="question", description="id of the question"),
 *     @OA\Parameter(@OA\Schema(type="integer"), in="query", name="set", description="value of pin"),
 *     @OA\Response(response="200", description="Pinn an answer")
 * )
 */
Flight::route(
    "PUT /user/answers/pin/@id/@quesiton/@set",
    function ($id, $question, $set) {
        Flight::json(Flight::answerService()
            ->pin_answer(Flight::get("user")["id"], $id, $question, $set));
    }
);
