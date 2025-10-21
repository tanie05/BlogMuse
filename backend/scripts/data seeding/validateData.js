const fs = require('fs');
const path = require('path');

// Import validation functions from the main seeding script
const { validateUserData, validatePostData } = require('./seedDatabase');

// Function to validate JSON files
function validateJsonFiles() {
    try {
        console.log('🔍 Validating JSON data files...');
        
        // Read JSON files
        const usersPath = path.join(__dirname, 'data', 'users.json');
        const postsPath = path.join(__dirname, 'data', 'posts.json');
        
        console.log('📖 Reading users.json...');
        const usersData = JSON.parse(fs.readFileSync(usersPath, 'utf8'));
        console.log(`✅ Successfully parsed ${usersData.length} users`);
        
        console.log('📖 Reading posts.json...');
        const postsData = JSON.parse(fs.readFileSync(postsPath, 'utf8'));
        console.log(`✅ Successfully parsed ${postsData.length} posts`);
        
        // Validate user data
        console.log('🔍 Validating user data...');
        const userErrors = validateUserData(usersData);
        if (userErrors.length > 0) {
            console.error('❌ User data validation errors:');
            userErrors.forEach(error => console.error(`  - ${error}`));
        } else {
            console.log('✅ User data validation passed');
        }
        
        // Validate post data
        console.log('🔍 Validating post data...');
        const postErrors = validatePostData(postsData);
        if (postErrors.length > 0) {
            console.error('❌ Post data validation errors:');
            postErrors.forEach(error => console.error(`  - ${error}`));
        } else {
            console.log('✅ Post data validation passed');
        }
        
        // Summary
        console.log('\n📊 Validation Summary:');
        console.log(`   - Users: ${usersData.length} (${userErrors.length} errors)`);
        console.log(`   - Posts: ${postsData.length} (${postErrors.length} errors)`);
        
        if (userErrors.length === 0 && postErrors.length === 0) {
            console.log('🎉 All data validation passed! Ready for seeding.');
            return true;
        } else {
            console.log('⚠️  Data validation failed. Please fix errors before seeding.');
            return false;
        }
        
    } catch (error) {
        console.error('💥 Validation failed:', error.message);
        return false;
    }
}

// Run validation if this script is executed directly
if (require.main === module) {
    const isValid = validateJsonFiles();
    process.exit(isValid ? 0 : 1);
}

module.exports = { validateJsonFiles };
