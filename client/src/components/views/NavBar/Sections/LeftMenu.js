import React,{useEffect, useState} from 'react';
import { Menu,  Avatar , } from 'antd';
import {HomeOutlined, GroupOutlined} from '@ant-design/icons'
import axios from 'axios';
import {withRouter} from 'react-router-dom'

function LeftMenu(props) {
  const [Subscription, setSubscription] = useState([])

  useEffect(() => {
    const subscriptionVariable = {
      userFrom : sessionStorage.getItem('userId')
    }
    axios.post('/api/subscribe/getSubscribe',subscriptionVariable)
    .then(res=>{
      if(res.data.success){
        setSubscription(res.data.subscribeInfo)
      }else{
        alert('구독 정보 가져오기 실패')
      }
    })
  }, [Subscription])

  const userPageHandler = (subscribe) =>{
    props.history.push({
      pathname:`/userPage/${subscribe}`,
      state:{user:subscribe}
    })
  }

const renderSubscribe = Subscription.map((subscribe, index)=>{
  return (
      <Menu 
      mode='inline' 
      key={subscribe._id} 
      onClick={(_e)=>userPageHandler(subscribe.userTo.name)} 
      triggerSubMenuAction='click'
      >
        <Menu.Item key={index} >
          <Avatar src={subscribe.userTo.image}/> &nbsp;&nbsp;&nbsp;
          {subscribe.userTo.name}
        </Menu.Item>
      </Menu>
  )
  })
  
  const menu = (
    <div>
      <br/><br/>
      <Menu mode='inline'>
      <Menu.Item >
        <a href={`/`} ><HomeOutlined/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 홈</a>
      </Menu.Item>
      <Menu.Item>
        <a href="/subscription"><GroupOutlined/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;구독</a>
      </Menu.Item>
      <hr/>
      {Subscription.length!==0 && 
      <div>
      <div style={{marginLeft:'13px'}}>구독</div> 
        <br/>
        {renderSubscribe}
      <hr/>
      </div>
      }
    </Menu>
  </div>
  )
  
  return (
    <div>
      {menu}
    </div>
  )
}

export default withRouter(LeftMenu)