import React,{useEffect, useState} from 'react'
import {Card,  Avatar, Col, Typography, Row,} from 'antd';
import axios from 'axios'
import moment from 'moment';
const {Title} = Typography
const {Meta} = Card

function SearchPage(props) {
    const [FindVideo, setFindVideo] = useState([])
    useEffect(() => {
        let variable = {search : props.location.state.searchResult}
        axios.post('/api/video/search',variable)
        .then(res=>{
        if(res.data.success){
            setFindVideo(res.data.videoList)
            }
    })
    }, [FindVideo,props.location.state.searchResult])

    const notFoundPages = (
            <div>
                <img style={{width:'100%', height:'100%'}} src={'https://i2.wp.com/learn.onemonth.com/wp-content/uploads/2017/08/1-10.png?fit=845%2C503&ssl=1'} alt="404page" />
            </div>
        )

    const renderCards = FindVideo.map((video,index)=>{
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
                    <span>{video.writer.name}</span><br/>
                    <span style={{marginLeft:'3rem'}}>조회수 {video.views} 회</span>
                     - <span>{moment(video.createdAt).format('MMM Do YY')}</span> {/**업데이트 한 날짜 */}
                </Col>
        )
    })
    return (
        <div style={{width:'85%', margin: '3rem auto'}}>
            <title>React-Youtube</title>
            <Title level={2}></Title>
            <hr/>
            <Row gutter={[32,16]}>
                { FindVideo.length === 0 ? notFoundPages : renderCards }
            </Row>
        </div>
    )
}

export default SearchPage
