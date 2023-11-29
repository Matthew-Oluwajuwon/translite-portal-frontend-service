/* eslint-disable prettier/prettier */

import React from "react"
import { Navigate } from "react-router-dom"

export const ProtectedRoutes = ({ isLoggedIn, children }: {isLoggedIn: boolean, children: React.ReactNode}) => {
  if (!isLoggedIn) {
    return <Navigate to="/" replace />
  }
  return children
}
