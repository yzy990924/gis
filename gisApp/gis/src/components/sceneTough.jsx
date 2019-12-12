import React from 'react';
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
        return (
            <div id='SceneTough'>
                <div className='sceneBox'>
                    <div className='toughhead'>
                        {datarray.name||datarray.hotel_name||datarray.res_name||datarray.traffic_name}
                    </div>
                    <div className='main'>
                        <div className='type_score'>
                            <div className='type'>{datarray.type||datarray.res_type}</div>
                            <div className ='dis'>{datarray.hotel_distance||datarray.traffic_distance||"距离景点"+datarray.res_distance+"米"||"距离景点"+datarray.traffic_distance+"米"}</div>
                            {datarray.traffic_score?<div className='score'>{datarray.score||datarray.hotel_score||datarray.res_score}</div>:null}
                            {datarray.traffic_score?<div className='price'>{datarray.hotel_price||datarray.res_price}</div>:null}
                        </div>
                        <div className = 'location'>{datarray.location||datarray.hotel_location||datarray.res_location}</div>
                        <div className = 'time'>{datarray.time}</div>
                    </div>
                    <div className = 'phone'>{datarray.telephone}</div>
                </div>
            </div>
        )
    }
}

export default SceneTough;