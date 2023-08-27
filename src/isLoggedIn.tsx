/* eslint-disable prettier/prettier */

import { ROUTE } from "@common/constants"
import React from "react"
import { Navigate } from "react-router-dom"

export const IsLoggedIn = ({ children }: {children: React.ReactNode}) => {
  if (localStorage.getItem("*****") && localStorage.getItem("***")) {
    return <Navigate to={ROUTE.DASHBOARD} replace />
  }
  return children
}
