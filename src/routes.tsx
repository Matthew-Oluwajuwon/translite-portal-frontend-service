/* eslint-disable prettier/prettier */
import { ROUTE } from "@common/constants"
import PageLayout from "@common/layout/page-layout"
import { ErrorPage } from "./error-page"
import { IsLoggedIn } from "./isLoggedIn"
import Auth from "./common/layout/Auth"
import { lazy } from "react"

const Dashboard = lazy(() => import("@views/dashboard/dashboard"))
const ChargeConfiguration = lazy(
  () =>
    import("@views/configurations/charge-configuration/ChargeConfiguration"),
)
const Login = lazy(() => import("@views/Authentication/Login/Login"))
const ResetPassword = lazy(
  () => import("@views/Authentication/ResetPassword/ResetPassword"),
)
const SendMailForPasswordChange = lazy(
  () =>
    import(
      "@views/Authentication/SendMailForPasswordChange/SendMailForPasswordChange"
    ),
)
const Profile = lazy(() => import("@views/Profile/Profile"))
const Terminals = lazy(() => import("@views/Terminals/Terminals"))
const Transactions = lazy(() => import("@views/Transactions/Transactions"))
const Configurations = lazy(
  () => import("@views/configurations/Configurations"),
)
const TransactionRouting = lazy(
  () => import("@views/configurations/transaction-routing/TransactionRouting"),
)
const Users = lazy(() => import("@views/Users/Users"))
const Processor = lazy(() => import("@views/Processor/Processor"))
const SystemTerminal = lazy(
  () => import("@views/Terminals/system-terminals/SystemTerminal"),
)
const ProcessorTerminal = lazy(
  () => import("@views/Terminals/processor-terminal/ProcessorTerminal"),
)

export const routes = [
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
]
