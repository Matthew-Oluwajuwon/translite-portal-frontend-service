/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */

import { Outlet } from "react-router-dom"
import Logo from "../../assets/images/logo.svg"
import Drag from "../../assets/icons/drag.svg"
import DragOut from "../../assets/icons/drag-out.svg"
import { Drawer, Menu } from "antd"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import ShortLogo from "../../assets/icons/short-logo.svg"
import { MenuItems } from "../components/menu-items"
import useToggle from "../../custom-hooks/useToggle"
import dropdown from "../../assets/icons/dropdown.svg"
import useWindowResize from "../../custom-hooks/useWindowResize"
import menuIcon from "../../assets/icons/menu.svg"
import { useEffect } from "react"
import { setAllGlobalKey } from "../../store"
import { apiEndpoints } from "../../store/apiEndpoints"

const PageLayout: React.FC = () => {
  const dispatch = useAppDispatch()
  const state = useAppSelector((state) => {
    return state.global
  })

  const { toggleMenu, toggleOpenMenuDrawer } = useToggle()
  const { windowWidth } = useWindowResize()

  useEffect(() => {
    dispatch(
      setAllGlobalKey({
        ...state,
        getUrl: apiEndpoints.auth.getAdminUser,
      }),
    )
  }, [dispatch])

  return (
    // <Spin spinning={isLoading}>
    <main className="min-h-[100svh] relative">
      <aside
        className={`bg-[#1C166A] ${
          state.menuCollapsed ? "w-[6rem] px-0" : "w-[6rem] lg:w-[15.5rem]"
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
                state.menuCollapsed ? "left-[4rem]" : "left-[9.5rem]"
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
            onClick={() =>
              dispatch(
                setAllGlobalKey({
                  ...state,
                  showLogoutModal: false,
                  terminal: {
                    ...state.terminal,
                    isSingleCreation: false,
                    showCreateModal: false,
                  },
                  transactionRouting: {
                    ...state.transactionRouting,
                    showAddNewRuleModal: false,
                  },
                }),
              )
            }
          />
        </div>
      </aside>
      <section
        className={`bg-[#F5F6FA] min-h-screen px-3 lg:px-10 ${
          state.menuCollapsed
            ? "ml-0 md:ml-[6rem]"
            : "ml-0 md:ml-[6rem] lg:ml-[15.5rem]"
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
          <div className="flex items-center gap-2">
            <img
              src={dropdown}
              alt=""
              className="cursor-pointer hover:scale-110 transition-all"
            />
            <span className="bg-[#79CDCE] w-[2.7rem] h-[2.7rem] text-[#ffffff] rounded-full flex items-center justify-center">
              JA
            </span>
          </div>
        </header>
        <section className="overflow-auto">
          <Outlet />
        </section>
        <footer className="text-center text-[#BEBFC8] py-5 fixed right-[50%] left-[50%] w-max bottom-2">
          Translite from Tegritech<sup>TM</sup> © 2022
        </footer>
      </section>
    </main>
    // </Spin>
  )
}

export default PageLayout
