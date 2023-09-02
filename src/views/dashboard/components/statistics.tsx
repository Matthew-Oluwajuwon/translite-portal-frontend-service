/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import { Card, Progress, Spin } from "antd"
import TranCount from "../../../assets/icons/transaction-count.svg"
import SuccessCount from "../../../assets/icons/success-count.svg"
import FailedCount from "../../../assets/icons/failed-count.svg"
import { ApiResponse } from "../../../model/client/response"
import useAmountFormat from "../../../custom-hooks/useAmountFormat"

const Statistics = ({ data, isLoading }: { data: any; isLoading: boolean }) => {
  const state: ApiResponse.DayReport = data
  const { numberWithCommas } = useAmountFormat()

  const items = [
    {
      cardTitle: (
        <span className="font-bold text-xl text-[#272848]">
          +
          {parseFloat(
            state?.successPercentage?.includes("NaN")
              ? 0.0
              : (state?.successPercentage as any),
          )}
          %{" "}
          <span className="font-medium text-[35%] 2xl:text-[0.65rem]">
            since last week
          </span>
          <br />
          <span className="font-medium text-[65%] 2xl:text-[0.85rem]">
            Transaction Growth Rate
          </span>
        </span>
      ),
      icon: (
        <Progress
          type="circle"
          size={"small"}
          strokeColor="#34AA44"
          strokeWidth={9}
          percent={parseFloat(state?.successPercentage as any)}
        />
      ),
    },
    {
      cardAmount: `₦${numberWithCommas(state?.totalValue?.toFixed(2))}`,
      cardCount: state?.totalCount,
      cardTitle: "Total Transactions",
      icon: <img src={TranCount} alt="tran-count" />,
    },
    {
      cardAmount: `₦${numberWithCommas(state?.successValue?.toFixed(2))}`,
      cardCount: state?.successCount,
      cardTitle: "Successful Transactions",
      icon: <img src={SuccessCount} alt="success-count" />,
    },
    {
      cardAmount: `₦${numberWithCommas(state?.failedValue?.toFixed(2))}`,
      cardCount: state?.failedCount,
      cardTitle: "Failed Transactions",
      icon: <img src={FailedCount} alt="failed-count" />,
    },
  ]

  return (
    <div className="w-full flex gap-5 overflow-auto my-[0.8rem] 2xl:my-[1.3rem]">
      {items.map((item, index) => (
        <Card
          key={index}
          className={`w-[80%] min-w-[17rem] bg-white font-medium`}
        >
          {isLoading ? (
            <div className="h-[6rem] grid place-content-center">
              <Spin spinning={isLoading} />
            </div>
          ) : (
            <div className="flex items-center justify-between gap-2">
              <span className="basis-[30%]">{item.icon}</span>
              <div className="w-full grid gap-3">
                <p className="font-bold text-xl">{item.cardAmount}</p>
                {/* <p className="font-bold text-lg -my-3">{item.cardCount}</p> */}
                <p className="text-[#94A0B4] text-[0.90rem]">
                  {item.cardTitle}
                </p>
              </div>
            </div>
          )}
        </Card>
      ))}
    </div>
  )
}

export default Statistics
