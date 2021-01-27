import React, { useState } from 'react'
import { Comment, Avatar, Button, Input } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';
import LikeDislikes from './LikeDislikes'
const { TextArea } = Input;
function SingleComment(props) {
    const user = useSelector(state => state.user);
    //loginUser : user.userData.name
    //commentWriter : props.comment._id
    const [CommentValue, setCommentValue] = useState("")
    const [OpenReply, setOpenReply] = useState(false)
    const handleChange = (e) => {
        setCommentValue(e.currentTarget.value)
    }

    const openReply = () => {
        setOpenReply(!OpenReply)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const variables = {
            content: CommentValue,
            writer: user.userData._id,
            postId: props.postId,
            responseTo: props.comment._id,
            
        }
        axios.post('/api/comment/saveComment', variables)
            .then(res => {
                if (res.data.success) {
                    setCommentValue("")
                    setOpenReply(false)
                    props.refreshFunction(res.data.result)
                } else {
                    alert('Failed to save Comment')
                }
            })
    }
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
        <LikeDislikes userId={localStorage.getItem('userId')} commentId={props.comment._id}/>
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

export default SingleComment