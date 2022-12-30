import { gql } from "@apollo/client";

export const getData = gql`
    query {
        documents {
            _id
            Name
            IPR
            Designation
            Status
            Number
            Office
            Owner
        }
    }
`;