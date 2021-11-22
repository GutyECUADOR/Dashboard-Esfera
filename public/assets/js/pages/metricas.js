const app = new Vue({
    el: '#app',
    data: {
        title: 'Dashboard',
        totalPremiosEntregados: 0,
        grafica1: {
          fechaINI : moment().format("YYYY-MM-01"),
          fechaFIN : moment().format("YYYY-MM-30"),
          valores : []
        },
        grafica2: {
          fechaINI : moment().format("YYYY-MM-01"),
          fechaFIN : moment().format("YYYY-MM-30"),
          categorias : [],
          serie: []
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
          
        },
        async getPremiosByPremio() {
           
            const response = await fetch(`./api/ganadores/totalPremiosByPremio/${this.grafica1.fechaINI}/${this.grafica1.fechaFIN}`, {
                })
                .then(response => {
                    return response.json();
                })
                .then(response => {
                  console.log(response);
                  return response.map( product => {
                    return [product.NOMBRE_PREMIO, parseInt(product.TOTAL)]
                  });
                }).catch( error => {
                    console.error(error);
                }); 

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
        async getPremiosByDia(){

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
          var $barTimelineChartEl = document.querySelector('.echart-bar-timeline-chart-example');

          if ($barTimelineChartEl) {
            // Get options from data attribute
            var userOptions = utils.getData($barTimelineChartEl, 'options');
            var chart = window.echarts.init($barTimelineChartEl);
            var months = ['1','2','3','4','5'];
            var dataMap = {};

            var dataFormatter = function dataFormatter(obj) {
              return Object.keys(obj).reduce(function (acc, val) {
                return _objectSpread(_objectSpread({}, acc), {}, _defineProperty({}, val, obj[val].map(function (value, index) {
                  return {
                    name: months[index],
                    value: value
                  };
                })));
              }, {});
            };

            dataMap.motos = dataFormatter({
              2005: [88.68, 112.38, 1400, 262.42, 589.56, 882.41, 625.61, 684.6, 90.26, 1461.51, 892.83, 966.5],
              2006: [88.8, 103.35, 1461.81, 276.77, 634.94, 939.43, 672.76, 750.14, 93.81, 1545.05, 925.1, 1011.03],
              2007: [101.26, 110.19, 1804.72, 311.97, 762.1, 1133.42, 783.8, 915.38, 101.84, 1816.31, 986.02, 1200.18],
              2008: [112.83, 122.58, 2034.59, 313.58, 907.95, 1302.02, 916.72, 1088.94, 111.8, 2100.11, 1095.96, 1418.09]
            
            });
            dataMap.tvs = dataFormatter({
              2005: [2026.51, 2135.07, 5271.57, 2357.04, 1773.21, 3869.4, 1580.83, 2971.68, 4381.2, 10524.96, 7164.75, 2245.9],
              2006: [2191.43, 2457.08, 6110.43, 2755.66, 2374.96, 4566.83, 1915.29, 3365.31, 4969.95, 12282.89, 8511.51, 2711.18],
              2007: [2509.4, 2892.53, 7201.88, 3454.49, 3193.67, 5544.14, 2475.45, 3695.58, 5571.06, 14471.26, 10154.25, 3370.96],
              2008: [2626.41, 3709.78, 8701.34, 4242.36, 4376.19, 7158.84, 3097.12, 4319.75, 6085.84, 16993.34, 11567.42, 4198.93]
              
            });
            dataMap.celulares = dataFormatter({
              2005: [4854.33, 1658.19, 3340.54, 1611.07, 1542.26, 3295.45, 1413.83, 1857.42, 4776.2, 6612.22, 5360.1, 2137.77],
              2006: [5837.55, 1902.31, 3895.36, 1846.18, 1934.35, 3798.26, 1687.07, 2096.35, 5508.48, 7914.11, 6281.86, 2390.29],
              2007: [7236.15, 2250.04, 4600.72, 2257.99, 2467.41, 4486.74, 2025.44, 2493.04, 6821.11, 9730.91, 7613.46, 2789.78],
              2008: [8375.76, 2886.65, 5276.04, 2759.46, 3212.06, 5207.72, 2412.26, 2905.68, 7872.23, 11888.53, 8799.31, 3234.64]
             
            });

            dataMap.bicicletas = dataFormatter({
              2005: [4854.33, 1658.19, 3340.54, 1611.07, 1542.26, 3295.45, 1413.83, 1857.42, 4776.2, 6612.22, 5360.1, 2137.77],
              2006: [5837.55, 1902.31, 3895.36, 1846.18, 1934.35, 3798.26, 1687.07, 2096.35, 5508.48, 7914.11, 6281.86, 2390.29],
              2007: [7236.15, 2250.04, 4600.72, 2257.99, 2467.41, 4486.74, 2025.44, 2493.04, 6821.11, 9730.91, 7613.46, 2789.78],
              2008: [8375.76, 2886.65, 5276.04, 2759.46, 3212.06, 5207.72, 2412.26, 2905.68, 7872.23, 11888.53, 8799.31, 3234.64]
             
            });

            dataMap.bonos = dataFormatter({
              2005: [88.68, 112.38, 1400, 262.42, 589.56, 882.41, 625.61, 684.6, 90.26, 1461.51, 892.83, 966.5],
              2006: [88.8, 103.35, 1461.81, 276.77, 634.94, 939.43, 672.76, 750.14, 93.81, 1545.05, 925.1, 1011.03],
              2007: [101.26, 110.19, 1804.72, 311.97, 762.1, 1133.42, 783.8, 915.38, 101.84, 1816.31, 986.02, 1200.18],
              2008: [112.83, 122.58, 2034.59, 313.58, 907.95, 1302.02, 916.72, 1088.94, 111.8, 2100.11, 1095.96, 1418.09]
            
            });
            dataMap.amazon = dataFormatter({
              2005: [2026.51, 2135.07, 5271.57, 2357.04, 1773.21, 3869.4, 1580.83, 2971.68, 4381.2, 10524.96, 7164.75, 2245.9],
              2006: [2191.43, 2457.08, 6110.43, 2755.66, 2374.96, 4566.83, 1915.29, 3365.31, 4969.95, 12282.89, 8511.51, 2711.18],
              2007: [2509.4, 2892.53, 7201.88, 3454.49, 3193.67, 5544.14, 2475.45, 3695.58, 5571.06, 14471.26, 10154.25, 3370.96],
              2008: [2626.41, 3709.78, 8701.34, 4242.36, 4376.19, 7158.84, 3097.12, 4319.75, 6085.84, 16993.34, 11567.42, 4198.93]
              
            });
            dataMap.recargas = dataFormatter({
              2005: [4854.33, 1658.19, 3340.54, 1611.07, 1542.26, 3295.45, 1413.83, 1857.42, 4776.2, 6612.22, 5360.1, 2137.77],
              2006: [5837.55, 1902.31, 3895.36, 1846.18, 1934.35, 3798.26, 1687.07, 2096.35, 5508.48, 7914.11, 6281.86, 2390.29],
              2007: [7236.15, 2250.04, 4600.72, 2257.99, 2467.41, 4486.74, 2025.44, 2493.04, 6821.11, 9730.91, 7613.46, 2789.78],
              2008: [8375.76, 2886.65, 5276.04, 2759.46, 3212.06, 5207.72, 2412.26, 2905.68, 7872.23, 11888.53, 8799.31, 3234.64]
             
            });

            dataMap.betplay = dataFormatter({
              2005: [4854.33, 1658.19, 3340.54, 1611.07, 1542.26, 3295.45, 1413.83, 1857.42, 4776.2, 6612.22, 5360.1, 2137.77],
              2006: [5837.55, 1902.31, 3895.36, 1846.18, 1934.35, 3798.26, 1687.07, 2096.35, 5508.48, 7914.11, 6281.86, 2390.29],
              2007: [7236.15, 2250.04, 4600.72, 2257.99, 2467.41, 4486.74, 2025.44, 2493.04, 6821.11, 9730.91, 7613.46, 2789.78],
              2008: [8375.76, 2886.65, 5276.04, 2759.46, 3212.06, 5207.72, 2412.26, 2905.68, 7872.23, 11888.53, 8799.31, 3234.64]
             
            });


            var getDefaultOptions = function getDefaultOptions() {
              return {
                baseOption: {
                  timeline: {
                    axisType: 'category',
                    autoPlay: false,
                    playInterval: 1000,
                    data: ['Noviembre','Diciembre','Enero','Febrero'],
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
                    data: months,
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
                        return "".concat(value / 1000, "k");
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
                    text: 'Noviembre'
                  },
                  series: [{
                    data: dataMap.motos['2005']
                  }, {
                    data: dataMap.tvs['2005']
                  }, {
                    data: dataMap.celulares['2005']
                  }, {
                    data: dataMap.bicicletas['2005']
                  }, {
                    data: dataMap.bonos['2005']
                  }, {
                    data: dataMap.amazon['2005']
                  }, {
                    data: dataMap.recargas['2005']
                  }, {
                    data: dataMap.betplay['2005']
                  }]
                }, {
                  title: {
                    text: 'Diciembre'
                  },
                  series: [{
                    data: dataMap.motos['2006']
                  }, {
                    data: dataMap.tvs['2006']
                  }, {
                    data: dataMap.celulares['2006']
                  }, {
                    data: dataMap.bicicletas['2006']
                  }, {
                    data: dataMap.bonos['2006']
                  }, {
                    data: dataMap.amazon['2006']
                  }, {
                    data: dataMap.recargas['2006']
                  }, {
                    data: dataMap.betplay['2006']
                  }]
                }, {
                  title: {
                    text: 'Enero'
                  },
                  series: [{
                    data: dataMap.motos['2005']
                  }, {
                    data: dataMap.tvs['2005']
                  }, {
                    data: dataMap.celulares['2005']
                  }, {
                    data: dataMap.bicicletas['2005']
                  }, {
                    data: dataMap.bonos['2005']
                  }, {
                    data: dataMap.amazon['2005']
                  }, {
                    data: dataMap.recargas['2005']
                  }, {
                    data: dataMap.betplay['2005']
                  }]
                }, {
                  title: {
                    text: 'Febrero'
                  },
                  series: [{
                    data: dataMap.motos['2005']
                  }, {
                    data: dataMap.tvs['2005']
                  }, {
                    data: dataMap.celulares['2005']
                  }, {
                    data: dataMap.bicicletas['2005']
                  }, {
                    data: dataMap.bonos['2005']
                  }, {
                    data: dataMap.amazon['2005']
                  }, {
                    data: dataMap.recargas['2005']
                  }, {
                    data: dataMap.betplay['2005']
                  }]
                }]
              };
            };

            echartSetOption(chart, userOptions, getDefaultOptions);
          }
        }
        
    },
    mounted(){
        this.getPremiosByPremio();
        this.getPremiosByDia();
        this.getReconteo();
        this.grafica3_premiosEntregadosByFecha();
    }
 
})
