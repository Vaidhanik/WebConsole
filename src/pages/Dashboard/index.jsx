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
          { ip: "12.12.3.5", mac: "dheerajmac" },
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
    <Card className="w-[400px]">
      <CardContent className="flex items-center p-6">
        <div className="flex items-center justify-center w-12 h-12 rounded-lg ">
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
      <div className='my-6'>
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Shield className="h-6 w-6" />
            Firewall Monitor
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatusCard icon={Activity} title="Active Connected Machines" value={stats.connections} />
        </div>

        <div className="grid grid-cols-1 gap-6 w-full">
          <Card className="" >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Connected Machines
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.map((machine) => (
                  <div  onClick={() => handleClick(machine)} className={`p-3 rounded-lg cursor-pointer bg-secondary`}>
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
