import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all admins
export async function GET() {
  const admins = await prisma.admin.findMany();
  return NextResponse.json(admins);
}
