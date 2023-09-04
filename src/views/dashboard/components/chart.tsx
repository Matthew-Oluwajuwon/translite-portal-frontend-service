/* eslint-disable prettier/prettier */
import { Column, Pie } from "@ant-design/plots"
import { Select, Spin } from "antd"
import { ColumnConfig, PieConfig } from "@ant-design/charts"
import { ApiResponse } from "../../../model/client/response"
import useAmountFormat from "../../../custom-hooks/useAmountFormat"

export const Chart = ({
  data,
  isLoading,
}: {
  data: Array<ApiResponse.SevenDaysReport>
  isLoading: boolean
}) => {
  const totalAmount = data
    ?.filter((x) => {
      return x.type?.toLowerCase() === "successful"
    })
    .reduce((x, y) => {
      return x + (y?.value as number)
    }, 0)
    .toString()
  const { numberWithCommas } = useAmountFormat()

  const config = {
    data: Array.isArray(data) ? data : [],
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

  const pieData = [
    {
      name: "ISW",
      value: 108100,
    },
    {
      name: "NIBSS",
      value: 40100,
    },
  ]

  const configs = {
    appendPadding: 10,
    data: pieData,
    angleField: "value",
    colorField: "name",
    radius: 1,
    innerRadius: 0.6,
    legend: {
      layout: "horizontal",
      position: "bottom",
    },
    label: {
      type: "",
      offset: "-50%",
      content: "{value}",
      style: {
        textAlign: "center",
        fontSize: 14,
      },
    },
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: "pre-wrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
        content: false,
      },
    },
    interactions: [
      {
        type: "element-selected",
      },
      {
        type: "element-active",
      },
    ],
  } as unknown as PieConfig

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_20rem] gap-6 overflow-auto">
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
            <h1 className="text-[#272848] font-bold font-[poppins-600] text-3xl my-10">
              ₦{numberWithCommas(totalAmount)}
            </h1>
            <Column
              {...config}
              color={["#6D71F9", "#4FC62B", "#FF291F"]}
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
              Performance Transaction Processor
            </h1>
            <Pie {...configs} color={["#6D71F9", "#FACE2B"]} />
          </>
        )}
      </div>
    </div>
  )
}
