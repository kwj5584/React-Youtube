import React,{useEffect,useState} from 'react'
import {Row, Col, List, Avatar} from 'antd'
import axios from 'axios'
import SideVideo from './Sections/SideVideo'
import Subscribe from './Sections/Subscribe'
import Comment from './Sections/Comment'
import LikeDislikes from './Sections/LikeDislikes'

function VideoDetailPage(props) {
    const videoId = props.match.params.videoId
    const [VideoDetail, setVideoDetail] = useState([])
    const [Comments, setComments] = useState([])
    const [loginUser, setLoginUser] = useState('')
    const [uploader, setUploader] = useState('')
    const variable = { videoId:videoId }
    useEffect(() => {
        if(props.user.userData){
            setLoginUser(props.user.userData.name);
        }
        if(VideoDetail.writer){
            setUploader(VideoDetail.writer.name);
        }
        console.log('info:',uploader, loginUser)
    })
    
    useEffect(() => {
        axios.post('/api/video/getVideoDetail',variable)        
        .then(res=>{
            if(res.data.success){
                setVideoDetail(res.data.videoDetail)
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
console.log('views:',VideoDetail.views)
    const refreshFunction = (newComment) =>{
        setComments(Comments.concat(newComment))
    }

    const videoDelete = () =>{
        console.log('deleteVideo :',variable)
        axios.post('/api/video/deleteVideo', variable)
        .then(res=>{
            if(res.data.success){
                alert('비디오가 정상적으로 삭제되었습니다.')
                props.history.push('/')
            }else{
                alert('비디오 삭제 오류')
            }
        })
    }
    if(VideoDetail.writer){
        const deleteButton = loginUser === uploader&& <button style={{backgroundColor: '#CC0000', borderRadius:"4px",
        color:'white', padding:'10px 16px',
        fontWeight:'500', fontSize:'1rem', textTransform:'uppercase'
    }} 
        onClick={videoDelete}
    >Delete</button>

        const subscribeButton = VideoDetail.writer._id !== localStorage.getItem('userId') &&  <Subscribe userTo={VideoDetail.writer._id} userFrom={localStorage.getItem('userId')}/>
        return (
            <Row gutter={[16,16]}>
                <Col lg={18} xs={24}>
                    <div style={{ width: '100%', padding: '3rem 4em' }}>
                        <video style={{width:'100%'}} src={`http://localhost:5000/${VideoDetail.filePath}`} controls/>
                            
                        <List.Item
                            actions={[ <LikeDislikes video userId={localStorage.getItem('userId')} videoId={videoId} />, subscribeButton, deleteButton]}
                        >
                            <List.Item.Meta
                                title={VideoDetail.title}
                                description={VideoDetail.description}
                                />
                            
                        </List.Item>
                        조회수 {VideoDetail.views}회
                        <hr/>
                        <Avatar src={VideoDetail.writer && VideoDetail.writer.image}/>&nbsp;&nbsp;
                        <span>{VideoDetail.writer.name}</span>
                        
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
