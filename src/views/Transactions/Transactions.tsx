/* eslint-disable prettier/prettier */

import { useLayoutEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { setAllGlobalKey } from "../../store"
import { MENU_KEYS, MENU_NAMES } from "../../common/constants"
const Transactions: React.FC = () => {
  const dispatch = useAppDispatch()
  const state = useAppSelector((state) => {
    return state.global
  })
  useLayoutEffect(() => {
    document.title = MENU_NAMES.TRANSACTION + " | Translite"
    dispatch(
      setAllGlobalKey({
        ...state,
        selectedKey: MENU_KEYS.TRANSACTION,
        pageTitle: "Transactions",
        breadcrumb: "Home > Transactions"
      }),
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  return <div></div>
}

export default Transactions
