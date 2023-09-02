/* eslint-disable prettier/prettier */
import { Spin, Table } from "antd"
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
  isNotPaginated,
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
          hideOnSinglePage: isNotPaginated,
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
      />
    </Spin>
  )
}
