import React, { useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { selectIp } from "@/store/features/ipSlice";
const AddPolicy = (appName) => {
  
  const dispatch = useDispatch();
  const currentIp = useSelector(selectIp);

  const [target, setTarget] = useState();

  const addRule = async ()=>{
    if(!currentIp) return;
    const url = "http://"+currentIp+":5000/block-target/";
    
    try {
      const response = await fetch(url, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': 'Bearer ADMIN-TOKEN',
        },
        body: JSON.stringify({
          target: target,
          app_name: appName
        })
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }

  }

  return (
    <div>
      <Card style={{height:"450px",width:"450px"}}>
        <CardHeader>
          <CardTitle>Policy</CardTitle>
          <CardDescription>Add/Update Policy</CardDescription>
        </CardHeader>
        <CardContent className=" flex flex-col gap-2">
          <Input className="my-2" type="url" placeholder="add target url" value={target} onChange={(e)=>setTarget(e.target.value)} />
          <div>
            <Label>Description</Label>
            <Textarea
              style={{
                height: "200px",
                width: "100%",
              }}
            />
          </div>
          <Button className="my-2 " onClick={()=>addRule()}>Add</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddPolicy;
