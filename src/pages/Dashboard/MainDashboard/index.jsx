import React from "react";
import Layout from "../layout";
import brave from "@/assets/Brave.png";
import { Subtitles } from "lucide-react";
import Link from "next/link";
import fs from "fs";
import path from "path";
import AppBox from "@/Props/AppBox";


const MainDashboard = ({ apps }) => {
  return (
    <>
      <Layout>
        <div className=" flex flex-col justify-center items-center align-middle">
          <h1 className="text-3xl m-4">Main DashBoard</h1>
          <div className="h-[90vh] w-full flex justify-center align-middle items-center ">
            <div className="grid grid-rows-3 grid-flow-col gap-8 justify-center items-center">
              {apps.map((app) => (
                <div key={app.appName}>
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

export default MainDashboard;

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

