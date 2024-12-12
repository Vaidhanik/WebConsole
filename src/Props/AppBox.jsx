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

const AppBox = ({ data }) => {
  return (
    <>
      <Link href={`/Dashboard/MainDashboard/${data}`}>
        <Card className="flex flex-row h-[100px] w-[250px] bg-primary">
          <CardHeader className="overflow-hidden">
            <div className="relative w-full h-full">
              <CardTitle className="text-lg whitespace-nowrap overflow-hidden animate-scroll">
                {data}
              </CardTitle>
            </div>
          </CardHeader>
        </Card>
      </Link>
    </>
  );
};

export default AppBox;
