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

    
}