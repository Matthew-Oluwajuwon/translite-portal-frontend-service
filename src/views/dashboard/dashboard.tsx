/* eslint-disable prettier/prettier */

import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { setAllGlobalKey } from "../../store"
import { BREADCRUMB, MENU_KEYS, MENU_NAMES } from "../../common/constants"
import { DatePicker, DatePickerProps, Form } from "antd"
import dayjs from "dayjs"
import calendar from "../../assets/icons/calendar.svg"
import dropdown from "../../assets/icons/dropdown.svg"
import { TransactionTable } from "./components/transaction-table"
import { Chart } from "./components/chart"
import Statistics from "./components/statistics"

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch()
  const state = useAppSelector((state) => {
    return state.global
  })
  useEffect(() => {
    document.title = MENU_NAMES.DASHBOARD + " | Translite"
    dispatch(
      setAllGlobalKey({
        ...state,
        selectedKey: MENU_KEYS.DASHBOARD,
        pageTitle: MENU_NAMES.DASHBOARD,
        breadcrumb: BREADCRUMB.DASHBOARD,
      }),
    )
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  const dateFormat = "MMM D"
  const customFormat: DatePickerProps["format"] = (value) =>
    `Today ${value.format(dateFormat)}`
 
  return (
    <div>
      <Form.Item initialValue={dayjs("Aug 7", dateFormat)} className="my-5">
        <DatePicker
          format={customFormat}
          defaultValue={dayjs("Aug 7", dateFormat)}
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
