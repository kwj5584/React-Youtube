import React,{useEffect, useState} from 'react';
import {useSelector} from 'react-redux'
import { Menu, Dropdown } from 'antd';
import {MenuOutlined, HomeOutlined, GroupOutlined} from '@ant-design/icons'
import axios from 'axios';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  // const user = useSelector(state => state.user)
  const [Video, setVideo] = useState([])
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
  }, [])
  if(Video){
  
  for(let i=0; i<Video.length; i++){
    Subscribe.push(Video[i].writer.name)
  }
}
const SubscribeUser = new Set(Subscribe)
console.log('leftmenu:',SubscribeUser)
  const menu = (
    <Menu mode={props.mode}>
    <Menu.Item>
      <a href='/'>{<HomeOutlined/>} 홈</a>
    </Menu.Item>

    <Menu.Item key="subscription">
      <a href="/subscription">{<GroupOutlined />} 구독</a>
    </Menu.Item>
    <hr/>
    <div style={{marginLeft:'13px'}}>구독</div>
    <Menu.Item>
      {SubscribeUser}
    </Menu.Item>
  </Menu>
  )
  return (
    <Dropdown overlay={menu}>
      <MenuOutlined style={{marginTop:'25px'}}/>
    </Dropdown>
  )
}

export default LeftMenu
