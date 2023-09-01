/* eslint-disable prettier/prettier */

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
import usePageInfo from "../../custom-hooks/usePageInfo"
import { ApiResponse } from "../../model/client/response"
import { useEffect } from "react"
import { useGetDataByPostMethodMutation, useGetDataQuery } from "../../store"
import { apiEndpoints } from "../../store/apiEndpoints"
import { useAppSelector } from "../../store/hooks"
import useAmountFormat from "../../custom-hooks/useAmountFormat"
import { useFilter } from "../../custom-hooks/useFilter"

const Transactions: React.FC = () => {
const state = useAppSelector(state => {
  return state.global
})
  usePageInfo(
    MENU_NAMES.TRANSACTION,
    MENU_KEYS.TRANSACTION,
    BREADCRUMB.TRANSACTION,
  )

  dayjs.extend(customParseFormat)
  const { numberWithCommas } = useAmountFormat()


  const column: ColumnProps<any>[] = [
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
      render: (_: any, record: ApiResponse.Transaction) => {
        return <p>₦{numberWithCommas(record.amount)}</p>
      },
      key: "3",
    },
    {
      title: "PROCESSOR",
      dataIndex: "processedBy",
      ellipsis: true,
      key: "4",
    },
    {
      title: "PAN",
      dataIndex: "pan",
      ellipsis: true,
      key: "40",
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
      dataIndex: "",
      key: "6",
      ellipsis: true,
      render(_: any, record: ApiResponse.Transaction) {
        return (
          <div className="grid place-content-center text-center">
            <p>{record.createdDate?.split("T")[0].replaceAll("-", "/")}</p>
            <p>
              {record.createdDate?.split("T")[1].split("+")[0].split(".")[0]}
            </p>
          </div>
        )
      },
    },
    {
      title: "STATUS | RESPONSE CODE",
      dataIndex: "status",
      key: "7",
      ellipsis: true,
      render(_: any, record: ApiResponse.Transaction) {
        return (
          <span className="grid place-content-center">
            <span className={record.responseCode === "00" ? "s" : "f"}>
              {record.responseCode === "00" ? "Success" : "Failed"}
              <p className="text-center">{record.responseCode}</p>
            </span>
          </span>
        )
      },
    },
  ]
  const dateFormat = "YYYY-MM-DD"
  
  const [getDataByPostMethod, result] = useGetDataByPostMethodMutation()
  const { onChangeSearch } = useFilter();

  const processors = useGetDataQuery({
    ...state,
    getUrl: apiEndpoints.processor.getProcessors,
  })

  useEffect(() => {
    getDataByPostMethod({
      ...state,
      postUrl: apiEndpoints.transaction.getTransactions,
      page: 1,
    })
  }, [getDataByPostMethod, state])

  const dataSource =
    result.data &&
    (result.data?.data?.transactionDTOS?.map(
      (item: ApiResponse.Transaction, index: number) => {
        return {
          ...item,
          key: index + 1,
        }
      },
    ) as Array<ApiResponse.Transaction>)

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
                    onChange={(e) => onChangeSearch(e.target.value)}
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
                    onChange={(e) =>
                      getDataByPostMethod({
                        ...state,
                        postUrl:
                          e === "all"
                            ? apiEndpoints.transaction.getTransactions
                            : apiEndpoints.transaction
                                .getTransactionsByProcessorName + e,
                        page: 1,
                      })
                    }
                  >
                    <Select.Option value="all">All</Select.Option>
                    {processors.data &&
                      processors.data?.processorDTOS?.map(
                        (item: ApiResponse.Processor, index: number) => (
                          <Select.Option key={index} value={item.name}>
                            {item.name}
                          </Select.Option>
                        ),
                      )}
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
                    dayjs(dayjs().format(dateFormat), dateFormat),
                    dayjs(dayjs().subtract(30, 'day').format(dateFormat), dateFormat),
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
                    onChange={(e, dateString) => getDataByPostMethod({
                      ...state,
                      postUrl: apiEndpoints.transaction.searchTransaction,
                      page: 1,
                      request: {
                        fromDate: dateString[0],
                        toDate: dateString[1],
                      }
                    })}
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
        loading={result.isLoading || processors.isLoading}
        column={column}
        dataSource={dataSource}
        scrollX={1000}
        total={result.data?.data?.totalCount}
      />
    </div>
  )
}

export default Transactions
