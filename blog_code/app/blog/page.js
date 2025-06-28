"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Calendar, Clock, User, Code, Star, GitBranch, Eye, Search, Filter, Github } from 'lucide-react'

export default function BlogPage() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [userBlogPosts, setUserBlogPosts] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  // Fetch user-created blog posts from MongoDB API
  const fetchUserBlogPosts = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/posts')
      const result = await response.json()
      
      if (result.success) {
        setUserBlogPosts(result.data)
      } else {
        console.error('Failed to fetch user blog posts:', result.error)
      }
    } catch (error) {
      console.error('Error fetching user blog posts:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Load user-created blog posts from MongoDB API
  useEffect(() => {
    fetchUserBlogPosts()
  }, [])

  // Sample blog posts data
  const sampleBlogPosts = [
    {
      id: 1,
      title: "Building a React Component Library with TypeScript",
      excerpt: "Learn how to create reusable React components with TypeScript for better development experience and type safety.",
      author: "John Doe",
      date: "2024-01-15",
      readTime: "8 min read",
      category: "React",
      tags: ["React", "TypeScript", "Components"],
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
      featured: true,
      views: 1234
    },
    {
      id: 2,
      title: "Next.js 14 App Router: Complete Guide",
      excerpt: "Explore the new App Router in Next.js 14 and learn how to build modern web applications with enhanced performance.",
      author: "Jane Smith",
      date: "2024-01-12",
      readTime: "12 min read",
      category: "Next.js",
      tags: ["Next.js", "React", "App Router"],
      image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=400&fit=crop",
      featured: false,
      views: 987
    },
    {
      id: 3,
      title: "Tailwind CSS Best Practices for 2024",
      excerpt: "Discover the latest Tailwind CSS techniques and best practices to write maintainable and scalable CSS.",
      author: "Mike Johnson",
      date: "2024-01-10",
      readTime: "6 min read",
      category: "CSS",
      tags: ["Tailwind", "CSS", "Design"],
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
      featured: false,
      views: 756
    },
    {
      id: 4,
      title: "JavaScript ES2024 New Features",
      excerpt: "Explore the latest JavaScript features introduced in ES2024 and how they can improve your coding experience.",
      author: "Sarah Wilson",
      date: "2024-01-08",
      readTime: "10 min read",
      category: "JavaScript",
      tags: ["JavaScript", "ES2024", "Features"],
      image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&h=400&fit=crop",
      featured: true,
      views: 1567
    },
    {
      id: 5,
      title: "Advanced React Hooks Patterns",
      excerpt: "Master advanced React hooks patterns and learn how to create custom hooks for better code organization.",
      author: "Alex Chen",
      date: "2024-01-05",
      readTime: "15 min read",
      category: "React",
      tags: ["React", "Hooks", "Patterns"],
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop",
      featured: false,
      views: 892
    },
    {
      id: 6,
      title: "CSS Grid vs Flexbox: When to Use What",
      excerpt: "Understanding the differences between CSS Grid and Flexbox and when to use each layout system.",
      author: "Emily Davis",
      date: "2024-01-03",
      readTime: "7 min read",
      category: "CSS",
      tags: ["CSS", "Grid", "Flexbox"],
      image: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800&h=400&fit=crop",
      featured: false,
      views: 643
    }
  ]

  // Combine sample posts with user-created posts
  const allBlogPosts = [...userBlogPosts, ...sampleBlogPosts]

  // Sample repositories data
  const repositories = [
    {
      id: 1,
      name: "react-ui-components",
      description: "A comprehensive collection of reusable React UI components built with TypeScript and Tailwind CSS.",
      language: "TypeScript",
      stars: 1234,
      forks: 89,
      updated: "2 days ago",
      topics: ["react", "typescript", "ui-components", "tailwind"]
    },
    {
      id: 2,
      name: "nextjs-blog-template",
      description: "Modern blog template built with Next.js 14, featuring MDX support and dark mode.",
      language: "JavaScript",
      stars: 567,
      forks: 45,
      updated: "1 week ago",
      topics: ["nextjs", "blog", "mdx", "template"]
    },
    {
      id: 3,
      name: "tailwind-animations",
      description: "Beautiful CSS animations and transitions using Tailwind CSS utilities.",
      language: "CSS",
      stars: 890,
      forks: 67,
      updated: "3 days ago",
      topics: ["tailwind", "css", "animations", "utilities"]
    }
  ]

  const categories = ['all', 'React', 'Next.js', 'CSS', 'JavaScript', 'TypeScript', 'Node.js', 'Python', 'Design', 'Tutorial']

  const filteredPosts = allBlogPosts.filter(post => {
    const matchesFilter = activeFilter === 'all' || post.category === activeFilter
    const matchesSearch = post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (post.tags && post.tags.some(tag => tag?.toLowerCase().includes(searchTerm.toLowerCase()))) ||
                         post.author?.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const featuredPosts = allBlogPosts.filter(post => post.featured)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 my-3">
                        <Code className="h-15 w-15 text-secondary dark:text-secondary" />
                        <h3 className="text-4xl font-bold text-gray-900 dark:text-white">
                          Code<span className='text-secondary font-bold dark:text-secondary'>_</span>Blog<span className='text-secondary font-bold dark:text-secondary'>.</span>
                        </h3>
                      </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover the latest in web development, coding tutorials, and open-source projects. 
            Join our community of developers sharing knowledge and building amazing things.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-12 space-y-6">
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeFilter === category
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {category === 'all' ? 'All Posts' : category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Featured Posts</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.map((post, index) => (
                <div
                  key={post._id || post.id || `featured-post-${index}`}
                  className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg border border-white/20 dark:border-gray-700/30 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group hover:bg-white/80 dark:hover:bg-gray-800/80"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-orange-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
                        Featured
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, index) => (
                        <span
                          key={`${post._id || post.id || 'featured'}-tag-${index}-${tag}`}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    {/* Meta Information */}
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <User className="w-4 h-4" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{post.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{post.readTime}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{post.views}</span>
                        </div>
                      </div>
                    </div>
                    
                    <Link
                      href={`/blog/${post.id}`}
                      className="block w-full text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      Read Article
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* User Created Posts */}
        {(userBlogPosts.length > 0 || isLoading) && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Community Posts {isLoading && <span className="text-sm font-normal text-gray-500">(Loading...)</span>}
              </h2>
              <Link 
                href="/content"
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium flex items-center space-x-1 transition-colors"
              >
                <span>Create Post</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {userBlogPosts.slice(0, 6).map((post, index) => (
                <div
                  key={post._id || post.id || `user-post-${index}`}
                  className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg border border-white/20 dark:border-gray-700/30 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group hover:bg-white/80 dark:hover:bg-gray-800/80"
                >
                  <div className="relative overflow-hidden h-48 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900">
                    {post.image ? (
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-48 flex items-center justify-center">
                        <Code className="w-16 h-16 text-blue-500 dark:text-blue-400" />
                      </div>
                    )}
                    <div className="absolute top-4 right-4">
                      <span className="bg-green-500/90 backdrop-blur-sm text-white px-2 py-1 rounded text-xs font-medium">
                        Community
                      </span>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded text-xs font-medium">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {(post.tags || []).slice(0, 3).map((tag, index) => (
                        <span
                          key={`${post._id || post.id || 'post'}-tag-${index}-${tag}`}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    {/* Meta Information */}
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{post.readTime || '5 min read'}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{post.views || 0}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="space-y-2">
                      {post.githubLink ? (
                        <a
                          href={post.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full text-center bg-gray-800 dark:bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-900 dark:hover:bg-gray-600 transition-colors font-medium flex items-center justify-center space-x-2"
                        >
                          <Github className="w-4 h-4" />
                          <span>View on GitHub</span>
                        </a>
                      ) : (
                        <Link
                          href={`/blog/${post._id || post.id}`}
                          className="block w-full text-center bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
                        >
                          Read Article
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* All Posts Grid */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            {activeFilter === 'all' ? 'All Posts' : `${activeFilter} Posts`}
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">
              ({filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'})
            </span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <article
                key={post._id || post.id || `filtered-post-${index}`}
                className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg border border-white/20 dark:border-gray-700/30 rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group hover:bg-white/80 dark:hover:bg-gray-800/80"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded text-xs font-medium">
                      {post.category}
                    </span>
                  </div>
                  {post.featured && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-orange-500/90 backdrop-blur-sm text-white px-2 py-1 rounded text-xs font-medium">
                        Featured
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={`${post._id || post.id || 'filtered'}-tag-${index}-${tag}`}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Meta Information */}
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{post.views}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  {post.githubLink ? (
                    <a
                      href={post.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full text-center bg-gray-800 dark:bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-900 dark:hover:bg-gray-600 transition-colors font-medium flex items-center justify-center space-x-2"
                    >
                      <Github className="w-4 h-4" />
                      <span>View on GitHub</span>
                    </a>
                  ) : (
                    <Link
                      href={`/blog/${post._id || post.id}`}
                      className="block w-full text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      Read Article
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>
          
          {/* No Results */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No posts found
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Try adjusting your search terms or filters
              </p>
            </div>
          )}
        </section>

        {/* Repository Showcase */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Open Source Projects
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Explore our collection of open-source repositories and contribute to the community.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repositories.map((repo, index) => (
              <div
                key={repo.id || `repo-${index}`}
                className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg border border-white/20 dark:border-gray-700/30 rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:bg-white/80 dark:hover:bg-gray-800/80"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Code className="w-5 h-5 text-blue-600" />
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {repo.name}
                    </h3>
                  </div>
                  <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                    {repo.language}
                  </span>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                  {repo.description}
                </p>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {repo.topics.slice(0, 3).map((topic, index) => (
                    <span
                      key={`${repo.id || 'repo'}-topic-${index}-${topic}`}
                      className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4" />
                      <span>{repo.stars}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <GitBranch className="w-4 h-4" />
                      <span>{repo.forks}</span>
                    </div>
                  </div>
                  <span>Updated {repo.updated}</span>
                </div>
                
                <Link
                  href={`https://github.com/username/${repo.name}`}
                  className="block w-full text-center bg-gray-800 dark:bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-900 dark:hover:bg-gray-600 transition-colors font-medium"
                >
                  View Repository
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-blue-600/90 to-purple-600/90 backdrop-blur-lg border border-white/20 rounded-2xl p-8 md:p-12 shadow-xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Stay Updated with Latest Posts
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Get notified when we publish new articles and tutorials. Join our community of developers!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border-0 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-white focus:outline-none backdrop-blur-sm bg-white/90"
              />
              <button className="px-6 py-3 bg-white/90 backdrop-blur-sm text-blue-600 rounded-lg font-semibold hover:bg-white transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
