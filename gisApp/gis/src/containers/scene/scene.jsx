import React from 'react';
import SceneMap from './sceneMap.jsx'

class Scene extends React.Component {


    render() {
        const { sceneID  } = this.props;
        return (
            <div id='scene'>
                <SceneMap sceneID ={sceneID}/>
            </div>
        )
    }
}

export default Scene;