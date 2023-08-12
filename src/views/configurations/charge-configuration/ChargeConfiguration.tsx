/* eslint-disable prettier/prettier */

import { useLayoutEffect } from "react"
import { MENU_NAMES, MENU_KEYS, BREADCRUMB } from "../../../common/constants"
import { setAllGlobalKey } from "../../../store"
import { useAppDispatch, useAppSelector } from "../../../store/hooks"

const ChargeConfiguration = () => {
    const dispatch = useAppDispatch()
    const state = useAppSelector((state) => {
      return state.global
    })
    useLayoutEffect(() => {
      document.title = MENU_NAMES.CHARGE_CONFIGURATION + " | Translite"
      dispatch(
        setAllGlobalKey({
          ...state,
          selectedKey: MENU_KEYS.CHARGE_CONFIGURATION,
          pageTitle: MENU_NAMES.CHARGE_CONFIGURATION,
          breadcrumb: BREADCRUMB.CHARGE_CONFIGURATION,
          openKey: MENU_KEYS.CONFIGURATIONS
        }),
      )
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch])
  return <div></div>
}

export default ChargeConfiguration
