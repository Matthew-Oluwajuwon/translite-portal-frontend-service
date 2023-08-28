/* eslint-disable prettier/prettier */
import { ApiResponse } from "model/client/response"
import { ApiRequest } from "../client/request"

export namespace State {
  export interface Authentication {
    isFocused: boolean
    hasValue: boolean
    inputType: string
    isRevealPassword: boolean
    request?: ApiRequest.Auth
    showLogoutModal: boolean
    showPassword: boolean
    isPasswordLength: boolean
    isUpperCase: boolean
    isLowerCase: boolean
    hasNumber: boolean
    isSpecialChar: boolean
    showVerficationCodeModal: boolean
    showChangePasswordResponseModal: boolean
    showResetPasswordResponseModal: boolean
    showForgotPasswordResponseModal: boolean
    postUrl: string
    formMethod: string
    userInfo?: ApiResponse.UserInfo
  }

  export interface Global {
    menuCollapsed: boolean
    selectedKey: string
    openKey: string
    pageTitle?: string
    breadcrumb?: string
    expand: boolean
    record?: any
    showLogoutModal?: boolean
    openMenuDrawer: boolean
    request?: any
    searchResponse?: any
    postUrl?: string
    getUrl?: string
    updateUrl?: string
    selectUrl: string
    deleteUrl?: string
    formMethod?: string;
    page?: number;
    action?: "CREATE" | "UPDATE" | "DELETE" | "READ"
    labelInput?: string
    configuration?: Configurations
    transactionRouting?: TransactionRouting
    terminal: Terminals
    transaction?: Transaction
    response?: any
    originalResponse?: any
  }

  export interface Terminals {
    showCreateModal: boolean
    isSingleCreation: boolean
  }

  export interface Configurations {
    processorSelection?: string
    cancelConfig?: boolean
  }
  export interface TransactionRouting {
    showAddNewRuleModal?: boolean
  }
  
  export interface Transaction {
    response: Array<ApiResponse.Transaction>
  }
}
