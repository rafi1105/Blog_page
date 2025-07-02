# MongoDB Setup Instructions

## Quick Setup Options

### Option 1: Local MongoDB (Recommended for Development)

1. **Install MongoDB locally:**
   - Download from: https://www.mongodb.com/try/download/community
   - Or use package manager:
     ```bash
     # On Windows (with Chocolatey)
     choco install mongodb

     # On macOS (with Homebrew)
     brew install mongodb/brew/mongodb-community

     # On Ubuntu/Debian
     sudo apt-get install mongodb
     ```

2. **Start MongoDB service:**
   ```bash
   # On Windows
   net start MongoDB

   # On macOS/Linux
   sudo systemctl start mongod
   # or
   brew services start mongodb/brew/mongodb-community
   ```

3. **Your connection string is already set in `.env.local`:**
   ```
   MONGODB_URI=mongodb://localhost:27017/nextjs-blog
   ```

### Option 2: MongoDB Atlas (Cloud - Free Tier)

1. **Create account:** https://cloud.mongodb.com/
2. **Create a free cluster**
3. **Get your connection string:**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
4. **Update `.env.local`:**
   ```
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/nextjs-blog?retryWrites=true&w=majority
   ```

## Database Schema

The system automatically creates the following collection:

### BlogPost Collection
```javascript
{
  _id: ObjectId,
  title: String (required, max 200 chars),
  excerpt: String (required, max 500 chars),
  content: String (required),
  author: String (required, max 100 chars),
  category: String (required, enum values),
  tags: [String],
  image: String (URL),
  readTime: String,
  featured: Boolean,
  views: Number,
  createdAt: Date,
  updatedAt: Date
}
```

## Testing the Connection

1. **Start your Next.js app:**
   ```bash
   npm run dev
   ```

2. **Check the connection:**
   - Go to http://localhost:3000/content
   - Try creating a blog post
   - Check http://localhost:3000/blog to see your post

## API Endpoints

- `GET /api/posts` - Get all posts (with filtering)
- `POST /api/posts` - Create new post
- `GET /api/posts/[id]` - Get single post (increments views)
- `PUT /api/posts/[id]` - Update post
- `DELETE /api/posts/[id]` - Delete post

## Environment Variables

Make sure your `.env.local` file contains:

```env
MONGODB_URI=mongodb://localhost:27017/nextjs-blog
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000
```

## Troubleshooting

### Connection Issues
- Make sure MongoDB is running
- Check firewall settings
- Verify connection string format

### Permission Issues
- For MongoDB Atlas: Check IP whitelist
- For local MongoDB: Check user permissions

### Data Issues
- Posts not appearing: Check browser console for API errors
- Form submission fails: Check required fields validation

## Production Deployment

For production, consider:
1. Use MongoDB Atlas or dedicated MongoDB server
2. Set up proper indexes for better performance
3. Add authentication and authorization
4. Implement rate limiting
5. Add data validation middleware
