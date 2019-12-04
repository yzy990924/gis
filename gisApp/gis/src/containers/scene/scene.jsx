import React from 'react';
import SceneMap from './sceneMap.jsx'
import SceneDetail from '../../components/sceneDetail'
import { fetchData } from '../../utils/request'
import SceneMoreBox from './sceneMoreBox'
import "../../style/containers/scene.css"

let datarray =[]
let sceneID
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
                this.setState({detail:true})

            })
            .catch(e => {
            })

    }

    constructor(props) {
        super();
        console.log(props.sceneID)
        this.state = {
            detail:false
        }
        sceneID = props.sceneID
        this.searchData(props.sceneID)
    }
    

    render() {
        const { sceneID  } = this.props;
        return (
            <div id='scene'>
                {this.state.detail?<SceneDetail datarray ={datarray}/>:null}
                <SceneMap sceneID ={sceneID}/>
                <SceneMoreBox sceneID ={sceneID} />
            </div>
        )
    }
}

export default Scene;