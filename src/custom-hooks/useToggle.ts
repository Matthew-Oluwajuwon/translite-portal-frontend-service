/* eslint-disable prettier/prettier */
import { useCallback } from "react"
import { setAllGlobalKey, setGlobalKey } from "../store"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { useNavigate } from "react-router-dom"
import {
  BREADCRUMB,
  CHARGE_CONFIGURATION_TYPES,
  MENU_KEYS,
  MENU_NAMES,
  ROUTE,
} from "@common/constants"
import { State } from "../model/application/state"
import { FORM_ACTION } from "./useApiMethods"
import { ApiRequest } from "../model/client/request"

const useToggle = () => {
  const dispatch = useAppDispatch()
  const state = useAppSelector((state) => {
    return state.global
  })

  const navigate = useNavigate()

  const toggleMenu = useCallback(() => {
    dispatch(
      setGlobalKey({
        key: "menuCollapsed",
        value: !state.menuCollapsed,
      }),
    )
  }, [dispatch, state.menuCollapsed])

  const closeAllOpenModal = useCallback(
    (state: State.Global) => {
      dispatch(
        setAllGlobalKey({
          ...state,
          showFormModal: false,
          showLogoutModal: false,
          terminal: {
            ...state.terminal,
            isSingleCreation: false,
            showCreateModal: false,
          },
          transactionRouting: {
            ...state.transactionRouting,
            showAddNewRuleModal: false,
          },
        }),
      )
    },
    [dispatch],
  )

  const toggleOpenMenuDrawer = useCallback(() => {
    closeAllOpenModal(state)
    dispatch(
      setAllGlobalKey({
        ...state,
        showLogoutModal: false,
        terminal: {
          ...state.terminal,
          isSingleCreation: false,
          showCreateModal: false,
        },
        transactionRouting: {
          ...state.transactionRouting,
          showAddNewRuleModal: false,
        },
      }),
    )
    dispatch(
      setGlobalKey({
        key: "openMenuDrawer",
        value: !state.openMenuDrawer,
      }),
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, state.openMenuDrawer])

  const toggleLogoutModal = useCallback(
    () => {
      dispatch(
        setGlobalKey({
          key: "showLogoutModal",
          value: !state.showLogoutModal,
        }),
      )
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch, state.showLogoutModal],
  )

  const toggleCreateModal = useCallback(
    (modalName?: string, modalDesc?: string, record?: any) => {
      dispatch(
        setAllGlobalKey({
          ...state,
          request: new ApiRequest.SearchTransaction(),
          terminal: {
            ...state.terminal,
            showCreateModal: !state.terminal?.showCreateModal,
            modalName,
            modalDesc,
            record
          },
        }),
      )
    },
    [dispatch, state],
  )

  const toggleAddUserModal = useCallback(() => {
    dispatch(
      setAllGlobalKey({
        ...state,
        user: {
          showAddUserModal: !state.user?.showAddUserModal,
        },
      }),
    )
  }, [dispatch])

  const toggleFormModalOption = useCallback(
    (showCreateModal: boolean, isSingleCreation: boolean) =>
      dispatch(
        setAllGlobalKey({
          ...state,
          terminal: {
            ...state.terminal,
            showCreateModal,
            isSingleCreation,
          },
        }),
      ),
    [dispatch, state],
  )

  const toggleAddNewRuleModal = useCallback(() => {
    dispatch(
      setAllGlobalKey({
        ...state,
        transactionRouting: {
          ...state.transactionRouting,
          showAddNewRuleModal: !state.transactionRouting?.showAddNewRuleModal,
        },
      }),
    )
  }, [dispatch])

  const handleLogout = () => {
    localStorage.clear()
    dispatch(
      setAllGlobalKey({
        ...state,
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
      }),
    )
    return navigate(ROUTE.INDEX, {
      replace: true,
    })
  }

  const toggleFormModal = useCallback(
    (showFormModal: boolean, action?: FORM_ACTION, request?: any) => {
      dispatch(
        setAllGlobalKey({
          ...state,
          showFormModal,
          request,
          action,
        }),
      )
    },
    [dispatch],
  )

  return {
    toggleMenu,
    toggleOpenMenuDrawer,
    toggleLogoutModal,
    toggleCreateModal,
    toggleFormModalOption,
    toggleAddNewRuleModal,
    toggleAddUserModal,
    handleLogout,
    closeAllOpenModal,
    toggleFormModal,
  }
}

export default useToggle
