const app = new Vue({
    el: '#app',
    data: {
        title: 'Dashboard',
    },
    methods:{
        async getPremios() {
           
            const response = await fetch(`./api/ganadores`, {
                })
                .then(response => {
                    return response.json();
                }).catch( error => {
                    console.error(error);
                }); 

            console.log(response);
          
            let data = [
                ['product', '2020'], 
                ['Boots4', 43], 
                ['Reign Pro', 83], 
                ['Slick', 86], 
                ['Falcon', 72], 
                ['Sparrow', 80],
                ['Hideway', 50], 
                ['Freya', 80]];
            let dom = document.getElementById("echar-canjeProductos");
            let myChart = echarts.init(dom);
            
            let option = {
                color: [utils.getColors().primary, utils.getGrays()['800']],
                dataset: {
                  source: data
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
                    return "<div class=\"font-weight-semi-bold\">".concat(params.seriesName, "</div><div class=\"fs--1 text-600\"><strong>").concat(params.name, ":</strong> ").concat(params.value[params.componentIndex + 1], "</div>");
                  }
                },
                legend: {
                  data: ['2020', '2018'],
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
        
    },
    mounted(){
        //this.getPremios();
    }
 
})
