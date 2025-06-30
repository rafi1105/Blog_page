import connectDB from '../../../../lib/mongodb'
import BlogPost from '../../../../models/BlogPost'
import mongoose from 'mongoose'

export async function GET(request, { params }) {
  try {
    await connectDB()
    
    const { id } = params
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return Response.json(
        { success: false, error: 'Invalid post ID' },
        { status: 400 }
      )
    }
    
    const blogPost = await BlogPost.findById(id)
    
    if (!blogPost) {
      return Response.json(
        { success: false, error: 'Blog post not found' },
        { status: 404 }
      )
    }
    
    // Increment view count
    await BlogPost.findByIdAndUpdate(id, { $inc: { views: 1 } })
    
    return Response.json({
      success: true,
      data: blogPost
    })
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return Response.json(
      { success: false, error: 'Failed to fetch blog post' },
      { status: 500 }
    )
  }
}

export async function PUT(request, { params }) {
  try {
    await connectDB()
    
    const { id } = params
    const body = await request.json()
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return Response.json(
        { success: false, error: 'Invalid post ID' },
        { status: 400 }
      )
    }
    
    // Process tags if provided
    if (body.tags && typeof body.tags === 'string') {
      body.tags = body.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    }
    
    const blogPost = await BlogPost.findByIdAndUpdate(
      id,
      { ...body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    )
    
    if (!blogPost) {
      return Response.json(
        { success: false, error: 'Blog post not found' },
        { status: 404 }
      )
    }
    
    return Response.json({
      success: true,
      data: blogPost,
      message: 'Blog post updated successfully'
    })
  } catch (error) {
    console.error('Error updating blog post:', error)
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message)
      return Response.json(
        { success: false, error: errors.join(', ') },
        { status: 400 }
      )
    }
    
    return Response.json(
      { success: false, error: 'Failed to update blog post' },
      { status: 500 }
    )
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB()
    
    const { id } = params
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return Response.json(
        { success: false, error: 'Invalid post ID' },
        { status: 400 }
      )
    }
    
    const blogPost = await BlogPost.findByIdAndDelete(id)
    
    if (!blogPost) {
      return Response.json(
        { success: false, error: 'Blog post not found' },
        { status: 404 }
      )
    }
    
    return Response.json({
      success: true,
      message: 'Blog post deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting blog post:', error)
    return Response.json(
      { success: false, error: 'Failed to delete blog post' },
      { status: 500 }
    )
  }
}
