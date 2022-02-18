/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: joinTrip
// ====================================================

export interface joinTrip_joinTripForUser {
  __typename: "User";
  id: number;
}

export interface joinTrip {
  joinTripForUser: joinTrip_joinTripForUser | null;
}

export interface joinTripVariables {
  userid: number;
  inviteCode: string;
}
