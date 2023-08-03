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
  }
}
