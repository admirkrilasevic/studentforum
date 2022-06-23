<?php

/**
 * @OA\Get(path="/courses",tags={"course"},
 *     @OA\Parameter(@OA\Schema(type="integer"), in="path", name="department_id", default=25, description="Get courses by department"),
 *     @OA\Parameter(@OA\Schema(type="string"), in="query", name="search", description="Search string for faculty. Case insensitive search"),
 *     @OA\Parameter(@OA\Schema(type="string"), in="query", name="order", default="-id", description="Sorting for return elements. -columne_name ascending order by columne_name, +columne_name descending order by columne_name"),
 *     @OA\Response(response="200", description="Get courses")
 * )
 */
Flight::route("GET /courses/@id", function ($id) {
	$search = Flight::query('search');
	$order = urldecode(Flight::query('order', '-semester_id'));
	Flight::json(Flight::courseService()->get_courses($search, $order, $id));
});

/**
 * @OA\Post(path="/admin/courses",tags={"x-admin","courses"},security={{"ApiKeyAuth": {}}},
 * @OA\RequestBody(description="Course info", required=true,
 *    @OA\MediaType(
 *      mediaType="application/json",
 *      @OA\Schema(
 *        @OA\Property(property="name", type="string", example="Department name", desctiption="Name of the course"),
 *        @OA\Property(property="department_id", type="integer", example=1, desctiption="Department id of that course")
 *      )
 *    )
 *   ),
 * @OA\Response(response="200", description="Course that was added")
 * )
 */
Flight::route('POST /admin/courses', function () {
	$data = Flight::request()->data->getData();
	Flight::json(Flight::courseService()->add($data));
});

/**
 * @OA\Put(path="/admin/courses/remove/{id}",tags={"x-admin","courses"},security={{"ApiKeyAuth": {}}},
 *     @OA\Parameter(type="integer", in="path", allowReserved=true, name="id", default=1, description="id of a course"),
 *     @OA\Response(response="200", description="Remove a course")
 * )
 */
Flight::route("PUT /admin/courses/remove/@id", function ($id) {
	Flight::json(Flight::courseService()->remove_course($id));
});
