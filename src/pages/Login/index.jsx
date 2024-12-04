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
import Link from "next/link";

import React from "react";

const Login = () => {
  return (
    <section className="h-screen w-full flex justify-center items-center">
      <Card className="w-[450px] h-[300px] flex justify-center flex-col items-center align-middle">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
            <Input className="my-3 w-[300px]" type='email' placeholder="email id" />
            <Input className="my-3 w-[300px]" type='password' placeholder="password" />
        </CardContent>
        <CardFooter className="flex flex-col">
           <Link href="/ForgotPassword" className="text-blue-950 opacity-50 hover:opacity-100">forgot password</Link> 
          <Button className="w-[100px] mt-2" type="submit">
            Submit
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
};

export default Login;
