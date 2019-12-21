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


class Pie extends Component {
    getStyles() {
        let styleObj;
        styleObj = { height: '400px', width: '600px'};
        return styleObj;
    }
    getOption = () => {
        return {
            title : {
                text: '热门景点概览',
                x:'center',
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                /*x : 'center',
                y : 'bottom',
*/                /*orient: 'vertical',
                x: 'left',*/
                orient: 'vertical',
                left: 10,
                top: 80,
                bottom: 20,

                data:['津门故里','五大道风情旅游区','方特欢乐世界','北辰郊野公园','东丽湖','人民公园','梁启超纪念馆','张学良故居']
            },

            toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                    //dataView : {show: true, readOnly: false},
                    magicType : {
                        show: true,
                        type: ['pie', 'funnel']
                    },
                    //restore : {show: true},
                    //saveAsImage : {show: true}
                }
            },
            calculable : true,
           /* visualMap: {
                show: false,
                min: 0,
                max: 8,
                inRange: {
                    color: ['#8378EA','#E7BCF3','#FB7293','#FF9F7F','#FFDB5C','#9FE6B8','#32C5E9','#37A2DA']
                }
            },*/
            series : [
                {
                    name:'景点热度',
                    type:'pie',
                    radius : [30, 110],
                    center : ['68%', '50%'],
                    roseType : 'area',
                    label: {
                        normal: {
                        textStyle : {
                            fontWeight : 'normal',
                            fontSize : '17',
                            }
                        }
                    },
                    data:[
                        {value:10, name:'梁启超纪念馆'},
                        {value:5, name:'人民公园'},
                        {value:15, name:'东丽湖'},
                        {value:25, name:'北辰郊野公园'},
                        {value:20, name:'张学良故居'},
                        {value:35, name:'五大道风情旅游区'},
                        {value:30, name:'津门故里'},
                        {value:40, name:'方特欢乐世界'}
                    ]
                }
            ]
        }

    }


    render() {

        return (
            <div  className='pie'>

                <ReactEcharts
                    option={this.getOption()} style={this.getStyles()} 
                    className='react_for_echarts' />
           
            </div>


        );
    }
};

export default Pie;
