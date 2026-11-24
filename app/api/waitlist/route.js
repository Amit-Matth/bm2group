import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, ventureId, ventureName } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
    }

    const newSubscriber = {
      email: email.trim().toLowerCase(),
      ventureId: ventureId || "general",
      ventureName: ventureName || "BM2 Group",
      createdAt: new Date().toISOString(),
    };

    const db = await getDatabase();
    if (db) {
      const waitlistCollection = db.collection("waitlist");

      // Upsert subscriber so duplicates update timestamp instead of throwing
      await waitlistCollection.updateOne(
        { email: newSubscriber.email, ventureId: newSubscriber.ventureId },
        { $set: newSubscriber },
        { upsert: true }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Subscribed ${newSubscriber.email} to ${newSubscriber.ventureName} waitlist!`,
    });
  } catch (error) {
    console.error("POST /api/waitlist error:", error);
    return NextResponse.json({ success: true });
  }
}

export async function GET() {
  try {
    const db = await getDatabase();
    if (!db) {
      return NextResponse.json({ subscribers: [], count: 0 });
    }

    const subscribers = await db.collection("waitlist").find({}).sort({ createdAt: -1 }).toArray();

    const formatted = subscribers.map((s) => ({
      id: s._id.toString(),
      email: s.email,
      ventureId: s.ventureId,
      ventureName: s.ventureName,
      createdAt: s.createdAt,
    }));

    return NextResponse.json({ subscribers: formatted, count: formatted.length });
  } catch (error) {
    console.error("GET /api/waitlist error:", error);
    return NextResponse.json({ subscribers: [], count: 0 });
  }
}
