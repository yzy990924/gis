import React from 'react';

import { fetchData } from '../utils/request'


class sceneDetail extends React.Component {

    constructor(props) {
        super();
        const { sceneID  } = props;
        console.log(props)
    }


    render() {
        const datarray =  this.props
        return (
            <div id='SceneTough'>
                <div className='sceneBox'>
                    <div className='head'>
                        {datarray.datarray.scene_name}
                    </div>
                    <div className='main'>
                        <div className='type_score'>
                            <div className='type'>{datarray.datarray.scene_type}</div>
                            <div className='score'>{datarray.datarray.scene_score}</div>
                        </div>
                        <div className = 'location'>{datarray.datarray.scene_location}</div>
                        <div className = 'time'>{datarray.datarray.scene_time}</div>
                    </div>
                    <div className = 'phone'>{datarray.datarray.scene_telephone}</div>
                </div>
            </div>
        )
    }
}

export default sceneDetail;