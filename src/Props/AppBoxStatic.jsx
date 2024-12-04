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
import brave from '@/assets/Brave.png'
const AppBoxStatic = ({data}) => {
  return (
    <div>
      <Card className="flex flex-row " style={{
        width:"300px",height:"150px"
      }}>
          <Image  height={100} width={150} className="rounded-xl m-2" src={brave}  alt={data} />
      <CardHeader>
          <CardTitle className="text-2xl">{data}</CardTitle>
          <CardDescription>{data}</CardDescription>
      </CardHeader>
      </Card>
    </div>
     )
}

export default AppBoxStatic
