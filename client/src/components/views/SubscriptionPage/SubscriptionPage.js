import React,{useEffect, useState} from 'react'
import {Card, Icon, Avatar, Col, Typography, Row, Tooltip} from 'antd';
import axios from 'axios'
import moment from 'moment';

const {Title} = Typography
const {Meta} = Card

function SubscriptionPage(props) {
    const [Video, setVideo] = useState([])
    useEffect(() => {
        const subscriptionVariable = {
            userFrom : sessionStorage.getItem('userId')
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
    const userPageHandler = (name)=>{
        props.history.push({
            pathname:`/userPage/${name}`,
            state:{user:name}
        })
    }
    const renderCards = Video.map((video,index)=>{
        var minutes = Math.floor(video.duration / 60);
        var seconds = Math.floor((video.duration- minutes*60));
        return(
            <Col lg={6} md={8} xs={24}> {/** 가장 큰 화면일 때 6*4=24 4개의 영상을 한 행에 등록, 중간크기일 때 3개, 가장 작은 크기일 때 1개 */}
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
                        description=""
                    />
                    <Tooltip placement='topLeft' title={video.writer.name}>
                    <a style={{color:'black'}}onClick={(e)=>userPageHandler(video.writer.name)}>{video.writer.name}</a><br/>
                    </Tooltip>
                    <span style={{marginLeft:'3rem'}}>{video.views} views</span>
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

export default SubscriptionPage
