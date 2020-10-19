import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {voteAnecdote} from "../reducers/anecdoteReducer";
import {clearNoti, setNoti} from "../reducers/notificationReducer";

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()
    const filtered = useSelector(state => state.filtered)
    const filteredData = anecdotes.filter(ane => ane.content.toLowerCase().includes(filtered.toLowerCase()))
    anecdotes.sort((a,b) => (a.votes > b.votes ? -1 : 1))


    const vote = async (anecdote) => {
        dispatch(await voteAnecdote(anecdote))
        dispatch(setNoti(`You vote "${anecdote.content}"`))
        setTimeout(() => {
            dispatch(clearNoti())
        },5000)
    }

    return (
        <>

            {filteredData.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}

        </>
    )
}

export default AnecdoteList