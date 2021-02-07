import React,{useEffect, useState} from 'react';
import { Menu, Drawer, Avatar } from 'antd';
import {MenuOutlined, HomeOutlined, GroupOutlined} from '@ant-design/icons'
import axios from 'axios';
import {withRouter} from 'react-router-dom'
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  const [Subscription, setSubscription] = useState([])
  const [visible, setVisible] = useState(false) // Drawer open

  useEffect(() => {
    const subscriptionVariable = {
      userFrom : localStorage.getItem('userId')
    }
    axios.post('/api/subscribe/getSubscribe',subscriptionVariable)
    .then(res=>{
      if(res.data.success){
        setSubscription(res.data.subscribeInfo)
      }else{
        alert('구독 정보 가져오기 실패')
      }
    })
  }, [localStorage.getItem('userId')])
  const showDrawer = () => {
    setVisible(true)
  };
  const onClose = () => {
    setVisible(false)
  };
  const userPageHandler = (subscribe) =>{
    props.history.push({
      pathname:`/userPage/${subscribe}`,
      state:{user:subscribe}
    })
  }

const renderSubscribe = Subscription.map((subscribe,index)=>{
  return (
      <Menu key={index}>
        <Menu.Item>
        <a style={{}} onClick={(e)=>userPageHandler(subscribe.userTo.name)}><Avatar src={subscribe.userTo.image}/>
        {subscribe.userTo.name}</a>
        </Menu.Item>
      </Menu>
  )
  })
  
  const menu = (
    <Menu>
    <Menu.Item>
      <a href={`/`}>{<HomeOutlined/>} 홈</a>
    </Menu.Item>

    <Menu.Item key="subscription">
      <a href="/subscription">{<GroupOutlined />} 구독</a>
    </Menu.Item>
    <hr/>
    <div style={{marginLeft:'13px'}}>구독</div> 
      <br/>
      {renderSubscribe}

    <hr/>
  </Menu>
  )
  return (
    <div>
      <MenuOutlined onClick={showDrawer} style={{marginTop:'25px'}}/>
      <Drawer 
        placement='left'
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        {menu}
      </Drawer>
    </div>
  )
}

export default withRouter(LeftMenu)