import React,{useState} from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import {useSelector} from 'react-redux'
import SingleComment from './SingleComment'
import ReplyComment from './ReplyComment'

function Comment(props) {
    const videoId = props.postId
    const user = useSelector(state => state.user);
    const [commentValue, setCommentValue] = useState('')
    
    const handleClick = (e) =>{
        setCommentValue(e.currentTarget.value)
    }
    const onSubmit = (e)=>{
        e.preventDefault();
        if(user.userData._id){
        const commentVariable = {
            content: commentValue,
            writer: user.userData._id,
            postId: videoId
        }
        axios.post('/api/comment/saveComment', commentVariable)
        .then(res=>{
            if(res.data.success){
                setCommentValue('')
                props.refreshFunction(res.data.result)
            }else{
                alert('댓글 작성 실패')
            }
        })
    }else{
        alert('로그인 후 댓글 작성 가능합니다.')
        props.history.push('/login')
    }
    }
    return (
        <div>
            <br/>
            <p>Replies</p>
            <hr/>
            {/* Comment Lists */}
            {props.commentLists && props.commentLists.map((comment, index) => (
                (!comment.responseTo &&
                    <React.Fragment key={index}>
                        <SingleComment comment={comment} postId={videoId} refreshFunction={props.refreshFunction} />
                        <ReplyComment commentLists={props.commentLists} postId={videoId} parentCommentId={comment._id} refreshFunction={props.refreshFunction} />
                    </React.Fragment>
                )
            ))}
            {/* Root Comment Form*/ }
            <form style={{display:'flex'}} onSubmit={onSubmit}>
                <textarea
                    style={{width:'100%', borderRadius:'5px'}}
                    onChange={handleClick}
                    value={commentValue}
                    placeholder='댓글 작성해주세요'
                />
                <br/>
                <button style={{width:'20%', height:'52px'}} onClick={onSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default withRouter(Comment)
