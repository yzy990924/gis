import React from 'react';
import PropTypes from 'prop-types';
import SceneTough from '../../components/sceneTough'
import { Button, Input } from 'antd'
import '../../style/containers/person.css'
class Person extends React.Component {
    constructor() {
        super();
        this.state = {
            display: ['block', 'none', 'none']
        }
        this.onchangeBoxA = this.onchangeBoxA.bind(this)
        this.onchangeBoxB = this.onchangeBoxB.bind(this)
        this.onchangeBoxC = this.onchangeBoxC.bind(this)
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
        const display  =  this.state.display
        return (
            <div id='Person'>
                <div className='personBox'>
                    <div className='personbutton'>
                        <Button onClick={this.onchangeBoxA} >
                            收藏
                        </Button>
                        <Button onClick={this.onchangeBoxB}>
                            路径
                        </Button>
                        <Button onClick={this.onchangeBoxC}>
                            资料
                        </Button>
                    </div>

                    <div className='collection' style={this.getStylesA()}>

                        <SceneTough />
                    </div>
                    <div className='transtion' style={this.getStylesB()} onClick={this.onchangeBoxA}>

                        <div >
                            lujing
                        </div>
                    </div>
                    <div className='profile' style={this.getStylesC()} onClick={this.onchangeBoxB}>

                        <div>
                            huhu
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Person;