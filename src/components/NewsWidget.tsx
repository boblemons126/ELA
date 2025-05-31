
import React, { useState, useEffect } from 'react';
import { Newspaper, ExternalLink, Clock } from 'lucide-react';

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  source: string;
  publishedAt: string;
  url: string;
  category: string;
}

const NewsWidget = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([
    {
      id: '1',
      title: 'Smart Home Technology Advances in 2024',
      summary: 'Latest innovations in home automation are making houses more intelligent and energy efficient.',
      source: 'Tech Today',
      publishedAt: '2 hours ago',
      url: '#',
      category: 'Technology'
    },
    {
      id: '2',
      title: 'Energy Efficiency Tips for Modern Homes',
      summary: 'Simple ways to reduce your energy consumption and lower utility bills.',
      source: 'Green Living',
      publishedAt: '4 hours ago',
      url: '#',
      category: 'Lifestyle'
    },
    {
      id: '3',
      title: 'Weather Pattern Changes This Week',
      summary: 'Meteorologists predict significant weather changes affecting local area.',
      source: 'Weather Central',
      publishedAt: '6 hours ago',
      url: '#',
      category: 'Weather'
    },
    {
      id: '4',
      title: 'Home Security Best Practices',
      summary: 'Expert recommendations for keeping your smart home secure from cyber threats.',
      source: 'Security Weekly',
      publishedAt: '8 hours ago',
      url: '#',
      category: 'Security'
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', 'Technology', 'Weather', 'Security', 'Lifestyle'];

  const filteredArticles = selectedCategory === 'All' 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

  // Simulate news API call
  useEffect(() => {
    const fetchNews = () => {
      console.log('Fetching latest news...');
      // This would be replaced with actual news API call
    };
    
    fetchNews();
    const interval = setInterval(fetchNews, 600000); // Update every 10 minutes
    return () => clearInterval(interval);
  }, []);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Technology':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'Weather':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'Security':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'Lifestyle':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 h-fit">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Newspaper className="w-6 h-6 text-blue-400" />
          <h2 className="text-xl font-bold text-white">Latest News</h2>
        </div>
        <div className="text-sm text-blue-200">Live Updates</div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 border ${
              selectedCategory === category
                ? 'bg-blue-500/30 text-blue-200 border-blue-500/50'
                : 'bg-white/10 text-white/70 border-white/20 hover:bg-white/20'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* News Articles */}
      <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
        {filteredArticles.map((article) => (
          <div
            key={article.id}
            className="bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-200 cursor-pointer group"
          >
            {/* Article header */}
            <div className="flex items-start justify-between mb-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(article.category)}`}>
                {article.category}
              </span>
              <div className="flex items-center text-xs text-white/60 space-x-2">
                <Clock className="w-3 h-3" />
                <span>{article.publishedAt}</span>
              </div>
            </div>

            {/* Article content */}
            <h3 className="text-white font-semibold mb-2 line-clamp-2 group-hover:text-blue-300 transition-colors">
              {article.title}
            </h3>
            <p className="text-white/70 text-sm mb-3 line-clamp-2">
              {article.summary}
            </p>

            {/* Article footer */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-blue-300 font-medium">{article.source}</span>
              <ExternalLink className="w-4 h-4 text-white/50 group-hover:text-blue-300 transition-colors" />
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.5);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.7);
        }
      `}</style>
    </div>
  );
};

export default NewsWidget;
