import { useRouter } from "next/router";
import Head from "next/head";
import Layout from "../layout";
import AppBoxStatic from "@/Props/AppBoxStatic";
import LineChart from "@/Props/AppCharts";
import ChartExample from "@/Props/AppCharts";
import AddPolicy from "@/Props/AddPolicy";
import ExistingPolicy from "@/Props/ExistingPolicy";

export default function DashboardPage() {
  const router = useRouter();
  const { appName } = router.query; // Get the dynamic route parameter

  // Define app-specific titles and details

  return (
    <Layout>
      {/* Dynamic Page Title */}
      <Head>
        <title>{appName}</title>
      </Head>
      <div className="flex items-center justify-center align-middle">
      <div className=" h-screen w-full mx-24 pt-12 flex flex-row align-middle justify-center gap-5">
        <div className="my-6">
            <AppBoxStatic  data={appName} />
        </div>
        <div className="flex flex-col gap-12 items-center justify-center w-[1000px]">
            <div>
                {/* graph  */}
                <ChartExample appName={appName} height={"400px"} width={"915px"}/>
            </div>
            <div className="flex flex-row justify-between gap-6">
                <div>
                    <AddPolicy />
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