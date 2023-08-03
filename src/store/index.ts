/* eslint-disable prettier/prettier */
import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import { AuthReducer, setStateKey, setField } from "./slice/auth"

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
  },
  devTools: import.meta.env.PROD === false,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    }).concat()
  },
})

export { setStateKey, setField }

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
