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

  // Define app-specific titles and details
  /*
  Id
  app_name,
  taget
  target_type,
  resolved_ips
  */
  //api call to get all data from the backend
  const dispatch = useDispatch();
  const currentIp = useSelector(selectIp);

 const dummy_policy = {
   Id: 12,
   app_name: "Chrome",
   target: "x.com",
   target_type: "domain",
   resolved_ips: ["fnerknf", "feldkfnme", "felfn"]
 }
  const [rules, setRules] = useState([dummy_policy])

  const getAllRules = async ()=>{
    if(!currentIp) return;
    try{

    const url = "https://"+currentIp+":5000/get_active_rules/"+{appName};
    const response = await fetch(url);
    const result = await response.json();

    setRules(res);
  }catch(err){
    res.status(500).json({"error": "could not get all data"})
  }
} 



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
                    {
                      rules.map((rule) => {
                        return (
                          <ExistingPolicy policy={rule} />
                        );
                      })
                    }
                </div>
            </div>
        </div>
      </div>

      </div>
    </Layout>
  );
}