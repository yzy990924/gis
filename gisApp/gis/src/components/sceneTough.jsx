import React from 'react';
import "../style/components/sceneTough.css"



class SceneTough extends React.Component {
    
    constructor(props) {
        super();
        this.state = ({
            id: '',
            isfetch: false,
            isScene: false
        })
        this.onsceneMap = this.onsceneMap.bind(this)
    }
    
    onsceneMap(){
        this.setState({
            isScene:true
        })
    }

    render() {
        const datarray  = this.props.result
        const issearch =  this.props.issearch
        return (
            <div id={datarray.name?'Myscene':'SceneTough '}>
                <div className='sceneBox' onClick = {issearch? this.onsceneMap:null}>
                    <div className='toughhead'>
                        <div >
                        {datarray.name||datarray.hotel_name||datarray.res_name||datarray.traffic_name}
                        </div>
                        {issearch?<Icon type="star" />:null}
                    </div>
                    <div className='main'>
                        <div className='type_score'>
                            <div className='type'>{datarray.type||datarray.res_type}</div>
                            {issearch?null:<div className ='dis'>{datarray.hotel_distance||datarray.traffic_distance||"距离景点"+(datarray.res_distance||datarray.traffic_distance)+"米"}</div>}
                            {datarray.traffic_score?<div className='score'>{datarray.score||datarray.hotel_score||datarray.res_score}</div>:null}
                            {datarray.traffic_score?<div className='price'>人均： {datarray.hotel_price||datarray.res_price}</div>:null}
                        </div>
                        <div className = 'location'>{datarray.location||datarray.hotel_location||datarray.res_location}</div>
                        <div className = 'time'>{datarray.time}</div>

                    </div>
                    <div className = 'phone'>{datarray.telephone}</div>
                </div>
                {this.state.isScene ?
                    <div className='scene'>
                        <Scene sceneID={datarray.id}/>
                    </div>
                    : null}
            </div>
        )
    }
}

export default SceneTough;