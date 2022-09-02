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
      id
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

export const GET_ALL_POSTS_BY_TOPIC = gql`
  query MyQuery($topic: String!) {
    getPostListByTopic(topic: $topic) {
      id
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

export const GET_POST_BY_POST_ID = gql`
  query MyQuery($post_id: ID!) {
    getPostByPostId(post_id: $post_id) {
      id
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

export const GET_ALL_VOTES_BY_POST_ID = gql`
  query MyQuery($post_id: ID!) {
    getVotesByPostId(post_id: $post_id) {
      id
      post_id
      upvote
      username
      created_at
    }
  }
`;

export const GET_SUBREDDIT_WITH_LIMIT = gql`
  query MyQuery($limit: Int!) {
    getSubredditWithLimit(limit: $limit) {
      id
      topic
      created_at
    }
  }
`;
