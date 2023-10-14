/* eslint-disable prettier/prettier */
import { Column } from "@ant-design/plots"
import { Select, Spin } from "antd"
import { Bar, BarConfig, ColumnConfig } from "@ant-design/charts"
import { ApiResponse } from "../../../model/client/response"
import useAmountFormat from "../../../custom-hooks/useAmountFormat"

export const Chart = ({
  data,
  isLoading,
  barChartData,
}: {
  data: Array<ApiResponse.SevenDaysReport>
  isLoading: boolean
  barChartData: Array<ApiResponse.ProcessorSuccessPercentage>
}) => {
  const totalAmount = data
    ?.filter((x) => {
      return x.type?.toLowerCase() === "successful"
    })
    .reduce((x, y) => {
      return x + (y?.value as number)
    }, 0)
    .toFixed(2)
    .toString()
  const { numberWithCommas } = useAmountFormat()

  const reversedData = Array.isArray(data)
    ? data?.slice(0, 18).reverse().concat(data?.slice(18, 21))
    : []

  const config = {
    data: reversedData,
    xField: "day",
    yField: "value",
    seriesField: "type",
    maxColumnWidth: 10,
    minColumnWidth: 5,
    dodgePadding: 10,
    legend: false,
    isGroup: true,
    columnStyle: {
      radius: [20, 20, 20, 20],
      // lineWidth: 1,
      // fillOpacity: 0.5,
      // shadowBlur: 10,
      // shadowOffsetX: 5,
      // shadowOffsetY: 5,
      // cursor: 'pointer',
    },
  } as ColumnConfig

  interface BarChartProp {
    name?: string
    value?: string
    type?: string
  }

  const data_2 = Array.isArray(barChartData)
    ? barChartData?.map((item: BarChartProp) => {
        return [
          {
            name: item?.name,
            value: parseFloat(item?.value as string),
            type: "Successful",
          },
          {
            name: item?.name,
            value: 100 - parseFloat(item?.value as string),
            type: "Failed",
          },
        ]
      })
    : []

  const configs = {
    data: Array.isArray(data_2[0]) ? data_2[0] : [],
    isStack: true,
    xField: "value",
    yField: "name",
    seriesField: "type",
    maxBarWidth: 35,
    label: {
      position: "middle",
      layout: [
        {
          type: "interval-adjust-position",
        },
        {
          type: "interval-hide-overlap",
        },
        {
          type: "adjust-color",
        },
      ],
    },
  } as BarConfig

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_30rem] gap-6 overflow-auto">
      <div className="bg-white rounded-lg px-10 py-5 overflow-auto">
        {isLoading ? (
          <div className="h-80 grid place-content-center">
            <Spin spinning={isLoading} />
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center  text-[0.70rem]">
              <h1 className="text-[#424D61] text-xl font-semibold">
                Transaction Summary
              </h1>
              <div className="justify-between items-center gap-2 hidden xl:flex">
                <p className="t">Total</p>
                <p className="s">Successful</p>
                <p className="f">Failed</p>
                <Select
                  defaultValue="Last 7 Days"
                  className="bg-[#F5F6FA] border-none font-bold"
                  disabled
                >
                  <Select.Option value="last_7_days">Last 7 Days</Select.Option>
                </Select>
              </div>
            </div>
            <p className="text-[#272848]  font-sans font-bold text-3xl my-10">
              {`₦${numberWithCommas(totalAmount)}`}
            </p>
            <Column
              {...config}
              color={["#FF291F", "#4FC62B", "#6D71F9" ]}
              height={220}
            />
          </>
        )}
      </div>
      <div className="bg-white rounded-lg text-[0.8rem] px-10">
        {isLoading ? (
          <div className="h-80 grid place-content-center">
            <Spin spinning={isLoading} />
          </div>
        ) : (
          <>
            <h1 className="text-[#424D61] font-semibold text-center mt-5">
              Performance Transaction Processor (%)
            </h1>
            <Bar {...configs} color={["#4FC62B", "#FF291F"]} />
          </>
        )}
      </div>
    </div>
  )
}
