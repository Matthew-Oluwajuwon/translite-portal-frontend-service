/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */

import { ColumnProps } from "antd/es/table/Column"
import { ApiResponse } from "../../../../model/client/response"
import { TableComponent } from "@common/components/table-component"
import { Button, Col, Input, Row, Select } from "antd"
import useToggle from "../../../../custom-hooks/useToggle"
import PlusIcon from "../../../../assets/icons/plus.svg"
import Search from "../../../../assets/icons/Search.svg"
import useApiMethods from "../../../../custom-hooks/useApiMethods"
import { apiEndpoints } from "../../../../store/apiEndpoints"
import { useAppSelector } from "../../../../store/hooks"
import useAmountFormat from "../../../../custom-hooks/useAmountFormat"
import dropdown from "../../../../assets/icons/dropdown.svg"
import { LoadingOutlined } from "@ant-design/icons"

const CustomRouting: React.FC = () => {
  const state = useAppSelector((state) => {
    return state.global
  })
  const { toggleAddNewRuleModal } = useToggle()
  const { numberWithCommas } = useAmountFormat()

  const column: ColumnProps<ApiResponse.BoundsDtos>[] = [
    {
      title: "LOWER BOUND",
      dataIndex: "lowerBound",
      key: "3",
      render: (_, record: ApiResponse.BoundsDtos) => {
        return <p>₦{numberWithCommas(record?.lowerBound?.toFixed(2))}</p>
      },
    },
    {
      title: "UPPER BOUND",
      dataIndex: "upperBound",
      key: "2",
      render: (_, record: ApiResponse.BoundsDtos) => {
        return <p>₦{numberWithCommas(record?.upperBound?.toFixed(2))}</p>
      },
    },
    {
      title: "PROCESSOR",
      dataIndex: "processor",
      key: "4",
      render: (_, record: ApiResponse.BoundsDtos) => {
        return <p>{record?.processorName}</p>
      },
    },
    // {
    //   title: "CREATION DATE",
    //   dataIndex: "creationDate",
    //   key: "5",
    //   render(_: any, record: ApiResponse.CustomConfiguration) {
    //     return (
    //       <div className="grid place-content-center text-center">
    //         <p>{record?.creationDate?.split("T")[0].replaceAll("-", "/")}</p>
    //         <p>
    //           {record?.creationDate?.split("T")[1].split("+")[0].split(".")[0]}
    //         </p>
    //       </div>
    //     )
    //   },
    // }
  ]
  const { handleApiMethodController, data, result } = useApiMethods()
  const dataSource = Array.isArray(data.data?.data?.boundsDTOS)
    ? data.data?.data?.boundsDTOS
    : []

  return (
    <TableComponent
      btn={
        data.data?.data && (
          <Button
            type="primary"
            className="flex justify-between items-center gap-2 mt-3 py-6 px-0 pr-5 bg-[#6D71F9]"
            onClick={() => toggleAddNewRuleModal(data.data?.data)}
          >
            <img src={PlusIcon} alt="icon-pluus" />{" "}
            {data.data?.data?.boundsDTOS?.length > 0
              ? "Edit Rule"
              : "Add New Rule"}
          </Button>
        )
      }
      forms={
        <Row>
          <Input
            type="text"
            placeholder="Search by.."
            prefix={<img src={Search} alt="search" />}
            className="h-12 w-[15rem] mx-10 mb-10"
          />
          <Col span={4}>
            <Select
              className="border border-[#DEDFEC] rounded-md h-12 flex items-center"
              suffixIcon={
                result.isLoading ? (
                  <LoadingOutlined className="text-[#4C469B]" spin />
                ) : (
                  <img src={dropdown} alt="" />
                )
              }
              placeholder="Select a card scheme"
              // onFocus={() =>
              //   handleApiMethodController(
              //     state,
              //     apiEndpoints.processor.cardSchemes,
              //     "GET_BY_POST_METHOD",
              //   )
              // }
              onClick={() =>
                handleApiMethodController(
                  state,
                  apiEndpoints.processor.cardSchemes,
                  "GET_BY_POST_METHOD",
                )
              }
              loading={result.isLoading}
              allowClear
              onChange={(e) =>
                handleApiMethodController(
                  state,
                  apiEndpoints.routing.getCustomRouting + `${e}`,
                  "READ",
                )
              }
            >
              {result?.data?.data?.cardSchemes?.map(
                (item: any, index: number) => (
                  <Select.Option key={index} value={item}>
                    {item}
                  </Select.Option>
                ),
              )}
            </Select>
          </Col>
        </Row>
      }
      shouldExpand={false}
      column={column}
      dataSource={dataSource}
      loading={data.isLoading}
      pageSize={5}
      tableName="Rule List"
      scrollX={1000}
      emptyHeadingText="No Custom Rule"
      emptyParagraphText="Select a card scheme above to view rule."
    />
  )
}

export default CustomRouting
