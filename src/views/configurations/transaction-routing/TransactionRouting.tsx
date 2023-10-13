/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */

import { useCallback, useEffect } from "react"
import {
  BREADCRUMB,
  MENU_KEYS,
  MENU_NAMES,
  TRANSACTION_CONFIGURATION_TYPES,
} from "../../../common/constants"
import { setAllGlobalKey, setGlobalKey } from "../../../store"
import { useAppDispatch, useAppSelector } from "../../../store/hooks"
import {
  Button,
  Radio,
  Divider,
  Form,
  Row,
  Col,
  Select,
  Input,
} from "antd"
import AddNewRule from "./components/add-new-rule"

import BtnSettings from "../../../assets/icons/btn-settings.svg"
import Info from "../../../assets/icons/info.svg"
import usePageInfo from "../../../custom-hooks/usePageInfo"
import DirectRouting from "./components/DirectRouting"
import CustomRouting from "./components/CustomRouting"
import useApiMethods from "../../../custom-hooks/useApiMethods"
import { apiEndpoints } from "../../../store/apiEndpoints"

const TransactionRouting = () => {
  const dispatch = useAppDispatch()
  const state = useAppSelector((state) => {
    return state.global
  })

  usePageInfo(
    MENU_NAMES.TRANSACTION_ROUTING,
    MENU_KEYS.TRANSACTION_ROUTING,
    BREADCRUMB.TRANSACTION_ROUTING,
  )



  const handleChange = useCallback(
    (processorSelection: string) => {
      dispatch(
        setGlobalKey({
          key: "configuration",
          value: {
            processorSelection,
          },
        }),
      )
    },
    [dispatch],
  )
  
  const { handleApiMethodController, data } = useApiMethods()
  useEffect(() => {
    handleApiMethodController(
      state,
      apiEndpoints.processor.getProcessors,
      "READ",
    )
  }, [])
  
  useEffect(() => {
    dispatch(setAllGlobalKey({
      ...state,
      processor: data.data?.data?.processorDTOS
    }))
  }, [data.data?.data?.processorDTOS, dispatch])

  return (
    <div>
      {state.transactionRouting?.showAddNewRuleModal && <AddNewRule />}
      <div
        className="bg-[#ffffff] pt-[2rem] my-10 rounded-md mb-10"
        style={{ boxShadow: "0px 10px 13px rgba(17, 38, 146, 0.05)" }}
      >
        <h1 className="text-[#424D61] mx-20 text-md font-semibold">
          Transaction Routes
        </h1>
        <div className="bg-[#FFFAF0] p-10 md:pr-36 mx-2 sm:mx-20 rounded-md flex items-start my-10 gap-5 w-fit">
          <img src={Info} alt="" />
          <span className="text-[1rem]">
            Transaction routed by system{" "}
            <span className="font-semibold">default configurations</span>,{" "}
            <br /> please configure a route rule below
          </span>
        </div>
        <Button
          type="primary"
          className="hidden md:flex mx-20 justify-between items-center gap-1 px-0 pr-3 py-5 hover:scale-95 cursor-pointer bg-[#6D71F9]"
          onClick={() =>
            dispatch(
              setGlobalKey({
                key: "terminal",
                value: {
                  showCreateModal: !state.terminal?.showCreateModal,
                  isSingleCreation: false,
                },
              }),
            )
          }
        >
          <img src={BtnSettings} className="text-[#ffffff]" alt="icon-right" />
          Configure Settings
        </Button>
        <div className="my-10 mx-20">
          <h3 className="text-[#94A0B4] text-[0.9rem] my-3">
            Processor Selection
          </h3>
          <Radio.Group
            onChange={(e) => handleChange(e.target.value)}
            className="flex items-center justify-center sm:justify-start"
          >
            <Radio
              value={TRANSACTION_CONFIGURATION_TYPES.DIRECT?.toLowerCase()}
            >
              {TRANSACTION_CONFIGURATION_TYPES.DIRECT}
            </Radio>
            <Radio
              value={TRANSACTION_CONFIGURATION_TYPES.AUTOMATIC?.toLowerCase()}
            >
              {TRANSACTION_CONFIGURATION_TYPES.AUTOMATIC}
            </Radio>
            <Radio
              value={TRANSACTION_CONFIGURATION_TYPES.CUSTOM?.toLowerCase()}
            >
              {TRANSACTION_CONFIGURATION_TYPES.CUSTOM}
            </Radio>
          </Radio.Group>
        </div>
        <Divider />
        {state.configuration?.processorSelection ===
        TRANSACTION_CONFIGURATION_TYPES.DIRECT?.toLowerCase() ? (
            <DirectRouting />
        ) : state.configuration?.processorSelection ===
          TRANSACTION_CONFIGURATION_TYPES.AUTOMATIC?.toLowerCase() ? (
          <>
            <Form
              layout="vertical"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              className="w-[30rem] mx-3 sm:mx-20 pb-20"
            >
              <Row style={{ width: "100%" }}>
                <h3 className="text-[#94A0B4] text-[0.9rem] my-5 text-clip">
                  Automatic routing will switch from default processor after
                  successive number of failures specified by you
                </h3>
                <Col span={18}>
                  <Form.Item
                    label={
                      <div className="font-semibold">
                        Please select a default processor from below list.
                      </div>
                    }
                  >
                    <Select
                      defaultValue={"Interswitch"}
                      bordered
                      className="border border-[#DEDFEC] rounded-md py-2 flex items-center font-semibold"
                    >
                      <Select.Option value="interswitch">
                        Interswitch
                      </Select.Option>
                      <Select.Option value="nibss">NIBSS</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={18}>
                  <Form.Item
                    label={
                      <div className="font-semibold">
                        Enter number of failures before switching
                      </div>
                    }
                  >
                    <Input
                      placeholder="10"
                      className="border border-[#DEDFEC] rounded-md py-3 flex items-center font-semibold"
                    />
                  </Form.Item>
                </Col>
                <Col span={24} className="flex items-center gap-5">
                  <Button
                    type="primary"
                    className="flex items-center justify-center py-5 px-10 bg-[#6D71F9]"
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
          </>
        ) : state.configuration?.processorSelection ===
          TRANSACTION_CONFIGURATION_TYPES.CUSTOM?.toLowerCase() ? (
          <CustomRouting />
        ) : null}
      </div>
    </div>
  )
}

export default TransactionRouting
