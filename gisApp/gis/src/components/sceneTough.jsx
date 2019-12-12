import React from 'react';
import PropTypes from 'prop-types';
import { fetchData } from '../utils/request'
import "../style/components/sceneTough.css"

let list = ''
let datarray = []

class SceneTough extends React.Component {
    
    constructor(props) {
        super();
        this.state = ({
            id: '',
            isfetch: false
        })
        
        datarray = props.result
        console.log(props)
    }

    render() {
        const type  = this.props.type
        return (
            <div id='SceneTough'>
                {type==="myscene"?
                <div className='sceneBox'>
                    <div className='head'>
                        {datarray.name}
                    </div>
                    <div className='main'>
                        <div className='type_score'>
                            <div className='type'>{datarray.type}</div>
                            <div className='score'>{datarray.score}</div>
                        </div>
                        <div className = 'location'>{datarray.location}</div>
                        <div className = 'time'>{datarray.time}</div>
                    </div>
                    <div className = 'phone'>{datarray.telephone}</div>
                </div>
                :null}
                <div className='sceneBox'>
                    <div className='head'>
                        {datarray.name||datarray.hotel_name||datarray.res_name}
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