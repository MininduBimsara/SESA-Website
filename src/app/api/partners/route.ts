import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { writeFile } from 'fs/promises';
import path from 'path';

// GET all partners
export async function GET() {
  try {
    const partners = await prisma.partner.findMany({
      where: { active: true },
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    });
    return NextResponse.json(partners);
  } catch (error) {
    console.error('Failed to fetch partners:', error);
    return NextResponse.json({ error: 'Failed to fetch partners' }, { status: 500 });
  }
}

// POST new partner
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const website = formData.get('website') as string | null;
    const order = parseInt(formData.get('order') as string) || 0;
    const active = formData.get('active') === 'true';
    const logoFile = formData.get('logo') as File;

    if (!logoFile) {
      return NextResponse.json({ error: 'Logo is required' }, { status: 400 });
    }

    // Handle logo upload
    const bytes = await logoFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = `${Date.now()}-${logoFile.name}`;
    const filepath = path.join(process.cwd(), 'public/uploads/partners', filename);
    
    await writeFile(filepath, buffer);
    const logoPath = `/uploads/partners/${filename}`;

    const partner = await prisma.partner.create({
      data: {
        name,
        logo: logoPath,
        website,
        order,
        active: active !== undefined ? active : true,
      },
    });

    return NextResponse.json(partner, { status: 201 });
  } catch (error) {
    console.error('Failed to create partner:', error);
    return NextResponse.json({ error: 'Failed to create partner' }, { status: 500 });
  }
}
