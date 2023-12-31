/* eslint-disable prettier/prettier */

import { useLayoutEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { setAllGlobalKey } from "../../store"
import { BREADCRUMB, MENU_KEYS, MENU_NAMES } from "../../common/constants"
import { Col, DatePicker, Form, Input, Row, Select } from "antd"
import { TransactionTableComponent } from "../../common/components/transaction-table"
import { TableExpandModal } from "../../common/components/table-expand-modal"
import Download from "../../assets/icons/download.svg"
import Search from "../../assets/icons/Search.svg"
import Seperator from "../../assets/icons/seperator.svg"
import { ColumnProps } from "antd/es/table"
import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"
import dropdown from "../../assets/icons/dropdown.svg"
import { data } from "@views/dashboard/components/mock-data"

const Transactions: React.FC = () => {
  const dispatch = useAppDispatch()
  const state = useAppSelector((state) => {
    return state.global
  })
  useLayoutEffect(() => {
    document.title = MENU_NAMES.TRANSACTION + " | Translite"
    dispatch(
      setAllGlobalKey({
        ...state,
        selectedKey: MENU_KEYS.TRANSACTION,
        pageTitle: MENU_NAMES.TRANSACTION,
        breadcrumb: BREADCRUMB.TRANSACTION,
      }),
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  dayjs.extend(customParseFormat)

  const column: ColumnProps<any>[] = [
    {
      title: "SN",
      dataIndex: "key",
      ellipsis: true,
      width: "60px",
      key: "1",
    },
    {
      title: "RRN",
      dataIndex: "rrn",
      ellipsis: true,
      key: "2",
    },
    {
      title: "AMOUNT",
      dataIndex: "amount",
      ellipsis: true,
      key: "3",
    },
    {
      title: "PROCESSOR",
      dataIndex: "processor",
      ellipsis: true,
      key: "4",
    },
    {
      title: "TERMINAL ID | PLAN",
      dataIndex: "terminalId",
      ellipsis: true,
      key: "5",
      render(_: any, record: any) {
        return (
          <span className="grid place-content-center text-center">
            {record.terminalId}
          </span>
        )
      },
    },
    {
      title: "DATE | TIME",
      dataIndex: "dateTime",
      key: "6",
      ellipsis: true,
      render(_: any, record: any) {
        return (
          <span className="grid place-content-center text-center">
            {record.dateTime}
          </span>
        )
      },
    },
    {
      title: "STATUS | RESPONSE CODE",
      dataIndex: "status",
      key: "7",
      ellipsis: true,
      render(_: any, record: any) {
        return (
          <span className="grid place-content-center text-center">
            {record.status}
          </span>
        )
      },
    },
  ]
  const dateFormat = "YYYY-MM-DD"

  return (
    <div>
      <TableExpandModal
        isDownloadable={true}
        modalCardTitle="Transaction Details"
      />
      <TransactionTableComponent
        shouldExpand={true}
        tableName="Transaction History"
        btn={
          <button className="hover:shadow-md hover:scale-110 transition-all">
            <img src={Download} alt="download" className="rounded-md" />
          </button>
        }
        forms={
          <Form
            layout="vertical"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            className="mb-5 px-10 hidden md:block"
          >
            <Row style={{ width: "100%", alignItems: "end" }} gutter={16}>
              <Col span={6}>
                <Form.Item name={"search"}>
                  <Input
                    type="text"
                    placeholder="Search by.."
                    prefix={<img src={Search} alt="search" />}
                    className="h-12"
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label={
                    <span className="text-[#0E0E30CC] font-[poppins-500] font-semibold">
                      Select Processor
                    </span>
                  }
                  name={"processor"}
                  initialValue="All"
                >
                  <Select
                    className="border border-[#DEDFEC] rounded-md h-12 flex items-center"
                    suffixIcon={<img src={dropdown} alt="" />}
                  >
                    <Select.Option value="all">All</Select.Option>
                    <Select.Option value="isw">ISW</Select.Option>
                    <Select.Option value="nibss">NIBSS</Select.Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item
                  label={
                    <span className="text-[#0E0E30CC] font-[poppins-500] font-semibold">
                      Status
                    </span>
                  }
                  name={"status"}
                  initialValue="All"
                >
                  <Select
                    className="border border-[#DEDFEC] rounded-md h-12 flex items-center"
                    suffixIcon={<img src={dropdown} alt="" />}
                  >
                    <Select.Option value="all">All</Select.Option>
                    <Select.Option value="success">Success</Select.Option>
                    <Select.Option value="failed">Failed</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label={
                    <span className="text-[#0E0E30CC] font-[poppins-500] font-semibold">
                      Date range
                    </span>
                  }
                  name={"date"}
                  initialValue={[
                    dayjs("2022-09-03", dateFormat),
                    dayjs("2023-11-22", dateFormat),
                  ]}
                >
                  <DatePicker.RangePicker
                    className="h-12"
                    placement="topLeft"
                    separator={
                      <img
                        src={Seperator}
                        alt="seperator"
                        className="w-[4rem]"
                      />
                    }
                    cellRender={(current) => {
                      const style: React.CSSProperties = {}
                      if (current.date() === 1) {
                        style.border = "1px solid #1890ff"
                        style.borderRadius = "50%"
                      }
                      return (
                        <div className="ant-picker-cell-inner" style={style}>
                          {current.date()}
                        </div>
                      )
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        }
        loading={false}
        column={column}
        dataSource={data}
        scrollX={1000}
      />
    </div>
  )
}

export default Transactions
