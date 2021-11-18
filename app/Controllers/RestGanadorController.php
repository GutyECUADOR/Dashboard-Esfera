<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;

class RestGanadorController extends ResourceController
{
    protected $modelName = 'App\Models\GanadorModel';
    protected $format    = 'json';

    public function index()
    {
        return $this->respond($this->model->findAll());
    }

    public function totalPremiosByPremio(){

        $db = \Config\Database::connect();
        $query = "
        SELECT 
            COUNT(ganadores.id) AS TOTAL,
            premios.nombre_premio AS PREMIO
        FROM ganadores 
        INNER JOIN premios ON premios.ID = ganadores.premio_id
        WHERE premio_id != 0 AND premio_id IS NOT NULL
        GROUP BY 
            premios.nombre_premio
        
        ";
        $query= $db->query($query);
        $response = $query->getResultArray();

        return $this->respond($response);
    }

}