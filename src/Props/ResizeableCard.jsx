import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import AIDataCard from "./AIDataCard";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import PercentageRing from "./Loader";

export function ResizableDemo({ remote, app, port, color, percentage }) {
  const [BackColor1, SetBackColor1] = useState(false);
  const [BackColor2, SetBackColor2] = useState(false);
  const [BackColor3, SetBackColor3] = useState(false);
  const getBackgroundColor = (percentage) => {
    // Ensure percentage is within the valid range
    const clampedPercentage = Math.max(0, Math.min(100, percentage));
    // Calculate hue: 0 (red) to 120 (green)
    const hue = (clampedPercentage / 100) * 120;
    return `hsl(${hue}, 100%, 50%)`; // Saturation: 100%, Lightness: 50%
  };

  return (
    <div className="flex gap-4 flex-col ">
      <ResizablePanelGroup
        direction="horizontal"
        className="max-w-md gap-1 rounded-lg border-none shadow-xl md:min-w-[450px]"
      >
        <ResizablePanel defaultSize={50} className="border-2  rounded-lg"  >
          <Card className="p-4 h-[100%] rounded-none shadow-xl flex flex-col justify-center align-middle gap-2" >
            <CardContent className="p-4 font-semibold text-lg border-2 border-slate-400 rounded-lg">
              <p>Remote Address:{remote}</p>
            </CardContent>
            <CardContent className="p-4 font-semibold text-lg border-2 border-slate-400 rounded-lg">
              <p>App Name:{app}</p>
            </CardContent>
            <CardContent className="p-4 font-semibold text-lg border-2 border-slate-400 rounded-lg">
              <p>Local Port:{port}</p>
            </CardContent>
          </Card>
        </ResizablePanel>
        <ResizablePanel defaultSize={50} className="border-2  rounded-lg">
          <div className="flex h-[200px] items-center shadow-xl justify-center align-middle p-6 " style={{backgroundColor:getBackgroundColor(percentage)}}>
            {/* <h1 className="text-[100px]" style={{fontSize:"100px",borderRadius:"100%"}}>100%</h1> */}
            <PercentageRing percentage={percentage} />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
      <ResizablePanelGroup
        direction="horizontal"
        className="max-w-md rounded-lg gap-1 border-none  md:min-w-[450px]"
      >
        <ResizablePanel defaultSize={50} className="border-2 shadow-xl  rounded-lg">
          <div
            className="flex h-[200px] items-center justify-center p-2"
            style={{ backgroundColor: BackColor1 ? "green" : "red",borderRadius:10 }}
          >
            <span className="font-semibold text-xl ">Isolation Forest</span>
          </div>
        </ResizablePanel>
        <ResizablePanel defaultSize={50} className="border-2 shadow-xl  rounded-lg">
          <div
            className="flex h-[200px] items-center justify-center p-2 "
            style={{ backgroundColor: BackColor2 ? "green" : "red",borderRadius:10 }}
          >
            <span className="font-semibold text-xl">LOF</span>
          </div>
        </ResizablePanel>
        <ResizablePanel defaultSize={50} className="border-2 shadow-xl  rounded-lg">
          <div
            className="flex h-[200px] items-center justify-center p-2"
            style={{ backgroundColor: BackColor3 ? "green" : "red",borderRadius:10 }}
          >
            <span className="font-semibold text-xl">Auto Encoder</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
