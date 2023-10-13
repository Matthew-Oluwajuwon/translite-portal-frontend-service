/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */

import { BREADCRUMB, MENU_KEYS, MENU_NAMES } from "../../../common/constants"
import { Button, Col, Dropdown, Form, Input, Row, Select } from "antd"
import { TableComponent } from "../../../common/components/table-component"
import { TableExpandModal } from "../../../common/components/table-expand-modal"
import Download from "../../../assets/icons/download.svg"
import Search from "../../../assets/icons/Search.svg"
import Plus from "../../../assets/icons/plus.svg"
import { ColumnProps } from "antd/es/table"
import TerminalCreateion from "../components/terminal-creation"
import useToggle from "../../../custom-hooks/useToggle"
import usePageInfo from "../../../custom-hooks/usePageInfo"
import { useAppDispatch, useAppSelector } from "../../../store/hooks"
import { setAllGlobalKey, setGlobalKey } from "../../../store"
import useApiMethods from "../../../custom-hooks/useApiMethods"
import useFieldApiData from "../../../custom-hooks/useFieldApiData"
import { ApiResponse } from "../../../model/client/response"
import { apiEndpoints } from "../../../store/apiEndpoints"
import dropdown from "../../../assets/icons/dropdown.svg"
import { useCallback, useEffect } from "react"
import useFilter from "../../../custom-hooks/useFilter"
import useSetRequest from "../../../custom-hooks/useSetRequest"
import more from "../../../assets/icons/more-action.svg"
import { LoadingOutlined } from "@ant-design/icons"

const ProcessorTerminal: React.FC = () => {
  const dispatch = useAppDispatch()
  const state = useAppSelector((state) => {
    return state.global
  })
  usePageInfo(
    MENU_NAMES.PROCESSOR_TERMINAL_MGT,
    MENU_KEYS.PROCESSOR_TERMINAL_MGT,
    BREADCRUMB.PROCESSOR_TERMINAL_MGT,
  )

  const onEdit = useCallback(
    (record: ApiResponse.TerminalProcessor) => {
      dispatch(
        setAllGlobalKey({
          ...state,
          terminal: {
            ...state.terminal,
            showCreateModal: true,
            modalName: "Update Processor Terminal",
            modalDesc: "Update processor terminal " + record.terminalId,
          },
          request: {
            ...state.request,
            terminalId: record.terminalId,
            processorId: record.processorDTO?.name,
          },
        }),
      )
    },
    [dispatch, state],
  )

  const column: ColumnProps<ApiResponse.TerminalProcessor>[] = [
    {
      title: "TERMINAL ID",
      dataIndex: "terminalId",
      ellipsis: true,
      key: "1",
      render(_: any, record: ApiResponse.TerminalProcessor) {
        return (
          <span className="grid place-content-start text-center">
            {record.terminalId}
          </span>
        )
      },
    },
    {
      title: "PROCESSOR(S)",
      dataIndex: "",
      ellipsis: true,
      key: "2",
      render(_: any, record: ApiResponse.TerminalProcessor) {
        return (
          <span className="grid place-content-start text-center">
            {record.processorDTO?.name}
          </span>
        )
      },
    },
    {
      title: "UPLOAD BY",
      dataIndex: "dateTime",
      key: "4",
      ellipsis: true,
      render(_: any, record: ApiResponse.TerminalProcessor) {
        return (
          <span className="grid place-content-start text-center">
            {record.uploadedBy}
          </span>
        )
      },
    },
    {
      title: "UPLOAD DATE",
      dataIndex: "",
      key: "5",
      ellipsis: true,
      render(_: any, record: ApiResponse.TerminalProcessor) {
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
      title: "STATUS",
      dataIndex: "",
      ellipsis: true,
      key: "3",
      render(_: any, record: ApiResponse.TerminalProcessor) {
        return (
          <div className="flex items-center ">
            <div className={record.terminalStatus === "ACTIVE" ? "s" : "f"} />
            <p className="text-center">{record.terminalStatus}</p>
          </div>
        )
      },
    },
    {
      title: "ACTION",
      dataIndex: "",
      key: "6",
      fixed: "right",
      width: "100px",
      render: (_: any, record: ApiResponse.TerminalProcessor) => {
        return (
          <Dropdown
            placement="bottomRight"
            trigger={["hover"]}
            menu={{
              items: [
                {
                  key: "1",
                  label: (
                    <button
                      className="w-20 flex z-50 items-center justify-start text-[1rem] gap-2"
                      onFocus={() => onEdit(record)}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M13.3585 1.8121C12.7154 1.17167 11.6731 1.17206 11.0305 1.81297L6.06018 6.77093C5.66265 7.1674 5.42894 7.69813 5.40528 8.25812L5.33453 9.93324C5.30231 10.696 5.91409 11.3319 6.68015 11.332L8.32823 11.332C8.93331 11.3321 9.51278 11.0886 9.93528 10.657L14.8656 5.60406C15.495 4.96099 15.4883 3.93305 14.8507 3.29808L13.3585 1.8121ZM11.6656 2.44548C11.9577 2.15416 12.4315 2.15398 12.7238 2.44509L14.216 3.93107C14.5059 4.21969 14.5089 4.68694 14.2228 4.97924L13.2326 5.99094L10.6697 3.43875L11.6656 2.44548ZM10.035 4.07174L6.69534 7.40344C6.45682 7.64132 6.31659 7.95976 6.3024 8.29575L6.23165 9.97088C6.22091 10.2251 6.42483 10.4371 6.68019 10.4371L8.32827 10.4372C8.69132 10.4372 9.039 10.2912 9.2925 10.0322L12.6056 6.63157L10.035 4.07174Z"
                          fill="#272848"
                        />
                        <path
                          d="M14 8.66602V11.3327C14 13.1736 12.5076 14.666 10.6667 14.666H5.33333C3.49239 14.666 2 13.1736 2 11.3327V5.99935C2 4.1584 3.49238 2.66602 5.33333 2.66602H8"
                          stroke="#272848"
                          strokeLinecap="round"
                        />
                      </svg>
                      Edit
                    </button>
                  ),
                },
              ],
            }}
          >
            <button>
              <img src={more} alt="" />
            </button>
          </Dropdown>
        )
      },
    },
  ]

  const { toggleCreateModal } = useToggle()
  const { apiDataLoading } = useFieldApiData()
  const { setFormRequest } = useSetRequest()

  const { handleApiMethodController, data } = useApiMethods()

  useEffect(() => {
    if (state.request?.processorId && !state.terminal?.showCreateModal) {
      handleApiMethodController(
        state,
        apiEndpoints.terminal.getTerminalProcessor +
          `page=${state.page === 1 ? 0 : state.page}&size=10&processorId=${
            state.request?.processorId
          }`,
        "READ",
      )
    }
  }, [handleApiMethodController, state.request?.processorId])

  const { dataSource } = useFilter(data.data?.data?.processorTerminalDTOS)

  return (
    <div>
      <TableExpandModal
        isDownloadable={false}
        modalCardTitle="Terminal Details"
      />
      <TerminalCreateion />
      <TableComponent
        shouldExpand={true}
        tableName="Processor Terminals"
        btn={
          <div className="flex gap-3 items-center">
            <Button
              type="primary"
              onClick={() =>
                toggleCreateModal(
                  "Add Processor Terminal",
                  "Create new processor terminals ",
                )
              }
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
                    onChange={(e) =>
                      dispatch(
                        setGlobalKey({
                          key: "searchTerm",
                          value: e.target.value,
                        }),
                      )
                    }
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
                >
                  <Select
                    className="border border-[#DEDFEC] rounded-md h-12 flex items-center"
                    suffixIcon={apiDataLoading ? (
                      <LoadingOutlined className="text-[#4C469B]" spin />
                    ) : (
                      <img src={dropdown} alt="" />
                    )}
                    placeholder="Select a processor"
                    onFocus={() =>
                      dispatch(
                        setGlobalKey({
                          key: "selectField",
                          value: "Processor",
                        }),
                      )
                    }
                    loading={apiDataLoading}
                    allowClear
                    onChange={(e) => setFormRequest(e, "processorId")}
                  >
                    {state.processor?.map(
                      (item: ApiResponse.Processor, index: number) => (
                        <Select.Option key={index} value={item.id}>
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
        loading={data.isLoading || data.isFetching}
        column={column}
        dataSource={dataSource}
        scrollX={500}
        emptyParagraphText="Select a processor to view terminal processors"
        emptyHeadingText="No Terminal Processor"
      />
    </div>
  )
}

export default ProcessorTerminal
