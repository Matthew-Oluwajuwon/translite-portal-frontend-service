/* eslint-disable prettier/prettier */
import { setGlobalKey } from "../../store"
import { useAppDispatch } from "../../store/hooks"
import { PageTable } from "./table"
import { useCallback } from "react"

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
  isNotPaginated?: boolean
  total?: number
  url?: string
  emptyParagraphText?: string;
  emptyHeadingText?: string
}

export const TableComponent: React.FC<Props> = ({
  btn,
  column,
  dataSource,
  forms,
  loading,
  pageSize,
  tableName,
  shouldExpand,
  scrollX,
  isNotPaginated,
  total,
  emptyHeadingText,
  emptyParagraphText
}) => {
  const dispatch = useAppDispatch()

  const onPaginate = useCallback(
    (pageNumber: number) => {
      dispatch(
        setGlobalKey({
          key: "page",
          value: pageNumber,
        }),
      )
    },
    [dispatch],
  )

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
        isNotPaginated={isNotPaginated}
        total={total}
        onPagination={onPaginate}
        emptyHeadingText={emptyHeadingText}
        emptyParagraphText={emptyParagraphText}
      />
    </div>
  )
}
