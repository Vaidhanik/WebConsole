import React, { useState } from "react";
import Layout from "../layout";
import { Search, Filter, X } from "lucide-react";
import Link from "next/link";
import fs from "fs";
import path from "path";
import AppBox from "@/Props/AppBox";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const BlockedApps = ({ apps }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredApps, setFilteredApps] = useState(apps);
  const [activeFilters, setActiveFilters] = useState([]);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    filterApps(term, activeFilters);
  };

  const filterApps = (term, currentFilters) => {
    let result = apps.filter(app => 
      app.appName.toLowerCase().includes(term) &&
      (currentFilters.length === 0 || 
       currentFilters.some(filter => 
        app.services.some(service => service.toLowerCase().includes(filter.toLowerCase()))
      ))
    );
    setFilteredApps(result);
  };

  

  const removeFilter = (service) => {
    const newFilters = activeFilters.filter(f => f !== service);
    setActiveFilters(newFilters);
    filterApps(searchTerm, newFilters);
  };

  // Extract unique services for filtering
  const allServices = [...new Set(apps.flatMap(app => app.services))];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 space-y-6">
        <div className="bg-primary/10 rounded-2xl p-6 shadow-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
            <Input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              className="pl-10 py-2 border rounded-md w-full bg-background"
              placeholder="Search Blocked Apps"
            />
          </div>
        </div>

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Active Filters:</span>
            {activeFilters.map((filter) => (
              <Button 
                key={filter} 
                variant="destructive" 
                size="sm" 
                className="flex items-center gap-1"
                onClick={() => removeFilter(filter)}
              >
                {filter}
                <X className="w-4 h-4" />
              </Button>
            ))}
          </div>
        )}

        <Separator className="bg-primary/50" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredApps.length > 0 ? (
            filteredApps.map((app) => (
              <div 
                key={app.appName} 
                className="transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <AppBox data={app} />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-muted-foreground py-12">
              <p className="text-xl">No apps found matching your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
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

    //just call an api man
    //remove everything above 

    const dispatch = useDispatch();
    const currentIp = useSelector(selectIp);

    const url = "https://"+currentIp.ip+":5000/apps"
    const data = await fetch(url);

    let appnames = data.res;

    return {
      props: {appnames}
    }
  } catch (error) {
    console.error("Error reading or parsing CSV:", error);
    return {
      props: { apps: [] },
    };
  }
}

