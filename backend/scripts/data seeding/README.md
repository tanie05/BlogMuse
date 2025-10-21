# Database Seeding Script

This directory contains scripts to seed the BlogMuse database with sample data.

## Files

- `seedDatabase.js` - Main seeding script
- `users.json` - Sample user data
- `posts.json` - Sample post data
- `README.md` - This documentation

## Features

### Data Validation
- Validates JSON structure before seeding
- Checks required fields for users and posts
- Validates email format and description length limits
- Provides detailed error messages for validation failures

### Image Generation
- Automatically generates random cover images for posts using [Picsum Photos API](https://picsum.photos/)
- Creates varied image sizes (square, landscape, portrait)
- Adds default profile and cover images for users

### Database Operations
- Clears existing data before seeding
- Seeds users first (posts reference users)
- Provides detailed progress feedback
- Handles errors gracefully

## Usage

### Prerequisites
1. Make sure MongoDB is running
2. Ensure your database connection string is correct in the script or environment variables

### Running the Script

#### Option 1: Using npm script (Recommended)
```bash
cd backend
npm run seed
```

#### Option 2: Direct execution
```bash
cd backend
node "scripts/data seeding/seedDatabase.js"
```

### Environment Variables

You can set the MongoDB connection string using the `MONGODB_URI` environment variable:

```bash
MONGODB_URI=mongodb://localhost:27017/blogmuse npm run seed
```

If not set, it defaults to `mongodb://localhost:27017/blogmuse`.

## Data Structure

### Users
Each user includes:
- `_id`: Unique identifier
- `username`: Unique username
- `email`: Email address
- `name`: Display name
- `password`: Hashed password
- `profileImg`: Profile image URL (auto-generated if empty)
- `coverImg`: Cover image URL (auto-generated if empty)
- `savedPosts`: Array of saved post IDs
- `createdPosts`: Array of created post IDs
- `followers`: Array of follower user IDs
- `following`: Array of following user IDs

### Posts
Each post includes:
- `_id`: Unique identifier
- `title`: Post title
- `description`: Short description (max 50 characters)
- `content`: Full post content
- `cover`: Cover image URL (auto-generated if empty)
- `author`: Author username
- `numberOfSaved`: Number of times saved

## Image Generation

The script uses the Picsum Photos API to generate random images:

- **Posts**: Random sizes including square, landscape, and portrait formats
- **Users**: Default profile (150x150) and cover (800x200) images

### Example Image URLs Generated:
- `https://picsum.photos/400/300` (Landscape)
- `https://picsum.photos/300/300` (Square)
- `https://picsum.photos/300/400` (Portrait)

## Error Handling

The script includes comprehensive error handling:
- Database connection errors
- JSON parsing errors
- Data validation errors
- MongoDB operation errors
- Graceful cleanup on exit

## Output

The script provides detailed console output:
- Connection status
- Data validation results
- Seeding progress
- Success/failure messages
- Final summary with counts

## Troubleshooting

### Common Issues

1. **MongoDB Connection Failed**
   - Ensure MongoDB is running
   - Check connection string
   - Verify network connectivity

2. **JSON Parsing Errors**
   - Check JSON file syntax
   - Ensure files are in the correct location
   - Validate JSON structure

3. **Validation Errors**
   - Review error messages for specific field issues
   - Check required fields are present
   - Verify data types and constraints

4. **Permission Errors**
   - Ensure write permissions to database
   - Check file system permissions for JSON files

### Debug Mode

For additional debugging, you can modify the script to include more verbose logging or add console.log statements at specific points.

## Customization

### Adding New Data
1. Update the JSON files with new data
2. Ensure the data follows the required schema
3. Run the seeding script

### Modifying Image Generation
Edit the `generateCoverImage()` function in `seedDatabase.js` to:
- Change image sizes
- Use different image services
- Add custom image logic

### Database Schema Changes
If you modify the User or Post models, update the validation functions accordingly.

## Safety

⚠️ **Warning**: This script will **DELETE ALL EXISTING DATA** in the users and posts collections before seeding new data. Make sure to backup your database if you have important data.

## Support

If you encounter issues:
1. Check the console output for specific error messages
2. Verify your MongoDB connection
3. Ensure all dependencies are installed
4. Check file permissions and paths
