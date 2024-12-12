// import { useRouter } from "next/router";
// import Head from "next/head";
// import Layout from "../layout";
// import AppBoxStatic from "@/Props/AppBoxStatic";
// import LineChart from "@/Props/AppCharts";
// import ChartExample from "@/Props/AppCharts";
// import AddPolicy from "@/Props/AddPolicy";
// import ExistingPolicy from "@/Props/ExistingPolicy";
// import { useDispatch, useSelector } from "react-redux";
// import { selectIp } from "@/store/features/ipSlice";
// import { useState } from "react";

// export default function DashboardPage() {
//   const router = useRouter();
//   const { appName } = router.query; // Get the dynamic route parameter

//   const [rules, setRules] = useState([])
//   // Define app-specific titles and details


//   return (
//     <Layout>
//       {/* Dynamic Page Title */}
//       <Head>
//         <title>{appName}</title>
//       </Head>
//       <div className=" h-screen w-full flex items-center justify-center ">
//       <div className="pt-12 flex flex-col  justify-center gap-2">
//         <div className="my-6 gap-12">
//             <AppBoxStatic className="p-2"  data={appName} />
//         </div>
//         <div className="flex flex-col gap-12 items-center justify-center w-[100%]">
//             <div>
//                 {/* graph  */}
//                 <ChartExample appName={appName} height={"400px"} width={1000}/>
//             </div>
//             <div className="flex flex-row justify-between gap-6">
//                 <div>
//                     <AddPolicy appName={appName} />
//                 </div>
//                 <div>
//                     {/* define existing policy apis to change or to view */}
//                     {/* multiple apis list need to mapped as dta of apis is not available just one demo policy is shown */}
//                     <ExistingPolicy policy={"lorem epsom"} url={`/path/${appName}`}/>
//                 </div>
//             </div>
//         </div>
//       </div>

//       </div>
//     </Layout>
//   );
// }
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Layout from "../layout";
import AppBoxStatic from "@/Props/AppBoxStatic";
import { 
  ChevronDown, 
  Filter, 
  RefreshCw, 
  BarChart2, 
  AlertCircle, 
  TimerReset 
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
// import { AgChartsReact } from "ag-charts-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import AddPolicy from "@/Props/AddPolicy";
import ExistingPolicy from "@/Props/ExistingPolicy";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import ChartExample from "@/Props/AppCharts";
import { useDispatch, useSelector } from "react-redux";
import { selectIp } from "@/store/features/ipSlice";

export default function DashboardPage() {
  const router = useRouter();
  const { appName } = router.query;

  // State management
  const [chartData, setChartData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    timeRange: '7d',
    dataType: 'all'
  });
  const [searchTerm, setSearchTerm] = useState('');


  // Define app-specific titles and details
  /*
  Id
  app_name,
  taget
  target_type,
  resolved_ips
  */
  //api call to get all data from the backend
  const dispatch = useDispatch();
  const currentIp = useSelector(selectIp);

 const dummy_policy = {
   Id: 12,
   app_name: "Chrome",
   target: "x.com",
   target_type: "domain",
   resolved_ips: ["fnerknf", "feldkfnme", "felfn"]
 }
  const [rules, setRules] = useState([dummy_policy])

  const getAllRules = async ()=>{
    if(!currentIp) return;
    try{

    const url = "https://"+currentIp+":5000/get_active_rules/"+{appName};
    const response = await fetch(url);
    const result = await response.json();

    setRules(res);
  }catch(err){
    res.status(500).json({"error": "could not get all data"})
  }
} 
  // Fetch data function
  const fetchData = async () => {
    // Simulated data - replace with actual API call
    const mockChartData = generateMockChartData();
    const mockTableData = generateMockTableData();
    
    setChartData(mockChartData);
    setTableData(mockTableData);
  };

  // Mock data generation functions
  const generateMockChartData = () => {
    return Array.from({ length: 30 }, (_, i) => ({
      time: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
      activity: Math.floor(Math.random() * 100),
      connections: Math.floor(Math.random() * 50)
    }));
  };

  const generateMockTableData = () => {
    return Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      timestamp: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
      service: ['Database', 'API', 'Network', 'Cloud'][Math.floor(Math.random() * 4)],
      status: ['Active', 'Blocked', 'Warning'][Math.floor(Math.random() * 3)],
      duration: Math.floor(Math.random() * 1000)
    }));
  };

  // Filtering and Search
  const filteredTableData = tableData.filter(row => 
    Object.values(row).some(val => 
      val.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Chart Options
  

  // Lifecycle
  useEffect(() => {
    fetchData();
  }, [appName, filterOptions]);

  return (
    <Layout>
      <Head>
        <title>{appName} Dashboard</title>
      </Head>
      
      <div className="container mx-auto py-8 space-y-6">
        {/* App Header */}
        <div className="flex justify-between items-center">
          <AppBoxStatic data={appName} />
          
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              onClick={fetchData}
              className="flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh Data
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filter
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem 
                  onSelect={() => setFilterOptions({ ...filterOptions, timeRange: '7d' })}
                >
                  Last 7 Days
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onSelect={() => setFilterOptions({ ...filterOptions, timeRange: '30d' })}
                >
                  Last 30 Days
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onSelect={() => setFilterOptions({ ...filterOptions, dataType: 'active' })}
                >
                  Active Connections
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onSelect={() => setFilterOptions({ ...filterOptions, dataType: 'blocked' })}
                >
                  Blocked Connections
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="flex flex-col gap-12 items-center justify-center w-[100%]">
            <div className="w-full">
                {/* graph  */}
                <ChartExample appName={appName}/>
            </div>
            <div className="flex flex-row justify-between gap-6">
                <div>
                    <AddPolicy appName={appName} />
                </div>
                <div>
                    {/* define existing policy apis to change or to view */}
                    {/* multiple apis list need to mapped as dta of apis is not available just one demo policy is shown */}
                    {
                      rules.map((rule) => {
                        return (
                          <ExistingPolicy rule={rule} />
                        );
                      })
                    }
                </div>
            </div>
        </div>

        {/* Data Table */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Connection Details</CardTitle>
            <div className="flex items-center space-x-4">
              <Input 
                placeholder="Search connections..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Duration (ms)</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTableData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.timestamp.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{row.service}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          row.status === 'Active' ? 'default' : 
                          row.status === 'Blocked' ? 'destructive' : 'outline'
                        }
                      >
                        {row.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{row.duration}</TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <AlertCircle className="w-4 h-4 mr-2" />
                            Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Connection Details</DialogTitle>
                          </DialogHeader>
                          {/* Add more detailed connection info here */}
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}