export interface Meme {
  id: string;
  imageUrl: string;
  topText: string;
  bottomText: string;
  template?: string;
  creator: User;
  createdAt: string;
  votes: number;
  views: number;
  comments: Comment[];
  tags: string[];
}

export interface User {
  id: string;
  username: string;
  avatarUrl: string;
  joinedAt: string;
  badges: Badge[];
}

export interface Comment {
  id: string;
  text: string;
  user: User;
  createdAt: string;
  likes: number;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface MemeTemplate {
  id: string;
  name: string;
  imageUrl: string;
  popular: boolean;
}

export type SortOption = 'new' | 'top' | 'trending';