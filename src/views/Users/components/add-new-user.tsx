/* eslint-disable prettier/prettier */
import { Button, Form, Row, Col, Input, Select, Spin } from "antd"
import { PageModal } from "../../../common/components/modal"
import { useAppSelector } from "../../../store/hooks"
import useToggle from "../../../custom-hooks/useToggle"
import { useForm } from "antd/es/form/Form"
import { useEffect, useState } from "react"
import useApiMethods from "../../../custom-hooks/useApiMethods"
import { apiEndpoints } from "../../../store/apiEndpoints"
import useSetRequest from "../../../custom-hooks/useSetRequest"

const AddNewUser: React.FC = () => {
  const state = useAppSelector((state: { global: any }) => {
    return state.global
  })
  const [form] = useForm()
  const [submittable, setSubmittable] = useState(false)
  const values = Form.useWatch([], form)

  useEffect(() => {
    form.validateFields().then(
      () => {
        setSubmittable(true)
      },
      () => {
        setSubmittable(false)
      },
    )
  }, [form, values])

  const { toggleAddUserModal } = useToggle()
  const { setFieldChange } = useSetRequest()
  const { handleApiMethodController, data } = useApiMethods()
  const { firstName, lastName, email, adminRoleName, password } = state.request
  const refinedData = { firstName, lastName, email, adminRoleName, password }
  const addNewUserHandler = () => {
    handleApiMethodController(
      state,
      apiEndpoints.users.addNewUser,
      "CREATE",
      refinedData,
    )
  }
  return (
    <PageModal
      openModal={state.user?.showAddUserModal}
      modalWith="35rem"
      modalFooter={false}
      handleCancel={toggleAddUserModal}
      centered={true}
    >
      <div className="mx-5">
        <h1 className="text-[#130F49] text-2xl font-bold ">Add System User</h1>
      </div>
      <Form
        form={form}
        layout="vertical"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        className="mx-5 mt-10 mb-5"
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
              rules={[{ required: true, message: "Password is required" }]}
            >
              <Input
                type="password"
                className="py-3"
                onChange={(e) => setFieldChange("password", e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={28}>
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
          </Col>
          <Col span={24}>
            <Spin spinning={data?.isLoading}>
              <Button
                type="primary"
                className="flex items-center justify-center bg-[#6D71F9] py-5 px-10 mx-auto"
                disabled={submittable ? false : true}
                onClick={addNewUserHandler}
              >
                Submit
              </Button>
            </Spin>
          </Col>
          <Col span={24} className="my-3">
            <Button
              onClick={() => toggleAddUserModal}
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
