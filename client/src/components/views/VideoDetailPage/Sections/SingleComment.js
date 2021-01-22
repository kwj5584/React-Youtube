import React,{useState} from 'react'
import { Comment, Avatar, Button, Input} from 'antd';
import axios from 'axios'

const {TextArea} = Input;

function SingleComment(props) {

    const postId = props.postId
    const writer = props.writer
    const [OpenReply, setOpenReply] = useState(false)
    const [CommentValue, setCommentValue] = useState('')

    const onClickReplyOpen = () =>{
        setOpenReply(!OpenReply)
    }
    const onHandleChange = (e) =>{
        setCommentValue(e.currentTarget.value)
    }
    const onSubmit = (e) =>{
        e.preventDefault();

        const commentVariable = {
            content: CommentValue,
            writer: writer,
            postId: postId,
            responseTo : props.comment._id
        }
        axios.post('/api/comment/saveComment', commentVariable)
        .then(res=>{
            if(res.data.success){
                props.refreshFunction(res.data.result)
                setCommentValue('')
            }else{
                alert('댓글 작성 실패')
            }
        })
    }
    const actions = [
        <span onClick={onClickReplyOpen} key='comment-basic-reply-to'>Reply to</span>
    ]
    return (
        <div>
            <Comment
                actions={actions}
                author={props.comment.writer.name}
                avatar={<Avatar src={props.comment.writer.image} alt/>}
                content={ <p>{props.comment.content}</p>}
            />
            {OpenReply &&
                <form style={{display:'flex'}} onSubmit={onSubmit}>
                <textarea
                    style={{width:'100%', borderRadius:'5px'}}
                    onChange={onHandleChange}
                    value={CommentValue}
                    placeholder='댓글 작성해주세요'
                />
                <br/>
                <button style={{width:'20%', height:'52px'}} onClick={onSubmit}>Submit</button>
            </form>
            }
            
        </div>
    )
}

export default SingleComment
