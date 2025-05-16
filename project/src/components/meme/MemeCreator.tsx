import React, { useState, useRef, useEffect } from 'react';
import { X, ImagePlus, AlignLeft, AlignCenter, AlignRight, Type, Check } from 'lucide-react';
import { useMemes } from '../../context/MemeContext';
import { memeTemplates } from '../../data/mockData';

interface TextStyle {
  size: string;
  color: string;
  align: 'left' | 'center' | 'right';
  outline: boolean;
}

const MemeCreator: React.FC = () => {
  const { addMeme } = useMemes();
  const [activeTab, setActiveTab] = useState<'upload' | 'template'>('template');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [topText, setTopText] = useState<string>('');
  const [bottomText, setBottomText] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>('');
  const [editingText, setEditingText] = useState<'top' | 'bottom' | null>(null);
  const [textStyle, setTextStyle] = useState<TextStyle>({
    size: 'text-2xl',
    color: 'text-white',
    align: 'center',
    outline: true
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle template selection
  const handleTemplateSelect = (templateId: string, imageUrl: string) => {
    setSelectedTemplate(templateId);
    setImageUrl(imageUrl);
  };

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, we would upload this to a server
      // For demo, we'll use a URL from our mock data
      setImageUrl(memeTemplates[0].imageUrl);
      setSelectedTemplate(null);
    }
  };

  // Open file dialog
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Handle tag input
  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  // Remove tag
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  // Set text alignment
  const setTextAlignment = (align: 'left' | 'center' | 'right') => {
    setTextStyle({...textStyle, align});
  };

  // Set text size
  const setTextSize = (size: string) => {
    setTextStyle({...textStyle, size});
  };

  // Toggle text outline
  const toggleTextOutline = () => {
    setTextStyle({...textStyle, outline: !textStyle.outline});
  };

  // Handle create meme
  const handleCreateMeme = () => {
    if (imageUrl) {
      addMeme({
        imageUrl,
        topText,
        bottomText,
        tags,
        template: selectedTemplate || undefined
      });
      
      // Reset form
      setImageUrl('');
      setTopText('');
      setBottomText('');
      setTags([]);
      setSelectedTemplate(null);
    }
  };

  return (
    <div className="container mx-auto px-4 pb-20 md:pb-0">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Create a Meme</h2>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('template')}
            className={`flex-1 py-3 text-center font-medium transition-colors
              ${activeTab === 'template' 
                ? 'text-purple-600 dark:text-purple-400 border-b-2 border-purple-500' 
                : 'text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-300'}`}
          >
            Choose Template
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex-1 py-3 text-center font-medium transition-colors
              ${activeTab === 'upload' 
                ? 'text-purple-600 dark:text-purple-400 border-b-2 border-purple-500' 
                : 'text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-300'}`}
          >
            Upload Image
          </button>
        </div>

        {/* Template Selection */}
        {activeTab === 'template' && (
          <div className="p-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {memeTemplates.map((template) => (
                <div
                  key={template.id}
                  onClick={() => handleTemplateSelect(template.id, template.imageUrl)}
                  className={`aspect-square relative overflow-hidden rounded-lg cursor-pointer border-2 hover:border-purple-500 transition-colors
                    ${selectedTemplate === template.id ? 'border-purple-500' : 'border-transparent'}`}
                >
                  <img 
                    src={template.imageUrl} 
                    alt={template.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
                    <div className="p-2 text-white text-sm w-full">
                      {template.name}
                      {template.popular && (
                        <span className="ml-1 text-xs bg-yellow-500 text-black px-1 rounded">Popular</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upload Image */}
        {activeTab === 'upload' && (
          <div className="p-4">
            <div 
              onClick={triggerFileInput}
              className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:border-purple-500 dark:hover:border-purple-400 transition-colors"
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/*"
                className="hidden"
              />
              <ImagePlus size={48} className="text-gray-400 dark:text-gray-500 mb-4" />
              <p className="text-gray-700 dark:text-gray-300 font-medium">Click to upload an image</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        )}

        {/* Meme Preview & Text Controls */}
        {imageUrl && (
          <>
            <div className="p-4">
              <div className="relative aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                <img 
                  src={imageUrl} 
                  alt="Meme Preview" 
                  className="w-full h-full object-cover"
                />
                
                {/* Top Text */}
                <div className="absolute top-2 left-0 right-0 px-4" onClick={() => setEditingText('top')}>
                  <p className={`${textStyle.size} ${textStyle.color} font-bold uppercase 
                    ${textStyle.align === 'left' ? 'text-left' : textStyle.align === 'right' ? 'text-right' : 'text-center'}
                    ${textStyle.outline ? 'drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]' : ''}`}>
                    {topText || 'Add top text'}
                  </p>
                </div>
                
                {/* Bottom Text */}
                <div className="absolute bottom-2 left-0 right-0 px-4" onClick={() => setEditingText('bottom')}>
                  <p className={`${textStyle.size} ${textStyle.color} font-bold uppercase 
                    ${textStyle.align === 'left' ? 'text-left' : textStyle.align === 'right' ? 'text-right' : 'text-center'}
                    ${textStyle.outline ? 'drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]' : ''}`}>
                    {bottomText || 'Add bottom text'}
                  </p>
                </div>
              </div>
            </div>

            {/* Text Controls */}
            <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {editingText === 'top' ? 'Top Text' : editingText === 'bottom' ? 'Bottom Text' : 'Text Options'}:
                </span>
                
                {/* Text Alignment */}
                <div className="flex bg-gray-100 dark:bg-gray-700 rounded-md overflow-hidden">
                  <button 
                    onClick={() => setTextAlignment('left')}
                    className={`p-2 transition-colors ${textStyle.align === 'left' ? 'bg-purple-500 text-white' : 'text-gray-600 dark:text-gray-300'}`}
                  >
                    <AlignLeft size={16} />
                  </button>
                  <button 
                    onClick={() => setTextAlignment('center')}
                    className={`p-2 transition-colors ${textStyle.align === 'center' ? 'bg-purple-500 text-white' : 'text-gray-600 dark:text-gray-300'}`}
                  >
                    <AlignCenter size={16} />
                  </button>
                  <button 
                    onClick={() => setTextAlignment('right')}
                    className={`p-2 transition-colors ${textStyle.align === 'right' ? 'bg-purple-500 text-white' : 'text-gray-600 dark:text-gray-300'}`}
                  >
                    <AlignRight size={16} />
                  </button>
                </div>
                
                {/* Text Size */}
                <select
                  value={textStyle.size}
                  onChange={(e) => setTextSize(e.target.value)}
                  className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-md p-2 text-sm border-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="text-xl">Small</option>
                  <option value="text-2xl">Medium</option>
                  <option value="text-3xl">Large</option>
                  <option value="text-4xl">X-Large</option>
                </select>
                
                {/* Text Outline */}
                <button
                  onClick={toggleTextOutline}
                  className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm ${
                    textStyle.outline 
                      ? 'bg-purple-500 text-white' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                  }`}
                >
                  <Type size={16} />
                  <span>Outline</span>
                  {textStyle.outline && <Check size={16} />}
                </button>
              </div>

              {/* Text Input */}
              {editingText && (
                <div className="mb-3">
                  <input
                    type="text"
                    value={editingText === 'top' ? topText : bottomText}
                    onChange={(e) => editingText === 'top' ? setTopText(e.target.value) : setBottomText(e.target.value)}
                    placeholder={`Enter ${editingText} text`}
                    className="w-full bg-gray-100 dark:bg-gray-700 border-none rounded-md p-3 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              )}
            </div>

            {/* Tags */}
            <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tags (press Enter to add)
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map((tag, index) => (
                  <div key={index} className="flex items-center bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 rounded-full px-3 py-1">
                    <span className="text-sm">#{tag}</span>
                    <button onClick={() => removeTag(tag)} className="ml-1.5">
                      <X size={14} />
                    </button>
                  </div>
                ))}
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagInput}
                  placeholder="Add tags..."
                  className="flex-1 min-w-[150px] bg-gray-100 dark:bg-gray-700 border-none rounded-full px-3 py-1 text-sm text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Create Button */}
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-900 flex justify-end">
              <button
                onClick={handleCreateMeme}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-md px-6 py-2 hover:opacity-90 transition-opacity"
              >
                Create Meme
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MemeCreator;