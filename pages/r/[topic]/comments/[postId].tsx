import { useMutation, useQuery } from '@apollo/client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import ReactTimeago from 'react-timeago';
import { Avatar } from '../../../../components/Avatar/Avatar';
import { PostComponent } from '../../../../components/Post/Post';
import { ADD_MUTATION } from '../../../../graphql/mutations/mutatioins';
import { GET_POST_BY_POST_ID } from '../../../../graphql/queries/queries';
import { Post } from '../../../../types';

type FormData = {
  comment: string;
};

const PostPage: React.FC = () => {
  const {
    query: { postId },
  } = useRouter();
  const { data, error } = useQuery(GET_POST_BY_POST_ID, {
    variables: {
      post_id: postId,
    },
  });
  const { data: session } = useSession();
  const post: Post = data?.getPostByPostId;
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>();
  const [addComment] = useMutation(ADD_MUTATION, {
    refetchQueries: [GET_POST_BY_POST_ID, 'getPostByPostId'], // in order to get the newest post comments
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    // console.log(data);

    const notification = toast.loading('loading the comments...');

    try {
      await addComment({
        variables: {
          post_id: postId,
          username: session?.user?.name,
          text: data.comment,
        },
      });

      setValue('comment', '');
      toast.success('comment loaded successfully', {
        id: notification,
      });
    } catch (err) {
      toast.error(`something wrong: ${err}`, {
        id: notification,
      });
    }
  };

  // console.log(data.comment);

  return (
    <div className="max-w-5xl mx-auto my-5">
      <PostComponent post={post} />

      {/* Comment */}
      <div className="rounded-b-md border border-t-0 border-gray-300 bg-white p-5 pl-16 -mt-1">
        <p>
          Comment as{' '}
          <span className="text-green-400">{session?.user?.name}</span>
        </p>

        <form
          className="flex flex-col space-y-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <textarea
            disabled={!session}
            className="h-24 rounded-sm border border-gray-300 p-2 pl-4 outline-none disabled:bg-gray-50"
            placeholder={session ? 'give me some idea' : 'log in please'}
            {...register('comment', { required: true })}
          />
          <button
            type="submit"
            className="rounded-full font-semibold bg-green-300 text-white p-2 disabled:bg-gray-200"
          >
            Comment
          </button>
        </form>
      </div>

      <div className="rounded-b-md bg-white py-5 px-10">
        <hr className="py-2" />
        {post?.comments.map((comment) => (
          <div
            key={comment.id}
            className="relative flex items-center space-x-2 space-y-5"
          >
            {/* <hr className="absolute top-10 h-14 z-0 left-7 border" /> */}
            <div className="z-20">
              <Avatar seed={comment.username} />
            </div>
            <div className="flex flex-col">
              <p className="py-2 text-sm text-gray-400">
                <span className="text-gray-600 font-light">
                  {comment.username}
                </span>
                {' - '}
                <ReactTimeago date={comment.created_at} />
              </p>
              <p className="text-green-500">{comment.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostPage;
