import React from 'react';
import { Icon } from 'antd';
import  Scene from '../containers/scene/scene'
import "../style/components/sceneTough.css"


let sid
class SceneTough extends React.Component {

    constructor(props) {
        super();
        this.state = ({
            id: '',
            isfetch: false,
            isScene: false,
            isover:false
        })
        this.onsceneMap = this.onsceneMap.bind(this)
    }

    onsceneMap() {
        console.log('sunzi')
        const { setScene } = this.props;
        const datarray = this.props.result
        console.log(datarray)
        setScene(datarray.scene_id);
    }

    render() {
        const datarray = this.props.result
        const issearch = this.props.issearch
        sid = datarray.id
        return (
            <div id={datarray.name ? 'Myscene' : 'SceneTough '}>
                    <div className='sceneBox' onClick={issearch ? this.onsceneMap : null}>
                        <div className='toughhead'>
                            <div >
                                {datarray.name || datarray.hotel_name || datarray.res_name || datarray.traffic_name}
                            </div>
                            {issearch ? <Icon type="star"  style={{fontSize: '24px',marginTop: '7%'}}/> : null}
                        </div>
                        <div className='main'>
                            <div className='type_score'>
                                <div className='type'>{datarray.type || datarray.res_type}</div>
                                {!datarray.traffic_name ? <div className='score'>{datarray.score || datarray.hotel_score || datarray.res_score + '分'}</div> : null}
                                {datarray.hotel_price||datarray.res_price  ? <div className='price'> {'人均：'+ datarray.hotel_price || datarray.res_price}</div> : null}
                                {issearch ? null :
                                    <div className='dis'>
                                        <Icon type="compass" style={{ color: '#1890ff' }} />
                                        <span></span>
                                        {datarray.hotel_distance || "距离景点" + (datarray.res_distance || datarray.traffic_distance) + "米"}
                                    </div>}
                            </div>
                            {!datarray.traffic_name ? <div className='location'><Icon type="environment" style={{ color: '#1890ff' }} /><span></span>{datarray.location || datarray.hotel_location || datarray.res_location}</div> : null}
                            <div className='time'>{datarray.time}</div>

                        </div>
                        <div className='phone'>{datarray.telephone}</div>
                    </div>



            </div>
        )
    }
}

export default SceneTough;