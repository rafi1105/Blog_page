import mongoose from 'mongoose'

const BlogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for this blog post'],
    maxlength: [200, 'Title cannot be more than 200 characters'],
  },
  excerpt: {
    type: String,
    required: [true, 'Please provide an excerpt for this blog post'],
    maxlength: [500, 'Excerpt cannot be more than 500 characters'],
  },
  content: {
    type: String,
    required: [true, 'Please provide content for this blog post'],
  },
  author: {
    type: String,
    required: [true, 'Please provide an author name'],
    maxlength: [100, 'Author name cannot be more than 100 characters'],
  },
  category: {
    type: String,
    required: [true, 'Please select a category'],
    enum: ['React', 'Next.js', 'CSS', 'JavaScript', 'TypeScript', 'Node.js', 'Python', 'Design', 'Tutorial'],
  },
  tags: [{
    type: String,
    maxlength: [50, 'Tag cannot be more than 50 characters'],
  }],
  image: {
    type: String,
    default: '',
  },
  githubLink: {
    type: String,
    default: '',
    validate: {
      validator: function(v) {
        if (!v) return true; // Allow empty string
        return /^https:\/\/github\.com\//.test(v);
      },
      message: 'GitHub link must be a valid GitHub URL (https://github.com/...)'
    }
  },
  readTime: {
    type: String,
    default: '5 min read',
  },
  featured: {
    type: Boolean,
    default: false,
  },
  views: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

// Update the updatedAt field before saving
BlogPostSchema.pre('save', function(next) {
  this.updatedAt = Date.now()
  next()
})

// Create a virtual for formatted date
BlogPostSchema.virtual('formattedDate').get(function() {
  return this.createdAt.toLocaleDateString()
})

// Ensure virtual fields are serialized
BlogPostSchema.set('toJSON', { virtuals: true })

export default mongoose.models.BlogPost || mongoose.model('BlogPost', BlogPostSchema)
