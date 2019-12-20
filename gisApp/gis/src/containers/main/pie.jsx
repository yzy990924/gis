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
        styleObj = { height: window.innerHeight * 0.9, width: window.innerWidth };
        return styleObj;
    }
    getOption = () => {
        return {
            
            

        }

    }


    render() {

        return (
            <div style={{display:"flex"}} >

                <ReactEcharts
                    option={this.getOption()} style={this.getStyles()} id='map'
                    className='react_for_echarts' />
           
            </div>


        );
    }
};

export default Pie;
