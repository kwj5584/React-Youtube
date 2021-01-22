import React,{useState} from 'react'
import axios from 'axios'
import {useSelector} from 'react-redux'
import SingleComment from './SingleComment'

function Comment(props) {
    const refreshFunction = props.refreshFunction
    const postId = props.videoId
    const user = useSelector(state => state.user);
    const [commentValue, setCommentValue] = useState('')
    
    const handleClick = (e) =>{
        setCommentValue(e.currentTarget.value)
    }
    const onSubmit = (e)=>{
        e.preventDefault();

        const commentVariable = {
            content: commentValue,
            writer: user.userData._id,
            postId: postId
        }
        axios.post('/api/comment/saveComment', commentVariable)
        .then(res=>{
            if(res.data.success){
                setCommentValue('')
                refreshFunction(res.data.result)
            }else{
                alert('댓글 작성 실패')
            }
        })
    }
    return (
        <div>
            <br/>
            <p>Replies</p>
            <hr/>
            {/* Comment Lists */}
            {props.commentLists && props.commentLists.map((comment,index)=>(
                (!comment.responseTo&&
                <SingleComment refreshFunction={refreshFunction} comment={comment} postId={postId} writer={user.userData._id}/>
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

export default Comment
