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
import { FORM_ACTION } from "./useApiMethods"
import { ApiRequest } from "../model/client/request"
import { ApiResponse } from "../model/client/response"

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
  }, [dispatch, state])

  const closeAllOpenModal = useCallback(
    () => {
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
    [dispatch, state],
  )

  const toggleOpenMenuDrawer = useCallback(() => {
    closeAllOpenModal()
    dispatch(
      setAllGlobalKey({
        ...state,
        showLogoutModal: false,
        openMenuDrawer: !state.openMenuDrawer,
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
  }, [closeAllOpenModal, dispatch, state])

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
  }, [dispatch, state])

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

  const toggleAddNewRuleModal = useCallback((record?: ApiResponse.CustomConfiguration) => {
    dispatch(
      setAllGlobalKey({
        ...state,
        record,
        request: record?.boundsDTOS,
        transactionRouting: {
          ...state.transactionRouting,
          showAddNewRuleModal: !state.transactionRouting?.showAddNewRuleModal,
        },
      }),
    )
  }, [dispatch, state])

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
    [dispatch, state],
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
