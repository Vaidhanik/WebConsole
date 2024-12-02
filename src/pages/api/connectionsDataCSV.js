// pages/api/csvData.js

import fs from "fs";
import path from "path";
import Papa from "papaparse";

export default function handler(req, res) {
  // Define the path to the CSV file
  const filePath = path.join(process.cwd(), "src", "logs", "connections_20241116_134122.csv");

  try {
    // Read the CSV file
    const csvFile = fs.readFileSync(filePath, "utf8");

    // Parse the CSV file using PapaParse
    Papa.parse(csvFile, {
      header: true,  // Use the first row as headers
      skipEmptyLines: true,
      complete: (result) => {
        // Simplify the timestamp (assuming the format is valid)
        const formattedData = result.data.map((row) => {
          // If the timestamp is a valid date string, convert it
          const date = new Date(row.timestamp);
          const simplifiedDate = date.toISOString().split("T")[0]; // Format as "YYYY-MM-DD"

          return {
            ...row,
            timestamp: simplifiedDate, // Replace timestamp with simplified version
          };
        });

        res.status(200).json(formattedData);
      },
      error: (error) => {
        res.status(500).json({ error: "Error parsing CSV file" });
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Error reading CSV file" });
  }
}