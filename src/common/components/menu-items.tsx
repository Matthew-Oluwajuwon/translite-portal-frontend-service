/* eslint-disable prettier/prettier */
import { MenuProps } from "antd"
import { MENU_KEYS, MENU_NAMES, ROUTE } from "../constants"
import { NavLink } from "react-router-dom"
import Home from "../../assets/icons/Home.svg"
import Profile from "../../assets/icons/profile.svg"
import Transaction from "../../assets/icons/transaction.svg"
import Terminal from "../../assets/icons/Сalculator.svg"
import Setting from "../../assets/icons/settings.svg"

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
    <NavLink to={ROUTE.TRANSACTION}>{MENU_NAMES.TRANSACTION}</NavLink>,
    MENU_KEYS.TRANSACTION,
    <img src={Transaction} alt="" />,
  ),
  getItem(
    <NavLink to={ROUTE.TERMINAL_MGT}>{MENU_NAMES.TERMINAL_MGT}</NavLink>,
    MENU_KEYS.TERMINAL_MGT,
    <img src={Terminal} alt="" />,
  ),
  getItem(
    MENU_NAMES.CONFIGURATIONS,
    MENU_KEYS.CONFIGURATIONS,
    <img src={Setting} alt="" />,
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
]
