/* eslint-disable prettier/prettier */
import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { State } from "../../model/application/state"
import { Global } from "../../model/application/payload"
import {
  BREADCRUMB,
  CHARGE_CONFIGURATION_TYPES,
  MENU_KEYS,
  MENU_NAMES,
} from "../../common/constants"

const initialState: State.Global = {
  menuCollapsed: false,
  selectedKey: MENU_KEYS.DASHBOARD,
  expand: false,
  showLogoutModal: false,
  openMenuDrawer: false,
  openKey: MENU_KEYS.CONFIGURATIONS,
  breadcrumb: BREADCRUMB.DASHBOARD,
  pageTitle: MENU_NAMES.DASHBOARD,
  terminal: {
    isSingleCreation: false,
    showCreateModal: false,
  },
  transactionRouting: {
    showAddNewRuleModal: false,
  },
  configuration: {
    processorSelection: CHARGE_CONFIGURATION_TYPES.FLAT,
  },
  user:{
    showAddUserModal:false
  },
  selectUrl: "",
  page: 2,
}

const GlobalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setGlobalKey: (state, action: PayloadAction<Global>) => {
      const key: keyof State.Global = action.payload.key
      state = {
        ...state,
        [key]: action.payload.value,
      }
      return state
    },
    setAllGlobalKey: (state, action: PayloadAction<State.Global>) => {
      state = action.payload as any
      return state
    },
  },
})

export const { setGlobalKey, setAllGlobalKey } = GlobalSlice.actions

export const GlobalReducer = GlobalSlice.reducer
