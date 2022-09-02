import { ChevronUpIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { Avatar } from '../Avatar/Avatar';

interface Props {
  topic: string;
  index: number;
}

export const CommunityComponent: React.FC<Props> = ({ topic, index }) => {
  return (
    <div className="flex items-center space-x-2 border-t bg-white px-4 py-2 last:rounded-b">
      <p>{index + 1}</p>
      <ChevronUpIcon className="w-4 h-4 flex-shrink-0 text-green-400" />
      <Avatar seed={`/r/${topic}`} />
      <p className="flex-1 truncate">r/{topic}</p>
      <Link href={`/r/${topic}`}>
        <div className="cursor-pointer rounded-md bg-green-400 px-3 text-white">
          View
        </div>
      </Link>
    </div>
  );
};
