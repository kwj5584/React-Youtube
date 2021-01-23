import React,{useEffect,useState} from 'react'
import {Row, Col, List, Avatar} from 'antd'
import axios from 'axios'
import SideVideo from './Sections/SideVideo'
import Subscribe from './Sections/Subscribe'
import Comment from './Sections/Comment'


function VideoDetailPage(props) {
    
    const videoId = props.match.params.videoId
    const [VideoDetail, setVideoDetail] = useState([])
    const [Comments, setComments] = useState([])
    const variable = { videoId:videoId }
    
    useEffect(() => {
        axios.post('/api/video/getVideoDetail',variable)        
        .then(res=>{
            if(res.data.success){
                setVideoDetail(res.data.videoDetail)
                console.log('getVideoDetail:',res.data.videoDetail)
            }else{
                alert('비디오 정보 가져오기 실패')
            }
        })
        axios.post('/api/comment/getComments', variable)
        .then(res=>{
            if(res.data.success){
                setComments(res.data.comments)
            }else{
                alert('댓글 정보 가져오는 것을 실패')
            }
        })
    }, [])

    const refreshFunction = (newComment) =>{
        setComments(Comments.concat(newComment))
    }
    if(VideoDetail.writer){

        const subscribeButton = VideoDetail.writer._id !== localStorage.getItem('userId') &&  <Subscribe userTo={VideoDetail.writer._id} userFrom={localStorage.getItem('userId')}/>
        return (
            <Row gutter={[16,16]}>
                <Col lg={18} xs={24}>
                    <div style={{ width: '100%', padding: '3rem 4em' }}>
                        <video style={{width:'100%'}} src={`http://localhost:5000/${VideoDetail.filePath}`} controls/>
    
                        <List.Item
                            actions={[subscribeButton]}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={VideoDetail.writer && VideoDetail.writer.image}/>}
                                title={VideoDetail.title}
                                description={VideoDetail.description}
                                />
                        </List.Item>
    
                        {/* Comments*/}
                        <Comment refreshFunction={refreshFunction} commentLists={Comments} postId={videoId}/>
                    </div>
                </Col>
                <Col lg={6} xs={24}>
                    <SideVideo/>
                </Col>
            </Row>
        )
    } else{
        return(
            <div>loading ...</div>
        )
    }
    
}

export default VideoDetailPage
