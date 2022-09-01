import { Orbit } from '@uiball/loaders';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Avatar } from '../../../components/Avatar/Avatar';
import { Feed } from '../../../components/Feed/Feed';
import { PostBox } from '../../../components/PostBox/PostBox';

const CommunityPage: NextPage = () => {
  const router = useRouter();
  const {
    query: { topic },
  } = router;

  // console.log('topic: ', topic);

  if (!topic) {
    return (
      <div className="flex w-full items-center justify-center p-10 text-xl">
        <Orbit size={60} color="green" />
      </div>
    );
  }

  return (
    <div className={`h-24 bg-green-400 p-10`}>
      <div className="-mx-10 mt-10 bg-white">
        <div className="mx-auto flex max-w-5xl items-center space-x-4 pb-3">
          <div className="-mt-5">
            <Avatar seed={topic as string} large />
          </div>
          <div className="py-2">
            <h1 className="text-3xl font-semibold text-green-400">
              Welcome to r/{topic} Community
            </h1>
            <p className="text-sm text-gray-400">r/{topic}</p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl mt-5 pb-10">
        {/* need to update the two components for rendering the conditional data */}
        <PostBox subreddit={topic as string} />
        <Feed topic={topic as string} />
      </div>
    </div>
  );
};

export default CommunityPage;
