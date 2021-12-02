const app = new Vue({
    el: '#app',
    data: {
        title: 'Dashboard',
        totalPremiosEntregados: 0,
        totalPersonasRegistradas: 0,
        promedioPremiosEntregadosByDia: 0,
        grafica1: {
          valores : []
        },
        grafica2: {
          fechaINI : moment().format("YYYY-MM-01"),
          fechaFIN : moment().format("YYYY-MM-30"),
          categorias : [],
          serie: []
        },
        grafica3: {
          fechaINI : moment().format("YYYY-MM-19"),
          fechaFIN : moment().format("YYYY-MM-DD")
        },
        grafica5: {
          premioID: "1",
          totalPremios: 10
        }
    },
    methods:{
        async getReconteo() {
          const response = await fetch(`./api/premios/getRecuento`, {
                            })
                            .then(response => {
                                return response.json();
                            })
                            .catch( error => {
                                console.error(error);
                            }); 
          console.log(response);
                      
          this.totalPremiosEntregados = response.totalPremiosEntregados.total;
          this.totalPersonasRegistradas = response.totalPersonasRegistradas.total;
          this.promedioPremiosEntregadosByDia = parseFloat(response.promedioPremiosEntregadosByDia.promedio).toFixed(2);
          
        },
        async grafica1_getPromedioPremiosByPremio() {
           
            const response = await fetch(`./api/premios/getPromedioPremiosByPremio`, {
                })
                .then(response => {
                    return response.json();
                })
                .then(response => {
                  return response.map( product => {
                    return [product.NOMBRE_PREMIO, parseFloat(product.PROMEDIO).toFixed(2)]
                  });
                }).catch( error => {
                    console.error(error);
                });
                
            console.log(response);

            this.grafica1.valores = response;
           
            let dom = document.getElementById("echar-canjeProductos");
            let myChart = echarts.init(dom);
            
            let option = {
                color: [utils.getColors().primary, utils.getGrays()['800']],
                dataset: {
                  source: this.grafica1.valores
                },
                tooltip: {
                  trigger: 'item',
                  padding: [7, 10],
                  backgroundColor: utils.getGrays()['100'],
                  borderColor: utils.getGrays()['300'],
                  textStyle: {
                    color: utils.getColors().dark
                  },
                  borderWidth: 1,
                  transitionDuration: 0,
                  position: function position(pos, params, dom, rect, size) {
                    return getPosition(pos, params, dom, rect, size);
                  },
                  formatter: function formatter(params) {
                    return "<div class=\"font-weight-semi-bold\">".concat('Producto', "</div><div class=\"fs--1 text-600\"><strong>").concat(params.name, ":</strong> ").concat(params.value[params.componentIndex + 1], "</div>");
                  }
                },
                legend: {
                  data: [],
                  left: 'center',
                  itemWidth: 10,
                  itemHeight: 10,
                  borderRadius: 0,
                  icon: 'circle',
                  inactiveColor: utils.getGrays()['400'],
                  textStyle: {
                    color: utils.getGrays()['700']
                  }
                },
                xAxis: {
                  type: 'category',
                  axisLabel: {
                    color: utils.getGrays()['400']
                  },
                  axisLine: {
                    lineStyle: {
                      color: utils.getGrays()['300'],
                      type: 'dashed'
                    }
                  },
                  axisTick: false,
                  boundaryGap: true
                },
                yAxis: {
                  axisPointer: {
                    type: 'none'
                  },
                  axisTick: 'none',
                  splitLine: {
                    lineStyle: {
                      color: utils.getGrays()['300'],
                      type: 'dashed'
                    }
                  },
                  axisLine: {
                    show: false
                  },
                  axisLabel: {
                    color: utils.getGrays()['400']
                  }
                },
                series: [{
                  type: 'bar',
                  barWidth: '10px',
                  barGap: '30%',
                  label: {
                    normal: {
                      show: false
                    }
                  },
                  z: 10,
                  itemStyle: {
                    normal: {
                      barBorderRadius: [10, 10, 0, 0],
                      color: utils.getColors().primary
                    }
                  }
                }],
                grid: {
                  right: '0',
                  left: '30px',
                  bottom: '10%',
                  top: '20%'
                }
            };
            
            if (option && typeof option === 'object') {
                myChart.setOption(option);
            }
            
           
        },
        async grafica2_getPremiosByDia(){

          const response = await fetch(`./api/premios/totalPremiosByDia/${this.grafica2.fechaINI}/${this.grafica2.fechaFIN}`, {
          })
          .then(response => {
              return response.json();
          })
          .catch( error => {
              console.error(error);
          }); 

          let serie = response.premios.map( dia => {
            return parseInt(dia.TOTAL);
          })

          let categorias = response.premios.map( dia => {
            return dia.FECHA_CANJE;
          })

          this.grafica2.serie = serie;
          this.grafica2.categorias = categorias;

          let dom = document.querySelector('.echart-line-total-sales');
         
          if (dom) {
            let chart = echarts.init(dom);
           
            let option = {
              color: utils.getGrays()['100'],
              tooltip: {
                trigger: 'axis',
                padding: [7, 10],
                backgroundColor: utils.getGrays()['100'],
                borderColor: utils.getGrays()['300'],
                textStyle: {
                  color: utils.getColors().dark
                },
                borderWidth: 1,
                transitionDuration: 0,
                position: function position(pos, params, dom, rect, size) {
                  return getPosition(pos, params, dom, rect, size);
                }
              },
              xAxis: {
                type: 'category',
                data: this.grafica2.categorias,
                boundaryGap: false,
                axisPointer: {
                  lineStyle: {
                    color: utils.getGrays()['300'],
                    type: 'dashed'
                  }
                },
                splitLine: {
                  show: false
                },
                axisLine: {
                  lineStyle: {
                    // color: utils.getGrays()['300'],
                    color: utils.rgbaColor('#000', 0.01),
                    type: 'dashed'
                  }
                },
                axisTick: {
                  show: false
                },
                axisLabel: {
                  color: utils.getGrays()['400'],
                  formatter: function formatter(value) {
                    moment.locale("es")
                    let date = moment(value).format('dddd DD');
                    return date;
                  },
                  margin: 15
                }
              },
              yAxis: {
                type: 'value',
                axisPointer: {
                  show: false
                },
                splitLine: {
                  lineStyle: {
                    color: utils.getGrays()['300'],
                    type: 'dashed'
                  }
                },
                boundaryGap: false,
                axisLabel: {
                  show: true,
                  color: utils.getGrays()['400'],
                  margin: 15
                },
                axisTick: {
                  show: false
                },
                axisLine: {
                  show: false
                }
              },
              series: [{
                type: 'line',
                data: this.grafica2.serie,
                lineStyle: {
                  color: utils.getColors().primary
                },
                itemStyle: {
                  borderColor: utils.getColors().primary,
                  borderWidth: 2
                },
                symbol: 'circle',
                symbolSize: 10,
                smooth: false,
                hoverAnimation: true,
                areaStyle: {
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                      offset: 0,
                      color: utils.rgbaColor(utils.getColors().primary, 0.2)
                    }, {
                      offset: 1,
                      color: utils.rgbaColor(utils.getColors().primary, 0)
                    }]
                  }
                }
              }],
              grid: {
                right: '28px',
                left: '40px',
                bottom: '15%',
                top: '5%'
              }
            };

            if (option && typeof option === 'object') {
              chart.setOption(option);
            }

          

           
          }


        },
        async grafica3_premiosEntregadosByFecha(){

          //Consulta de datos a la DB
          const response = await fetch(`./api/premios/premiosEntregadosByFecha/${this.grafica3.fechaINI}/${this.grafica3.fechaFIN}`, {
          })
          .then(response => {
              return response.json();
          })
          .catch( error => {
              console.error(error);
          }); 

          let data_motos = response.data.filter( premio => {
              if (premio.id == '1') {
                return premio.TOTAL;
              }
          }).map( premio => premio.TOTAL);

          let data_tvs = response.data.filter( premio => {
            if (premio.id == '2') {
              return premio.TOTAL;
            }
          }).map( premio => premio.TOTAL);

          let data_celulares = response.data.filter( premio => {
            if (premio.id == '3') {
              return premio.TOTAL;
            }
          }).map( premio => premio.TOTAL);

          let data_bicicletas = response.data.filter( premio => {
            if (premio.id == '4') {
              return premio.TOTAL;
            }
          }).map( premio => premio.TOTAL);

          let data_bonos = response.data.filter( premio => {
            if (premio.id == '5') {
              return premio.TOTAL;
            }
          }).map( premio => premio.TOTAL);

          let data_amazon = response.data.filter( premio => {
            if (premio.id == '6') {
              return premio.TOTAL;
            }
          }).map( premio => premio.TOTAL);

          let data_recargas = response.data.filter( premio => {
            if (premio.id == '7') {
              return premio.TOTAL;
            }
          }).map( premio => premio.TOTAL);

          let data_betplay = response.data.filter( premio => {
            if (premio.id == '8') {
              return premio.TOTAL;
            }
          }).map( premio => premio.TOTAL);

          console.log(data_betplay);

          let $barTimelineChartEl = document.querySelector('.echart-bar-timeline-chart-example');

          if ($barTimelineChartEl) {
            // Get options from data attribute
            let userOptions = utils.getData($barTimelineChartEl, 'options');
            let chart = window.echarts.init($barTimelineChartEl);
            let startDate = moment(this.grafica3.fechaINI);
            let endDate = moment(this.grafica3.fechaFIN);
            let dateList = this.getDaysBetweenDates(startDate, endDate);
            let serie_dias = dateList; 
            let dataMap = {};

            let dataFormatter = function dataFormatter(obj) {
              return Object.keys(obj).reduce(function (acc, val) {
                return _objectSpread(_objectSpread({}, acc), {}, _defineProperty({}, val, obj[val].map(function (value, index) {
                  return {
                    name: serie_dias[index],
                    value: value
                  };
                })));
              }, {});
            };

            dataMap.motos = dataFormatter({
              noviembre: data_motos
            });
            dataMap.tvs = dataFormatter({
              noviembre: data_tvs
            });
            dataMap.celulares = dataFormatter({
              noviembre: data_celulares
            });

            dataMap.bicicletas = dataFormatter({
              noviembre: data_bicicletas
            });

            dataMap.bonos = dataFormatter({
              noviembre: data_bonos
            });
            dataMap.amazon = dataFormatter({
              noviembre: data_amazon
            });
            dataMap.recargas = dataFormatter({
              noviembre: data_recargas
            });

            dataMap.betplay = dataFormatter({
              noviembre: data_betplay
              
            });


            let getDefaultOptions = function getDefaultOptions() {
              return {
                baseOption: {
                  timeline: {
                    axisType: 'category',
                    autoPlay: false,
                    playInterval: 1000,
                    data: ['Busqueda'],
                    label: {
                      formatter: function formatter(s) {
                        return s;
                      }
                    },
                    lineStyle: {
                      color: utils.getColor('info')
                    },
                    itemStyle: {
                      color: utils.getColor('secondary')
                    },
                    checkpointStyle: {
                      color: utils.getColor('primary'),
                      shadowBlur: 0,
                      shadowOffsetX: 0,
                      shadowOffsetY: 0
                    },
                    controlStyle: {
                      color: utils.getColor('info')
                    }
                  },
                  title: {
                    textStyle: {
                      color: utils.getGrays()['700']
                    }
                  },
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
                  legend: {
                    left: 'right',
                    data: ['Motos', 'TV', 'Celulares','Bicicletas','Bonos','Amazon','Recargas','Betplay'],
                    textStyle: {
                      color: utils.getGrays()['700']
                    }
                  },
                  calculable: true,
                  xAxis: [{
                    type: 'category',
                    data: serie_dias,
                    splitLine: {
                      show: false
                    },
                    axisLabel: {
                      color: utils.getGrays()['600']
                    },
                    axisLine: {
                      lineStyle: {
                        color: utils.getGrays()['400']
                      }
                    }
                  }],
                  yAxis: [{
                    type: 'value',
                    axisLabel: {
                      formatter: function formatter(value) {
                        return value;
                      },
                      color: utils.getGrays()['600']
                    },
                    splitLine: {
                      lineStyle: {
                        color: utils.getGrays()['200']
                      }
                    }
                  }],
                  series: [{
                    name: 'Motos',
                    type: 'bar',
                    itemStyle: {
                      color: utils.getColor('primary'),
                      barBorderRadius: [3, 3, 0, 0]
                    }
                  }, {
                    name: 'TV',
                    type: 'bar',
                    itemStyle: {
                      color: utils.getColor('info'),
                      barBorderRadius: [3, 3, 0, 0]
                    }
                  }, {
                    name: 'Celulares',
                    type: 'bar',
                    itemStyle: {
                      color: utils.getColor('warning'),
                      barBorderRadius: [3, 3, 0, 0]
                    }
                  }, {
                    name: 'Bicicletas',
                    type: 'bar',
                    itemStyle: {
                      color: '#E43961',
                      barBorderRadius: [3, 3, 0, 0]
                    }
                  }, {
                    name: 'Bonos',
                    type: 'bar',
                    itemStyle: {
                      color: '#513028',
                      barBorderRadius: [3, 3, 0, 0]
                    }
                  },  {
                    name: 'Amazon',
                    type: 'bar',
                    itemStyle: {
                      color: '#297D34',
                      barBorderRadius: [3, 3, 0, 0]
                    }
                  }, {
                    name: 'Recargas',
                    type: 'bar',
                    itemStyle: {
                      color: '#D1CA3C',
                      barBorderRadius: [3, 3, 0, 0]
                    }
                  }, {
                    name: 'Betplay',
                    type: 'bar',
                    itemStyle: {
                      color: '#DA0925',
                      barBorderRadius: [3, 3, 0, 0]
                    }
                  }],
                  grid: {
                    top: '10%',
                    bottom: '15%',
                    left: 5,
                    right: 10,
                    containLabel: true
                  }
                },
                options: [{
                  title: {
                    text: 'Búsqueda'
                  },
                  series: [{
                    data: dataMap.motos['noviembre']
                  }, {
                    data: dataMap.tvs['noviembre']
                  }, {
                    data: dataMap.celulares['noviembre']
                  }, {
                    data: dataMap.bicicletas['noviembre']
                  }, {
                    data: dataMap.bonos['noviembre']
                  }, {
                    data: dataMap.amazon['noviembre']
                  }, {
                    data: dataMap.recargas['noviembre']
                  }, {
                    data: dataMap.betplay['noviembre']
                  }]
                }, {
                  title: {
                    text: 'Diciembre'
                  },
                  series: [{
                    data: dataMap.motos['diciembre']
                  }, {
                    data: dataMap.tvs['diciembre']
                  }, {
                    data: dataMap.celulares['diciembre']
                  }, {
                    data: dataMap.bicicletas['diciembre']
                  }, {
                    data: dataMap.bonos['diciembre']
                  }, {
                    data: dataMap.amazon['diciembre']
                  }, {
                    data: dataMap.recargas['diciembre']
                  }, {
                    data: dataMap.betplay['diciembre']
                  }]
                }, {
                  title: {
                    text: 'Enero'
                  },
                  series: [{
                    data: dataMap.motos['enero']
                  }, {
                    data: dataMap.tvs['enero']
                  }, {
                    data: dataMap.celulares['enero']
                  }, {
                    data: dataMap.bicicletas['enero']
                  }, {
                    data: dataMap.bonos['enero']
                  }, {
                    data: dataMap.amazon['enero']
                  }, {
                    data: dataMap.recargas['enero']
                  }, {
                    data: dataMap.betplay['enero']
                  }]
                }, {
                  title: {
                    text: 'Febrero'
                  },
                  series: [{
                    data: dataMap.motos['febrero']
                  }, {
                    data: dataMap.tvs['febrero']
                  }, {
                    data: dataMap.celulares['febrero']
                  }, {
                    data: dataMap.bicicletas['febrero']
                  }, {
                    data: dataMap.bonos['febrero']
                  }, {
                    data: dataMap.amazon['febrero']
                  }, {
                    data: dataMap.recargas['febrero']
                  }, {
                    data: dataMap.betplay['febrero']
                  }]
                }]
              };
            };

            echartSetOption(chart, userOptions, getDefaultOptions);
          }
        },
        getDaysBetweenDates (startDate, endDate) {
          let now = startDate.clone(), dates = [];
      
          while (now.isSameOrBefore(endDate)) {
              dates.push(now.format('dddd DD-MM-YYYY'));
              now.add(1, 'days');
          }
          return dates;
        },
        async grafica4_pastelPorcentajePremios(){

          const response = await fetch(`./api/premios/porcentajePremiosEntregados`, {
            })
            .then(response => {
                return response.json();
            })
            .then(response => {
              return response.map( row => {
                return [
                  {
                    value: parseInt(row.TOTAL_ENTREGADOS),
                    name: 'Entregados',
                    itemStyle: {
                      color: utils.getColor('primary')
                    }
                  },
                  {
                    value: parseInt(row.TOTAL_PENDIENTES),
                    name: 'Pendiente entrega',
                    itemStyle: {
                      color: utils.getColor('danger')
                    }
                  }]
              });
            })
            .catch( error => {
                console.error(error);
            }); 

           
            console.log(response);
          
            let $pieChartEl = document.querySelector('.echart-pie-chart-example');

            if ($pieChartEl) {
              // Get options from data attribute
              let userOptions = utils.getData($pieChartEl, 'options');
              let chart = window.echarts.init($pieChartEl);
          
              let getDefaultOptions = function getDefaultOptions() {
                return {
                  legend: {
                    left: 'left',
                    textStyle: {
                      color: utils.getGrays()['600']
                    }
                  },
                  series: [{
                    type: 'pie',
                    radius: window.innerWidth < 530 ? '45%' : '60%',
                    label: {
                      color: utils.getGrays()['700']
                    },
                    center: ['50%', '55%'],
                    data: response[0],
                    emphasis: {
                      itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: utils.rgbaColor(utils.getGrays()['600'], 0.5)
                      }
                    }
                  }],
                  tooltip: {
                    trigger: 'item',
                    padding: [7, 10],
                    backgroundColor: utils.getGrays()['100'],
                    borderColor: utils.getGrays()['300'],
                    textStyle: {
                      color: utils.getColors().dark
                    },
                    borderWidth: 1,
                    transitionDuration: 0,
                    axisPointer: {
                      type: 'none'
                    }
                  }
                };
              };
          
              echartSetOption(chart, userOptions, getDefaultOptions); //- set chart radius on window resize
          
              utils.resize(function () {
                if (window.innerWidth < 530) {
                  chart.setOption({
                    series: [{
                      radius: '45%'
                    }]
                  });
                } else {
                  chart.setOption({
                    series: [{
                      radius: '60%'
                    }]
                  });
                }
              });
            }
       


        },
        async grafica5_pastelPorcentajePremiosByPremio(){
          const response = await fetch(`./api/premios/porcentajePremiosEntregadosByPremio/${this.grafica5.premioID}/${this.grafica5.totalPremios}`, {
            })
            .then(response => {
                return response.json();
            })
            .then(response => {
              return response.map( row => {
                return [
                  {
                    value: parseInt(row.TOTAL_ENTREGADOS),
                    name: 'Entregados',
                    itemStyle: {
                      color: utils.getColor('primary')
                    }
                  },
                  {
                    value: parseInt(row.TOTAL_PENDIENTES),
                    name: 'Pendiente entrega',
                    itemStyle: {
                      color: utils.getColor('danger')
                    }
                  }]
              });
            })
            .catch( error => {
                console.error(error);
            }); 

           
            console.log(response);
          
            let $pieChartEl = document.querySelector('.echart-pie-chart-premios');

            if ($pieChartEl) {
              // Get options from data attribute
              let userOptions = utils.getData($pieChartEl, 'options');
              let chart = window.echarts.init($pieChartEl);
          
              let getDefaultOptions = function getDefaultOptions() {
                return {
                  legend: {
                    left: 'left',
                    textStyle: {
                      color: utils.getGrays()['600']
                    }
                  },
                  series: [{
                    type: 'pie',
                    radius: window.innerWidth < 530 ? '45%' : '60%',
                    label: {
                      color: utils.getGrays()['700']
                    },
                    center: ['50%', '55%'],
                    data: response[0],
                    emphasis: {
                      itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: utils.rgbaColor(utils.getGrays()['600'], 0.5)
                      }
                    }
                  }],
                  tooltip: {
                    trigger: 'item',
                    formatter: '{b} : {c} ({d}%)',
                    padding: [7, 10],
                    backgroundColor: utils.getGrays()['100'],
                    borderColor: utils.getGrays()['300'],
                    textStyle: {
                      color: utils.getColors().dark
                    },
                    borderWidth: 1,
                    transitionDuration: 0,
                    axisPointer: {
                      type: 'none'
                    }
                  }
                };
              };
          
              echartSetOption(chart, userOptions, getDefaultOptions); //- set chart radius on window resize
          
              utils.resize(function () {
                if (window.innerWidth < 530) {
                  chart.setOption({
                    series: [{
                      radius: '45%'
                    }]
                  });
                } else {
                  chart.setOption({
                    series: [{
                      radius: '60%'
                    }]
                  });
                }
              });
            }
       


        },
        setTotalPremioByID(id){
          switch (parseInt(id)) {
            case 1:
              this.grafica5.totalPremios = 10;
              this.grafica5_pastelPorcentajePremiosByPremio();
              break;
            case 2:
              this.grafica5.totalPremios = 50;
              this.grafica5_pastelPorcentajePremiosByPremio();
            break;
            case 3:
              this.grafica5.totalPremios = 100;
              this.grafica5_pastelPorcentajePremiosByPremio();
            break;
            case 4:
              this.grafica5.totalPremios = 100;
              this.grafica5_pastelPorcentajePremiosByPremio();
            break;
            case 5:
              this.grafica5.totalPremios = 500;
              this.grafica5_pastelPorcentajePremiosByPremio();
            break;
            case 6:
              this.grafica5.totalPremios = 1500;
              this.grafica5_pastelPorcentajePremiosByPremio();
            break;
            case 7:
              this.grafica5.totalPremios = 156671;
              this.grafica5_pastelPorcentajePremiosByPremio();
            break;
            case 8:
              this.grafica5.totalPremios = 298500;
              this.grafica5_pastelPorcentajePremiosByPremio();
            break;
          
            default:
              this.grafica5.totalPremios = 0;
              break;
          }
        }
        
    },
    mounted(){
        this.getReconteo();
        this.grafica1_getPromedioPremiosByPremio();
        this.grafica2_getPremiosByDia();
        this.grafica3_premiosEntregadosByFecha();
        this.grafica4_pastelPorcentajePremios();
        this.grafica5_pastelPorcentajePremiosByPremio();
        
    }
 
})
