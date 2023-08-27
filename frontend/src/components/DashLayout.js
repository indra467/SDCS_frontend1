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
    <Layout className={`vh-100 ${Styles.container} overflow-hidden`}>
      <Sidebar collapse={collapsed}/>
      <Layout className={`${Styles.container} vh-100 overflow-y-scroll`}>
        <DashHeader collapse={collapsed} changeCollapse={changeCollapse}/>
          <Outlet />
        <DashFooter />
      </Layout>
    </Layout>
  );
};
export default DashLayout;
