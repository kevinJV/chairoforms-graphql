const express = require('express')
const app = express();
const graphqlHTTP = require('express-graphql')
const cors = require('cors')

const { buildSchema } = require('graphql')
const { getForm, addForm, getForms } = require('./data/form')

var schema = buildSchema(`
    type Form {
        id: Int,
        name: String,
        description: String,
        data: String
    },
    type Query {
        forms: [Form],
        form(id: Int!): Form
    },
    type Mutation {
        createForm(name: String!, description: String!, data: String!): Form
    }
`)

var root = {
    form: async ({ id }) => {
        return await getForm(id)
    },
    forms: async () => {
        return await getForms()
    },
    createForms: async args => {
        const { name, description, data } = args
        return await createForms(name, description, data)
    }
}

app.use(cors())

app.use(
    "/graphql",
    graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true
    })
)

app.listen(3000)

console.log("Server inicializado en http://localhost:3000/graphql")