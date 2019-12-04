import React from 'react';
import PropTypes from 'prop-types';
import { Button, Input } from 'antd';
import "../style/login.css"
import { fetchData } from '../utils/request.js'


class Login extends React.Component {
    static propTypes = {
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
            willLogin: false,
            isLogin: false,
            login:false
        }
        localStorage.clear();
        this.handleClickButton = this.handleClickButton.bind(this)
        this.handleWillRegister = this.handleWillRegister.bind(this)
        this.handleClickRegister = this.handleClickRegister.bind(this)
    }

    componentWillMount() {
        window.localStorage.setItem('isLogin', false);
    };

    componentDidUpdate(nextProps) {

        const { history } = nextProps;
        const isLogin  = window.localStorage.getItem('isLogin')
        if (this.state.isLogin ) {

            console.log(isLogin)
            if (isLogin)
            { console.log('h');
             history.push('./main');}
        }
    }

    handleInputUname = (e) => { this.setState({ uname: e.target.value.trim() }); }

    handleInputP = (e) => { this.setState({ pwd: e.target.value.trim() }); }
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
        let request = {
            method: 'POST',
            body: JSON.stringify({
                name: uname,
                password: pwd
            }),
            headers: {
                contentType: 'application/json'
            }
        }
        this.setState({
            iconLoading: true,
            isLogin: true
        })
        this.setState({
            login:true
        })
        window.localStorage.setItem('isLogin', true);
        fetchData('login', request)
            .then(data => {
                console.log(data.user_id)
                window.localStorage.setItem('user_id',data.user_id)
                const id = window.localStorage.getItem('user_id')
                console.log(id)
                if (data.code === 1) {
                    this.setData({
                        isLogin: true
                    })
                }
            })
            .catch(e => {

            })

    }

    handleWillRegister() {
        this.setState({
            willLogin: true
        })

    }

    handleClickRegister = (e) => {
        const { uname, pwd } = this.state
        if (!uname || !pwd) {
            this.setState({
                iserror: true
            })
        }
        let request = {
            method: 'POST',
            body: JSON.stringify({
                name: uname,
                password: pwd
            }),
            headers: {
                contentType: 'application/json'
            }
        }
        this.setState({
            iconLoading: true,
        })

        fetchData('register', request)
            .then(data => {
                console.log(data)
                this.setState({
                    willLogin: false
                })
            })
            .catch(e => {

            })
    }

    render() {
        return (
            <div className='login' id='login'>
                {!this.state.willLogin ?
                    <div className='loginmain'>
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
                                    <Button type="primary" ghost loading loading={this.state.iconLoading} onClick={this.handleClickButton}>登录</Button>
                                    <Button ghost onClick={this.handleWillRegister}>注册</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <div className='loginmain'>
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
                                    <Button type="primary" ghost loading loading={this.state.iconLoading} onClick={this.handleClickRegister}>确定</Button>
                                    <Button ghost>取消</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                }

            </div>


        )
    }
}

export default Login;