import { useMutation, useQuery } from '@apollo/client';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BookmarkIcon,
  ChatAltIcon,
  DotsHorizontalIcon,
  GiftIcon,
  ShareIcon,
} from '@heroicons/react/outline';
import { Orbit } from '@uiball/loaders';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import TimeAgo from 'react-timeago';
import { ADD_VOTE } from '../../graphql/mutations/mutatioins';
import { GET_ALL_VOTES_BY_POST_ID } from '../../graphql/queries/queries';
import { Post, Vote } from '../../types';
import { Avatar } from '../Avatar/Avatar';

interface Props {
  post: Post;
}

export const PostComponent: React.FC<Props> = ({ post }) => {
  const { data: session } = useSession();
  const [vote, setVote] = useState<boolean>();
  const { data, loading, error } = useQuery(GET_ALL_VOTES_BY_POST_ID, {
    variables: {
      post_id: post?.id,
    },
  });

  const [addVote] = useMutation(ADD_VOTE, {
    refetchQueries: [GET_ALL_VOTES_BY_POST_ID, 'getVotesByPostId'],
  });

  const handleUpVote = async (isUpVote: boolean) => {
    if (!session) {
      toast('Please login firstly');
      return;
    }

    if (vote && isUpVote) return;
    if (vote === false && !isUpVote) return;

    console.log('vote: ', isUpVote);

    await addVote({
      variables: {
        post_id: post.id,
        username: session.user?.name,
        upvote: isUpVote,
      },
    });
  };

  useEffect(() => {
    const votes: Vote[] = data?.getVotesByPostId;
    const vote = votes?.find(
      (vote) => vote.username === session?.user?.name
    )?.upvote;

    setVote(vote);
  }, [data]);

  // console.log('error: ', error);
  const handleDisplayVotes = (data: any) => {
    const votes: Vote[] = data?.getVotesByPostId;
    const displayedNumber = votes?.reduce(
      (total, vote) => (vote?.upvote ? (total += 1) : (total -= 1)),
      0
    );

    if (votes?.length === 0) {
      return 0;
    }

    if (displayedNumber === 0) {
      return votes[0]?.upvote ? 1 : -1;
    }

    return displayedNumber;
  };

  if (!post) {
    return (
      <div className="flex w-full items-center justify-center p-10 text-xl">
        <Orbit size={60} color="green" />
      </div>
    );
  }

  return (
    <Link href={`/r/${post.subreddit[0]?.topic}/comments/${post.id!}`}>
      <div className="flex cursor-pointer rounded-md border border-gray-300 bg-white shandow-sm hover:border hover:border-green-400">
        {/* vote */}
        <div className="flex flex-col items-center justify-start space-y-1 rounded-l-md bg-gray-50 p-4 text-gray-400">
          <ArrowUpIcon
            className={`voteButtons hover:text-green-400 ${
              vote && 'text-green-400'
            }`}
            onClick={() => handleUpVote(true)}
          />
          <p className="text-xs font-bold text-gray-700">
            {handleDisplayVotes(data)}
          </p>
          <ArrowDownIcon
            className={`voteButtons hover:text-green-400 ${
              vote === false && 'text-green-400'
            }`}
            onClick={() => handleUpVote(false)}
          />
        </div>

        <div className="p-3 pb-1">
          {/* Header */}
          <div className="flex items-center space-x-2 ">
            <Avatar seed={post.subreddit[0]?.topic} />
            <p className="text-sm text-gray-400">
              <Link href={`/r/${post.subreddit[0]?.topic}`}>
                <span className="font-bold text-gray-600 hover:text-green-400 hover:underline">
                  r/{post.subreddit[0]?.topic}
                </span>
              </Link>{' '}
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
    </Link>
  );
};
