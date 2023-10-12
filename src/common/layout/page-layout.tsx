/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */

import { Outlet, useNavigate } from "react-router-dom"
import Logo from "../../assets/images/logo.svg"
import Drag from "../../assets/icons/drag.svg"
import DragOut from "../../assets/icons/drag-out.svg"
import { Drawer, Menu, MenuProps } from "antd"
import { useAppSelector } from "../../store/hooks"
import ShortLogo from "../../assets/icons/short-logo.svg"
import { MenuItems } from "../components/menu-items"
import useToggle from "../../custom-hooks/useToggle"
import dropdown from "../../assets/icons/dropdown.svg"
import useWindowResize from "../../custom-hooks/useWindowResize"
import menuIcon from "../../assets/icons/menu.svg"
import { useEffect, useState } from "react"
import { MENU_KEYS, ROUTE } from "@common/constants"
import useUserInfo from "../../custom-hooks/useUserInfo"
import { Logout } from "@common/components/logout"
import Log from "../../assets/icons/Logout.svg"
import { Encryption } from "@common/utils/encryption"

const PageLayout: React.FC = () => {
  const state = useAppSelector((state) => {
    return state.global
  })
  const [showLogoutButton, setShowLogoutButton] = useState<boolean>(false)
  const {
    toggleMenu,
    toggleOpenMenuDrawer,
    closeAllOpenModal,
    handleLogout,
    toggleLogoutModal,
  } = useToggle()
  const { windowWidth } = useWindowResize()
  const navigate = useNavigate()
  const [userInfo] = useUserInfo()

  useEffect(() => {
    if (!JSON.parse(JSON.parse(
      Encryption.decrypt(localStorage.getItem("***") as string)))) {
      return navigate(ROUTE.INDEX, { replace: true })
    }
  }, [])

  const toggleLogoutButton = () => {
    setShowLogoutButton(!showLogoutButton)
  }

  // submenu keys of first level
  const rootSubmenuKeys = [
    MENU_KEYS.USER_MGT,
    MENU_KEYS.TERMINAL_MGT,
    MENU_KEYS.CONFIGURATIONS,
  ]

  const [openKeys, setOpenKeys] = useState([MENU_KEYS.CONFIGURATIONS])
  const onOpenChange: MenuProps["onOpenChange"] = (keys) => {
    const latestOpenKey = keys.find(
      (key) => openKeys.indexOf(key as any) === -1,
    )
    if (rootSubmenuKeys.indexOf(latestOpenKey! as any) === -1) {
      setOpenKeys(keys as any)
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : ([] as any))
    }
  }

  return (
    <main className="min-h-[100svh] relative flex flex-col">
      <aside
        className={`bg-[#1C166A] overflow-auto ${
          state.menuCollapsed ? "w-[6rem] px-0" : "w-[6rem] lg:w-[17.5rem]"
        } hidden md:block h-screen px-[1rem] fixed left-0`}
      >
        <div
          className={`flex items-center relative top-7 mb-[6rem] px-2 justify-between ${
            state.menuCollapsed && "top-5"
          }`}
        >
          <img
            src={state.menuCollapsed ? ShortLogo : Logo}
            alt=""
            className={state.menuCollapsed ? "mx-auto" : ""}
          />
          {(windowWidth > 768 && windowWidth < 1024) || (
            <img
              src={state.menuCollapsed ? DragOut : Drag}
              alt=""
              className={`hover:scale-110 absolute hover:transition-all cursor-pointer ${
                state.menuCollapsed ? "left-[4rem]" : "left-[10.5rem]"
              }`}
              onClick={toggleMenu}
            />
          )}
        </div>
        <div>
          <Menu
            defaultSelectedKeys={[state.selectedKey]}
            selectedKeys={[state.selectedKey]}
            className={`bg-[#1C166A] font-[poppins-500] font-medium ${
              state.menuCollapsed && "w-[4rem]"
            }`}
            mode="inline"
            items={MenuItems}
            inlineCollapsed={state.menuCollapsed}
            onClick={() => closeAllOpenModal(state)}
            onOpenChange={onOpenChange}
            openKeys={openKeys}
            defaultOpenKeys={[MENU_KEYS.CONFIGURATIONS]}
          />
        </div>
      </aside>
      <section
        className={`bg-[#F5F6FA] min-h-screen px-3 lg:px-10 relative ${
          state.menuCollapsed
            ? "ml-0 md:ml-[6rem]"
            : "ml-0 md:ml-[6rem] lg:ml-[17.5rem]"
        }`}
      >
        <header className="flex items-center z-50 backdrop-blur-sm bg-opacity-50 justify-between py-5 sticky top-0 bg-[#F5F6FA]">
          <div className="flex items-start gap-2">
            <img
              src={menuIcon}
              alt=""
              className="w-7 block md:hidden"
              onClick={toggleOpenMenuDrawer}
            />
            <div className="grid gap-2">
              <h1 className="text-[#272848] font-[poppins-600]">
                {state.pageTitle}
              </h1>
              <p className="breadcrumb-before text-[#717E95] font-medium text-[0.8rem]">
                {state.breadcrumb}
              </p>
            </div>
            <Drawer
              open={state.openMenuDrawer}
              width="65%"
              closable={false}
              className="bg-[#1C166A!important]"
            >
              <div
                className={`flex items-center relative  mb-[4rem] px-2 justify-between ${
                  state.menuCollapsed && "top-5"
                }`}
              >
                <img
                  src={state.menuCollapsed ? ShortLogo : Logo}
                  alt=""
                  className={state.menuCollapsed ? "mx-auto" : ""}
                />
                <img
                  src={state.menuCollapsed ? DragOut : Drag}
                  alt=""
                  className={`hover:scale-110 absolute hover:transition-all cursor-pointer ${
                    state.menuCollapsed ? "left-[4rem]" : "left-[9.5rem]"
                  }`}
                  onClick={toggleOpenMenuDrawer}
                />
              </div>
              <div>
                <Menu
                  defaultSelectedKeys={[state.selectedKey]}
                  selectedKeys={[state.selectedKey]}
                  className={`bg-[#1C166A] font-[poppins-500] font-medium ${
                    state.menuCollapsed && "w-[4rem]"
                  }`}
                  mode="inline"
                  items={MenuItems}
                  inlineCollapsed={state.menuCollapsed}
                  onClick={toggleOpenMenuDrawer}
                />
              </div>
            </Drawer>
          </div>
          <div
            className="flex items-center gap-2 cursor-pointer hover:scale-110 transition-all"
            onClick={toggleLogoutButton}
          >
            {showLogoutButton && (
              <div>
                <button
                  onClick={toggleLogoutModal}
                  className="flex items-center justify-center gap-1 py-3 px-3 rounded-md text-[#FF291F] bg-[#FFF0F4] cursor-pointer hover:shadow-md hover:scale-110 transition-all text-[0.8rem]"
                >
                  <img src={Log} alt="logout" />
                  <p className="hidden md:block">Log Out</p>
                </button>
              </div>
            )}
            <img
              src={dropdown}
              alt=""
              className="cursor-pointer hover:scale-110 transition-all"
            />
            <span className="bg-[#79CDCE] w-[2.7rem] h-[2.7rem] text-[#ffffff] rounded-full flex items-center justify-center">
              {userInfo.firstName?.toUpperCase().charAt(0)}
              {userInfo.lastName?.toUpperCase().charAt(0)}
            </span>
          </div>
          {state.showLogoutModal && (
            <Logout
              openModal={state.showLogoutModal}
              onCancel={toggleLogoutModal}
              onClick={handleLogout}
            />
          )}
        </header>
        <section className="overflow-auto flex-grow">
          <Outlet />
        </section>
        <footer className="text-center text-[#BEBFC8] py-5">
          Translite from Tegritech<sup>TM</sup> © 2022
        </footer>
      </section>
    </main>
  )
}

export default PageLayout
