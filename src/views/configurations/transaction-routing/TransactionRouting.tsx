/* eslint-disable prettier/prettier */

import { useCallback, useEffect } from "react"
import {
  BREADCRUMB,
  MENU_KEYS,
  MENU_NAMES,
  TRANSACTION_CONFIGURATION_TYPES,
  TRANSACTION_PROCESSOR,
} from "../../../common/constants"
import { setAllGlobalKey, setGlobalKey } from "../../../store"
import { useAppDispatch, useAppSelector } from "../../../store/hooks"
import { TransactionTableComponent } from "../../../common/components/transaction-table"
import {
  Button,
  Radio,
  Divider,
  Form,
  Row,
  Col,
  Space,
  Select,
  Input,
} from "antd"
import AddNewRule from "./components/add-new-rule"

import BtnSettings from "../../../assets/icons/btn-settings.svg"
import Info from "../../../assets/icons/info.svg"
import PlusIcon from "../../../assets/icons/plus.svg"
import Search from "../../../assets/icons/Search.svg"
import { ColumnProps } from "antd/es/table/Column"
import more from "../../../assets/icons/more-action.svg"
import useToggle from "../../../custom-hooks/useToggle"

const TransactionRouting = () => {
  const dispatch = useAppDispatch()
  const state = useAppSelector((state) => {
    return state.global
  })
  useEffect(() => {
    document.title = MENU_NAMES.TRANSACTION_ROUTING + " | Translite"
    dispatch(
      setAllGlobalKey({
        ...state,
        selectedKey: MENU_KEYS.TRANSACTION_ROUTING,
        pageTitle: MENU_NAMES.TRANSACTION_ROUTING,
        breadcrumb: BREADCRUMB.TRANSACTION_ROUTING,
        openKey: MENU_KEYS.CONFIGURATIONS,
      }),
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])
  const column: ColumnProps<any>[] = [
    {
      title: "BIN",
      dataIndex: "bin",
      key: "1",
      width: "15%",
    },
    {
      title: "UPPER BOUND",
      dataIndex: "upperBound",
      key: "2",
    },
    {
      title: "LOWER BOUND",
      dataIndex: "lowerBound",
      key: "3",
    },
    {
      title: "PROCESSOR",
      dataIndex: "processor",
      key: "4",
    },
    {
      title: "CREATION DATE",
      dataIndex: "creationDate",
      key: "5",
    },
    {
      title: "ACTION",
      dataIndex: "",
      fixed: "right",
      width: "100px",
      key: "6",
      render(_: any, record: any) {
        return <img src={more} alt="" />
      },
    },
  ]

  const data = [
    {
      bin: "123456, 236781, 876549, 76590, 54324, 126754, 567354, 89622, 567544",
      upperBound: "-",
      lowerBound: "-",
      processor: "Interswitch",
      creationDate: "20/20/20",
    },
    {
      bin: "123456",
      upperBound: "₦1,000,000 .00",
      lowerBound: "₦1,000,000 .00",
      processor: "NIBSS",
      creationDate: "20/20/20",
    },
    {
      bin: "123456",
      upperBound: "₦1,000,000 .00",
      lowerBound: "₦1,000,000 .00",
      processor: "NIBSS",
      creationDate: "20/20/20",
    },
    {
      bin: "123456",
      upperBound: "₦1,000,000 .00",
      lowerBound: "₦1,000,000 .00",
      processor: "NIBSS",
      creationDate: "20/20/20",
    },
    {
      bin: "123456",
      upperBound: "₦1,000,000 .00",
      lowerBound: "₦1,000,000 .00",
      processor: "NIBSS",
      creationDate: "20/20/20",
    },
    {
      bin: "123456",
      upperBound: "₦1,000,000 .00",
      lowerBound: "₦1,000,000 .00",
      processor: "NIBSS",
      creationDate: "20/20/20",
    },
  ]

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
  const { toggleAddNewRuleModal } = useToggle()

  return (
    <div>
      <AddNewRule />
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
            value={state.configuration?.processorSelection}
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
          <>
            <Form
              layout="vertical"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              className="w-[20rem] mx-3 sm:mx-20 pb-20"
            >
              <Row style={{ width: "100%" }}>
                <h3 className="text-[#94A0B4] text-[0.9rem]">
                  Please select a preferred processor from below list to route
                  transactions through!
                </h3>
                <Col span={24} className="my-10">
                  <Form.Item>
                    <Radio.Group
                    // onChange={(e) => handleChange(e.target.value)}
                    // value={state.configuration?.processorSelection}
                    >
                      <Space direction="vertical">
                        <div className="border border-[#DEDFEC] rounded-md p-5 w-[20rem]">
                          <Radio
                            value={TRANSACTION_PROCESSOR.INTERWITCH?.toLowerCase()}
                          >
                            {TRANSACTION_PROCESSOR.INTERWITCH}
                          </Radio>
                        </div>
                        <div className="border border-[#DEDFEC] rounded-md p-5 w-full">
                          {" "}
                          <Radio
                            value={TRANSACTION_PROCESSOR.NIBSS?.toLowerCase()}
                          >
                            {TRANSACTION_PROCESSOR.NIBSS}
                          </Radio>
                        </div>
                      </Space>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                <Col
                  span={24}
                  className="flex items-center justify-center gap-5"
                >
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
          <>
            <TransactionTableComponent
              btn={
                <Button
                  type="primary"
                  className="flex justify-between items-center gap-2 mt-3 py-6 px-0 pr-5 bg-[#6D71F9]"
                  onClick={toggleAddNewRuleModal}
                >
                  <img src={PlusIcon} alt="icon-pluus" /> Add New Rule
                </Button>
              }
              forms={
                <Input
                  type="text"
                  placeholder="Search by.."
                  prefix={<img src={Search} alt="search" />}
                  className="h-10 w-[15rem] mx-10 mb-10"
                />
              }
              shouldExpand={false}
              column={column}
              dataSource={data}
              loading={false}
              pageSize={5}
              tableName="Rule List"
              scrollX={1000}
            />
          </>
        ) : null}
      </div>
    </div>
  )
}

export default TransactionRouting
