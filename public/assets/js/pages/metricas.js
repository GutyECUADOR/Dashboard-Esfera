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
            var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
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

            dataMap.dataTI = dataFormatter({
              2005: [88.68, 112.38, 1400, 262.42, 589.56, 882.41, 625.61, 684.6, 90.26, 1461.51, 892.83, 966.5],
              2006: [88.8, 103.35, 1461.81, 276.77, 634.94, 939.43, 672.76, 750.14, 93.81, 1545.05, 925.1, 1011.03],
              2007: [101.26, 110.19, 1804.72, 311.97, 762.1, 1133.42, 783.8, 915.38, 101.84, 1816.31, 986.02, 1200.18],
              2008: [112.83, 122.58, 2034.59, 313.58, 907.95, 1302.02, 916.72, 1088.94, 111.8, 2100.11, 1095.96, 1418.09],
              2009: [118.29, 128.85, 2207.34, 477.59, 929.6, 1414.9, 980.57, 1154.33, 113.82, 2261.86, 1163.08, 1495.45],
              2010: [124.36, 145.58, 2562.81, 554.48, 1095.28, 1631.08, 1050.15, 1302.9, 114.15, 2540.1, 1360.56, 1729.02],
              2011: [136.27, 159.72, 2905.73, 641.42, 1306.3, 1915.57, 1277.44, 1701.5, 124.94, 3064.78, 1583.04, 2015.31]
            });
            dataMap.dataSI = dataFormatter({
              2005: [2026.51, 2135.07, 5271.57, 2357.04, 1773.21, 3869.4, 1580.83, 2971.68, 4381.2, 10524.96, 7164.75, 2245.9],
              2006: [2191.43, 2457.08, 6110.43, 2755.66, 2374.96, 4566.83, 1915.29, 3365.31, 4969.95, 12282.89, 8511.51, 2711.18],
              2007: [2509.4, 2892.53, 7201.88, 3454.49, 3193.67, 5544.14, 2475.45, 3695.58, 5571.06, 14471.26, 10154.25, 3370.96],
              2008: [2626.41, 3709.78, 8701.34, 4242.36, 4376.19, 7158.84, 3097.12, 4319.75, 6085.84, 16993.34, 11567.42, 4198.93],
              2009: [2855.55, 3987.84, 8959.83, 3993.8, 5114, 7906.34, 3541.92, 4060.72, 6001.78, 18566.37, 11908.49, 4905.22],
              2010: [3388.38, 4840.23, 10707.68, 5234, 6367.69, 9976.82, 4506.31, 5025.15, 7218.32, 21753.93, 14297.93, 6436.62],
              2011: [3752.48, 5928.32, 13126.86, 6635.26, 8037.69, 12152.15, 5611.48, 5962.41, 7927.89, 25203.28, 16555.58, 8309.38]
            });
            dataMap.dataPI = dataFormatter({
              2005: [4854.33, 1658.19, 3340.54, 1611.07, 1542.26, 3295.45, 1413.83, 1857.42, 4776.2, 6612.22, 5360.1, 2137.77],
              2006: [5837.55, 1902.31, 3895.36, 1846.18, 1934.35, 3798.26, 1687.07, 2096.35, 5508.48, 7914.11, 6281.86, 2390.29],
              2007: [7236.15, 2250.04, 4600.72, 2257.99, 2467.41, 4486.74, 2025.44, 2493.04, 6821.11, 9730.91, 7613.46, 2789.78],
              2008: [8375.76, 2886.65, 5276.04, 2759.46, 3212.06, 5207.72, 2412.26, 2905.68, 7872.23, 11888.53, 8799.31, 3234.64],
              2009: [9179.19, 3405.16, 6068.31, 2886.92, 3696.65, 5891.25, 2756.26, 3371.95, 8930.85, 13629.07, 9918.78, 3662.15],
              2010: [10600.84, 4238.65, 7123.77, 3412.38, 4209.03, 6849.37, 3111.12, 4040.55, 9833.51, 17131.45, 12063.82, 4193.69],
              2011: [12363.18, 5219.24, 8483.17, 3960.87, 5015.89, 8158.98, 3679.91, 4918.09, 11142.86, 20842.21, 14180.23, 4975.96]
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
                    data: ['Motos', 'TV', 'Celulares','Biciletas','B.Exito','Amazon','Recarga','Betplay'],
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
                      color: utils.getColor('info'),
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
                    text: '2005'
                  },
                  series: [{
                    data: dataMap.dataPI['2005']
                  }, {
                    data: dataMap.dataSI['2005']
                  }, {
                    data: dataMap.dataTI['2005']
                  }]
                }, {
                  title: {
                    text: '2006'
                  },
                  series: [{
                    data: dataMap.dataPI['2006']
                  }, {
                    data: dataMap.dataSI['2006']
                  }, {
                    data: dataMap.dataTI['2006']
                  }]
                }, {
                  title: {
                    text: '2007'
                  },
                  series: [{
                    data: dataMap.dataPI['2007']
                  }, {
                    data: dataMap.dataSI['2007']
                  }, {
                    data: dataMap.dataTI['2007']
                  }]
                }, {
                  title: {
                    text: '2008'
                  },
                  series: [{
                    data: dataMap.dataPI['2008']
                  }, {
                    data: dataMap.dataSI['2008']
                  }, {
                    data: dataMap.dataTI['2008']
                  }]
                }, {
                  title: {
                    text: '2009'
                  },
                  series: [{
                    data: dataMap.dataPI['2009']
                  }, {
                    data: dataMap.dataSI['2009']
                  }, {
                    data: dataMap.dataTI['2009']
                  }]
                }, {
                  title: {
                    text: '2010'
                  },
                  series: [{
                    data: dataMap.dataPI['2010']
                  }, {
                    data: dataMap.dataSI['2010']
                  }, {
                    data: dataMap.dataTI['2010']
                  }]
                }, {
                  title: {
                    text: '2011'
                  },
                  series: [{
                    data: dataMap.dataPI['2011']
                  }, {
                    data: dataMap.dataSI['2011']
                  }, {
                    data: dataMap.dataTI['2011']
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
