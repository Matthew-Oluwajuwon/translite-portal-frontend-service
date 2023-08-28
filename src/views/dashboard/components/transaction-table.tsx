/* eslint-disable prettier/prettier */
import { Button, Col, Form, Row, Select } from "antd"
import IconRight from "../../../assets/icons/icon-right.svg"
import { ColumnProps } from "antd/es/table"
import { useNavigate } from "react-router-dom"
import { TransactionTableComponent } from "../../../common/components/transaction-table"
import { ROUTE } from "../../../common/constants"
import dropdown from "../../../assets/icons/dropdown.svg"
import { ApiResponse } from "../../../model/client/response"
import { useGetDataByPostMethodMutation, useGetDataQuery } from "../../../store"
import { useEffect } from "react"
import { useAppSelector } from "../../../store/hooks"
import { apiEndpoints } from "../../../store/apiEndpoints"
import useAmountFormat from "../../../custom-hooks/useAmountFormat"

export const TransactionTable = () => {
  const state = useAppSelector((state) => {
    return state.global
  })
  const navigate = useNavigate()
  const { numberWithCommas } = useAmountFormat()

  const column: ColumnProps<ApiResponse.Transaction>[] = [
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
      title: "TERMINAL ID | PLAN",
      dataIndex: "terminalId",
      ellipsis: true,
      key: "5",
      render(_: any, record: ApiResponse.Transaction) {
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

  const [getDataByPostMethod, result] = useGetDataByPostMethodMutation()
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
    (result.data?.data?.transactionDTOS?.slice(0, 5)?.map(
      (item: ApiResponse.Transaction, index: number) => {
        return {
          ...item,
          key: index + 1,
        }
      },
    ) as Array<ApiResponse.Transaction>)

  return (
    <div>
      <TransactionTableComponent
        btn={
          <Button
            type="primary"
            className="flex justify-between items-center text-[0.7rem] bg-[#6D71F9] sm:text-[1rem] gap-2 sm:gap-5 py-6 px-2 sm:px-0 -pl-10 sm:pl-3"
            onClick={() => navigate(ROUTE.TRANSACTION)}
          >
            <p className="hidden sm:block">See all transactions</p>
            <img src={IconRight} alt="icon-right" />
          </Button>
        }
        shouldExpand={false}
        column={column}
        isNotPaginated={true}
        dataSource={dataSource}
        forms={
          <Form
            layout="vertical"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            className="my-10 px-10"
          >
            <Row style={{ width: "100%" }}>
              <Col xs={24} lg={3}>
                <Form.Item
                  initialValue="All"
                  label={
                    <h1 className="font-[poppins-500] font-semibold text-[#0E0E30CC]">
                      Select Processor
                    </h1>
                  }
                  name={"processor"}
                >
                  <Select
                    className="border border-[#DEDFEC] rounded-md h-11 flex items-center"
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
            </Row>
          </Form>
        }
        loading={result.isLoading || processors.isLoading}
        pageSize={5}
        tableName="Recent Transaction"
        scrollX={1000}
      />
    </div>
  )
}
