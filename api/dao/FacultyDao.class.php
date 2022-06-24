<?php

require_once dirname(__FILE__) . "/BaseDao.class.php";

class FacultyDao extends BaseDao
{

    public function __construct()
    {
        parent::__construct("faculties");
    }

    public function get_faculties($offset, $limit, $search, $order)
    {
        list($order_column, $order_direction) = self::parse_order($order);
        $params = [];
        $query = "SELECT * FROM faculties WHERE status = 'ACTIVE'";

        if (isset($search)) {
            $query .= " AND LOWER(name) LIKE CONCAT('%', :search, '%')";
            $params["search"] = strtolower($search);
        }
        $query .= " ORDER BY ${order_column} ${order_direction} 
            LIMIT ${limit} OFFSET ${offset}";
        return $this->query($query, $params);
    }

    public function remove_faculty($id)
    {
        $entity = [
            "status" => "REMOVED"
        ];
        return $this->update($id, $entity);
    }
}
