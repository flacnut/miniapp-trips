/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TripInputs } from "./../../graphql/graphql-global-types";

// ====================================================
// GraphQL mutation operation: createTripForUser
// ====================================================

export interface createTripForUser_createTripForUser_trips {
  __typename: "Trip";
  id: number;
  inviteCode: string;
}

export interface createTripForUser_createTripForUser {
  __typename: "User";
  id: number;
  trips: createTripForUser_createTripForUser_trips[] | null;
}

export interface createTripForUser {
  createTripForUser: createTripForUser_createTripForUser;
}

export interface createTripForUserVariables {
  userid: number;
  options: TripInputs;
}
