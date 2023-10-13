/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Form, Row, Col, Input } from "antd"
import { PageModal } from "../../../common/components/modal"
import { useAppDispatch, useAppSelector } from "../../../store/hooks"
import useToggle from "../../../custom-hooks/useToggle"
import { useForm } from "antd/es/form/Form"
import useApiMethods from "../../../custom-hooks/useApiMethods"
import { apiEndpoints } from "../../../store/apiEndpoints"
import useSetRequest from "../../../custom-hooks/useSetRequest"
import React, { useEffect } from "react"
import SubmitButton from "@common/components/SubmitButton"
import { setAllGlobalKey } from "../../../store"

const AddNewUser: React.FC = () => {
  const dispatch = useAppDispatch()
  const state = useAppSelector((state: { global: any }) => {
    return state.global
  })
  const [form] = useForm()

  const { toggleAddUserModal } = useToggle()
  const { setFieldChange } = useSetRequest()
  const { handleApiMethodController, result } = useApiMethods()

  useEffect(() => {
    if (result.data && !result.isLoading) {
      dispatch(
        setAllGlobalKey({
          ...state,
          user: {
            ...state.user,
            showAddUserModal: false,
            showAddUserSuccessResponseModal: true,
            userCreationResponseCode: result.data?.responseCode,
            userCreationMessage:
              result.data?.failureReason || result.data?.status,
          },
        }),
      )
    }
  }, [dispatch, result.data, result.isLoading])

  return (
    <PageModal
      openModal={state.user?.showAddUserModal}
      modalWith="35rem"
      modalFooter={false}
      handleCancel={toggleAddUserModal}
      centered={true}
    >
      <div className="mx-5 m-10">
        <h1 className="text-[#130F49] text-xl font-bold ">Add System User</h1>
      </div>
      <Form
        form={form}
        layout="vertical"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        className="mx-5 mt-10 mb-5 m-10"
        onFinish={() =>
          handleApiMethodController(
            state,
            apiEndpoints.users.addNewUser,
            "CREATE",
            {
              firstName: state.request?.firstName,
              lastName: state.request?.lastName,
              email: state.request?.email,
              adminRoleName: "NONE",
              password: state.request?.password,
            },
          )
        }
        fields={[
          {
            name: "firstName",
            value: state.request?.firstName,
          },
          {
            name: "lastName",
            value: state.request?.lastName,
          },
          {
            name: "email",
            value: state.request?.email,
          },
          {
            name: "password",
            value: state.request?.password,
          },
          {
            name: "adminRoleName",
            value: state.request?.adminRoleName,
          },
        ]}
      >
        <Row style={{ width: "100%" }}>
          <Col xs={24} md={28}>
            <Form.Item
              label={
                <span className="font-semibold text-base">First Name</span>
              }
              name={"firstName"}
              rules={[{ required: true, message: "First name is reqired" }]}
            >
              <Input
                className="py-3"
                onChange={(e) => setFieldChange("firstName", e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={28}>
            <Form.Item
              label={<span className="font-semibold text-base">Last Name</span>}
              name={"lastName"}
              rules={[{ required: true, message: "Last name is reqired" }]}
            >
              <Input
                className="py-3"
                onChange={(e) => setFieldChange("lastName", e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={28}>
            <Form.Item
              label={
                <span className="font-semibold text-base">Email Address</span>
              }
              name={"email"}
              rules={[
                { required: true, message: "Email is required" },
                {
                  type: "email",
                  message: "Email is invalid",
                },
              ]}
            >
              <Input
                className="py-3"
                onChange={(e) => setFieldChange("email", e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={28}>
            <Form.Item
              label={<span className="font-semibold text-base">Password</span>}
              name={"password"}
              rules={[
                { required: true, message: "Password is required" },
                {
                  pattern: new RegExp(
                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$!%^&*])[A-Za-z\d@#$!%^&*]{8,}$/,
                  ),
                  message:
                    "Password format: Length 8 characters Uppercase, lowercase, numbers and special character is required",
                },
              ]}
            >
              <Input
                type="password"
                className="py-3"
                onChange={(e) => setFieldChange("password", e.target.value)}
              />
            </Form.Item>
          </Col>
          {/* <Col xs={24} md={28}>
              <Form.Item
                label={
                  <span className="font-semibold text-base">Select Role</span>
                }
              >
                <Select
                  defaultValue={"System User"}
                  bordered
                  className="border border-[#DEDFEC] rounded-md py-2 flex items-center font-semibold"
                  onChange={(e) => setFieldChange("adminRoleName", e)}
                >
                  <Select.Option value="Super Admin">Super Admin</Select.Option>
                  <Select.Option value="System User">System User</Select.Option>
                  <Select.Option value="App Manager">App Manager</Select.Option>
                </Select>{" "}
              </Form.Item>
            </Col> */}
          <Col span={24}>
            <SubmitButton
              name={"Submit"}
              loading={result.isLoading}
              htmlType={"submit"}
              form={form}
            />
          </Col>
          <Col span={24} className="my-3">
            <Button
              onClick={toggleAddUserModal}
              type="text"
              className="flex items-center justify-center py-5 px-10 mx-auto"
            >
              Cancel
            </Button>
          </Col>
        </Row>
      </Form>
    </PageModal>
  )
}

export default AddNewUser
