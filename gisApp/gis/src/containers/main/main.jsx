import React from 'react';
import PropTypes from 'prop-types';
import Person from './person.jsx'
import Map from './map.jsx'
import Search from './search.jsx'
import "../../style/containers/main.css"
import { Icon, Input } from 'antd';
import Scene from '../scene/scene.jsx'

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sid: '',
            isPerson: false,
            isScene: false,
            isSearchList: false,
            searchlist:''
        }
        this.changeRoot = this.changeRoot.bind(this)
        this.onClickPerson = this.onClickPerson.bind(this)
        this.onClickSearch = this.onClickSearch.bind(this)
    }


    componentWillMount() {

        console.log(this.props)

    }

    changeRoot(isScene, sceneID) {
        if (isScene) {

            if(sceneID === 50){
                this.setState({
                    sceneID:3
                })
            }else if(sceneID === 30){
                this.setState({
                    sceneID:4
                })
            }
            else if(sceneID === 55){
                this.setState({
                    sceneID:2
                })
            }
            else if(sceneID === 35){
                this.setState({
                    sceneID:6
                })
            }
            else if(sceneID === 39){
                this.setState({
                    sceneID:1
                })
            }
            else if(sceneID === 45){
                this.setState({
                    sceneID:8
                })
            }
            else if(sceneID === 53){
                this.setState({
                    sceneID:7
                })
            }
            else if(sceneID === 29){
                this.setState({
                    sceneID:5
                })
            }
            else if(sceneID === 48){
                this.setState({
                    sceneID:9
                })
            }
        }
        this.setState({
            isScene: true,
        })
    }

    getStyles() {
        let styleObj;
        styleObj = { height: window.innerHeight, width: window.innerWidth };
        return styleObj;
    }

    getStylesTop() {
        let styleObj;
        styleObj = { width: window.innerWidth * 0.95 };
        return styleObj;
    }
    onClickPerson() {
        this.setState({
            isPerson: !this.state.isPerson
        })
    }
    onClickSearch(){
        this.setState({
            isSearchList: !this.state.isSearchList
        })
    }
    handleSearch= (e) => { this.setState({ searchlist: e.target.value.trim() });console.log(this.state.searchlist) }
    render() {
        const sceneID = this.state.sceneID
        return (
            <div id='main' style={this.getStyles()}>
                {this.state.isScene ?
                    null :
                    <div>
                        <div className='topBox'>
                            <div className='top' style={this.getStylesTop()}>
                                <Icon type="user" className='user icon' style={{ color: '#efefef', fontSize: "30px" }} onClick={this.onClickPerson} />
                                <div className='inputSearch'>
                                    <Input className='inputField' onInput={this.handleSearch} />
                                    <Icon type="search" className=' search icon' style={{ color: '#efefef', fontSize: "30px" }} onClick={this.onClickSearch}/>
                                </div>
                            </div>
                        </div>
                        <div className='mainBox'>
                            {this.state.isPerson ? <Person className='side' /> : <div className='side' />}
                            <Map changeRoot={this.changeRoot} className='map' />
                            {this.state.isSearchList? <Search  searchlist = {this.state.searchlist} isSearchList = {this.state.isSearchList} />: null}
                        </div>
                    </div>
                }
                
                {this.state.isScene ? 
                <div className='scene'>
                    <Scene sceneID = {sceneID} /> 
                </div>
                : null}

            </div>
        )
    }
}

export default Main;