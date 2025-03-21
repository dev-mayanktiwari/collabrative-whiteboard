import Layout from "~/components/providers/Layout";
import DashboardFull from "~/components/dashboard/DashboardComp";

const Dashboard = () => {
  return (
    <div className="bg-bg">
      <Layout>
        <DashboardFull />
      </Layout>
    </div>
  );
};

export default Dashboard;
