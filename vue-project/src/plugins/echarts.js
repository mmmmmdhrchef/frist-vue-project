/**
 * echart图表库
*/
import china from '../assets/json/china.json'
import * as echarts from 'echarts';

export default {
    install: (app) => {
        // 在这里编写插件代码

        //折线图
        app.config.globalProperties.$line = (element, data) => {
            //初始化
            const mychart = echarts.init(document.getElementById(element))
            //配置
            const option = {
                title: {
                    text: 'Stacked Line'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['Direct', 'Search Engine']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: data
            }
            //设置
            mychart.setOption(option)
        }

        //radar(雷达图)
        app.config.globalProperties.$radar = (element, data) => {
            //初始化
            const mychart = echarts.init(document.getElementById(element))
            const option = {
                title: {
                    text: 'Basic Radar Chart'
                },
                legend: {
                    data: ['Allocated Budget', 'Actual Spending']
                },
                radar: {
                    // shape: 'circle',
                    indicator: [
                        { name: 'Sales', max: 6500 },
                        { name: 'Administration', max: 16000 },
                        { name: 'Information Technology', max: 30000 },
                        { name: 'Customer Support', max: 38000 },
                        { name: 'Development', max: 52000 },
                        { name: 'Marketing', max: 25000 }
                    ]
                },
                series: data
            }
            mychart.setOption(option)
        }
        //pie(饼状图)
        app.config.globalProperties.$pie = (element, data) => {
            //初始化
            const mychart = echarts.init(document.getElementById(element))
            const option = {
                legend: {
                    top: 'bottom'
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: { show: true },
                        dataView: { show: true, readOnly: false },
                        restore: { show: true },
                        saveAsImage: { show: true }
                    }
                },
                series: data
            }
            mychart.setOption(option)
        }
        //bar(柱状图)
        app.config.globalProperties.$bar = (element, data) => {
            //初始化
            const mychart = echarts.init(document.getElementById(element))
            const option = {
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: data
            }
            mychart.setOption(option)
        }
        //中国地图
        app.config.globalProperties.$china = (element) => {
            const mychart = echarts.init(document.getElementById(element))

            //注册地图 (设置名称 以及引入china资源)
            echarts.registerMap("china", china)
            const option = {
                //鼠标点击弹窗
                tooltip: {
                    triggerOn: 'click', //点击触发
                    enterable: true  //是否出现弹窗
                },
                visualMap: {
                    origin: 'vertical',
                    type: 'piecewise',
                    pieces: [
                        { min: 0, max: 10, color: '#FF6B6B' },    // 浅红
                        { min: 11, max: 30, color: '#FFD93D' },  // 浅黄
                        { min: 31, max: 50, color: '#7ED321' },  // 正绿
                        { min: 51, max: 70, color: '#3498DB' },  // 蓝
                        { min: 71, max: 90, color: '#9B59B6' }   // 紫
                    ]
                },
                series: [{
                    name: '中国地图',
                    type: 'map',
                    map: 'china',
                    roam: true,  //鼠标滚轮是否可以缩放
                    zoom: 1.2, //默认放大倍数
                    lable: {
                        show: true, //是否显示地图上的文本信息
                        fontSize: 8,
                    },
                    itemStyle: {
                        areaColor: "rgba(255,255,255,1)",
                        borderColor: "rgba(0,0,0,0.2)"
                    },
                    data: [
                        { name: '内蒙古', value: 10 },
                        { name: '黑龙江', value: 20 },
                        { name: '山东', value: 30 },
                        { name: '河南', value: 40 },
                        { name: '北京', value: 8 },
                        { name: '天津', value: 15 },
                        { name: '河北', value: 22 },
                        { name: '山西', value: 18 },
                        { name: '辽宁', value: 35 },
                        { name: '吉林', value: 12 },
                        { name: '黑龙江', value: 9 },
                        { name: '上海', value: 45 },
                        { name: '江苏', value: 68 },
                        { name: '浙江', value: 53 },
                        { name: '安徽', value: 39 },
                        { name: '福建', value: 26 },
                        { name: '江西', value: 17 },
                        { name: '山东', value: 60 },
                        { name: '河南', value: 41 },
                        { name: '湖北', value: 33 },
                        { name: '湖南', value: 29 },
                        { name: '广东', value: 85 },
                        { name: '广西', value: 24 },
                        { name: '海南', value: 6 },
                        { name: '重庆', value: 19 },
                        { name: '四川', value: 37 },
                        { name: '贵州', value: 14 },
                        { name: '云南', value: 21 },
                        { name: '西藏', value: 5 },
                        { name: '陕西', value: 31 },
                        { name: '甘肃', value: 16 },
                        { name: '青海', value: 7 },
                        { name: '宁夏', value: 13 },
                        { name: '新疆', value: 28 },
                        { name: '台湾', value: 49 },
                        { name: '南海诸岛', value: 60}
                    ]
                }]
            }
            mychart.setOption(option)
        }
    }
}