/* eslint-disable prettier/prettier */
import { ROUTE } from "@common/constants"
import { ApiResponse } from "../model/client/response"
import { useLayoutEffect, useState } from "react"

const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState(new ApiResponse.UserInfo())
  useLayoutEffect(() => {
    if (localStorage.getItem("***")) {
      const loginResponse: ApiResponse.UserInfo = JSON.parse(
        localStorage.getItem("***") as string,
      )
      setUserInfo(loginResponse)
    } else {
      window.location.href = ROUTE.INDEX
    }
  }, [])

  return [userInfo]
}

export default useUserInfo
