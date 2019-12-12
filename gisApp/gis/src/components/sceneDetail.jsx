import React from 'react';
import { Icon } from 'antd';
import { Modal, Button, message } from 'antd';
import { fetchData } from '../utils/request'
import "../style/components/sceneDetail.css"

let id
const { confirm } = Modal;
let sceneID = ''

const success = () => {
    message.success('This is a success message');
  };
  
  const error = () => {
    message.error('This is an error message');
  };
  


class sceneDetail extends React.Component {

    constructor(props) {
        super();
        sceneID = props;
        console.log(props)
        id = window.localStorage.getItem('user_id')

    }

    showConfirm() {

        confirm({
            title: '确定将其加入我的收藏中吗',
            content: 'When clicked the OK button, this dialog will be closed after 1 second',
            onOk() {
                let request = {
                    method: 'POST',
                    body: JSON.stringify({
                        scene_id: sceneID,
                        user_id: window.localStorage.getItem('user_id')
                    }),
                    headers: {
                        contentType: 'application/json'
                    }
                }
                fetchData('addScene', request)
                    .then(data => {
                        console.log(data.code)
                        if (data.code === 0) {
                            error()
                        }
                        else success()
                    })
                    .catch(e => {

                    })
            },
            onCancel() { },
        });
    }
    

    render() {
        const datarray = this.props
        return (
            <div id='SceneDetail'>
                <div className='sceneBox'>
                    <div className='head'>
                        {datarray.datarray.scene_name}
                    </div>
                    <div className='main'>
                        <div className='type_score'>
                            <div className='type'><Icon type="tag" style={{ color: '#1890ff'}}/><span></span>{datarray.datarray.scene_type}</div>
                            <div className='score'><Icon type="star" theme="filled" style={{ color: '#ffff00'}}/><Icon type="star" theme="filled" style={{ color: '#ffff00'}}/><Icon type="star" theme="filled" style={{ color: '#ffff00'}}/><Icon type="star" theme="filled" style={{ color: '#ffff00'}}/><Icon type="star" theme="filled" style={{ color: '#ffff00'}}/>
                            <span></span>
                            {datarray.datarray.scene_score}</div>
                        </div>
                        <div className='location'><Icon type="environment" style={{ color: '#1890ff'}} /><span></span>{datarray.datarray.scene_location}</div>
                        <div className='time'><Icon type="clock-circle" style={{ color: '#1890ff'}} /><span></span>{datarray.datarray.scene_time}</div>
                        <div className='phone'><Icon type="phone" style={{ color: '#1890ff'}} /><span></span>
                            {datarray.datarray.scene_telephone}</div>
                    </div>
                    
                </div>
                <div className="addfavbtn" onClick={this.handlecollection}>
                    <Button  onClick={this.showConfirm} ><Icon type="heart" theme="twoTone" twoToneColor="#eb2f96"></Icon>点击收藏</Button>
                </div>
            </div>
        )
    }
}

export default sceneDetail;