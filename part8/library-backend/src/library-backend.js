const {AuthenticationError, ApolloServer, gql, UserInputError} = require('apollo-server')
const {v1: uuid} = require('uuid')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Author = require('./models/Author')
const Book = require('./models/Book')
const User = require('./models/User')
const { PubSub } = require('apollo-server')
const pubsub = new PubSub()

const MONGODB_URI = 'mongodb://127.0.0.1:27017/graphql'

const JWT_SECRET = 'SECRET'

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connection to MongoDB:', error.message)
    })


const typeDefs = gql`
  type Author {
  name: String!
  bookCount: Int
  id: ID!  
  born: Int
  }

  type Book {
  title: String!
  published: Int!
  author: Author!
  genres: [String!]!
  id: ID!
}

type User {
  username: String!
  favoriteGenre: String!
  id: ID!
}

type Token {
  value: String!
}
    
  type Query {
  me: User
  bookCount: Int!
  authorCount: Int!
  allBooks(author: String, genre: String): [Book]!
  allAuthors: [Author]!
  }
  
  
type Mutation {
  addBook(
    title: String!
    author: String!
    published: Int!
    genres: [String!]!
  ): Book
  editAuthor (
    name: String!
    born: Int!
  ): Author
  createUser(
    username: String!
    favoriteGenre: String!
  ): User
  login(
    username: String!
    password: String!
  ): Token
}

type Subscription {
  bookAdded: Book!
}


`


const resolvers = {
    Query: {
        me: (root, args, context) => context.currentUser,
        bookCount: () => Book.collection.countDocuments(),
        authorCount: () => Author.collection.countDocuments(),
        allBooks: async (root, args) => {
            if (args.author) {
                const findAuthor = await Author.findOne({name: args.author}).populate('author')
                if (!findAuthor) {
                    return null
                }
                return Book.find({author: findAuthor._id})
            } else if (args.genre) {
                return Book.find({genres: {$in: args.genre}}).populate('author')
            } else {
                const f = await Book.find({}).populate('author')
                console.log(f)
                return f
            }
        },
        allAuthors: async (root, args) => {
            const getAuthor = await Author.find({})
            const s = await Book.find({author: '5f9f48caa51cfc0af8ba3319'}).countDocuments()
            console.log(s)
            return getAuthor.map(author => {
                return {
                    name: author.name,
                    born: author.born,
                    bookCount:  Book.find({author: author._id}).countDocuments()
                }
            })
        }
    }

    ,
    Book: {
        author: async (root, args) => {
            const findAuthor = await Author.findById(root.author)
            return {
                name: findAuthor.name,
                born: findAuthor.born,
                id: findAuthor._id
            };
        }
    }
    ,
    Mutation: {
        addBook: async (root, args, context) => {
            const currentUser = context.currentUser
            if (!currentUser) {
                throw new AuthenticationError("not authenticated")
            }
            let book
            const author = new Author({
                name: args.author
            })
            try {
                const findExistingAuthor = await Author.findOne({name: args.author})
                if (findExistingAuthor) {
                    book = new Book({...args, author: findExistingAuthor._id})
                    await book.save()
                } else {
                    await author.save()
                    const getAuthor = await Author.findOne({name: args.author})
                    book = new Book({...args, author: getAuthor._id})
                    await book.save()
                }
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                });
            }

            pubsub.publish('BOOK_ADDED', { bookAdded: book })
            return book;
        },
        editAuthor: async (root, args, context) => {
            const currentUser = context.currentUser
            if (!currentUser) {
                throw new AuthenticationError("not authenticated")
            }
            const author = await Author.findOne({name: args.name})
            author.born = args.born

            if (!author) {
                return null
            }
            try {
                await author.save()
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }

            return author

        },
        createUser: (root, args) => {
            const user = new User({...args})

            return user.save()
                .catch(error => {
                    throw new UserInputError(error.message, {
                        invalidArgs: args,
                    })
                })
        },
        login: async (root, args) => {
            const user = await User.findOne({username: args.username})

            if (!user || args.password !== 'pass') {
                throw new UserInputError("wrong credentials")
            }

            const userForToken = {
                username: user.username,
                id: user._id,
            }

            return {value: jwt.sign(userForToken, JWT_SECRET)}
        }
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({req}) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.toLowerCase().startsWith('bearer ')) {
            const decodedToken = jwt.verify(
                auth.substring(7), JWT_SECRET
            )
            const currentUser = await User.findById(decodedToken.id)
            return {currentUser}
        }
    }
})

server.listen().then(({ url, subscriptionsUrl }) => {
    console.log(`Server ready at ${url}`)
    console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})