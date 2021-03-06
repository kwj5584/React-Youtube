import React,{useEffect, useState} from 'react'
import { Tooltip, Icon } from 'antd';
import axios from 'axios'

function LikeDislikes(props) {
    const [Likes, setLikes] = useState(0)
    const [LikeAction, setLikeAction] = useState(null)

    const [Dislikes, setDislikes] = useState(0)
    const [DislikeAction, setDislikeAction] = useState(null)

    let variable = { }

    if(props.video){
        variable = { videoId: props.videoId , userId: props.userId}
    } else{
        variable = { commentId: props.commentId, userId: props.userId}
    }
    
    useEffect(() => {
        axios.post('/api/like/getLikes', variable)
        .then(res=>{
            if(res.data.success){
                // 얼마나 많은 좋아요를 받았는지
                setLikes(res.data.likes.length)
                // 내가 이미 그 좋아요를 눌렀는지 
                res.data.likes.map(like=>{ // 모든 비디오나 댓글의 좋아요 정보
                    if(like.userId === props.userId){ // props.userId -> 로그인 한 자신의 아이디 
                        setLikeAction('liked')
                    }
                })
            } else{
                alert('좋아요 정보를 가져오지 못했습니다.')
            }
        })
        axios.post('/api/like/getDislikes', variable)
        .then(res=>{
            if(res.data.success){
                // 얼마나 많은 싫어요를 받았는지
                setDislikes(res.data.dislikes.length)
                // 내가 이미 그 싫어요를 눌렀는지 
                res.data.dislikes.map(dislike=>{ // 모든 비디오나 댓글의 싫어요 정보
                    if(dislike.userId === props.userId){ // props.userId -> 로그인 한 자신의 아이디 
                        setDislikeAction('disliked')
                    }
                })
            } else{
                alert('싫어요 정보를 가져오지 못했습니다.')
            }
        })
        
    }, [props.userId,variable])

    const onLike = () =>{
        if(LikeAction === null) {  // 좋아요버튼 클릭이 안되있을 때
            axios.post('/api/like/upLike', variable)
            .then(res=>{
                if(res.data.success){
                    setLikes(Likes+1)
                    setLikeAction('liked')
                    if( DislikeAction !== null){
                        setDislikeAction(null)
                        setDislikes(Dislikes-1)
                    }
                }else{
                    alert('좋아요 버튼 오류')
                }
            })
        }
        else{
            axios.post('/api/like/unLike', variable)
            .then(res=>{
                if(res.data.success){
                    setLikes(Likes-1)
                    setLikeAction(null)
                }else{
                    alert('좋아요 취소 오류')
                }
            })
        }
    }

    const onDislike = () =>{
        if(DislikeAction !== null) {  // 싫어요버튼 클릭이 안되있을 때
            axios.post('/api/like/unDislike', variable)
            .then(res=>{
                if(res.data.success){
                    setDislikes(Dislikes -1 )
                    setDislikeAction(null)
                }else{
                    alert('싫어요 취소 오류')
                }
            })
        }
        else{
            axios.post('/api/like/upDisLike', variable)
            .then(res=>{
                if(res.data.success){
                    setDislikes(Dislikes+1)
                    setDislikeAction('disliked')

                    if(LikeAction !== null){
                        setLikeAction(null)
                        setLikes(Likes-1)
                    }
                }else{
                    alert('싫어요 버튼 오류')
                }
            })
        }
    }
    
    return (
        <div>
            <span key="comment-basic-like">
                <Tooltip title="Like">
                    <Icon type="like"
                        theme={LikeAction==='liked'? "filled" : 'outlined'}
                        onClick={onLike}
                    />
                </Tooltip>
            <span style={{paddingLeft:'8px', cursor:'auto'}}>{Likes} </span>
            </span>&nbsp;&nbsp;

            <span key="comment-basic-dislike">
                <Tooltip title="Dislike">
                    <Icon type="dislike"
                        theme={DislikeAction==='disliked'? "filled" : 'outlined'}
                        onClick={onDislike}
                    />
                </Tooltip>
            <span style={{paddingLeft:'8px', cursor:'auto'}}>{Dislikes} </span>
            </span>&nbsp;&nbsp;
        </div>
    )
}

export default LikeDislikes
