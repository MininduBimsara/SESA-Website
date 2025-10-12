import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET single news by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const news = await prisma.news.findUnique({
      where: { id },
    });

    if (!news) {
      return NextResponse.json({ error: "News not found" }, { status: 404 });
    }

    return NextResponse.json(news);
  } catch (error) {
    console.error("Error fetching news:", error);
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}

// PUT update news
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Generate slug from title if changed
    if (body.title && !body.slug) {
      body.slug = body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    }

    const news = await prisma.news.update({
      where: { id },
      data: {
        ...body,
        tags: body.tags || [],
      },
    });

    return NextResponse.json(news);
  } catch (error) {
    console.error("Error updating news:", error);

    if (error && typeof error === "object" && "code" in error) {
      if (error.code === "P2002") {
        return NextResponse.json(
          { error: "A news article with this slug already exists" },
          { status: 409 }
        );
      }

      if (error.code === "P2025") {
        return NextResponse.json({ error: "News not found" }, { status: 404 });
      }
    }

    return NextResponse.json(
      { error: "Failed to update news" },
      { status: 500 }
    );
  }
}

// DELETE news
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.news.delete({
      where: { id },
    });

    return NextResponse.json({ message: "News deleted successfully" });
  } catch (error) {
    console.error("Error deleting news:", error);

    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "P2025"
    ) {
      return NextResponse.json({ error: "News not found" }, { status: 404 });
    }

    return NextResponse.json(
      { error: "Failed to delete news" },
      { status: 500 }
    );
  }
}
