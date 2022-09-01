export type Post = {
  id: number;
  title: string;
  body: string;
  created_at: string;
  image: string;
  subreddit_id: number;
  username: string;
  votes: Vote[];
  comments: Comment[];
  subreddit: Subreddit[];
};

export type Comment = {
  id: number;
  created_at: string;
  post_id: number;
  text: string;
  username: string;
};

export type Vote = {
  id: number;
  created_at: string;
  post_id: number;
  upvote: boolean;
  username: string;
};

export type Subreddit = {
  id: number;
  created_at: string;
  topic: string;
};
