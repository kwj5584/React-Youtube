import React,{useEffect, useState} from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import {Card, Icon, Avatar, Col, Typography, Row, Tooltip} from 'antd';
import moment from 'moment';
const {Title} = Typography
const {Meta} = Card

function UserPage(props) {
    const [Video, setVideo] = useState([])
    const userInfo = props.location.state.user;
    useEffect(() => {
        let variable = {user:userInfo}
        axios.post('/api/video/userDetail',variable)
        .then(res=>{
            if(res.data.success){
                setVideo(res.data.videoList)
            }else{
                alert('유저정보 불러오기 실패')
            }
        })
    },[userInfo])
    const renderCards = Video.map((video,index)=>{
        var minutes = Math.floor(video.duration / 60);
        var seconds = Math.floor((video.duration- minutes*60));
        return(
            <Col key={index} lg={6} md={8} xs={24}> {/** 가장 큰 화면일 때 6*4=24 4개의 영상을 한 행에 등록, 중간크기일 때 3개, 가장 작은 크기일 때 1개 */}
                <div style={{position:'relative'}}>
                    <a href={`/video/${video._id}`}> 
                        <img style={{width:'100%'}} src={`http://localhost:5000/${video.thumbnail}`} alt='thumbnail'/>
                        <div className="duration">
                            <span>{minutes} : {seconds}</span>
                        </div>
                    </a>
                </div>
                    <br/>
                    <Meta
                        avatar ={
                            <Avatar src={video.writer.image}/> // 업로더 정보 
                        }
                        title={video.title}
                    />
                    <Tooltip placement='topLeft' title={video.writer.name}>
                    <span>{video.writer.name}</span><br/>
                    </Tooltip>
                    <span style={{marginLeft:'3rem'}}>조회수 {video.views} 회</span>
                     - <span>{moment(video.createdAt).format('MMM Do YY')}</span> {/**업데이트 한 날짜 */}
                </Col>
        )
    })
    return (
        <div style={{width:'85%', margin: '3rem auto'}}>
            <Title level={2}>Recommended</Title>
            <hr/>
            <Row gutter={[32,16]}>
                {renderCards}
            </Row>
        </div>
    )
}

export default withRouter(UserPage)
