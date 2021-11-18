const app = new Vue({
    el: '#app',
    data: {
        title: 'Dashboard',
        grafica1: {
          valores : []
        },
        grafica2: {
          categorias : [],
          valores: []
        }
    },
    methods:{
        async getPremiosByPremio() {
           
            const response = await fetch(`./api/ganadores/totalPremiosByPremio`, {
                })
                .then(response => {
                    return response.json();
                })
                .then(response => {
                  return response.map( product => {
                    return [product.NOMBRE_PREMIO, parseInt(product.TOTAL)]
                  });
                }).catch( error => {
                    console.error(error);
                }); 

            this.grafica1.valores = response;

            let data_example = [
                ['TV', 110], 
                ['Betplay', 83], 
            ];
            

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

          const response = await fetch(`./api/premios/totalPremiosByDia`, {
          })
          .then(response => {
              return response.json();
          })
          .catch( error => {
              console.error(error);
          }); 

          let serie = response.map( dia => {
            return parseInt(dia.TOTAL);
          })

          let categorias = response.map( dia => {
            return dia.FECHA_CANJE;
          })


          let ECHART_LINE_TOTAL_SALES = '.echart-line-total-sales';
          let SELECT_MONTH = '.select-month';
          let $echartsLineTotalSales = document.querySelector(ECHART_LINE_TOTAL_SALES);
          let months = ['Jan'];

          if ($echartsLineTotalSales) {
            // Get options from data attribute
            let userOptions = utils.getData($echartsLineTotalSales, 'options');
            let chart = window.echarts.init($echartsLineTotalSales);
            let monthsnumber = serie;//[100, 80];

            let getDefaultOptions = function getDefaultOptions() {
              return {
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
                  data: categorias,
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
                      let date = moment(value).format('dddd-DD');
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
                  data: monthsnumber,
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
            };

            echartSetOption(chart, userOptions, getDefaultOptions); // Change chart options accordiong to the selected month

            let monthSelect = document.querySelector(SELECT_MONTH);

            if (monthSelect) {
              monthSelect.addEventListener('change', function (e) {
                let month = e.currentTarget.value;
                let data = monthsnumber;
                chart.setOption({
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
                    axisLabel: {
                      formatter: function formatter(value) {
                        moment.lang("es")
                        let date = moment(value).format('dddd-DD');
                        return date;
                      },
                      margin: 15
                    }
                  },
                  series: [{
                    data: data
                  }]
                });
              });
            }
          }


        },
        
    },
    mounted(){
        this.getPremiosByPremio();
        this.getPremiosByDia();
    }
 
})
