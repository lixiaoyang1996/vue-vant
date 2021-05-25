<template>
  <div>
    <div id="charts" class="charts"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount, reactive, toRefs } from 'vue'
import * as echarts from 'echarts'

export default defineComponent({
  name: 'Charts',
  setup() {
    const state = reactive({
      myChart: null,
      isEmpty: true, // 默认为空
      defaultOpt: {
        tooltip: {
          trigger: 'axis',
          z: 1,
          zlevel: 0,
          confine: true
        },
        color: ['#29C278', '#12ADFF'],
        legend: {
          padding: 10,
          data: [],
          textStyle: {
            color: '#666'
          },
          itemWidth: 18,
          y: 'top',
          right: '10'
        },
        grid: {
          x: 50,
          y: 80,
          y2: 30
        },
        xAxis: {
          name: '',
          data: [],
          type: 'category',
          axisLabel: {
            inside: false,
            interval: 0,
            color: (params, index) => {
              return state.defaultOpt.color[index]
            },
            fontSize: '12',
            rotate: 0
          },
          axisLine: {
            lineStyle: {
              color: '#E1E1E1',
              show: true
            }
          },
          axisTick: {
            show: true
          }
        },
        yAxis: [
          {
            name: '',
            color: '#666',
            fontSize: '12',
            type: 'value',
            splitLine: {
              show: true,
              lineStyle: {
                color: ['#e1e1e1'],
                type: 'dashed'
              }
            },
            axisLine: {
              lineStyle: {
                color: '#999',
                show: true
              }
            },
            axisTick: {
              show: true
            }
          },
          {
            name: '',
            color: '#999',
            fontSize: '12',
            type: 'value',
            splitLine: {
              show: false,
              lineStyle: {
                color: ['#e9e8e8'],
                type: 'dashed'
              }
            },
            axisLine: {
              lineStyle: {
                color: '#999',
                show: true
              }
            },
            axisTick: {
              show: true
            }
          }
        ],
        series: []
      }
    })

    onMounted(() => {
      // eslint-disable-next-line no-use-before-define
      initCharts()
    })

    onBeforeUnmount(() => {
      if (!state.myChart) {
        return false
      }
      // 释放画布资源 清画布
      state.myChart.dispose() // 实例不可用
      state.myChart = null
    })

    const initCharts = () => {
      // eslint-disable-next-line no-use-before-define
      dealData()
    }
    const dealData = () => {
      state.myChart = echarts.init(document.getElementById('charts'))
      state.defaultOpt.legend.data = ['安全问题', '文明施工问题']
      state.defaultOpt.xAxis.data = ['安全问题', '文明施工问题']
      state.defaultOpt.series = [
        {
          name: '安全问题',
          type: 'bar',
          label: {
            show: true,
            fontSize: 10,
            position: 'top',
            color: (params, index) => {
              return state.defaultOpt.color[index]
            }
          },
          itemStyle: {
            borderRadius: [20, 20, 0, 0]
          },
          data: [5, 20],
          barWidth: '14px',
          barGap: '80%' /* 多个并排柱子设置柱子之间的间距 */
        },
        {
          name: '文明施工问题',
          type: 'bar',
          data: [5, 20],
          label: {
            show: true,
            fontSize: 10,
            position: 'top',
            color: (params, index) => {
              return state.defaultOpt.color[index]
            }
          },
          itemStyle: {
            borderRadius: [20, 20, 0, 0]
          },
          barWidth: '14px',
          barGap: '80%' /* 多个并排柱子设置柱子之间的间距 */
        }
      ]
      state.myChart.setOption(state.defaultOpt)
    }
    return {
      ...toRefs(state)
    }
  }
})
</script>

<style lang="less">
.charts {
  width: 100%;
  height: 200px;
  background: #fff;
}
</style>
