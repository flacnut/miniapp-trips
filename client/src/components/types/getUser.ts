/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getUser
// ====================================================

export interface getUser_user_trips_stays {
  __typename: "Stay";
  id: number;
  imageUrl: string;
  name: string;
  votes: number;
}

export interface getUser_user_trips {
  __typename: "Trip";
  id: number;
  inviteCode: string;
  location: string;
  from: string;
  to: string;
  stays: getUser_user_trips_stays[];
}

export interface getUser_user {
  __typename: "User";
  id: number;
  miniappsIdentifier: string;
  trips: getUser_user_trips[] | null;
}

export interface getUser {
  user: getUser_user;
}

export interface getUserVariables {
  identifier: string;
}
