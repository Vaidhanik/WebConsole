import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const AIDataCard = ({ remote, app, port }) => {
  return (
    <div>
      <Card className="p-4 flex flex-col justify-center align-middle">
        <CardContent className="p-4">
          <p>Remote Address:{remote}</p>
        </CardContent>
        <CardContent className="p-4">
          <p>App Name:{app}</p>
        </CardContent>
        <CardContent className="p-4">
          <p>Local Port:{port}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIDataCard;
