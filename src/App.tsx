import { ConfigProvider } from "antd"
import { getThemeConfig } from "./themeConfig"
import { RouterProvider, createBrowserRouter } from "react-router-dom"

const App = () => {
  const router = createBrowserRouter([])

  return (
    <ConfigProvider theme={getThemeConfig()}>
      <RouterProvider router={router} />
    </ConfigProvider>
  )
}

export default App
