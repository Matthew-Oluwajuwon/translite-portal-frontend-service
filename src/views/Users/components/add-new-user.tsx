/* eslint-disable prettier/prettier */
import { Button, Form, Row, Col, Input, Select } from "antd"
import { PageModal } from "../../../common/components/modal"
import { useAppSelector } from "../../../store/hooks"
import useToggle from "../../../custom-hooks/useToggle"
import { useForm } from "antd/es/form/Form"
import { useEffect, useState } from "react"
// import useSetRequest from "../../../custom-hooks/useSetRequest"

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
  //   const { setFieldChange } = useSetRequest()

  return (
    <PageModal
      openModal={state.user?.showAddUserModal}
      modalWith="35rem"
      modalFooter={false}
      handleCancel={toggleAddUserModal}
      centered={true}
    >
      <div className="mx-20">
        <h1 className="text-[#130F49] text-2xl font-bold ">Add System User</h1>
      </div>
      <Form
        form={form}
        layout="vertical"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        className="mx-10 mt-10 mb-5"
        fields={[
          {
            name: "firstName",
            value: "",
          },
          {
            name: "lastName",
            value: "",
          },
          {
            name: "email",
            value: "",
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
              <Input className="py-3" />
            </Form.Item>
          </Col>
          <Col xs={24} md={28}>
            <Form.Item
              label={<span className="font-semibold text-base">Last Name</span>}
              name={"lastName"}
            >
              <Input className="py-3" />
            </Form.Item>
          </Col>
          <Col xs={24} md={28}>
            <Form.Item
              label={
                <span className="font-semibold text-base">Email Address</span>
              }
              name={"email"}
            >
              <Input className="py-3" />
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
              >
                <Select.Option value="Super Admin">Super Admin</Select.Option>
                <Select.Option value="System User">System User</Select.Option>
                <Select.Option value="App Manager">App Manager</Select.Option>
              </Select>{" "}
            </Form.Item>
          </Col>
          <Col span={24}>
            <Button
              type="primary"
              className="flex items-center justify-center bg-[#6D71F9] py-5 px-10 mx-auto"
              disabled={submittable ? false : true}
            >
              Submit
            </Button>
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
