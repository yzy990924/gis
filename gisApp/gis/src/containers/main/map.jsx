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
                    distance: 120,
                    autoRotate: true,
                    autoRotateAfterStill: 1,
                    panMouseButton: 'right',
                    rotateMouseButton: 'left',
                    animation: 'true',
                    damping: 2,
                    minDistance: 80,
                    maxDistance: 150,
                    zoomSensitivity: 0.5
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
                regions: [{				// 可对单个地图区域进行设置
                    name: '河西区',		// 所对应的地图区域的名称
                    //regionHeight: '',			// 区域的高度，可以设置不同的高度用来表达数据的大小。当 GeoJSON 为建筑的数据时，也可以通过这个值表示简直的高度。
                    itemStyle: {	
                        color: '#313695',
                    },
                },
                {				// 可对单个地图区域进行设置
                    name: '河东区',		// 所对应的地图区域的名称
                    //regionHeight: '',			// 区域的高度，可以设置不同的高度用来表达数据的大小。当 GeoJSON 为建筑的数据时，也可以通过这个值表示简直的高度。
                    itemStyle: {				// 单个区域的样式设置
                        color: '#4575b4'
                    }
                },
                {				// 可对单个地图区域进行设置
                    name: '和平区',		// 所对应的地图区域的名称
                    //regionHeight: '',			// 区域的高度，可以设置不同的高度用来表达数据的大小。当 GeoJSON 为建筑的数据时，也可以通过这个值表示简直的高度。
                    itemStyle: {				// 单个区域的样式设置
                        color: '#ffc0ff'
                    }
                },
                {				// 可对单个地图区域进行设置
                    name: '南开区',		// 所对应的地图区域的名称
                    //regionHeight: '',			// 区域的高度，可以设置不同的高度用来表达数据的大小。当 GeoJSON 为建筑的数据时，也可以通过这个值表示简直的高度。
                    itemStyle: {				// 单个区域的样式设置
                        color: '#abd9e9'
                    }
                },
                {				// 可对单个地图区域进行设置
                    name: '河北区',		// 所对应的地图区域的名称
                    //regionHeight: '',			// 区域的高度，可以设置不同的高度用来表达数据的大小。当 GeoJSON 为建筑的数据时，也可以通过这个值表示简直的高度。
                    itemStyle: {				// 单个区域的样式设置
                        color: '#74add1'
                    }
                },
                {				// 可对单个地图区域进行设置
                    name: '红桥区',		// 所对应的地图区域的名称
                    //regionHeight: '',			// 区域的高度，可以设置不同的高度用来表达数据的大小。当 GeoJSON 为建筑的数据时，也可以通过这个值表示简直的高度。
                    itemStyle: {				// 单个区域的样式设置
                        color: '#fd5f00'
                    }
                },
                {				// 可对单个地图区域进行设置
                    name: '东丽区',		// 所对应的地图区域的名称
                    //regionHeight: '',			// 区域的高度，可以设置不同的高度用来表达数据的大小。当 GeoJSON 为建筑的数据时，也可以通过这个值表示简直的高度。
                    itemStyle: {				// 单个区域的样式设置
                        color: '#f46d43'
                    }
                },
                {				// 可对单个地图区域进行设置
                    name: '西青区',		// 所对应的地图区域的名称
                    //regionHeight: '',			// 区域的高度，可以设置不同的高度用来表达数据的大小。当 GeoJSON 为建筑的数据时，也可以通过这个值表示简直的高度。
                    itemStyle: {				// 单个区域的样式设置
                        color: '#4575b4'
                    }
                },
                {				// 可对单个地图区域进行设置
                    name: '津南区',		// 所对应的地图区域的名称
                    //regionHeight: '',			// 区域的高度，可以设置不同的高度用来表达数据的大小。当 GeoJSON 为建筑的数据时，也可以通过这个值表示简直的高度。
                    itemStyle: {				// 单个区域的样式设置
                        color: '#0f4c80'
                    }
                },
                {				// 可对单个地图区域进行设置
                    name: '北辰区',		// 所对应的地图区域的名称
                    //regionHeight: '',			// 区域的高度，可以设置不同的高度用来表达数据的大小。当 GeoJSON 为建筑的数据时，也可以通过这个值表示简直的高度。
                    itemStyle: {				// 单个区域的样式设置
                        color: '#3e93ef'
                    }
                },
                {				// 可对单个地图区域进行设置
                    name: '武清区',		// 所对应的地图区域的名称
                    //regionHeight: '',			// 区域的高度，可以设置不同的高度用来表达数据的大小。当 GeoJSON 为建筑的数据时，也可以通过这个值表示简直的高度。
                    itemStyle: {				// 单个区域的样式设置
                        color: '#3a5fc8'
                    }
                },
                {				// 可对单个地图区域进行设置
                    name: '宝坻区',		// 所对应的地图区域的名称
                    //regionHeight: '',			// 区域的高度，可以设置不同的高度用来表达数据的大小。当 GeoJSON 为建筑的数据时，也可以通过这个值表示简直的高度。
                    itemStyle: {				// 单个区域的样式设置
                        color: '#5d3fc1'
                    }
                },
                {				// 可对单个地图区域进行设置
                    name: '宁河区',		// 所对应的地图区域的名称
                    //regionHeight: '',			// 区域的高度，可以设置不同的高度用来表达数据的大小。当 GeoJSON 为建筑的数据时，也可以通过这个值表示简直的高度。
                    itemStyle: {				// 单个区域的样式设置
                        color: '#abd9e9'
                    }
                },
                {				// 可对单个地图区域进行设置
                    name: '静海区',		// 所对应的地图区域的名称
                    //regionHeight: '',			// 区域的高度，可以设置不同的高度用来表达数据的大小。当 GeoJSON 为建筑的数据时，也可以通过这个值表示简直的高度。
                    itemStyle: {				// 单个区域的样式设置
                        color: '#abd9e9'
                    }
                },
                {				// 可对单个地图区域进行设置
                    name: '滨海新区',		// 所对应的地图区域的名称
                    //regionHeight: '',			// 区域的高度，可以设置不同的高度用来表达数据的大小。当 GeoJSON 为建筑的数据时，也可以通过这个值表示简直的高度。
                    itemStyle: {				// 单个区域的样式设置
                        colorr: '#e0f3f8'
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
                        { name: "北辰郊野公园", value: 30},
                        { name: "五大道", value: 55},
                        { name: "人民公园", value: 35},
                        { name: "津门故里", value: 39},
                        { name: "天津义和团纪念馆", value: 45},
                        { name: "梁启超纪念馆", value: 53},
                        { name: "东丽湖", value: 29},
                        { name: "张学良故居博物馆(少帅府)", value: 48 }

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
