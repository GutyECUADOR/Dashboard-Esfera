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

    public function getRecuento(){
        $db = \Config\Database::connect();
       
        $query = "
            SELECT COUNT(*) as total FROM ganadores WHERE premio_id != 0 AND DNI != ''
        ";
        $query= $db->query($query);
        $totalPremiosEntregados = $query->getRow();    
        
        $response = array(
            'totalPremiosEntregados' => $totalPremiosEntregados);
        
        return $this->respond($response);
    }

    public function totalPremiosByDia($fechaINI, $fechaFIN){

        $db = \Config\Database::connect();
        $query = "
        SELECT 
            DATE_FORMAT(ganadores.fecha, '%Y-%m-%d') AS FECHA_CANJE,
            COUNT(ganadores.id) AS TOTAL
        FROM ganadores 
        INNER JOIN premios ON premios.ID = ganadores.premio_id
        WHERE premio_id != 0 AND premio_id IS NOT NULL
        AND DATE_FORMAT(ganadores.fecha, '%Y-%m-%d') BETWEEN '$fechaINI' AND '$fechaFIN'
        GROUP BY 
            DATE_FORMAT(ganadores.fecha, '%Y-%m-%d')
        
        ";
        $query= $db->query($query);
        $resultset = $query->getResultArray(); 
        $response = array('status' => 'OK', 'message' => 'Respuesta Correcta', 'premios' => $resultset);

        return $this->respond($response);
    }


    public function premiosEntregadosByFecha($fechaINI, $fechaFIN){

        $db = \Config\Database::connect();
        $query = "
        SELECT 
            DATE_FORMAT(ganadores.fecha, '%Y-%m-%d') AS FECHA_CANJE,
            COUNT(ganadores.id) AS TOTAL
        FROM ganadores 
        INNER JOIN premios ON premios.ID = ganadores.premio_id
        WHERE premio_id != 0 AND premio_id IS NOT NULL
        AND DATE_FORMAT(ganadores.fecha, '%Y-%m-%d') BETWEEN '$fechaINI' AND '$fechaFIN'
        GROUP BY 
            DATE_FORMAT(ganadores.fecha, '%Y-%m-%d')
        
        ";
        $query= $db->query($query);
        $resultset = $query->getResultArray(); 
        $response = array('status' => 'OK', 'message' => 'Respuesta Correcta', 'premios' => $resultset);

        return $this->respond($response);
    }

    
}