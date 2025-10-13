import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET single statistic
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const statistic = await prisma.statistic.findUnique({
      where: { id },
    });

    if (!statistic) {
      return NextResponse.json({ error: 'Statistic not found' }, { status: 404 });
    }

    return NextResponse.json(statistic);
  } catch (error) {
    console.error('Failed to fetch statistic:', error);
    return NextResponse.json({ error: 'Failed to fetch statistic' }, { status: 500 });
  }
}

// PUT update statistic
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { label, value, icon, color, order, active } = body;

    const statistic = await prisma.statistic.update({
      where: { id },
      data: {
        label,
        value,
        icon,
        color,
        order,
        active,
      },
    });

    return NextResponse.json(statistic);
  } catch (error) {
    console.error('Failed to update statistic:', error);
    return NextResponse.json({ error: 'Failed to update statistic' }, { status: 500 });
  }
}

// DELETE statistic
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.statistic.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Statistic deleted successfully' });
  } catch (error) {
    console.error('Failed to delete statistic:', error);
    return NextResponse.json({ error: 'Failed to delete statistic' }, { status: 500 });
  }
}
