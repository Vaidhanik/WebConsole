import SidebarProp from '@/Props/Sidebar';
import DashboardProp from '@/Props/DashBoard';
import TopBarProp from '@/Props/TopBar';
import Layout from './layout';

const DashBoard = () => {
  return (
    <Layout>

    <div className="flex h-screen w-full">
      <div className="flex-1 flex flex-col">
        <TopBarProp />
        <DashboardProp />
      </div>
    </div>
    </Layout>
    )
}

export default DashBoard


