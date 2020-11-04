import {gql} from "@apollo/client";

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    author {
      name
      bookCount
      born
    }
    published
    genres
    id
  }
`

export const ALL_BOOKS = gql`
  query fetchBooks($filterByAuthor: String, $filterByGenre: String) {
    allBooks(author: $filterByAuthor, genre: $filterByGenre) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`


export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`




export const ME = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`