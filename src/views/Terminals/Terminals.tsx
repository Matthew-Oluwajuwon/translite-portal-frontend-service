/* eslint-disable prettier/prettier */

import { BREADCRUMB, MENU_KEYS, MENU_NAMES } from "../../common/constants"
import { Button } from "antd"
import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"
import usePageInfo from "../../custom-hooks/usePageInfo"
import { setGlobalKey } from "../../store"
import { useAppDispatch } from "../../store/hooks"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { ROUTE } from "../../common/constants"

const Terminals: React.FC = () => {
  const dispatch = useAppDispatch()
  const { pathname } = useLocation()
  const navigate = useNavigate()

  usePageInfo(
    MENU_NAMES.TERMINAL_MGT,
    MENU_KEYS.TERMINAL_MGT,
    BREADCRUMB.TERMINAL_MGT,
  )

  dayjs.extend(customParseFormat)

  return (
    <div>
      <div className="h-10 bg-[#ffffff] flex items-center px-3 sm:px-20 py-[3rem] gap-1 sm:gap-3 my-10 rounded-md">
        <Button
          type={pathname
            .toLowerCase()
            .includes(ROUTE.SYSTEM_TERMINAL_MGT) ? "primary" : "text"}
          className={
            pathname
            .toLowerCase()
            .includes(ROUTE.SYSTEM_TERMINAL_MGT)
              ? "bg-[#6D71F9] text-white py-5 flex items-center justify-center"
              : " py-5 flex items-center justify-center"
          }
          onClick={() => {
            navigate(ROUTE.SYSTEM_TERMINAL_MGT)
            dispatch(
              setGlobalKey({
                key: "terminal",
                value: { isSingleCreation: false },
              }),
            )
          }}
        >
          System Terminals
        </Button>
        <Button
          type={pathname
            .toLowerCase()
            .includes(ROUTE.PROCESSOR_TERMINAL_MGT) ? "primary" : "text"}
          className={
            pathname
            .toLowerCase()
            .includes(ROUTE.PROCESSOR_TERMINAL_MGT)
              ? "bg-[#6D71F9] text-white py-5 flex items-center justify-center"
              : " py-5 flex items-center justify-center"
          }
          onClick={() => {
            navigate(ROUTE.PROCESSOR_TERMINAL_MGT)
            dispatch(
              setGlobalKey({
                key: "terminal",
                value: { isSingleCreation: true },
              }),
            )
          }}
        >
          Processor Terminals
        </Button>
      </div>
      <Outlet />
    </div>
  )
}

export default Terminals
