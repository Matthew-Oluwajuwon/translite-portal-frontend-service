/* eslint-disable prettier/prettier */
import { MenuProps } from "antd"
import { MENU_KEYS, MENU_NAMES, ROUTE } from "../constants"
import { NavLink } from "react-router-dom"
import Home from "../../assets/icons/Home.svg"
import Profile from "../../assets/icons/profile.svg"
import Transaction from "../../assets/icons/transaction.svg"
import Terminal from "../../assets/icons/Сalculator.svg"
import Setting from "../../assets/icons/settings.svg"
import User from "../../assets/icons/user.svg"
import Processor from "../../assets/icons/processor.svg"

type MenuItem = Required<MenuProps>["items"][number]
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

export const MenuItems: MenuProps["items"] = [
  getItem(
    <NavLink to={ROUTE.DASHBOARD}>{MENU_NAMES.DASHBOARD}</NavLink>,
    MENU_KEYS.DASHBOARD,
    <img src={Home} alt="" />,
  ),

  getItem(
    <NavLink to={ROUTE.PROFILE}>{MENU_NAMES.PROFILE}</NavLink>,
    MENU_KEYS.PROFILE,
    <img src={Profile} alt="" />,
  ),
  { type: "divider" },
  getItem(
    MENU_NAMES.USER_MGT,
    MENU_KEYS.USER_MGT,
    <img src={User} alt="" className="" />,
    [
      getItem(
        <NavLink to={ROUTE.SYSTEM_USERS}>{MENU_NAMES.SYSTEM_USERS}</NavLink>,
        MENU_KEYS.SYSTEM_USERS,
      ),
      getItem(
        <span className={"cursor-not-allowed text-[#c4c4c4]"}>
          {MENU_NAMES.ROLES}
          <span className="rounded-3xl bg-[#E59600] ml-2 p-1 px-2 text-[0.7rem] text-white">
            Upcoming
          </span>
        </span>,
        MENU_KEYS.ROLES,
      ),
      getItem(
        <span className={"cursor-not-allowed text-[#c4c4c4]"}>
          {MENU_NAMES.PERMISSION}
          <span className="rounded-3xl bg-[#E59600] ml-2 p-1 px-2 text-[0.7rem] text-white">
            Upcoming
          </span>
        </span>,
        MENU_KEYS.PERMISSION,
      ),
    ],
  ),
  getItem(
    <NavLink to={ROUTE.TRANSACTION}>{MENU_NAMES.TRANSACTION}</NavLink>,
    MENU_KEYS.TRANSACTION,
    <img src={Transaction} alt="" className="w-7 -ml-1" />,
  ),
  getItem(
    MENU_NAMES.TERMINAL_MGT,
    MENU_KEYS.TERMINAL_MGT,
    <img src={Terminal} alt="" className="mr-1 w-5" />,
    [
      getItem(
        <NavLink to={ROUTE.SYSTEM_TERMINAL_MGT}>
          {MENU_NAMES.SYSTEM_TERMINAL_MGT}
        </NavLink>,
        MENU_KEYS.SYSTEM_TERMINAL_MGT,
      ),
      getItem(
        <NavLink to={ROUTE.PROCESSOR_TERMINAL_MGT}>
          {MENU_NAMES.PROCESSOR_TERMINAL_MGT}
        </NavLink>,
        MENU_KEYS.PROCESSOR_TERMINAL_MGT,
      ),
    ],
  ),
  getItem(
    MENU_NAMES.CONFIGURATIONS,
    MENU_KEYS.CONFIGURATIONS,
    <img src={Setting} alt="" className="-mr-3 w-10 -mb-2 -ml-1" />,
    [
      getItem(
        <NavLink to={ROUTE.TRANSACTION_ROUTING}>
          {MENU_NAMES.TRANSACTION_ROUTING}
        </NavLink>,
        MENU_KEYS.TRANSACTION_ROUTING,
      ),
      getItem(
        <NavLink to={ROUTE.CHARGE_CONFIGURATION}>
          {MENU_NAMES.CHARGE_CONFIGURATION}
        </NavLink>,
        MENU_KEYS.CHARGE_CONFIGURATION,
      ),
    ],
  ),
  getItem(
    <NavLink to={ROUTE.PROCESSOR}>{MENU_NAMES.PROCESSOR}</NavLink>,
    MENU_KEYS.PROCESSOR,
    <img src={Processor} alt="" className="w-6" />,
  ),
]
