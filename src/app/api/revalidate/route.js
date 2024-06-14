// pages/api/revalidate.js

// http://localhost:3000/api/revalidate?path=/&secret=barcelona

// export default async function handler(req, res) {
//   // Check for secret to confirm this is a valid request
//   if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
//     return res.status(401).json({ message: "Invalid token" });
//   }

//   const path = req.query.path;

//   if (!path) {
//     return res.status(400).json({ message: "Path is required" });
//   }

//   try {
//     // Revalidate the specified path
//     await res.revalidate(path);
//     return res.json({ revalidated: true });
//   } catch (err) {
//     return res.status(500).json({ message: "Error revalidating" });
//   }
// }

// app/api/revalidate/route.js

// import { NextResponse } from "next/server";

// export async function GET(request) {
//   const { searchParams } = new URL(request.url);
//   const secret = searchParams.get("secret");

//   if (secret !== process.env.MY_SECRET_TOKEN) {
//     return NextResponse.json({ message: "Invalid token" }, { status: 401 });
//   }

//   const path = req.query.path;

//   if (!path) {
//     return res.status(400).json({ message: "Path is required" });
//   }

//   if (!path) {
//     return NextResponse.json({ message: "Path is required" }, { status: 400 });
//   }

//   try {
//     await request.revalidate(path);
//     return NextResponse.json({ revalidated: true });
//   } catch (err) {
//     return NextResponse.json(
//       { message: "Error revalidating" },
//       { status: 500 }
//     );
//   }
// }

import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

export async function GET(request) {
  console.log("get request called");
  const path = request.nextUrl.searchParams.get("path");

  if (path) {
    revalidatePath(path);
    return Response.json({ revalidated: true, now: Date.now() });
  }

  return Response.json({
    revalidated: false,
    now: Date.now(),
    message: "Missing path to revalidate",
  });
}
