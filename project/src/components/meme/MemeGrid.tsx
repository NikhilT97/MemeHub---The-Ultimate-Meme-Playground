import React, { useEffect, useState } from 'react';
import { Sparkles, TrendingUp, Clock } from 'lucide-react';
import { useMemes } from '../../context/MemeContext';
import { SortOption } from '../../types';
import MemeCard from './MemeCard';

const MemeGrid: React.FC = () => {
  const { memes, sortOption, setSortOption, setActiveMeme } = useMemes();
  const [sortedMemes, setSortedMemes] = useState(memes);

  // Sort memes based on the selected option
  useEffect(() => {
    let sorted = [...memes];
    
    switch (sortOption) {
      case 'new':
        sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'top':
        sorted.sort((a, b) => b.votes - a.votes);
        break;
      case 'trending':
        // For simplicity, we'll define trending as a combination of recency and votes
        sorted.sort((a, b) => {
          const aScore = a.votes * (1 / (new Date().getTime() - new Date(a.createdAt).getTime()));
          const bScore = b.votes * (1 / (new Date().getTime() - new Date(b.createdAt).getTime()));
          return bScore - aScore;
        });
        break;
    }
    
    setSortedMemes(sorted);
  }, [memes, sortOption]);

  // Handle view meme details
  const handleViewMeme = (meme: any) => {
    setActiveMeme(meme);
  };

  return (
    <div className="container mx-auto px-4">
      {/* Sort Options */}
      <div className="mb-6 flex overflow-x-auto pb-2 no-scrollbar">
        <div className="flex space-x-2">
          <button
            onClick={() => setSortOption('new')}
            className={`flex items-center gap-1 px-4 py-2 rounded-full border text-sm font-medium transition-colors
              ${sortOption === 'new'
                ? 'bg-purple-500 text-white border-purple-500'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
          >
            <Clock size={16} />
            <span>New</span>
          </button>
          
          <button
            onClick={() => setSortOption('top')}
            className={`flex items-center gap-1 px-4 py-2 rounded-full border text-sm font-medium transition-colors
              ${sortOption === 'top'
                ? 'bg-purple-500 text-white border-purple-500'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
          >
            <Sparkles size={16} />
            <span>Top</span>
          </button>
          
          <button
            onClick={() => setSortOption('trending')}
            className={`flex items-center gap-1 px-4 py-2 rounded-full border text-sm font-medium transition-colors
              ${sortOption === 'trending'
                ? 'bg-purple-500 text-white border-purple-500'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
          >
            <TrendingUp size={16} />
            <span>Trending</span>
          </button>
        </div>
      </div>

      {/* Meme Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedMemes.map((meme) => (
          <div key={meme.id} className="transform transition-transform hover:scale-[1.01]">
            <MemeCard 
              meme={meme} 
              onViewDetails={() => handleViewMeme(meme)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemeGrid;