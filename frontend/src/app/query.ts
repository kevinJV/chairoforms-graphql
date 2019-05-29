import gql from 'graphql-tag';

export const createForm = gql`
    mutation createForm($name: String!, $description: String!, $data: String!){
        createForm(name: $name, description: $description, data: $data){
            name,
            description,
            data
        }
    }
`;

export const forms = gql`
    query{
        forms{
            id,
            name,
            description,
            data
        }
    }
`;