/* eslint-disable prettier/prettier */
import { useLayoutEffect } from "react"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { setAllGlobalKey } from "../store"

const usePageInfo = (
  pageTitle: string,
  selectedKey: string,
  breadcrumb: string,
) => {
  const dispatch = useAppDispatch()
  const state = useAppSelector((state) => {
    return state.global
  })
  useLayoutEffect(() => {
    document.title = pageTitle + " | Translite"
    dispatch(
      setAllGlobalKey({
        ...state,
        selectedKey,
        pageTitle,
        breadcrumb,
      }),
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [breadcrumb, dispatch, pageTitle, selectedKey, state.selectedKey])
}

export default usePageInfo
