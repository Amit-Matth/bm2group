import { NextResponse } from "next/server";
import { getDatabase } from "../../../lib/mongodb";

// Initial default venture fallback
const DEFAULT_VENTURES = [
  {
    id: "default-1",
    title: "Classified Venture",
    targetDate: "2026-11-16T09:00:00+05:30",
    status: "Active Development // Stealth Mode",
    description: "Our flagship upcoming digital platform, currently being engineered under absolute stealth. Built for lightning speed, zero clutter, and global scalability.",
    createdAt: new Date().toISOString(),
  }
];

export async function GET() {
  try {
    const db = await getDatabase();
    if (!db) {
      return NextResponse.json({ ventures: DEFAULT_VENTURES });
    }

    const venturesCollection = db.collection("ventures");
    const ventures = await venturesCollection.find({}).sort({ createdAt: -1 }).toArray();

    if (ventures.length === 0) {
      return NextResponse.json({ ventures: DEFAULT_VENTURES });
    }

    const formatted = ventures.map(v => ({
      id: v._id.toString(),
      title: v.title,
      targetDate: v.targetDate,
      status: v.status || "Active Development",
      description: v.description,
      createdAt: v.createdAt,
    }));

    return NextResponse.json({ ventures: formatted });
  } catch (error) {
    console.error("GET /api/ventures error:", error);
    return NextResponse.json({ ventures: DEFAULT_VENTURES });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { title, targetDate, status, description } = body;

    if (!title || !targetDate) {
      return NextResponse.json({ error: "Title and Target Date are required." }, { status: 400 });
    }

    const newVenture = {
      title,
      targetDate,
      status: status || "Active Development // Stealth Mode",
      description: description || "Stealth venture engineered by BM2 Group.",
      createdAt: new Date().toISOString(),
    };

    const db = await getDatabase();
    if (db) {
      const result = await db.collection("ventures").insertOne(newVenture);
      newVenture.id = result.insertedId.toString();
    } else {
      newVenture.id = Date.now().toString();
    }

    return NextResponse.json({ success: true, venture: newVenture });
  } catch (error) {
    console.error("POST /api/ventures error:", error);
    return NextResponse.json({ error: "Failed to create venture" }, { status: 500 });
  }
}
