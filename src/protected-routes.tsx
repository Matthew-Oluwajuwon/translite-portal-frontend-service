/* eslint-disable prettier/prettier */

import { Navigate } from "react-router-dom"

export const ProtectedRoutes = ({ isLoggedIn, children }: any) => {
  if (!isLoggedIn) {
    return <Navigate to="/" replace />
  }
  return children
}
