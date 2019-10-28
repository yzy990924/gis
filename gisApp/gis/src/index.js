import React from 'react';
import 'es6-shim';
import App from './containers/App';
import Login from './containers/Login';
import { createBrowserHistory } from 'history';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Router, Route,Switch } from 'react-router';
import Root from './Root';
import './index.css';

ReactDOM.render(
<Root/>
  , document.getElementById('root'))

serviceWorker.unregister();