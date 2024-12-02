import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
const AddPolicy = () => {
  return (
    <div>
      <Card style={{height:"450px",width:"450px"}}>
        <CardHeader>
          <CardTitle>Policy</CardTitle>
          <CardDescription>Add/Update Policy</CardDescription>
        </CardHeader>
        <CardContent className=" flex flex-col gap-2">
          <Input className="my-2" type="url" placeholder="add url" />
          <div>
            <Label>Description</Label>
            <Textarea
              style={{
                height: "200px",
                width: "100%",
              }}
            />
          </div>
          <Button className="my-2 ">Add</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddPolicy;
