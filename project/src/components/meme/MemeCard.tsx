import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, MessageCircle, Share2, Eye } from 'lucide-react';
import { Meme } from '../../types';
import { formatDate, formatNumber } from '../../utils/helpers';
import { useMemes } from '../../context/MemeContext';

interface MemeCardProps {
  meme: Meme;
  onViewDetails?: () => void;
}

const MemeCard: React.FC<MemeCardProps> = ({ meme, onViewDetails }) => {
  const { voteMeme } = useMemes();
  const [voted, setVoted] = useState<number>(0); // -1: downvote, 0: not voted, 1: upvote
  const [showComments, setShowComments] = useState(false);

  const handleVote = (value: number) => {
    if (voted === value) {
      voteMeme(meme.id, -value); // Undo vote
      setVoted(0);
    } else {
      voteMeme(meme.id, value - voted); // Adjust vote based on previous state
      setVoted(value);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
      {/* Meme Creator Info */}
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img 
            src={meme.creator.avatarUrl} 
            alt={meme.creator.username} 
            className="w-8 h-8 rounded-full object-cover"
          />
          <div>
            <p className="font-medium text-gray-800 dark:text-gray-200">{meme.creator.username}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{formatDate(meme.createdAt)}</p>
          </div>
        </div>
      </div>

      {/* Meme Image and Text */}
      <div className="relative" onClick={onViewDetails}>
        <div className="relative aspect-square bg-gray-100 dark:bg-gray-700 overflow-hidden cursor-pointer">
          <img 
            src={meme.imageUrl} 
            alt="Meme" 
            className="w-full h-full object-cover"
          />
          {/* Overlay Meme Text */}
          {meme.topText && (
            <div className="absolute top-2 left-0 right-0 text-center">
              <p className="text-white text-xl md:text-2xl font-bold uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                {meme.topText}
              </p>
            </div>
          )}
          {meme.bottomText && (
            <div className="absolute bottom-2 left-0 right-0 text-center">
              <p className="text-white text-xl md:text-2xl font-bold uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                {meme.bottomText}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Tags */}
      {meme.tags.length > 0 && (
        <div className="px-4 py-2 flex flex-wrap gap-2">
          {meme.tags.map((tag, index) => (
            <span key={index} className="text-xs bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 rounded-full px-2 py-1">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Meme Engagement Stats */}
      <div className="px-4 py-2 flex items-center gap-3 text-gray-500 dark:text-gray-400 text-sm">
        <div className="flex items-center gap-1">
          <Eye size={16} />
          <span>{formatNumber(meme.views)}</span>
        </div>
        <div className="flex items-center gap-1">
          <ThumbsUp size={16} className={voted === 1 ? "text-green-500" : ""} />
          <span>{formatNumber(meme.votes)}</span>
        </div>
        <div className="flex items-center gap-1">
          <MessageCircle size={16} />
          <span>{meme.comments.length}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-700 grid grid-cols-4">
        <button 
          onClick={() => handleVote(1)}
          className={`flex items-center justify-center gap-1 p-2 rounded-md transition-colors
            ${voted === 1 ? 'text-green-500' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
        >
          <ThumbsUp size={18} />
        </button>
        <button 
          onClick={() => handleVote(-1)}
          className={`flex items-center justify-center gap-1 p-2 rounded-md transition-colors
            ${voted === -1 ? 'text-red-500' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
        >
          <ThumbsDown size={18} />
        </button>
        <button 
          onClick={() => setShowComments(!showComments)}
          className="flex items-center justify-center gap-1 p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <MessageCircle size={18} />
        </button>
        <button 
          className="flex items-center justify-center gap-1 p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <Share2 size={18} />
        </button>
      </div>

      {/* Comments Section */}
      {showComments && meme.comments.length > 0 && (
        <div className="px-4 py-2 border-t border-gray-100 dark:border-gray-700">
          {meme.comments.map((comment) => (
            <div key={comment.id} className="py-2">
              <div className="flex items-start gap-2">
                <img 
                  src={comment.user.avatarUrl} 
                  alt={comment.user.username} 
                  className="w-6 h-6 rounded-full mt-1"
                />
                <div className="flex-1">
                  <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg">
                    <p className="font-medium text-sm text-gray-800 dark:text-gray-200">
                      {comment.user.username}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{comment.text}</p>
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-xs text-gray-500 dark:text-gray-400">
                    <span>{formatDate(comment.createdAt)}</span>
                    <button className="hover:text-gray-700 dark:hover:text-gray-300">Like</button>
                    <button className="hover:text-gray-700 dark:hover:text-gray-300">Reply</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Comment Input */}
      {showComments && (
        <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <img 
              src={meme.creator.avatarUrl} 
              alt="Current user" 
              className="w-8 h-8 rounded-full"
            />
            <input 
              type="text" 
              placeholder="Add a comment..." 
              className="flex-1 bg-gray-100 dark:bg-gray-700 border-none rounded-full px-4 py-2 text-sm text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MemeCard;