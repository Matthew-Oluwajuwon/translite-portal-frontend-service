/* eslint-disable prettier/prettier */
import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit"
import { AuthReducer, setAuthKey, setField, setAllAuthKey } from "./slice/auth"
import { GlobalReducer, setGlobalKey, setAllGlobalKey } from "./slice/global"
import loginApi, { useLoginMutation } from "./apis/auth.api"
import apiController, {
  useSendDataMutation,
  useGetDataQuery,
} from "./apis/apiController"

const reducer = combineReducers({
  auth: AuthReducer,
  global: GlobalReducer,
  [loginApi.reducerPath]: loginApi.reducer,
  [apiController.reducerPath]: apiController.reducer,
})

export const store = configureStore({
  reducer,
  devTools: import.meta.env.PROD === false,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    }).concat(loginApi.middleware, apiController.middleware)
  },
})

export { setAuthKey, setField, setGlobalKey, setAllGlobalKey, setAllAuthKey }
export { useLoginMutation, useSendDataMutation, useGetDataQuery }

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
