import { IncomingForm } from "formidable";
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  const form = new IncomingForm({ keepExtensions: true });

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error("Error parsing file:", err);
      return res.status(500).json({ error: "Error parsing file" });
    }

    const file = files.image;
    if (!file) return res.status(400).json({ error: "No image uploaded" });

    console.log("Uploaded file:", file);

    // You can move/save file somewhere or process it
    res.status(200).json({ message: "File uploaded successfully", file });
  });
}
