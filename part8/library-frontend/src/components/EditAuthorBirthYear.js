import React, {useState} from 'react'
import {gql, useMutation} from "@apollo/client";

const EditAuthorBirthYear = ({authors}) => {
    const [name, setName] = useState('')
    const [born, setBorn] = useState('')

    const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $born: Int!) {
    editAuthor(name: $name, born: $born)  {
      name
      born
     }
     }
     `
    const ALL_AUTHORS = gql`
    query {
  allAuthors {
    name
    born
    bookCount
  }
}
`

    const [editAuthor] = useMutation(EDIT_AUTHOR, {refetchQueries: [{query: ALL_AUTHORS}]})

    const updateAuthor = async (e) => {
        e.preventDefault()

        await editAuthor({variables: {name, born: parseInt(born)}})

        setName('')
        setBorn('')
    }

    return (
        <>
            <h2>Set birthyear</h2>
            <form onSubmit={updateAuthor}>
                <select value={name} onChange={e => setName(e.target.value)}>
                    <option value="">select name</option>
                    {authors.map(author => (
                        <option key={author.name} value={author.name}>{author.name}</option>
                    ))}
                </select>
                <br/>
                born<input type="text" name="born" value={born} onChange={e => setBorn(e.target.value)}/>
                <br/>
                <button type="submit">update author</button>
            </form>
        </>
    )
}

export default EditAuthorBirthYear