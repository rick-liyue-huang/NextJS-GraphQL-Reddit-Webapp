import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import React from 'react';
import { PostComponent } from '../../../../components/Post/Post';
import { GET_POST_BY_POST_ID } from '../../../../graphql/queries/queries';
import { Post } from '../../../../types';

const PostPage: React.FC = () => {
  const {
    query: { postId },
  } = useRouter();
  const { data, error } = useQuery(GET_POST_BY_POST_ID, {
    variables: {
      post_id: postId,
    },
  });

  const post: Post = data?.getPostByPostId;

  return (
    <div className="max-w-5xl mx-auto my-5">
      <PostComponent post={post} />
    </div>
  );
};

export default PostPage;
