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
        
    },
    mounted(){
        this.getPremiosByPremio();
        this.getPremiosByDia();
        this.getReconteo();
    }
 
})
