import React from 'react'
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const  ForgotPassword= () => {
  return (
    <section className="h-screen w-full flex justify-center items-center">
      <Card className="w-[450px] h-[300px] flex justify-center flex-col items-center align-middle">
        <CardHeader>
          <CardTitle>ForgotPassword</CardTitle>
        </CardHeader>
        <CardContent>
            <Input className="w-[300px]" type='email' placeholder="email id" />
        </CardContent>
        <CardFooter className="flex flex-col">
           <a href="/Login" className="opacity-50">login</a> 
          <Button className="w-[100px] mt-2">
            <a href="/ForgotPassword/opt">Send OTP</a>
          </Button>
        </CardFooter>
      </Card>
    </section>
  )
}

export default ForgotPassword
