/* eslint-disable prettier/prettier */
import { ConfigProvider } from "antd"
import { getThemeConfig } from "./theme.config"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Suspense } from "react"
import LazyLoader from "@common/components/LazyLoader"
import { routes } from "./routes"

const App = () => {
  const router = createBrowserRouter(routes)

  return (
    <ConfigProvider theme={getThemeConfig()}>
      <Suspense fallback={<LazyLoader />}>
        <RouterProvider router={router} />
      </Suspense>
      <ToastContainer />
    </ConfigProvider>
  )
}

export default App
