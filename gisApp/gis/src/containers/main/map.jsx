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
    '北辰郊野公园': [117.158865,39.277851],
    "五大道": [117.209997,39.116392],
    "人民公园":[117.224576,39.111156],
    "津门故里":[117.199184,39.149532],
    "天津义和团纪念馆":[117.164626,39.152006],
    "梁启超纪念馆":[117.206146,39.142874],
    "东丽湖":[117.498531,39.16477],
    "张学良故居博物馆(少帅府)":[117.208211,39.129784],

}

var convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];//获取坐标
        if (geoCoord) {//如果有坐标
            res.push({//创建对象数组，
                name: data[i].name,
                loca: data[i].loca,
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
        styleObj = { height: window.innerHeight*0.8, width: window.innerWidth };

        return styleObj;
    }
    getOption = () => {
        return {

            backgroundColor: '#3c3c3c',
            geo3D: {
                map: '天津',
                environment: '#3c3c3c',
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
                    autoRotate: true,
                    autoRotateAfterStill: 1,
                    panMouseButton: 'right',
                    rotateMouseButton: 'left',
                    animation:'true',
                    damping:2
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
                    borderColor: '#838B83'
                },

            },
            series: [
                {
                    type: 'bar3D',
                    coordinateSystem: 'geo3D',
                    data: convertData([
                        { name: "方特", value: 50,loca:"hhh" },
                        { name: "北辰郊野公园", value: 30,loca:"hhh" },
                        { name: "五大道", value: 55,loca:"hhh"},
                        { name: "人民公园", value:35,loca:"hhh" },
                        { name: "津门故里", value: 39,loca:"hhh"},
                        { name: "天津义和团纪念馆", value: 45,loca:"hhh"},
                        { name: "梁启超纪念馆", value:53,loca:"hhh"},
                        { name: "东丽湖", value:29,loca:"hhh"},
                        { name: "张学良故居博物馆(少帅府)", value:48,loca:"hhh"}
  
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
            visualMap: {
                max: 50,
                calculable: true,
                realtime: false,
                inRange: {
                    color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
                },
                outOfRange: {
                    colorAlpha: 0
                }
            },

        }

    }
    onChartClick(param) {
        this.setState({
            sceneId: param.value[2],
            isScene: true
        })
        const {changeRoot} = this.props;
        changeRoot(this.state.isScene,this.state.sceneId)
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
