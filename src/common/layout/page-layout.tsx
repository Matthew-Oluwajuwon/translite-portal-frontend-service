/* eslint-disable prettier/prettier */

import { Outlet } from "react-router-dom"
import Logo from "../../assets/images/logo.svg"
import Drag from "../../assets/icons/drag.svg"
import DragOut from "../../assets/icons/drag-out.svg"
import { Menu } from "antd"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import ShortLogo from "../../assets/icons/short-logo.svg"
import { MenuItems } from "../components/menu-items"
import useToggle from "../../custom-hooks/useToggle"
import dropdown from "../../assets/icons/dropdown.svg"
import useWindowResize from "../../custom-hooks/useWindowResize"
// import menuIcon from "../../assets/icons/menu.svg"

const PageLayout: React.FC = () => {
  const dispatch = useAppDispatch()
  const state = useAppSelector((state) => {
    return state.global
  })

  const { toggleMenu } = useToggle(state, dispatch)

  const { windowWidth } = useWindowResize()

  return (
    <main className="min-h-[100svh] relative">
      <aside
        className={`bg-[#1C166A] ${
          state.menuCollapsed ? "w-[6rem] px-0" : "w-[6rem] lg:w-[17rem]"
        } hidden md:block h-screen px-[1rem] fixed left-0`}
      >
        <div
          className={`flex items-center relative top-7 mb-[6rem] px-5 justify-between ${
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
                state.menuCollapsed ? "left-[4rem]" : "left-[11.5rem]"
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
          />
        </div>
      </aside>
      <section
        className={`bg-[#F5F6FA] min-h-screen px-3 lg:px-10 ${
          state.menuCollapsed
            ? "ml-0 md:ml-[6rem]"
            : "ml-0 md:ml-[6rem] lg:ml-[17rem]"
        }`}
      >
        <header className="flex items-center z-50 backdrop-blur-sm bg-opacity-50 justify-between py-5 sticky top-0 bg-[#F5F6FA]">
          <div className="grid gap-2">
            <h1 className="text-[#272848] font-[poppins-600]">
              {state.pageTitle}
            </h1>
            <p className="breadcrumb-before text-[#717E95] font-medium text-[0.8rem]">
              {state.breadcrumb}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <img src={dropdown} alt="" />
            <span className="bg-[#79CDCE] w-[2.7rem] h-[2.7rem] text-[#ffffff] rounded-full flex items-center justify-center">
              JA
            </span>
          </div>
        </header>
        <section className="overflow-auto">
          <Outlet />
        </section>
        <footer className="text-center text-[#BEBFC8] py-8">Translite from Tegritech<sup>TM</sup> © 2022</footer>
      </section>
    </main>
  )
}

export default PageLayout
