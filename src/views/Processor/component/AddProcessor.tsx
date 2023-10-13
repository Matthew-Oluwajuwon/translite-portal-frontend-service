/* eslint-disable prettier/prettier */

import { PageModal } from "@common/components/modal"
import { useAppSelector } from "../../../store/hooks"
import useToggle from "../../../custom-hooks/useToggle"
import { Button, Col, Form, Input, Row, Select, Switch } from "antd"
import useApiMethods, { FORM_ACTION } from "../../../custom-hooks/useApiMethods"
import { apiEndpoints } from "../../../store/apiEndpoints"
import useSetRequest from "../../../custom-hooks/useSetRequest"
import SubmitButton from "@common/components/SubmitButton"
const AddProcessor: React.FC = () => {
  const state = useAppSelector((state) => {
    return state.global
  })
  const { setFormRequest } = useSetRequest()
  const { toggleFormModal } = useToggle()
  const { handleApiMethodController, result } = useApiMethods()
  const getCardSchemes = () =>
    handleApiMethodController(
      state,
      apiEndpoints.processor.cardSchemes,
      "GET_BY_POST_METHOD",
      {},
      state.page,
    )

  const [form] = Form.useForm()

  return (
    <PageModal
      openModal={state.showFormModal}
      modalWith="40rem"
      handleCancel={() => toggleFormModal(false)}
      centered
      modalFooter={false}
    >
      <div className="md:p-10">
        <h5 className="text-[#130F49] font-bold text-2xl ">
          {state.action === "CREATE" ? "Setup New" : "Update"} Processor
        </h5>
        <p className="text-base font-medium my-2 text-[#717E95]">
          {state.action === "CREATE"
            ? "Add a new processor to the system"
            : "Update an existing Processor"}
          Add a new processor to the system
        </p>
        <Form
          form={form}
          layout="vertical"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          className="font-semibold"
          onFinish={() =>
            handleApiMethodController(
              state,
              state.action === "CREATE"
                ? apiEndpoints.processor.addProcessor
                : apiEndpoints.processor.updateProcessor + state.request?.id,
              state.action as FORM_ACTION,
              {
                name: state.request?.name,
                ip: state.request?.ip,
                cardSchemes: state.request?.cardSchemes,
                port: state.request?.port,
                allowKeyExchange: state.request?.allowKeyExchange,
              },
              state.page,
            )
          }
          fields={[
            {
              name: "name",
              value: state.request?.name,
            },
            {
              name: "ip",
              value: state.request?.ip,
            },
            {
              name: "port",
              value: state.request?.port,
            },
            {
              name: "allowKeyExchange",
              value: state.request?.allowKeyExchange,
            },
            {
              name: "cardSchemes",
              value: state.request?.cardSchemes,
            },
          ]}
        >
          <Row style={{ width: "100%" }} gutter={16}>
            <Col span={24}>
              <Form.Item
                label={<h2 className="text-[#272848] mt-5">Processor Name</h2>}
                name={"name"}
                rules={[
                  { required: true, message: "Processor name is required" },
                ]}
              >
                <Input
                  className="py-4 px-5 mb-[-1rem]"
                  onChange={(e) => setFormRequest(e.target.value, "name")}
                  value={state.request?.name}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={<h2 className="text-[#272848] mt-5">IP Address</h2>}
                name={"ip"}
                rules={[{ required: true, message: "IP Address is required" }]}
              >
                <Input
                  className="py-4 px-5 mb-[-1rem]"
                  onChange={(e) => setFormRequest(e.target.value, "ip")}
                  value={state.request?.ip}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={<h2 className="text-[#272848] mt-5">Port</h2>}
                name={"port"}
                rules={[{ required: true, message: "Port is required" }]}
              >
                <Input
                  className="py-4 px-5 mb-[-1rem]"
                  onChange={(e) => setFormRequest(e.target.value, "port")}
                  value={state.request?.port}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label={
                  <h2 className="text-[#272848] mt-5">
                    Select Supported Card Schemes
                  </h2>
                }
                name={"cardSchemes"}
                rules={[
                  { required: true, message: "Card schemes is required" },
                ]}
              >
                <Select
                  className="border rounded-lg py-3 w-full"
                  mode="multiple"
                  onFocus={getCardSchemes}
                  onChange={(e) =>
                    setFormRequest(
                      e,
                      "cardSchemes",
                      result.data?.data?.cardSchemes,
                      // "cardSchemes",
                    )
                  }
                  value={state.request?.cardSchemes}
                  loading={result.isLoading}
                  options={
                    Array.isArray(result.data?.data?.cardSchemes)
                      ? (result.data?.data?.cardSchemes.map((x: any) => ({
                          label: x,
                          value: x,
                        })) as any)
                      : []
                  }
                  filterOption={(input: any, option: any) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                />
              </Form.Item>
            </Col>
            <Col className="flex gap-4" span={24}>
              <Form.Item
                label={
                  <h2 className="text-[#272848] mt-5">Allow Key Exchange</h2>
                }
                name={"allowKeyExchange"}
              >
                <Switch
                  checked={state.request?.allowKeyExchange}
                  onChange={(e) => setFormRequest(e, "allowKeyExchange")}
                  style={{
                    background: state.request?.allowKeyExchange
                      ? "#38D79F"
                      : "#ACAEC4",
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <SubmitButton name="Submit" htmlType="submit" form={form} loading={result.isLoading} />
            </Col>
            <Col span={24} className="my-1">
              <Button
                type="text"
                className="flex items-center justify-center py-5 px-5 mx-auto"
                onClick={() => toggleFormModal(false)}
              >
                Cancel
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </PageModal>
  )
}

export default AddProcessor
