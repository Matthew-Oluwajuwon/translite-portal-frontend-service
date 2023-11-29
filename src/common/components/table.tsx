/* eslint-disable prettier/prettier */
import { Empty, Spin, Table } from "antd"
import React from "react"
import { PageProps } from "../../model/application/props"
import { setAllGlobalKey } from "../../store"
import { useAppDispatch, useAppSelector } from "../../store/hooks"

export const PageTable: React.FC<PageProps.TableData> = ({
  column,
  dataSource,
  loading,
  onPagination,
  pageSize,
  total,
  shouldExpand,
  scrollX,
  emptyHeadingText,
  emptyParagraphText
}) => {
  const dispatch = useAppDispatch()
  const state = useAppSelector((state) => {
    return state.global
  })
  const onRowSelect = (_rowIndex: number, record: any) => {
    if (shouldExpand) {
      dispatch(
        setAllGlobalKey({
          ...state,
          expand: true,
          record,
        }),
      )
      
    }
  }
  return (
    <Spin spinning={loading}>
      <Table
        columns={column}
        dataSource={dataSource}
        pagination={{
          position: ["bottomRight"],
          onChange: onPagination,
          showSizeChanger: false,
          total: total,
          pageSize: pageSize,
          hideOnSinglePage: true,
        }}
        scroll={{ x: scrollX }}
        className="cursor-pointer"
        onRow={(record: any, rowIndex: number | undefined) => {
          return {
            onClick: async () => {
              onRowSelect(rowIndex as number, record)
            },
          }
        }}
        locale={{
          emptyText: emptyHeadingText && emptyParagraphText ? (
            <div className="h-60 grid place-content-center">
              {" "}
              <h1 className="text-[#182A2C] text-[1.5rem] font-bold">
                {" "}
                {emptyHeadingText}{" "}
              </h1>
              <p className="text-[#182A2C] text-[1rem]">
                {emptyParagraphText}
              </p>
            </div>
          ) : <Empty />,
        }}
      />
    </Spin>
  )
}
