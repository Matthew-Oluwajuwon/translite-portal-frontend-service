/* eslint-disable prettier/prettier */
import { useCallback } from "react"
import { setAllGlobalKey, setGlobalKey } from "../store"
import { useAppDispatch, useAppSelector } from "../store/hooks"

const useToggle = () => {
  const dispatch = useAppDispatch()
  const state = useAppSelector((state) => {
    return state.global
  })
  const toggleMenu = useCallback(() => {
    dispatch(
      setGlobalKey({
        key: "menuCollapsed",
        value: !state.menuCollapsed,
      }),
    )
  }, [dispatch, state.menuCollapsed])

  const toggleOpenMenuDrawer = useCallback(() => {
    dispatch(
      setGlobalKey({
        key: "openMenuDrawer",
        value: !state.openMenuDrawer,
      }),
    )
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
    [dispatch],
  )

  const toggleCreateModal = useCallback(() => {
    dispatch(
      setAllGlobalKey({
        ...state,
        terminal: {
          ...state.terminal,
          showCreateModal: !state.terminal?.showCreateModal,
        },
      }),
    )
  }, [dispatch, state])

  const toggleFormModalOption = useCallback(
    (showCreateModal: boolean, isSingleCreation: boolean) =>
      dispatch(
        setGlobalKey({
          key: "terminal",
          value: {
            showCreateModal,
            isSingleCreation,
          },
        }),
      ),
    [dispatch],
  )

  const toggleAddNewRuleModal = useCallback(() => {
    // dispatch(
    //   setAllGlobalKey({
    //     ...state,
    //     showAddNewRuleModal: !state.showAddNewRuleModal,
    //   }),
    // )
    dispatch(
      setAllGlobalKey({
        ...state,
        transactionRouting: {
          ...state.transactionRouting,
          showAddNewRuleModal: !state.transactionRouting?.showAddNewRuleModal,
        },
      }),
    )
  }, [dispatch, state])
  return {
    toggleMenu,
    toggleOpenMenuDrawer,
    toggleLogoutModal,
    toggleCreateModal,
    toggleFormModalOption,
    toggleAddNewRuleModal,
  }
}

export default useToggle
