<?= $this->extend('layouts/dashboardTemplate') ?>
<?= $this->section('Main Content')?>

    <!-- ===============================================-->
    <!--    Main Content-->
    <!-- ===============================================-->
    <main class="main" id="top">
      <div class="container" data-layout="container">
        <script>
          var isFluid = JSON.parse(localStorage.getItem('isFluid'));
          if (isFluid) {
            var container = document.querySelector('[data-layout]');
            container.classList.remove('container');
            container.classList.add('container-fluid');
          }
        </script>
        <nav class="navbar navbar-light navbar-vertical navbar-expand-xl">
          <script>
            var navbarStyle = localStorage.getItem("navbarStyle");
            if (navbarStyle && navbarStyle !== 'transparent') {
              document.querySelector('.navbar-vertical').classList.add(`navbar-${navbarStyle}`);
            }
          </script>
          <div class="d-flex align-items-center">
            <div class="toggle-icon-wrapper">

              <button class="btn navbar-toggler-humburger-icon navbar-vertical-toggle" data-bs-toggle="tooltip" data-bs-placement="left" title="Toggle Navigation"><span class="navbar-toggle-icon"><span class="toggle-line"></span></span></button>

            </div><a class="navbar-brand">
              <div class="d-flex align-items-center py-3"><img class="me-2" src="assets/img/icons/spot-illustrations/falcon.png" alt="" width="40" /><span class="font-sans-serif">Sphera</span>
              </div>
            </a>
          </div>
          <!-- Navbar Vertical -->
            <?= $this->include('sys_modules/navbarVerticalCollapse')?>
          <!-- Navbar Vertical -->
        </nav>
        <div id="app" class="content">
          <!-- Navbar Vertical -->
          <?= $this->include('sys_modules/navbar')?>
          <!-- Navbar Vertical -->
          <div class="row g-3 mb-3">
            <div class="col-md-6 col-xxl-3">
              <div class="card h-md-100 ecommerce-card-min-width">
                <div class="card-header pb-0">
                  <h6 class="mb-0 mt-2 d-flex align-items-center">Premios entregados a la fecha<span class="ms-1 text-400" data-bs-toggle="tooltip" data-bs-placement="top" title="Calculated according to last week's sales"><span class="far fa-question-circle" data-fa-transform="shrink-1"></span></span></h6>
                </div>
                <div class="card-body d-flex flex-column justify-content-end">
                  <div class="row">
                    <div class="col">
                      <p class="font-sans-serif lh-1 mb-1 fs-4">{{  totalPremiosEntregados }}</p><span class="badge badge-soft-success rounded-pill fs--2"><?php echo date('Y-m-d')?></span>
                    </div>
                    <div class="col-auto ps-0">
                      <div class="echart-bar-weekly-sales h-100"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-xxl-3">
              <div class="card h-md-100">
                <div class="card-body">
                  <div class="row h-100 justify-content-between g-0">
                    <div class="col-5 col-sm-6 col-xxl pe-2">
                      <h6 class="mt-1">Promedio de premios entregados por dia</h6>
                      
                    </div>
                    <div class="col-auto position-relative">
                      <div class="echart-market-share"></div>
                      <div class="position-absolute top-50 start-50 translate-middle text-dark fs-2">{{ promedioPremiosEntregadosByDia }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-xxl-3">
              <div class="card h-md-100">
                <div class="card-header pb-0">
                  <h6 class="mb-0 mt-2">Visitas a la página</h6>
                </div>
                <div class="card-body d-flex flex-column justify-content-end">
                  <div class="row justify-content-between">
                    <div class="col-auto align-self-end">
                      <div class="fs-4 fw-normal font-sans-serif text-700 lh-1 mb-1">0</div><span class="badge rounded-pill fs--2 bg-200 text-primary"><span class="fas fa-caret-up me-1"></span>0%</span>
                    </div>
                    <div class="col-auto ps-0 mt-n4">
                      <div class="echart-default-total-order" data-echarts='{"tooltip":{"trigger":"axis","formatter":"{b0} : {c0}"},"xAxis":{"data":["Week 4","Week 5","week 6","week 7"]},"series":[{"type":"line","data":[20,40,100,120],"smooth":true,"lineStyle":{"width":3}}],"grid":{"bottom":"2%","top":"2%","right":"10px","left":"10px"}}' data-echart-responsive="true"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-xxl-3">
              <div class="card h-md-100">
                <div class="card-header pb-0">
                  <h6 class="mb-0 mt-2">Tiempo de permanencia</h6>
                </div>
                <div class="card-body d-flex flex-column justify-content-end">
                  <div class="row justify-content-between">
                    <div class="col-auto align-self-end">
                      <div class="fs-4 fw-normal font-sans-serif text-700 lh-1 mb-1">0</div><span class="badge rounded-pill fs--2 bg-200 text-primary"><span class="fas fa-caret-up me-1"></span>0%</span>
                    </div>
                    <div class="col-auto ps-0 mt-n4">
                      <div class="echart-default-total-order" data-echarts='{"tooltip":{"trigger":"axis","formatter":"{b0} : {c0}"},"xAxis":{"data":["Week 4","Week 5","week 6","week 7"]},"series":[{"type":"line","data":[20,40,100,120],"smooth":true,"lineStyle":{"width":3}}],"grid":{"bottom":"2%","top":"2%","right":"10px","left":"10px"}}' data-echart-responsive="true"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row g-0">
            <div class="col-lg-6 pe-lg-2 mb-3">
              <div class="card h-lg-100 overflow-hidden">
                <div class="card-header bg-light">
                  <div class="row flex-between-center">
                      <div class="col-auto">
                        <h6 class="mb-0">Promedio de premios entregados por tipo de premio</h6>
                      </div>
                      
                  </div>
                </div>
               
                <div class="card h-100">
                  <div class="card-body h-100">
                    <!-- Find the JS file for the following chart at: src/js/charts/echarts/top-products.js-->
                    <!-- If you are not using gulp based workflow, you can find the transpiled code at: public/assets/js/theme.js-->
                    <div id="echar-canjeProductos" class="echart-bar-top-products h-100" data-echart-responsive="true"></div>
                  </div>
                </div>
                  
                
              </div>
            </div>
            <div class="col-lg-6 ps-lg-2 mb-3">
              <div class="card h-lg-100">
                <div class="card-header bg-light">
                  <div class="row flex-between-center">
                    <div class="col-auto">
                      <h6 class="mb-0">Premios canjeados por dia</h6>
                    </div>
                    <div class="col-auto d-flex w-100">
                      <input type="date" v-model="grafica2.fechaINI" @change="grafica2_getPremiosByDia" class="form-control form-control-sm me-2">
                      <input type="date" v-model="grafica2.fechaFIN" @change="grafica2_getPremiosByDia" class="form-control form-control-sm">
                     
                      <div class="dropdown font-sans-serif btn-reveal-trigger">
                        <button class="btn btn-link text-600 btn-sm dropdown-toggle dropdown-caret-none btn-reveal" type="button" id="dropdown-total-sales" data-bs-toggle="dropdown" data-boundary="viewport" aria-haspopup="true" aria-expanded="false"><span class="fas fa-ellipsis-h fs--2"></span></button>
                        <div class="dropdown-menu dropdown-menu-end border py-2" aria-labelledby="dropdown-total-sales">
                          <a class="dropdown-item" @click="grafica2_getPremiosByDia">Recargar</a>
                          <a class="dropdown-item" href="#!">Exportar Informe</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="card-body h-100 pe-0">
                  <!-- Find the JS file for the following chart at: src\js\charts\echarts\total-sales.js-->
                  <!-- If you are not using gulp based workflow, you can find the transpiled code at: public\assets\js\theme.js-->
                  <div class="echart-line-total-sales h-100" data-echart-responsive="true"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="row g-0">
            <div class="col-lg-12 mb-3">
              <div class="card h-lg-100 overflow-hidden">
                <div class="card-header bg-light">
                  <div class="row align-items-center">
                    <div class="col">
                      <h6 class="mb-0">Grafica 3 - Premios entregados por fecha</h6>
                    </div>
                    <div class="col-auto d-flex w-100">
                      <input type="date" v-model="grafica3.fechaINI" @change="grafica3_premiosEntregadosByFecha" class="form-control form-control-sm me-2">
                      <input type="date" v-model="grafica3.fechaFIN" @change="grafica3_premiosEntregadosByFecha" class="form-control form-control-sm">
                     
                      <div class="dropdown font-sans-serif btn-reveal-trigger">
                        <button class="btn btn-link text-600 btn-sm dropdown-toggle dropdown-caret-none btn-reveal" type="button" id="dropdown-total-sales" data-bs-toggle="dropdown" data-boundary="viewport" aria-haspopup="true" aria-expanded="false"><span class="fas fa-ellipsis-h fs--2"></span></button>
                        <div class="dropdown-menu dropdown-menu-end border py-2" aria-labelledby="dropdown-total-sales">
                          <a class="dropdown-item" @click="grafica3_premiosEntregadosByFecha">Recargar</a>
                          <a class="dropdown-item" href="#!">Exportar Informe</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
               
                <div class="card h-100">
                  <div class="card-body h-100">
                    <div class="echart-bar-timeline-chart-example" style="min-height: 450px;" data-echart-responsive="true"></div>
                  </div>
                </div>
                  



                
              </div>
            </div>
           
          </div>
          <div class="row g-0">
            <div class="col-lg-6 pe-lg-2 mb-3">
              <div class="card h-lg-100 overflow-hidden">
                <div class="card-header bg-light">
                  <div class="row flex-between-center">
                      <div class="col-auto">
                        <h6 class="mb-0">Pastel porcentaje premios entregados</h6>
                      </div>
                  </div>
                </div>
               
                <div class="card h-100">
                  <div class="card-body h-100">
                    <div class="echart-pie-chart-example" style="min-height: 320px;" data-echart-responsive="true"></div>
                  </div>
                </div>
                  
                
              </div>
            </div>

            <div class="col-lg-6 pe-lg-2 mb-3">
              <div class="card h-lg-100 overflow-hidden">
                <div class="card-header bg-light">
                  <div class="row flex-between-center">
                      <div class="col-auto">
                        <h6 class="mb-0">Pastel porcentaje premios entregados por premio</h6>
                      </div>
                      <div class="col-auto text-center pe-card">
                        <select v-model="grafica5.premioID" @change="setTotalPremioByID(grafica5.premioID)" class="form-select form-select-sm">
                          <option value='1'>Motos</option>
                          <option value='2'>TVs</option>
                          <option value='3'>Telefonos</option>
                          <option value='4'>Bicicletas</option>
                          <option value='5'>Bonos</option>
                          <option value='6'>Amazon</option>
                          <option value='7'>Recarga</option>
                          <option value='8'>Betplay</option>
                         
                        </select>
                    </div>
                  </div>
                </div>
               
                <div class="card h-100">
                  <div class="card-body h-100">
                    <div class="echart-pie-chart-premios" style="min-height: 320px;" data-echart-responsive="true"></div>
                  </div>
                </div>
                  
                
              </div>
            </div>
           
          </div>
          <footer class="footer">
            <div class="row g-0 justify-content-between fs--1 mt-4 mb-3">
              <div class="col-12 col-sm-auto text-center">
                <p class="mb-0 text-600">Thank you for creating with Falcon <span class="d-none d-sm-inline-block">| </span><br class="d-sm-none" /> 2021 &copy; <a href="https://themewagon.com">Themewagon</a></p>
              </div>
              <div class="col-12 col-sm-auto text-center">
                <p class="mb-0 text-600">v3.5.0</p>
              </div>
            </div>
          </footer>
        </div>
        <div class="modal fade" id="authentication-modal" tabindex="-1" role="dialog" aria-labelledby="authentication-modal-label" aria-hidden="true">
          <div class="modal-dialog mt-6" role="document">
            <div class="modal-content border-0">
              <div class="modal-header px-5 position-relative modal-shape-header bg-shape">
                <div class="position-relative z-index-1 light">
                  <h4 class="mb-0 text-white" id="authentication-modal-label">Register</h4>
                  <p class="fs--1 mb-0 text-white">Please create your free Falcon account</p>
                </div>
                <button class="btn-close btn-close-white position-absolute top-0 end-0 mt-2 me-2" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body py-4 px-5">
                <form>
                  <div class="mb-3">
                    <label class="form-label" for="modal-auth-name">Name</label>
                    <input class="form-control" type="text" autocomplete="on" id="modal-auth-name" />
                  </div>
                  <div class="mb-3">
                    <label class="form-label" for="modal-auth-email">Email address</label>
                    <input class="form-control" type="email" autocomplete="on" id="modal-auth-email" />
                  </div>
                  <div class="row gx-2">
                    <div class="mb-3 col-sm-6">
                      <label class="form-label" for="modal-auth-password">Password</label>
                      <input class="form-control" type="password" autocomplete="on" id="modal-auth-password" />
                    </div>
                    <div class="mb-3 col-sm-6">
                      <label class="form-label" for="modal-auth-confirm-password">Confirm Password</label>
                      <input class="form-control" type="password" autocomplete="on" id="modal-auth-confirm-password" />
                    </div>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="modal-auth-register-checkbox" />
                    <label class="form-label" for="modal-auth-register-checkbox">I accept the <a href="#!">terms </a>and <a href="#!">privacy policy</a></label>
                  </div>
                  <div class="mb-3">
                    <button class="btn btn-primary d-block w-100 mt-3" type="submit" name="submit">Register</button>
                  </div>
                </form>
                <div class="position-relative mt-5">
                  <hr class="bg-300" />
                  <div class="divider-content-center">or register with</div>
                </div>
                <div class="row g-2 mt-2">
                  <div class="col-sm-6"><a class="btn btn-outline-google-plus btn-sm d-block w-100" href="#"><span class="fab fa-google-plus-g me-2" data-fa-transform="grow-8"></span> google</a></div>
                  <div class="col-sm-6"><a class="btn btn-outline-facebook btn-sm d-block w-100" href="#"><span class="fab fa-facebook-square me-2" data-fa-transform="grow-8"></span> facebook</a></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <!-- ===============================================-->
    <!--    End of Main Content-->
    <!-- ===============================================-->


    <?= $this->section('js')?>
      <script type="text/javascript" src="assets/js/libs/moment.locale.js?<?php echo date('Ymd')?>"></script>
      <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/echarts@5.2.2/dist/echarts.min.js"></script>
      <script type="text/javascript" src="assets/js/pages/metricas.js?<?php echo date('Ymd')?>"></script>
    <?= $this->endSection()?>
           
<?= $this->endSection()?>