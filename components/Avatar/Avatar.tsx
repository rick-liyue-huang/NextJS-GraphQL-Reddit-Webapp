import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';

interface Props {
  seed?: string;
  large?: boolean;
}

export const Avatar: React.FC<Props> = ({ seed, large }) => {
  const { data: session } = useSession();

  return (
    <div
      className={`relative w-10 h-10 rounded-full border-gray-400 bg-white ${
        large && 'w-20 h-20'
      } overflow-hidden`}
    >
      <Image
        src={`https://avatars.dicebear.com/api/open-peeps/${
          seed || session?.user?.name || 'unknown'
        }.svg`}
        layout="fill"
      />
    </div>
  );
};
