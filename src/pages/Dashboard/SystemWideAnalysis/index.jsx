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
import { Input } from "@/components/ui/input";
import { FaSearch } from "react-icons/fa";
const SystemAnalysis = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState(""); // State for filter input
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // Fetch data from the API route
    const fetchData = async () => {
      try {
        const response = await fetch("/api/connectionsDataCSV");
        if (response.ok) {
          const result = await response.json();
          setData(result);
          setFilteredData(result);
        } else {
          setError("Failed to fetch data");
        }
      } catch (err) {
        setError("Error: " + err.message);
      }
    };

    fetchData();
  }, []);


  // Filter handler
  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilter(value);

    // Update filtered data
    const newFilteredData = data.filter((item) =>
      item.app_name.toLowerCase().includes(value.toLowerCase()) ||
      item.timestamp.toLowerCase().includes(value.toLowerCase()) ||
      item.domain.toLowerCase().includes(value.toLowerCase()) 
    );
    setFilteredData(newFilteredData);
  };
  return (
    <Layout>
      <div className="w-[80vw] h-full my-10 ml-4 shadow-xl p-6">
        <ChartExample appName={"System Wide Analysis"} height={"600px"} width={"100%"} />
        <div className="flex flex-row align-middle items-center gap-2 my-3 w-full justify-end">
        <FaSearch size={20} />
          <Input className="w-[20%]" type={"text"} value={filter} onChange={handleFilterChange} placeholder="Search" />
        </div>
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
          {filteredData.length > 0 ? (
              filteredData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{row.timestamp}</TableCell>
                  <TableCell>{row.app_name}</TableCell>
                  <TableCell>{row.local_addr}</TableCell>
                  <TableCell className="text-left">{row.domain}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No results found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Layout>
  );
};

export default SystemAnalysis;
