import React from "react";
import Layout from "../layout";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useEffect, useState } from "react";
import ChartExample from "@/Props/AppCharts";
const SystemAnalysis = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch data from the API route
    const fetchData = async () => {
      try {
        const response = await fetch("/api/connectionsDataCSV");
        if (response.ok) {
          const result = await response.json();
          setData(result);
        } else {
          setError("Failed to fetch data");
        }
      } catch (err) {
        setError("Error: " + err.message);
      }
    };

    fetchData();
  }, []);

  console.log(data);
  return (
    <Layout>
      <div className="w-[80vw] h-screen mt-10 ml-4">
        <ChartExample appName={"System Wide Analysis"} height={"600px"} width={"100%"} />
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Time</TableHead>
              <TableHead>App Name</TableHead>
              <TableHead>Local Address</TableHead>
              <TableHead className="text-center">Domain</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
            <TableCell className="font-medium">{row.timestamp} </TableCell> 
            <TableCell>{row.app_name}</TableCell>
            <TableCell>{row.local_addr}</TableCell>
            <TableCell className="text-left">{row.domain}</TableCell>
          </TableRow>
          ))}
          </TableBody>
        </Table>
      </div>
    </Layout>
  );
};

export default SystemAnalysis;
