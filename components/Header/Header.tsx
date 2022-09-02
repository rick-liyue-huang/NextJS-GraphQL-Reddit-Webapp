import {
  BellIcon,
  ChatIcon,
  GlobeIcon,
  MenuIcon,
  PlusIcon,
  SearchIcon,
  SparklesIcon,
  SpeakerphoneIcon,
  SwitchHorizontalIcon,
  VideoCameraIcon,
} from '@heroicons/react/outline';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ChangeEvent, useEffect, useState } from 'react';

interface FormData {
  topic: string;
}

export const Header: React.FC = () => {
  const { data: session } = useSession();
  const [topic, setTopic] = useState('');
  const router = useRouter();

  const { theme, setTheme } = useTheme();

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setTopic(e.target.value);
  };

  const handleLogin = () => {
    signIn();
  };

  const handleLogout = () => {
    signOut();
  };

  useEffect(() => {
    const callback = () => {
      if (!topic) {
        router.push('/');
      } else {
        router.push(`/r/${topic}`);
      }
    };
    callback();
  }, [topic]);

  return (
    <div className="flex bg-white dark:bg-green-900 px-3 items-center shadow-sm sticky top-0 z-100 pb-2">
      {/* Logo */}
      <div>
        <Link href="/">
          <img
            src="/images/redditlogo.png"
            className="w-23 h-10 flex-shrink-0 box-border cursor-pointer"
          />
        </Link>
      </div>
      {/* Home menu */}
      <div
        className="mx-7 flex item-center xl:min-w-[300px] cursor-pointer"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        <SwitchHorizontalIcon className="h-5 w-5" />
        <p className="flex-1 ml-2 hidden lg:inline font-semibold text-gray-600 dark:text-white">
          Toggle Theme Mode
        </p>
      </div>

      {/* Search Input */}
      <form className="flex flex-1 items-center space-x-2 border border-gray-200 rounded-md bg-gray-50 px-3 py-1 dark:bg-gray-300">
        <SearchIcon className="w-6 h-6" />
        <input
          type="text"
          value={topic}
          onChange={handleSearch}
          placeholder="Search posts by entering community topic..."
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
        <MenuIcon
          className="icon"
          onClick={session ? handleLogout : handleLogin}
        />
      </div>
      {/* auth buttons */}
      {session ? (
        <div
          className="hidden lg:flex items-center space-x-2 p-2 cursor-pointer"
          onClick={handleLogout}
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
