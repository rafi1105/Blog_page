"use client"

import "../app/globals.css";
import { Divide, Table, Calendar, Clock, User, Eye, Search, BookOpen, ArrowRight, Download, MapPin, Mail, Phone, Github, Linkedin, ExternalLink } from "lucide-react";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import Lottie from "lottie-react";
import animationData from "../Animation - 1751031313621.json";

export default function Home() {
  const texts = ["Tailwind CSS", "Mechine Learning", "Python", "JavaScript"];
  const [typedText, setTypedText] = React.useState("");
  const [textIndex, setTextIndex] = React.useState(0);
  const [isDeleting, setIsDeleting] = React.useState(false);
  
  // Search functionality state
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const [isSearching, setIsSearching] = React.useState(false);
  const [showSearchResults, setShowSearchResults] = React.useState(false);
  const [recentPosts, setRecentPosts] = React.useState([]);
  const [isLoadingPosts, setIsLoadingPosts] = React.useState(false);

  const typingSpeed = 120;
  const deletingSpeed = 60;
  const pauseTime = 1200;

  // Sample blog posts data (same as blog page)
  const sampleBlogPosts = [
    {
      id: 1,
      title: "Building a React Component Library with TypeScript",
      excerpt: "Learn how to create reusable React components with TypeScript for better development experience and type safety.",
      author: "Rafi Kabir",
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
      title: "Community Posts and Open Source Collaboration",
      excerpt: "Discover how community posts drive open source projects and foster collaboration among developers worldwide.",
      author: "Mike Johnson",
      date: "2024-01-10",
      readTime: "6 min read",
      category: "Community",
      tags: ["Community", "Open Source", "Collaboration"],
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
    },
    {
      id: 7,
      title: "Building Community-Driven Posts Platform",
      excerpt: "A comprehensive guide to building platforms that encourage community posts and user-generated content for better engagement.",
      author: "David Brown",
      date: "2024-01-07",
      readTime: "9 min read",
      category: "Community",
      tags: ["Community", "Posts", "Platform", "Engagement"],
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop",
      featured: true,
      views: 1125
    }
  ];

  // Fetch posts from MongoDB
  const fetchPostsFromMongoDB = async () => {
    try {
      const response = await fetch('/api/posts');
      if (response.ok) {
        const data = await response.json();
        return data.posts || [];
      }
    } catch (error) {
      console.error('Error fetching posts from MongoDB:', error);
    }
    return [];
  };

  // Load recent posts on component mount
  React.useEffect(() => {
    const loadRecentPosts = async () => {
      setIsLoadingPosts(true);
      const mongodbPosts = await fetchPostsFromMongoDB();
      const allPosts = [...mongodbPosts, ...sampleBlogPosts];
      
      // Sort by date and get the 4 most recent posts
      const sortedPosts = allPosts.sort((a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date));
      setRecentPosts(sortedPosts.slice(0, 4));
      setIsLoadingPosts(false);
    };
    
    loadRecentPosts();
  }, []);

  // Search functionality
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setShowSearchResults(false);
      return;
    }

    setIsSearching(true);
    setShowSearchResults(true);

    try {
      // Fetch posts from MongoDB
      const mongodbPosts = await fetchPostsFromMongoDB();
      const allPosts = [...mongodbPosts, ...sampleBlogPosts];

      // Filter posts based on search query
      const filtered = allPosts.filter(post => {
        const searchTerm = searchQuery.toLowerCase().trim();
        
        // Safe string checking with fallbacks
        const title = (post.title || '').toLowerCase();
        const excerpt = (post.excerpt || post.description || '').toLowerCase();
        const content = (post.content || '').toLowerCase();
        const category = (post.category || '').toLowerCase();
        const author = (post.author || '').toLowerCase();
        
        // Safe array checking for tags
        const tags = Array.isArray(post.tags) ? post.tags : [];
        const tagMatch = tags.some(tag => (tag || '').toLowerCase().includes(searchTerm));
        
        // Split search term into individual words for better matching
        const searchWords = searchTerm.split(/\s+/);
        
        // Check if all search words are found in any of the fields
        const matchesAllWords = searchWords.every(word => {
          return title.includes(word) ||
                 excerpt.includes(word) ||
                 content.includes(word) ||
                 category.includes(word) ||
                 author.includes(word) ||
                 tags.some(tag => (tag || '').toLowerCase().includes(word));
        });
        
        // Also check for exact phrase match (original logic)
        const exactPhraseMatch = title.includes(searchTerm) ||
                                excerpt.includes(searchTerm) ||
                                content.includes(searchTerm) ||
                                category.includes(searchTerm) ||
                                author.includes(searchTerm) ||
                                tagMatch;
        
        return exactPhraseMatch || matchesAllWords;
      });

      setSearchResults(filtered);
    } catch (error) {
      console.error('Error searching posts:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setShowSearchResults(false);
  };

  React.useEffect(() => {
    let timeout;
    const currentText = texts[textIndex];

    if (!isDeleting && typedText.length < currentText.length) {
      timeout = setTimeout(() => {
        setTypedText(currentText.slice(0, typedText.length + 1));
      }, typingSpeed);
    } else if (isDeleting && typedText.length > 0) {
      timeout = setTimeout(() => {
        setTypedText(currentText.slice(0, typedText.length - 1));
      }, deletingSpeed);
    } else if (!isDeleting && typedText.length === currentText.length) {
      timeout = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && typedText.length === 0) {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % texts.length);
      }, 400);
    }

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, textIndex, texts]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-card to-muted">
      <section className="container px-2 py-1 mx-auto lg:min-h-120 lg:space-x-10 justify-center lg:flex lg:items-center lg:gap-3 ">
        <div className="w-full text-center lg:text-left lg:w-1/2 lg:-mt-1">
          <h2 className="text-2xl leading-snug text-gray-800 dark:text-gray-200 md:text-4xl">
            A <span className="font-semibold">free repository</span> for community{" "}
            <br className="hidden lg:block" /> 
            components using{" "}
            <span className="font-semibold underline decoration-secondary  dark:decoration-secondary ">
              {typedText}
              <span className="animate-pulse">|</span>
            </span>
          </h2>
          
          <p className="lg:mt-4 text-lg lg:text-gray-600 dark:text-gray-300">
            Open source porject and components increase{" "}
            <br className="hidden lg:block" /> 
            reuseablity your new apps, projects or landing sites <span className="text-secondary  font-bold dark:text-secondary "> !</span>

          </p>
          
          <div className="mt-6 bg-transparent border-2 shadow-2xl shadow-gray-700/50 dark:shadow-red-700/40 rounded-lg dark:border-gray-700 lg:max-w-110  lg:max-h-35 max-sm:w-full max-md:w-full focus-within:border-secondary focus-within:ring focus-within:ring-secondary dark:focus-within:border-secondary focus-within:ring-opacity-20 backdrop-blur-sm ">
            <form 
              onSubmit={handleSearch}
              className="flex flex-wrap justify-between md:flex-row "
            >
              <input
                type="search"
                name="query"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Posts, Components, Blogs..."
                required
                className="flex-1 max-h-10 px-5 m-1 text-gray-700 lg:w-1 placeholder dark:placeholder-white  bg-transparent border-none appearance-none lg:h-10 dark:text-gray-200 focus:outline-none focus:placeholder-transparent focus:ring-0  active:backdrop-blur-md  active:bg-transparent"
              />
              <button
                type="submit"
                disabled={isSearching}
                className="flex items-center justify-center min-w-14 p-2 m-1 backdrop-blur-sm transition-colors duration-300 transform rounded-lg lg:max-w-15 lg:max-h-12 lg:p-0 bg-secondary text-white focus:outline-secondary disabled:opacity-50"
              >
                {isSearching ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                ) : (
                  <Search className="w-6 h-6" />
                )}
              </button>
            </form>
          </div>
        </div>
        
        <div className="w-full mt-4 lg:mt-0 lg:w-1/2  ">
          <div className="w-full h-full max-w-md mx-auto ">
            <Lottie
              animationData={animationData}
              loop={true}
              autoplay={true}
              style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}
            />
          </div>
        </div>
      </section>



      {/* Search Results Section */}
      {showSearchResults && (
        <section className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Search Results for "{searchQuery}"
            </h2>
            <button
              onClick={clearSearch}
              className="px-4 py-2 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Clear Search
            </button>
          </div>
          
          {searchResults.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((post) => (
                <SearchResultCard key={post._id || post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                No posts found
              </h3>
              <p className="text-gray-500 dark:text-gray-500">
                Try searching with different keywords or{" "}
                <Link href="/blog" className="text-blue-600 hover:text-blue-800">
                  browse all posts
                </Link>
              </p>
            </div>
          )}
        </section>
      )}

      {/* Recent Posts Section - Only show when not searching */}
      {!showSearchResults && (
        <section className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Recent Posts
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Discover our latest articles and tutorials
              </p>
            </div>
            
          </div>
          
          {isLoadingPosts ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {recentPosts.map((post) => (
                <RecentPostCard key={post._id || post.id} post={post} />
              ))}
            </div>
          )}
        </section>
        
      )}
            {/* Personal Info Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 md:p-12 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            
            {/* Profile Picture */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative">
                <div className="w-68 h-98 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-2xl shadow-blue-500/100">
                  <Image
                    src="/rafi.jpg" // Replace with your actual profile image
                    alt="Profile Picture"
                    width={350}
                    height={350}
                    className="object-cover w-full h-full"
                  />
                </div>
                
              </div>
            </div>

            {/* Personal Information */}
            <div className="lg:col-span-2 text-center lg:text-left">
              <div className="mb-6">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                 Rafi Kabir
                </h2>
                <p className="text-xl text-blue-600 dark:text-blue-400 font-semibold mb-2">
                  Full Stack Developer & Technical Writer
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                  Passionate developer with 5+ years of experience in building modern web applications. 
                  I love sharing knowledge through blog posts and creating innovative solutions with React, Next.js, and Node.js.
                </p>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center justify-center lg:justify-start space-x-3">
                  <Mail className="h-5 w-5 text-red-600" />
                  <span className="text-gray-700 dark:text-gray-300">rafikabir05.rk@gmail.com</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start space-x-3">
                  <Phone className="h-5 w-5 text-red-600" />
                  <span className="text-gray-700 dark:text-gray-300">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start space-x-3">
                  <MapPin className="h-5 w-5 text-red-600" />
                  <span className="text-gray-700 dark:text-gray-300">Dhaka, Bangladesh</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start space-x-3">
                  <Calendar className="h-5 w-5 text-red-600" />
                  <span className="text-gray-700 dark:text-gray-300">Available for Projects</span>
                </div>
              </div>

              {/* Skills/Technologies */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Technologies & Skills
                </h3>
                <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                  {["React", "Next.js", "Node.js", "Sass", "MongoDB", "Tailwind CSS", "Python", "Mechine Learning"].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-blue-600 dark:bg-blue-600 text-red-100 dark:text-red-100 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a
                  href="/cv/John_Doe_CV.pdf" // Replace with your actual CV path
                  download="John_Doe_CV.pdf"
                  className="inline-flex items-center justify-center px-6 py-3 bg-red-800 hover:bg-red-900 text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
                >
                  <Download className="h-5 w-5 mr-2" />
                  Download CV
                </a>
                
                <div className="flex space-x-3">
                  <a
                    href="https://github.com/your-username" // Replace with your GitHub
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-4 py-3 hover:text-purple-700 hover:bg-transparent bg-purple-700 p-2 text-white rounded-lg transition-colors duration-200"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                  <a
                    href="https://linkedin.com/in/your-profile" // Replace with your LinkedIn
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-4 py-3 hover:text-blue-500 hover:bg-transparent bg-blue-500 p-2 text-white rounded-lg transition-colors duration-200"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-4 py-3 hover:text-red-600 hover:bg-transparent bg-red-600 p-2 text-white rounded-lg transition-colors duration-200"
                  >
                    <Mail className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">50+</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm mt-1">Projects Completed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">5+</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm mt-1">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">100+</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm mt-1">Blog Posts</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">10K+</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm mt-1">Readers</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// Search Result Card Component
function SearchResultCard({ post }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="relative h-48">
        <Image
          src={post.image || "/programming.png"}
          alt={post.title}
          fill
          className="object-cover"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
            {post.category}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {post.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4" />
            <span>{post.readTime}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <Calendar className="h-4 w-4" />
            <span>{new Date(post.createdAt || post.date).toLocaleDateString()}</span>
          </div>
          {post.views && (
            <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
              <Eye className="h-4 w-4" />
              <span>{post.views}</span>
            </div>
          )}
        </div>
        
        <Link
          href={`/blog?id=${post._id || post.id}`}
          className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
        >
          Read Article
          <ArrowRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
    </div>
  );
}

// Recent Post Card Component
function RecentPostCard({ post }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group hover:-translate-y-1">
      <div className="relative h-40">
        <Image
          src={post.image || "/programming.png"}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <span className="px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
            {post.category}
          </span>
        </div>
        {post.featured && (
          <div className="absolute top-3 right-3">
            <span className="px-2 py-1 bg-yellow-500 text-white text-xs font-medium rounded-full">
              Featured
            </span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {post.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
          <div className="flex items-center space-x-1">
            <User className="h-3 w-3" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-3 w-3" />
            <span>{post.readTime}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {new Date(post.createdAt || post.date).toLocaleDateString()}
          </span>
          {post.views && (
            <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
              <Eye className="h-3 w-3" />
              <span>{post.views}</span>
            </div>
          )}
        </div>
        
        <Link
          href={`/blog?id=${post._id || post.id}`}
          className="mt-3 inline-flex items-center text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
        >
          Read More
          <ArrowRight className="h-3 w-3 ml-1" />
        </Link>
      </div>
    </div>
  );
}

// Skeleton Loading Card Component
function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="h-40 bg-gray-300 dark:bg-gray-700"></div>
      <div className="p-4">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-2/3 mb-3"></div>
        <div className="flex justify-between">
          <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
          <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
        </div>
      </div>
    </div>
  );
}
