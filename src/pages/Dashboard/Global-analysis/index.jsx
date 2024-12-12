import { useEffect, useState } from "react";
import Layout from "../layout";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  AlertCircle, 
  Filter, 
  Download, 
  Search, 
  BarChart2 
} from "lucide-react";
import ChartExample from "@/Props/AppCharts";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

const SystemAnalysis = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [filterType, setFilterType] = useState("app_name");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/connectionsDataCSV");
        if (response.ok) {
          const result = await response.json();
          setData(result);
          setFilteredData(result);
        } else {
          setError("Failed to fetch data");
        }
      } catch (err) {
        setError("Error: " + err.message);
      }
    };

//     use this api to get the data instead:


//     const dispatch = useDispatch();
//     const currentIp = useSelector(selectIp);

//     const data = await fetch(url);

//     const fetchData = async ()=>{
//          try {
//         const url = "https://"+currentIp.ip+":5000/data"
//         const response = await fetch(url);
//         if (response.ok) {
//           const result = await response.json();
//           setData(result);
//           setFilteredData(result);
//         } else {
//           setError("Failed to fetch data");
//         }
//       } catch (err) {
//         setError("Error: " + err.message);
//       } 
//     }
//     
    fetchData();
  }, []);

  // Advanced filtering handler
  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilter(value);

    const newFilteredData = data.filter((item) =>
      item[filterType].toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(newFilteredData);
  };

  // Sorting function
  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    
    const sortedData = [...filteredData].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
      return 0;
    });

    setFilteredData(sortedData);
    setSortConfig({ key, direction });
  };

  // Export data function
  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + filteredData.map(e => Object.values(e).join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "system_analysis_export.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart Card */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <BarChart2 className="h-6 w-6 text-primary" />
                Network Connection Analysis
              </CardTitle>
              <Badge variant="secondary">Real-time</Badge>
            </CardHeader>
            <CardContent>
              <ChartExample appName={""} height={"400px"} width={"100%"} />
            </CardContent>
          </Card>

          {/* Quick Stats Card */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Total Connections</span>
                <Badge variant="outline">{data.length}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Unique Apps</span>
                <Badge variant="outline">
                  {new Set(data.map(item => item.app_name)).size}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Table Section */}
          <Card className="lg:col-span-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle>Detailed Connections Log</CardTitle>
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleExport}
                >
                  <Download className="mr-2 h-4 w-4" /> Export
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Filtering Section */}
              <div className="flex space-x-2 mb-4">
                <div className="flex items-center space-x-2 w-full">
                  <Search className="text-muted-foreground" />
                  <Input 
                    placeholder="Search connections" 
                    value={filter}
                    onChange={handleFilterChange}
                    className="flex-grow"
                  />
                  <Select 
                    value={filterType} 
                    onValueChange={setFilterType}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="app_name">App Name</SelectItem>
                      <SelectItem value="domain">Domain</SelectItem>
                      <SelectItem value="local_addr">Local Address</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Data Table */}
              <ScrollArea className="h-[400px] w-full rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {['timestamp', 'app_name', 'local_addr', 'domain'].map((header) => (
                        <TableHead 
                          key={header} 
                          onClick={() => handleSort(header)}
                          className="cursor-pointer hover:bg-accent"
                        >
                          {header.replace('_', ' ').toUpperCase()}
                          {sortConfig.key === header && (
                            <span className="ml-2">
                              {sortConfig.direction === 'ascending' ? '▲' : '▼'}
                            </span>
                          )}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.length > 0 ? (
                      filteredData.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell>{row.timestamp}</TableCell>
                          <TableCell>{row.app_name}</TableCell>
                          <TableCell>{row.local_addr}</TableCell>
                          <TableCell>{row.domain}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center">
                          <div className="flex items-center justify-center text-muted-foreground">
                            <AlertCircle className="mr-2" />
                            No results found
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default SystemAnalysis;