import React from 'react';
import { Icon } from 'antd';
import PropTypes from 'prop-types';
import { fetchData } from '../utils/request'
import "../style/components/sceneTough.css"



class SceneTough extends React.Component {
    
    constructor(props) {
        super();
        this.state = ({
            id: '',
            isfetch: false
        })
    }

    render() {
        const datarray  = this.props.result
        const type  = this.props.type
        return (
            <div id='SceneTough'>
                <div className='sceneBox'>
                    <div className='head'>
                        {datarray.name||datarray.hotel_name||datarray.res_name}
                    </div>
                    <div className='main'>
                        <div className='type_score'>
                            <div className='type'><Icon type="home" style={{ color: '#1890ff'}}/><span></span>
                                {datarray.type||datarray.hotel_distance||datarray.traffic_distance||datarray.res_type}</div>
                            <div className='score'><Icon type="message" style={{ color: '#1890ff'}}/><span></span>
                                {datarray.score||datarray.hotel_score}</div>
                            <div className='resprice'><Icon type="account-book" style={{ color: '#1890ff'}}/><span></span>
                                人均：{datarray.res_price}
                            </div>
                        </div>
                        <div className = 'location'><Icon type="environment" style={{ color: '#1890ff'}} /><span></span>
                            {datarray.location||datarray.hotel_location||datarray.res_location}</div>
                        <div className = 'time'>{datarray.time||datarray.res_distance}</div>
                    </div>
                    <div className = 'phone'>{datarray.telephone}</div>
                </div>
            </div>
        )
    }
}

export default SceneTough;