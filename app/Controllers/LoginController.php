<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Models\UsuarioModel;

class LoginController extends BaseController {
    private $usuarioModel;

    public function __construct() {
        $this->usuarioModel = new UsuarioModel();
    }

	public function index() {
        helper('form');
        return view('authentication/loginView');
	}

    public function loginAnalytics() {
        helper('form');
        return view('authentication/loginAnalyticsView');
	}

	public function checklogin() {
        $usuario = strtoupper($this->request->getPost('email'));
        $password = $this->request->getPost('password');
        
        if (!empty($usuario) && !empty($password)) {
			$resultset = $this->usuarioModel
                        ->select('fullname, username, email, rol')
                        ->where('email', $usuario)
                        ->first();
          
			if ($resultset) { 
                $session_data = array(
                    'user' => $resultset->email,
					'user_role' => trim($resultset->rol),
					'logged_in' => TRUE
				);
               
                $session = session();
                $session->set($session_data);
                return redirect()->to(base_url('/loginAnalytics'));	
            } else {
				return  redirect()
                            ->to(base_url('/login'))
                            ->withInput()
                            ->with('message','No se ha podido ingresar con el usuario <strong>'.$usuario.'</strong>.');	
			}
		}else {
			return redirect()->to(base_url('/login'));	
		}
	}

	public function logout(){
    	$this->session->destroy();
		return redirect()->to(base_url('/'));	
	}

    public function test() {
        echo 'Controller listo';
	}
}