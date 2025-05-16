import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Meme, SortOption } from '../types';
import { mockMemes, createMockMeme } from '../data/mockData';

interface MemeContextType {
  memes: Meme[];
  userMemes: Meme[];
  activeMeme: Meme | null;
  sortOption: SortOption;
  setSortOption: (option: SortOption) => void;
  setActiveMeme: (meme: Meme | null) => void;
  addMeme: (meme: Omit<Meme, 'id' | 'creator' | 'createdAt' | 'votes' | 'views' | 'comments'>) => void;
  voteMeme: (id: string, vote: number) => void;
  addComment: (memeId: string, comment: string) => void;
}

const MemeContext = createContext<MemeContextType | undefined>(undefined);

export const MemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [memes, setMemes] = useState<Meme[]>(mockMemes);
  const [userMemes, setUserMemes] = useState<Meme[]>([]);
  const [activeMeme, setActiveMeme] = useState<Meme | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>('new');

  // Filter user memes from all memes
  useEffect(() => {
    // In a real app, this would filter based on logged in user
    const filtered = memes.filter(meme => meme.creator.id === '1');
    setUserMemes(filtered);
  }, [memes]);

  // Add a new meme
  const addMeme = (memeData: Omit<Meme, 'id' | 'creator' | 'createdAt' | 'votes' | 'views' | 'comments'>) => {
    const newMeme = createMockMeme(
      memeData.imageUrl,
      memeData.topText,
      memeData.bottomText,
      memeData.tags
    );
    
    setMemes(prevMemes => [newMeme, ...prevMemes]);
  };

  // Vote on a meme
  const voteMeme = (id: string, vote: number) => {
    setMemes(prevMemes => 
      prevMemes.map(meme => 
        meme.id === id ? { ...meme, votes: meme.votes + vote } : meme
      )
    );
  };

  // Add a comment to a meme
  const addComment = (memeId: string, commentText: string) => {
    setMemes(prevMemes => 
      prevMemes.map(meme => {
        if (meme.id === memeId) {
          const newComment = {
            id: Math.random().toString(),
            text: commentText,
            user: mockMemes[0].creator, // Use first user as commenter
            createdAt: new Date().toISOString(),
            likes: 0
          };
          return {
            ...meme,
            comments: [...meme.comments, newComment]
          };
        }
        return meme;
      })
    );
  };

  return (
    <MemeContext.Provider 
      value={{ 
        memes, 
        userMemes,
        activeMeme, 
        sortOption,
        setSortOption,
        setActiveMeme, 
        addMeme, 
        voteMeme, 
        addComment 
      }}
    >
      {children}
    </MemeContext.Provider>
  );
};

export const useMemes = (): MemeContextType => {
  const context = useContext(MemeContext);
  if (context === undefined) {
    throw new Error('useMemes must be used within a MemeProvider');
  }
  return context;
};