import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  const body = await request.json();
  // console.log(body);
  const client = await clientPromise;
  const db = client.db("bittree");
  const collection = db.collection("links");

  // If the handle is already taken, you can not create a BitTree with that handle
  const doc = await collection.findOne({ handle: body.handle });
  if (doc) {
    return Response.json({
      success: false,
      error: true,
      message: "Handle is already taken! Please choose another one.",
      result: null,
    });
  }

  const result = await collection.insertOne(body);
  return Response.json({
    success: true,
    error: false,
    message: "Your BitTree has been added Successfully!",
    result: result,
  });
}
