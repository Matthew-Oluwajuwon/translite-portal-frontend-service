/* eslint-disable prettier/prettier */
import { useState } from "react"
import { PageProps } from "../../model/application/props"
import Logo from "../../assets/images/logo.svg"
import Drag from "../../assets/icons/drag.svg"
import { Drawer, Menu, MenuProps } from "antd"
import { NavLink } from "react-router-dom"
import Home from "../../assets/icons/Home.svg"
import Profile from "../../assets/icons/profile.svg"
import Transaction from "../../assets/icons/transaction.svg"
import Terminal from "../../assets/icons/Сalculator.svg"
import Setting from "../../assets/icons/settings.svg"
import Dot from "../../assets/icons/dot.svg"
import ShortLogo from "../../assets/icons/short-logo.svg"
import DragOut from "../../assets/icons/drag-out.svg"
// import { IoIosArrowDown } from "react-icons/io";
// import { FiMenu } from "react-icons/fi"

export const PageLayout: React.FC<PageProps.PageLayoutProps> = ({
  children,
  pageTitle,
  defaultSelectedKeys,
  defaultOpenKeys,
  breadcrumb,
}) => {
  const [openSideMenu, setOpenSideMenu] = useState(true)
  const [openDrawer, setopenDrawer] = useState(false)
  type MenuItem = Required<MenuProps>["items"][number]
  function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group",
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem
  }

  const MenuItems: MenuItem[] = [
    getItem(
      <NavLink to={"/home/dashboard"}>
        {openSideMenu ? "Dashboard" : ""}
      </NavLink>,
      "01",
      <img src={Home} className={`${openSideMenu ? "" : "w-5"}`} alt="home" />,
    ),
    getItem(
      <NavLink to={"/home/profile"}>{openSideMenu ? "Profile" : ""}</NavLink>,
      "02",
      <img
        src={Profile}
        className={`${openSideMenu ? "" : "w-5"}`}
        alt="profile"
      />,
    ),
  ]
  const TranMenu: MenuItem[] = [
    getItem(
      <NavLink to={"/home/transaction-management"}>
        {openSideMenu ? "Transactions" : ""}
      </NavLink>,
      "03",
      <img
        src={Transaction}
        className={`${openSideMenu ? "" : "w-5"}`}
        alt="transactions"
      />,
    ),
    getItem(
      <NavLink to={"/home/terminal-management"}>
        {openSideMenu ? "Terminals Mgt." : ""}
      </NavLink>,
      "04",
      <img
        src={Terminal}
        className={`${openSideMenu ? "" : "w-5"}`}
        alt="terminal"
      />,
    ),
    getItem(
      <NavLink to={"/home/configurations"}>
        {openSideMenu ? "Configurations" : ""}
      </NavLink>,
      "1",
      <img
        src={Setting}
        className={`${openSideMenu ? "" : "w-5"}`}
        alt="settings"
      />,
      [
        getItem(
          <NavLink to={"#"}>Transaction Routing</NavLink>,
          "05",
          <img
            src={Dot}
            className={`${openSideMenu ? "" : "w-5"}`}
            alt="dot"
          />,
        ),
        getItem(
          <NavLink to={"#"}>Charge Configuration</NavLink>,
          "06",
          <img
            src={Dot}
            className={`${openSideMenu ? "" : "w-5"}`}
            alt="dot"
          />,
        ),
      ],
    ),
  ]

  return (
    <div
      className={`h-[100svh] grid grid-cols-1 ${
        openSideMenu ? "lg:grid-cols-[16rem_1fr]" : "lg:grid-cols-[5rem_1fr]"
      }`}
    >
      <nav
        className={`bg-[#1C166A] hidden lg:block ${
          openSideMenu ? "px-5" : "px-0"
        } transition-all`}
      >
        <div
          className={`flex justify-between items-center h-20 ${
            openSideMenu ? "" : "relative"
          }`}
        >
          <img
            src={openSideMenu ? Logo : ShortLogo}
            alt="logo"
            className={`${openSideMenu ? "mx-0" : "mx-auto"}`}
          />
        </div>
        <div
          className={`my-20 ${openSideMenu ? "" : "-ml-3"} ${
            openSideMenu ? "px-2" : "px-1"
          }`}
        >
          <Menu
            mode={openSideMenu ? "inline" : "vertical"}
            className={`bg-[#1C166A] text-[#ffffff] ${
              openSideMenu ? "" : "pl-[0.8rem]"
            } text-[0.8rem]`}
            theme="light"
            items={MenuItems}
            defaultSelectedKeys={defaultSelectedKeys as any}
          />
          <hr className="border-[#504f4f] my-3" />
          <Menu
            mode={openSideMenu ? "inline" : "vertical"}
            className={`bg-[#1C166A] text-[#ffffff] ${
              openSideMenu ? "" : "pl-[0.5rem]"
            } text-[0.8rem]`}
            theme="light"
            items={TranMenu}
            defaultSelectedKeys={defaultSelectedKeys as any}
          />
        </div>
      </nav>
      <Drawer
        open={openDrawer}
        onClose={() => setopenDrawer(!openDrawer)}
        width={"70%"}
        className="bg-[#1C166A!important]"
      >
        <div className={`flex justify-between items-center h-20 -my-10`}>
          <img
            src={Logo}
            alt="logo"
            className={`${openSideMenu ? "mx-0" : "mx-auto"}`}
          />
          <img
            src={openSideMenu ? Drag : DragOut}
            alt="drag"
            onClick={() => setOpenSideMenu(!openSideMenu)}
            className={`hover:scale-90 cursor-pointer w-fit z-20`}
          />
        </div>
        <div className={`my-20 `}>
          <Menu
            // mode={openSideMenu ? "inline" : "vertical"}
            className={`bg-[#1C166A] text-[#ffffff] text-[0.8rem]`}
            theme="light"
            items={MenuItems}
            defaultSelectedKeys={defaultSelectedKeys as any}
          />
          <hr className="border-[#504f4f] my-3" />
          <Menu
            // mode={openSideMenu ? "inline" : "vertical"}
            className={`bg-[#1C166A] text-[#ffffff] ${
              openSideMenu ? "" : "pl-[0.5rem]"
            } text-[0.8rem]`}
            theme="light"
            items={TranMenu}
            defaultSelectedKeys={defaultSelectedKeys as any}
          />
        </div>
      </Drawer>
      <div className="grid grid-rows-[6rem_1fr] px-3 lg:px-10 bg-[#F5F6FA] overflow-auto">
        <header className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            {/* <FiMenu onClick={() => setopenDrawer(!openDrawer)} className="text-3xl block lg:hidden" /> */}
            <div className="grid gap-2">
              <h1 className="text-[#272848] font-bold">{pageTitle}</h1>
              {breadcrumb}
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 cursor-pointer">
            {/* <IoIosArrowDown /> */}
            <span className="bg-[#79CDCE] w-[2.7rem] h-[2.7rem] text-[#ffffff] rounded-full flex items-center justify-center">
              JA
            </span>
          </div>
        </header>
        <main className="overflow-x-auto">
          {children}
          <div className="flex justify-center items-center py-5 text-[#cac7c7]">
            Translite from TegritechTM © 2022
          </div>
        </main>
      </div>
    </div>
  )
}
