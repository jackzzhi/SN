<template>
  <div class="men_echart">
    <div class="title">
      <img class="line"></img>
      <span class="title_name">性别/婚姻分布</span>
    </div>
    <div class="men_top">
      <!--<div class="men_women_echart" ref="chartTop"></div>-->
      <!--<div class="peple">-->
        <!--<div class="qita"> <img  src="../../assets/images/qita.png"/><span>其它</span></div>-->
        <!--<div class="nv"> <img  src="../../assets/images/nv.png"/><span>女</span></div>-->
        <!--<div class="nan"><img  src="../../assets/images/nan.png"/><span>男</span></div>-->


      <!--</div>-->
      <ul>
        <li><div class="peple"> <img  src="../../assets/images/qita.png"/><span>其它</span></div></li>
        <li><div class="peple"> <img  src="../../assets/images/nv.png"/><span>女</span></div></li>
        <li><div class="peple"><img  src="../../assets/images/nan.png"/><span>男</span></div></li>
      </ul>
      <div class="men_miaoshu" ref="chartTopcontent" :style="'width:'+ menNumWidth +'px;'">
        <span class="top">{{menNumData*100|numFilter}}%</span>
        <span class="bottom">{{this.optionTop.series[0].data[0].value}}人</span>
      </div>
      <div class="women_miaoshu" ref="chartTopcontent" :style="'width:'+ womenNumWidth +'px;'">
        <span class="top">{{womenNumData*100|numFilter}}%</span>
        <span class="bottom">{{this.optionTop.series[1].data[0].value}}人</span>
      </div>
    </div>
    <div class="men_middle clearfix">
      <ul>
        <li v-for="item in  optionList">
          <graDuation :optionMiddle="item"></graDuation>
        </li>
      </ul>
    </div>
    <img class="line" src="../../assets/images/hudu.png"/>
    <div class="content"><span class="content_child">普惠目前人群以男性已婚为主，其中男性占比高达60%，已婚人群73%；</span></div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import graDuation from '../../components/echarts/graDuation'
  export default {
    data(){
      return{
        optionTop :{
        tooltip: {
          trigger: 'item',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          },
          backgroundColor: 'rgba(255,255,255,0.7)',
          borderColor: '#cee5ff',
          borderWidth: 1,
          padding: [5, 10],
          textStyle: {
            color: '#444'
          },
          formatter: function(params) {
            return   '<div style="height: 40px;line-height: 40px;">' + params.data.name + ': <span style="color: ' + params.color + ';">' + params.value + '人</span></div>';
          }
        },
        grid:{
          x:55,
          y:15,
          x2:55,
          y2:20,
        },
        color: ['#3a8eff','#e34c4c'],
        xAxis: [{
          type: 'value',
          show: false
        }],
        yAxis: [{
          type: 'category',
          show: false,
          data: ['性别比例']
        }],
        series: [
          {
            type: 'bar',
            stack: '性别比例',
            barWidth: 3,
            label: {
              normal: {
                show: true,
                position: 'left',
              }
            },
            data: [{
              name: '男',
              value: '8616',
              label: {
                position: 'left',
                normal: {
                  textStyle:{
                    fontSize:11
                  },
                  formatter: [
                    '{Male|}     ' + '\n\n' + ' 男'
                  ].join('\n'),
                  rich: {
                    Male: {
                      height: 30,
                      align: 'center',
                      backgroundColor: {
                        image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAoCAYAAAD+MdrbAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ODkzRDIwQTE0MTIxMTFFODkyOTU4RUU5NzM3MjE3MDMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODkzRDIwQTA0MTIxMTFFODkyOTU4RUU5NzM3MjE3MDMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NTQ4MERFMjNCRDNDMTFFNzgyQTFFRkM1MDA3MjdBRTYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NTQ4MERFMjRCRDNDMTFFNzgyQTFFRkM1MDA3MjdBRTYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4iuAMWAAABl0lEQVR42uzWTSgEYRzH8ZmJcPDOkRMXG1cl5SInJ1e5aEtuLhwoNy5K0mpzWCXJyQEH5eDEwUVecuKCKEJ5qU2L8R2e1fT0zLM7O3NR869P284zz69nnmeemTFt2zac6kz+/kpVjG6MoB0ZbGMWJ/jKnrg3bP78WoZ3OW2DWEcPKlGHAWyiC6aqk1fFMI4yRVsDJlDrJ7AXjZp2Z4RtfgLrDX0VocJP4H2OwE+8+Ancwa2mfR9nfgIPMYMnxchuMI071TzoKoFHxMXKOjfrERaw6zWxuvrACjZQLW5kZ27fdSslT0ETyqXjGdeuqHH1e8WFe8e4A0vQL7ZZs2oXSOVc/jnmsJodtTuwDynDX7WKPmmsyas8ahReY6rbpiVAYEwVaBkhlCVNcqFlhzoqI+zLjAL/ygyQY4Z9H1qqkKsAgdeqwESAwHnV4yslnnVD4oWeTz1gEUuqwGdMYQtV4tgkOjzCklgWnyRprye203Dg+h/XjO5YOjevldW9c0qjrRcF/tdA029brsBT8aEke8OlqsO3AAMAxyBOvxLL2/sAAAAASUVORK5CYII='
                      }
                    }
                  }
                }
              }
            }]
          },
          {
            type: 'bar',
            stack: '性别比例',
            barWidth: 10,
            label: {
              normal: {
                show: true,
                position: 'right'
              }
            },
            data: [{
              name: '女',
              value: '12489',
              label: {
                normal: {
                  textStyle:{
                    fontSize:11
                  },
                  formatter: [
                    '     {Female|}     ' + '\n\n' + '      女'
                  ].join('\n'),
                  rich: {
                    Female: {
                      height: 30,
                      align: 'center',
                      backgroundColor: {
                        image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAdCAYAAACaCl3kAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTgxQUVBQkE0MTIwMTFFODlBRjc4REM5QkNCNEQ3NkEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTgxQUVBQjk0MTIwMTFFODlBRjc4REM5QkNCNEQ3NkEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NTQ4MERFMjNCRDNDMTFFNzgyQTFFRkM1MDA3MjdBRTYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NTQ4MERFMjRCRDNDMTFFNzgyQTFFRkM1MDA3MjdBRTYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5Op4glAAABOUlEQVR42mL8//8/Awj8zY1lgAJ2IG4C4lQg/gbEy4C4Foh/giSZJy8GK2JhwAQzgDgByhYE4lIgFgXiRGRFTGiaQArjsBgWC5XDqVEcixjYhVA5nBrvA/F7LBrfQeVwagQFQDEorJDEQOwSWODAALbAmQ/EN5ACaAEQH0dXxPgnJ4aBHIAtILYB8X80vJWQRiEgdsFimCtUDqfGACBmxaKRFSqHU2M4Hm+F49IoAsROeDQ6QdVgaAzEET3IUReITWMYEbEQhq5RDIgdidDoCFUL1xgETciEADNULVxjGAmJJgymUQKI7UjQaA/SA9JoRaQzkcPFCkScQs8yBABI7SmQxidQDz8gQtMDqNonTEg5QhGUzYC4A4uGDqicIlQtAwusuEMrIrHHBZJaJgYywRDX+IkYMYAAAwB6sjfXWpdRXAAAAABJRU5ErkJggg=='
                      }
                    }
                  }
                }
              }
            }]
          },
        ]
      },
        optionList:[
          {series: [{
            name: '未婚',
            type: 'gauge',
            radius: '155%',
            center: ['50%', '90%'],
            min: 0,
            max: 100,
            splitNumber: 2, //刻度数量
            startAngle: 180,
            endAngle: 0,
            axisLine: {
              show: false,
              lineStyle: {
                width: 1,
                color: [
                  [1, 'rgba(0,0,0,0)']
                ]
              }
            }, //仪表盘轴线
            axisLabel: {
              show: true,
              color: '#A6A6A6',
              distance: 6,
              fontSize: 8,
              formatter: '{value}'
            }, //刻度标签。
            axisTick: {
              show: true,
              lineStyle: {
                color: {
                  type: 'radial',
                  colorStops: [{
                    offset: 0,
                    color: '#5b96fe'
                  },

                    {
                      offset: 0.2,
                      color: '#5b96fe'
                    },

                    {
                      offset: 0.4,
                      color: '#5b96fe'
                    },

                    {
                      offset: 0.6,
                      color: '#c87aac'
                    },

                    {
                      offset: 0.8,
                      color: '#e27399'
                    },

                    {
                      offset: 1,
                      color: '#eb82a1'
                    }
                  ],
                  globalCoord: false // 缺省为 false
                },
                width: 1,
                length: 20,
              },
              length: -5
            }, //刻度样式
            splitLine: {
              show: true,
              length: -5,
            }, //分隔线样式
            detail: {
              show: false
            },
            pointer: {
              show: false
            }
          },{
              name: '未婚',
              type: 'gauge',
              radius: '170%',
              min: 0,
              max: 100,
              center: ['50%', '90%'],
              splitNumber: 0, //刻度数量
              startAngle: 180,
              endAngle: 0,
              axisLine: {
                show: true,
                lineStyle: {
                  width: 3,
                  color: [
                    [1,
                      new echarts.graphic.LinearGradient(0, 0, 1, 0, [

                        {
                          offset: 0,
                          color: '#5b96fe'
                        },

                        {
                          offset: 0.2,
                          color: '#6892f5'
                        },

                        {
                          offset: 0.4,
                          color: '#898adc'
                        },

                        {
                          offset: 0.6,
                          color: '#c87aac'
                        },

                        {
                          offset: 0.8,
                          color: '#e27399'
                        },

                        {
                          offset: 1,
                          color: '#eb82a1'
                        }
                      ])
                    ]
                  ],
                }
              },
              //分隔线样式。
              splitLine: {
                show: false,
              },
              axisLabel: {
                show: false
              },
              axisTick: {
                show: false
              },
              itemStyle: {
                normal: {
                  color: '#5b96fe'
                }
              },
              pointer: {
                width: 2,//指针的宽度
                length:"80%", //指针长度，按照半圆半径的百分比
              },
              //仪表盘详情，用于显示数据。
              detail: {
                show: false,
                offsetCenter: [0, 0],
                color: '#ddd',
                formatter: function(params) {
                  return params
                },
                textStyle: {
                  fontSize: 10
                }
              },
              data: [{
                // name: "当前用户总数",
                value: 15
              }]
            }]},
          {series: [{
            name: '已婚',
            type: 'gauge',
            radius: '155%',
            center: ['50%', '90%'],
            min: 0,
            max: 100,
            splitNumber: 2, //刻度数量
            startAngle: 180,
            endAngle: 0,
            axisLine: {
              show: false,
              lineStyle: {
                width: 1,
                color: [
                  [1, 'rgba(0,0,0,0)']
                ]
              }
            }, //仪表盘轴线
            axisLabel: {
              show: true,
              color: '#A6A6A6',
              distance: 6,
              fontSize: 8,
              formatter: '{value}'
            }, //刻度标签。
            axisTick: {
              show: true,
              lineStyle: {
                color: {
                  type: 'radial',
                  colorStops: [{
                    offset: 0,
                    color: '#5b96fe'
                  },

                    {
                      offset: 0.2,
                      color: '#5b96fe'
                    },

                    {
                      offset: 0.4,
                      color: '#5b96fe'
                    },

                    {
                      offset: 0.6,
                      color: '#c87aac'
                    },

                    {
                      offset: 0.8,
                      color: '#e27399'
                    },

                    {
                      offset: 1,
                      color: '#eb82a1'
                    }
                  ],
                  globalCoord: false // 缺省为 false
                },
                width: 1,
                length: 20,
              },
              length: -5
            }, //刻度样式
            splitLine: {
              show: true,
              length: -5,
            }, //分隔线样式
            detail: {
              show: false
            },
            pointer: {
              show: false
            }
          },{
              name: '已婚',
              type: 'gauge',
              radius: '170%',
              min: 0,
              max: 100,
              center: ['50%', '90%'],
              splitNumber: 0, //刻度数量
              startAngle: 180,
              endAngle: 0,
              axisLine: {
                show: true,
                lineStyle: {
                  width: 3,
                  color: [
                    [1,
                      new echarts.graphic.LinearGradient(0, 0, 1, 0, [

                        {
                          offset: 0,
                          color: '#5b96fe'
                        },

                        {
                          offset: 0.2,
                          color: '#6892f5'
                        },

                        {
                          offset: 0.4,
                          color: '#898adc'
                        },

                        {
                          offset: 0.6,
                          color: '#c87aac'
                        },

                        {
                          offset: 0.8,
                          color: '#e27399'
                        },

                        {
                          offset: 1,
                          color: '#eb82a1'
                        }
                      ])
                    ]
                  ],
                }
              },
              //分隔线样式。
              splitLine: {
                show: false,
              },
              axisLabel: {
                show: false
              },
              axisTick: {
                show: false
              },
              itemStyle: {
                normal: {
                  color: '#5b96fe'
                }
              },
              pointer: {
                width: 2,//指针的宽度
                length:"80%", //指针长度，按照半圆半径的百分比
              },
              //仪表盘详情，用于显示数据。
              detail: {
                show: false,
                offsetCenter: [0, 0],
                color: '#ddd',
                formatter: function(params) {
                  return params
                },
                textStyle: {
                  fontSize: 10
                }
              },
              data: [{
                // name: "当前用户总数",
                value: 25
              }]
            }]},
          {series: [{
            name: '离异',
            type: 'gauge',
            radius: '155%',
            center: ['50%', '90%'],
            min: 0,
            max: 100,
            splitNumber: 2, //刻度数量
            startAngle: 180,
            endAngle: 0,
            axisLine: {
              show: false,
              lineStyle: {
                width: 1,
                color: [
                  [1, 'rgba(0,0,0,0)']
                ]
              }
            }, //仪表盘轴线
            axisLabel: {
              show: true,
              color: '#A6A6A6',
              distance: 6,
              fontSize: 8,
              formatter: '{value}'
            }, //刻度标签。
            axisTick: {
              show: true,
              lineStyle: {
                color: {
                  type: 'radial',
                  colorStops: [{
                    offset: 0,
                    color: '#5b96fe'
                  },

                    {
                      offset: 0.2,
                      color: '#5b96fe'
                    },

                    {
                      offset: 0.4,
                      color: '#5b96fe'
                    },

                    {
                      offset: 0.6,
                      color: '#c87aac'
                    },

                    {
                      offset: 0.8,
                      color: '#e27399'
                    },

                    {
                      offset: 1,
                      color: '#eb82a1'
                    }
                  ],
                  globalCoord: false // 缺省为 false
                },
                width: 1,
                length: 20,
              },
              length: -5
            }, //刻度样式
            splitLine: {
              show: true,
              length: -5,
            }, //分隔线样式
            detail: {
              show: false
            },
            pointer: {
              show: false
            }
          },{
              name: '离异',
              type: 'gauge',
              radius: '170%',
              min: 0,
              max: 100,
              center: ['50%', '90%'],
              splitNumber: 0, //刻度数量
              startAngle: 180,
              endAngle: 0,
              axisLine: {
                show: true,
                lineStyle: {
                  width: 3,
                  color: [
                    [1,
                      new echarts.graphic.LinearGradient(0, 0, 1, 0, [

                        {
                          offset: 0,
                          color: '#5b96fe'
                        },

                        {
                          offset: 0.2,
                          color: '#6892f5'
                        },

                        {
                          offset: 0.4,
                          color: '#898adc'
                        },

                        {
                          offset: 0.6,
                          color: '#c87aac'
                        },

                        {
                          offset: 0.8,
                          color: '#e27399'
                        },

                        {
                          offset: 1,
                          color: '#eb82a1'
                        }
                      ])
                    ]
                  ],
                }
              },
              //分隔线样式。
              splitLine: {
                show: false,
              },
              axisLabel: {
                show: false
              },
              axisTick: {
                show: false
              },
              itemStyle: {
                normal: {
                  color: '#5b96fe'
                }
              },
              pointer: {
                width: 2,//指针的宽度
                length:"80%", //指针长度，按照半圆半径的百分比
              },
              //仪表盘详情，用于显示数据。
              detail: {
                show: false,
                offsetCenter: [0, 0],
                color: '#ddd',
                formatter: function(params) {
                  return params
                },
                textStyle: {
                  fontSize: 10
                }
              },
              data: [{
                // name: "当前用户总数",
                value: 5
              }]
            }]},
          {series: [{
            name: '丧偶',
            type: 'gauge',
            radius: '155%',
            center: ['50%', '90%'],
            min: 0,
            max: 100,
            splitNumber: 2, //刻度数量
            startAngle: 180,
            endAngle: 0,
            axisLine: {
              show: false,
              lineStyle: {
                width: 1,
                color: [
                  [1, 'rgba(0,0,0,0)']
                ]
              }
            }, //仪表盘轴线
            axisLabel: {
              show: true,
              color: '#A6A6A6',
              distance: 6,
              fontSize: 8,
              formatter: '{value}'
            }, //刻度标签。
            axisTick: {
              show: true,
              lineStyle: {
                color: {
                  type: 'radial',
                  colorStops: [{
                    offset: 0,
                    color: '#5b96fe'
                  },

                    {
                      offset: 0.2,
                      color: '#5b96fe'
                    },

                    {
                      offset: 0.4,
                      color: '#5b96fe'
                    },

                    {
                      offset: 0.6,
                      color: '#c87aac'
                    },

                    {
                      offset: 0.8,
                      color: '#e27399'
                    },

                    {
                      offset: 1,
                      color: '#eb82a1'
                    }
                  ],
                  globalCoord: false // 缺省为 false
                },
                width: 1,
                length: 20,
              },
              length: -5
            }, //刻度样式
            splitLine: {
              show: true,
              length: -5,
            }, //分隔线样式
            detail: {
              show: false
            },
            pointer: {
              show: false
            }
          },{
              name: '丧偶',
              type: 'gauge',
              radius: '170%',
              min: 0,
              max: 100,
              center: ['50%', '90%'],
              splitNumber: 0, //刻度数量
              startAngle: 180,
              endAngle: 0,
              axisLine: {
                show: true,
                lineStyle: {
                  width: 3,
                  color: [
                    [1,
                      new echarts.graphic.LinearGradient(0, 0, 1, 0, [

                        {
                          offset: 0,
                          color: '#5b96fe'
                        },

                        {
                          offset: 0.2,
                          color: '#6892f5'
                        },

                        {
                          offset: 0.4,
                          color: '#898adc'
                        },

                        {
                          offset: 0.6,
                          color: '#c87aac'
                        },

                        {
                          offset: 0.8,
                          color: '#e27399'
                        },

                        {
                          offset: 1,
                          color: '#eb82a1'
                        }
                      ])
                    ]
                  ],
                }
              },
              //分隔线样式。
              splitLine: {
                show: false,
              },
              axisLabel: {
                show: false
              },
              axisTick: {
                show: false
              },
              itemStyle: {
                normal: {
                  color: '#5b96fe'
                }
              },
              pointer: {
                width: 2,//指针的宽度
                length:"80%", //指针长度，按照半圆半径的百分比
              },
              //仪表盘详情，用于显示数据。
              detail: {
                show: false,
                offsetCenter: [0, 0],
                color: '#ddd',
                formatter: function(params) {
                  return params
                },
                textStyle: {
                  fontSize: 10
                }
              },
              data: [{
                // name: "当前用户总数",
                value: 5
              }]
            }
          ]
        }],
        menNumWidth:'',//男生比例描述宽度
        menNumData:'',//男生比例
        womenNumData:'',//女生比例
        womenNumWidth:''//女生比例描述宽度
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.createChart()
      })
    },
    methods: {
      createChart() {
        var myChartTop = echarts.init(this.$refs.chartTop)
        myChartTop.resize()
        myChartTop.setOption(this.optionTop)
        this.changeTopWidth()
      },
      changeTopWidth(){//计算上部男女比例宽度
        var menNum = parseInt(this.optionTop.series[0].data[0].value)//男生人数
        var womenNum = parseInt(this.optionTop.series[1].data[0].value)//女生人数
        var allNum = menNum + womenNum//总人数
        this.menNumData = menNum/allNum
        this.womenNumData = womenNum/allNum
        this.menNumWidth = menNum/allNum*240
        this.womenNumWidth = womenNum/allNum*240
      }
    },
    filters: {
      numFilter(value) {
        // 截取当前数据到小数点后两位
        let realVal = Number(value).toFixed(2)
        // num.toFixed(2)获取的是字符串
        return Number(realVal)
      }
    },
    components:{
      graDuation
    }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .men_echart
    margin-top 6px
    margin-left  12px
    margin-right 12px
    .title
      width 100%
      height 40px
      line-height 40px
      background-color #fff
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      .line
        width 4px
        height 40px
        vertical-align: top
        border-top-left-radius 4px
        background-color #75D79B
      .title_name
        padding-left 16px
        font-family PingFangSC-Regular
        font-size 16px
        color #010E4F
    .men_top
      width 100%
      height 80px
      background #fff
      position relative
      ul
       width 94%
       text-align right
       padding-right 6%
       list-style none
       li
        float right
        padding-left 12px
       .peple
        text-align center
        span
         display block
         font-family PingFangSC-Light
         font-size 8px
         color #9A98F2
         letter-spacing 0
         text-align justify
         line-height 23px
       .nv
        float right
        span
         display block
         font-family PingFangSC-Light
         font-size 8px
         color #9A98F2
         letter-spacing 0
         text-align justify
         line-height 23px
       .nan
        float right
        span
         display block
         font-family PingFangSC-Light
         font-size 8px
         color #9A98F2
         letter-spacing 0
         line-height 23px
       img
        width 12px
        height 33px
      .men_miaoshu
        position absolute
        top 17px
        left 55px
        height 40px
        width 120px
        text-align center
        .top
          font-family PingFangSC-Regular
          font-size 12px
          color #010E4F
          letter-spacing 0
          text-align justify
        .bottom
          padding-top 15px
          text-align center
          display block
          font-family PingFangSC-Regular
          font-size 12px
          color #010E4F
          letter-spacing 0
      .women_miaoshu
        position absolute
        top 17px
        right 55px
        text-align center
        width 120px
        .top
          font-family PingFangSC-Regular
          font-size 12px
          color #010E4F
          letter-spacing 0
          text-align justify
        .bottom
          padding-top 15px
          text-align center
          display block
          font-family PingFangSC-Regular
          font-size 12px
          color #010E4F
          letter-spacing 0
    .men_middle
      width 100%
      background #fff
    .line
     width 100%
    .clearfix:after
      content: "."
      display: block
      height: 0
      clear: both
      visibility: hidden
    .clearfix
      zoom 1
    .content
      padding 10px 18px
      margin-top -2px
      width 100%-36px
      background #fff
      border-bottom-left-radius: 4px
      border-bottom-right-radius: 4px
      .content_child
       margin-top 10px
       margin-bottom 10px
       ont-family: PingFangSC-Light
       font-size: 14px
       color: #A6A6A6
       letter-spacing: 0
       line-height: 23px

</style>
