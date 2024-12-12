import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSelector } from "react-redux";
import { selectIp } from "@/store/features/ipSlice";

const ExistingPolicy = ({ rule }) => {
  const currentIp = useSelector(selectIp);

  const [rules, setRules] = useState([]);

  const handleUnblock = async () => {
    const url = `https://${currentIp}:5000/unblock`;
    try {
      const response = await fetch(url, {
        method: "POST", // Specifies the HTTP method
        headers: {
          "Content-Type": "application/json", // Tells the server you're sending JSON
        },
        body: JSON.stringify(rule.rule_id), // Converts the payload into a JSON string
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json(); // Parse JSON response
      console.log("Response data:", data);
      return data;
    } catch (error) {
      console.error("Error making POST request:", error);
    }
  };

  return (
    <div className="h-full w-full">
      <Card
        style={{
          height: "450px",
          width: "600px",
        }}
        className="p-2"
      >
        <CardHeader>
          <CardTitle>Existing Policy</CardTitle>
        </CardHeader>
        <CardContent className="gap-2 border-2 border-black rounded-lg p-2">
          <div>
            <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
              <div className="space-y-1">
                <ul className="grid grid-col-1 grid-flow-row align-middle">
                  <div className="flex flex-row">
                    <p className="text-lg w-full flex align-middle items-center">
                      {rule.target}
                    </p>
                    <Button onClick={handleUnblock}>Unblock</Button>
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExistingPolicy;
