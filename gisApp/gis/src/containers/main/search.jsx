import React from 'react';
import PropTypes from 'prop-types';
import SceneTough from '../../components/sceneTough'
import { Button, Input } from 'antd'
import '../../style/containers/person.css'
import { fetchData } from '../../utils/request.js'
import '../../style/containers/search.css'
let namelist = []
let typelist = []
let loclist = []
class Search extends React.Component {
    constructor(props) {
        super();
        this.state = {
            display: ['block', 'none', 'none'],
            searchArray: [],
            isfetch:[false,false,false]
        }
        this.onchangeBoxA = this.onchangeBoxA.bind(this)
        this.onchangeBoxB = this.onchangeBoxB.bind(this)
        this.onchangeBoxC = this.onchangeBoxC.bind(this)
    }
    componentWillMount() {
        this.searchName()
    }

    searchName() {
        const { isSearchList, searchlist } = this.props
        let api = ''
        let request
        namelist = []
        if (isSearchList) {
            if (1) {
                api = 'searchName';
                request = {
                    method: 'POST',
                    body: JSON.stringify({
                        name: searchlist
                    }),
                    headers: {
                        contentType: 'application/json'
                    }
                }
                fetchData(api, request)
                    .then(data => {
                        Object.keys(data).map((key, item) => {
                            request = {
                                method: 'POST',
                                body: JSON.stringify({
                                    scene_id: data[key].id
                                }),
                                headers: {
                                    contentType: 'application/json'
                                }
                            }
                            fetchData('hover', request)
                                .then(data => {
                                    namelist[key] = data
                                    this.setState({
                                        isfetch:[true,false,false]
                                    })
                                })
                                .catch(e => {
                                })
                        })


                    })
                    .catch(e => {
                    })
            }
        }
        else {
            request = {
                method: 'POST',
                body: JSON.stringify({
                    name: searchlist
                }),
                headers: {
                    contentType: 'application/json'
                }
            }
            fetchData(api, request)
                .then(data => {
                    Object.keys(data).map((key, item) => {
                        request = {
                            method: 'POST',
                            body: JSON.stringify({
                                scene_id: data[key].id
                            }),
                            headers: {
                                contentType: 'application/json'
                            }
                        }
                        fetchData('hover', request)
                            .then(data => {
                                namelist[key] = data
                                this.setState({
                                    isfetch:[true,false,false]
                                })
                            })
                            .catch(e => {
                            })
                    })

                })
                .catch(e => {
                })
        }
        this.setState({
            isfetch:true
        })
    }
    componentWillMount() {
        this.onchangeBoxA()
    }
    searchLoc() {
        const { isSearchList, searchlist } = this.props
        let api = ''
        let request
        loclist = []
        if (isSearchList) {
            if (1) {
                api = 'searchLocation'
                request = {
                    method: 'POST',
                    body: JSON.stringify({
                        location: searchlist
                    }),
                    headers: {
                        contentType: 'application/json'
                    }
                }
                fetchData(api, request)
                    .then(data => {
                        Object.keys(data).map((key, item) => {
                            request = {
                                method: 'POST',
                                body: JSON.stringify({
                                    scene_id: data[key].id
                                }),
                                headers: {
                                    contentType: 'application/json'
                                }
                            }
                            fetchData('hover', request)
                                .then(data => {
                                    loclist[key] = data
                                    this.setState({
                                        isfetch:[false,true,false]
                                    })
                                })
                                .catch(e => {
                                })
                        })
                    })
                    .catch(e => {
                    })
            }
        }
    }

    searchType() {
        const { isSearchList, searchlist } = this.props
        let api = ''
        let request
        typelist = []
        if (isSearchList) {
            if (1) {
                api = 'searchType'
                request = {
                    method: 'POST',
                    body: JSON.stringify({
                        type: searchlist
                    }),
                    headers: {
                        contentType: 'application/json'
                    }
                }
                fetchData(api, request)
                    .then(data => {
                        Object.keys(data).map((key, item) => {
                            request = {
                                method: 'POST',
                                body: JSON.stringify({
                                    scene_id: data[key].id
                                }),
                                headers: {
                                    contentType: 'application/json'
                                }
                            }
                            fetchData('hover', request)
                                .then(otherdata => {
                                    typelist[key] = otherdata
                                    this.setState({
                                        isfetch:[false,false,true]
                                    })
                                })
                                .catch(e => {
                                })
                        })


                    })
                    .catch(e => {
                    })
            }
        }

    }


    getStylesA() {
        let styleObj;
        styleObj = { display: this.state.display[0] };

        return styleObj;
    }
    getStylesB() {
        let styleObj;
        styleObj = { display: this.state.display[1] };

        return styleObj;
    }
    getStylesC() {
        let styleObj;
        styleObj = { display: this.state.display[2] };

        return styleObj;
    }

    onchangeBoxA() {
        this.setState({
            display: ['block', 'none', 'none']
        })
        this.searchName()
    }
    onchangeBoxB() {
        this.setState({
            display: ['none', 'block', 'none']
        })
        this.searchLoc()
    }

    onchangeBoxC() {
        this.setState({
            display: ['none', 'none', 'block']
        })
        this.searchType()
    }
    render() {
        const display = this.state

        return (
            <div id='Search'>
                <div className='personBox'>
                    <div className='personbutton'>
                        <Button onClick={this.onchangeBoxA} >
                            名称
                        </Button>
                        <Button onClick={this.onchangeBoxB}>
                            位置
                        </Button>
                        <Button onClick={this.onchangeBoxC}>
                            类别
                        </Button>
                    </div>
                    {this.state.isfetch[0] ?
                        <div className='collection' onClick={this.onchangeBoxA}>
                            {
                                Object.keys(namelist).map((key, item) => 
                                    <SceneTough key={item} result={namelist[key]} />
                                )
                            }
                        </div> : null}
                    {this.state.isfetch[1]?
                    <div className='transtion' style={this.getStylesB()} onClick={this.onchangeBoxB}>
                        {
                            Object.keys(loclist).map((key, item) =>
                                <SceneTough key={item} result={loclist[key]}></SceneTough>
                            )
                        }
                    </div>:null}
                    {this.state.isfetch[2]?
                    <div className='profile' style={this.getStylesC()} onClick={this.onchangeBoxC}>

                        {
                            Object.keys(typelist).map((key, item) =>
                                <SceneTough key={item} result={typelist[key]}></SceneTough>
                            )
                        }
                    </div>:null}
                   
                </div>
            </div>
        )
    }
}

export default Search;