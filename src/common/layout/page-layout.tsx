/* eslint-disable prettier/prettier */

import { NavLink, Outlet, useLocation } from "react-router-dom"
import Logo from "../../assets/images/logo.svg"
import Home from "../../assets/icons/Home.svg"
import Drag from "../../assets/icons/drag.svg"
import DragOut from "../../assets/icons/drag-out.svg"
import type { MenuProps } from "antd"
import { Menu } from "antd"
import { ROUTE } from "../../routes"
import Profile from "../../assets/icons/profile.svg"
import Transaction from "../../assets/icons/transaction.svg"
import Terminal from "../../assets/icons/Сalculator.svg"
import Setting from "../../assets/icons/settings.svg"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { useCallback } from "react"
import { setGlobalKey } from "../../store"
import ShortLogo from "../../assets/icons/short-logo.svg"

const PageLayout: React.FC = () => {
  type MenuItem = Required<MenuProps>["items"][number]
  const dispatch = useAppDispatch()
  const state = useAppSelector((state) => {
    return state.global
  })
  const location = useLocation()

  function getItem(
    label: React.ReactNode,
    key: React.Key,
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

  const items: MenuProps["items"] = [
    getItem(
      <NavLink state={{ selectedKey: "1" }} to={ROUTE.DASHBOARD}>
        Dashboard
      </NavLink>,
      "1",
      <img src={Home} alt="" />,
    ),

    getItem(
      <NavLink state={{ selectedKey: "2" }} to={ROUTE.DASHBOARD}>
        Profile
      </NavLink>,
      "2",
      <img src={Profile} alt="" />,
    ),
    { type: "divider", className: "border-1 border border-[#c4c4c4]" },
    getItem(
      <NavLink state={{ selectedKey: "3" }} to={ROUTE.DASHBOARD}>
        Transaction
      </NavLink>,
      "3",
      <img src={Transaction} alt="" />,
    ),
    getItem(
      <NavLink state={{ selectedKey: "4" }} to={ROUTE.DASHBOARD}>
        Terminals Mgt.
      </NavLink>,
      "4",
      <img src={Terminal} alt="" />,
    ),
    getItem("Configurations", "5", <img src={Setting} alt="" />, [
      getItem(
        <NavLink state={{ selectedKey: "01" }} to={ROUTE.DASHBOARD}>
          Transaction routing
        </NavLink>,
        "01",
      ),
      getItem(
        <NavLink state={{ selectedKey: "02" }} to={ROUTE.DASHBOARD}>
          Charge configurations
        </NavLink>,
        "02",
      ),
    ]),
  ]

  const toggleMenu = useCallback(() => {
    dispatch(
      setGlobalKey({
        key: "menuCollapsed",
        value: !state.menuCollapsed,
      }),
    )
  }, [dispatch, state.menuCollapsed])

  return (
    <main className="min-h-[100svh] relative">
      <aside
        className={`bg-[#1C166A] ${
          state.menuCollapsed ? "w-[8rem] py-7" : "w-[17rem]"
        } h-screen px-[1rem] fixed left-0`}
      >
        <div
          className={`flex items-center justify-between ${
            state.menuCollapsed && "relative mb-10"
          }`}
        >
          <img src={state.menuCollapsed ? ShortLogo : Logo} alt="" />
          <img
            src={state.menuCollapsed ? DragOut : Drag}
            alt=""
            className={`hover:scale-110 hover:transition-all cursor-pointer ${
              state.menuCollapsed && "absolute left-24"
            }`}
            onClick={toggleMenu}
          />
        </div>
        <div>
          <Menu
            defaultSelectedKeys={[location.state.selectedKey]}
            // defaultOpenKeys={["sub1"]}
            className="bg-[#1C166A] text-[#ffffff]"
            mode="inline"
            items={items}
            inlineCollapsed={state.menuCollapsed}
          />
        </div>
      </aside>
      <section className="bg-[#F5F6FA] h-screen ml-[17rem]">
        <Outlet />
      </section>
    </main>
  )
}

export default PageLayout
