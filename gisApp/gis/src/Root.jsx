import React, { Component } from 'react'
import { createBrowserHistory } from 'history';
import { Switch } from 'react-router-dom';
import App from './containers/App';
import Login from './containers/Login';
import { Router, Route } from 'react-router';
import './index.css';
import Contain from './containers/Contain'

class Root extends Component {

    componentWillMount(){
        window.localStorage.clear()
        window.localStorage.setItem('sid','');
        window.localStorage.setItem('user_id','');

    }

    render() {
        return (
            <div id="Root" >
                <Contain>
                    <Router history={createBrowserHistory()}>
                        <Switch>
                            <Route path="/login" component={Login} />
                            <Route path="/" component={App} />
                        </Switch>
                    </Router>
                </Contain>
            </div>
        );
    }
}
export default Root;