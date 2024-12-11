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

const AppBox = ({data} ) => {
  return (
    <>
      <Link href={`/Dashboard/MainDashboard/${data.appName}`}>
        <Card className="flex flex-row h-[100px] w-[250px]">
          <CardHeader>
            <CardTitle className="text-lg">{data.appName}</CardTitle>
          </CardHeader>
        </Card>
      </Link>
    </>
  );
};

export default AppBox;
