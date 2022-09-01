import { useMutation } from '@apollo/client';
import { LinkIcon, PhotographIcon } from '@heroicons/react/outline';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { client } from '../../apollo/apollo-client';
import { ADD_POST, ADD_SUBREDDIT } from '../../graphql/mutations/mutatioins';
import {
  GET_ALL_POSTS,
  GET_SUBREDDIT_BY_TOPIC,
} from '../../graphql/queries/queries';
import { Avatar } from '../Avatar/Avatar';

interface FormData {
  postTitle: string;
  postBody: string;
  postImage: string;
  subreddit: string;
}

interface Props {
  subreddit?: string;
}

export const PostBox: React.FC<Props> = ({ subreddit }) => {
  const [imageBoxOpen, setImageBoxOpen] = useState(false);
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  // console.log('topic ---', subreddit);

  // connect with graphql query coding
  const [addPost] = useMutation(ADD_POST, {
    // after add post to refech another method
    refetchQueries: [GET_ALL_POSTS, 'getPostList'],
  });
  const [addSubReddit] = useMutation(ADD_SUBREDDIT);

  const onSubmit = async (formData: FormData) => {
    console.log(formData);

    const notification = toast.loading('creating new post...');

    try {
      // query for the subreddit topic
      const {
        data: { getSubredditListByTopic },
      } = await client.query({
        fetchPolicy: 'no-cache', // very important for get the existing community without refreshing page
        query: GET_SUBREDDIT_BY_TOPIC,
        variables: {
          topic: subreddit || formData.subreddit,
        },
      });

      const communityExist = getSubredditListByTopic.length > 0;

      if (!communityExist) {
        // create subreddit
        console.log(`community is not exists and need new one`);

        // notice to match the name with index.graphql and mutaions.ts
        const {
          data: { insertSubReddit: newCommunity },
        } = await addSubReddit({
          variables: {
            topic: subreddit || formData.subreddit,
          },
        });

        console.log('creating post ...', formData);
        const image = formData.postImage || '';

        const {
          data: { insertPost: newPost },
        } = await addPost({
          variables: {
            body: formData.postBody,
            image,
            subreddit_id: newCommunity.id,
            title: formData.postTitle,
            username: session?.user?.name,
          },
        });

        console.log('new post: ', newPost);
      } else {
        // using existing subreddit

        console.log('using existing community...');
        console.log(getSubredditListByTopic);

        const image = formData.postImage || '';

        const {
          data: { insertPost: newPost },
        } = await addPost({
          variables: {
            title: formData.postTitle,
            body: formData.postBody,
            image,
            subreddit_id: getSubredditListByTopic[0].id,
            username: session?.user?.name,
          },
        });

        console.log('after existing community, get new post: ', newPost);
      }

      // after new post created
      setValue('postTitle', '');
      setValue('postBody', '');
      setValue('postImage', '');
      setValue('subreddit', '');

      toast.success('New post created...', {
        id: notification,
      });
      // window.location.reload();
    } catch (err) {
      toast.error(`something wrong... ${err}`, {
        id: notification,
      });
    }
  };

  return (
    <form
      className="z-50 sticky top-16 border border-gray-300 rounded-md w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex items-center space-x-3">
        {/* Avatar */}
        <Avatar />
        <input
          type="text"
          disabled={!session}
          {...register('postTitle', { required: true })}
          placeholder={
            session
              ? subreddit
                ? `create post in r/${subreddit}`
                : 'create your post by entering title here...'
              : 'login first please...'
          }
          className="bg-gray-50 p-2 pl-5 outline-none flex-1 text-gray-600"
        />
        <PhotographIcon
          onClick={() => setImageBoxOpen(!imageBoxOpen)}
          className={`w-6 h-6 text-gray-300 cursor-pointer ${
            imageBoxOpen && 'text-green-300'
          }`}
        />
        <LinkIcon className={`w-6 h-6 text-gray-300 cursor-pointer`} />
      </div>
      {/* watch the input text and render the new component */}
      {!!watch('postTitle') && (
        <div className="flex flex-col py-1">
          {/* post body */}
          <div className="flex items-center px-2">
            <p className="min-w-[90px]">Body:</p>
            <input
              className="m-2 flex-1 bg-gray-50 p-2 outline-none"
              type="text"
              placeholder="Post Text"
              {...register('postBody')}
            />
          </div>

          {/* show in home page */}
          {!subreddit && (
            <div className="flex items-center px-2">
              <p className="min-w-[90px]">Community:</p>
              <input
                className="m-2 flex-1 bg-gray-50 p-2 outline-none"
                type="text"
                placeholder="Community name"
                {...register('subreddit', { required: true })}
              />
            </div>
          )}

          {imageBoxOpen && (
            <div className="flex items-center px-2">
              <p className="min-w-[90px]">Image Url:</p>
              <input
                className="m-2 flex-1 bg-gray-50 p-2 outline-none"
                type="text"
                placeholder="image url name"
                {...register('postImage')}
              />
            </div>
          )}

          {/* errors */}
          {Object.keys(errors).length > 0 && (
            <div className="space-y-2 p-2 text-red-500">
              {errors?.postTitle?.type === 'required' && (
                <p>Need the post title</p>
              )}
              {errors?.subreddit?.type === 'required' && (
                <p>Need the community name</p>
              )}
            </div>
          )}
          {!!watch('postTitle') && (
            <button
              className="w-full rounded-full bg-green-400 text-white p-2"
              type="submit"
            >
              Create one Post
            </button>
          )}
        </div>
      )}
    </form>
  );
};
