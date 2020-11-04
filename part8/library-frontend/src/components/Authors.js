import React from 'react'
import {gql, useQuery} from "@apollo/client";
import EditAuthorBirthYear from "./EditAuthorBirthYear";

const Authors = (props) => {

    const ALL_AUTHORS = gql`
    query {
  allAuthors {
    name
    born
    bookCount
  }
}
`


    const authors =  useQuery(ALL_AUTHORS)
    if (!props.show) {
        return null
    }

    if ( authors.loading ) {
        return <div>loading...</div>
    }

    return (
        <div>
            <h2>authors</h2>
            <table>
                <tbody>
                <tr>
                    <th></th>
                    <th>
                        born
                    </th>
                    <th>
                        books
                    </th>
                </tr>
                {authors.data.allAuthors.map(a =>
                    <tr key={a.name}>
                        <td>{a.name}</td>
                        <td>{a.born}</td>
                        <td>{a.bookCount}</td>
                    </tr>
                )}
                </tbody>
            </table>

            <EditAuthorBirthYear authors={authors.data.allAuthors} />
        </div>
    )
}

export default Authors