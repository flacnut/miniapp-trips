/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: voteForStay
// ====================================================

export interface voteForStay_bumpVoteCountOfStay {
  __typename: "Stay";
  id: number;
  name: string;
  votes: number;
}

export interface voteForStay {
  bumpVoteCountOfStay: voteForStay_bumpVoteCountOfStay;
}

export interface voteForStayVariables {
  stayid: number;
}
