import React, { Component } from 'react';
import echarts from 'echarts';
import 'echarts-gl';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/visualMap';
import 'echarts/lib/chart/map';
import 'echarts/lib/chart/bar';
import 'echarts/map/js/province/tianjin';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/gauge';
import 'echarts/lib/chart/pie';

var geoCoordMap = {
    '方特': [117.74575, 39.160382],
    '北辰郊野公园': [117.158865, 39.277851],
    "五大道": [117.209997, 39.116392],
    "人民公园": [117.224576, 39.111156],
    "津门故里": [117.199184, 39.149532],
    "天津义和团纪念馆": [117.164626, 39.152006],
    "梁启超纪念馆": [117.206146, 39.142874],
    "张学良故居博物馆(少帅府)": [117.208211, 39.129784],
    "欢乐谷": [117.482987,39.193967],
    "黄崖关长城": [117.455599,39.254002],
    "天塔湖": [117.188361,39.098582],
    "天津鼓楼": [117.187779,39.147319],
    "天津泰达航母主题公园":[117.820941,39.162358],
    "太平寨": [117.465393,39.252321],
    "庆王府旧址": [117.214465,39.119378],
    "天津利顺德博物馆": [117.22351,39.127171],
    "天津北疆博物馆": [117.214637,39.0],
    "天津海昌极地海洋世界": [117.669147,39.014578],
    "黑峪神秘谷": [117.477574,39.004394],
    "天津大沽口炮台遗址": [117.51158057452,38.674918193711],
    "菜芽庄路": [117.374131, 39.60360],
    "青龙湾固沙林自然保护区": [117.30,39.72],
    "潮白河国家湿地公园": [117.278274,39.686274],
    "七里海国家湿地公园": [117.478274,39.32378],
    "古海岸与湿地国家级自然保护区": [117.573914,39.2728],
    "团泊湖": [117.014637, 38.8],
    "萨马兰奇纪念馆": [117.014637, 39.0],
    "凯旋王国主题乐园": [117.014637, 39.5]
}
var tooltip = [
    { name: '天津古文化街旅游区(津门故里)', id: 38, type: '风景区', loca: '天津市南开区通北路与东马路交叉口', score: '4.2', time: "08:30-22:00", telephone: '(022)27356128' },
    { name: '五大道风情旅游区', id: 40, type: '风景区', loca: '天津市和平区重庆道83号(重庆道与河北路交口)', score: '4.3', time: "00:00-24:00", telephone: '(022)23307222' },
    { name: '方特欢乐世界', id: 42, type: '游乐场', loca: '天津市滨海新区中生大道4888号', score: '4.5', time: "周一至周五09:30-17:30，周六至周日09:00-18:00；夜场16:00后入园，夜场16:00-21:00", telephone: '(022)66325566' },
    { name: '北辰郊野公园', id: 41, type: '公园', loca: '天津市北辰区津武线', score: '4.1', time: "09:00-17:00", telephone: '(022)66375859' },
  
    { name: '人民公园', id: 39, type: '公园', loca: '天津市河西区徽州道29号', score: '4.7', time: "05:30-23:00", telephone: '(022)23240371' },
    { name: '梁启超纪念馆', id: 36, type: '纪念馆', loca: '天津市河北区民族路44-46号', score: '4.6', time: "09:00-17:00", telephone: '(022)24450856' },
    { name: '天津义和团纪念馆', id: 37, type: '纪念馆', loca: '天津市红桥区如意庵大街吕祖堂胡同16号', score: '4.6', time: "周一至周日9:00-16:30", telephone: '(022)27573656' },
    { name: '张学良故居(少帅府)', id: 34, type: '纪念馆', loca: '天津市和平区赤峰道78号(山东路口)', score: '4.6', time: "09:00-17:00", telephone: '(022)87896106' },
    
    { name: '黄崖关长城',id:32, loca: '天津市蓟州区黄崖关村津围公路', score: '4.4', time: '08:00-17:00', type: '风景区', telephone: '(022)22718080' },
    { name: '天津鼓楼',id:31, loca: '天津市南开区鼓楼北街1号', score: '4.2', time: '08:30-22:00', type: '文物古迹', telephone: '(022)88252627' },
    { name: '天津泰达航母主题公园', id:30,loca: '汉北路269号', score: '4.2', time: '09:00-17:00', type: '公园', telephone: '(022)67288899' },
    { name: '太平寨',id:29, loca: '天津市蓟州区长城公路', score: '4.1', time: '全天开放', type: '风景区', telephone: '(022)22718658' },
    { name: '庆王府旧址',id:28, loca: '天津市和平区重庆道55号(近河北路)', score: '4.1', time: '09:00-17:00', type: '文物古迹', telephone: '(022)58352509' },
    { name: '天津利顺德博物馆',id:27, loca: '台儿庄路33号天津利顺德大饭店B1层', score: '4.5', time: '09:00-20:00', type: '博物馆', telephone: '(022)58526888' },
    { name: '天津北疆博物院',id:26,loca: '天津市河西区马场道117号现天津外国语学院校内', score: '4.7', time: '09:00-16:30(16:00停止入场)，周一闭馆(国家法定节假日除外)', type: '博物馆', telephone: '(022)23263517' },
    { name: '天津海昌极地海洋世界', id:25,loca: '天津市滨海新区响螺湾中心商务区61号', score: '4.4', time: '09:00-16:30', type: '游乐场', telephone: '(022)66227777' },
    { name: '黑峪神秘谷',id:24, loca: '蓟州区渔阳镇东果园村', score: '3.8', time: '7:30-16:00（停止售票）17:00（清园）', type: '风景区', telephone: '(022)82899900' },
    { name: "菜芽庄路", id: 22},
    { name: "欢乐谷", id: 33},
    { name: "天津大沽口炮台遗址", id: 23},
    { name: "青龙湾固沙林自然保护区", id: 21},
    { name: "潮白河国家湿地公园", id: 20},
    { name: "七里海国家湿地公园", id: 19},
    { name: "古海岸与湿地国家级自然保护区", id: 18},
    { name: "团泊湖", id: 17},
    { name: "萨马兰奇纪念馆", id: 16},
    { name: "凯旋王国主题乐园", id: 15}
]
var convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];//获取坐标
        if (geoCoord) {//如果有坐标
            res.push({//创建对象数组，
                name: data[i].name,
                value: geoCoord.concat(data[i].value),  //用连接数组的形式将value值加入
                color: data[i].color
            });
            //res.push(geoCoord.concat(data[i].value));
            //res.push(geoCoord.concat(data[i].name));
        }
    }
    return res;
};

class Map extends Component {
    static propTypes = {

        handleSelect: PropTypes.func,

    }
    constructor() {
        super();
        this.state = {
            isScene: false,
            sceneId: ''
        }
    }
    getStyles() {
        let styleObj;
        styleObj = { height: window.innerHeight * 0.9, width: window.innerWidth };
        return styleObj;
    }
    getOption = () => {
        return {
            geo3D: {
                map: '天津',
                layoutCenter: ['80%', '80%'], 
                environment: '#ffffff',
                shading: 'lambert',
                layoutSize: '100%',
                light: {
                    main: {
                        intensity: 1,
                        shadow: true,
                        shadowQuality: 'high',
                        alpha: 30
                    },
                    ambient: {
                        intensity: 0
                    },
                    ambientCubemap: {

                        exposure: 1,
                        diffuseIntensity: 0.5
                    }
                },
                viewControl: {
                    distance: 130,
                    autoRotate: false,
                    autoRotateAfterStill: 1,
                    panMouseButton: 'right',
                    rotateMouseButton: 'left',
                    animation: 'true',
                    damping: 0,
                    minDistance: 10,
                    maxDistance: 150,
                    rotateSensitivity: [0.6, 0.7],
                    zoomSensitivity: 1,
                    center: [-20,0,0]
                    //beta:
                },
                postEffect: {
                    enable: true,
                    bloom: {
                        enable: false
                    },
                    SSAO: {
                        radius: 1,
                        intensity: 1,
                        enable: true
                    },
                    depthOfField: {
                        enable: false,
                        focalRange: 10,
                        blurRadius: 10,
                        fstop: 1
                    }
                },
                itemStyle: {
                    borderWidth: 0.5,
                    borderColor: '#fff'
                },
                regions: [
                    {             // 可对单个地图区域进行设置
                        name: '河西区',        // 所对应的地图区域的名称
                        //regionHeight: '',         // 区域的高度，可以设置不同的高度用来表达数据的大小。当 GeoJSON 为建筑的数据时，也可以通过这个值表示简直的高度。
                        itemStyle: {
                            color: '#313695',
                        },
                    },
                    {               // 可对单个地图区域进行设置
                        name: '河东区',        // 所对应的地图区域的名称
                        //regionHeight: '',         // 区域的高度，可以设置不同的高度用来表达数据的大小。当 GeoJSON 为建筑的数据时，也可以通过这个值表示简直的高度。
                        itemStyle: {                // 单个区域的样式设置
                            color: '#4575b4'
                        }
                    },
                    {               // 可对单个地图区域进行设置
                        name: '和平区',        // 所对应的地图区域的名称
                        //regionHeight: '',         // 区域的高度，可以设置不同的高度用来表达数据的大小。当 GeoJSON 为建筑的数据时，也可以通过这个值表示简直的高度。
                        itemStyle: {                // 单个区域的样式设置
                            color: '#ffc0ff'
                        }
                    },
                    {               // 可对单个地图区域进行设置
                        name: '南开区',        // 所对应的地图区域的名称
                        //regionHeight: '',         // 区域的高度，可以设置不同的高度用来表达数据的大小。当 GeoJSON 为建筑的数据时，也可以通过这个值表示简直的高度。
                        itemStyle: {                // 单个区域的样式设置
                            color: '#abd9e9'
                        }
                    },
                    {               // 可对单个地图区域进行设置
                        name: '河北区',        // 所对应的地图区域的名称
                        //regionHeight: '',         // 区域的高度，可以设置不同的高度用来表达数据的大小。当 GeoJSON 为建筑的数据时，也可以通过这个值表示简直的高度。
                        itemStyle: {                // 单个区域的样式设置
                            color: '#74add1'
                        }
                    },
                    {               // 可对单个地图区域进行设置
                        name: '红桥区',        // 所对应的地图区域的名称
                        //regionHeight: '',         // 区域的高度，可以设置不同的高度用来表达数据的大小。当 GeoJSON 为建筑的数据时，也可以通过这个值表示简直的高度。
                        itemStyle: {                // 单个区域的样式设置
                            color: '#fd5f00'
                        }
                    },
                    {               // 可对单个地图区域进行设置
                        name: '东丽区',        // 所对应的地图区域的名称
                        //regionHeight: '',         // 区域的高度，可以设置不同的高度用来表达数据的大小。当 GeoJSON 为建筑的数据时，也可以通过这个值表示简直的高度。
                        itemStyle: {                // 单个区域的样式设置
                            color: '#f46d43'
                        }
                    },
                    {               // 可对单个地图区域进行设置
                        name: '西青区',        // 所对应的地图区域的名称
                        //regionHeight: '',         // 区域的高度，可以设置不同的高度用来表达数据的大小。当 GeoJSON 为建筑的数据时，也可以通过这个值表示简直的高度。
                        itemStyle: {                // 单个区域的样式设置
                            color: '#4575b4'
                        }
                    },
                    {               // 可对单个地图区域进行设置
                        name: '津南区',        // 所对应的地图区域的名称
                        //regionHeight: '',         // 区域的高度，可以设置不同的高度用来表达数据的大小。当 GeoJSON 为建筑的数据时，也可以通过这个值表示简直的高度。
                        itemStyle: {                // 单个区域的样式设置
                            color: '#0f4c80'
                        }
                    },
                    {               // 可对单个地图区域进行设置
                        name: '北辰区',        // 所对应的地图区域的名称
                        //regionHeight: '',         // 区域的高度，可以设置不同的高度用来表达数据的大小。当 GeoJSON 为建筑的数据时，也可以通过这个值表示简直的高度。
                        itemStyle: {                // 单个区域的样式设置
                            color: '#3e93ef'
                        }
                    },
                    {               // 可对单个地图区域进行设置
                        name: '武清区',        // 所对应的地图区域的名称
                        //regionHeight: '',         // 区域的高度，可以设置不同的高度用来表达数据的大小。当 GeoJSON 为建筑的数据时，也可以通过这个值表示简直的高度。
                        itemStyle: {                // 单个区域的样式设置
                            color: '#3a5fc8'
                        }
                    },
                    {               // 可对单个地图区域进行设置
                        name: '宝坻区',        // 所对应的地图区域的名称
                        //regionHeight: '',         // 区域的高度，可以设置不同的高度用来表达数据的大小。当 GeoJSON 为建筑的数据时，也可以通过这个值表示简直的高度。
                        itemStyle: {                // 单个区域的样式设置
                            color: '#5d3fc1'
                        }
                    },
                    {               // 可对单个地图区域进行设置
                        name: '宁河区',        // 所对应的地图区域的名称
                        //regionHeight: '',         // 区域的高度，可以设置不同的高度用来表达数据的大小。当 GeoJSON 为建筑的数据时，也可以通过这个值表示简直的高度。
                        itemStyle: {                // 单个区域的样式设置
                            color: '#abd9e9'
                        }
                    },
                    {               // 可对单个地图区域进行设置
                        name: '静海区',        // 所对应的地图区域的名称
                        //regionHeight: '',         // 区域的高度，可以设置不同的高度用来表达数据的大小。当 GeoJSON 为建筑的数据时，也可以通过这个值表示简直的高度。
                        itemStyle: {                // 单个区域的样式设置
                            color: '#a4d8ff'
                        }
                    },
                    {               // 可对单个地图区域进行设置
                        name: '滨海新区',       // 所对应的地图区域的名称
                        //regionHeight: '',         // 区域的高度，可以设置不同的高度用来表达数据的大小。当 GeoJSON 为建筑的数据时，也可以通过这个值表示简直的高度。
                        itemStyle: {                // 单个区域的样式设置
                            color: '#d0f0ff'
                        }
                    },
                ],
            },
            visualMap: {
                show: false,
                min: 15,
                max: 42,
                inRange: {
                    color: ['#fd5f00', '#fd5f00', '#fd5f00', '#fd5f00', '#fd5f00','#fd5f00','#fd5f00','#fd5f00','#fd5f00','#fd5f00','#fd5f00','#fd5f00','#fd5f00','#fd5f00','#fd5f00','#fd5f00','#fd5f00','#fd5f00',
                    '#fea410', '#fea410', '#fea410', '#fea410', '#fea410','#fea410','#fea410','#fea410','#fea410']
                }
            },

            series: [
                {
                    type: 'bar3D',
                    coordinateSystem: 'geo3D',
                    data: convertData([
                        { name: "方特", value: 42},
                        { name: "北辰郊野公园", value: 41 },
                        { name: "五大道", value: 40 },
                        { name: "人民公园", value: 39 },
                        { name: "津门故里", value: 38},
                        { name: "天津义和团纪念馆", value: 37 },
                        { name: "梁启超纪念馆", value: 36 },
                        { name: "东丽湖", value: 35 },
                        { name: "张学良故居博物馆(少帅府)", value: 34},

                        { name: "欢乐谷", value: 33},
                        { name: "黄崖关长城", value: 32},
                        { name: "天津鼓楼",value: 31},
                        { name: "天津泰达航母主题公园",value: 30},
                        { name: "太平寨",value: 29},
                        { name: "庆王府旧址", value: 28},
                        { name: "天津利顺德博物馆",value: 27},
                        { name: "天津北疆博物馆", value: 26},
                        { name: "天津海昌极地海洋世界",value: 25},
                        { name: "黑峪神秘谷", value: 24},
                        { name: "天津大沽口炮台遗址", value: 23},
                        { name: "菜芽庄路", value: 22},
                        { name: "青龙湾固沙林自然保护区", value: 21},
                        { name: "潮白河国家湿地公园", value: 20},
                        { name: "七里海国家湿地公园", value: 19},
                        { name: "古海岸与湿地国家级自然保护区", value: 18},
                        { name: "团泊湖", value: 17},
                        { name: "萨马兰奇纪念馆", value: 16},
                        { name: "凯旋王国主题乐园", value: 15}

                    ]),
                    barSize: 1, //柱子粗细
                    shading: 'lambert',
                    opacity: 1,
                    bevelSize: 0.3,
                    itemStyle: {
                        color: '#ffffff'
                    },
                    label: {
                        show: false,
                        fontWeight: 900,
                        color: '#313695',
                        fontSize: "100px",
                        formatter: function (params) {
                            var id = params.value[2]
                            console.log(id)
                            for (let i = 0; i < 28; i++){
                                console.log(tooltip[i].id)
                                if (tooltip[i].id === id) {
                                    console.log('yes')
                                    if(tooltip[i].id < 24||tooltip[i].id===33){
                                        return tooltip[i].name
                                    }
                                    else{
                                        return tooltip[i].name + "\n" + tooltip[i].score + "\t" + tooltip[i].type + "\n" + tooltip[i].loca + "\n" + tooltip[i].telephone
                                    }

                                }
                            }
                                
                        }
                    },
                    minHeight: 0.2,
                }
            ],

        }

    }

    
 
    onChartClick(param) {
        this.setState({
            sceneId: param.value[2],
            isScene: true
        })
        const { changeRoot } = this.props;
        changeRoot(this.state.isScene, this.state.sceneId)
    }

    render() {
        let onEvents = {
            'click': this.onChartClick.bind(this),
        }
        return (
            <div style={{display:"flex"}} >

                <ReactEcharts
                    option={this.getOption()} style={this.getStyles()} id='map'
                    className='react_for_echarts' onEvents={onEvents} />
           
               
              
            </div>


        );
    }
};

export default Map;
