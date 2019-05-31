const express = require('express')
const app = express();
const graphqlHTTP = require('express-graphql')
const cors = require('cors')

const { buildSchema } = require('graphql')
const { getSurvey, addSurvey, getSurveys, deleteSurvey, updateSurvey } = require('./data/survey')

var schema = buildSchema(`
    type Survey {
        status: String,
        data: String,
        description: String,
        name: String,
        id: Int
    },
    type Query {
        surveys: [Survey],
        survey(id: Int!): Survey
    },
    type Mutation {
        createSurvey(name: String!, description: String!, data: String!, status: String!): Survey,
        removeSurvey(id: Int!): [Survey],
        editSurvey(id: Int!, name: String!, description: String!, data: String!, status: String!): Survey
    }
`)

var root = {
    survey: async ({ id }) => {
        console.log("Entre solo a survey")
        console.log( await getSurvey(id))
        return await getSurvey(id)
    },
    surveys: async () => {
        console.log(await getSurveys())
        return await getSurveys()
    },
    createSurvey: async args => {
        const { name, description, data, status } = args
        return await addSurvey(name, description, data, status)
    },
    removeSurvey: async ({ id }) => {
        return await deleteSurvey(id);
    },
    editSurvey: async args => {
        console.log("Estoy adentro del edit, cambio")
        const { id, name, description, data, status } = args;
        return await updateSurvey(id, name, description, data, status);
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