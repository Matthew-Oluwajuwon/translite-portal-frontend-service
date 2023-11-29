/* eslint-disable prettier/prettier */

import { Outlet, useLocation, useNavigate } from "react-router-dom"
import Logo from "../../assets/images/logo.svg"
import { Card } from "antd"
import Back from "../../assets/icons/Left.svg"
import { useCallback, useLayoutEffect } from "react"
import { ROUTE } from "../constants"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { setAllAuthKey } from "../../store"

const Auth: React.FC = () => {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const state = useAppSelector((state) => {
    return state.auth
  })

  const setChildrenData = useCallback(
    (formMethod: "POST" | "GET", postUrl: string): void => {
      // dispatch the formMethod and the postUrl for form submission when the page mouths
      dispatch(
        setAllAuthKey({
          ...state,
          formMethod,
          postUrl,
        }),
      )
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch],
  )

  const navigate = useNavigate()
  const info = localStorage.getItem("***")

  useLayoutEffect(() => {
    // retreive token from cookies
    document.title =
      location.pathname === ROUTE.INDEX
        ? "SIGN IN - Translite"
        : location.pathname
            .toUpperCase()
            .replaceAll("/", "")
            .replaceAll("-", " ") + " - Translite"

    // check if use is logged in
    if (info && info.length > 30) {
      navigate(ROUTE.DASHBOARD, {
        replace: true,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, info, dispatch])

  return (
    <div className="min-h-[100svh] bg-[#4C469B] flex justify-center items-center flex-col lg:flex-row">
      <img
        src={Logo}
        alt="logo"
        className="lg:absolute lg:top-10 lg:left-10 mb-5 lg:mb-0"
      />
      <Card
        className={`bg-white min-h-[85svh] w-[93%] max-w-[40rem] rounded-2xl shadow-xl relative lg:px-14 py-10`}
      >
        {location.pathname !== ROUTE.INDEX && (
          <img
            src={Back}
            onClick={() => window.history.back()}
            alt=""
            className="hidden sm:block absolute w-[2.1rem] sm:w-[2.5rem] top-[3.9rem] left-5 sm:left-10 cursor-pointer hover:scale-90 hover:transition-all"
          />
        )}
        <Outlet context={setChildrenData} />
      </Card>
    </div>
  )
}

export default Auth
