import {
  ArrowDownIcon,
  ArrowUpIcon,
  BookmarkIcon,
  ChatAltIcon,
  DotsHorizontalIcon,
  GiftIcon,
  ShareIcon,
} from '@heroicons/react/outline';
import React from 'react';
import TimeAgo from 'react-timeago';
import { Post } from '../../types';
import { Avatar } from '../Avatar/Avatar';

interface Props {
  post: Post;
}

export const PostComponent: React.FC<Props> = ({ post }) => {
  return (
    <div className="flex cursor-pointer rounded-md border border-gray-300 bg-white shandow-sm hover:border hover:border-green-400">
      {/* vote */}
      <div className="flex flex-col items-center justify-start space-y-1 rounded-l-md bg-gray-50 p-4 text-gray-400">
        <ArrowUpIcon className="voteButtons hover:text-green-400" />
        <p className="text-xs font-bold text-gray-700">0</p>
        <ArrowDownIcon className="voteButtons hover:text-green-400" />
      </div>

      <div className="p-3 pb-1">
        {/* Header */}
        <div className="flex items-center space-x-2 ">
          <Avatar seed={post.subreddit[0]?.topic} />
          <p className="text-sm text-gray-400">
            <span className="font-bold text-gray-600 hover:text-green-400 hover:underline">
              r/{post.subreddit[0]?.topic}
            </span>{' '}
            - Post by u/
            {post.username} - <TimeAgo date={post.created_at} />
          </p>
        </div>

        {/* Body */}
        <div className="py-4">
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <p className="mt-2 text-sm font-light">{post.body}</p>
        </div>

        {/* Image */}
        <img src={post.image} alt="" className="w-full" />

        {/* Footer */}
        <div className="flex space-x-4 text-gray-400">
          <div className="postButtons">
            <ChatAltIcon className="w-6 h-6" />
            <p className="">{post.comments.length} comments</p>
          </div>
          <div className="postButtons">
            <GiftIcon className="w-6 h-6" />
            <p className="hidden sm:inline">Award</p>
          </div>
          <div className="postButtons">
            <ShareIcon className="w-6 h-6" />
            <p className="hidden sm:inline">Share</p>
          </div>
          <div className="postButtons">
            <BookmarkIcon className="w-6 h-6" />
            <p className="hidden sm:inline">Save</p>
          </div>
          <div className="postButtons">
            <DotsHorizontalIcon className="w-6 h-6" />
          </div>
        </div>
      </div>
    </div>
  );
};
