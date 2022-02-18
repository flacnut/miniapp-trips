/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createStayForTrip
// ====================================================

export interface createStayForTrip_createStayForTrip_stays {
  __typename: "Stay";
  id: number;
  name: string;
  imageUrl: string;
}

export interface createStayForTrip_createStayForTrip {
  __typename: "Trip";
  id: number;
  stays: createStayForTrip_createStayForTrip_stays[];
}

export interface createStayForTrip {
  createStayForTrip: createStayForTrip_createStayForTrip;
}

export interface createStayForTripVariables {
  tripid: number;
  url: string;
}
