/* eslint-disable prettier/prettier */
import { ConfigProvider } from "antd"
import { getThemeConfig } from "./themeConfig"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Auth from "./common/layout/Auth"
import Login from "./views/Authentication/Login/Login"
import SendMailForPasswordChange from "./views/Authentication/SendMailForPasswordChange/SendMailForPasswordChange"
import { ROUTE } from "./routes"
import ResetPassword from "./views/Authentication/ResetPassword/ResetPassword"
import { Dashboard } from "./views/dashboard/dashboard"
import { PageNotFound } from "./page-not-found"

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
    },
    {
      element: <Dashboard />,
      path: ROUTE.DASHBOARD,
    },
    {
      element: <PageNotFound />,
      path: ROUTE.PAGE_NOT_FOUND,
    },
  ])

  return (
    <ConfigProvider theme={getThemeConfig()}>
      <RouterProvider router={router} />
    </ConfigProvider>
  )
}

export default App
