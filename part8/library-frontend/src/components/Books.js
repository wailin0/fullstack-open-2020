import React, {useEffect, useState} from 'react'

const Books = (props) => {
    const [genre, setGenre] = useState(null)


    useEffect(() => {
        props.fetchBooks()
    },[])


    useEffect(() => {
        props.fetchBooks({
            variables: { filterByGenre: genre },
        })
    }, [genre])

    if (!props.show) {
        return null
    }

    if (props.books.loading) {
        return <div>loading...</div>
    }
    const genresList = []
    props.books.data.allBooks.map(book =>
        book.genres.map(genre => {
            if (!genresList.find(g => g === genre))
                genresList.push(genre)
        })
    )

    console.log(props.books)
    return (
        <div>
            <h2>books</h2>
            in genre <b>{genre}</b>
            <table>
                <tbody>
                <tr>
                    <th></th>
                    <th>
                        author
                    </th>
                    <th>
                        published
                    </th>
                </tr>
                {props.books.data.allBooks.map(b =>
                    <tr key={b.id}>
                        <td>{b.title}</td>
                        <td>{b.author.name}</td>
                        <td>{b.published}</td>
                    </tr>
                )}
                </tbody>
            </table>

            {genresList.map(g => (
                <button onClick={() => setGenre(g)}>{g}</button>
            ))
            }
            <button onClick={() => setGenre(null)}>all genres</button>
        </div>
    )
}

export default Books