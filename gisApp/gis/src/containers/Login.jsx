import React from 'react';
import PropTypes from 'prop-types';
import { Button, Input } from 'antd';
import "../style/login.css"
import { fetchData } from '../utils/request.js'

function fetchLogin(apiPath, request = {}) {
    return new Promise((resolve, reject) => {
        fetchData(apiPath, request = {})
            .then(data => {
                resolve(data)
            })
            .catch(e => {
                reject(e)
            })
    })
}

class Login extends React.Component {
    static propTypes = {
        isLogin: PropTypes.bool.isRequired,
        error: PropTypes.string,
    };
    constructor() {
        super();
        this.state = {
            uname: '',
            pwd: '',
            iserror: false,
            errorMsg: '输入不能为空',
            loading: false,
            iconLoading: false,
            login:false
        }
        localStorage.clear();
    }
    
    componentWillMount(){
        console.log('c');
        window.localStorage.setItem('isLogin',false);
        console.log(window.localStorage)
    };

    componentDidUpdate (nextProps) {
        const isLogin = window.localStorage.getItem('isLogin')
        const {history} = nextProps;
        if (!(isLogin === 'true') && true) {
            window.localStorage.setItem('isLogin',true);
            history.push( '/');
        }
    }
    
    handleInputSid = (e) => { this.setState({ uname: +e.target.value.trim() }); console.log(this.uname); }

    handleInputSname = (e) => { this.setState({ pwd: e.target.value.trim() }); console.log(this.pwd); }
    enterLoading = () => {
        this.setState({ loading: true });
    };


    handleClickButton = (e) => {
        const { uname, pwd } = this.state
        if (!uname || !pwd) {
            this.setState({
                iserror: true
            })
        }
        let request =  {
            method: 'POST',
            body: JSON.stringify({
                uname: uname,
                pwd: pwd
            }),
            headers: {
                contentType: 'application/json'
            }
        }
        this.setState({
            iconLoading: true,
            login : true
        })
        

        fetchLogin('login', request).then(data => {
            let that = this;
            console.log(data);
            if(data.errcode = 0){
             this.setData({
                 isLogin : true
             })
            }
        })
    }

    render() {
        return (
            <div className='login' id='login'>
                <div className='background'></div>
                <div className='loginTable'>
                    <div className='InputTable'>
                        <div className='username'>
                            <Input placeholder='用户名' onInput={this.handleInputUname} />
                        </div>
                        <div className='passwd'>
                            <Input.Password placeholder='密码' onInput={this.handleInputP} />
                        </div>
                    </div>
                    <div className='ButtonTable'>
                        <div className='loginButton'>
                            <Button type="primary" ghost loading loading={this.state.iconLoading}  onClick={this.handleClickButton}>登录</Button>
                            <Button ghost>注册</Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;