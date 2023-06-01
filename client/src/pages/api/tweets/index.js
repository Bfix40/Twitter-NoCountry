/* import { Timestamp } from "mongodb";
import { connectToDatabase } from "../../../../utils/mongodb";

export default async function handler(req, res) {
  const { method, body } = req;

  const { db } = await connectToDatabase();
  if (method === "GET") {
    try {
      const { db } = await connectToDatabase();
      const response = await db
        .collection("tweets")
        .find({})
        .sort({ timestamp: -1 })
        .toArray();
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  if (method === "POST") {
    try {
      const response = await db
        .collection("tweets")
        .insertOne({ ...body, timestamp: new Timestamp() });

      res.status(201).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
 */
