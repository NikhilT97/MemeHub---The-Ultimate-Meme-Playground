import React, { useState } from 'react';
import { Grid, List, Award, BarChart2 } from 'lucide-react';
import { useMemes } from '../../context/MemeContext';
import MemeCard from '../meme/MemeCard';
import { formatDate } from '../../utils/helpers';

const UserProfile: React.FC = () => {
  const { userMemes } = useMemes();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeTab, setActiveTab] = useState<'memes' | 'stats' | 'badges'>('memes');

  // Mock user data
  const user = {
    id: '1',
    username: 'mememaster',
    avatarUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    joinedAt: '2023-02-15T10:00:00Z',
    totalMemes: userMemes.length,
    totalViews: userMemes.reduce((sum, meme) => sum + meme.views, 0),
    totalVotes: userMemes.reduce((sum, meme) => sum + meme.votes, 0),
    badges: [
      { id: '1', name: 'Founder', icon: 'award', description: 'One of the first members' },
      { id: '2', name: 'Meme Lord', icon: 'crown', description: 'Created over 100 memes' },
      { id: '3', name: 'Rising Star', icon: 'trending-up', description: 'Rapidly gaining popularity' }
    ]
  };

  return (
    <div className="container mx-auto px-4 pb-20 md:pb-0">
      {/* User Info Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-6">
        <div className="relative h-32 bg-gradient-to-r from-purple-500 to-pink-500">
          <div className="absolute -bottom-12 left-6">
            <div className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden">
              <img 
                src={user.avatarUrl} 
                alt={user.username} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        
        <div className="pt-14 pb-4 px-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">{user.username}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Member since {formatDate(user.joinedAt)}</p>
          
          <div className="mt-4 flex flex-wrap gap-3">
            {user.badges.map((badge) => (
              <div 
                key={badge.id}
                className="flex items-center gap-1 px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 rounded-full"
              >
                <Award size={14} />
                <span className="text-xs font-medium">{badge.name}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* User Stats */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">{user.totalMemes}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Memes</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">{user.totalViews}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Views</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">{user.totalVotes}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Votes</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('memes')}
            className={`flex-1 py-3 text-center font-medium transition-colors
              ${activeTab === 'memes' 
                ? 'text-purple-600 dark:text-purple-400 border-b-2 border-purple-500' 
                : 'text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-300'}`}
          >
            My Memes
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`flex-1 py-3 text-center font-medium transition-colors
              ${activeTab === 'stats' 
                ? 'text-purple-600 dark:text-purple-400 border-b-2 border-purple-500' 
                : 'text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-300'}`}
          >
            Stats
          </button>
          <button
            onClick={() => setActiveTab('badges')}
            className={`flex-1 py-3 text-center font-medium transition-colors
              ${activeTab === 'badges' 
                ? 'text-purple-600 dark:text-purple-400 border-b-2 border-purple-500' 
                : 'text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-300'}`}
          >
            Badges
          </button>
        </div>

        {/* My Memes Tab */}
        {activeTab === 'memes' && (
          <>
            {/* View Toggle */}
            <div className="p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-medium text-gray-700 dark:text-gray-300">
                Your Memes ({userMemes.length})
              </h3>
              <div className="flex bg-gray-100 dark:bg-gray-700 rounded-md overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-purple-500 text-white' : 'text-gray-600 dark:text-gray-300'}`}
                >
                  <Grid size={16} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-purple-500 text-white' : 'text-gray-600 dark:text-gray-300'}`}
                >
                  <List size={16} />
                </button>
              </div>
            </div>

            {/* Memes Content */}
            {userMemes.length > 0 ? (
              <div className={`p-4 ${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'space-y-4'}`}>
                {userMemes.map((meme) => (
                  <div key={meme.id} className={viewMode === 'grid' ? '' : 'max-w-lg mx-auto'}>
                    <MemeCard meme={meme} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <p className="text-gray-500 dark:text-gray-400">You haven't created any memes yet</p>
                <button className="mt-4 bg-purple-500 text-white rounded-md px-4 py-2 font-medium hover:bg-purple-600 transition-colors">
                  Create Your First Meme
                </button>
              </div>
            )}
          </>
        )}
        
        {/* Stats Tab - Simple placeholder for now */}
        {activeTab === 'stats' && (
          <div className="p-6">
            <div className="flex items-center justify-center mb-6">
              <BarChart2 size={48} className="text-purple-500" />
            </div>
            <p className="text-center text-gray-700 dark:text-gray-300">
              Detailed performance analytics will be available soon.
            </p>
          </div>
        )}
        
        {/* Badges Tab */}
        {activeTab === 'badges' && (
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {user.badges.map((badge) => (
              <div key={badge.id} className="bg-white dark:bg-gray-700 rounded-lg shadow-sm p-4 flex items-center gap-4">
                <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                  <Award size={24} className="text-purple-500 dark:text-purple-300" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 dark:text-gray-200">{badge.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{badge.description}</p>
                </div>
              </div>
            ))}
            
            {/* Locked Badges */}
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-sm p-4 flex items-center gap-4 opacity-60">
              <div className="h-12 w-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                <Award size={24} className="text-gray-400 dark:text-gray-500" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800 dark:text-gray-200">Viral Sensation</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Meme with 10,000+ views</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;