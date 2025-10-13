import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { writeFile } from 'fs/promises';
import path from 'path';

// GET all testimonials
export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    });
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error('Failed to fetch testimonials:', error);
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 });
  }
}

// POST new testimonial
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const role = formData.get('role') as string;
    const quote = formData.get('quote') as string;
    const featured = formData.get('featured') === 'true';
    const order = parseInt(formData.get('order') as string) || 0;
    const imageFile = formData.get('image') as File | null;

    let imagePath = null;

    // Handle image upload
    if (imageFile) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const filename = `${Date.now()}-${imageFile.name}`;
      const filepath = path.join(process.cwd(), 'public/uploads/testimonials', filename);
      
      await writeFile(filepath, buffer);
      imagePath = `/uploads/testimonials/${filename}`;
    }

    const testimonial = await prisma.testimonial.create({
      data: {
        name,
        role,
        quote,
        image: imagePath,
        featured,
        order,
      },
    });

    return NextResponse.json(testimonial, { status: 201 });
  } catch (error) {
    console.error('Failed to create testimonial:', error);
    return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 });
  }
}
