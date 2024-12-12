"use client"

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setIp } from '@/store/features/ipSlice';
import Link from 'next/link';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { useRouter } from 'next/router';


const Network = () => {
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
        const result = [{ip:"1.2.3.4", mac:"somyasmac"}, {ip:"12.12.3.4", mac:"abhinavslinux"}]
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleClick = (machine) => {
    dispatch(setIp(machine));
    console.log("here......");
    router.push("./MainDashboard")
  };

  return (
    <div className='flex justify-center items-center w-1/4 mx-auto mt-5'>
        <Table>
          <TableCaption>All machines in your network...!</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">IP Addresses</TableHead>
              <TableHead className="text-right font-bold">Mac Address</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((machine) => (
              <TableRow key={machine.ip}>
                <TableCell className="font-medium cursor-pointer" onClick={()=>handleClick(machine)}>
                    {machine.ip}</TableCell>
                {/* <TableCell>{machine.paymentStatus}</TableCell>
                <TableCell>{invoice.paymentMethod}</TableCell> */}
                <TableCell className="text-right">{machine.mac}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </div>
      )
};

export default Network;
