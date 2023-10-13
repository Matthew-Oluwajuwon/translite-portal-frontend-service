/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */

import { MENU_NAMES, MENU_KEYS, BREADCRUMB } from "@common/constants"
import usePageInfo from "../../custom-hooks/usePageInfo"
import { TableComponent } from "@common/components/table-component"
import { Button, Form, Row, Col, Input, Switch, Dropdown } from "antd"
import { setGlobalKey } from "../../store"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import Plus from "../../assets/icons/plus.svg"
import download from "../../assets/icons/download.svg"
import Search from "../../assets/icons/Search.svg"
import useApiMethods from "../../custom-hooks/useApiMethods"
import useFilter from "../../custom-hooks/useFilter"
import useToggle from "../../custom-hooks/useToggle"
import { ColumnProps } from "antd/es/table"
import { ApiResponse } from "../../model/client/response"
import { useEffect } from "react"
import { apiEndpoints } from "../../store/apiEndpoints"
import more from "../../assets/icons/more-action.svg"
import AddProcessor from "./component/AddProcessor"
import { useExcel } from "../../custom-hooks/useExcel"

const Processor: React.FC = () => {
  const dispatch = useAppDispatch()
  const state = useAppSelector((state) => {
    return state.global
  })

  const { toggleFormModal } = useToggle()

  const columns: ColumnProps<ApiResponse.Processor>[] = [
    {
      title: "NAME",
      dataIndex: "name",
      key: "1",
    },
    {
      title: "IP",
      dataIndex: "ip",
      key: "2",
    },
    {
      title: "PORT",
      dataIndex: "port",
      key: "3",
    },
    {
      title: "CARD SCHEME",
      dataIndex: "",
      render: (_: any, record: ApiResponse.Processor) => {
        return (
          <p>
            {record.cardSchemes
              ? record.cardSchemes?.map((x: string) => x + ", ")
              : "N/A"}
          </p>
        )
      },
      key: "4",
    },
    {
      title: "KEY DOWNLOAD",
      dataIndex: "",
      render: (_: any, record: ApiResponse.Processor) => {
        return (
          <span className="font-[poppins-500]">
            <Switch
              checked={record.allowKeyExchange}
              disabled
              style={{
                background: record.allowKeyExchange ? "#38D79F" : "#ACAEC4",
              }}
            />{" "}
            {record.allowKeyExchange ? "Enabled" : "Disabled"}
          </span>
        )
      },
      key: "5",
    },
    {
      title: "ACTION",
      dataIndex: "",
      key: "6",
      fixed: "right",
      width: "100px",
      render: (_: any, record: ApiResponse.Processor) => {
        return (
          <Dropdown
            placement="bottomLeft"
            trigger={["click"]}
            menu={{
              items: [
                {
                  key: "1",
                  label: (
                    <button
                      className="w-20 flex items-center justify-start text-[1rem] gap-2"
                      onClick={() => toggleFormModal(true, "UPDATE", record)}
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

  useEffect(() => {
    handleApiMethodController(
      state,
      apiEndpoints.processor.getProcessors,
      "READ",
      {},
      state.page,
    )
  }, [state.page])

  usePageInfo(MENU_NAMES.PROCESSOR, MENU_KEYS.PROCESSOR, BREADCRUMB.PROCESSOR)
  const { handleApiMethodController, data } = useApiMethods()

  const { dataSource } = useFilter(
    Array.isArray(data.data?.data?.processorDTOS)
      ? data.data?.data?.processorDTOS
      : [],
  )

  const { downloadDataToExcel, generateData } = useExcel()

  return (
    <div>
      {state.showFormModal && <AddProcessor />}
      <TableComponent
        tableName="List of Processors"
        column={columns}
        dataSource={dataSource}
        btn={
          <div className="flex items-center gap-5">
            <Button
              type="primary"
              onClick={() => toggleFormModal(true, "CREATE")}
              className="flex justify-between items-center text-[0.7rem] bg-[#6D71F9] sm:text-[1rem] font-semibold gap-2 py-6 px-2 sm:px-0 -pr-10 sm:pr-3"
            >
              <img src={Plus} alt="add" className="ml-2 sm:ml-0" />{" "}
              <div className="hidden md:block">Add New Processor</div>
            </Button>
            <button
              onClick={() =>
                downloadDataToExcel({
                  title: "Translite processor",
                  column: [],
                  rows: generateData(
                    (dataSource as any) ?? [],
                    dataSource?.length > 0
                      ? Object.keys(
                          dataSource.filter((x) => {
                            delete x.id
                            delete x.key
                            return x
                          })[0],
                        )
                      : [],
                  ),
                  extension: "xlsx",
                  fileName: "Translite processor",
                })
              }
              className="hover:shadow-md hover:scale-110 transition-all"
            >
              <img src={download} alt="download" className="rounded-md" />
            </button>
          </div>
        }
        forms={
          <Form
            layout="inline"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            className="mb-5 px-10 hidden md:block"
          >
            <Row style={{ width: "100%", alignItems: "end" }} gutter={8}>
              <Col span={6}>
                <Form.Item name={"search"}>
                  <Input
                    type="text"
                    placeholder="Search processor name"
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
            </Row>
          </Form>
        }
        loading={data.isLoading || data.isFetching}
      />
    </div>
  )
}

export default Processor
