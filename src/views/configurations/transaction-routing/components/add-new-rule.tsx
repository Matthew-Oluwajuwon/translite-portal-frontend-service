/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import { useAppSelector } from "../../../../store/hooks"
import { PageModal } from "../../../../common/components/modal"
import useToggle from "../../../../custom-hooks/useToggle"
import { Button, Form, Row, Col, Input, Select, Alert } from "antd"
import close from "../../../../assets/icons/Close.svg"
import dropdown from "../../../../assets/icons/dropdown.svg"
import useApiMethods from "../../../../custom-hooks/useApiMethods"
import { apiEndpoints } from "../../../../store/apiEndpoints"
import useSetRequest from "../../../../custom-hooks/useSetRequest"
import {
  LoadingOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons"
import { useEffect } from "react"

const AddNewRule: React.FC = () => {
  const state = useAppSelector((state) => {
    return state.global
  })
  const { toggleAddNewRuleModal } = useToggle()
  const { setFormRequest } = useSetRequest()
  const { handleApiMethodController, result, data } = useApiMethods()

  const [form] = Form.useForm()

  const getProcessors = () =>
    handleApiMethodController(
      state,
      apiEndpoints.processor.getProcessors,
      "READ",
      {},
      state.page,
    )

  useEffect(() => {
    if (Array.isArray(state.request)) {
      form.setFieldsValue({
        boundsRequestDTOS: state.request.map((item: any, index: number) => ({
          key: index, // Provide a unique key for each item
          lowerBound: item.lowerBound,
          upperBound: item.upperBound,
          processorId: item.processorId,
          processorName: item.processorName,
        })),
      })
    }
  }, [state.request])
  console.log(form.getFieldValue("boundsRequestDTOS"))
  return (
    <PageModal
      openModal={state.transactionRouting?.showAddNewRuleModal}
      modalWith="45%"
      modalFooter={true}
      handleCancel={toggleAddNewRuleModal}
      centered={true}
    >
      <div className="flex justify-end">
        <img
          src={close}
          alt="close modal"
          className="cursor-pointer w-5"
          onClick={() => toggleAddNewRuleModal({})}
        />
      </div>

      <h5 className="text-[#130F49] font-bold text-lg ">Add New Rule</h5>
      <p className="text-[#717E95] my-2 font-semibold">
        Add a new rule to routing configurations for{" "}
        <span className="font-bold text-[#6D71F9]">
          {state.record?.cardScheme}
        </span>
      </p>
      <Alert
        type="warning"
        message={
          <div>
            <p>
              Please note that the next lower bound must be greater than the
              previous upper bounds.
            </p>
            <p>For example</p>
            <ul className="ml-10 ul">
              <li>1st rule: 0 -100</li>
              <li>2nd rule: 101 - 200</li>
              <li>3rd rule: 201 - 210</li>
              <li>4th rule: 211 - 215</li>
            </ul>
          </div>
        }
      />
      <Form
        layout="vertical"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        className="font-semibold"
        fields={[
          {
            name: "processorName",
            value: state.request?.processorName,
          },
          {
            name: "lowerBound",
            value: state.request?.lowerBound,
          },
          {
            name: "upperBound",
            value: state.request?.upperBound,
          },
          {
            name: "cardScheme",
            value: state.record?.cardScheme,
          },
        ]}
        form={form}
        onFinish={() => {
          const boundsRequestDTOS = form.getFieldValue("boundsRequestDTOS")
          const requestData = {
            cardScheme: state.record?.cardScheme,
            boundsRequestDTOS: boundsRequestDTOS.map((item: any) => ({
              processorId:
                typeof item.processorName === "number"
                  ? item.processorName
                  : item.processorId,
              lowerBound: parseInt(item.lowerBound),
              upperBound: parseInt(item.upperBound),
            })),
          }
          handleApiMethodController(
            state,
            apiEndpoints.routing.setCustomRouting,
            "CREATE",
            requestData,
            state.page,
          )
        }}
      >
        <Form.List name="boundsRequestDTOS">
          {(fields, { add, remove }) => (
            <>
              <Col span={24}>
                <Form.Item>
                  <Button
                    type="dashed"
                    className="flex items-center justify-center py-5 mt-5 border-[#6D71F9] text-[#6D71F9]"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                  >
                    Add field
                  </Button>
                </Form.Item>
              </Col>
              {fields.map(({ key, name, ...restField }) => (
                <Row
                  style={{ width: "100%" }}
                  className="mt-2 items-center"
                  gutter={10}
                >
                  <Col span={7}>
                    <Form.Item
                      {...restField}
                      name={[name, "lowerBound"]}
                      rules={[
                        { required: true, message: "Missing lower bound" },
                      ]}
                      label={<p>Lower bound</p>}
                    >
                      <Input
                        className="py-3"
                        placeholder="₦ 1,000,000 .00"
                        // value={state.request?.lowerBound
                        //   ?.toString()
                        //   .replace(/\D/g, "")
                        //   .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        onChange={(e) =>
                          setFormRequest(e.target.value, "lowerBound")
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col span={7}>
                    <Form.Item
                      {...restField}
                      name={[name, "upperBound"]}
                      rules={[
                        { required: true, message: "Missing upper bound" },
                      ]}
                      label={<p>Upper bound</p>}
                    >
                      <Input
                        className="py-3"
                        placeholder="₦ 1,000,000 .00"
                        // value={state.request?.upperBound
                        //   ?.toString()
                        //   .replace(/\D/g, "")
                        //   .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        onChange={(e) =>
                          setFormRequest(e.target.value, "upperBound")
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col span={7}>
                    <Form.Item
                      {...restField}
                      name={[name, "processorName"]}
                      rules={[{ required: true, message: "Missing processor" }]}
                      label={<p>Select processor</p>}
                    >
                      <Select
                        className="border rounded-lg p-2"
                        bordered
                        onFocus={getProcessors}
                        onChange={(e) =>
                          setFormRequest(
                            e,
                            "processorId",
                            data.data?.data?.processorDTOS,
                            "processorId",
                          )
                        }
                        suffixIcon={
                          data.isLoading ? (
                            <LoadingOutlined className="text-[#4C469B]" spin />
                          ) : (
                            <img src={dropdown} alt="" />
                          )
                        }
                        value={
                          state.request &&
                          state.request.boundsRequestDTOS &&
                          state.request.boundsRequestDTOS[name] &&
                          state.request.boundsRequestDTOS[name].processorName
                        }
                        loading={data.isLoading || data.isFetching}
                        options={
                          Array.isArray(data.data?.data?.processorDTOS)
                            ? (data.data?.data?.processorDTOS.map((x: any) => ({
                                label: x.name,
                                value: x.id,
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
                  <Col span={3} className="text-center">
                    <MinusCircleOutlined
                      className="text-xl"
                      onClick={() => remove(name)}
                    />
                  </Col>
                </Row>
              ))}
            </>
          )}
        </Form.List>
        <Col span={24} className="mt-4">
          <Button
            type="primary"
            htmlType="submit"
            className="flex items-center justify-center bg-[#6D71F9] py-5 px-10 mx-auto"
            loading={result.isLoading}
          >
            Submit
          </Button>
        </Col>
        <Col span={24} className="my-1">
          <Button
            type="text"
            className="flex items-center justify-center py-5 px-5 mx-auto"
            onClick={() => toggleAddNewRuleModal({})}
          >
            Cancel
          </Button>
        </Col>
      </Form>
    </PageModal>
  )
}

export default AddNewRule
