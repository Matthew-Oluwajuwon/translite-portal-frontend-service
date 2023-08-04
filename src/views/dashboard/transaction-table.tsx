/* eslint-disable prettier/prettier */
import { Button, Col, Form, Row, Select } from "antd"
import IconRight from "../../assets/icons/icon-right.svg"
import { ColumnProps } from "antd/es/table"
import { data } from "./mock-data"
import { TransactionTableComponent } from "../../common/components/transaction-table"
import { useNavigate } from "react-router-dom"

export const TransactionTable: React.FC = () => {
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

  const navigate = useNavigate()

  return (
    <TransactionTableComponent
      btn={
        <Button
          type="primary"
          className="flex justify-between items-center text-[0.7rem] sm:text-[1rem] gap-2 sm:gap-5 py-6 px-2 sm:px-0 -pl-10 sm:pl-3"
          onClick={() => navigate("/home/transaction-management")}
        >
          See all transactions <img src={IconRight} alt="icon-right" />
        </Button>
      }
      shouldExpand={false}
      column={column}
      dataSource={data}
      forms={
        <Form
          layout="vertical"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          className="my-10 px-10"
        >
          <Row style={{ width: "100%" }}>
            <Col xs={24} lg={3}>
              <Form.Item label="Select Processor" name={"processor"}>
                <Select
                  defaultValue="All"
                  className="border border-[#DEDFEC] rounded-md h-10 flex items-center"
                >
                  <Select.Option value="all">All</Select.Option>
                  <Select.Option value="isw">ISW</Select.Option>
                  <Select.Option value="nibss">NIBSS</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      }
      loading={false}
      pageSize={5}
      tableName="Recent Transaction"
    />
  )
}
