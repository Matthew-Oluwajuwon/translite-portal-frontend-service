/* eslint-disable prettier/prettier */
import { ConfigProvider } from "antd"
import { getThemeConfig } from "./themeConfig"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { ROUTE } from "./common/constants"
import Dashboard from "@views/dashboard/dashboard"
import PageLayout from "@common/layout/page-layout"
import ChargeConfiguration from "@views/configurations/charge-configuration/ChargeConfiguration"
import Login from "@views/Authentication/Login/Login"
import ResetPassword from "@views/Authentication/ResetPassword/ResetPassword"
import SendMailForPasswordChange from "@views/Authentication/SendMailForPasswordChange/SendMailForPasswordChange"
import Profile from "@views/Profile/Profile"
import Terminals from "@views/Terminals/Terminals"
import Transactions from "@views/Transactions/Transactions"
import Configurations from "@views/configurations/Configurations"
import TransactionRouting from "@views/configurations/transaction-routing/TransactionRouting"
import Auth from "@common/layout/Auth"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { ErrorPage } from "./error-page"

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
      errorElement: <ErrorPage />,
    },
    {
      element: (
          <PageLayout />
      ),
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
        {
          path: ROUTE.CONFIGURATIONS,
          element: <Configurations />,
          children: [
            {
              path: ROUTE.TRANSACTION_ROUTING,
              element: <TransactionRouting />,
            },
            {
              path: ROUTE.CHARGE_CONFIGURATION,
              element: <ChargeConfiguration />,
            },
          ],
        },
      ],
      errorElement: <ErrorPage />,
    },
  ])

  return (
    <ConfigProvider theme={getThemeConfig()}>
      <RouterProvider router={router} />
      <ToastContainer />
    </ConfigProvider>
  )
}

export default App
