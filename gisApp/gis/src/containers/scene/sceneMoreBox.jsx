import React from 'react';
import SceneMap from './sceneMap.jsx'
import SceneDetail from '../../components/sceneDetail'
import { fetchData } from '../../utils/request'
import SceneTough from '../../components/sceneTough.jsx';
let hotel =[]
let restaurant = []
let traffic = [] 
let sceneID = ''
class SceneMoreBox extends React.Component {


    constructor(props) {
        super();
        console.log(props)
        sceneID = props.sceneID
        console.log(sceneID)
        this.Datafetch()
    }
    Datafetch(){
    let request = {
        method: 'POST',
        body: JSON.stringify({
            scene_id:sceneID
        }),
        headers: {
            contentType: 'application/json'
        }
    }
    
    fetchData('hotelDetail', request)
    .then(data => {
        hotel = data
    })
    .catch(e => {
    })
    fetchData('restaurantDetail', request)
    .then(data => {
        restaurant = data
    })
    .catch(e => {
    })
    fetchData('trafficDetail', request)
    .then(data => {
        traffic = data
    })
    .catch(e => {
    })

    }
    render() {
        return (
            <div id='scenemorebx'>
                {Object.keys(hotel).map((key,item)=><SceneTough key={item} result = {hotel[key]}></SceneTough>)}
                {Object.keys(restaurant).map((key,item)=><SceneTough key={item} result = {restaurant[key]}></SceneTough>)}
                {Object.keys(traffic).map((key,item)=><SceneTough key={item} result = {traffic[key]}></SceneTough>)}
            </div>
        )
    }
}

export default SceneMoreBox;