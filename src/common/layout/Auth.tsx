/* eslint-disable prettier/prettier */

import { Outlet, useLocation } from "react-router-dom"
import Logo from "../../assets/images/logo.svg"
import { Card } from "antd"
import Back from "../../assets/icons/Left.svg"
import { ROUTE } from "../../routes"
import { useLayoutEffect } from "react"

const Auth: React.FC = () => {
  const { pathname } = useLocation()
  useLayoutEffect(() => {
    document.title = pathname === ROUTE.INDEX ? "SIGN IN | Translite" : pathname.toUpperCase().replaceAll("/", "").replaceAll("-", " ") + " | Translite"
  }, [pathname])
  
  return (
    <div className="min-h-[100svh] bg-[#4C469B] flex justify-center items-center flex-col lg:flex-row">
      <img
        src={Logo}
        alt="logo"
        className="lg:absolute lg:top-10 lg:left-10 mb-5 lg:mb-0"
      />
      <Card
        className={`bg-white min-h-[85svh] w-[93%] max-w-[45rem] rounded-2xl shadow-xl relative lg:px-14 py-10`}
      >
        {pathname !== ROUTE.INDEX && (
          <img
            src={Back}
            onClick={() => window.history.back()}
            alt=""
            className="hidden sm:block absolute w-[2.1rem] sm:w-[2.5rem] top-[3.9rem] left-5 sm:left-10 cursor-pointer hover:scale-90 hover:transition-all"
          />
        )}
        <Outlet />
      </Card>
    </div>
  )
}

export default Auth
