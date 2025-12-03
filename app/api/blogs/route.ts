import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    let query = {};
    if (category && category !== '') {
      query = { category };
    }

    const blogs = await Blog.find(query)
      .select('title slug excerpt category image date')
      .sort({ date: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      data: blogs,
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch blogs',
      },
      { status: 500 }
    );
  }
}
