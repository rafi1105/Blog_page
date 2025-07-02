'use client';

import React, { useState, useEffect } from 'react';
import BlogPostCard from '../../components/BlogPostCard';
import RepositoryCard from '../../components/RepositoryCard';
import sampleBlogPosts from '../../data/sampleBlogPosts.json';
import repositories from '../../data/repositories.json';

const BlogPage = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [userBlogPosts, setUserBlogPosts] = useState([]);
  const [openSourceProjects, setOpenSourceProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dataSource, setDataSource] = useState('localStorage');

  // Fetch user-created blog posts from MongoDB API with fallback
  const fetchUserBlogPosts = async () => {
    setIsLoading(true);
    
    // Check if we're in a static export environment
    const isStaticMode = typeof window !== 'undefined' && 
      (window.location.protocol === 'file:' || 
       process.env.NODE_ENV === 'production' && !window.location.hostname.includes('localhost'));
    
    if (isStaticMode) {
      // Skip API call in static mode, go directly to localStorage
      console.log('Static mode detected, using localStorage');
      try {
        const storedPosts = localStorage.getItem('blogPosts');
        if (storedPosts) {
          setUserBlogPosts(JSON.parse(storedPosts));
          setDataSource('localStorage');
        } else {
          setUserBlogPosts([]);
        }
      } catch (localStorageError) {
        console.error('Error reading from localStorage:', localStorageError);
        setUserBlogPosts([]);
      }
      setIsLoading(false);
      return;
    }

    try {
      // Add timeout and better error handling for the fetch
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

      const response = await fetch('/api/posts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
        cache: 'no-cache'
      });

      clearTimeout(timeoutId);
      
      // Check if we got an HTML error page instead of JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('API not available - invalid content type');
      }
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        setUserBlogPosts(result.data);
        setDataSource('MongoDB');
      } else {
        console.warn('API returned error, falling back to localStorage:', result.error);
        throw new Error('API returned error');
      }
    } catch (error) {
      // Only log as warning since fallback is expected in some environments
      if (error.name === 'AbortError') {
        console.warn('API request timed out, using localStorage fallback');
      } else {
        console.warn('API not available, using localStorage fallback:', error.message);
      }
      
      // Fallback to localStorage when API is not available
      try {
        const storedPosts = localStorage.getItem('blogPosts');
        if (storedPosts) {
          setUserBlogPosts(JSON.parse(storedPosts));
          setDataSource('localStorage');
        } else {
          setUserBlogPosts([]);
        }
      } catch (localStorageError) {
        console.error('Error reading from localStorage:', localStorageError);
        setUserBlogPosts([]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsClient(true);
    // Initialize with sample data
    setBlogPosts([...sampleBlogPosts]);
    setOpenSourceProjects(repositories);
    // Fetch user posts
    fetchUserBlogPosts();
  }, []);

  // Combine all posts (user + sample)
  const allBlogPosts = [...userBlogPosts, ...blogPosts];

  // Filter blog posts based on search term and active filter
  const filteredBlogPosts = allBlogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (post.content || post.excerpt || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (activeFilter === 'all') return matchesSearch;
    return matchesSearch && (
      post.category === activeFilter ||
      post.tags?.some(tag => tag.toLowerCase() === activeFilter.toLowerCase())
    );
  });

  // Filter repositories based on search term
  const filteredRepositories = openSourceProjects.filter(repo => {
    return repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           repo.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
           repo.technologies?.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
  });

  // Get unique tags for filter options
  const getAllTags = () => {
    const tags = new Set();
    allBlogPosts.forEach(post => {
      post.tags?.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
  };

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-blue-900/20 dark:to-black flex items-center justify-center">
        <div className="glass-ultra p-8 rounded-2xl shadow-2xl shadow-blue-500/20">
          <div className="animate-pulse flex items-center space-x-4">
            <div className="w-8 h-8 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="text-black dark:text-white text-lg font-medium">Loading amazing content...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-blue-900/20 dark:to-black relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      </div>
      
      <div className="relative container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="glass-ultra p-8 rounded-3xl shadow-2xl shadow-blue-500/20 mb-8 animate-slide-in">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent animate-gradient">
              Code Blog & Projects
            </h1>
            <p className="text-xl text-black/80 dark:text-white/80 max-w-3xl mx-auto leading-relaxed">
              Discover the latest in web development, coding tutorials, and open source projects
            </p>
            
            {/* Data Source Indicator */}
            <div className="mt-8 inline-flex items-center px-6 py-3 glass backdrop-blur-md border border-blue-200/50 dark:border-blue-400/30 text-black dark:text-white rounded-full text-sm font-medium shadow-lg shadow-blue-500/20 hover:scale-105 transition-all duration-300">
              <div className={`w-3 h-3 rounded-full mr-3 ${dataSource === 'MongoDB' ? 'bg-green-500 animate-pulse' : 'bg-blue-500 animate-pulse'}`}></div>
              {isLoading ? 'Loading posts...' : `Posts loaded from ${dataSource}`}
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-12 space-y-6">
          <div className="glass-ultra p-6 rounded-2xl shadow-xl shadow-blue-500/20">
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-6">
              <input
                type="text"
                placeholder="Search posts and projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 bg-white/50 dark:bg-black/20 backdrop-blur-md border border-blue-200/50 dark:border-blue-400/30 rounded-xl text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-lg"
              />
              <svg
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Filter Tags */}
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 ${
                  activeFilter === 'all'
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30'
                    : 'bg-white/30 dark:bg-black/20 text-black dark:text-white hover:bg-blue-500/20 dark:hover:bg-blue-500/20 border border-blue-200/50 dark:border-blue-400/30'
                }`}
              >
                All
              </button>
              {getAllTags().map(tag => (
                <button
                  key={tag}
                  onClick={() => setActiveFilter(tag)}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 ${
                    activeFilter === tag
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30'
                      : 'bg-white/30 dark:bg-black/20 text-black dark:text-white hover:bg-blue-500/20 dark:hover:bg-blue-500/20 border border-blue-200/50 dark:border-blue-400/30'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Posts Section */}
        {userBlogPosts.filter(post => post.featured).length > 0 && (
          <section className="mb-20">
            <div className="glass-ultra p-8 rounded-3xl shadow-2xl shadow-blue-500/20 mb-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ✨ Featured Community Posts
                </h2>
                <a 
                  href="/content"
                  className="glass px-6 py-3 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium flex items-center space-x-2 transition-all duration-300 hover:scale-105 rounded-xl shadow-lg hover:shadow-blue-500/30"
                >
                  <span>Create Post</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </a>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {userBlogPosts.filter(post => post.featured).slice(0, 3).map(post => (
                  <BlogPostCard
                    key={post._id || post.id}
                    post={{
                      ...post,
                      imageUrl: post.image,
                      content: post.excerpt || post.content,
                      createdAt: post.date || post.createdAt,
                      tags: post.tags || []
                    }}
                    showActions={false}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All Blog Posts Section */}
        <section className="mb-20">
          <div className="glass-ultra p-8 rounded-3xl shadow-2xl shadow-blue-500/20">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {activeFilter === 'all' ? '📚 All Blog Posts' : `🏷️ ${activeFilter} Posts`}
              </h2>
              <span className="glass px-4 py-2 rounded-full text-black dark:text-white text-sm font-medium">
                {filteredBlogPosts.length} {filteredBlogPosts.length === 1 ? 'post' : 'posts'}
              </span>
            </div>

            {filteredBlogPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredBlogPosts.map(post => (
                  <BlogPostCard
                    key={post._id || post.id}
                    post={{
                      ...post,
                      imageUrl: post.image || post.imageUrl,
                      content: post.excerpt || post.content,
                      createdAt: post.date || post.createdAt,
                      tags: post.tags || []
                    }}
                    showActions={false}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="glass p-12 rounded-2xl shadow-lg">
                  <svg className="w-20 h-20 mx-auto mb-6 text-blue-500 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <h3 className="text-2xl font-semibold text-black dark:text-white mb-4">No posts found</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-lg">Try adjusting your search terms or filters</p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Open Source Projects Section */}
        <section className="mb-20">
          <div className="glass-ultra p-8 rounded-3xl shadow-2xl shadow-blue-500/20">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                🚀 Open Source Projects
              </h2>
              <span className="glass px-4 py-2 rounded-full text-black dark:text-white text-sm font-medium">
                {filteredRepositories.length} {filteredRepositories.length === 1 ? 'project' : 'projects'}
              </span>
            </div>

            {filteredRepositories.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredRepositories.map(repo => (
                  <RepositoryCard
                    key={repo.id}
                    repository={repo}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="glass p-12 rounded-2xl shadow-lg">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center animate-pulse">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <p className="text-black dark:text-white text-lg font-medium">No projects found matching your search.</p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Stats Section */}
        <section className="mt-20 pt-8 border-t border-blue-200/50 dark:border-blue-400/30">
          <div className="glass-ultra p-8 rounded-3xl shadow-2xl shadow-blue-500/20">
            <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              📊 Platform Statistics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div className="glass p-8 rounded-2xl shadow-lg hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105 group">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center group-hover:animate-pulse">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">{allBlogPosts.length}</h3>
                <p className="text-gray-600 dark:text-gray-400 font-medium">Total Posts</p>
              </div>
              <div className="glass p-8 rounded-2xl shadow-lg hover:shadow-green-500/30 transition-all duration-300 hover:scale-105 group">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center group-hover:animate-pulse">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">{userBlogPosts.length}</h3>
                <p className="text-gray-600 dark:text-gray-400 font-medium">Community Posts</p>
              </div>
              <div className="glass p-8 rounded-2xl shadow-lg hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105 group">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center group-hover:animate-pulse">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">{openSourceProjects.length}</h3>
                <p className="text-gray-600 dark:text-gray-400 font-medium">Open Source Projects</p>
              </div>
              <div className="glass p-8 rounded-2xl shadow-lg hover:shadow-orange-500/30 transition-all duration-300 hover:scale-105 group">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center group-hover:animate-pulse">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <h3 className="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                  {openSourceProjects.reduce((sum, repo) => sum + (repo.stars || 0), 0)}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 font-medium">Total Stars</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BlogPage;
