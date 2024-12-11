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
      <Card className="flex flex-row items-center " style={{
        width:"300px",height:"50px"
      }}>
          <Image  height={40} width={40} className="rounded-xl m-2" src={brave}  alt={data} />
      <CardHeader >
          <CardTitle className="text-lg">{data}</CardTitle>
      </CardHeader>
      </Card>
    </div>
     )
}

export default AppBoxStatic
