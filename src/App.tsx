/* eslint-disable prettier/prettier */
import { ConfigProvider } from "antd"
import { getThemeConfig } from "./theme.config"
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
import { IsLoggedIn } from "./isLoggedIn"
import Users from "@views/Users/Users"
import Processor from "@views/Processor/Processor"
import SystemTerminal from "@views/Terminals/system-terminals/SystemTerminal"
import ProcessorTerminal from "@views/Terminals/processor-terminal/ProcessorTerminal"
const App = () => {
  
  const router = createBrowserRouter([
    {
      element: <Auth />,
      children: [
        {
          path: ROUTE.INDEX,
          element: (
            <IsLoggedIn>
              <Login />
            </IsLoggedIn>
          ),
        },
        {
          path: ROUTE.SEND_MAIL_FOR_PASSWORD_CHANGE,
          element: (
            <IsLoggedIn>
              <SendMailForPasswordChange />
            </IsLoggedIn>
          ),
        },
        {
          path: ROUTE.RESET_PASSWORD,
          element: <ResetPassword />,
        },
      ],
      errorElement: <ErrorPage />,
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
          children: [
            {
              path: ROUTE.SYSTEM_TERMINAL_MGT,
              element: <SystemTerminal />,
            },
            {
              path: ROUTE.PROCESSOR_TERMINAL_MGT,
              element: <ProcessorTerminal />,
            },
          ],
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
        {
          path: ROUTE.SYSTEM_USERS,
          element: <Users />,
        },
        {
          path: ROUTE.PROCESSOR,
          element: <Processor />,
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
