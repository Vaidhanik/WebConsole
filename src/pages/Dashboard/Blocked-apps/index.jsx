import React from "react";
import Layout from "../layout";
import { Search, Subtitles } from "lucide-react";
import Link from "next/link";
import fs from "fs";
import path from "path";
import AppBox from "@/Props/AppBox";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";





const BlockedApps = ({ apps }) => {
  return (
    <>
      <Layout>
        <div className="h-[100%] flex flex-col justify-center items-center align-middle ">
          <div className="w-full px-6 flex flex-row align-middle items-center p-3 rounded-2xl shadow-lg hover:shadow-xl">
            <Search style={{color:"slategray",paddingRight:10}} />
          <Input type="text" className=" border-none shadow-none text-xl placeholder:text-slate-500" placeholder="Search Blocked Apps" />
          </div>
          <Separator className="bg-gray-500 my-4 shadow-xl " />
          <div className=" h-[100%] w-full flex flex-col shadow-xl m-[25px] p-[25px] rounded-2xl border-10 ">
            <h1 className="text-black font-semibold text-2xl py-2 my-2">Blocked Apps</h1>
            <div className="grid grid-rows-3 grid-flow-col gap-8">
              {apps.map((app) => (
                <div className="shadow-xl hover:shadow-2xl rounded-xl" key={app.appName}>
                  <AppBox data={app} />
                </div>
              ))}
            </div>
          </div>
              </div>
      </Layout>
    </>
  );
};

export default BlockedApps;

export async function getStaticProps() {
  try {
    const filePath = path.join(
      process.cwd(),
      "src",
      "logs",
      "app_stats_20241116_134122.csv"
    );
    const csvData = fs.readFileSync(filePath, "utf8");
    const rows = csvData.trim().split("\n");

    // Extract header and data
    const [header, ...dataRows] = rows;
    const headers = header.split(",");

    const appNameIndex = headers.indexOf("app_name");
    const servicesIndex = headers.indexOf("services_accessed");

    const uniqueApps = new Map();

    dataRows.forEach((row) => {
      const columns = row.split(",");
      const appName = columns[appNameIndex];
      const services = columns[servicesIndex];

      if (!uniqueApps.has(appName)) {
        uniqueApps.set(appName, new Set(services.split(",")));
      } else {
        // Add more services for the app if already exists
        const existingServices = uniqueApps.get(appName);
        services.split(",").forEach((service) => existingServices.add(service));
      }
    });

    const apps = Array.from(uniqueApps.entries()).map(
      ([appName, services]) => ({
        appName,
        services: Array.from(services),
      })
    );

    console.log(apps); // Debugging output
    return {
      props: { apps },
    };
  } catch (error) {
    console.error("Error reading or parsing CSV:", error);
    return {
      props: { apps: [] },
    };
  }
}

