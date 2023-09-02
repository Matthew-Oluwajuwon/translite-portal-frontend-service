/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */

import { BREADCRUMB, MENU_KEYS, MENU_NAMES } from "../../common/constants"
import { DatePicker, DatePickerProps, Form } from "antd"
import dayjs from "dayjs"
import calendar from "../../assets/icons/calendar.svg"
import dropdown from "../../assets/icons/dropdown.svg"
import { TransactionTable } from "./components/transaction-table"
import { Chart } from "./components/chart"
import Statistics from "./components/statistics"
import usePageInfo from "../../custom-hooks/usePageInfo"
import useSetRequest from "../../custom-hooks/useSetRequest"
import useApiMethods from "../../custom-hooks/useApiMethods"
import { useEffect } from "react"
import { apiEndpoints } from "../../store/apiEndpoints"
import { useAppSelector } from "../../store/hooks"
import { RangePickerProps } from "antd/es/date-picker"

const Dashboard: React.FC = () => {
  const state = useAppSelector((state) => {
    return state.global
  })
  usePageInfo(MENU_NAMES.DASHBOARD, MENU_KEYS.DASHBOARD, BREADCRUMB.DASHBOARD)

  const dateFormat = "MMM DD"
  const customFormat: DatePickerProps["format"] = (value) =>
    `Today ${value.format(dateFormat)}`

  // eslint-disable-next-line arrow-body-style
  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    // Can not select days after today and today
    return current && current >= dayjs().startOf("day")
  }

  const { setFieldChange } = useSetRequest()

  const { handleApiMethodController, data } = useApiMethods()

  useEffect(() => {
    handleApiMethodController(
      state,
      apiEndpoints.transaction.dashboardDay +
        (state.request?.day
          ? dayjs(state.request?.day).format("YYYY-MM-DD")
          : dayjs().format("YYYY-MM-DD")),
      "READ",
    )
  }, [handleApiMethodController])

  return (
    <div>
      <Form.Item className="my-5">
        <DatePicker
          format={customFormat}
          defaultValue={dayjs(dayjs().format(dateFormat), dateFormat)}
          disabledDate={disabledDate}
          className="py-3 border-none font-[poppins-500] font-semibold text-[#424D61]"
          prevIcon={<img src={calendar} alt="" />}
          suffixIcon={<img src={dropdown} alt="" />}
          onChange={(e) => setFieldChange("day", e)}
          picker="date"
        />
      </Form.Item>
      <Statistics
        data={data.data?.data?.dayReport}
        isLoading={data.isLoading}
      />
      <Chart
        data={data.data?.data?.sevenDaysReport}
        isLoading={data.isLoading}
      />
      <TransactionTable />
    </div>
  )
}

export default Dashboard
