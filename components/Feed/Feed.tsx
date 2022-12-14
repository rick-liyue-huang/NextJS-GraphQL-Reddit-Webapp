import { useQuery } from '@apollo/client';
import { Orbit } from '@uiball/loaders';
import React from 'react';
import {
  GET_ALL_POSTS,
  GET_ALL_POSTS_BY_TOPIC,
} from '../../graphql/queries/queries';
import { Post } from '../../types';
import { PostComponent } from '../Post/Post';

interface Props {
  topic?: string;
}

export const Feed: React.FC<Props> = ({ topic }) => {
  const { data, error } = !topic
    ? useQuery(GET_ALL_POSTS)
    : useQuery(GET_ALL_POSTS_BY_TOPIC, {
        variables: {
          topic: topic,
        },
      });

  // compare with 'query for the subreddit topic' in PostBox
  const posts: Post[] = !topic ? data?.getPostList : data?.getPostListByTopic;

  console.log('posts: ===', posts);

  if (!posts) {
    return (
      <div className="flex w-full items-center justify-center p-10 text-xl">
        <Orbit size={60} color="green" />
      </div>
    );
  }

  return (
    <div className="mt-5 space-y-3">
      {posts?.map((post) => (
        <PostComponent key={post.id} post={post} />
      ))}
    </div>
  );
};
