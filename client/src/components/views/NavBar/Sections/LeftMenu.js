import React,{useEffect, useState} from 'react';
import { Menu, Drawer } from 'antd';
import {MenuOutlined, HomeOutlined, GroupOutlined} from '@ant-design/icons'
import axios from 'axios';
import {withRouter} from 'react-router-dom'
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  const [Video, setVideo] = useState([])
  const [visible, setVisible] = useState(false)

  
  const Subscribe = [];
  useEffect(() => {
      const subscriptionVariable = {
        userFrom : localStorage.getItem('userId')
      }
    axios.post('/api/video/getSubscriptionVideos',subscriptionVariable)
    .then(res=>{
      if(res.data.success){
        setVideo(res.data.videos)
    } else{
        alert('비디오 가져오기 실패')
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
  for(let i=0; i<Video.length; i++){
    Subscribe.push(Video[i].writer.name)
  }
const SubscribeUser = new Set(Subscribe)

const renderSubscribe = SubscribeUser.map((subscribe,index)=>{
  return (
      <Menu key={index}>
        <Menu.Item>
        <a onClick={(e)=>userPageHandler(subscribe)}>{subscribe}</a>
        </Menu.Item>
      </Menu>
  )
  })
  const menu = (
    <Menu>
    <Menu.Item>
      <a href={`/userPage`}>{<HomeOutlined/>} 홈</a>
    </Menu.Item>

    <Menu.Item key="subscription">
      <a href="/subscription">{<GroupOutlined />} 구독</a>
    </Menu.Item>
    <hr/>
    <div style={{marginLeft:'13px'}}>구독</div>
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