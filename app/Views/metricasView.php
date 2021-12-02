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
           
            </div>
            <a class="navbar-brand">
              <div class="d-flex align-items-center py-3">
                <img class="me-2" src="assets/img/icons/spot-illustrations/sphera.png" alt="" width="95px" /><span class="font-sans-serif"></span>
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
            <div class="text-center">
              <p class="h3 mb-0">TABLERO DE CONTROL DESTAPA TU SUERTE</p>
                <img class="me-2" src="https://destapatusuerte.com/assets/img/logo.png" alt="" width="60" style="margin-left: 0.5rem;"/>
            
            </div>
          </div>
          

          <div class="row g-3 mb-3">
            <div class="col-md-6 col-xxl-3">
              <div class="card h-md-100 ecommerce-card-min-width">
                <div class="card-header pb-0">
                  <h6 class="mb-0 mt-2 d-flex align-items-center">Personas registradas a la fecha<span class="ms-1 text-400" data-bs-toggle="tooltip" data-bs-placement="top" title="Calculated according to last week's sales"><span class="far fa-question-circle" data-fa-transform="shrink-1"></span></span></h6>
                </div>
                <div class="card-body d-flex flex-column justify-content-end">
                  <div class="row">
                    <div class="col">
                      <p class="font-sans-serif lh-1 mb-1 fs-4">{{  totalPersonasRegistradas }}</p>
                      <span class="badge badge-soft-success rounded-pill fs--2"><?php echo date('Y-m-d')?></span>
                    </div>
                    <div class="col-auto ps-0">
                      <div class="echart-bar-weekly-sales h-100"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-xxl-3">
              <div class="card h-md-100 ecommerce-card-min-width">
                <div class="card-header pb-0">
                  <h6 class="mb-0 mt-2 d-flex align-items-center">Premios entregados a la fecha<span class="ms-1 text-400" data-bs-toggle="tooltip" data-bs-placement="top" title="Calculated according to last week's sales"><span class="far fa-question-circle" data-fa-transform="shrink-1"></span></span></h6>
                </div>
                <div class="card-body d-flex flex-column justify-content-end">
                  <div class="row">
                    <div class="col">
                      <p class="font-sans-serif lh-1 mb-1 fs-4">{{  totalPremiosEntregados }}</p>
                      <span class="badge badge-soft-success rounded-pill fs--2"><?php echo date('Y-m-d')?></span>
                    </div>
                    <div class="col-auto ps-0">
                      <div class="echart-bar-weekly-sales h-100"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-xxl-3">
              <div class="card h-md-100 ecommerce-card-min-width">
                <div class="card-header pb-0">
                  <h6 class="mb-0 mt-2 d-flex align-items-center">Promedio de premios entregados por dia<span class="ms-1 text-400" data-bs-toggle="tooltip" data-bs-placement="top" title="Calculated according to last week's sales"><span class="far fa-question-circle" data-fa-transform="shrink-1"></span></span></h6>
                </div>
                <div class="card-body d-flex flex-column justify-content-end">
                  <div class="row">
                    <div class="col">
                      <p class="font-sans-serif lh-1 mb-1 fs-4">{{ promedioPremiosEntregadosByDia }}</p>
                      <span class="badge badge-soft-success rounded-pill fs--2"><?php echo date('Y-m-d')?></span>
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
                <div class="card-header pb-0">
                  <h6 class="mb-0 mt-2">Visitas a la página</h6>
                </div>
                <div class="card-body d-flex flex-column justify-content-end">
                  <div class="row justify-content-between">
                    <div class="col-auto align-self-end">
                      <div id="visitas_a_pagina" class="fs-4 fw-normal font-sans-serif text-700 lh-1 mb-1">
                        0
                      </div><span class="badge rounded-pill fs--2 bg-200 text-primary"><span class="fas fa-caret-up me-1"></span>Desde: <?php echo date('Y-m-23')?></span>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-xxl-6">
              <div class="card h-md-100">
                <div class="card-header pb-0">
                  <h6 class="mb-0 mt-2">Tiempo de permanencia promedio</h6>
                </div>
                <div class="card-body d-flex flex-column justify-content-end">
                  <div class="row justify-content-between">
                    <div class="col-auto align-self-end">
                      <div id="tiempo_permanencia" class="fs-4 fw-normal font-sans-serif text-700 lh-1 mb-1">
                        0
                      </div><span class="badge rounded-pill fs--2 bg-200 text-primary"><span class="fas fa-caret-up me-1"></span>Desde: <?php echo date('Y-m-23')?></span>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-xxl-6">
              <div class="card h-md-100">
                <div class="card-header pb-0">
                  <h6 class="mb-0 mt-2">Tiempo de permanencia promedio</h6>
                </div>
                <div class="card-body d-flex flex-column justify-content-end">
                  <div class="row justify-content-between">
                    <div class="col-auto align-self-end">
                      <div id="tiempo_permanencia" class="fs-4 fw-normal font-sans-serif text-700 lh-1 mb-1">
                        0
                      </div><span class="badge rounded-pill fs--2 bg-200 text-primary"><span class="fas fa-caret-up me-1"></span>Desde: <?php echo date('Y-m-23')?></span>
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
                        <h6 class="mb-0">Grupo de duración de visita (Segundos)</h6>
                      </div>
                  </div>
                </div>
               
                <div class="card h-100">
                  <div class="card-body h-100">
                    <div class="echart-bar-chart-series-example" style="min-height: 300px;" data-echart-responsive="true"></div>
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
                    <div class="echart-bar-timeline-premios-entregados" style="min-height: 450px;" data-echart-responsive="true"></div>
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
                    
                    <div id="echar-canjeProductos" class="echart-bar-top-products h-100" data-echart-responsive="true"></div>
                  </div>
                </div>
                  
                
              </div>
            </div>

          </div>

          <footer class="footer">
            <div class="row g-0 justify-content-between fs--1 mt-4 mb-3">
              <div class="col-12 col-sm-auto text-center">
                <p class="mb-0 text-600">Copyright Sphera 2021 <span class="d-none d-sm-inline-block"> - </span><br class="d-sm-none" /> <?php echo date('Y'); ?> &copy; <a href="#">Sphera</a></p>
              </div>
              <div class="col-12 col-sm-auto text-center">
                <p class="mb-0 text-600">v3.5.0</p>
              </div>
            </div>
          </footer>
        </div>
        
      </div>
    </main>
    <!-- ===============================================-->
    <!--    End of Main Content-->
    <!-- ===============================================-->


    <?= $this->section('js')?>
      <!-- Load the JavaScript API client and Sign-in library. -->
      <script src="https://apis.google.com/js/client:platform.js"></script>
      <script type="text/javascript" src="assets/js/libs/moment.locale.js?<?php echo date('Ymd')?>"></script>
      <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/echarts@5.2.2/dist/echarts.min.js"></script>
      <script type="text/javascript" src="assets/js/pages/metricas.js?<?php echo date('Ymd')?>"></script>

       <script>
        // Replace with your view ID.
        var VIEW_ID = '255918165';

        // Query the API and print the results to the page.
        function queryReports() {
          gapi.client.request({
            path: '/v4/reports:batchGet',
            root: 'https://analyticsreporting.googleapis.com/',
            method: 'POST',
            body: {
              reportRequests: [
                      {
                        viewId: VIEW_ID,
                        dateRanges: [
                          {
                            startDate: '2021-11-23',
                            endDate: 'today'
                          }
                        ],
                        metrics: [
                          {
                            expression: 'ga:pageviews'
                          },
                          {
                            expression: 'ga:users'
                          },
                          {
                            expression: 'ga:newUsers'
                          },
                          {
                            expression: 'ga:avgSessionDuration'
                          }
                        ]
                      },
                      {
                        viewId: VIEW_ID,
                        dateRanges: [
                          {
                            startDate: '2021-11-23',
                            endDate: 'today'
                          }
                        ],
                        metrics: [
                          {
                            expression: 'ga:pageviews'
                          }
                        ],
                        dimensions: [
                          {
                            histogramBuckets: [
                              NaN
                            ],
                            name: 'ga:sessionDurationBucket'
                          }
                        ]
                      },
                      {
                        viewId: VIEW_ID,
                        dateRanges: [
                          {
                            startDate: '2021-11-23',
                            endDate: 'today'
                          }
                        ],
                        metrics: [
                          {
                            expression:'ga:pageviews'
                          }
                        ],
                        dimensions:[{"histogramBuckets":[null],
                         name: 'ga:date'
                        }]
                      }
                    ]
            }
          }).then( (response) => {
            displayResults(response);
            displayVisitantesporDia(response);
          }, console.error.bind(console));
        }

        function displayResults(response) {
          let ga_sessions = response.result.reports[0].data.totals[0].values[0];
          let ga_users = response.result.reports[0].data.totals[0].values[1];
          let ga_newUsers = response.result.reports[0].data.totals[0].values[2];
          let ga_avgSessionDuration = response.result.reports[0].data.totals[0].values[3];

          document.querySelector('#visitas_a_pagina').innerHTML = ga_sessions;
          document.querySelector('#tiempo_permanencia').innerHTML = moment.utc(parseInt(ga_avgSessionDuration)*1000).format('HH:mm:ss');;
        
          let report2_rows = response.result.reports[1].data.rows;
         
          let time_rows = report2_rows.map( row => {
            return {
              metrica: parseInt(row.dimensions[0]),
              valor: parseInt(row.metrics[0].values[0])
            }
          },0);

          //console.log(time_rows);

          const grupo1 = time_rows.filter( row => { 
            return row.metrica >= 0 && row.metrica <= 30
          }).reduce( (total, row) => {
            return total + row.valor;
          },0);

          const grupo2 = time_rows.filter( row => { 
            return row.metrica >= 31 && row.metrica <= 60
          }).reduce( (total, row) => {
            return total + row.valor;
          },0);

          const grupo3 = time_rows.filter( row => { 
            return row.metrica >= 61 && row.metrica <= 180
          }).reduce( (total, row) => {
            return total + row.valor;
          },0);

          const grupo4 = time_rows.filter( row => { 
            return row.metrica >= 181 && row.metrica <= 600
          }).reduce( (total, row) => {
            return total + row.valor;
          },0);

          const grupo5 = time_rows.filter( row => { 
            return row.metrica >= 601
          }).reduce( (total, row) => {
            return total + row.valor;
          },0);

          const metricas_tiempoPagina = [
            {
              title: '0-30 segundos',
              valor: grupo1
            },
            {
              title: '31-60 segundos',
              valor: grupo2
            },
            {
              title: '61-180 segundos',
              valor: grupo3
            },
            {
              title: '181-600 segundos',
              valor: grupo4
            },
            {
              title: '601-1800 segundos',
              valor: grupo5
            }
          ]

          const metricas_tiempoPagina_values = metricas_tiempoPagina.map ( row => row.valor)
          //console.log(metricas_tiempoPagina);

          
          var $barSeriesChartEl = document.querySelector('.echart-bar-chart-series-example');
          if ($barSeriesChartEl) {
            // Get options from data attribute
            var userOptions = utils.getData($barSeriesChartEl, 'options');
            var chart = window.echarts.init($barSeriesChartEl);

            var getDefaultOptions = function getDefaultOptions() {
              return {
                color: [utils.getColor('primary'), utils.getColor('info')],
                tooltip: {
                  trigger: 'axis',
                  axisPointer: {
                    type: 'shadow'
                  },
                  padding: [7, 10],
                  backgroundColor: utils.getGrays()['100'],
                  borderColor: utils.getGrays()['300'],
                  textStyle: {
                    color: utils.getColors().dark
                  },
                  borderWidth: 1,
                  transitionDuration: 0
                  
                },
                xAxis: {
                  type: 'value',
                  axisLabel: {
                    formatter: function formatter(value) {
                      return "".concat(value / 1000, "k");
                    },
                    color: utils.getGrays()['500']
                  },
                  axisLine: {
                    show: true,
                    lineStyle: {
                      color: utils.getGrays()['300'],
                      type: 'solid'
                    }
                  },
                  splitLine: {
                    lineStyle: {
                      type: 'dashed',
                      color: utils.getGrays()['200']
                    }
                  }
                },
                yAxis: {
                  type: 'category',
                  axisLine: {
                    show: true,
                    lineStyle: {
                      color: utils.getGrays()['300'],
                      type: 'solid'
                    }
                  },
                  axisLabel: {
                    color: utils.getGrays()['500']
                  },
                  axisTick: {
                    show: false
                  },
                  splitLine: {
                    show: false
                  },
                  data: ['0-30', '31-60', '61-180', '181-600', '601-1800']
                },
                series: [{
                  name: 'tiempo',
                  type: 'bar',
                  data: metricas_tiempoPagina_values,
                  itemStyle: {
                    barBorderRadius: [0, 3, 3, 0]
                  }
                }],
                grid: {
                  right: 15,
                  left: '12%',
                  bottom: '10%',
                  top: 5
                }
              };
            };

            echartSetOption(chart, userOptions, getDefaultOptions);
          }

        }


        function displayVisitantesporDia (response) {
          let ga_sessions = response.result.reports[0].data.totals[0].values[0];
          let ga_users = response.result.reports[0].data.totals[0].values[1];
         
        }

        

      </script>
      
    <?= $this->endSection()?>
           
<?= $this->endSection()?>