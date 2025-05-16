import { Meme, User, MemeTemplate } from '../types';
import { generateUniqueId } from '../utils/helpers';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    username: 'mememaster',
    avatarUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    joinedAt: '2023-02-15T10:00:00Z',
    badges: [
      { id: '1', name: 'Founder', icon: 'award', description: 'One of the first members' },
      { id: '2', name: 'Meme Lord', icon: 'crown', description: 'Created over 100 memes' }
    ]
  },
  {
    id: '2',
    username: 'laughcity',
    avatarUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    joinedAt: '2023-03-20T14:30:00Z',
    badges: [
      { id: '3', name: 'Rising Star', icon: 'trending-up', description: 'Rapidly gaining popularity' }
    ]
  },
  {
    id: '3',
    username: 'funnybone',
    avatarUrl: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150',
    joinedAt: '2023-01-05T09:15:00Z',
    badges: []
  }
];

// Mock Meme Templates
export const memeTemplates: MemeTemplate[] = [
  {
    id: '1',
    name: 'Drake Hotline Bling',
    imageUrl: 'https://images.pexels.com/photos/4040381/pexels-photo-4040381.jpeg?auto=compress&cs=tinysrgb&w=600',
    popular: true
  },
  {
    id: '2',
    name: 'Distracted Boyfriend',
    imageUrl: 'https://images.pexels.com/photos/374044/pexels-photo-374044.jpeg?auto=compress&cs=tinysrgb&w=600',
    popular: true
  },
  {
    id: '3',
    name: 'Two Buttons',
    imageUrl: 'https://images.pexels.com/photos/2469122/pexels-photo-2469122.jpeg?auto=compress&cs=tinysrgb&w=600',
    popular: true
  },
  {
    id: '4',
    name: 'Change My Mind',
    imageUrl: 'https://images.pexels.com/photos/3082341/pexels-photo-3082341.jpeg?auto=compress&cs=tinysrgb&w=600',
    popular: false
  },
  {
    id: '5',
    name: 'Left Exit 12 Off Ramp',
    imageUrl: 'https://images.pexels.com/photos/3078831/pexels-photo-3078831.jpeg?auto=compress&cs=tinysrgb&w=600',
    popular: false
  }
];

// Mock Memes
export const mockMemes: Meme[] = [
  {
    id: '1',
    imageUrl: 'https://images.pexels.com/photos/4126684/pexels-photo-4126684.jpeg?auto=compress&cs=tinysrgb&w=600',
    topText: 'When you finally fix that bug',
    bottomText: 'But create 10 more in the process',
    creator: mockUsers[0],
    createdAt: '2023-05-12T18:25:00Z',
    votes: 1238,
    views: 5420,
    comments: [
      {
        id: '1',
        text: 'Story of my life as a developer!',
        user: mockUsers[1],
        createdAt: '2023-05-12T19:30:00Z',
        likes: 42
      }
    ],
    tags: ['coding', 'programming', 'bugs', 'developer']
  },
  {
    id: '2',
    imageUrl: 'https://images.pexels.com/photos/1440387/pexels-photo-1440387.jpeg?auto=compress&cs=tinysrgb&w=600',
    topText: 'Monday morning',
    bottomText: 'Friday afternoon',
    creator: mockUsers[1],
    createdAt: '2023-05-14T09:12:00Z',
    votes: 874,
    views: 3215,
    comments: [],
    tags: ['work', 'weekend', 'mood']
  },
  {
    id: '3',
    imageUrl: 'https://images.pexels.com/photos/3890381/pexels-photo-3890381.jpeg?auto=compress&cs=tinysrgb&w=600',
    topText: 'Me explaining to my cat',
    bottomText: 'Why I need to pet it for the 100th time today',
    creator: mockUsers[2],
    createdAt: '2023-05-15T14:45:00Z',
    votes: 1543,
    views: 6210,
    comments: [
      {
        id: '2',
        text: 'My cat approves this meme',
        user: mockUsers[0],
        createdAt: '2023-05-15T15:05:00Z',
        likes: 89
      }
    ],
    tags: ['cats', 'pets', 'funny']
  },
  {
    id: '4',
    imageUrl: 'https://images.pexels.com/photos/356079/pexels-photo-356079.jpeg?auto=compress&cs=tinysrgb&w=600',
    topText: 'When you accidentally close VS Code',
    bottomText: 'With 47 unsaved files',
    creator: mockUsers[0],
    createdAt: '2023-05-16T11:30:00Z',
    votes: 2105,
    views: 8320,
    comments: [],
    tags: ['coding', 'vscode', 'developer', 'panic']
  }
];

// Function to create a new meme
export const createMockMeme = (
  imageUrl: string,
  topText: string,
  bottomText: string,
  tags: string[] = []
): Meme => {
  return {
    id: generateUniqueId(),
    imageUrl,
    topText,
    bottomText,
    creator: mockUsers[0], // Default to first user
    createdAt: new Date().toISOString(),
    votes: 0,
    views: 0,
    comments: [],
    tags
  };
};