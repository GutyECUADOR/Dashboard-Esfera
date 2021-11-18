<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;

class RestPremioController extends ResourceController
{
    protected $modelName = 'App\Models\PremioModel';
    protected $format    = 'json';

    public function index()
    {
        return $this->respond($this->model->findAll());
    }

    public function totalPremiosByDia(){

        $db = \Config\Database::connect();
        $query = "
        SELECT 
            DATE_FORMAT(ganadores.fecha, '%Y-%m-%d') AS FECHA_CANJE,
            COUNT(ganadores.id) AS TOTAL
        FROM ganadores 
        INNER JOIN premios ON premios.ID = ganadores.premio_id
        WHERE premio_id != 0 AND premio_id IS NOT NULL
        AND DATE_FORMAT(ganadores.fecha, '%Y-%m-%d') BETWEEN '2021-11-11' AND '2021-11-12'
        GROUP BY 
            DATE_FORMAT(ganadores.fecha, '%Y-%m-%d')
        
        ";
        $query= $db->query($query);
        $response = $query->getResultArray();

        return $this->respond($response);
    }

    
}