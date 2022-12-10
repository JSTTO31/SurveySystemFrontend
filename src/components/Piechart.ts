import { defineComponent, h, PropType } from 'vue'

import { Pie } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  Plugin
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)
ChartJS.defaults.elements.arc.borderWidth = 0;
export default defineComponent({
  name: 'PieChart',
  components: {
    Pie
  },
  props: {
    chartId: {
      type: String,
      default: 'pie-chart'
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 400
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object as PropType<Partial<CSSStyleDeclaration>>,
      default: () => {}
    },
    plugins: {
      type: Array as PropType<Plugin<'pie'>[]>,
      default: () => []
    },
    labels: {
      type: Array,
      default: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
    },
    data: {
      type: Array,
    }
  },
  setup(props) {
    const chartData = {
      labels: props.labels,
      datasets: [
        {
          backgroundColor: ['#064635', '#519259', '#F0BB62', '#F4EEA9'],
          data: props.data
        }
      ]
    }

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      
      plugins: {
        legend: {
            position: "right",
            labels: {
                font: {
                    size: 16
                }
            }
        }
      }
    }

    return () =>
      h(Pie, {
        chartData,
        chartOptions,
        chartId: props.chartId,
        width: props.width,
        height: props.height,
        cssClasses: props.cssClasses,
        styles: props.styles,
        plugins: props.plugins
      })
  }
})
