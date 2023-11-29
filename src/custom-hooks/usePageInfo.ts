/* eslint-disable prettier/prettier */
import { useLayoutEffect } from "react"
import { useAppDispatch } from "../store/hooks"
import { setGlobalKey } from "../store"

const usePageInfo = (
  pageTitle: string,
  selectedKey: string,
  breadcrumb: string,
) => {
  const dispatch = useAppDispatch()

  useLayoutEffect(() => {
    document.title = pageTitle + " - Translite"
    dispatch(
      setGlobalKey({
        key: "selectedKey",
        value: selectedKey,
      }),
    )
    dispatch(
      setGlobalKey({
        key: "pageTitle",
        value: pageTitle,
      }),
    )
    dispatch(
      setGlobalKey({
        key: "breadcrumb",
        value: breadcrumb,
      }),
    )
  }, [breadcrumb, dispatch, pageTitle, selectedKey])
}

export default usePageInfo
