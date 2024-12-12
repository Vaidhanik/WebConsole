import React from "react";
import {
  ResizablePanel,
  ResizableHandle,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import AIDataCard from "./AIDataCard";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import PercentageRing from "./Loader";
import { 
    AlertCircle, 
    Check, 
    X, 
    Network, 
    Server, 
    Code 
  } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
    <div className="flex gap-4 flex-col max-w-xl mx-auto">
      <ResizablePanelGroup 
        direction="horizontal" 
        className="rounded-lg border shadow-xl md:min-w-[450px]"
      >
        <ResizablePanel defaultSize={50} className="border-2 rounded-lg">
          <Card className="p-4 h-full rounded-none shadow-xl flex flex-col justify-center gap-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <CardContent className="p-4 font-semibold text-lg border-2 border-slate-400 rounded-lg flex items-center gap-3">
                    <Network className="h-4 w-4 mr-2 text-blue-500" />
                    <span>Remote Address: {remote}</span>
                  </CardContent>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Network endpoint details</p>
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <CardContent className="p-4 font-semibold text-lg border-2 border-slate-400 rounded-lg flex items-center gap-3">
                    <Code className="h-4 w-4 mr-2 text-green-500" />
                    <span>App Name: {app}</span>
                  </CardContent>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Application identification</p>
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <CardContent className="p-4 font-semibold text-lg border-2 border-slate-400 rounded-lg flex items-center gap-3">
                    <Server className="h-4 w-4 mr-2 text-purple-500" />
                    <span>Local Port: {port}</span>
                  </CardContent>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Local network port</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Card>
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        <ResizablePanel defaultSize={50} className="border-2 rounded-lg">
          <div 
            className={`flex h-full items-center justify-center p-6 ${getBackgroundColor(percentage)}`}
          >
            <PercentageRing percentage={percentage} />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>

      <ResizablePanelGroup 
        direction="horizontal" 
        className="rounded-lg border shadow-xl md:min-w-[450px]"
      >
        {[
          { name: "Isolation Forest", active: BackColor1 },
          { name: "LOF", active: BackColor2 },
          { name: "Auto Encoder", active: BackColor3 }
        ].map((algo, index) => (
          <React.Fragment key={algo.name}>
            <ResizablePanel 
              defaultSize={33} 
              className={`border-2 rounded-lg ${algo.active ? 'hover:bg-green-50' : 'hover:bg-red-50'}`}
            >
              <div
                className={`flex h-[200px] items-center justify-center p-2 rounded-lg transition-all duration-300 
                  ${algo.active ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}
                `}
              >
                <div className="flex flex-col items-center gap-2">
                  <span className="font-semibold text-xl">{algo.name}</span>
                  <Badge variant={algo.active ? "default" : "destructive"}>
                    {algo.active ? (
                      <><Check className="mr-2 h-4 w-4" /> Active</>
                    ) : (
                      <><X className="mr-2 h-4 w-4" /> Inactive</>
                    )}
                  </Badge>
                </div>
              </div>
            </ResizablePanel>
            {index < 2 && <ResizableHandle  />}
          </React.Fragment>
        ))}
      </ResizablePanelGroup>
    </div>
  );
}
