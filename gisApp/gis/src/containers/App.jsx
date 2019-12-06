import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';
import Main from './main/main.jsx'
import Contain from './Contain.jsx'


class App extends Component {



    componentWillMount() {
        const { history } = this.props
        const isLoginSave = window.localStorage.getItem('isLogin')
        if (!isLoginSave)
            history.push('./login');
        console.log(this.props)
    }

    render() {
        return (
            <div id="app">
                <Contain>
                <Router history={createBrowserHistory()}>
                        <Route exact path="/main" component={Main} />
                    </Router>
                </Contain>
            </div>
        );
    }
}



export default App;
