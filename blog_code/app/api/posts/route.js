import connectDB from '../../../lib/mongodb'
import BlogPost from '../../../models/BlogPost'

export const dynamic = 'force-static'

export async function GET(request) {
  try {
    await connectDB()
    
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const featured = searchParams.get('featured')
    
    let query = {}
    
    // Filter by category
    if (category && category !== 'all') {
      query.category = category
    }
    
    // Filter by featured status
    if (featured === 'true') {
      query.featured = true
    }
    
    // Search functionality
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
      ]
    }
    
    const blogPosts = await BlogPost.find(query)
      .sort({ createdAt: -1 })
      .lean()
    
    return Response.json({
      success: true,
      data: blogPosts,
      count: blogPosts.length
    })
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return Response.json(
      { success: false, error: 'Failed to fetch blog posts' },
      { status: 500 }
    )
  }
}

export async function POST(request) {
  try {
    await connectDB()
    
    const body = await request.json()
    
    // Validate required fields
    const { title, excerpt, content, author, category } = body
    
    if (!title || !excerpt || !content || !author || !category) {
      return Response.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    // Process tags
    let tags = []
    if (body.tags) {
      if (Array.isArray(body.tags)) {
        tags = body.tags
      } else if (typeof body.tags === 'string') {
        tags = body.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      }
    }
    
    // Create new blog post
    const blogPost = await BlogPost.create({
      ...body,
      tags,
      views: Math.floor(Math.random() * 1000) + 100, // Random initial views
    })
    
    return Response.json({
      success: true,
      data: blogPost,
      message: 'Blog post created successfully'
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating blog post:', error)
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message)
      return Response.json(
        { success: false, error: errors.join(', ') },
        { status: 400 }
      )
    }
    
    return Response.json(
      { success: false, error: 'Failed to create blog post' },
      { status: 500 }
    )
  }
}
