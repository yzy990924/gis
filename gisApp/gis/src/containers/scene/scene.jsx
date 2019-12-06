import React from 'react';
import SceneMap from './sceneMap.jsx'
import SceneDetail from '../../components/sceneDetail'
import { fetchData } from '../../utils/request'
import SceneTough from '../../components/sceneTough'
import "../../style/containers/scene.css"

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
                console.log(datarray)
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
                    <svg t="1575646291983" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4438" width="48" height="48"><path d="M766.862 1021.724c-10.24 0-20.594-3.64-28.444-10.922L228.693 538.396c-15.701-14.563-15.701-38.229 0-52.792L738.418 13.198c15.701-14.563 41.187-14.563 56.889 0 15.701 14.564 15.701 38.23 0 52.793L314.027 512l481.28 446.009c15.701 14.563 15.701 38.23 0 52.793-7.851 7.282-18.205 10.922-28.445 10.922z" fill="#333333" p-id="4439"></path></svg>
                </div>
                {this.state.detail ? <SceneDetail datarray={datarray} /> : null}
                <SceneMap sceneID={sceneID} />
                <div id='scenemorebx'>
                    {this.state.ishotel ?
                        <div className='hotel'>
                            {Object.keys(hotel).map((key, item) => <SceneTough key={item} result={hotel[key]} type={"hotel"}></SceneTough>)}
                        </div> : null}
                    {this.state.isres ?
                        <div className='res'>
                            {Object.keys(restaurant).map((key, item) => <SceneTough key={item} result={restaurant[key]} type={"res"}></SceneTough>)}
                        </div>
                        : null}
                    {this.state.istra ?
                        <div className="tra">
                            {Object.keys(traffic).map((key, item) => <SceneTough key={item} result={traffic[key]} type={"tra"}></SceneTough>)}
                        </div>
                        : null}
                </div>
            </div>
        )
    }
}

export default Scene;