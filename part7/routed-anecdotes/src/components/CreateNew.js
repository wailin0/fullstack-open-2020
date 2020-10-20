import React, {useState} from "react";
import {useHistory} from "react-router-dom"
import {useField} from "../hooks";

const CreateNew = (props) => {
    const {reset: resetContent, ...content} = useField('')
    const {reset: resetAuthor, ...author} = useField('')
    const {reset: resetInfo, ...info} = useField('')

    const history = useHistory()


    const handleSubmit = (e) => {
        e.preventDefault()
        props.addNew({
            content: content.value,
            author: author.value,
            value: info.value,
            votes: 0
        })
        props.setNotification(`a new anecdote ${content.value} created!`)
        history.push('/')
        setTimeout(() => {
            props.setNotification('')
        }, 10000)
    }

    const resetFields = () => {
        resetContent()
        resetAuthor()
        resetInfo()
    }

    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    content
                    <input {...content}/>
                </div>
                <div>
                    author
                    <input {...author}/>
                </div>
                <div>
                    url for more info
                    <input {...info}/>
                </div>
                <button>create</button>
                <button type="reset" onClick={resetFields}>reset</button>
            </form>
        </div>
    )
}

export default CreateNew