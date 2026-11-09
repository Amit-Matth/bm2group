import { NextResponse } from "next/server";
import { getDatabase } from "../../../lib/mongodb";

const DEFAULT_JOURNEY = [
  {
    id: "entry-1",
    date: "November 01, 2026",
    title: "Domain Acquisition",
    summary: "Secured a domain for BM2 Group",
    details: "Purchased the bm2group.in domain marking the first small step towards our vision.",
    imageUrl: "/GROUP.jpg"
  },
  {
    id: "entry-2",
    date: "November 09, 2026",
    title: "Launch of BM2 Group",
    summary: "Our journey begins from here.",
    details: "Today marks the launch of BM2 Group. An umbrella for multiple ventures, connecting hearts, creating opportunities and making the difference.",
    imageUrl: ""
  },
  {
    id: "entry-3",
    date: "November 16, 2026",
    title: "BM2 Sipware",
    summary: "Launch: 9:00 AM, November 16, 2026",
    details: "",
    imageUrl: ""
  }
];

export async function GET() {
  try {
    const db = await getDatabase();
    if (!db) {
      return NextResponse.json({ journey: DEFAULT_JOURNEY });
    }

    const journeyCollection = db.collection("journey");
    const journey = await journeyCollection.find({}).sort({ createdAt: 1 }).toArray();

    if (journey.length === 0) {
      return NextResponse.json({ journey: DEFAULT_JOURNEY });
    }

    const formatted = journey.map(item => ({
      id: item._id.toString(),
      date: item.date,
      title: item.title,
      summary: item.summary,
      details: item.details,
      imageUrl: item.imageUrl || "",
    }));

    return NextResponse.json({ journey: formatted });
  } catch (error) {
    console.error("GET /api/journey error:", error);
    return NextResponse.json({ journey: DEFAULT_JOURNEY });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { date, title, summary, details, imageUrl } = body;

    if (!date || !title || !details) {
      return NextResponse.json({ error: "Date, Title, and Details are required." }, { status: 400 });
    }

    const newEntry = {
      date,
      title,
      summary: summary || details.substring(0, 80) + "...",
      details,
      imageUrl: imageUrl || "",
      createdAt: new Date().toISOString(),
    };

    const db = await getDatabase();
    if (db) {
      const result = await db.collection("journey").insertOne(newEntry);
      newEntry.id = result.insertedId.toString();
    } else {
      newEntry.id = Date.now().toString();
    }

    return NextResponse.json({ success: true, entry: newEntry });
  } catch (error) {
    console.error("POST /api/journey error:", error);
    return NextResponse.json({ error: "Failed to create journey entry" }, { status: 500 });
  }
}
