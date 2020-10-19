import React from "react";
import {createAnecdote} from "../reducers/anecdoteReducer";
import {useDispatch} from "react-redux";
import {clearNoti, setNoti} from "../reducers/notificationReducer";
import anecdotesService from "../services/anecdotes";

const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const submitAnecdote = async (e) => {
        e.preventDefault()
        const content = e.target.anecdote.value
        e.target.anecdote.value = ''
        dispatch(await createAnecdote(content))
        dispatch(setNoti(`You added "${content}"`))
        setTimeout(() => {
            dispatch(clearNoti())
        },5000)
    }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={submitAnecdote}>
                <div><input name="anecdote"/></div>
                <button>create</button>
            </form>
        </>
    )
}

export default AnecdoteForm