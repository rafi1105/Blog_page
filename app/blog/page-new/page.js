'use client';

import React, { useState, useEffect } from 'react';
import BlogPostCard from '../../../components/BlogPostCard';
import RepositoryCard from '../../../components/RepositoryCard';
import sampleBlogPosts from '../../../data/sampleBlogPosts.json';
import repositories from '../../../data/repositories.json';

const BlogPage = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [openSourceProjects, setOpenSourceProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Initialize with sample data
    setBlogPosts(sampleBlogPosts);
    setOpenSourceProjects(repositories);
  }, []);

  // Filter blog posts based on search term and active filter
  const filteredBlogPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (activeFilter === 'all') return matchesSearch;
    return matchesSearch && post.tags?.some(tag => 
      tag.toLowerCase() === activeFilter.toLowerCase()
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
    blogPosts.forEach(post => {
      post.tags?.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
  };

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Blog & Projects
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Explore my latest blog posts and open source projects
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search posts and projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <svg
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Filter Tags */}
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                activeFilter === 'all'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              All
            </button>
            {getAllTags().map(tag => (
              <button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  activeFilter === tag
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white/90">Latest Blog Posts</h2>
            <span className="text-white/60">
              {filteredBlogPosts.length} {filteredBlogPosts.length === 1 ? 'post' : 'posts'}
            </span>
          </div>

          {filteredBlogPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBlogPosts.map(post => (
                <BlogPostCard
                  key={post.id}
                  post={post}
                  showActions={false}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8">
                <p className="text-white/70 text-lg">No blog posts found matching your search.</p>
              </div>
            </div>
          )}
        </section>

        {/* Open Source Projects Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white/90">Open Source Projects</h2>
            <span className="text-white/60">
              {filteredRepositories.length} {filteredRepositories.length === 1 ? 'project' : 'projects'}
            </span>
          </div>

          {filteredRepositories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRepositories.map(repo => (
                <RepositoryCard
                  key={repo.id}
                  repository={repo}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8">
                <p className="text-white/70 text-lg">No projects found matching your search.</p>
              </div>
            </div>
          )}
        </section>

        {/* Stats Section */}
        <section className="mt-16 pt-8 border-t border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6">
              <h3 className="text-3xl font-bold text-blue-400">{blogPosts.length}</h3>
              <p className="text-white/70">Blog Posts</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6">
              <h3 className="text-3xl font-bold text-purple-400">{openSourceProjects.length}</h3>
              <p className="text-white/70">Open Source Projects</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6">
              <h3 className="text-3xl font-bold text-green-400">
                {openSourceProjects.reduce((sum, repo) => sum + (repo.stars || 0), 0)}
              </h3>
              <p className="text-white/70">Total Stars</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BlogPage;
