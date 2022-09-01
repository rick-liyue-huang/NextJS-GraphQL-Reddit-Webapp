import { gql } from '@apollo/client';

// gaphql query coding, used to connect with apollo/client
export const ADD_POST = gql`
  mutation MyMutation(
    $image: String!
    $body: String!
    $subreddit_id: ID!
    $title: String!
    $username: String!
  ) {
    insertPost(
      image: $image
      body: $body
      subreddit_id: $subreddit_id
      title: $title
      username: $username
    ) {
      body
      created_at
      id
      image
      subreddit_id
      title
      username
    }
  }
`;

export const ADD_SUBREDDIT = gql`
  mutation MyMutation($topic: String!) {
    insertSubReddit(topic: $topic) {
      created_at
      id
      topic
    }
  }
`;
