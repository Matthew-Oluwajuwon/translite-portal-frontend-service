/* eslint-disable prettier/prettier */
export enum MENU_KEYS {
  DASHBOARD = "1",
  PROFILE = "2",
  TRANSACTION = "3",
  TERMINAL_MGT = "4",
  CONFIGURATIONS = "5",
  USER_MGT = "6",
  PROCESSOR = "7",
  TRANSACTION_ROUTING = "01",
  CHARGE_CONFIGURATION = "02",
  SYSTEM_USERS = "03",
  ROLES = "04",
  PERMISSION = "05",
  SYSTEM_TERMINAL_MGT = "06",
  PROCESSOR_TERMINAL_MGT = "07",
}

export enum MENU_NAMES {
  DASHBOARD = "Dashboard",
  PROFILE = "Profile",
  TRANSACTION = "Transaction",
  TERMINAL_MGT = "Terminals Mgt.",
  CONFIGURATIONS = "Configurations",
  USER_MGT = "User Mgt.",
  TRANSACTION_ROUTING = "Transaction routing",
  CHARGE_CONFIGURATION = "Charge configurations",
  SYSTEM_USERS = "System Users",
  ROLES = "Roles",
  PERMISSION = "Permissions",
  SYSTEM_TERMINAL_MGT = "System Terminal Mgt.",
  PROCESSOR_TERMINAL_MGT = "Processor Terminal Mgt.",
  PROCESSOR = "Processor Mgt.",
}

export enum ROUTE {
  INDEX = "/",
  SEND_MAIL_FOR_PASSWORD_CHANGE = "/forgot-password",
  RESET_PASSWORD = "/reset-password",
  DASHBOARD = "/dashboard",
  PROFILE = "/profile",
  TRANSACTION = "/transaction",
  USER_MGT = "/user-management",
  SYSTEM_USERS = "/user-management/system-users",
  ROLES = "/user-management/roles",
  PERMISSION = "/user-management/permission",
  TERMINAL_MGT = "/terminals-management",
  SYSTEM_TERMINAL_MGT = "/terminals-management/system-terminal-management",
  PROCESSOR_TERMINAL_MGT = "/terminals-management/processor-terminal-management",
  PROCESSOR = "/processor-management",
  CONFIGURATIONS = "/configurations",
  TRANSACTION_ROUTING = "/configurations/transaction-routing",
  CHARGE_CONFIGURATION = "/configurations/charge-configurations",
  PAGE_NOT_FOUND = "*",
}

export enum BREADCRUMB {
  DASHBOARD = "Home > Dashboard",
  PROFILE = "Home > Profile",
  TRANSACTION = "Home > Transactions",
  TERMINAL_MGT = "Home > System Terminal Management",
  PROCESSOR_TERMINAL_MGT = "Home > Terminals > Processor Terminal Management",
  TRANSACTION_ROUTING = "Home > Transaction Routing",
  CHARGE_CONFIGURATION = "Home > Charge Configurations",
  SYSTEM_USERS = "Home > System Users",
  PROCESSOR = "Home > Processor Management",
}

export enum TRANSACTION_CONFIGURATION_TYPES {
  DIRECT = "Direct",
  AUTOMATIC = "Automatic",
  CUSTOM = "Custom",
}
export enum CHARGE_CONFIGURATION_TYPES {
  FLAT = "Flat",
  PERCENTAGE = "Percentage",
}

export enum TRANSACTION_PROCESSOR {
  INTERWITCH = "Interswitch",
  NIBSS = "NIBSS",
}

export enum FORM_METHODS {
  POST = "POST",
  GET = "GET",
}

export enum ResponseCode {
  SUCCESS = "00",
}
