import React from 'react';
import PropTypes from 'prop-types';
import Person from './person.jsx'
import Map from './map.jsx'
import Search from './search.jsx'
import "../../style/containers/main.css"
import { Icon, Input, Drawer } from 'antd';
import Scene from '../scene/scene.jsx'
import { fetchData } from '../../utils/request.js'
import Pie from './pie'

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sid: '',
            isPerson: false,
            isScene: false,
            isSearchList: false,
            searchlist: '',
            visible: false,
            placement: 'left',
            value: '',
            isbing:false,
        }
        this.changeRoot = this.changeRoot.bind(this)
        this.onClickPerson = this.onClickPerson.bind(this)
        this.onClickSearch = this.onClickSearch.bind(this)
    }

  showDrawer = () => {
    this.setState({
      visible: !this.state.visible,
    });
  };


  onClose = () => {
    this.setState({
      visible: !this.state.visible,
    });
  };

 

    changeRoot(isScene, sceneID) {
        if (isScene) {
            if (sceneID === 42) {
                this.setState({
                    sceneID: 3
                })
            } else if (sceneID === 41) {
                this.setState({
                    sceneID: 4
                })
            }
            else if (sceneID === 40) {
                this.setState({
                    sceneID: 2
                })
            }
            else if (sceneID === 39) {
                this.setState({
                    sceneID: 6
                })
            }
            else if (sceneID === 38) {
                this.setState({
                    sceneID: 1
                })
            }
            else if (sceneID === 37) {
                this.setState({
                    sceneID: 8
                })
            }
            else if (sceneID === 36) {
                this.setState({
                    sceneID: 7
                })
            }
         
            else if (sceneID === 34) {
                this.setState({
                    sceneID: 9
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
        styleObj = { width: window.innerWidth  };
        return styleObj;
    }
    onClickPerson() {
        this.setState({
            isPerson: !this.state.isPerson
        })
    }
    onClickSearch() {
        this.setState({
            isSearchList: !this.state.isSearchList
        })
    }
    handleSearch = (e) => { this.setState({ searchlist: e.target.value.trim() }); console.log(this.state.searchlist) }

    setValue = value => {
        if(value){
            this.setState({
                isScene:false
            })
        }
      }

    isSearchScene = value=>{
        if(value){
            this.setState({
                sceneID: value,
                isScene:true
            })
        }
    }
    
    render() {
        const sceneID = this.state.sceneID
        return (
            <div id='main' style={this.getStyles()}>
                {this.state.isScene ?
                    null :
                    <div>
                         <Drawer
                                title="个人收藏"
                                placement={this.state.placement}
                                closable={false}
                                onClose={this.onClose}
                                visible={this.state.visible}
                                getContainer={false}
                            >
                            <Person/> 
                            </Drawer>
                           
                        <div className='topBox'>
                            <div className='top' style={this.getStylesTop()}>
                                <div className = 'usericon' onClick={this.showDrawer}>
                                <Icon type="user" className='user icon' style={{ color: '#ffffff', fontSize: "40px" }}  onClick={this.showDrawer}/>
                                    </div> 
                                <div className='inputSearch'>
                                    <Input className='inputField' onInput={this.handleSearch} style = {{height:'45px'}} />
                                    <div className = 'searchicon'>
                                    <Icon type="search" className=' search icon' style={{ color: '#ffffff', fontSize: "40px" }} onClick={this.onClickSearch} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='mainBox'>
                            <Pie className='pie'/>
                            <Map changeRoot={this.changeRoot} className='map' />
                            {this.state.isSearchList ? <Search searchlist={this.state.searchlist} isSearchList={this.state.isSearchList} isSearchScene={this.isSearchScene} /> : <div />}
                        </div>
                    </div>
                }

                {this.state.isScene ?
                    <div className='scene'>
                        <Scene sceneID={sceneID} setValue={this.setValue} />
                    </div>
                    : null}

            </div>
        )
    }
}

export default Main;