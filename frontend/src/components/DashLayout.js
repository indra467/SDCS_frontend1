import { Outlet } from "react-router-dom";
import DashHeader from "./DashHeader";
import DashFooter from "./DashFooter";
import { Layout } from "antd";
import Sidebar from "./Sidebar";
import { useState } from "react";

const DashLayout = () => {
  const [collapsed,setCollapsed] = useState(false);
  const changeCollapse=()=>{
    setCollapsed(!collapsed);
  }
  return (
    <Layout>
      <Sidebar collapse={collapsed}/>
      <Layout>
        <DashHeader collapse={collapsed} changeCollapse={changeCollapse}/>
        <div className="dash-container">
          <Outlet />
        </div>
        <DashFooter />
      </Layout>
    </Layout>
  );
};
export default DashLayout;
