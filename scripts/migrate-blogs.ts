// Migration script to populate MongoDB with existing blog data
// Run with: node --loader ts-node/esm scripts/migrate-blogs.ts
// Or add to package.json: "migrate:blogs": "tsx scripts/migrate-blogs.ts"

import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import Blog from "../models/Blog.js";

import { blogs } from "../data/demo/blogs";

const MONGODB_URI = process.env.MONGODB_URI!;
if (!MONGODB_URI) {
  console.error("❌ Error: MONGODB_URI environment variable is not defined");
  process.exit(1);
}

async function migrateBlogData() {
  try {
    await mongoose.connect(MONGODB_URI);

    // Clear existing blogs (optional - comment out if you want to keep existing data)
    const deleteResult = await Blog.deleteMany({});

    // Prepare blog data (remove id field, keep other fields)
    const blogData = blogs.map(({ id, ...blog }) => blog);

    // Insert blogs
    const insertedBlogs = await Blog.insertMany(blogData);

    await mongoose.disconnect();
  } catch (error) {
    await mongoose.disconnect();
    process.exit(1);
  }
}

// Run migration
migrateBlogData();
