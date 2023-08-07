/* eslint-disable prettier/prettier */

import { useLayoutEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { setAllGlobalKey } from "../../store"
import { MENU_KEYS, MENU_NAMES } from "../../common/constants"
const Profile: React.FC = () => {
  const dispatch = useAppDispatch()
  const state = useAppSelector((state) => {
    return state.global
  })
  useLayoutEffect(() => {
    document.title = MENU_NAMES.PROFILE + " | Translite"
    dispatch(
      setAllGlobalKey({
        ...state,
        selectedKey: MENU_KEYS.PROFILE,
        pageTitle: "Profile",
        breadcrumb: "Home > Profile"
      }),
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  return <div></div>
}

export default Profile
