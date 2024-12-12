
import React, { useEffect, useState } from "react";
import Layout from "../layout";
import { Search, Filter, X } from "lucide-react";
import Link from "next/link";
import AppBox from "@/Props/AppBox";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useSelector } from "react-redux";
import { selectIp } from "@/store/features/ipSlice";

const BlockedApps = () => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentIp = useSelector(selectIp);

  useEffect(() => {
    console.log('Component mounted or currentIp changed');
    console.log('Current IP state:', currentIp);

    const fetchApps = async () => {
      try {
        if (!currentIp) {
          console.log('No IP available yet');
          return;
        }

        // Log the full IP object structure
        console.log('Full currentIp object:', JSON.stringify(currentIp, null, 2));
        
        // Check if we can access ip.ip
        if (!currentIp) {
          console.log('IP structure is not as expected');
          return;
        }

        const url = `http://${currentIp}:5000/apps`;
        console.log('Attempting to fetch from:', url);

        const response = await fetch(url);
        console.log('Response status:', response.status);
        
        const data = await response.json();
        console.log('Fetched data:', data);
        
        setApps(data.apps);
        console.log('Apps state updated');
      } catch (error) {
        console.error('Error details:', {
          message: error.message,
          stack: error.stack
        });
      } finally {
        setLoading(false);
        console.log('Loading state set to false');
      }
    };

    fetchApps();
  }, [currentIp]);

  // Add loading state debug
  console.log('Current loading state:', loading);
  console.log('Current apps state:', apps);

  if (loading) {
    console.log('Rendering loading state');
    return (
      <Layout>
        <div className="h-[100%] flex justify-center items-center">
          <p>Loading apps...</p>
        </div>
      </Layout>
    );
  }

  // Add render debug
  console.log('Rendering main component');

  return (
    <Layout>
      <div className="h-[100%] flex flex-col justify-center items-center align-middle ">
        <div className="w-full px-6 flex flex-row align-middle items-center p-3 rounded-2xl shadow-lg hover:shadow-xl">
          <Input
            type="text"
            className="pl-10 py-2 border rounded-md w-full bg-no-repeat bg-left bg-[length:20px_20px] 
            dark:bg-[url('https://img.icons8.com/ios-glyphs/30/ffffff/search--v1.png')] 
            bg-[url('https://img.icons8.com/ios-glyphs/30/000000/search--v1.png')]"
            placeholder="Search Blocked Apps"
          />
        </div>
        <Separator className="bg-gray-500 my-4 shadow-xl " />
        <div className="h-[100%] w-full flex flex-col shadow-xl m-[25px] p-[25px] rounded-2xl border-10 ">
          <h1 className="text-black font-semibold text-2xl py-2 my-2">
            Blocked Apps ({apps.length})
          </h1>
          <div className="grid grid-rows-3 grid-flow-col gap-8">
            {Array.isArray(apps) ? (
              apps.map((app) => (
                <div className="shadow-xl hover:shadow-2xl rounded-xl" key={app.appName}>
                  <AppBox data={app} />
                </div>
              ))
            ) : (
              <p>No apps data available</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BlockedApps;