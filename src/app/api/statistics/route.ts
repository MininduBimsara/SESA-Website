import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET all statistics
export async function GET() {
  try {
    const statistics = await prisma.statistic.findMany({
      where: { active: true },
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    });
    return NextResponse.json(statistics);
  } catch (error) {
    console.error('Failed to fetch statistics:', error);
    return NextResponse.json({ error: 'Failed to fetch statistics' }, { status: 500 });
  }
}

// POST new statistic
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { label, value, icon, color, order, active } = body;

    const statistic = await prisma.statistic.create({
      data: {
        label,
        value,
        icon,
        color: color || 'rose',
        order: order || 0,
        active: active !== undefined ? active : true,
      },
    });

    return NextResponse.json(statistic, { status: 201 });
  } catch (error) {
    console.error('Failed to create statistic:', error);
    return NextResponse.json({ error: 'Failed to create statistic' }, { status: 500 });
  }
}
