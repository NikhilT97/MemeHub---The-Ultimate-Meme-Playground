import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { MemeProvider } from './context/MemeContext';
import Navbar from './components/layout/Navbar';
import MemeGrid from './components/meme/MemeGrid';
import MemeCreator from './components/meme/MemeCreator';
import UserProfile from './components/profile/UserProfile';

function App() {
  const [activeSection, setActiveSection] = useState<string>('home');

  // Render the appropriate section based on state
  const renderSection = () => {
    switch (activeSection) {
      case 'create':
        return <MemeCreator />;
      case 'profile':
        return <UserProfile />;
      case 'home':
      default:
        return <MemeGrid />;
    }
  };

  return (
    <ThemeProvider>
      <MemeProvider>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
          <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
          <div className="pt-16 md:pt-20 pb-6">
            {renderSection()}
          </div>
        </div>
      </MemeProvider>
    </ThemeProvider>
  );
}

export default App;