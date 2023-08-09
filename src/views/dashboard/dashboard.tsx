/* eslint-disable prettier/prettier */

import { useLayoutEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { setAllGlobalKey } from "../../store"
import { MENU_KEYS, MENU_NAMES } from "../../common/constants"
import { DatePicker, DatePickerProps, Form } from "antd"
import dayjs from "dayjs"
import calendar from "../../assets/icons/calendar.svg"
import dropdown from "../../assets/icons/dropdown.svg"
import Statistics from "./components/statistics"
import { Chart } from "./components/chart"
import { TransactionTable } from "./components/transaction-table"

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch()
  const state = useAppSelector((state) => {
    return state.global
  })
  useLayoutEffect(() => {
    document.title = MENU_NAMES.DASHBOARD + " | Translite"
    dispatch(
      setAllGlobalKey({
        ...state,
        selectedKey: MENU_KEYS.DASHBOARD,
        pageTitle: "Dashbaord",
        breadcrumb: "Home > Dashboard",
      }),
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  const dateFormat = "MMM D"
  const customFormat: DatePickerProps["format"] = (value) =>
    `Today ${value.format(dateFormat)}`

  return (
    <div>
      <Form.Item initialValue={dayjs("Aug 7", dateFormat)} className="my-10">
        <DatePicker
          format={customFormat}
          className="py-3 border-none font-[poppins-500] font-semibold text-[#424D61]"
          prevIcon={<img src={calendar} alt="" />}
          suffixIcon={<img src={dropdown} alt="" />}
          picker="date"
        />
      </Form.Item>
      <Statistics />
      <Chart />
      <TransactionTable />
    </div>
  )
}

export default Dashboard
