import { useRouter } from "next/router";
import Head from "next/head";
import Layout from "../../layout";
import { useDispatch, useSelector } from "react-redux";
import { selectIp } from "@/store/features/ipSlice";
import { useState } from "react";
import GlobalPolicy from "@/Props/GlobalPolicy";
import GlobalExistingPolicy from "@/Props/GlobalExisting";

export default function DashboardPage() {
  const router = useRouter();

  const [rules, setRules] = useState([])
  // Define app-specific titles and details


  return (
    <Layout>
      {/* Dynamic Page Title */}
      <Head>
        <title>Global Blocking</title>
      </Head>
      <div className=" h-screen w-full flex items-center justify-center ">
      <div className="pt-12 flex flex-col  justify-center gap-2">
        <div className="flex flex-col gap-12 items-center justify-center w-[100%]">
            <div className="flex flex-row justify-between gap-6">
                <div>
                    <GlobalPolicy />
                </div>
                <div>
                    {/* define existing policy apis to change or to view */}
                    {/* multiple apis list need to mapped as dta of apis is not available just one demo policy is shown */}
                    <GlobalExistingPolicy policy={"lorem epsom"} url={`/path/`}/>
                </div>
            </div>
        </div>
      </div>

      </div>
    </Layout>
  );
}