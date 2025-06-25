// import CountDashboard from "@/component/Dashboard/CountDashboard";
import CountDashboardWrapper from "@/component/Dashboard/CountDashboardWrapper";
import Layout from "@/component/Layout/layout";
import dynamic from "next/dynamic";
import { ToastContainer } from "react-toastify";

const Home = () => {
  return (
    <Layout>
      <CountDashboardWrapper />
      <ToastContainer position="top-right" autoClose={3000} />
    </Layout>
  );
};
export default Home;
