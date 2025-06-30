"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  BookOpen, 
  Video, 
  FileText, 
  Download, 
  ExternalLink, 
  Filter, 
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Calendar,
  User,
  Tag,
  Image as ImageIcon,
  Save,
  CheckCircle,
  AlertCircle,
  Database,
  Loader,
  Upload,
  Github
} from 'lucide-react'

export default function ContentPage() {
  const [activeTab, setActiveTab] = useState('create')
  const [searchTerm, setSearchTerm] = useState('')
  const [blogPosts, setBlogPosts] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [error, setError] = useState(null)

  // Blog form data
  const [blogFormData, setBlogFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    category: 'React',
    tags: '',
    image: '',
    githubLink: '',
    readTime: '',
    featured: false
  })

  // Image upload state
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const [isUploadingImage, setIsUploadingImage] = useState(false)

  // Fetch blog posts from MongoDB API with fallback
  const fetchBlogPosts = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/posts')
      
      // Check if we got an HTML error page instead of JSON
      const contentType = response.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('API not available - using local storage fallback')
      }
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const result = await response.json()
      
      if (result.success) {
        setBlogPosts(result.data)
      } else {
        setError(result.error || 'Failed to fetch blog posts')
      }
    } catch (error) {
      console.error('Error fetching blog posts:', error)
      
      // Fallback to localStorage when API is not available
      try {
        const storedPosts = localStorage.getItem('blogPosts')
        if (storedPosts) {
          setBlogPosts(JSON.parse(storedPosts))
          setError('Using local storage (API unavailable)')
        } else {
          setBlogPosts([])
          setError('No posts found - create your first post below')
        }
      } catch (localStorageError) {
        console.error('Error reading from localStorage:', localStorageError)
        setBlogPosts([])
        setError('Failed to load posts')
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Load blog posts on component mount
  useEffect(() => {
    fetchBlogPosts()
  }, [])

  const handleBlogInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setBlogFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      
      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const uploadImage = async () => {
    if (!imageFile) return null

    setIsUploadingImage(true)
    try {
      const formData = new FormData()
      formData.append('file', imageFile)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      // Check if we got an HTML error page instead of JSON
      const contentType = response.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Image upload API not available - please use image URLs instead')
      }
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      
      if (result.success) {
        return result.imageUrl
      } else {
        throw new Error(result.error || 'Failed to upload image')
      }
    } catch (error) {
      console.error('Error uploading image:', error)
      throw error
    } finally {
      setIsUploadingImage(false)
    }
  }

  const handleBlogSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)
    setError(null)
    
    try {
      let imageUrl = blogFormData.image

      // Upload image if file is selected (only works with API)
      if (imageFile) {
        try {
          imageUrl = await uploadImage()
        } catch (uploadError) {
          // If image upload fails, fall back to using URL or skip image
          console.warn('Image upload failed, using form image URL:', uploadError)
          imageUrl = blogFormData.image
        }
      }

      const postData = {
        ...blogFormData,
        image: imageUrl,
        tags: blogFormData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      }

      try {
        const response = await fetch('/api/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postData),
        })
        
        // Check if we got an HTML error page instead of JSON
        const contentType = response.headers.get('content-type')
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('API not available - using local storage fallback')
        }
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const result = await response.json()
        
        if (result.success) {
          // Reset form
          setBlogFormData({
            title: '',
            excerpt: '',
            content: '',
            author: '',
            category: 'React',
            tags: '',
            image: '',
            githubLink: '',
            readTime: '',
            featured: false
          })

          // Reset image state
          setImageFile(null)
          setImagePreview('')
          
          setSubmitStatus('success')
          
          // Refresh blog posts list
          await fetchBlogPosts()
          
          setTimeout(() => setSubmitStatus(null), 5000)
        } else {
          setError(result.error || 'Failed to create blog post')
          setSubmitStatus('error')
          setTimeout(() => setSubmitStatus(null), 5000)
        }
      } catch (apiError) {
        console.warn('API not available, saving to localStorage:', apiError)
        
        // Fallback to localStorage
        const newPost = {
          ...postData,
          _id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          views: 0
        }
        
        const existingPosts = JSON.parse(localStorage.getItem('blogPosts') || '[]')
        const updatedPosts = [newPost, ...existingPosts]
        localStorage.setItem('blogPosts', JSON.stringify(updatedPosts))
        
        // Reset form
        setBlogFormData({
          title: '',
          excerpt: '',
          content: '',
          author: '',
          category: 'React',
          tags: '',
          image: '',
          githubLink: '',
          readTime: '',
          featured: false
        })

        // Reset image state
        setImageFile(null)
        setImagePreview('')
        
        setSubmitStatus('success')
        setError('Saved to local storage (API unavailable)')
        
        // Refresh blog posts list
        await fetchBlogPosts()
        
        setTimeout(() => {
          setSubmitStatus(null)
          setError(null)
        }, 5000)
      }
    } catch (error) {
      console.error('Error creating blog post:', error)
      setError(error.message || 'Failed to create blog post')
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus(null), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeletePost = async (id) => {
    if (!confirm('Are you sure you want to delete this blog post?')) {
      return
    }
    
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      })
      
      // Check if we got an HTML error page instead of JSON
      const contentType = response.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('API not available - using local storage fallback')
      }
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const result = await response.json()
      
      if (result.success) {
        // Refresh blog posts list
        await fetchBlogPosts()
      } else {
        setError(result.error || 'Failed to delete blog post')
      }
    } catch (error) {
      console.error('Error deleting blog post:', error)
      
      // Fallback to localStorage
      try {
        const existingPosts = JSON.parse(localStorage.getItem('blogPosts') || '[]')
        const updatedPosts = existingPosts.filter(post => post._id !== id)
        localStorage.setItem('blogPosts', JSON.stringify(updatedPosts))
        
        // Refresh blog posts list
        await fetchBlogPosts()
        setError('Deleted from local storage (API unavailable)')
        setTimeout(() => setError(null), 3000)
      } catch (localStorageError) {
        console.error('Error deleting from localStorage:', localStorageError)
        setError('Failed to delete blog post')
      }
    }
  }

  const categories = ['React', 'Next.js', 'CSS', 'JavaScript', 'TypeScript', 'Node.js', 'Python', 'Design', 'Tutorial']

  const filteredPosts = blogPosts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
  )

  const contentItems = [
    {
      id: 1,
      title: "React Best Practices 2024",
      description: "Complete guide to modern React development patterns and performance optimization techniques.",
      type: "guide",
      category: "React",
      downloadUrl: "#",
      previewUrl: "#",
      image: "/file.svg",
      tags: ["React", "JavaScript", "Performance"]
    },
    {
      id: 2,
      title: "CSS Grid Masterclass",
      description: "Learn CSS Grid from basics to advanced layouts with practical examples and real-world projects.",
      type: "video",
      category: "CSS",
      downloadUrl: "#",
      previewUrl: "#",
      image: "/globe.svg",
      tags: ["CSS", "Layout", "Design"]
    },
    {
      id: 3,
      title: "Next.js 14 Tutorial Series",
      description: "Step-by-step tutorial series covering Next.js 14 features, routing, and deployment strategies.",
      type: "tutorial",
      category: "Next.js",
      downloadUrl: "#",
      previewUrl: "#",
      image: "/next.svg",
      tags: ["Next.js", "React", "Full-stack"]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            Content Creator
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-4">
            Create and manage your blog content with MongoDB database integration. Write new posts, manage existing content, and share your knowledge with the community.
          </p>
          <div className="flex items-center justify-center space-x-2 text-sm text-green-600 dark:text-green-400">
            <Database className="w-4 h-4" />
            <span>Connected to MongoDB Database</span>
          </div>
        </div>

        {/* Global Error Message */}
        {error && (
          <div className="mb-8 p-4 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg flex items-center space-x-2 text-red-800 dark:text-red-200 max-w-4xl mx-auto">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
            <button 
              onClick={() => setError(null)}
              className="ml-auto text-red-600 hover:text-red-800"
            >
              ×
            </button>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <button
            onClick={() => setActiveTab('create')}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
              activeTab === 'create'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <Plus className="w-4 h-4 inline mr-2" />
            Create Blog Post
          </button>
          <button
            onClick={() => setActiveTab('manage')}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
              activeTab === 'manage'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <Edit className="w-4 h-4 inline mr-2" />
            Manage Posts ({isLoading ? '...' : blogPosts.length})
          </button>
          <button
            onClick={() => setActiveTab('library')}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
              activeTab === 'library'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <BookOpen className="w-4 h-4 inline mr-2" />
            Content Library
          </button>
        </div>

        {/* Create Blog Post Tab */}
        {activeTab === 'create' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Create New Blog Post
              </h2>
              
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg">
                  <div className="flex items-center space-x-2 text-green-800 dark:text-green-200 mb-2">
                    <CheckCircle className="w-5 h-5" />
                    <span>Blog post created successfully and saved to database!</span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm">
                    <Link 
                      href="/blog" 
                      className="text-green-700 dark:text-green-300 hover:text-green-900 dark:hover:text-green-100 font-medium underline"
                    >
                      View on Blog Page
                    </Link>
                    <button 
                      onClick={() => setActiveTab('manage')}
                      className="text-green-700 dark:text-green-300 hover:text-green-900 dark:hover:text-green-100 font-medium underline"
                    >
                      Manage Posts
                    </button>
                  </div>
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg flex items-center space-x-2 text-red-800 dark:text-red-200">
                  <AlertCircle className="w-5 h-5" />
                  <span>Failed to create blog post. Please try again.</span>
                </div>
              )}

              <form onSubmit={handleBlogSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Post Title *
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={blogFormData.title}
                      onChange={handleBlogInputChange}
                      required
                      maxLength={200}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your blog post title"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="author" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Author Name *
                    </label>
                    <input
                      type="text"
                      id="author"
                      name="author"
                      value={blogFormData.author}
                      onChange={handleBlogInputChange}
                      required
                      maxLength={100}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Your name"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Category *
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={blogFormData.category}
                      onChange={handleBlogInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="readTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Read Time
                    </label>
                    <input
                      type="text"
                      id="readTime"
                      name="readTime"
                      value={blogFormData.readTime}
                      onChange={handleBlogInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="e.g., 5 min read"
                    />
                  </div>
                  
                  <div className="flex items-center justify-center">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="featured"
                        checked={blogFormData.featured}
                        onChange={handleBlogInputChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Featured Post</span>
                    </label>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Featured Image Upload */}
                  <div>
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Featured Image Upload
                    </label>
                    <div className="space-y-3">
                      <input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                      {imagePreview && (
                        <div className="relative">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setImageFile(null)
                              setImagePreview('')
                            }}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                          >
                            ×
                          </button>
                        </div>
                      )}
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Supported formats: JPEG, PNG, GIF, WebP (Max 5MB)
                      </p>
                    </div>
                  </div>

                  {/* GitHub Link */}
                  <div>
                    <label htmlFor="githubLink" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      GitHub Repository Link
                    </label>
                    <input
                      type="url"
                      id="githubLink"
                      name="githubLink"
                      value={blogFormData.githubLink}
                      onChange={handleBlogInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="https://github.com/username/repository"
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Optional: Link to the GitHub repository related to this post
                    </p>
                  </div>
                </div>

                <div>
                  <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Post Excerpt *
                  </label>
                  <textarea
                    id="excerpt"
                    name="excerpt"
                    value={blogFormData.excerpt}
                    onChange={handleBlogInputChange}
                    required
                    maxLength={500}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="A brief description of your blog post (max 500 characters)..."
                  />
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {blogFormData.excerpt.length}/500 characters
                  </div>
                </div>

                <div>
                  <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    id="tags"
                    name="tags"
                    value={blogFormData.tags}
                    onChange={handleBlogInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="React, JavaScript, Tutorial, Beginner"
                  />
                </div>

                <div>
                  <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Blog Content *
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    value={blogFormData.content}
                    onChange={handleBlogInputChange}
                    required
                    rows={12}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Write your blog content here... You can use markdown syntax."
                  />
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <Link
                      href="/blog"
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      View Blog Page →
                    </Link>
                    <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                      <Database className="w-4 h-4" />
                      <span>MongoDB</span>
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting || isUploadingImage}
                    className="bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors font-medium flex items-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader className="w-4 h-4 animate-spin" />
                        <span>{isUploadingImage ? 'Uploading Image...' : 'Publishing...'}</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        <span>Publish to Database</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Manage Posts Tab */}
        {activeTab === 'manage' && (
          <div>
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto mb-8">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search your posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {isLoading ? (
              <div className="text-center py-16">
                <Loader className="w-16 h-16 mx-auto text-blue-500 animate-spin mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Loading posts from database...
                </h3>
              </div>
            ) : blogPosts.length === 0 ? (
              <div className="text-center py-16">
                <Database className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No blog posts in database
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Create your first blog post to get started
                </p>
                <button
                  onClick={() => setActiveTab('create')}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Create First Post
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map((post) => (
                  <div
                    key={post._id}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700"
                  >
                    {post.image && (
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-xs font-medium">
                          {post.category}
                        </span>
                        {post.featured && (
                          <span className="bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 px-2 py-1 rounded text-xs font-medium">
                            Featured
                          </span>
                        )}
                      </div>
                      
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                        {post.title}
                      </h3>
                      
                      <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                        <div className="flex items-center space-x-1">
                          <User className="w-4 h-4" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{post.views}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-gray-400 dark:text-gray-500 mb-4">
                        <span>Created: {new Date(post.createdAt).toLocaleDateString()}</span>
                        <div className="flex items-center space-x-2">
                          {post.githubLink && (
                            <div className="flex items-center space-x-1 text-blue-500">
                              <Github className="w-3 h-3" />
                              <span>GitHub</span>
                            </div>
                          )}
                          <div className="flex items-center space-x-1">
                            <Database className="w-3 h-3" />
                            <span>MongoDB</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between">
                        {post.githubLink ? (
                          <a
                            href={post.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1"
                          >
                            <Github className="w-4 h-4" />
                            <span>View GitHub</span>
                          </a>
                        ) : (
                          <Link
                            href="/blog"
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                          >
                            View on Blog
                          </Link>
                        )}
                        <button
                          onClick={() => handleDeletePost(post._id)}
                          className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center space-x-1"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Content Library Tab */}
        {activeTab === 'library' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {contentItems.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className="relative overflow-hidden">
                  <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-16 h-16 filter invert opacity-80"
                    />
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                      <ExternalLink className="w-4 h-4" />
                      Preview
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium">
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
