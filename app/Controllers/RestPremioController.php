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
        
        $query = "
            SELECT COUNT(*) as total FROM ganadores WHERE DNI != ''
        ";
        $query= $db->query($query);
        $totalPersonasRegistradas = $query->getRow();    

        $query = "
            SELECT 
                COUNT(*) / ((CURDATE()+1) - STR_TO_DATE('2021-11-19', '%Y-%m-%d')) AS promedio
            FROM ganadores 
            WHERE premio_id != 0 AND DNI != ''
   
        ";
        $query= $db->query($query);
        $promedioPremiosEntregadosByDia = $query->getRow();    
        
        $response = array(
            'totalPremiosEntregados' => $totalPremiosEntregados,
            'totalPersonasRegistradas' => $totalPersonasRegistradas,
            'promedioPremiosEntregadosByDia' => $promedioPremiosEntregadosByDia,
        );
        
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
            FECHASPREMIOS.fecha,
            FECHASPREMIOS.premio,
            FECHASPREMIOS.id,
            COUNT(ganadores.id) AS TOTAL
            FROM (
            
                SELECT 
                    fechas.fecha,
                    premios.id,
                    premios.nombre_corto AS PREMIO
                FROM 
                (select adddate('2020-01-01',t4.i*10000 + t3.i*1000 + t2.i*100 + t1.i*10 + t0.i) FECHA from
                (select 0 i union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t0,
                (select 0 i union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t1,
                (select 0 i union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t2,
                (select 0 i union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t3,
                (select 0 i union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t4) 
                fechas, premios
                WHERE fechas.fecha between '$fechaINI' and '$fechaFIN'
                ) AS FECHASPREMIOS
            
        LEFT JOIN ganadores ON ganadores.premio_id = FECHASPREMIOS.id AND DATE_FORMAT(FECHASPREMIOS.fecha, '%Y-%m-%d') = DATE_FORMAT(ganadores.fecha, '%Y-%m-%d')
        GROUP BY 
            FECHASPREMIOS.fecha,
            FECHASPREMIOS.premio,
            FECHASPREMIOS.id
        ORDER BY
            FECHASPREMIOS.fecha,
            FECHASPREMIOS.id ASC
        
        ";
        $query= $db->query($query);
        $resultset = $query->getResultArray(); 
        $response = array('status' => 'OK', 'message' => 'Respuesta Correcta', 'data' => $resultset);

        return $this->respond($response);
    }

    public function getPromedioPremiosByPremio(){

        $db = \Config\Database::connect();
        $query = "
        SELECT 
            COUNT(ganadores.id) / ((CURDATE()+1) - STR_TO_DATE('2021-11-19', '%Y-%m-%d')) AS PROMEDIO,
            premios.nombre_corto as NOMBRE_PREMIO
        FROM ganadores 
        RIGHT JOIN premios ON premios.id = ganadores.premio_id
        GROUP BY 
            premios.id
        
        ";
        $query= $db->query($query);
        $response = $query->getResultArray();

        return $this->respond($response);
    }

    public function porcentajePremiosEntregados(){

        $db = \Config\Database::connect();
        $query = "
            SELECT 
            COUNT(ganadores.id) AS TOTAL_ENTREGADOS,
                457431  - COUNT(ganadores.id) AS TOTAL_PENDIENTES
            FROM ganadores 
            WHERE ganadores.id != 0 AND ganadores.dni != ''
   
        ";
        $query= $db->query($query);
        $response = $query->getResultArray();

        return $this->respond($response);
    }

    public function porcentajePremiosEntregadosByPremio($id, $totalPremios){

        $db = \Config\Database::connect();
        $query = "
            SELECT 
                COUNT(ganadores.id) AS TOTAL_ENTREGADOS,
                $totalPremios  - COUNT(ganadores.id) AS TOTAL_PENDIENTES,
                premios.nombre_corto
            FROM ganadores 
            RIGHT JOIN premios ON premios.id = ganadores.premio_id
            WHERE premios.id = '$id'
            GROUP BY 
                premios.id
   
        ";
        $query= $db->query($query);
        $response = $query->getResultArray();
        return $this->respond($response);
    }

    
}