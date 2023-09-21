/* eslint-disable prettier/prettier */

import { BREADCRUMB, MENU_KEYS, MENU_NAMES } from "../../../common/constants"
import { Button, Col, Form, Input, List, Row } from "antd"
import { TableComponent } from "../../../common/components/table-component"
import { TableExpandModal } from "../../../common/components/table-expand-modal"
import Download from "../../../assets/icons/download.svg"
import Search from "../../../assets/icons/Search.svg"
import Plus from "../../../assets/icons/plus.svg"
import { ColumnProps } from "antd/es/table"
import { data } from "./../components/mock-data"
import TerminalCreateion from "../components/terminal-creation"
import useToggle from "../../../custom-hooks/useToggle"
import usePageInfo from "../../../custom-hooks/usePageInfo"

const ProcessorTerminal: React.FC = () => {
  usePageInfo(
    MENU_NAMES.PROCESSOR_TERMINAL_MGT,
    MENU_KEYS.PROCESSOR_TERMINAL_MGT,
    BREADCRUMB.PROCESSOR_TERMINAL_MGT,
  )
  const TerminalKeys = [
    {
      key: "Terminal Keys",
      value: "tltx1436789658jdhklhffas.trxlite/tmn102",
    },
    {
      key: "ISW Keys",
      value: "ISW2ngx1436789658jdhklhffas.trxlite/tmn102",
    },
    {
      key: "NIBSS Keys",
      value: "NIBSS2ngx1436789658jdhklhffas.trxlite/tmn102",
    },
  ]
  const column: ColumnProps<any>[] = [
    {
      title: "TERMINAL ID",
      dataIndex: "terminalId",
      ellipsis: true,
      key: "1",
      render(_: any, record: any) {
        return (
          <span className="grid place-content-start text-center">
            {record.terminalId}
          </span>
        )
      },
    },
    {
      title: "TERMINAL SERIAL",
      dataIndex: "terminalSerial",
      ellipsis: true,
      key: "2",
      render(_: any, record: any) {
        return (
          <span className="grid place-content-start text-center">
            {record.terminalSerial}
          </span>
        )
      },
    },
    {
      title: "UPLOAD DATE",
      dataIndex: "dateTime",
      key: "3",
      ellipsis: true,
      render(_: any, record: any) {
        return (
          <span className="grid place-content-start text-center">
            {record.dateTime}
          </span>
        )
      },
    },
  ]
  const { toggleCreateModal } = useToggle()

  return (
    <div>
      <TableExpandModal
        isDownloadable={false}
        modalCardTitle="Terminal Details"
        extraContent={
          <div className="my-5">
            <span className="flex justify-between items-center px-10">
              <p className="text-[0.75rem]">Terminal Keys</p>
              <p className="text-[#6D71F9] text-[0.75rem] cursor-pointer hover:scale-95">
                Refresh Keys
              </p>
            </span>
            <List
              dataSource={TerminalKeys}
              className="mx-2 sm:mx-10 bg-[#F9F9F9] p-2 my-5"
              renderItem={(item) => (
                <List.Item>
                  <Row
                    style={{ width: "100%" }}
                    className="grid grid-cols-[6rem_8rem] lg:grid-cols-[12rem_1fr] "
                  >
                    <Col
                      lg={10}
                      className="text-[0.7rem] lg:text-[0.8rem] text-[#717E95]"
                    >
                      {item.key}:
                    </Col>
                    <Col
                      lg={14}
                      className="text-[0.7rem] lg:text-[0.8rem] text-[#272848] font-semibold"
                    >
                      {item.value}
                    </Col>
                  </Row>
                </List.Item>
              )}
            />
          </div>
        }
      />
      <TerminalCreateion />
      <TableComponent
        shouldExpand={true}
        tableName="Processor Terminals"
        btn={
          <div className="flex gap-3 items-center">
            <Button
              type="primary"
              onClick={toggleCreateModal}
              className="flex justify-between items-center text-[0.7rem] bg-[#6D71F9] sm:text-[1rem] gap-2 py-6 px-2 sm:px-0 -pr-10 sm:pr-3"
            >
              <img src={Plus} alt="add" className="ml-2 sm:ml-0" />{" "}
              <div className="hidden md:block">Add Processor Terminal</div>
            </Button>
            <button className="hover:shadow-md hover:scale-110 transition-all">
              <img src={Download} alt="download" className="rounded-md" />
            </button>
          </div>
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
            </Row>
          </Form>
        }
        loading={false}
        column={column}
        dataSource={data}
        scrollX={500}
      />
    </div>
  )
}

export default ProcessorTerminal
