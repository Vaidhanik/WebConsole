import { useRouter } from "next/router";
import Head from "next/head";
import Layout from "../layout";
import AppBoxStatic from "@/Props/AppBoxStatic";

export default function DashboardPage() {
  const router = useRouter();
  const { appName } = router.query; // Get the dynamic route parameter

  // Define app-specific titles and details
  const appDetails = {
    app1: { title: "Dashboard - App 1", description: "Details for App 1" },
    app2: { title: "Dashboard - App 2", description: "Details for App 2" },
    default: { title: "Dashboard", description: "Generic dashboard view" },
  };

  // Fetch the app-specific details or use the default
  const { title, description } = appDetails[appName] || appDetails.default;
  const appData ={title,description}

  return (
    <Layout>
      {/* Dynamic Page Title */}
      <Head>
        <title>{title}</title>
      </Head>
      <div>
        <div>
            <AppBoxStatic data={appData} />
        </div>
        <div>

        </div>
      </div>

    </Layout>
  );
}