// @format
// Generate new types:
// ./node_modules/apollo/bin/run codegen:generate --localSchemaFile=src/graphql/graphql-schema.json --target=typescript --includes=src/components/Queries.ts --tagName=gql --addTypename --globalTypesFile=src/graphql/graphql-global-types.ts types

import {gql} from "@apollo/client";

const queries = {
  CREATE_USER: gql`
  mutation createUser ($miniappsIdentifier: String!){
    createUser(miniappsIdentifier: $miniappsIdentifier) {
      id
    }
  }`,

  GET_USER_WITH_TRIPS: gql`
  query getUser($identifier: String!) {
    user(miniappsIdentifier:$identifier) {
        id,
        miniappsIdentifier,
        trips {
          id
          inviteCode
          location
          from
          to
          stays {
            id
            imageUrl
            name
            votes
          }
        }
      }
  }`,

  CREATE_TRIP_FOR_USER: gql`
  mutation createTripForUser($userid: Int!, $options: TripInputs!) {
    createTripForUser(userid:$userid, options:$options) {
      id
      trips {
        id
        inviteCode
      }
    }
  }`,

  CREATE_STAY_FOR_TRIP: gql`
  mutation createStayForTrip($tripid: Int!, $url: String!) {
    createStayForTrip(tripid:$tripid, url: $url) {
        id
        stays {
            id,
            name,
            imageUrl
        }
    }
  }`,

  VOTE_FOR_STAY: gql`
  mutation voteForStay($stayid: Int!) {
    bumpVoteCountOfStay(stayid: $stayid) {
      id,
      name,
      votes
    }
  }`,

  JOIN_EXISTING_TRIP: gql`
  mutation joinTrip($userid: Int!, $inviteCode: String!) {
      joinTripForUser(userid: $userid, inviteCode: $inviteCode) {
          id
      }
  }`,
};

export default queries;
