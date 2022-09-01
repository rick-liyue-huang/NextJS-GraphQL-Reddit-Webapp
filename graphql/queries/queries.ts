import { gql } from '@apollo/client';

// gaphql query coding, used to connect with apollo/client
export const GET_SUBREDDIT_BY_TOPIC = gql`
  query MyQuery($topic: String!) {
    getSubredditListByTopic(topic: $topic) {
      created_at
      id
      topic
    }
  }
`;

// after update the index.graphql, add comments, subreddit and votes fields
export const GET_ALL_POSTS = gql`
  query MyQuery {
    getPostList {
      title
      body
      image
      subreddit_id
      username
      created_at
      subreddit {
        id
        created_at
        topic
      }
      comments {
        id
        created_at
        post_id
        text
        username
      }
      votes {
        created_at
        id
        post_id
        upvote
        username
      }
    }
  }
`;
