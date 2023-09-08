/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */

import { MENU_KEYS, BREADCRUMB } from "@common/constants"
import usePageInfo from "../../custom-hooks/usePageInfo"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { TableComponent } from "@common/components/table-component"
import { Button, Col, Form, Input, Row } from "antd"
import Plus from "../../assets/icons/plus.svg"
import Cloud from "../../assets/icons/cloud.svg"
import Search from "../../assets/icons/Search.svg"
import { ColumnProps } from "antd/es/table"
import { ApiResponse } from "../../model/client/response"
import more from "../../assets/icons/more-action.svg"
import useApiMethods from "../../custom-hooks/useApiMethods"
import { useEffect } from "react"
import { apiEndpoints } from "../../store/apiEndpoints"
import useFilter from "../../custom-hooks/useFilter"
import { setGlobalKey } from "../../store"
import useToggle from "../../custom-hooks/useToggle"
import AddNewUser from "./components/add-new-user"

const Users: React.FC = () => {
  const dispatch = useAppDispatch()
  const state = useAppSelector((state) => {
    return state.global
  })
  usePageInfo(
    "User Management",
    MENU_KEYS.SYSTEM_USERS,
    BREADCRUMB.SYSTEM_USERS,
  )
  const columns: ColumnProps<ApiResponse.UserInfo>[] = [
    {
      title: "USERNAME",
      dataIndex: "email",
      key: "1",
    },
    {
      title: "FIRST NAME",
      dataIndex: "firstName",
      key: "2",
    },
    {
      title: "LAST NAME",
      dataIndex: "lastName",
      key: "3",
    },
    {
      title: "ACTION",
      dataIndex: "",
      key: "4",
      render: () => {
        return <img src={more} alt="" />
      },
    },
  ]

  const { handleApiMethodController, data } = useApiMethods()

  useEffect(() => {
    handleApiMethodController(
      state,
      apiEndpoints.users.getUsers,
      "READ",
      {},
      state.page,
    )
  }, [state.page])

  const { dataSource } = useFilter(
    Array.isArray(data.data?.data) ? data.data?.data : [],
  )
  const { toggleAddUserModal } = useToggle()
  return (
    <div>
      <AddNewUser />
      <TableComponent
        tableName="All System Users"
        column={columns}
        dataSource={dataSource}
        btn={
          <div className="flex items-center gap-5">
            <Button
              type="primary"
              onClick={toggleAddUserModal}
              className="flex justify-between items-center text-[0.7rem] bg-[#6D71F9] sm:text-[1rem] font-semibold gap-2 py-6 px-2 sm:px-0 -pr-10 sm:pr-3"
            >
              <img src={Plus} alt="add" className="ml-2 sm:ml-0" />{" "}
              <div className="hidden md:block">Add User</div>
            </Button>
            <Button
              type="default"
              icon={<img src={Cloud} alt="add" className="ml-2 sm:ml-0" />}
              className="flex justify-between items-center text-[0.7rem] text-[#6D71F9] font-semibold border-none bg-[#eaebff] sm:text-[1rem] py-6 px-5"
            >
              <div className="hidden md:block">Export</div>
            </Button>
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
                    placeholder="Search users.."
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
                <Button
                  type="default"
                  className="flex justify-between items-center text-[0.7rem] text-[#6D71F9] font-semibold border-none bg-[#eaebff] sm:text-[1rem] py-6 px-5"
                >
                  <div className="hidden md:block">Search</div>
                </Button>
              </Col>
            </Row>
          </Form>
        }
        loading={data.isLoading || data.isFetching}
      />
    </div>
  )
}

export default Users
