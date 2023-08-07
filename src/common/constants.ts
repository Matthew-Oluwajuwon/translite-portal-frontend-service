/* eslint-disable prettier/prettier */
export enum MENU_KEYS {
  DASHBOARD = "1",
  PROFILE = "2",
  TRANSACTION = "3",
  TERMINAL_MGT = "4",
  CONFIGURATIONS = "5",
  TRANSACTION_ROUTING = "01",
  CHARGE_CONFIGURATION = "02",
}

export enum MENU_NAMES {
  DASHBOARD = "Dashboard",
  PROFILE = "Profile",
  TRANSACTION = "Transaction",
  TERMINAL_MGT = "Terminals Mgt.",
  CONFIGURATIONS = "Configurations",
  TRANSACTION_ROUTING = "Transaction routing",
  CHARGE_CONFIGURATION = "Charge configurations",
}

export enum ROUTE {
  INDEX = "/",
  SEND_MAIL_FOR_PASSWORD_CHANGE = "/forgot-password",
  RESET_PASSWORD = "/reset-password",
  DASHBOARD = "/dashboard",
  PROFILE = "/profile",
  TRANSACTION = "/transaction",
  TERMINAL_MGT = "/terminals-Management",
  CONFIGURATIONS = "/configurations",
  TRANSACTION_ROUTING = "/transaction-routing",
  CHARGE_CONFIGURATION = "/charge-configurations",
  PAGE_NOT_FOUND = "*",
}
