/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import { Card, Progress } from "antd"
import TranCount from "../../../assets/icons/transaction-count.svg"
import SuccessCount from "../../../assets/icons/success-count.svg"
import FailedCount from "../../../assets/icons/failed-count.svg"
import React from "react"

const Statistics: React.FC = () => {
  const items = [
    {
      cardTitle: (
        <h1 className="font-bold text-xl text-[#272848]">
          +53%{" "}
          <span className="font-medium text-[35%] 2xl:text-[0.65rem]">
            since last week
          </span>
        </h1>
      ),
      cardCount: (
        <p className="font-medium text-[65%] 2xl:text-[0.85rem]">
          Transaction Growth Rate
        </p>
      ),
      icon: (
        <Progress type="circle" size={"small"} status="active" percent={53} />
      ),
    },
    {
      cardTitle: <h1 className="font-bold text-xl">125,350</h1>,
      cardCount: (
        <p className="text-[#94A0B4] text-[0.75rem]">Total Transactions</p>
      ),
      icon: <img src={TranCount} alt="tran-count" />,
    },
    {
      cardTitle: <h1 className="font-bold text-xl">125,300</h1>,
      cardCount: (
        <p className="text-[#94A0B4] text-[0.75rem]">Successful Transactions</p>
      ),
      icon: <img src={SuccessCount} alt="success-count" />,
    },
    {
      cardTitle: <h1 className="font-bold text-xl">50</h1>,
      cardCount: (
        <p className="text-[#94A0B4] text-[0.75rem]">Failed Transactions</p>
      ),
      icon: <img src={FailedCount} alt="failed-count" />,
    },
  ]

  return (
    <div className="w-full flex gap-5 overflow-auto my-[0.8rem] 2xl:my-[1.3rem]">
      {items.map((item, index) => (
        <Card key={index} className={`w-[80%] min-w-[17rem] bg-white font-medium`}>
          <div className="flex items-center justify-between gap-2">
            <span className="basis-[40%]">{item.icon}</span>
            <div className="w-full grid gap-3">
              {item.cardTitle}
              {item.cardCount}
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

export default Statistics
