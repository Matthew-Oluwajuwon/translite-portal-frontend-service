/* eslint-disable prettier/prettier */
import { ConfigProvider } from "antd"
import { getThemeConfig } from "./themeConfig"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Auth from "./common/layout/Auth"
import Login from "./views/Authentication/Login/Login"
import SendMailForPasswordChange from "./views/Authentication/SendMailForPasswordChange/SendMailForPasswordChange"
import ResetPassword from "./views/Authentication/ResetPassword/ResetPassword"
import { PageNotFound } from "./page-not-found"
import Dashboard from "./views/Dashboard/Dashboard"
import PageLayout from "./common/layout/page-layout"
import { ROUTE } from "./common/constants"
import Profile from "./views/Profile/Profile"
import Transactions from "./views/Transactions/Transactions"
import Terminals from "./views/Terminals/Terminals"

const App = () => {
  const router = createBrowserRouter([
    {
      element: <Auth />,
      children: [
        {
          path: ROUTE.INDEX,
          element: <Login />,
        },
        {
          path: ROUTE.SEND_MAIL_FOR_PASSWORD_CHANGE,
          element: <SendMailForPasswordChange />,
        },
        {
          path: ROUTE.RESET_PASSWORD,
          element: <ResetPassword />,
        },
      ],
      errorElement: <PageNotFound />,
    },
    {
      element: <PageLayout />,
      children: [
        {
          element: <Dashboard />,
          path: ROUTE.DASHBOARD,
        },
        {
          element: <Profile />,
          path: ROUTE.PROFILE,
        },
        {
          element: <Transactions />,
          path: ROUTE.TRANSACTION,
        },
        {
          element: <Terminals />,
          path: ROUTE.TERMINAL_MGT,
        },
      ],
      errorElement: <PageNotFound />,
    },
  ])

  return (
    <ConfigProvider theme={getThemeConfig()}>
      <RouterProvider router={router} />
    </ConfigProvider>
  )
}

export default App
