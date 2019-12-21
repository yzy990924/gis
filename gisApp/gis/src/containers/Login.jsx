import React from 'react';
import PropTypes from 'prop-types';
import { Button, Input, Alert } from 'antd';
import "../style/login.css"
import { fetchData } from '../utils/request.js'

let uid
let next
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
            login: false,
            isalert: false
        }
        this.handleClickButton = this.handleClickButton.bind(this)
        this.handleWillRegister = this.handleWillRegister.bind(this)
        this.handleClickRegister = this.handleClickRegister.bind(this)
    }



    componentDidUpdate(nextProps) {
        next = nextProps
        const { history } = nextProps;
        const isLogin = window.localStorage.getItem('isLogin')
        if (this.state.login) {
            if (isLogin) {
                console.log('a')
                window.localStorage.setItem('user_id', uid)
                history.push('./main')
            }
        }
    }

    change(nextProps) {
        const { history } = nextProps;
        const isLogin = window.localStorage.getItem('isLogin')
        if (isLogin) {
            console.log('a')
            window.localStorage.setItem('user_id', uid)
            history.push('./main')
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

        fetchData('login', request)
            .then(data => {
                console.log(data.code == 1)
                if (data.code == 1) {
                    window.localStorage.setItem('user_id', data.user_id)
                    uid = data.user_id
                    window.localStorage.setItem('isLogin', true)
                    console.log(uid)
                    this.change(next)
                    this.setData({
                        isLogin: true,
                        login: true
                    })
                    setTimeout(this.a(next), 1000)

                }
                else {
                    console.log('error')
                    this.setState({
                        isalert: true
                    })
                }
            })
            .catch(e => {
                console.log('error')
                this.setState({
                    isalert: true
                })
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
                if (data.code == 0) {
                    this.setState({
                        willLogin: false,
                        iconLoading: false
                    })
                }
            })
            .catch(e => {
                console.log('error')
                this.setState({
                    isalert: true
                })
            })
    }
    oncancel() {
        this.setState({
            willLogin: false
        })
    }

    onClose = e => {
        console.log(e, 'I was closed.');
      };
    render() {
        return (
            
            <div>
                {this.state.isalert?<Alert
      message="Error"
      description="登录失败"
      type="error"
      closable
      onClose={this.onClose}
    />:null}
                <div className='login' id='login'>
                {!this.state.willLogin ?
                    <div className='loginmain'>
                        <div className='background'></div>
                        <div className='loginTable'>
                            <div className='InputTable'>
                                <div className='username'>
                                    <Input placeholder='用户名' onInput={this.handleInputUname} style={{ height: "50px", width: "400px", marginBottom: "8%" }} />
                                </div>
                                <div className='passwd'>
                                    <Input.Password placeholder='密码(至少6位)' onInput={this.handleInputP} style={{ height: "50px", width: "400px", marginBottom: "8%" }} />
                                </div>
                            </div>
                            <div className='ButtonTable'>
                                <div className='loginButton'>
                                    <Button type="primary" loading loading={this.state.iconLoading} onClick={this.handleClickButton} style={{ height: "50px", width: "150px", backgroundColor: "#ffa500", borderColor: "#ffa500" }}>登录</Button>
                                    <Button onClick={this.handleWillRegister} style={{ height: "50px", width: "150px" }}>注册</Button>
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
                                    <Input placeholder='用户名' onInput={this.handleInputUname} style={{ height: "50px", width: "400px", marginBottom: "8%" }} />
                                </div>
                                <div className='passwd'>
                                    <Input.Password placeholder='密码' onInput={this.handleInputP} style={{ height: "50px", width: "400px", marginBottom: "8%" }} />
                                </div>
                            </div>
                            <div className='ButtonTable'>
                                <div className='loginButton'>
                                    <Button type="primary" loading loading={this.state.iconLoading} onClick={this.handleClickRegister} style={{ height: "50px", width: "150px", backgroundColor: "#ffa500", borderColor: "#ffa500" }}>确定</Button>
                                    <Button style={{ height: "50px", width: "150px" }} onClick={this.oncancel}>取消</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                }

                </div>
               
            </div>


        )
    }
}

export default Login;