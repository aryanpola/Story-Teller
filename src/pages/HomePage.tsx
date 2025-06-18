import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Story {
  _id: string;
  title: {
    en: string;
    [key: string]: string;
  };
  summary: {
    en: string;
    [key: string]: string;
  };
  thumbnailUrl: string;
  category: string;
  ageRange: string;
  stats: {
    views: number;
    averageRating: number;
  };
}

const HomePage: React.FC = () => {
  const [featuredStories, setFeaturedStories] = useState<Story[]>([]);
  const [recentStories, setRecentStories] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');  useEffect(() => {
    const fetchStories = async () => {
      try {
        setIsLoading(true);
        
        // In development mode, always use mock data instead of trying to connect to the API
        console.log('Using mock data for demonstration');
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Skip the actual API call and use mock data
        setFeaturedStories([
          {
            _id: '1',
            title: { en: 'The Magic Forest Adventure' },
            summary: { en: 'A story about friendship and courage in a magical forest' },
            thumbnailUrl: 'https://images.pexels.com/photos/1001914/pexels-photo-1001914.jpeg?auto=compress&cs=tinysrgb&w=400',
            category: 'fantasy',
            ageRange: '5-8',
            stats: { views: 120, averageRating: 4.8 }
          },
          {
            _id: '2',
            title: { en: 'Space Explorers' },
            summary: { en: 'Join a journey to the stars with a team of brave astronauts' },
            thumbnailUrl: 'https://images.pexels.com/photos/2150/sky-space-dark-galaxy.jpg?auto=compress&cs=tinysrgb&w=400',
            category: 'adventure',
            ageRange: '7-10',
            stats: { views: 98, averageRating: 4.6 }
          },
          {
            _id: '3',
            title: { en: 'The Secret Garden' },
            summary: { en: 'Discover a magical garden hidden behind an old wall' },
            thumbnailUrl: 'https://images.pexels.com/photos/414160/pexels-photo-414160.jpeg?auto=compress&cs=tinysrgb&w=400',
            category: 'mystery',
            ageRange: '6-9',
            stats: { views: 85, averageRating: 4.5 }
          }
        ]);
        
        setRecentStories([
          {
            _id: '4',
            title: { en: 'The Brave Little Boat' },
            summary: { en: 'A small boat goes on a big adventure across the ocean' },
            thumbnailUrl: 'https://images.pexels.com/photos/273886/pexels-photo-273886.jpeg?auto=compress&cs=tinysrgb&w=400',
            category: 'adventure',
            ageRange: '3-6',
            stats: { views: 45, averageRating: 4.3 }
          },
          {
            _id: '5',
            title: { en: 'Dinosaur Friends' },
            summary: { en: 'Learn about different dinosaurs in this fun story' },
            thumbnailUrl: 'https://images.pexels.com/photos/1304805/pexels-photo-1304805.jpeg?auto=compress&cs=tinysrgb&w=400',
            category: 'educational',
            ageRange: '4-7',
            stats: { views: 72, averageRating: 4.4 }
          },
          {
            _id: '6',
            title: { en: 'The Flying Treehouse' },
            summary: { en: 'A magical treehouse that can fly to anywhere in the world' },
            thumbnailUrl: 'https://images.pexels.com/photos/957024/forest-trees-perspective-bright-957024.jpeg?auto=compress&cs=tinysrgb&w=400',
            category: 'fantasy',
            ageRange: '5-8',
            stats: { views: 64, averageRating: 4.2 }
          }
        ]);
        
        setError(''); // Clear any error message
        
      } catch (err) {
        console.error('Error:', err);
        setError('');
        // Set some mock data for development
        setFeaturedStories([
          {
            _id: '1',
            title: { en: 'The Magic Forest Adventure' },
            summary: { en: 'A story about friendship and courage in a magical forest' },
            thumbnailUrl: 'https://images.pexels.com/photos/1001914/pexels-photo-1001914.jpeg?auto=compress&cs=tinysrgb&w=400',
            category: 'fantasy',
            ageRange: '5-8',
            stats: { views: 120, averageRating: 4.8 }
          },
          {
            _id: '2',
            title: { en: 'Space Explorers' },
            summary: { en: 'Join a journey to the stars with a team of brave astronauts' },
            thumbnailUrl: 'https://images.pexels.com/photos/2150/sky-space-dark-galaxy.jpg?auto=compress&cs=tinysrgb&w=400',
            category: 'adventure',
            ageRange: '7-10',
            stats: { views: 98, averageRating: 4.6 }
          },
          {
            _id: '3',
            title: { en: 'The Secret Garden' },
            summary: { en: 'Discover a magical garden hidden behind an old wall' },
            thumbnailUrl: 'https://images.pexels.com/photos/414160/pexels-photo-414160.jpeg?auto=compress&cs=tinysrgb&w=400',
            category: 'mystery',
            ageRange: '6-9',
            stats: { views: 85, averageRating: 4.5 }
          }
        ]);
        
        setRecentStories([
          {
            _id: '4',
            title: { en: 'The Brave Little Boat' },
            summary: { en: 'A small boat goes on a big adventure across the ocean' },
            thumbnailUrl: 'https://images.pexels.com/photos/273886/pexels-photo-273886.jpeg?auto=compress&cs=tinysrgb&w=400',
            category: 'adventure',
            ageRange: '3-6',
            stats: { views: 45, averageRating: 4.3 }
          },
          {
            _id: '5',
            title: { en: 'Dinosaur Friends' },
            summary: { en: 'Learn about different dinosaurs in this fun story' },
            thumbnailUrl: 'https://images.pexels.com/photos/1304805/pexels-photo-1304805.jpeg?auto=compress&cs=tinysrgb&w=400',
            category: 'educational',
            ageRange: '4-7',
            stats: { views: 72, averageRating: 4.4 }
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStories();
  }, []);

  const renderStoryCard = (story: Story, isFeatured = false) => (
    <Link 
      to={`/story/${story._id}`} 
      key={story._id} 
      className={`block ${isFeatured ? 'md:flex' : ''} bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 mb-6`}
    >
      <div className={`relative ${isFeatured ? 'md:w-1/3' : 'w-full'} h-48`}>
        <img 
          src={story.thumbnailUrl} 
          alt={story.title.en} 
          className="w-full h-full object-cover"
        />
        <span className="absolute top-0 right-0 bg-blue-600 text-white text-xs px-2 py-1 m-2 rounded">
          {story.category}
        </span>
        <span className="absolute bottom-0 left-0 bg-purple-600 text-white text-xs px-2 py-1 m-2 rounded">
          Ages {story.ageRange}
        </span>
      </div>
      <div className={`p-4 ${isFeatured ? 'md:w-2/3' : ''}`}>
        <h3 className="text-xl font-semibold mb-2">{story.title.en}</h3>
        <p className="text-gray-600 mb-3">{story.summary.en}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-yellow-500 mr-1">★</span>
            <span>{story.stats.averageRating.toFixed(1)}</span>
          </div>
          <div className="text-gray-500 text-sm">{story.stats.views} views</div>
        </div>
      </div>
    </Link>
  );

  return (
    <div>      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-purple-800">Interactive Stories for Children</h2>
          <Link to="/create" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors">
            Create New Story
          </Link>
        </div>
        
        <p className="text-lg text-gray-600 mb-4">
          Explore our collection of interactive stories where your child can make choices that shape the adventure!
        </p>
        
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-6">
          <p className="font-bold">Development Mode</p>
          <p className="text-sm">This is a demonstration version showing mock data. In a production environment, stories would be loaded from the database.</p>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        ) : (
          <>
            <h3 className="text-2xl font-semibold text-purple-700 mb-4">Featured Stories</h3>
            <div className="grid gap-6">
              {featuredStories.map(story => renderStoryCard(story, true))}
            </div>
            
            <h3 className="text-2xl font-semibold text-purple-700 mt-12 mb-4">Recently Added</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentStories.map(story => renderStoryCard(story))}
            </div>
          </>
        )}
      </section>
      
      <section className="bg-purple-100 p-8 rounded-lg shadow-inner mb-12">
        <h3 className="text-2xl font-semibold text-purple-800 mb-4">How It Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-4xl text-purple-600 mb-4">1</div>
            <h4 className="text-xl font-medium mb-2">Choose a Story</h4>
            <p className="text-gray-600">Browse our collection of interactive stories by age group, category, or language.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-4xl text-purple-600 mb-4">2</div>
            <h4 className="text-xl font-medium mb-2">Make Decisions</h4>
            <p className="text-gray-600">At key moments in the story, you'll be presented with choices that change the outcome.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-4xl text-purple-600 mb-4">3</div>
            <h4 className="text-xl font-medium mb-2">Discover Endings</h4>
            <p className="text-gray-600">Each story has multiple possible endings based on the choices you make along the way.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
