const app = new Vue({
    el: '#app',
    data: {
        title: 'Dashboard',
    },
    methods:{
        async getPremios() {
           
            const response = await fetch(`./api/ganadores/totalPremiosByPremio`, {
                })
                .then(response => {
                    return response.json();
                })
                .then(response => {
                  return response.map( product => {
                    console.log(product);
                    return [product.NOMBRE_PREMIO, parseInt(product.TOTAL)]
                  });
                }).catch( error => {
                    console.error(error);
                }); 

            console.log(response);
           
          
            let data_example = [
                ['TV', 110], 
                ['Betplay', 83], 
            ];
            
            console.log(data_example);

            let dom = document.getElementById("echar-canjeProductos");
            let myChart = echarts.init(dom);
            
            let option = {
                color: [utils.getColors().primary, utils.getGrays()['800']],
                dataset: {
                  source: response
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

        async getPremiosByPremio(){
          let barChartElement = document.getElementById('chartjs-bar-chart');

          var getOptions = function getOptions() {
            return {
              type: 'bar',
              data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                  label: '# of Votes',
                  data: [12, 19, 3, 5, 6, 3],
                  backgroundColor: [utils.rgbaColor(utils.getColor('secondary'), 0.2), utils.rgbaColor(utils.getColor('warning'), 0.2), utils.rgbaColor(utils.getColor('info'), 0.2), utils.rgbaColor(utils.getColor('success'), 0.2), utils.rgbaColor(utils.getColor('info'), 0.2), utils.rgbaColor(utils.getColor('primary'), 0.2)],
                  borderColor: [utils.getColor('secondary'), utils.getColor('warning'), utils.getColor('info'), utils.getColor('success'), utils.getColor('info'), utils.getColor('primary')],
                  borderWidth: 1
                }]
              },
              options: {
                plugins: {
                  tooltip: chartJsDefaultTooltip()
                },
                scales: {
                  x: {
                    grid: {
                      color: utils.rgbaColor(utils.getGrays().black, 0.1)
                    }
                  },
                  y: {
                    grid: {
                      color: utils.rgbaColor(utils.getGrays().black, 0.1),
                      drawBorder: true
                    }
                  }
                }
              }
            };
          };
        }
        
    },
    mounted(){
        this.getPremios();
    }
 
})
