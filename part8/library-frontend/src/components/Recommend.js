import React, {useEffect} from 'react'
import {gql, useQuery} from "@apollo/client";
import {ME} from "../query";

const Recommend = (props) => {

    useEffect(() => {
        props.fetchBooks()
    },[])




    const me = useQuery(ME)

    if (me.loading || props.books.loading) {
        return <h2>loading...</h2>
    }

    const b = props.books.data.allBooks.filter(book =>
        book.genres.find(g => g === me.data.me.favoriteGenre)
    )
    if (!props.show) {
        return null
    }

    console.log(props.books.data)
    return (
        <>
            <h2>recommendations</h2>
            <p>books in your favorite genre <b>{me.data.me.favoriteGenre}</b></p>
            <table>
                <tr>
                    <th>title</th>
                    <th>author</th>
                    <th>published</th>
                </tr>
                {b.map(b => (
                    <tr key={b.id}>
                        <td>{b.title}</td>
                        <td>{b.author.name}</td>
                        <td>{b.published}</td>
                    </tr>
                ))
                }

            </table>
        </>
    )
}

export default Recommend