import {BrowserRouter, Route, Switch} from "react-router-dom";
import React from "react";
import AnecdoteList from "./components/AnecdoteList";
import About from "./components/About";
import Footer from "./components/Footer";
import CreateNew from "./components/CreateNew";

const Router = () => {
    const padding = {
        paddingRight: 5
    }
    return (
        <BrowserRouter>
            <div>
                <h1>Software anecdotes</h1>
                <Switch>
                    <Route style={padding} path="/" component={AnecdoteList}>s</Route>
                    <Route style={padding} path="/create" component={CreateNew}>s</Route>
                    <Route style={padding} path="/about" component={About}>s</Route>
                    <Footer/>
                </Switch>

            </div>
        </BrowserRouter>
    )
}

export default Router