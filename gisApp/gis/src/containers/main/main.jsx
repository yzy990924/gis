import React from 'react';
import PropTypes from 'prop-types';
import Person from './person.jsx'
import Map from './map.jsx'
import Search from './search.jsx'
import "../../style/containers/main.css"
import { Icon, Input } from 'antd';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sid: '',
            isPerson: false
        }
        this.changeRoot = this.changeRoot.bind(this)
        this.onClickPerson = this.onClickPerson.bind(this)
    }


    componentWillMount() {
        console.log('main')
        console.log(this.props)

    }

    changeRoot(isScene) {
        console.log(window.localStorage.getItem('sid'))

        const { history } = this.props
        console.log(history)
        if (isScene) {
            console.log('a')
            history.push('./scene')
        }
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
    render() {
        return (
            <div id='main' style={this.getStyles()}>
                <div className='topBox'>
                    <div className='top' style={this.getStylesTop()}>
                        <Icon type="user" className='user icon' style={{ color: '#efefef', fontSize: "30px" }} onClick={this.onClickPerson} />
                        <div className='inputSearch'>
                            <Input className='inputField' />
                            <Icon type="search" className=' search icon' style={{ color: '#efefef', fontSize: "30px" }} />
                        </div>
                    </div>
                </div>
                <div className='mainBox'>
                    {this.state.isPerson ? <Person className='side' /> : <div className='side' />}

                    <Map changeRoot={this.changeRoot} className='map' />
                </div>

            </div>
        )
    }
}

export default Main;