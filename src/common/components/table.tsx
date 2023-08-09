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
}) => {
  const dispatch = useAppDispatch()
  const state = useAppSelector((state) => state.global)
  const onRowSelect = (_rowIndex: number, record: any) => {
    dispatch(
        setAllGlobalKey({
        ...state,
        expand: shouldExpand ? true : false,
        record,
      }),
    )
  }
  return (
    <Spin spinning={loading}>
      <Table
        columns={column}
        dataSource={dataSource}
        pagination={{
          position: ["bottomRight"],
          // itemRender,
          onChange: onPagination,
          showSizeChanger: false,
          total: total,
          pageSize: pageSize,
        }}
        scroll={{ x: 1000 }}
        className="cursor-pointer"
        onRow={(record: any, rowIndex: number | undefined) => {
          return {
            onClick: async (event) => {
              onRowSelect(rowIndex as number, record)
            },
          }
        }}
      />
    </Spin>
  )
}
