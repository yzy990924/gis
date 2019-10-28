import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';
import Main from './main/main.jsx'
import Scene from './scene/scene.jsx'
import Contain from './Contain.jsx'


class App extends Component {



    componentWillMount() {
        const { history } = this.props
        const isLoginSave = window.localStorage.getItem('isLogin')
        if (isLoginSave === 'false')
            history.push('./login');
    }

    render() {
        return (
            <div id="app">
                <Contain getSceneID={this.getSceneID}>
                <Router history={createBrowserHistory()}>
                    <Switch>
                        <Route exact path="/" component={Main} />
                        <Route path="/scene" component={Scene} />
                    </Switch>
                    </Router>
                </Contain>
            </div>
        );
    }
}



export default App;
