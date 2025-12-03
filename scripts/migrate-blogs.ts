// Migration script to populate MongoDB with existing blog data
// Run with: node --loader ts-node/esm scripts/migrate-blogs.ts
// Or add to package.json: "migrate:blogs": "tsx scripts/migrate-blogs.ts"

import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import Blog from '../models/Blog.js';

import { blogs } from '../data/demo/blogs';

const MONGODB_URI = process.env.MONGODB_URI!;
console.log({FromMigratePage: MONGODB_URI})
if (!MONGODB_URI) {
  console.error('❌ Error: MONGODB_URI environment variable is not defined');
  console.log('Please create a .env.local file with your MongoDB connection string');
  process.exit(1);
}

async function migrateBlogData() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing blogs (optional - comment out if you want to keep existing data)
    console.log('🗑️  Clearing existing blogs...');
    const deleteResult = await Blog.deleteMany({});
    console.log(`✅ Deleted ${deleteResult.deletedCount} existing blogs`);

    // Prepare blog data (remove id field, keep other fields)
    const blogData = blogs.map(({ id, ...blog }) => blog);

    // Insert blogs
    console.log('📝 Inserting blog data...');
    const insertedBlogs = await Blog.insertMany(blogData);
    console.log(`✅ Successfully migrated ${insertedBlogs.length} blogs to MongoDB`);

    // Display inserted blogs
    console.log('\n📚 Inserted blogs:');
    insertedBlogs.forEach((blog, index) => {
      console.log(`  ${index + 1}. ${blog.title} (slug: ${blog.slug})`);
    });

    await mongoose.disconnect();
    console.log('\n✅ Migration completed successfully!');
    console.log('🔌 Disconnected from MongoDB');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

// Run migration
migrateBlogData();
