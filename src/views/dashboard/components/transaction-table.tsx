/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Col, Form, Row, Select } from "antd"
import IconRight from "../../../assets/icons/icon-right.svg"
import { ColumnProps } from "antd/es/table"
import { useNavigate } from "react-router-dom"
import { TableComponent } from "../../../common/components/table-component"
import { ROUTE } from "../../../common/constants"
import dropdown from "../../../assets/icons/dropdown.svg"
import { ApiResponse } from "../../../model/client/response"
import useAmountFormat from "../../../custom-hooks/useAmountFormat"
import useApiMethods from "../../../custom-hooks/useApiMethods"
import { useEffect } from "react"
import { apiEndpoints } from "../../../store/apiEndpoints"
import { useAppDispatch, useAppSelector } from "../../../store/hooks"
import { setGlobalKey } from "../../../store"
import useFieldApiData from "../../../custom-hooks/useFieldApiData"
import { LoadingOutlined } from "@ant-design/icons"

export const TransactionTable = () => {
  const dispatch = useAppDispatch()
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

  const { apiDataLoading } = useFieldApiData()

  const { handleApiMethodController, result } = useApiMethods()

  useEffect(() => {
    handleApiMethodController(
      state,
      apiEndpoints.transaction.getTransactions,
      "GET_BY_POST_METHOD",
      {},
      state.page,
    )
  }, [handleApiMethodController])

  const dataSource =
    result.data &&
    (result.data?.data?.transactionDTOS
      ?.slice(0, 5)
      ?.map((item: ApiResponse.Transaction, index: number) => {
        return {
          ...item,
          key: index + 1,
        }
      }) as Array<ApiResponse.Transaction>)

  return (
    <div>
      <TableComponent
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
              <Col xs={24} lg={4}>
                <Form.Item
                  label={
                    <h1 className="font-[poppins-500] font-semibold text-[#0E0E30CC]">
                      Select Processor
                    </h1>
                  }
                  name={"processor"}
                >
                  <Select
                onFocus={() => dispatch(setGlobalKey({
                  key: "selectField",
                  value: "Processor"
                }))}
                allowClear
                suffixIcon={apiDataLoading ? <LoadingOutlined className="text-[#4C469B]" spin /> : <img src={dropdown} alt="" />}
                className="border border-[#DEDFEC] rounded-md h-11 flex items-center"
                onChange={(e) => handleApiMethodController(
                  state,
                  apiEndpoints.transaction.getTransactionsByProcessorName + e,
                  "GET_BY_POST_METHOD",
                  {},
                  state.page,
                )}
                value={state.request?.processorName}
                options={
                  Array.isArray(state.processor)
                    ? state.processor?.map((item: any) => {
                        return {
                          label: item.name,
                          value: item.name,
                        };
                      })
                    : []
                }
                loading={apiDataLoading}
                filterOption={(input, option: any) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        }
        loading={result.isLoading}
        pageSize={5}
        tableName="Recent Transaction"
        scrollX={1000}
      />
    </div>
  )
}
