import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import Image from 'next/image';
const AppBoxStatic = ({data}) => {
  return (
    <div>
      <Card className="flex flex-row h-[200px] w-[250px] ">
          <Image  height={100} width={100} className="rounded-xl" src={null}  alt={data.title} />
      <CardHeader>
          <CardTitle className="text-lg">{data.title}</CardTitle>
          <CardDescription>{data.description}</CardDescription>
      </CardHeader>
      </Card>
    </div>
  )
}

export default AppBoxStatic
