import connectDB from '../lib/mongodb.js'
import BlogPost from '../models/BlogPost.js'

const samplePosts = [
  {
    title: "Getting Started with MongoDB and Next.js",
    excerpt: "Learn how to integrate MongoDB with your Next.js application for a powerful full-stack blog system.",
    content: `# Getting Started with MongoDB and Next.js

MongoDB is a powerful NoSQL database that pairs perfectly with Next.js for building modern web applications. In this guide, we'll walk through setting up a complete blog system with MongoDB integration.

## Why MongoDB?

- **Flexible Schema**: Perfect for content management systems
- **Scalable**: Grows with your application
- **JSON-like Documents**: Natural fit for JavaScript applications
- **Rich Querying**: Powerful search and filtering capabilities

## Setting Up the Connection

First, we need to establish a connection to MongoDB using Mongoose...

[Continue with detailed tutorial content]`,
    author: "John Developer",
    category: "Tutorial",
    tags: ["MongoDB", "Next.js", "Database", "Tutorial"],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop",
    readTime: "10 min read",
    featured: true,
    views: 245
  },
  {
    title: "Advanced React Patterns with TypeScript",
    excerpt: "Explore advanced React patterns using TypeScript for better code organization and type safety.",
    content: `# Advanced React Patterns with TypeScript

TypeScript brings powerful type safety to React applications. Let's explore some advanced patterns that will make your React code more maintainable and robust.

## Compound Components Pattern

The compound component pattern allows you to create flexible and reusable components...

## Render Props with TypeScript

Render props is a powerful pattern for sharing code between components...

[Continue with detailed content]`,
    author: "Sarah Tech",
    category: "React",
    tags: ["React", "TypeScript", "Patterns", "Advanced"],
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
    readTime: "15 min read",
    featured: false,
    views: 189
  },
  {
    title: "CSS Grid Layout Mastery",
    excerpt: "Master CSS Grid layout with practical examples and real-world use cases.",
    content: `# CSS Grid Layout Mastery

CSS Grid is one of the most powerful layout systems available in CSS. This comprehensive guide will take you from beginner to advanced Grid techniques.

## Grid Basics

CSS Grid Layout excels at dividing a page into major regions...

## Advanced Grid Techniques

Learn about auto-placement, grid areas, and responsive design...

[Continue with detailed content]`,
    author: "Alex Designer",
    category: "CSS",
    tags: ["CSS", "Grid", "Layout", "Design"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
    readTime: "8 min read",
    featured: false,
    views: 156
  }
]

async function seedDatabase() {
  try {
    await connectDB()
    
    // Clear existing posts
    await BlogPost.deleteMany({})
    console.log('Cleared existing blog posts')
    
    // Insert sample posts
    const createdPosts = await BlogPost.insertMany(samplePosts)
    console.log(`Seeded ${createdPosts.length} blog posts`)
    
    // Display created posts
    createdPosts.forEach(post => {
      console.log(`- ${post.title} (${post.category})`)
    })
    
    console.log('\nDatabase seeding completed successfully!')
    process.exit(0)
  } catch (error) {
    console.error('Error seeding database:', error)
    process.exit(1)
  }
}

seedDatabase()
