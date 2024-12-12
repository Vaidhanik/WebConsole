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
const ExistingPolicy = ( {rule} ) => {

  const [rules, setRules] = useState([]);
  
  return (
    <div>
      <Card style={{
       height:"140px", width:"450px"
      }}>
        <CardHeader>
          <CardTitle>Existing Policy</CardTitle>
        </CardHeader>
        <CardContent className="gap-2">
          <div>
            <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
              <div className="space-y-1">

                <ul
                  style={{
                    listStyleType: "disc",
                  }}
                >
                  <li>
                    <Link href={url}>{policy}</Link>
                  </li>
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
