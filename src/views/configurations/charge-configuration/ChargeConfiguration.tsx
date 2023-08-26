/* eslint-disable prettier/prettier */

import { useCallback, useEffect } from "react"
import {
  MENU_NAMES,
  MENU_KEYS,
  BREADCRUMB,
  CHARGE_CONFIGURATION_TYPES,
} from "../../../common/constants"
import { setAllGlobalKey, setGlobalKey } from "../../../store"
import { useAppDispatch, useAppSelector } from "../../../store/hooks"
import { Button, Divider, Form, Input, Radio } from "antd"

const ChargeConfiguration = () => {
  const dispatch = useAppDispatch()
  const state = useAppSelector((state) => {
    return state.global
  })
  useEffect(() => {
    document.title = MENU_NAMES.CHARGE_CONFIGURATION + " | Translite"
    dispatch(
      setAllGlobalKey({
        ...state,
        selectedKey: MENU_KEYS.CHARGE_CONFIGURATION,
        pageTitle: MENU_NAMES.CHARGE_CONFIGURATION,
        breadcrumb: BREADCRUMB.CHARGE_CONFIGURATION,
        openKey: MENU_KEYS.CONFIGURATIONS,
      }),
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])
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
              <Button type="primary" className="bg-[#6D71F9]">
                Submit
              </Button>
              <Button type="primary" className="bg-[#2728480D] text-[#272848]">
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
              <Button type="primary" className="bg-[#6D71F9]">
                Submit
              </Button>
              <Button type="primary" className="bg-[#2728480D] text-[#272848]">
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
