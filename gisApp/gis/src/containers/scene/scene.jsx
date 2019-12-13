import React from 'react';
import SceneMap from './sceneMap.jsx'
import SceneDetail from '../../components/sceneDetail'
import { fetchData } from '../../utils/request'
import SceneTough from '../../components/sceneTough'
import "../../style/containers/scene.css"
import { Icon } from 'antd';

let datarray = []
let sceneID
let hotel = []
let restaurant = []
let traffic = []
class Scene extends React.Component {

    searchData(id) {
        let request = {
            method: 'POST',
            body: JSON.stringify({
                scene_id: id
            }),
            headers: {
                contentType: 'application/json'
            }
        }
        fetchData('sceneDetail', request)
            .then(data => {
                datarray = data
                console.log(data)
                this.setState({ detail: true })

            })
            .catch(e => {
            })

    }

    constructor(props) {
        super();
        console.log(props.sceneID)
        this.state = {
            detail: false,
            ishotel: false,
            isres: false,
            istra: false
        }
        sceneID = props.sceneID
        this.searchData(props.sceneID)
        this.Datafetch()
    }

    handleBack = () => {
        const { setValue } = this.props;
        setValue(true);
    }

    Datafetch() {
        let request = {
            method: 'POST',
            body: JSON.stringify({
                scene_id: sceneID
            }),
            headers: {
                contentType: 'application/json'
            }
        }

        fetchData('hotelDetail', request)
            .then(data => {
                hotel = data
                this.setState({ ishotel: true })
            })
            .catch(e => {
            })
        fetchData('restaurantDetail', request)
            .then(data => {
                restaurant = data
                this.setState({ isres: true })
            })
            .catch(e => {
            })
        fetchData('trafficDetail', request)
            .then(data => {
                traffic = data
                this.setState({ istra: true })
            })
            .catch(e => {
            })

    }

    render() {
        const { sceneID } = this.props;
        return (
            <div id='scene'>
                <div className='back' onClick={this.handleBack}>
                    <Icon type="left" />返回
                </div>
                {this.state.detail ? <div className = "SceneDetail">  <SceneDetail datarray={datarray}/></div> : null}
                <SceneMap sceneID={sceneID} />
                <div id='scenemorebx'>
                    {this.state.ishotel ?
                        <div className='hotel otherbox'>
                            <div className = 'hotelname topic'>HOTEL</div>
                            {Object.keys(hotel).map((key, item) => <SceneTough key={item} result={hotel[key]} type={"hotel"}></SceneTough>)}
                        </div> : null}
                    {this.state.isres ?
                        <div className='res otherbox'>
                            <div className = 'resname topic'>RESTAURANT</div>
                            {Object.keys(restaurant).map((key, item) => <SceneTough key={item} result={restaurant[key]} type={"res"}></SceneTough>)}
                        </div>
                        : null}
                    {this.state.istra ?
                        <div className="tra otherbox">
                            <div className = 'traname topic'>TRAFFIC</div>
                            {Object.keys(traffic).map((key, item) => <SceneTough key={item} result={traffic[key]} type={"tra"}></SceneTough>)}
                        </div>
                        : null}
                </div>
            </div>
        )
    }
}

export default Scene;