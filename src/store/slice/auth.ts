/* eslint-disable prettier/prettier */
import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { State } from "../../model/application/state"
import { Auth } from "../../model/application/payload"
import { ApiRequest } from "../../model/client/request"

const initialState: State.Authentication = {
  hasValue: false,
  isFocused: false,
  isRevealPassword: false,
  showPassword: false,
  isPasswordLength: false,
  isUpperCase: false,
  isLowerCase: false,
  hasNumber: false,
  isSpecialChar: false,
  showVerficationCodeModal: false,
  showChangePasswordResponseModal: false,
  showResetPasswordResponseModal: false,
  showForgotPasswordResponseModal: false,
  inputType: "",
  showLogoutModal: false,
  postUrl: "",
  formMethod: "",
}

const AuthSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setAuthKey: (state, action: PayloadAction<Auth>) => {
      const key: keyof State.Authentication = action.payload.key
      state = {
        ...state,
        [key]: action.payload.value,
      }
      return state
    },
    setField: (state, action) => {
      state = {
        ...state,
        request: {
          ...state.request,
          [action.payload.key]: action.payload.value,
        } as ApiRequest.Auth,
      }
      return state
    },
    setAllAuthKey: (state, action: PayloadAction<State.Authentication>) => {
      state = action.payload as any
      return state
    },
  },
})

export const { setAuthKey, setField, setAllAuthKey } = AuthSlice.actions

export const AuthReducer = AuthSlice.reducer
