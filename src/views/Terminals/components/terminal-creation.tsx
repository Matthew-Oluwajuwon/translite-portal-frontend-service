/* eslint-disable prettier/prettier */
import { Button, Form, Row, Col, Input, Upload, UploadProps } from "antd"
import { PageModal } from "../../../common/components/modal"
import { useAppSelector } from "../../../store/hooks"
import FileUpload from "../../../assets/images/upload.svg"
import useToggle from "../../../custom-hooks/useToggle"

const TerminalCreateion: React.FC = () => {
  const state = useAppSelector((state) => {
    return state.global
  })
  const props: UploadProps = {
    fileList: [],
  }

  const { toggleCreateModal, toggleFormModalOption } = useToggle()

  return (
    <PageModal
      openModal={state.terminal?.showCreateModal}
      modalWith="35rem"
      modalFooter={false}
      handleCancel={toggleCreateModal}
      centered={true}
    >
      <div className="mx-20">
        <h1 className="text-[#130F49] font-bold text-lg">Add New Terminal</h1>
        <p className="text-[#717E95] my-2 font-semibold">
          Please add new terminals in unit or in bulk below
        </p>
      </div>
      <div className="h-10 bg-[#F5F6FA] flex items-center px-20 py-[2rem] gap-3">
        <Button
          type={state.terminal?.isSingleCreation ? "text" : "primary"}
          className={
            !state.terminal?.isSingleCreation ? "bg-[#6D71F9] text-white" : ""
          }
          onClick={() => toggleFormModalOption(true, false)}
        >
          Single
        </Button>
        <Button
          type={!state.terminal?.isSingleCreation ? "text" : "primary"}
          className={
            state.terminal?.isSingleCreation ? "bg-[#6D71F9] text-white" : ""
          }
          onClick={() => toggleFormModalOption(true, true)}
        >
          Bulk Uploads
        </Button>
      </div>
      <Form
        layout="vertical"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        className="mx-20 mt-10 mb-5"
      >
        <Row style={{ width: "100%" }}>
          {!state.terminal?.isSingleCreation ? (
            <>
              <Col span={24}>
                <Form.Item
                  label={
                    <h2 className="text-[#272848] font-semibold">
                      Terminal Serial Number
                    </h2>
                  }
                  name={""}
                >
                  <Input
                    placeholder="Enter Terminal serial number"
                    className="py-5 px-5"
                  />
                </Form.Item>
              </Col>
            </>
          ) : (
            <>
              <Col span={24} className="mt-5 mb-10">
                <Form.Item label="Upload File" name={""}>
                  <Upload {...props}>
                    <img src={FileUpload} alt="file-upload" />
                  </Upload>
                </Form.Item>
                <p className="text-[#6D71F9] -mt-5 text-[0.8rem]">
                  Download sample file
                </p>
              </Col>
            </>
          )}

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
              onClick={() => toggleFormModalOption(false, false)}
              type="text"
              className="flex items-center justify-center py-5 px-5 mx-auto"
            >
              Cancel
            </Button>
          </Col>
        </Row>
      </Form>
    </PageModal>
  )
}

export default TerminalCreateion
