/* eslint-disable prettier/prettier */
import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit"
import { AuthReducer, setAuthKey, setField, setAllAuthKey } from "./slice/auth"
import { GlobalReducer, setGlobalKey, setAllGlobalKey } from "./slice/global"
import loginApi, { useLoginMutation, useResetPasswordMutation } from "./apis/auth.api"
import { setupListeners } from "@reduxjs/toolkit/dist/query/react"
import {
  useGetUserInfoMutation,
  useGetDataByPostMethodSecuredMutation,
  useUpdateDataMutation,
  useDeleteDataMutation,
  usePostDataMutation,
  useGetDataQuery,
  useLazyGetDataQuery,
  globalApi,
} from "./apis/global.api"

const reducer = combineReducers({
  auth: AuthReducer,
  global: GlobalReducer,
  [loginApi.reducerPath]: loginApi.reducer,
  [globalApi.reducerPath]: globalApi.reducer,
})

export const store = configureStore({
  reducer,
  devTools: import.meta.env.PROD === false,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    }).concat(loginApi.middleware, globalApi.middleware)
  },
})

// enable listener behavior for the store
setupListeners(store.dispatch)

export { setAuthKey, setField, setGlobalKey, setAllGlobalKey, setAllAuthKey }
export {
  useLoginMutation,
  useGetDataQuery,
  useGetUserInfoMutation,
  useGetDataByPostMethodSecuredMutation,
  useUpdateDataMutation,
  useDeleteDataMutation,
  usePostDataMutation,
  useLazyGetDataQuery,
  useResetPasswordMutation
}

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
