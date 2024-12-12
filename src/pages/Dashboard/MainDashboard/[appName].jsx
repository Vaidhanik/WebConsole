import { useRouter } from "next/router";
import Head from "next/head";
import Layout from "../layout";
import AppBoxStatic from "@/Props/AppBoxStatic";
import LineChart from "@/Props/AppCharts";
import ChartExample from "@/Props/AppCharts";
import AddPolicy from "@/Props/AddPolicy";
import ExistingPolicy from "@/Props/ExistingPolicy";
import { useDispatch, useSelector } from "react-redux";
import { selectIp } from "@/store/features/ipSlice";
import { useState } from "react";

export default function DashboardPage() {
  const router = useRouter();
  const { appName } = router.query; // Get the dynamic route parameter

  const [rules, setRules] = useState([])
  // Define app-specific titles and details


  return (
    <Layout>
      {/* Dynamic Page Title */}
      <Head>
        <title>{appName}</title>
      </Head>
      <div className=" h-screen w-full flex items-center justify-center ">
      <div className="pt-12 flex flex-col  justify-center gap-2">
        <div className="my-6 gap-12">
            <AppBoxStatic className="p-2"  data={appName} />
        </div>
        <div className="flex flex-col gap-12 items-center justify-center w-[100%]">
            <div>
                {/* graph  */}
                <ChartExample appName={appName} height={"400px"} width={1000}/>
            </div>
            <div className="flex flex-row justify-between gap-6">
                <div>
                    <AddPolicy appName={appName} />
                </div>
                <div>
                    {/* define existing policy apis to change or to view */}
                    {/* multiple apis list need to mapped as dta of apis is not available just one demo policy is shown */}
                    <ExistingPolicy policy={"lorem epsom"} url={`/path/${appName}`}/>
                </div>
            </div>
        </div>
      </div>

      </div>
    </Layout>
  );
}