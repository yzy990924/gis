import React from 'react';
import PropTypes from 'prop-types';
import { fetchData } from '../utils/request'
let list = ''
let datarray = []

class SceneTough extends React.Component {
    
    constructor(props) {
        super();
        this.state = ({
            id: '',
            isfetch: false
        })
        const result = props
        datarray = props.result
        console.log(props.result)
    }

    render() {
        return (
            <div id='SceneTough'>
                <div className='sceneBox'>
                    <div className='head'>
                        {datarray.name}
                    </div>
                    <div className='main'>
                        <div className='type_score'>
                            <div className='type'>{datarray.type||datarray.hotel_distance||datarray.traffic_distance||datarray.res_type}</div>
                            <div className='score'>{datarray.score||datarray.hotel_score||datarray.res_price}</div>
                        </div>
                        <div className = 'location'>{datarray.location||datarray.hotel_location||datarray.res_location}</div>
                        <div className = 'time'>{datarray.time||datarray.res_distance}</div>
                    </div>
                    <div className = 'phone'>{datarray.telephone}</div>
                </div>
            </div>
        )
    }
}

export default SceneTough;