# 📚 Complete Next.js Blog Project Documentation

## 🏗️ Project Overview

This is a full-stack blog application built with Next.js 15, MongoDB, and modern web technologies. It features content management, image upload, GitHub integration, and real-time data persistence.

---

## 📁 Complete File Structure

```
blog_code/
├── 📁 app/                           # Next.js App Router directory
│   ├── 📄 favicon.ico               # Site favicon
│   ├── 📄 globals.css               # Global styles and Tailwind config
│   ├── 📄 layout.js                 # Root layout component
│   ├── 📄 page.jsx                  # Home page component
│   │
│   ├── 📁 about/                    # About page route
│   │   └── 📄 page.js               # About page component
│   │
│   ├── 📁 api/                      # API routes directory
│   │   ├── 📁 posts/                # Blog posts API
│   │   │   ├── 📄 route.js          # GET/POST posts endpoint
│   │   │   └── 📁 [id]/             # Dynamic post routes
│   │   │       └── 📄 route.js      # GET/PUT/DELETE single post
│   │   └── 📁 upload/               # Image upload API
│   │       └── 📄 route.js          # POST image upload endpoint
│   │
│   ├── 📁 blog/                     # Blog page route
│   │   └── 📄 page.js               # Blog listing page
│   │
│   ├── 📁 contact/                  # Contact page route
│   │   └── 📄 page.js               # Contact form page
│   │
│   └── 📁 content/                  # Content management route
│       └── 📄 page.js               # Blog creation/management page
│
├── 📁 components/                    # Reusable components
│   ├── 📄 Blog.js                   # Blog showcase component
│   ├── 📄 navbar.jsx                # Navigation component
│   └── 📁 ui/                       # UI components
│       └── 📄 table.jsx             # Table component
│
├── 📁 lib/                          # Utility libraries
│   ├── 📄 mongodb.js                # MongoDB connection utility
│   └── 📄 utils.js                  # General utility functions
│
├── 📁 models/                       # Database models
│   └── 📄 BlogPost.js               # MongoDB blog post schema
│
├── 📁 public/                       # Static assets
│   ├── 📄 file.svg                  # File icon
│   ├── 📄 globe.svg                 # Globe icon
│   ├── 📄 next.svg                  # Next.js logo
│   ├── 📄 programming.png           # Programming favicon
│   ├── 📄 vercel.svg                # Vercel logo
│   ├── 📄 window.svg                # Window icon
│   └── 📁 uploads/                  # Uploaded images directory
│       └── 📄 .gitkeep              # Git tracking file
│
├── 📁 scripts/                      # Utility scripts
│   └── 📄 seed-database.js          # Database seeding script
│
├── 📄 .env.local                    # Environment variables
├── 📄 .gitignore                    # Git ignore rules
├── 📄 Animation-1751031313621.json  # Lottie animation data
├── 📄 components.json               # shadcn/ui configuration
├── 📄 eslint.config.mjs             # ESLint configuration
├── 📄 jsconfig.json                 # JavaScript configuration
├── 📄 MONGODB_SETUP.md              # MongoDB setup guide
├── 📄 next.config.mjs               # Next.js configuration
├── 📄 package.json                  # Dependencies and scripts
├── 📄 postcss.config.mjs            # PostCSS configuration
├── 📄 README.md                     # Main documentation
├── 📄 tailwind.config.js            # Tailwind CSS configuration
└── 📄 updateReadme.md               # This comprehensive documentation
```

---

## 🛣️ Routing Structure

### App Router (Next.js 15)

| Route | File Path | Component | Description |
|-------|-----------|-----------|-------------|
| `/` | `app/page.jsx` | HomePage | Landing page with hero, features |
| `/about` | `app/about/page.js` | AboutPage | About us, skills, timeline |
| `/blog` | `app/blog/page.js` | BlogPage | Blog listing, search, filter |
| `/contact` | `app/contact/page.js` | ContactPage | Contact form, info, FAQ |
| `/content` | `app/content/page.js` | ContentPage | Blog creation/management |

### API Routes

| Endpoint | File Path | Methods | Description |
|----------|-----------|---------|-------------|
| `/api/posts` | `app/api/posts/route.js` | GET, POST | Get all posts, create post |
| `/api/posts/[id]` | `app/api/posts/[id]/route.js` | GET, PUT, DELETE | Single post operations |
| `/api/upload` | `app/api/upload/route.js` | POST, GET | Image upload handling |

---

## 📦 Dependencies & Imports

### Package.json Dependencies

```json
{
  "name": "blog_code",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "seed": "node scripts/seed-database.js"
  },
  "dependencies": {
    "@radix-ui/react-slot": "^1.2.3",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "lottie-react": "^2.4.1",
    "lucide-react": "^0.523.0",
    "mongodb": "^6.17.0",
    "mongoose": "^8.16.1",
    "multer": "^2.0.1",
    "next": "15.3.4",
    "next-themes": "^0.4.6",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "sharp": "^0.34.2",
    "tailwind-merge": "^3.3.1"
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3",
    "@tailwindcss/postcss": "^4",
    "eslint": "^9",
    "eslint-config-next": "15.3.4",
    "tailwindcss": "^4",
    "tw-animate-css": "^1.3.4"
  }
}
```

### Import Structure by File

#### 🏠 `app/page.jsx` (Home Page)
```javascript
import React from 'react'
import Link from 'next/link'
import Lottie from "lottie-react"
import animationData from "../Animation-1751031313621.json"
```

#### 📝 `app/blog/page.js` (Blog Page)
```javascript
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Calendar, Clock, User, Code, Star, GitBranch, Eye, Search, Filter, Github } from 'lucide-react'
```

#### ✍️ `app/content/page.js` (Content Management)
```javascript
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  BookOpen, Video, FileText, Download, ExternalLink, Filter, Search,
  Plus, Edit, Trash2, Eye, Calendar, User, Tag, Image as ImageIcon,
  Save, CheckCircle, AlertCircle, Database, Loader, Upload, Github
} from 'lucide-react'
```

#### 📞 `app/contact/page.js` (Contact Page)
```javascript
import React, { useState } from 'react'
import Link from 'next/link'
import { 
  Mail, Phone, MapPin, Clock, Send, User, MessageSquare,
  Github, Twitter, Linkedin, Calendar, CheckCircle, AlertCircle
} from 'lucide-react'
```

#### 🧭 `components/navbar.jsx` (Navigation)
```javascript
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from './ui/button'
import { Moon, Sun, Menu, X } from "lucide-react"
```

#### 🗄️ `models/BlogPost.js` (Database Model)
```javascript
import mongoose from 'mongoose'
```

#### 🔌 `lib/mongodb.js` (Database Connection)
```javascript
import mongoose from 'mongoose'
```

#### 🔄 `app/api/posts/route.js` (Posts API)
```javascript
import connectDB from '../../../lib/mongodb'
import BlogPost from '../../../models/BlogPost'
```

#### 📤 `app/api/upload/route.js` (Upload API)
```javascript
import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'
```

---

## 🎨 Styling & UI Framework

### Tailwind CSS Configuration
```javascript
// tailwind.config.js
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Custom color palette
        primary: { /* color definitions */ },
        secondary: { /* color definitions */ },
      },
      animation: {
        // Custom animations
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
}
```

### Global Styles (`app/globals.css`)
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom utility classes for colored shadows */
.shadow-blue { /* blue shadow styles */ }
.shadow-purple { /* purple shadow styles */ }
.shadow-green { /* green shadow styles */ }

/* Dark mode styles */
.dark { /* dark mode overrides */ }
```

---

## 🗄️ Database Schema & Models

### BlogPost Model (`models/BlogPost.js`)
```javascript
const BlogPostSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 200 },
  excerpt: { type: String, required: true, maxlength: 500 },
  content: { type: String, required: true },
  author: { type: String, required: true, maxlength: 100 },
  category: { 
    type: String, 
    required: true,
    enum: ['React', 'Next.js', 'CSS', 'JavaScript', 'TypeScript', 'Node.js', 'Python', 'Design', 'Tutorial']
  },
  tags: [{ type: String, maxlength: 50 }],
  image: { type: String, default: '' },
  githubLink: { 
    type: String, 
    default: '',
    validate: {
      validator: function(v) {
        if (!v) return true;
        return /^https:\/\/github\.com\//.test(v);
      }
    }
  },
  readTime: { type: String, default: '5 min read' },
  featured: { type: Boolean, default: false },
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})
```

---

## 🔧 Configuration Files

### Next.js Configuration (`next.config.mjs`)
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['localhost', 'images.unsplash.com'],
  },
}

export default nextConfig
```

### Environment Variables (`.env.local`)
```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/nextjs-blog

# Next.js Configuration
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000
```

### ESLint Configuration (`eslint.config.mjs`)
```javascript
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals"),
];

export default eslintConfig;
```

---

## 🚀 Scripts & Commands

### Package.json Scripts
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "seed": "node scripts/seed-database.js"
  }
}
```

### Development Commands
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Lint code
npm run lint

# Seed database with sample data
npm run seed
```

---

## 🎯 Key Features Implementation

### 1. MongoDB Integration
- **Connection**: Cached connection with connection pooling
- **Models**: Mongoose schemas with validation
- **CRUD Operations**: Full create, read, update, delete via API

### 2. Image Upload System
- **File Handling**: Multer for file processing
- **Storage**: Local storage in `/public/uploads/`
- **Validation**: File type and size validation
- **Preview**: Real-time image preview before upload

### 3. GitHub Integration
- **Link Storage**: GitHub URL field in database
- **Validation**: URL format validation
- **UI Logic**: Smart button rendering based on GitHub link presence
- **External Links**: Opens GitHub repositories in new tabs

### 4. Content Management
- **Create**: Rich form with validation
- **Read**: Blog listing with search and filter
- **Update**: Form pre-population for editing
- **Delete**: Confirmation-based deletion

### 5. Responsive Design
- **Mobile-First**: Tailwind CSS mobile-first approach
- **Dark Mode**: System and manual dark mode toggle
- **Accessibility**: ARIA labels and semantic HTML

---

## 🔄 Data Flow Architecture

```
Frontend (React/Next.js)
    ↓
API Routes (/api/*)
    ↓
MongoDB Connection (lib/mongodb.js)
    ↓
Mongoose Models (models/*)
    ↓
MongoDB Database
```

### Request Flow Example:
1. **User submits blog form** → `app/content/page.js`
2. **Form data processed** → Image upload if file present
3. **API call made** → `POST /api/posts`
4. **Server validation** → Mongoose schema validation
5. **Database operation** → MongoDB insert
6. **Response sent** → Success/error status
7. **UI update** → Form reset, success message
8. **Data refresh** → Re-fetch posts list

---

## 🛡️ Security & Validation

### Input Validation
- **Client-side**: Form validation with React
- **Server-side**: Mongoose schema validation
- **File uploads**: Type and size restrictions
- **URL validation**: GitHub link format checking

### Security Measures
- **File upload limits**: 5MB maximum file size
- **Allowed file types**: JPEG, PNG, GIF, WebP only
- **Path sanitization**: Secure file naming
- **Environment variables**: Sensitive data protection

---

## 🛠️ API Documentation

### Posts API Endpoints

#### GET `/api/posts`
**Description**: Retrieve all blog posts with optional filtering
**Query Parameters**:
- `category`: Filter by post category
- `search`: Search in title, excerpt, and content
- `featured`: Filter featured posts only
- `author`: Filter by author name

**Response**:
```json
{
  "success": true,
  "posts": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Getting Started with Next.js",
      "excerpt": "Learn the basics of Next.js framework",
      "content": "Full article content...",
      "author": "John Doe",
      "category": "Next.js",
      "tags": ["nextjs", "react", "tutorial"],
      "image": "/uploads/nextjs-guide.jpg",
      "githubLink": "https://github.com/username/nextjs-project",
      "readTime": "5 min read",
      "featured": false,
      "views": 150,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

#### POST `/api/posts`
**Description**: Create a new blog post
**Request Body**:
```json
{
  "title": "New Blog Post",
  "excerpt": "Brief description",
  "content": "Full content",
  "author": "Author Name",
  "category": "React",
  "tags": ["react", "tutorial"],
  "image": "/uploads/image.jpg",
  "githubLink": "https://github.com/user/repo",
  "readTime": "5 min read",
  "featured": false
}
```

#### GET `/api/posts/[id]`
**Description**: Retrieve a specific blog post by ID
**Parameters**: `id` - MongoDB ObjectId

#### PUT `/api/posts/[id]`
**Description**: Update an existing blog post
**Parameters**: `id` - MongoDB ObjectId
**Request Body**: Same as POST request

#### DELETE `/api/posts/[id]`
**Description**: Delete a blog post
**Parameters**: `id` - MongoDB ObjectId

### Upload API Endpoints

#### POST `/api/upload`
**Description**: Upload an image file
**Content-Type**: `multipart/form-data`
**Form Data**: `image` - Image file (JPEG, PNG, GIF, WebP)
**File Size Limit**: 5MB

**Response**:
```json
{
  "success": true,
  "imagePath": "/uploads/unique-filename.jpg"
}
```

#### GET `/api/upload`
**Description**: List all uploaded images
**Response**:
```json
{
  "success": true,
  "images": [
    "/uploads/image1.jpg",
    "/uploads/image2.png"
  ]
}
```

---

## 🔗 Component Relationships

### Component Hierarchy
```
app/layout.js (Root Layout)
├── components/Navbar.jsx
│   ├── components/ui/button.jsx
│   └── ThemeToggle (built-in)
│
├── app/page.jsx (Home)
│   └── Lottie Animation
│
├── app/blog/page.js (Blog Listing)
│   ├── Search Component (inline)
│   ├── Filter Component (inline)
│   └── BlogCard Component (inline)
│
├── app/content/page.js (Content Management)
│   ├── CreatePost Form (inline)
│   ├── ManagePosts Table (inline)
│   └── components/ui/table.jsx
│
├── app/contact/page.js (Contact)
│   └── ContactForm (inline)
│
└── app/about/page.js (About)
    └── Static Content
```

### State Management Flow
```
Blog Creation Flow:
User Input → Form State → Validation → API Call → Database → UI Update

Blog Display Flow:
Page Load → API Fetch → State Update → Component Render → User Interaction

Image Upload Flow:
File Select → Preview → Validation → Upload API → Server Storage → Database Update
```

---

## 🎨 Design Patterns & Best Practices

### React Patterns Used
1. **Functional Components**: All components use React hooks
2. **Custom Hooks**: useState, useEffect for state management
3. **Conditional Rendering**: Dynamic UI based on state
4. **Event Handling**: Form submissions, user interactions
5. **Error Boundaries**: Error handling in components

### Next.js Patterns
1. **App Router**: File-based routing system
2. **Server Components**: Default server-side rendering
3. **Client Components**: 'use client' for interactivity
4. **API Routes**: RESTful API endpoints
5. **Dynamic Routing**: [id] parameter routes

### Database Patterns
1. **Schema Validation**: Mongoose schema with validators
2. **Error Handling**: Try-catch blocks with proper error messages
3. **Connection Pooling**: Cached database connections
4. **Data Sanitization**: Input validation and sanitization

---

## 🔒 Error Handling Strategy

### Client-Side Error Handling
```javascript
// Form validation example
const validateForm = () => {
  const errors = {}
  if (!title.trim()) errors.title = 'Title is required'
  if (!excerpt.trim()) errors.excerpt = 'Excerpt is required'
  if (!content.trim()) errors.content = 'Content is required'
  if (!author.trim()) errors.author = 'Author is required'
  if (!category) errors.category = 'Category is required'
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

// API call error handling
try {
  const response = await fetch('/api/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  })
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  
  const result = await response.json()
  if (result.success) {
    // Handle success
  } else {
    throw new Error(result.error || 'Failed to create post')
  }
} catch (error) {
  console.error('Error creating post:', error)
  setNotification({
    type: 'error',
    message: error.message || 'Failed to create post'
  })
}
```

### Server-Side Error Handling
```javascript
// API route error handling example
export async function POST(request) {
  try {
    await connectDB()
    
    const body = await request.json()
    
    // Validate required fields
    if (!body.title || !body.content || !body.author) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    const post = await BlogPost.create(body)
    
    return NextResponse.json(
      { success: true, post },
      { status: 201 }
    )
    
  } catch (error) {
    console.error('Error creating post:', error)
    
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

---

## 📊 Performance Metrics & Optimization

### Core Web Vitals Targets
- **First Contentful Paint (FCP)**: < 1.8s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **First Input Delay (FID)**: < 100ms
- **Cumulative Layout Shift (CLS)**: < 0.1

### Optimization Techniques Implemented
1. **Image Optimization**: Next.js Image component with lazy loading
2. **Code Splitting**: Automatic route-based code splitting
3. **Tree Shaking**: Unused code elimination
4. **CSS Optimization**: Tailwind CSS purging unused styles
5. **Database Optimization**: Indexed queries and connection pooling

### Bundle Analysis
```bash
# Analyze bundle size
npm run build
npm run start

# Use Next.js bundle analyzer
npm install --save-dev @next/bundle-analyzer
```

---

## 🧩 Custom Utility Functions

### File Utilities (`lib/utils.js`)
```javascript
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Tailwind class merging utility
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// Format date utility
export function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Truncate text utility
export function truncateText(text, maxLength = 100) {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + '...'
}

// Generate slug from title
export function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
```

### Database Utilities (`lib/mongodb.js`)
```javascript
import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable')
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}

export default connectDB
```

---

## 🚀 Deployment & Production Setup

### Vercel Deployment (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel

# Environment variables setup in Vercel dashboard:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
```

### Docker Deployment
```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

```yaml
# docker-compose.yml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - MONGODB_URI=mongodb://mongo:27017/nextjs-blog
    depends_on:
      - mongo
  
  mongo:
    image: mongo:5
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:
```

### Traditional Server Deployment
```bash
# Build the application
npm run build

# Start with PM2 (process manager)
npm install -g pm2
pm2 start npm --name "blog-app" -- start

# Or use systemd service
sudo systemctl enable blog-app
sudo systemctl start blog-app
```

---

## 🔍 SEO & Meta Tags Implementation

### Dynamic Meta Tags (Future Enhancement)
```javascript
// app/blog/[slug]/page.js (future individual post pages)
import { Metadata } from 'next'

export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await getPost(params.slug)
  
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
      type: 'article',
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  }
}
```

### Structured Data (JSON-LD)
```javascript
// components/StructuredData.jsx
export default function StructuredData({ post }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.image,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "datePublished": post.createdAt,
    "dateModified": post.updatedAt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://yourdomain.com/blog/${post.slug}`
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
```

---

## 🔧 Environment Configuration

### Required Environment Variables
```bash
# .env.local
MONGODB_URI=mongodb://localhost:27017/nextjs-blog
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# Optional for production
NODE_ENV=production
UPLOAD_DIR=/public/uploads
MAX_FILE_SIZE=5242880  # 5MB in bytes
```

### Development vs Production Config
```javascript
// lib/config.js
const config = {
  development: {
    MONGODB_URI: 'mongodb://localhost:27017/nextjs-blog-dev',
    UPLOAD_DIR: './public/uploads',
    MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  },
  production: {
    MONGODB_URI: process.env.MONGODB_URI,
    UPLOAD_DIR: './public/uploads',
    MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  }
}

export default config[process.env.NODE_ENV || 'development']
```

---

## 🧪 Testing Guidelines

### Manual Testing Checklist
#### Blog Creation
- [ ] Create post with all fields
- [ ] Create post with image upload
- [ ] Create post with GitHub link
- [ ] Validate required fields
- [ ] Test character limits

#### Blog Management
- [ ] Edit existing post
- [ ] Delete post with confirmation
- [ ] Filter posts by category
- [ ] Search posts by keyword
- [ ] Toggle featured status

#### Image Upload
- [ ] Upload valid image formats
- [ ] Test file size limits
- [ ] Verify image preview
- [ ] Check stored file path

#### User Interface
- [ ] Responsive design on mobile
- [ ] Dark mode toggle
- [ ] Navigation functionality
- [ ] Loading states
- [ ] Error messages

### Automated Testing Setup (Future)
```javascript
// __tests__/api/posts.test.js
import { createMocks } from 'node-mocks-http'
import handler from '../../pages/api/posts'

describe('/api/posts', () => {
  test('creates a new post', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        title: 'Test Post',
        content: 'Test content',
        author: 'Test Author',
        category: 'React'
      }
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(201)
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        success: true,
        post: expect.any(Object)
      })
    )
  })
})
```

---

## 🔄 Migration & Backup Strategies

### Database Backup
```bash
# MongoDB backup
mongodump --uri="mongodb://localhost:27017/nextjs-blog" --out="./backups/$(date +%Y%m%d)"

# Restore from backup
mongorestore --uri="mongodb://localhost:27017/nextjs-blog" ./backups/20240101/nextjs-blog
```

### Data Migration Scripts
```javascript
// scripts/migrate-data.js
import connectDB from '../lib/mongodb.js'
import BlogPost from '../models/BlogPost.js'

async function migrateData() {
  await connectDB()
  
  // Example: Add new field to existing posts
  await BlogPost.updateMany(
    { githubLink: { $exists: false } },
    { $set: { githubLink: '' } }
  )
  
  console.log('Migration completed')
  process.exit(0)
}

migrateData().catch(console.error)
```

---

## 📈 Analytics & Monitoring

### Performance Monitoring
```javascript
// lib/analytics.js
export function trackPageView(url) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'GA_TRACKING_ID', {
      page_path: url,
    })
  }
}

export function trackEvent(action, category, label) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
    })
  }
}
```

### Error Tracking (Future)
```javascript
// lib/sentry.js
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
})

export default Sentry
```

---

## 🔐 Security Best Practices

### Input Validation
```javascript
// utils/validation.js
export function sanitizeInput(input) {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
}

export function validateGitHubUrl(url) {
  const githubRegex = /^https:\/\/github\.com\/[a-zA-Z0-9-_]+\/[a-zA-Z0-9-_\.]+$/
  return githubRegex.test(url)
}
```

### File Upload Security
```javascript
// utils/fileValidation.js
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
const MAX_SIZE = 5 * 1024 * 1024 // 5MB

export function validateFile(file) {
  if (!ALLOWED_TYPES.includes(file.mimetype)) {
    throw new Error('Invalid file type')
  }
  
  if (file.size > MAX_SIZE) {
    throw new Error('File too large')
  }
  
  return true
}
```

---

**Last Updated**: January 2025
**Version**: 2.1.0
**Next.js Version**: 15.3.4
**Node.js Requirement**: 18.0.0+
