import {
  ApiOutlined,
  LogoutOutlined,
  MailOutlined,
  NotificationOutlined,
  SettingOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useTitle from "../hooks/useTitle";
import Styles from './DashHeader.module.css'

const { Sider } = Layout;
const Sidebar = ({ collapse }) => {
  const { username, isManager, isAdmin, isSales_Employee } = useAuth();
  const navigate = useNavigate();
  useTitle(`techNotes: ${username}`);

  let item = [];
  if (isSales_Employee) {
    item = [
      {
        key: "1",
        icon: <MailOutlined />,
        label: "Message",
      },
      {
        key: "2",
        icon: <NotificationOutlined />,
        label: "Notifications",
      },
      {
        key: "3",
        icon: <ApiOutlined />,
        label: "Functions",
      }
    ];
  } else if (isManager) {
    item = [
      {
        key: "4",
        icon: <SettingOutlined />,
        label: "View User Settings",
      },
      {
        key: "5",
        icon: <UserAddOutlined />,
        label: "Add New User",
      }      
    ];
  } else if (isAdmin) {
    item = [
      {
        key: "1",
        icon: <MailOutlined />,
        label: "Message",
      },
      {
        key: "2",
        icon: <NotificationOutlined />,
        label: "Notifications",
      },
      {
        key: "3",
        icon: <ApiOutlined />,
        label: "Functions",
      },
      {
        key: "4",
        icon: <SettingOutlined />,
        label: "View User Settings",
      },
      {
        key: "5",
        icon: <UserAddOutlined />,
        label: "Add New User",
      }
    ];
  }

  const open=(key)=>{
    if(key==2)
    navigate("/dash/users")
    else if(key==3)
    navigate("/dash/notes/sales")
    else if(key==4)
    navigate("/dash/users")
    else if(key==5)
    navigate("/dash/users/new")
    else if(key==1)
    window.open("https://indra467.github.io/NLP-Implemented-Chatbot/")
  };
  return (
    <Sider trigger={null} collapsible collapsed={collapse} breakpoint="lg" collapsedWidth={0}>
      <div className="company_logo mb-2">
        <img src="./img/SDG_Logo.png" className="w-100"></img>
      </div>
      <div className="px-4 d-flex flex-row align-items-center justify-content-start">
        <UserOutlined className="h5 pr-2" />
        {!collapse && <span className="h6 text-normal m-0">
          {isAdmin ? "Admin" : isSales_Employee ? "Employee" : "Manager"}
        </span>}
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[]}
        onSelect={({ key }) => open(key)}
        items={item}
      />
    </Sider>
  );
};

export default Sidebar;
