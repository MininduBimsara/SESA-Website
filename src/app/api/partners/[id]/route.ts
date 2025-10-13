import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { writeFile, unlink } from 'fs/promises';
import path from 'path';

// GET single partner
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const partner = await prisma.partner.findUnique({
      where: { id },
    });

    if (!partner) {
      return NextResponse.json({ error: 'Partner not found' }, { status: 404 });
    }

    return NextResponse.json(partner);
  } catch (error) {
    console.error('Failed to fetch partner:', error);
    return NextResponse.json({ error: 'Failed to fetch partner' }, { status: 500 });
  }
}

// PUT update partner
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const formData = await request.formData();
    
    const name = formData.get('name') as string;
    const website = formData.get('website') as string | null;
    const order = parseInt(formData.get('order') as string) || 0;
    const active = formData.get('active') === 'true';
    const logoFile = formData.get('logo') as File | null;

    const existingPartner = await prisma.partner.findUnique({
      where: { id },
    });

    if (!existingPartner) {
      return NextResponse.json({ error: 'Partner not found' }, { status: 404 });
    }

    let logoPath = existingPartner.logo;

    // Handle new logo upload
    if (logoFile && logoFile.size > 0) {
      // Delete old logo
      if (existingPartner.logo) {
        try {
          const oldLogoPath = path.join(process.cwd(), 'public', existingPartner.logo);
          await unlink(oldLogoPath);
        } catch (error) {
          console.error('Failed to delete old logo:', error);
        }
      }

      const bytes = await logoFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `${Date.now()}-${logoFile.name}`;
      const filepath = path.join(process.cwd(), 'public/uploads/partners', filename);
      
      await writeFile(filepath, buffer);
      logoPath = `/uploads/partners/${filename}`;
    }

    const partner = await prisma.partner.update({
      where: { id },
      data: {
        name,
        logo: logoPath,
        website,
        order,
        active,
      },
    });

    return NextResponse.json(partner);
  } catch (error) {
    console.error('Failed to update partner:', error);
    return NextResponse.json({ error: 'Failed to update partner' }, { status: 500 });
  }
}

// DELETE partner
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const partner = await prisma.partner.findUnique({
      where: { id },
    });

    if (!partner) {
      return NextResponse.json({ error: 'Partner not found' }, { status: 404 });
    }

    // Delete logo file
    if (partner.logo) {
      try {
        const logoPath = path.join(process.cwd(), 'public', partner.logo);
        await unlink(logoPath);
      } catch (error) {
        console.error('Failed to delete logo file:', error);
      }
    }

    await prisma.partner.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Partner deleted successfully' });
  } catch (error) {
    console.error('Failed to delete partner:', error);
    return NextResponse.json({ error: 'Failed to delete partner' }, { status: 500 });
  }
}
