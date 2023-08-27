/* eslint-disable prettier/prettier */

import { BREADCRUMB, MENU_KEYS, MENU_NAMES } from "../../common/constants"
import { DatePicker, DatePickerProps, Form } from "antd"
import dayjs from "dayjs"
import calendar from "../../assets/icons/calendar.svg"
import dropdown from "../../assets/icons/dropdown.svg"
import { TransactionTable } from "./components/transaction-table"
import { Chart } from "./components/chart"
import Statistics from "./components/statistics"
import usePageInfo from "../../custom-hooks/usePageInfo"
import useGetDashboardData from "../../custom-hooks/useGetDashboardData"

const Dashboard: React.FC = () => {

  usePageInfo(MENU_NAMES.DASHBOARD, MENU_KEYS.DASHBOARD, BREADCRUMB.DASHBOARD)
  const {
    handleDateChange,
    data: sendDataResponse,
    isLoading: sendDataLoading,
    getDataLoading,
    getDataResponse,
  } = useGetDashboardData()

  const dateFormat = "MMM DD"
  const customFormat: DatePickerProps["format"] = (value) =>
    `Today ${value.format(dateFormat)}`
    
    return (
      <div>
        <Form.Item className="my-5">
          <DatePicker
            format={customFormat}
            defaultValue={dayjs(dayjs().format(dateFormat), dateFormat)}
            className="py-3 border-none font-[poppins-500] font-semibold text-[#424D61]"
            prevIcon={<img src={calendar} alt="" />}
            suffixIcon={<img src={dropdown} alt="" />}
            onChange={(e) => handleDateChange(e)}
            picker="date"
          />
        </Form.Item>
        <Statistics data={getDataResponse} isLoading={getDataLoading} />
        <Chart data={getDataResponse} isLoading={getDataLoading} />
        <TransactionTable data={sendDataResponse} isLoading={sendDataLoading} />
      </div>
    )
}

export default Dashboard
