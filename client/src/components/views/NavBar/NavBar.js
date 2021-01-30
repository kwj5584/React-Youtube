import React, { useState } from 'react';
import LeftMenu from './Sections/LeftMenu';
import RightMenu from './Sections/RightMenu';
import { Drawer, Button, Icon } from 'antd';
import { SearchOutlined } from '@ant-design/icons'
import axios from 'axios';
import './Sections/Navbar.css';

function NavBar() {
  const [visible, setVisible] = useState(false)
  const [Search, setSearch] = useState('')

  const [FindVideo, setFindVideo] = useState([])

  const showDrawer = () => {
    setVisible(true)
  };

  const onClose = () => {
    setVisible(false)
  };
  const onChangeSearch = (e) =>{
    setSearch(e.currentTarget.value)
  }
  const onSearch = () =>{
    let variable = {search : Search}
    axios.post('/api/video/search', variable)
    .then(res=>{
      if(res.data.success){
        console.log(res.data.videoList)
        setFindVideo(res.data.videoList)
      }else{
        alert('검색 오류')
      }
    })
  }

  return (
    <nav className="menu" style={{ position: 'fixed', zIndex: 5, width: '100%' }}>
      <div className="menu__logo">
        <a href="/">
          <img src='https://lh3.googleusercontent.com/proxy/YWHz_NsJbnOBmmflJRu45qPSiUnDJ_5ytpgQ9O_bRbT9QUgUTYQD4ZqIx0mtZqNLHxfcFTD5lqAiJgale5VVB9J-l7ss3RENXOIA9lpwWrL3o5NQs78SmwwsPTu2bhjaY8gWZFHOoTUOsKsPR8YJyzqfyiKOIfTPE_xRlqGafONJdhrjtSzV5bmcEJbSRRRzRwUhiBbNLY_xUl5HZzMpj-_i2I4oE7EgL1JuLMBNjeCdvjDzlX8q0pVdnSHdGMJahOhpjXoJaFwLJM3mHUYJDFF9dh7pZKQabNVXvXbMJnRs52pvPgDrE0UrWTpsFke5pspjJynu4zHabTYND0IIvYzt_nZRZDd-Mle5by8OsTGOfRMR6wNyiH5lvKzHR3qz2VkQiSoWyfFf00YlIKyungCRrfeT0lLKvmlbrlAINc5_atP-4yvDE9A8_Vhz-vcnvH45lA' 
          style={{width:'100%', height:'25%'}}/>
        </a>
      </div>
      <div className="menu__container">
        <div className="menu_left">
          <LeftMenu mode="horizontal" />
        </div>

        <div className="menu_center">
          <input type='text' style={{ width: '30%',height:'30px' }} placeholder='search..' onChange={onChangeSearch} />
          <button style={{ height:'30px'}} onClick={onSearch}>{<SearchOutlined />}</button>
        </div>

        <div className="menu_rigth">
          <RightMenu mode="horizontal" />
        </div>
        <Button
          className="menu__mobile-button"
          type="primary"
          onClick={showDrawer}
        >
          <Icon type="align-right" />
        </Button>
        <Drawer
          title="Basic Drawer"
          placement="right"
          className="menu_drawer"
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <LeftMenu mode="inline" />
          
          <RightMenu mode="inline" />
        </Drawer>
      </div>
    </nav>
  )
}

export default NavBar
