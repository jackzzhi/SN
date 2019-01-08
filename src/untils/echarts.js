//按需加载
// 加载echarts，注意引入文件的路径
import echarts from 'echarts/lib/echarts'

// 再引入你需要使用的图表类型，标题，提示信息等
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/scatter' //气泡图
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/chart/gauge'//仪表盘
import 'echarts/lib/component/dataZoom'//滚动条

export default echarts
