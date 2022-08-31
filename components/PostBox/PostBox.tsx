import { LinkIcon, PhotographIcon } from '@heroicons/react/outline';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Avatar } from '../Avatar/Avatar';

interface FormData {
  postTitle: string;
  postBody: string;
  postImage: string;
  subreddit: string;
}

export const PostBox: React.FC = () => {
  const [imageBoxOpen, setImageBoxOpen] = useState(false);
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (formData: FormData) => {
    console.log(formData);
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
              ? 'create your post by entering title here...'
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
          <div className="flex items-center px-2">
            <p className="min-w-[90px]">Community:</p>
            <input
              className="m-2 flex-1 bg-gray-50 p-2 outline-none"
              type="text"
              placeholder="Community name"
              {...register('subreddit', { required: true })}
            />
          </div>

          {imageBoxOpen && (
            <div className="flex items-center px-2">
              <p className="min-w-[90px]">Community:</p>
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
