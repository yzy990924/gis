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
        this.handleClickButton = this.handleClickButton.bind(this)
        this.handleWillRegister = this.handleWillRegister.bind(this)
        this.handleClickRegister = this.handleClickRegister.bind(this)
    }

   

    componentDidUpdate(nextProps) {

        const { history } = nextProps;
        const isLogin  = window.localStorage.getItem('isLogin')
        if (this.state.isLogin ) {

            console.log(isLogin)
            if (isLogin)
            { 
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
                window.localStorage.setItem('user_id',data.user_id)
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
                                    <Input placeholder='用户名' onInput={this.handleInputUname}  style = {{height:"50px",width:"400px", marginBottom:"8%"}}/>
                                </div>
                                <div className='passwd'>
                                    <Input.Password placeholder='密码' onInput={this.handleInputP} style = {{height:"50px",width:"400px", marginBottom:"8%"}} />
                                </div>
                            </div>
                            <div className='ButtonTable'>
                                <div className='loginButton'>
                                    <Button type="primary" loading loading={this.state.iconLoading} onClick={this.handleClickButton} style = {{height:"50px",width:"150px",backgroundColor:"#ffa500",borderColor:"#ffa500"}}>登录</Button>
                                    <Button onClick={this.handleWillRegister} style = {{height:"50px",width:"150px"}}>注册</Button>
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
                                    <Input placeholder='用户名' onInput={this.handleInputUname} style = {{height:"50px",width:"400px", marginBottom:"8%"}} />
                                </div>
                                <div className='passwd'>
                                    <Input.Password placeholder='密码' onInput={this.handleInputP} style = {{height:"50px",width:"400px", marginBottom:"8%"}} />
                                </div>
                            </div>
                            <div className='ButtonTable'>
                                <div className='loginButton'>
                                    <Button type="primary"loading loading={this.state.iconLoading} onClick={this.handleClickRegister} style = {{height:"50px",width:"150px",backgroundColor:"#ffa500",borderColor:"#ffa500"}}>确定</Button>
                                    <Button style = {{height:"50px",width:"150px"}}>取消</Button>
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