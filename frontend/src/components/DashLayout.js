import { Outlet } from "react-router-dom";
import DashHeader from "./DashHeader";
import DashFooter from "./DashFooter";
import { Layout } from "antd";
import Sidebar from "./Sidebar";
import { useState } from "react";
import Styles from "./DashHeader.module.css"
const DashLayout = () => {
  const [collapsed,setCollapsed] = useState(false);
  const changeCollapse=()=>{
    setCollapsed(!collapsed);
  }
  return (
    <Layout className={`${Styles.container}`}>
      <Sidebar collapse={collapsed}/>
      <Layout>
        <DashHeader collapse={collapsed} changeCollapse={changeCollapse}/>
        <div className={`${Styles.dash_container} bg-dark`}>
          <Outlet />
        </div>
        <DashFooter />
      </Layout>
    </Layout>
  );
};
export default DashLayout;
