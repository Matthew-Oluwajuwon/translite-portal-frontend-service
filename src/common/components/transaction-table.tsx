/* eslint-disable prettier/prettier */
import React from "react"
import { PageTable } from "./table"

interface Props {
  column?: any[]
  dataSource?: any[]
  tableName?: string
  btn?: any
  forms?: any
  loading?: boolean
  pageSize?: number
  shouldExpand?: boolean
  scrollX?: number
}

export const TransactionTableComponent: React.FC<Props> = ({
  btn,
  column,
  dataSource,
  forms,
  loading,
  pageSize,
  tableName,
  shouldExpand,
  scrollX
}) => {
  return (
    <div className="bg-white w-full rounded-lg my-5 table-shadow">
      <div className="flex justify-between items-center px-3 sm:px-10 py-5">
        <h1 className="text-sm md:text-xl text-[#272848] font-semibold">
          {tableName}
        </h1>
        {btn}
      </div>
      {forms}
        
      <PageTable
        column={column}
        loading={loading}
        dataSource={dataSource}
        pageSize={pageSize}
        shouldExpand={shouldExpand}
        scrollX={scrollX}
      />
      </div>
  )
}
