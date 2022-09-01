import { useQuery } from '@apollo/client';
import React from 'react';
import { GET_ALL_POSTS } from '../../graphql/queries/queries';
import { Post } from '../../types';
import { PostComponent } from '../Post/Post';

export const Feed: React.FC = () => {
  const { data, error } = useQuery(GET_ALL_POSTS);

  // compare with 'query for the subreddit topic' in PostBox
  const posts: Post[] = data?.getPostList;

  return (
    <div className="mt-5 space-y-3">
      {posts?.map((post) => (
        <PostComponent key={post.title} post={post} />
      ))}
    </div>
  );
};
