/* eslint-disable prettier/prettier */

import { useLayoutEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { setAllGlobalKey } from "../../store"
import { MENU_KEYS, MENU_NAMES } from "../../common/constants"
import { Col, Form, Input, Row } from "antd"
import { TransactionTableComponent } from "../../common/components/transaction-table"
import { TableExpandModal } from "../../common/components/table-expand-modal"
import Download from "../../assets/icons/download.svg"
import Search from "../../assets/icons/Search.svg"
import Plus from "../../assets/icons/Plus.svg"
import { ColumnProps } from "antd/es/table"
import { data } from "./components/mock-data"
import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"

const Terminals: React.FC = () => {
  const dispatch = useAppDispatch()
  const state = useAppSelector((state) => {
    return state.global
  })
  useLayoutEffect(() => {
    document.title = MENU_NAMES.TERMINAL_MGT + " | Translite"
    dispatch(
      setAllGlobalKey({
        ...state,
        selectedKey: MENU_KEYS.TERMINAL_MGT,
        pageTitle: "Terminals",
        breadcrumb: "Home > Terminal Management",
      }),
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  dayjs.extend(customParseFormat)
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

  return (
    <div>
      <TableExpandModal
        isDownloadable={true}
        modalCardTitle="Transaction Details"
      />
      <TransactionTableComponent
        shouldExpand={true}
        tableName="System Terminals"
        btn={
          <div className="flex gap-3 items-center">
            <button className=" flex gap-3 items-center bg-[#6D71F9] text-white rounded-lg pr-2">
              <img src={Plus} alt="add" /> <span>Add System Terminal</span>
            </button>
            <button>
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
      />
    </div>
  )
}

export default Terminals
