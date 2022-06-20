<?php

/**
 * @OA\Get(path="/courses",tags={"course"},
 *     @OA\Parameter(@OA\Schema(type="integer"), in="path", name="department_id", default=25, description="Get courses by department"),
 *     @OA\Parameter(@OA\Schema(type="string"), in="query", name="order", default="-id", description="Sorting for return elements. -columne_name ascending order by columne_name, +columne_name descending order by columne_name"),
 *     @OA\Response(response="200", description="Get faculties")
 * )
 */
Flight::route("GET /courses/@id", function ($id) {
    $department_id = Flight::query("department_id");
    $order = urldecode(Flight::query('order', '-id'));
    Flight::json(Flight::courseService()->get_courses(null, $order, $id));
});
