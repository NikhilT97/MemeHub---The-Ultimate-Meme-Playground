import React from 'react';
import { Sun, Moon, User, Home, PlusCircle } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeSection, setActiveSection }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="fixed top-0 w-full z-10 transition-all bg-white dark:bg-gray-900 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo and Title */}
        <div onClick={() => setActiveSection('home')} className="flex items-center cursor-pointer">
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
            MemeHub
          </span>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => setActiveSection('home')}
              className={`flex items-center gap-2 px-3 py-2 rounded-md font-medium transition-colors
                ${activeSection === 'home' 
                  ? 'text-purple-600 dark:text-purple-400' 
                  : 'text-gray-600 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-300'}`}
            >
              <Home size={18} />
              <span>Home</span>
            </button>
            
            <button
              onClick={() => setActiveSection('create')}
              className={`flex items-center gap-2 px-3 py-2 rounded-md font-medium transition-colors
                ${activeSection === 'create' 
                  ? 'text-purple-600 dark:text-purple-400' 
                  : 'text-gray-600 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-300'}`}
            >
              <PlusCircle size={18} />
              <span>Create</span>
            </button>
            
            <button
              onClick={() => setActiveSection('profile')}
              className={`flex items-center gap-2 px-3 py-2 rounded-md font-medium transition-colors
                ${activeSection === 'profile' 
                  ? 'text-purple-600 dark:text-purple-400' 
                  : 'text-gray-600 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-300'}`}
            >
              <User size={18} />
              <span>Profile</span>
            </button>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Bar */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white dark:bg-gray-900 shadow-[0_-2px_10px_rgba(0,0,0,0.1)] dark:shadow-[0_-2px_10px_rgba(0,0,0,0.3)]">
        <div className="flex justify-around py-3">
          <button
            onClick={() => setActiveSection('home')}
            className={`flex flex-col items-center justify-center p-2 rounded-md transition-colors
              ${activeSection === 'home' 
                ? 'text-purple-600 dark:text-purple-400' 
                : 'text-gray-600 dark:text-gray-300'}`}
          >
            <Home size={24} />
            <span className="text-xs mt-1">Home</span>
          </button>
          
          <button
            onClick={() => setActiveSection('create')}
            className={`flex flex-col items-center justify-center p-2 rounded-md transition-colors
              ${activeSection === 'create' 
                ? 'text-purple-600 dark:text-purple-400' 
                : 'text-gray-600 dark:text-gray-300'}`}
          >
            <PlusCircle size={24} />
            <span className="text-xs mt-1">Create</span>
          </button>
          
          <button
            onClick={() => setActiveSection('profile')}
            className={`flex flex-col items-center justify-center p-2 rounded-md transition-colors
              ${activeSection === 'profile' 
                ? 'text-purple-600 dark:text-purple-400' 
                : 'text-gray-600 dark:text-gray-300'}`}
          >
            <User size={24} />
            <span className="text-xs mt-1">Profile</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;