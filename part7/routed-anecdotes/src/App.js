import React, {useState} from 'react'
import Router from "./Router";
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import AnecdoteList from "./components/AnecdoteList";
import CreateNew from "./components/CreateNew";
import About from "./components/About";
import Footer from "./components/Footer";
import Anecdote from "./components/Anecdote";
import Notification from "./components/Notification";

const Menu = () => {
    const padding = {
        paddingRight: 5
    }
    return (
        <div>
            <Link style={padding} to="/">anecdotes</Link>
            <Link style={padding} to="/create">create new</Link>
            <Link style={padding} to="/about">about</Link>
        </div>
    )
}


const App = () => {
    const [anecdotes, setAnecdotes] = useState([
        {
            content: 'If it hurts, do it more often',
            author: 'Jez Humble',
            info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
            votes: 0,
            id: '1'
        },
        {
            content: 'Premature optimization is the root of all evil',
            author: 'Donald Knuth',
            info: 'http://wiki.c2.com/?PrematureOptimization',
            votes: 0,
            id: '2'
        }
    ])

    const [notification, setNotification] = useState('')

    const addNew = (anecdote) => {
        anecdote.id = (Math.random() * 10000).toFixed(0)
        setAnecdotes(anecdotes.concat(anecdote))
    }

    const anecdoteById = (id) =>
        anecdotes.find(a => a.id === id)

    const vote = (id) => {
        const anecdote = anecdoteById(id)

        const voted = {
            ...anecdote,
            votes: anecdote.votes + 1
        }

        setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
    }

    return (
        <BrowserRouter>
            <div>
                <h1>Software anecdotes</h1>
                <Menu/>
                <Notification notification={notification} />
                <Switch>
                    <Route path="/" exact={true}>
                        <AnecdoteList anecdotes={anecdotes} />
                    </Route>
                    <Route path="/anecdotes/:id">
                        <Anecdote anecdotes={anecdotes} />
                    </Route>
                    <Route path="/create">
                        <CreateNew addNew={addNew} setNotification={setNotification} />
                    </Route>
                    <Route path="/about">
                        <About/>
                    </Route>
                </Switch>
                <Footer/>
            </div>
        </BrowserRouter>
    )
}

export default App;
