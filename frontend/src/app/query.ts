import gql from 'graphql-tag';

export const createSurvey = gql`
    mutation createSurvey($name: String!, $description: String!, $data: String!, $status: String!){
        createSurvey(name: $name, description: $description, data: $data, status: $status){
            id,
            name,
            description,
            data,
            status
        }
    }
`;


export const removeSurvey = gql`
    mutation removeSurvey($id: Int!){
        removeSurvey(id: $id){
            id,
            name,
            description,
            data,
            status
        }
}`;

export const editSurvey = gql`
    mutation editSurvey($id: Int!,$name:String!,$description:String!, $data: String!, $status: String!){
        editSurvey(id: $id, name:$name, description:$description, data: $data, status: $status){
            id,
            name,
            description,
            data,
            status
        }
}`;


export const Surveys = gql`
    query{
        surveys{
            id,
            name,
            description,
            data,
            status
        }
    }
`;

export const Survey = gql`
    query survey($id: Int!){
        survey(id: $id){
            id,
            name,
            description,
            data,
            status
        }
    }
`;

// export const ArticleDetailQuery = gql`
// query Article($articleId: Int!) {
//     article(id: $articleId) {
//       id
//       title
//       text
//       author {
//         id
//         username
//         bio
//       }
//       comments {
//         id
//         text
//         author {
//           id
//           username
//         }
//       }
//     }
//   }`;