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
import { useGetDataQuery } from "../../store"
import { useAppSelector } from "../../store/hooks"
import { apiEndpoints } from "../../store/apiEndpoints"
import useSetRequest from "../../custom-hooks/useSetRequest"

const Dashboard: React.FC = () => {
  const state = useAppSelector(state => {
    return state.global
  })
  usePageInfo(MENU_NAMES.DASHBOARD, MENU_KEYS.DASHBOARD, BREADCRUMB.DASHBOARD)

  const dateFormat = "MMM DD"
  const customFormat: DatePickerProps["format"] = (value) =>
    `Today ${value.format(dateFormat)}`
    
    const { setFieldChange } = useSetRequest()

    
    const {data, isLoading} = useGetDataQuery({
      ...state,
      getUrl: apiEndpoints.transaction.dashboardDay + (state.request?.day
        ? dayjs(state.request?.day).format("YYYY-MM-DD")
        : dayjs().format("YYYY-MM-DD"))
    })
    
    return (
      <div>
        <Form.Item className="my-5">
          <DatePicker
            format={customFormat}
            defaultValue={dayjs(dayjs().format(dateFormat), dateFormat)}
            className="py-3 border-none font-[poppins-500] font-semibold text-[#424D61]"
            prevIcon={<img src={calendar} alt="" />}
            suffixIcon={<img src={dropdown} alt="" />}
            onChange={(e) => setFieldChange("day", e)}
            picker="date"
          />
        </Form.Item>
        <Statistics data={data} isLoading={isLoading} />
        <Chart data={data} isLoading={isLoading} />
        <TransactionTable  />
      </div>
    )
}

export default Dashboard
