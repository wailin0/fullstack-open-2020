import React, {useEffect, useState} from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from "./components/LoginForm";
import {useApolloClient, useLazyQuery, useSubscription} from "@apollo/client";
import {ALL_BOOKS, BOOK_ADDED} from "./query";
import Recommend from "./components/Recommend";

const App = () => {
    const [page, setPage] = useState('authors')
    const [token, setToken] = useState(null)
    const client = useApolloClient()



    const [fetchBooks, books] = useLazyQuery(ALL_BOOKS, {
        fetchPolicy: "network-only",
    });

    const updateCacheWith = (addedBook) => {
        const includedIn = (set, object) =>
            set.map((p) => p.id).includes(object.id);

        const dataInStore = client.readQuery({ query: ALL_BOOKS });
        if (!includedIn(dataInStore.allBooks, addedBook)) {
            client.writeQuery({
                query: ALL_BOOKS,
                data: { allBooks: dataInStore.allBooks.concat(addedBook) },
            });
        }
    };

    useSubscription(BOOK_ADDED, {
        onSubscriptionData: ({ subscriptionData }) => {
            const addedBook = subscriptionData.data.bookAdded;
            alert(`${addedBook.title} added`);
            updateCacheWith(addedBook);
        },
    });






    useEffect(() => {
        const jwt = localStorage.getItem("library-user-token")
        setToken(jwt)
    },[])

    const logout = () => {
        setToken(null)
        localStorage.clear()
        client.resetStore()
    }


    return (
        <div>
            <div>
                <button onClick={() => setPage('authors')}>authors</button>
                <button onClick={() => setPage('books')}>books</button>
                {!token ?
                    <button onClick={() => setPage('login')}>login</button>
                    :
                    <>
                        <button onClick={() => setPage('add')}>add book</button>
                        <button onClick={() => setPage('recommend')}>recommend</button>
                        <button onClick={() => logout()}>logout</button>
                    </>
                }
            </div>

            <Authors
                show={page === 'authors'}
            />

            <Books
                books={books}
                fetchBooks={fetchBooks}
                show={page === 'books'}
            />

            <NewBook
                show={page === 'add'}
            />
            {token &&
            <Recommend
                fetchBooks={fetchBooks}
                books={books}
                show={page === 'recommend'}
            />
            }

            <LoginForm
                setToken={setToken}
                show={page === 'login'}
            />


        </div>
    )
}

export default App