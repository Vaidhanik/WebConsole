"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setIp } from "@/store/features/ipSlice";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/router";
import Layout from "./layout";
import { Shield, Activity, AlertTriangle, BarChart2, Lock, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// const Network = () => {
//   const [data, setData] = useState([]);
//   const dispatch = useDispatch();
//   const router = useRouter();

//   useEffect(() => {
//     // Fetch data from the API
//     const fetchData = async () => {
//       try {
//         // const response = await fetch('http://localhost:8000/ips');
//         // if (!response.ok) throw new Error('Failed to fetch data');
//         // const result = await response.json();
//         const result = [
//           { ip: "1.2.3.4", mac: "somyasmac" },
//           { ip: "12.12.3.4", mac: "abhinavslinux" },
//         ];
//         setData(result);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleClick = (machine) => {
//     dispatch(setIp(machine));
//     console.log("here......");
//     router.push("./Dashboard/MainDashboard");
//   };

//   return (
//     <Layout>
//       <div className="flex justify-center items-center w-1/4 mx-auto mt-5">
//         <Table className="text-black dark:text-white">
//           <TableCaption>All machines in your network...!</TableCaption>
//           <TableHeader>
//             <TableRow>
//               <TableHead className="w-[100px]">IP Addresses</TableHead>
//               <TableHead className="text-right font-bold">
//                 Mac Address
//               </TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {data.map((machine) => (
//               <TableRow key={machine.ip}>
//                 <TableCell
//                   className="font-medium cursor-pointer"
//                   onClick={() => handleClick(machine)}
//                 >
//                   {machine.ip}
//                 </TableCell>
//                 {/* <TableCell>{machine.paymentStatus}</TableCell>
//             <TableCell>{invoice.paymentMethod}</TableCell> */}
//                 <TableCell className="text-right">{machine.mac}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>
//     </Layout>
//   );
// };

// export default Network;



const FirewallDashboard = () => {
  const [isDark, setIsDark] = useState(true);

  const [stats] = useState({
    threats: 124,
    connections: 1567,
    bandwidth: '1.2 TB',
    activeRules: 45
  });

  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        // const response = await fetch('http://localhost:8000/ips');
        // if (!response.ok) throw new Error('Failed to fetch data');
        // const result = await response.json();
        const result = [
          { ip: "1.2.3.4", mac: "somyasmac" },
          { ip: "12.12.3.4", mac: "abhinavslinux" },
        ];
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleClick = (machine) => {
    dispatch(setIp(machine));
    console.log("here......");
    router.push("./Dashboard/MainDashboard");
  };

  const StatusCard = ({ icon: Icon, title, value }) => (
    <Card className={`${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
      <CardContent className="flex items-center p-6">
        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-500/10">
          <Icon className="w-6 h-6 text-blue-500" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Layout>
      <div className={`min-h-screen p-6 ${isDark ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'}`}>
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Shield className="h-6 w-6" />
            Firewall Monitor
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatusCard icon={AlertTriangle} title="Threats Blocked" value={stats.threats} />
          <StatusCard icon={Activity} title="Active Connections" value={stats.connections} />
          <StatusCard icon={BarChart2} title="Bandwidth Usage" value={stats.bandwidth} />
          <StatusCard icon={Lock} title="Active Rules" value={stats.activeRules} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className={`${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Traffic Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center border border-dashed rounded-lg">
                [Traffic Chart Placeholder]
              </div>
            </CardContent>
          </Card>

          <Card className={`${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.map((machine) => (
                  <div  onClick={() => handleClick(machine)} className={`p-3 rounded-lg cursor-pointer ${isDark ? 'bg-slate-700' : 'bg-slate-50'}`}>
                    <div className="flex items-center align-middle justify-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${machine.ip === 0 ? 'bg-red-500' : 'bg-green-500'}`} />
                      <p className="text-sm">1{machine.ip}</p>
                      <span className=" ml-auto">{machine.mac}</span>
                    </div>
                    <p className="text-sm mt-1 text-slate-400">
                      {machine.mac === 0 ? 'Blocked suspicious connection' : 'Allowed HTTPS traffic'}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default FirewallDashboard;
