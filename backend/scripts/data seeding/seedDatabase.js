const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const User = require('../../models/UserModel');
const Post = require('../../models/PostModel');

// MongoDB connection string - use the same as your application
const MONGODB_URI = process.env.MONGO_URL || 'mongodb://localhost:27017/blogmuse';

// Ensure we're using the same database name as the application (defaults to 'test' if not specified)
const DB_NAME = 'test';

// Function to generate random cover image URL
function generateCoverImage() {
    const imageSizes = [
        { width: 400, height: 300 }, // Landscape
        { width: 300, height: 400 }, // Portrait
        { width: 300, height: 300 }, // Square
        { width: 500, height: 300 }, // Wide landscape
        { width: 250, height: 400 }, // Tall portrait
        { width: 400, height: 400 }, // Large square
        { width: 600, height: 400 }, // Extra wide
        { width: 350, height: 500 }, // Extra tall
    ];
    
    const randomSize = imageSizes[Math.floor(Math.random() * imageSizes.length)];
    return `https://picsum.photos/${randomSize.width}/${randomSize.height}`;
}

// Function to validate JSON structure
function validateUserData(users) {
    const requiredFields = ['_id', 'username', 'email', 'name', 'password'];
    const errors = [];
    
    users.forEach((user, index) => {
        requiredFields.forEach(field => {
            if (!user[field]) {
                errors.push(`User ${index + 1}: Missing required field '${field}'`);
            }
        });
        
        if (user.email && !user.email.includes('@')) {
            errors.push(`User ${index + 1}: Invalid email format`);
        }
    });
    
    return errors;
}

function validatePostData(posts) {
    const requiredFields = ['_id', 'title', 'description', 'content', 'author'];
    const errors = [];
    
    posts.forEach((post, index) => {
        requiredFields.forEach(field => {
            if (!post[field]) {
                errors.push(`Post ${index + 1}: Missing required field '${field}'`);
            }
        });
        
        if (post.description && post.description.length > 50) {
            errors.push(`Post ${index + 1}: Description exceeds 50 character limit`);
        }
    });
    
    return errors;
}

// Function to clear existing data
async function clearDatabase() {
    try {
        console.log('🗑️  Clearing existing data...');
        await User.deleteMany({});
        await Post.deleteMany({});
        console.log('✅ Database cleared successfully');
    } catch (error) {
        console.error('❌ Error clearing database:', error.message);
        throw error;
    }
}

// Function to seed users
async function seedUsers(usersData) {
    try {
        console.log('👥 Seeding users...');
        
        // Add default profile and cover images for users and remove _id to let MongoDB generate ObjectIds
        const usersWithImages = usersData.map(user => {
            const { _id, ...userData } = user; // Remove _id field
            return {
                ...userData,
                profileImg: user.profileImg || 'https://picsum.photos/150/150',
                coverImg: user.coverImg || 'https://picsum.photos/800/200'
            };
        });
        
        const insertedUsers = await User.insertMany(usersWithImages);
        console.log(`✅ Successfully seeded ${insertedUsers.length} users`);
        return insertedUsers;
    } catch (error) {
        console.error('❌ Error seeding users:', error.message);
        throw error;
    }
}

// Function to seed posts
async function seedPosts(postsData, userMapping) {
    try {
        console.log('📝 Seeding posts...');
        
        // Add random cover images for posts and map author usernames to user IDs
        const postsWithImages = postsData.map(post => {
            const { _id, ...postData } = post; // Remove _id field
            
            // Find the user ID for the author username
            const authorUserId = userMapping[postData.author];
            if (!authorUserId) {
                console.warn(`⚠️  Warning: Author '${postData.author}' not found in users. Skipping post.`);
                return null;
            }
            
            return {
                ...postData,
                author: authorUserId, // Use the actual user ID instead of username
                cover: post.cover || generateCoverImage()
            };
        }).filter(post => post !== null); // Remove null posts
        
        const insertedPosts = await Post.insertMany(postsWithImages);
        console.log(`✅ Successfully seeded ${insertedPosts.length} posts`);
        return insertedPosts;
    } catch (error) {
        console.error('❌ Error seeding posts:', error.message);
        throw error;
    }
}

// Main seeding function
async function seedDatabase() {
    try {
        console.log('🌱 Starting database seeding process...');
        
        // Connect to MongoDB
        console.log('🔌 Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI, { dbName: DB_NAME });
        console.log(`✅ Connected to MongoDB successfully (Database: ${DB_NAME})`);
        
        // Read JSON files
        console.log('📖 Reading JSON files...');
        const usersPath = path.join(__dirname, 'data', 'users.json');
        const postsPath = path.join(__dirname, 'data', 'posts.json');
        
        const usersData = JSON.parse(fs.readFileSync(usersPath, 'utf8'));
        const postsData = JSON.parse(fs.readFileSync(postsPath, 'utf8'));
        
        console.log(`📊 Found ${usersData.length} users and ${postsData.length} posts`);
        
        // Validate data
        console.log('🔍 Validating data structure...');
        const userErrors = validateUserData(usersData);
        const postErrors = validatePostData(postsData);
        
        if (userErrors.length > 0) {
            console.error('❌ User data validation errors:');
            userErrors.forEach(error => console.error(`  - ${error}`));
            throw new Error('User data validation failed');
        }
        
        if (postErrors.length > 0) {
            console.error('❌ Post data validation errors:');
            postErrors.forEach(error => console.error(`  - ${error}`));
            throw new Error('Post data validation failed');
        }
        
        console.log('✅ Data validation passed');
        
        // Clear existing data
        await clearDatabase();
        
        // Seed users first (posts reference users)
        const users = await seedUsers(usersData);
        
        // Create mapping from original usernames to new user IDs
        const userMapping = {};
        usersData.forEach((originalUser, index) => {
            userMapping[originalUser.username] = users[index]._id.toString();
        });
        
        // Seed posts with user mapping
        const posts = await seedPosts(postsData, userMapping);
        
        console.log('🎉 Database seeding completed successfully!');
        console.log(`📈 Summary:`);
        console.log(`   - Users seeded: ${users.length}`);
        console.log(`   - Posts seeded: ${posts.length}`);
        console.log(`   - Cover images: Generated using Picsum API`);
        
    } catch (error) {
        console.error('💥 Seeding failed:', error.message);
        process.exit(1);
    } finally {
        // Close database connection
        await mongoose.connection.close();
        console.log('🔌 Database connection closed');
    }
}

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('💥 Uncaught Exception:', error.message);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('💥 Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});

// Run the seeding script
if (require.main === module) {
    seedDatabase();
}

module.exports = { seedDatabase, generateCoverImage, validateUserData, validatePostData };
