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
import Image from 'next/image';
import React from 'react';

export const Header: React.FC = () => {
  return (
    <div className="flex bg-white px-4 py-2 items-center shadow-sm sticky top-0 z-100">
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
        <MenuIcon className="icon" />
      </div>
    </div>
  );
};
