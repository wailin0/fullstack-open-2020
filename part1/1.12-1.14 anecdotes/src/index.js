import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [vote, setVote] = useState([
        0,0,0,0,0,0
    ])

    const random = () => {
         setSelected(Math.floor(Math.random()*6))
    }
    const voteHandler = () => {
        const copy = [...vote]
        copy[selected] += 1
        setVote(copy)
    }


    return (
        <div>
            <h1>Anecdote of the day</h1>
            {props.anecdotes[selected]}
            <p>has {vote[selected]} votes</p>
            <br/>
            <button onClick={() => voteHandler()}>vote</button>
            <button onClick={() => random()}>next anecdote</button>
            <br/>
            <h1>Anecdote with most votes</h1>
            {anecdotes[vote.indexOf(Math.max(...vote))]}
            <p>has {Math.max(...vote)} votes</p>

        </div>
    )
}



ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)