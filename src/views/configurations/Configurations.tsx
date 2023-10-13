/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */

import { Button } from "antd"
import { setGlobalKey } from "../../store"
import { useAppDispatch } from "../../store/hooks"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { ROUTE } from "../../common/constants"

const Configurations = () => {
  const dispatch = useAppDispatch()
  const { pathname } = useLocation();
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(
      setGlobalKey({
        key: "terminal",
        value: {
          showCreateModal: true,
          isSingleCreation: pathname
            .toLowerCase()
            .includes(ROUTE.TRANSACTION_ROUTING.toLowerCase())
            ? false
            : true,
        },
      }),
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, pathname])
  
  return (
    <div>
      <div className="h-10 bg-[#ffffff] flex items-center px-3 sm:px-20 py-[3rem] gap-1 sm:gap-3 my-10 rounded-md">
        <Button
          type={pathname
            .toLowerCase()
            .includes(ROUTE.TRANSACTION_ROUTING) ? "primary" : "text"}
          className={
            pathname
            .toLowerCase()
            .includes(ROUTE.TRANSACTION_ROUTING)
              ? "bg-[#6D71F9] text-white py-5 flex items-center justify-center"
              : " py-5 flex items-center justify-center"
          }
          onClick={() => {
            navigate(ROUTE.TRANSACTION_ROUTING)
              dispatch(
                setGlobalKey({
                  key: "terminal",
                  value: { showCreateModal: true, isSingleCreation: false },
                }),
              )
          }
          }
        >
          Transaction Routing
        </Button>
        <Button
          type={pathname
            .toLowerCase()
            .includes(ROUTE.CHARGE_CONFIGURATION) ? "primary" : "text"}
          className={
            pathname
            .toLowerCase()
            .includes(ROUTE.CHARGE_CONFIGURATION)
              ? "bg-[#6D71F9] text-white py-5 flex items-center justify-center"
              : " py-5 flex items-center justify-center"
          }
          onClick={() => {
            navigate(ROUTE.CHARGE_CONFIGURATION)
              dispatch(
                setGlobalKey({
                  key: "terminal",
                  value: { showCreateModal: true, isSingleCreation: true },
                }),
              )
          }
          }
        >
          Charge Configuration
        </Button>
      </div>
      <Outlet />
    </div>
  )
}

export default Configurations
