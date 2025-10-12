import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all events
export async function GET() {
  try {
    const events = await prisma.event.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}

// POST create new event
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const event = await prisma.event.create({
      data: {
        title: body.title,
        description: body.description,
        longDescription: body.longDescription || null,
        date: body.date,
        time: body.time || null,
        location: body.location || null,
        image: body.image || null,
        status: body.status || "upcoming",
        category: body.category || "workshop",
        participants: body.participants ? parseInt(body.participants) : null,
        registrationLink: body.registrationLink || null,
        featured: body.featured || false,
      },
    });

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}
