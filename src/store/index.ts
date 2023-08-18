/* eslint-disable prettier/prettier */
import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit"
import { AuthReducer, setAuthKey, setField } from "./slice/auth"
import { GlobalReducer, setGlobalKey, setAllGlobalKey } from "./slice/global"
import authApi from "./apis/auth.api"

const reducer = combineReducers({
  auth: AuthReducer,
  global: GlobalReducer,
  [authApi.reducerPath]: authApi.reducer,
})

export const store = configureStore({
  reducer,
  devTools: import.meta.env.PROD === false,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    }).concat(authApi.middleware)
  },
})

export { setAuthKey, setField, setGlobalKey, setAllGlobalKey }

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
