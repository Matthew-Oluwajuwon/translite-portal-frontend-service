/* eslint-disable prettier/prettier */

import { useCallback } from "react"
import {
  MENU_NAMES,
  MENU_KEYS,
  BREADCRUMB,
  CHARGE_CONFIGURATION_TYPES,
} from "../../../common/constants"
import { setGlobalKey } from "../../../store"
import { useAppDispatch, useAppSelector } from "../../../store/hooks"
import { Button, Divider, Form, Input, Radio } from "antd"
import usePageInfo from "../../../custom-hooks/usePageInfo"

const ChargeConfiguration = () => {
  const dispatch = useAppDispatch()
  const state = useAppSelector((state) => {
    return state.global
  })
  
  usePageInfo(
    MENU_NAMES.CHARGE_CONFIGURATION,
    MENU_KEYS.CHARGE_CONFIGURATION,
    BREADCRUMB.CHARGE_CONFIGURATION,
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
  return (
    <div
      className="bg-[#ffffff] pt-[2rem] my-10 rounded-md mb-10"
      style={{ boxShadow: "0px 10px 13px rgba(17, 38, 146, 0.05)" }}
    >
      <h1 className="text-[#424D61] mx-20 text-md font-semibold">
        Configure Charges
      </h1>
      <div className="my-10 mx-20">
        <h3 className="text-[#94A0B4] text-[0.9rem] my-3">
          Select Fee Type to start
        </h3>
        <Radio.Group
          onChange={(e) => handleChange(e.target.value)}
          value={state.configuration?.processorSelection}
          className="flex items-center justify-center sm:justify-start"
        >
          <Radio value={CHARGE_CONFIGURATION_TYPES.FLAT?.toLowerCase()}>
            {CHARGE_CONFIGURATION_TYPES.FLAT}
          </Radio>
          <Radio value={CHARGE_CONFIGURATION_TYPES.PERCENTAGE?.toLowerCase()}>
            {CHARGE_CONFIGURATION_TYPES.PERCENTAGE}
          </Radio>
        </Radio.Group>
      </div>
      <Divider />
      {state.configuration?.processorSelection ===
      CHARGE_CONFIGURATION_TYPES.FLAT?.toLowerCase() ? (
        <>
          <Form
            layout="vertical"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            className="w-[20rem] mx-3 sm:mx-20 pb-20"
          >
            <p className="text-[#94A0B4] text-[0.8rem] mt-3">
              Please enter flat amount to charge per transaction (₦)
            </p>
            <Form.Item className="">
              <Input addonBefore="N" placeholder="Flat fee" className="py-5" />
            </Form.Item>
            <div className="flex gap-2">
              <Button
                type="primary"
                className="flex items-center justify-center py-5 px-10 bg-[#6D71F9]"
              >
                Submit
              </Button>
              <Button
                type="text"
                className="flex items-center bg-[#2728480D] text-[#272848] font-semibold justify-center py-5 px-10"
              >
                Cancel
              </Button>
            </div>
          </Form>
        </>
      ) : (
        <>
          <Form
            layout="vertical"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            className="w-[20rem] mx-3 sm:mx-20 pb-20"
          >
            <p className="text-[#94A0B4] text-[0.8rem] mt-3">
              Please enter percentage to charge per transaction (%)
            </p>
            <Form.Item className="">
              <Input addonBefore="%" placeholder="Percentage" />
            </Form.Item>
            <div className="flex gap-2">
              <Button
                type="primary"
                className="flex items-center justify-center py-5 px-10 bg-[#6D71F9]"
              >
                Submit
              </Button>
              <Button
                type="text"
                className="flex items-center bg-[#2728480D] text-[#272848] font-semibold justify-center py-5 px-10"
              >
                Cancel
              </Button>
            </div>
          </Form>
        </>
      )}
    </div>
  )
}

export default ChargeConfiguration
