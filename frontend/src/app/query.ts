import gql from 'graphql-tag';

export const createSurvey = gql`
    mutation createSurvey($name: String!, $description: String!, $data: String!){
        createSurvey(name: $name, description: $description, data: $data){
            name,
            description,
            data
        }
    }
`;


export const removeSurvey = gql`
    mutation removeSurvey($id: Int!){
        removeSurvey(id: $id){
            id,
            name,
            description
        }
}`;

export const editSurvey = gql`
    mutation editSurvey($id: Int!,$name:String!,$description:String!, $data: String!){
        editSurvey(id: $id,name:$name, description:$description, data: $data){
            id,
            name,
            description,
            data
        }
}`;


export const Surveys = gql`
    query{
        surveys{
            id,
            name,
            description,
            data
        }
    }
`;