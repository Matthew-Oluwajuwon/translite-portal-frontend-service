/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */

import { Form, Row, Col, Radio, Space, Button, Spin } from "antd"
import { setAllGlobalKey, setGlobalKey } from "../../../../store"
import { useAppDispatch, useAppSelector } from "../../../../store/hooks"
import useApiMethods from "../../../../custom-hooks/useApiMethods"
import { ApiResponse } from "../../../../model/client/response"
import { apiEndpoints } from "../../../../store/apiEndpoints"
import { useEffect } from "react"
import useSetRequest from "../../../../custom-hooks/useSetRequest"

const DirectRouting: React.FC = () => {
  const dispatch = useAppDispatch()
  const state = useAppSelector((state) => {
    return state.global
  })
  const { handleApiMethodController, data, result } = useApiMethods()
  const { setFormRequest } = useSetRequest()
  useEffect(() => {
    handleApiMethodController(
      state,
      apiEndpoints.routing.getDefaultRouting,
      "READ",
    )
  }, [])

  useEffect(() => {
    dispatch(
      setAllGlobalKey({
        ...state,
        request: {
          ...state.request,
          processorId: data.data?.data?.processorId,
        },
      }),
    )
  }, [data.data?.data?.processorId, dispatch])

  return (
    <Form
      layout="vertical"
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      className="w-[20rem] mx-3 sm:mx-20 pb-20"
      onFinish={() =>
        handleApiMethodController(
          state,
          apiEndpoints.routing.setDefault,
          "CREATE",
          {
            processorId: state.request?.processorId,
          },
        )
      }
      fields={[
        {
          name: "processorName",
          value: state.request?.processorId,
        },
      ]}
    >
      <Row style={{ width: "100%" }}>
        <h3 className="text-[#94A0B4] text-[0.9rem]">
          Please select a preferred processor from below list to route
          transactions through!
        </h3>
        <Col span={24} className="my-10">
          <Form.Item>
            <Spin spinning={data.isLoading}>
              <Radio.Group
                value={state.request?.processorId}
                name="processorId"
                onChange={(e) =>
                  setFormRequest(e.target.value, "processorId")
                }
              >
                <Space direction="vertical">
                  {state.processor?.map(
                    (item: ApiResponse.Processor, index: number) => (
                      <Radio
                        value={item.id}
                        key={index}
                        className="border border-[#DEDFEC] rounded-md p-5 w-[20rem]"
                      >
                        <div key={index}>{item.name}</div>
                      </Radio>
                    ),
                  )}
                </Space>
              </Radio.Group>
            </Spin>
          </Form.Item>
        </Col>
        <Col span={24} className="flex items-center justify-center gap-5">
          <Button
            type="primary"
            htmlType="submit"
            className="flex items-center justify-center py-5 px-10 bg-[#6D71F9]"
            loading={result.isLoading}
          >
            Submit
          </Button>
          <Button
            onClick={() =>
              dispatch(
                setGlobalKey({
                  key: "configuration",
                  value: {
                    ...state.configuration,
                    cancelConfig: true,
                  },
                }),
              )
            }
            type="text"
            className="flex items-center bg-[#2728480D] text-[#272848] font-semibold justify-center py-5 px-10"
          >
            Cancel
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default DirectRouting
