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
  TRANSACTION_ROUTING = "/configurations/transaction-routing",
  CHARGE_CONFIGURATION = "/configurations/charge-configurations",
  PAGE_NOT_FOUND = "*",
}

export enum BREADCRUMB {
  DASHBOARD = "Home > Dashboard",
  PROFILE = "Home > Profile",
  TRANSACTION = "Home > Transactions",
  TERMINAL_MGT = "Home > Terminal Management",
  TRANSACTION_ROUTING = "Home > Transaction Routing",
  CHARGE_CONFIGURATION = "Home > Charge Configurations"
}

export enum TRANSACTION_CONFIGURATION_TYPES {
  DIRECT = "Direct",
  AUTOMATIC = "Automatic",
  CUSTOM = "Custom"
}

export enum TRANSACTION_PROCESSOR {
  INTERWITCH = "Interwitch",
  NIBSS = "NIBSS"
}

export enum FORM_METHODS {
  POST = "POST",
  GET = "GET"
}