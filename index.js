const express = require('express')
const app = express();
const graphqlHTTP = require('express-graphql')
const cors = require('cors')

const { buildSchema } = require('graphql')
const { getSurvey, addSurvey, getSurveys,deleteSurvey,editSurvey } = require('./data/survey')

var schema = buildSchema(`
    type Survey {
        data: String
        description: String,
        name: String,
        id: Int,
    },
    type Query {
        surveys: [Survey],
        survey(id: Int!): Survey
    },
    type Mutation {
        createSurvey(name: String!, description: String!, data: String!): Survey,
        removeSurvey(id: Int!): [Survey],
        editSurvey(id: Int!,name: String!,description: String!,data: String!): Survey
    }
`)

var root = {
    survey: async ({ id }) => {
        return await getSurvey(id)
    },
    surveys: async () => {
        console.log(await getSurveys())
        return await getSurveys()
    },
    createSurvey: async args => {
        const { name, description, data } = args
        return await addSurvey(name, description, data)
    },
    removeSurvey: ({id}) => {
        return deleteSurvey(id);
    },
    editSurvey: args => {
        const {  id ,name , description,data} = args;
        return editSurvey( id , name, description,data);
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