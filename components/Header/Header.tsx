import {
  BellIcon,
  ChatIcon,
  GlobeIcon,
  MenuIcon,
  PlusIcon,
  SearchIcon,
  SparklesIcon,
  SpeakerphoneIcon,
  VideoCameraIcon,
} from '@heroicons/react/outline';
import { ChevronDownIcon, HomeIcon } from '@heroicons/react/solid';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';

export const Header: React.FC = () => {
  const { data: session } = useSession();

  const handleLogin = () => {
    signIn();
  };

  return (
    <div className="flex bg-white px-3 items-center shadow-sm sticky top-0 z-100 pb-2">
      {/* Logo */}
      <div className="relative w-20 h-10 flex-shrink-0">
        <Image src="/images/redditlogo.png" layout="fill" objectFit="contain" />
      </div>
      {/* Home menu */}
      <div className="mx-7 flex item-center xl:min-w-[300px]">
        <HomeIcon className="h-5 w-5" />
        <p className="flex-1 ml-2 hidden lg:inline">Home</p>
        <ChevronDownIcon className="h-5 w-5" />
      </div>
      {/* Search Input */}
      <form className="flex flex-1 items-center space-x-2 border border-gray-200 rounded-md bg-gray-50 px-3 py-1">
        <SearchIcon className="w-6 h-6" />
        <input
          type="text"
          placeholder="Search something..."
          className="flex-1 bg-transparent outline-none text-gray-500"
        />
        <button className="hidden" type="submit" />
      </form>

      {/* Icons sample */}
      <div className="items-center space-x-2 mx-5 hidden lg:inline-flex">
        <SparklesIcon className="icon" />
        <GlobeIcon className="icon" />
        <VideoCameraIcon className="icon" />
        <hr className="h-10 border border-gray-50" />
        <ChatIcon className="icon" />
        <BellIcon className="icon" />
        <PlusIcon className="icon" />
        <SpeakerphoneIcon className="icon" />
      </div>
      <div className="ml-5 flex items-center lg:hidden">
        <MenuIcon className="icon" onClick={handleLogin} />
      </div>
      {/* auth buttons */}
      {session ? (
        <div
          className="hidden lg:flex items-center space-x-2 p-2 cursor-pointer"
          onClick={handleLogin}
        >
          <div className="relative w-6 h-6 flex-shrink-0">
            <Image
              src="/images/redditFace.svg"
              alt="user logo"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className="flex-1 text-sm">
            <p className="truncated text-gray-600">{session?.user?.name}</p>
            <p className="text-gray-400">1 karma</p>
          </div>
          <ChevronDownIcon className="h-5 flex-shrink-0 text-gray-400" />
        </div>
      ) : (
        <div
          className="hidden lg:flex items-center space-x-2 p-1 cursor-pointer"
          onClick={handleLogin}
        >
          <div className="relative w-6 h-6 flex-shrink-0">
            <Image
              src="/images/redditFace.svg"
              alt="user logo"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <p className="text-gray-400">Log In</p>
        </div>
      )}
    </div>
  );
};
