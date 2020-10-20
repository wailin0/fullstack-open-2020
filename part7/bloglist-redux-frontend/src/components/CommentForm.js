import React,{useState} from 'react'
import axios from 'axios'
import {useDispatch} from "react-redux";
import {uploadComment} from "../reducers/blogReducer";

const CommentForm = ({blogId}) => {
    const [comment, setComment] = useState('')

    const dispatch = useDispatch()
    const addComment = async () => {
    const newComment = {
        message : comment
    }

    const s = dispatch( uploadComment(blogId, newComment))
        console.log(s)
    }

    return (
        <>{comment}
            <input name="comment" value={comment} onChange={e => setComment(e.target.value)} /><button onClick={() => addComment()}>add comment</button>
        </>
    )
}

export default CommentForm