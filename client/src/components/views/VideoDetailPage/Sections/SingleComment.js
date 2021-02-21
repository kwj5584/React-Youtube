import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { Comment, Avatar, Button, Input } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';
import LikeDislikes from './LikeDislikes'
const { TextArea } = Input;
function SingleComment(props) {
    const user = useSelector(state => state.user);
    const videoId = props.postId
    const [CommentValue, setCommentValue] = useState("")
    const [OpenReply, setOpenReply] = useState(false)
    const handleChange = (e) => {
        setCommentValue(e.currentTarget.value)
    }

    const openReply = () => {
        setOpenReply(!OpenReply)
    }

    const onSubmit = (e)=>{
        e.preventDefault();
        if(user.userData._id){
        const commentVariable = {
            content: CommentValue,
            writer: user.userData._id,
            postId: videoId,
            responseTo : props.comment._id
        }
        axios.post('/api/comment/saveComment', commentVariable)
        .then(res=>{
            if(res.data.success){
                setCommentValue('')
                props.refreshFunction(res.data.result)
                setOpenReply(false)
            }else{
                alert('댓글 작성 실패')
            }
        })
    }else{
        alert('로그인 후 댓글 작성 가능합니다.')
        props.history.push('/login')
    }}
    
    const onDeleteComment = (id) => {
        console.log('clicked',id)
        const variable = {id: id}
        axios.post('/api/comment/deleteComment',variable)
        .then(res=>{
            if(res.data.success){
                alert('댓글 삭제 성공')
                window.location.reload();
            }else{
                alert('댓글 삭제 실패')
            }
        })
    }
    if(props.comment.writer){
        var deleteComment = user.userData._id === props.comment.writer._id && <button onClick={(e)=>onDeleteComment(props.comment._id)}>Delete</button>
    }
    const actions = [
        <LikeDislikes userId={sessionStorage.getItem('userId')} commentId={props.comment._id}/>
        ,<span onClick={openReply} key="comment-basic-reply-to">Reply to </span>, deleteComment ]

    return (
        <div>
            { props.comment.writer &&
            <Comment
                actions={actions}
                author={props.comment.writer.name}
                avatar={<Avatar src={props.comment.writer.image} alt='image'/>}
                content={ <p>{props.comment.content}</p>}
            />
            }
            {OpenReply &&
                <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                    <TextArea
                        style={{ width: '100%', borderRadius: '5px' }}
                        onChange={handleChange}
                        value={CommentValue}
                        placeholder="write some comments"
                    />
                    <br />
                    <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</Button>
                </form>
            }

        </div>
    )
}

export default withRouter(SingleComment)