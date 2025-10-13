import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST add member to team
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();
    const { id } = await params;

    const member = await prisma.member.create({
      data: {
        name: body.name,
        position: body.position,
        image: body.image || null,
        email: body.email || null,
        linkedin: body.linkedin || null,
        github: body.github || null,
        order: body.order || 0,
        teamId: id,
      },
    });

    return NextResponse.json(member, { status: 201 });
  } catch (error) {
    console.error("Error adding member:", error);
    return NextResponse.json(
      { error: "Failed to add member" },
      { status: 500 }
    );
  }
}

// PUT update multiple members (for reordering)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();
    const { members } = body;
    await params; // Await params to satisfy Next.js

    // Update each member's order
    await Promise.all(
      members.map((member: { id: string }, index: number) =>
        prisma.member.update({
          where: { id: member.id },
          data: { order: index },
        })
      )
    );

    return NextResponse.json({ message: "Members reordered successfully" });
  } catch (error) {
    console.error("Error reordering members:", error);
    return NextResponse.json(
      { error: "Failed to reorder members" },
      { status: 500 }
    );
  }
}
