<?php

namespace Config;

// Create a new instance of our RouteCollection class.
$routes = Services::routes();

// Load the system's routing file first, so that the app and ENVIRONMENT
// can override as needed.
if (file_exists(SYSTEMPATH . 'Config/Routes.php')) {
    require SYSTEMPATH . 'Config/Routes.php';
}

/*
 * --------------------------------------------------------------------
 * Router Setup
 * --------------------------------------------------------------------
 */
$routes->setDefaultNamespace('App\Controllers');
$routes->setDefaultController('Home');
$routes->setDefaultMethod('index');
$routes->setTranslateURIDashes(false);
$routes->set404Override();
$routes->setAutoRoute(true);

/*
 * --------------------------------------------------------------------
 * Route Definitions
 * --------------------------------------------------------------------
 */

// We get a performance increase by specifying the default
// route since we don't have to scan directories.
$routes->get('/', 'LoginController::index');
$routes->get('login', 'LoginController::index', ['filter' => 'noAuth']);
$routes->get('logout', 'LoginController::logout');

$routes->group('dashboard', ['filter' => 'auth'], function ($routes) {
    $routes->get('/', 'HomeController::index');
});

$routes->group('api', function ($routes) {
    $routes->get('ganadores/totalPremiosByPremio/(:any)/(:any)', 'RestGanadorController::totalPremiosByPremio/$1/$2');
    $routes->get('premios/getPromedioPremiosByPremio', 'RestPremioController::getPromedioPremiosByPremio');
    $routes->get('premios/porcentajePremiosEntregados', 'RestPremioController::porcentajePremiosEntregados');
    $routes->get('premios/getRecuento', 'RestPremioController::getRecuento');
    $routes->get('premios/totalPremiosByDia/(:any)/(:any)', 'RestPremioController::totalPremiosByDia/$1/$2');
    $routes->get('premios/premiosEntregadosByFecha/(:any)/(:any)', 'RestPremioController::premiosEntregadosByFecha/$1/$2');
    $routes->resource('ganadores', ['controller' => 'RestGanadorController']);
});

/*
 * --------------------------------------------------------------------
 * Additional Routing
 * --------------------------------------------------------------------
 *
 * There will often be times that you need additional routing and you
 * need it to be able to override any defaults in this file. Environment
 * based routes is one such time. require() additional route files here
 * to make that happen.
 *
 * You will have access to the $routes object within that file without
 * needing to reload it.
 */
if (file_exists(APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php')) {
    require APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php';
}
