/* eslint-disable prettier/prettier */
import { ApiResponse } from "model/client/response"
import { ApiRequest } from "../client/request"
import { FORM_ACTION } from "../../custom-hooks/useApiMethods"

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
    token?: string
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
    formMethod?: string
    page?: number
    action?: FORM_ACTION
    labelInput?: string
    configuration?: Configurations
    transactionRouting?: TransactionRouting
    terminal: Terminals
    transaction?: Transaction
    user?: User
    response?: any
    originalResponse?: any
    showFormModal?: boolean
    searchTerm?: string
    processor?: Array<ApiResponse.Processor>
    selectField?: string
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
  export interface User {
    showAddUserModal?: boolean
    showAddUserSuccessResponseModal?: boolean
  }
}
