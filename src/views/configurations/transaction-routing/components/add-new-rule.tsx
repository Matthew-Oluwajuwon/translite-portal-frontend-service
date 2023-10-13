/* eslint-disable prettier/prettier */
import { useAppSelector } from "../../../../store/hooks"
import { PageModal } from "../../../../common/components/modal"
import useToggle from "../../../../custom-hooks/useToggle"
import { Button, Form, Row, Col, Input, Select } from "antd"
import close from "../../../../assets/icons/Close.svg"
import dropdown from "../../../../assets/icons/dropdown.svg"
import useApiMethods from "../../../../custom-hooks/useApiMethods"
import { apiEndpoints } from "../../../../store/apiEndpoints"
import useSetRequest from "../../../../custom-hooks/useSetRequest"
import { LoadingOutlined } from "@ant-design/icons"

const AddNewRule: React.FC = () => {
  const state = useAppSelector((state) => {
    return state.global
  })
  const { toggleAddNewRuleModal } = useToggle()
  const { setFormRequest } = useSetRequest()
  const { handleApiMethodController, result, data } = useApiMethods()

  const [form] = Form.useForm()

  const getCardSchemes = () =>
    handleApiMethodController(
      state,
      apiEndpoints.processor.cardSchemes,
      "GET_BY_POST_METHOD",
      {},
      state.page,
    )
  const getProcessors = () =>
    handleApiMethodController(
      state,
      apiEndpoints.processor.getProcessors,
      "READ",
      {},
      state.page,
    )

  return (
    <PageModal
      openModal={state.transactionRouting?.showAddNewRuleModal}
      modalWith="35rem"
      modalFooter={true}
      handleCancel={toggleAddNewRuleModal}
      centered={true}
    >
        <div className="flex justify-end">
          <img
            src={close}
            alt="close modal"
            className="cursor-pointer"
            onClick={toggleAddNewRuleModal}
          />
        </div>

        <h5 className="text-[#130F49] font-bold text-lg ">Add New Rule</h5>
        <p className="text-[#717E95] my-2 font-semibold">
          Add a new rule to routing configurations
        </p>
        <Form
          layout="vertical"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          className="font-semibold"
          fields={[
            {
              name: "processorID",
              value: state.request?.processorID,
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
              value: state.request?.cardScheme,
            },
          ]}
          form={form}
          onFinish={() => {
            handleApiMethodController(
              state,
              apiEndpoints.routing.setCustomRouting,
              "CREATE",
              {
                cardScheme: state.request.cardScheme,
                boundsRequestDTOS: [
                  {
                    processorId: state.request.processorId,
                    lowerBound: parseInt(state.request.lowerBound),
                    upperBound: parseInt(state.request.upperBound),
                  },
                ],
              },
              state.page
            )
          }}
        >
          <Row style={{ width: "100%" }}>
            <div className="w-full">
              <Col span={24} className="my-4">
                <Form.Item label={<p>Select Card Scheme.</p>}>
                  <Select
                    className="border rounded-lg p-2 w-full"
                    bordered
                    loading={result.isLoading}
                    suffixIcon={result.isLoading ? (
                      <LoadingOutlined className="text-[#4C469B]" spin />
                    ) : (
                      <img src={dropdown} alt="" />
                    )}
                    onFocus={getCardSchemes}
                    onChange={(e) =>
                      setFormRequest(
                        e,
                        "cardScheme",
                        result.data?.data?.cardSchemes,
                        // "cardSchemes",
                      )
                    }
                    value={state.request?.cardScheme}
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
              <Col className="border rounded-lg p-5 mt-4">
                <Row className="flex gap-4">
                  <Form.Item label={<p>Upper bound</p>} className="w-full">
                    <Input
                      className="py-3 px-8"
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
                  <Form.Item label={<p>Lower bound</p>} className="w-full">
                    <Input
                      className="py-3 px-8"
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
                </Row>
              </Col>
              <Col span={24} className="my-4">
                <Form.Item
                  label={<p>Please select a processor from below list.</p>}
                >
                  <Select
                    className="border rounded-lg p-2 w-full"
                    bordered
                    onFocus={getProcessors}
                    onChange={(e) =>
                      setFormRequest(
                        e,
                        "processorId",
                        // data.data?.data?.processorDTOS[0].id,
                      )
                    }
                    suffixIcon={data.isLoading ? (
                      <LoadingOutlined className="text-[#4C469B]" spin />
                    ) : (
                      <img src={dropdown} alt="" />
                    )}
                    value={state.request?.processorId}
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
              <Col span={24}>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="flex items-center justify-center bg-[#6D71F9] py-5 px-5 mx-auto"
                  loading={result.isLoading}
                >
                  Submit
                </Button>
              </Col>
              <Col span={24} className="my-1">
                <Button
                  type="text"
                  className="flex items-center justify-center py-5 px-5 mx-auto"
                  onClick={toggleAddNewRuleModal}
                >
                  Cancel
                </Button>
              </Col>
            </div>
          </Row>
        </Form>
    </PageModal>
  )
}

export default AddNewRule
