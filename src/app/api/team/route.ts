import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all teams with their members
export async function GET() {
  try {
    const teams = await prisma.team.findMany({
      include: {
        members: {
          orderBy: {
            order: 'asc',
          },
        },
      },
      orderBy: {
        year: "desc",
      },
    });
    return NextResponse.json(teams);
  } catch (error) {
    console.error("Error fetching teams:", error);
    return NextResponse.json(
      { error: "Failed to fetch teams" },
      { status: 500 }
    );
  }
}

// POST create new team
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const team = await prisma.team.create({
      data: {
        year: body.year,
        name: body.name,
        position: body.position || "",
        image: body.image || null,
      },
    });

    return NextResponse.json(team, { status: 201 });
  } catch (error) {
    console.error("Error creating team:", error);
    return NextResponse.json(
      { error: "Failed to create team" },
      { status: 500 }
    );
  }
}
