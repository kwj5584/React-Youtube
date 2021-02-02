/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useState} from 'react';
import { Menu, Avatar, Dropdown} from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";
import {UserOutlined} from '@ant-design/icons'

function RightMenu(props) {
  const user = useSelector(state => state.user)
  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert('Log Out Failed')
      }
    });
  };
  const onDropdown = (e) =>{
    e.preventDefault();
    
  }
  const loginUserMenu = (
    <Menu >
    <Menu.Item key='upload'>
      <a href='/video/upload'>Video</a>
    </Menu.Item>
    
    <Menu.Item key="logout">
      <a onClick={logoutHandler}>Logout</a>
    </Menu.Item>
  </Menu>
  )
  const notLoginUserMenu = (
    <Menu>
        <Menu.Item key="mail">
          <a href="/login">Signin</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/register">Signup</a>
        </Menu.Item>
      </Menu>
  )
  if (user.userData && !user.userData.isAuth) {
    return (
      <Dropdown overlay={notLoginUserMenu}>
        <Avatar style={{marginTop:'13px'}} size='large' icon={<UserOutlined />} />
      </Dropdown>
    )
  } else {
    return (
      <div>
        { <Dropdown overlay={loginUserMenu}>
        <Avatar style={{marginTop:'13px'}} size='large' src={user.userData && user.userData.image} onClick={onDropdown}/>
        </Dropdown>
        }
      </div>
    )
  }
}

export default withRouter(RightMenu);

