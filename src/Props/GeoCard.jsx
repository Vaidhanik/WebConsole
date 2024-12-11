import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import brave from '@/assets/Brave.png'
import { Button } from "@/components/ui/button";
import { Height } from "@mui/icons-material";

const GeoCard = ({data} ) => {
  return (
    <> 
        <Card className="flex flex-col w-[250px] overflow-y-auto p-2 border-none h-full" >
            <CardHeader>
                <CardTitle>Blocked Countries</CardTitle>
            </CardHeader>

            <div className="grid grid-cols-1 grid-flow-row gap-1 ">
            {data.map((data)=>
          <CardContent className="flex flex-row px-6 py-2 border-2 rounded-lg">
            <p className="text-lg w-full">{data.name}</p>
            <Link href={`${data.name}`}><Button>Unblock</Button></Link>
          </CardContent>
            )}
            </div>
        </Card>
    </>
  );
};

export default GeoCard;
