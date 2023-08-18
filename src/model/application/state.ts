/* eslint-disable prettier/prettier */
import { ApiRequest } from "../client/request"

export namespace State {
  export interface Authentication {
    isFocused: boolean
    hasValue: boolean
    inputType: string
    isRevealPassword: boolean
    request: ApiRequest.Auth
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
    terminal: Terminals
    configuration?: Configurations
    openMenuDrawer: boolean
    request?: any
    transactionRouting?: TransactionRouting
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
}
