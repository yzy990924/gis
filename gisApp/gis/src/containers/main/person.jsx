import React from 'react';
import PropTypes from 'prop-types';
import SceneTough from '../../components/sceneTough'
import { Button, Input } from 'antd'
import '../../style/containers/person.css'
import { fetchData } from '../../utils/request.js'
import { createSign } from 'crypto';
let myscene = []
class Person extends React.Component {
    constructor() {
        super();
        this.state = {
            display: ['block', 'none', 'none'],
            ismy:false
        }
        this.onchangeBoxA = this.onchangeBoxA.bind(this)
        this.onchangeBoxB = this.onchangeBoxB.bind(this)
        this.onchangeBoxC = this.onchangeBoxC.bind(this)

    }
    UNSAFE_componentWillMount(){
        this.fetch()
    }

    fetch(){
        myscene = []
        let request = {
            method: 'POST',
            body: JSON.stringify({
                user_id:window.localStorage.getItem('user_id')
            }),
            headers: {
                contentType: 'application/json'
            }
        }
    
        fetchData('getScene', request)
            .then(data => {
                console.log(data)
                Object.keys(data).map((key, item) => {
                    request = {
                        method: 'POST',
                        body: JSON.stringify({
                            scene_id: data[key]
                        }),
                        headers: {
                            contentType: 'application/json'
                        }
                    }
                    fetchData('hover', request)
                        .then(otherdata => {
                            Object.keys(data).map((key, item) => {
                                console.log(data[key])
                                request = {
                                    method: 'POST',
                                    body: JSON.stringify({
                                        scene_id: data[key]
                                    }),
                                    headers: {
                                        contentType: 'application/json'
                                    }
                                }
                                fetchData('hover', request)
                                    .then(otherdata => {
                                        myscene[key] = otherdata
                                        console.log(myscene[key])
                                        this.setState({
                                           ismy:true
                                        })
                                    })
                                    .catch(e => {
                                    })
                            })
                        })
                        .catch(e => {
                        })
                })
            })
            .catch(e => {
            })
    
    
    }
    getStylesA() {
        let styleObj;
        styleObj = { display:this.state.display[0] };

        return styleObj;
    }
    getStylesB() {
        let styleObj;
        styleObj = { display:this.state.display[1] };

        return styleObj;
    }
    getStylesC() {
        let styleObj;
        styleObj = { display:this.state.display[2] };

        return styleObj;
    }
    onchangeBoxA() {
        this.setState({
            display: ['block', 'none', 'none']
        }) 

    }
    onchangeBoxB() {
        this.setState({
            display: ['none', 'block', 'none']
        })
    }

    onchangeBoxC() {
        this.setState({
            display: ['none', 'none', 'block']
        })
    }
    render() {

        return (
            <div id='Person'>
                <div className='personBox'>
                    <div className='collection' style={this.getStylesA()}>
                    {this.state.ismy?
                                Object.keys(myscene).map((key, item) => 
                                    <SceneTough key={item} result={myscene[key]} />
                                ):null
                            }
                    </div>
                </div>
            </div>
        )
    }
}

export default Person;