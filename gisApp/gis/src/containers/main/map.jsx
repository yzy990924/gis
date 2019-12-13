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
    "东丽湖": [117.498531, 39.16477],
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

var convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];//获取坐标
        if (geoCoord) {//如果有坐标
            res.push({//创建对象数组，
                name: data[i].name,
                value: geoCoord.concat(data[i].value)  //用连接数组的形式将value值加入
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
                environment:'#ffffff',
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
                    autoRotate:true,
                    autoRotateAfterStill: 1,
                    panMouseButton: 'right',
                    rotateMouseButton: 'left',
                    animation: 'true',
                    damping: 0,
                    minDistance: 10,
                    maxDistance: 1100,
                    rotateSensitivity: [0.6,0.7],
                    zoomSensitivity: 1
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
                        color: '#abd9e9'
                    }
                },
                {               // 可对单个地图区域进行设置
                    name: '滨海新区',       // 所对应的地图区域的名称
                    //regionHeight: '',         // 区域的高度，可以设置不同的高度用来表达数据的大小。当 GeoJSON 为建筑的数据时，也可以通过这个值表示简直的高度。
                    itemStyle: {                // 单个区域的样式设置
                        color: '#e0fcf8'
                    }
                },
                ],
            },
            series: [
                {
                    type: 'bar3D',
                    coordinateSystem: 'geo3D',
                    data: convertData([
                        { name: "方特", value: 50 },
                        { name: "北辰郊野公园", value: 50},
                        { name: "五大道", value: 50},
                        { name: "人民公园", value: 50},
                        { name: "津门故里", value: 50},
                        { name: "天津义和团纪念馆", value: 50},
                        { name: "梁启超纪念馆", value: 50},
                        { name: "东丽湖", value: 50},
                        { name: "张学良故居博物馆(少帅府)", value: 50 },
                        { name: "欢乐谷", value: 40},
                        { name: "黄崖关长城", value: 40},
                        { name: "天津鼓楼",value: 40},
                        { name: "天津泰达航母主题公园",value: 40},
                        { name: "太平寨",value: 40},
                        { name: "庆王府旧址", value: 40},
                        { name: "天津利顺德博物馆",value: 40},
                        { name: "天津北疆博物馆", value: 40},
                        { name: "天津海昌极地海洋世界",value: 40},
                        { name: "黑峪神秘谷", value: 40},
                        { name: "天津大沽口炮台遗址", value: 40},
                        { name: "菜芽庄路", value: 40},
                        { name: "青龙湾固沙林自然保护区", value: 40},
                        { name: "潮白河国家湿地公园", value: 40},
                        { name: "七里海国家湿地公园", value: 40},
                        { name: "古海岸与湿地国家级自然保护区", value: 40},
                        { name: "团泊湖", value: 40},
                        { name: "萨马兰奇纪念馆", value: 40},
                        { name: "凯旋王国主题乐园", value: 40}
                    ]),
                    barSize: 1, //柱子粗细
                    shading: 'lambert',
                    opacity: 1,
                    bevelSize: 0.3,
                    label: {
                        show: false,
                        formatter: '{b}'
                    },
                    minHeight: 0.2,
                    //标签的样式
                    itemStyle: {
                        emphasis: {
                            borderColor: '#fff',
                            borderWidth: 1
                        }

                    }
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
            'click': this.onChartClick.bind(this)
        }
        return (
            <ReactEcharts
                option={this.getOption()} style={this.getStyles()} id='map'
                className='react_for_echarts' onEvents={onEvents} />
        );
    }
};

export default Map;
