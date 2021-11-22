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

   

    public function totalPremiosByPremio($fechaINI, $fechaFIN){

        $db = \Config\Database::connect();
        $query = "
        SELECT 
            premios.nombre_corto AS NOMBRE_PREMIO,
            COUNT(ganadores.id) AS TOTAL,
            DATE_FORMAT(ganadores.fecha, '%Y-%m-%d') AS fecha
        FROM ganadores 
        INNER JOIN premios ON premios.ID = ganadores.premio_id
        WHERE premio_id != 0 AND premio_id IS NOT NULL
                AND DATE_FORMAT(ganadores.fecha, '%Y-%m-%d') BETWEEN '$fechaINI' AND '$fechaFIN'
        GROUP BY 
            premios.nombre_corto,
            DATE_FORMAT(ganadores.fecha, '%Y-%m-%d') 
        
        ";
        $query= $db->query($query);
        $response = $query->getResultArray();

        return $this->respond($response);
    }

}