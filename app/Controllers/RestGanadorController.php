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

}