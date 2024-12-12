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
    <div className="h-full w-full">
      <Card style={{
       height:"450px", width:"600px"
      }}
      className="p-2">
        <CardHeader>
          <CardTitle>Existing Policy</CardTitle>
        </CardHeader>
        <CardContent className="gap-2 border-2 border-black rounded-lg p-2">
          <div>
            <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
              <div className="space-y-1">

                <ul className="grid grid-col-1 grid-flow-row align-middle">
                  <div className="flex flex-row">
                  <p className="text-lg w-full flex align-middle items-center">{policy}</p>
                  <Link href={`${url}`}><Button>Unblock</Button></Link>
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
