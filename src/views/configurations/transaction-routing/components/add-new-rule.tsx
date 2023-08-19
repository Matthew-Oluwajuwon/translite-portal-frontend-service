/* eslint-disable prettier/prettier */
import { useAppSelector } from "../../../../store/hooks"
import { PageModal } from "../../../../common/components/modal"
import useToggle from "../../../../custom-hooks/useToggle"
import { Button, Form, Row, Col, Input, Radio, Select } from "antd"
import close from "../../../../assets/icons/Close.svg"

const AddNewRule: React.FC = () => {
  const state = useAppSelector((state) => {
    return state.global
  })
  const { toggleAddNewRuleModal } = useToggle()

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
      >
        <Row style={{ width: "100%" }}>
          <div className="w-full">
            <Col span={18}>
              <Form.Item
                label={
                  <h2 className="text-[#272848] mt-5">
                    Enter Paste comma separated BIN or select all
                  </h2>
                }
                name={"bin"}
              >
                <Input className="py-3 px-5 mb-[-1rem]" />
              </Form.Item>
              <Radio.Group className="flex items-center justify-center sm:justify-start ">
                <Radio value={"SelectAllBINs"}>Select all BINs</Radio>
              </Radio.Group>
            </Col>
            <Col className="border rounded-lg p-5 mt-4">
              <Form.Item label={<p>Amount</p>}>
                <Radio.Group className="flex items-center justify-center sm:justify-start ">
                  <Radio value={"global"}>Global</Radio>
                  <Radio value={"bounded"}>Bounded</Radio>
                </Radio.Group>
              </Form.Item>
              <Row className="flex gap-4">
                <Form.Item label={<p>Upper bound</p>}>
                  <Input className="py-3 px-8" placeholder="₦ 1,000,000 .00" />
                </Form.Item>
                <Form.Item label={<p>Lower bound</p>}>
                  <Input className="py-3 px-8" placeholder="₦ 1,000,000 .00" />
                </Form.Item>
              </Row>
            </Col>
            <Col span={18} className="my-4">
              <Form.Item
                label={<p>Please select a processor from below list.</p>}
              >
                <Select
                  className="border rounded-lg p-2 w-full"
                  defaultValue={"Interswitch"}
                  bordered
                >
                  <Select.Option value="Interswitch">Interswitch</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Button
                type="primary"
                className="flex items-center justify-center bg-[#6D71F9] py-5 px-5 mx-auto"
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
