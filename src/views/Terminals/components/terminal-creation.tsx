/* eslint-disable prettier/prettier */
import { Button, Form, Row, Col, Input, UploadProps, Spin } from "antd"
import { PageModal } from "../../../common/components/modal"
import { useAppSelector } from "../../../store/hooks"
import FileUpload from "../../../assets/images/upload.svg"
import useToggle from "../../../custom-hooks/useToggle"
import { useForm } from "antd/es/form/Form"
import { useEffect, useState } from "react"
import useSetRequest from "../../../custom-hooks/useSetRequest"
import { apiEndpoints } from "../../../store/apiEndpoints"
import useApiMethods from "../../../custom-hooks/useApiMethods"
import { useUploadDataMutation } from "../../../store"
import { Encryption } from "@common/utils/encryption"
import Dragger from "antd/es/upload/Dragger"
import { RcFile } from "antd/es/upload"

const TerminalCreateion: React.FC = () => {
  const state = useAppSelector((state) => {
    return state.global
  })

  const [form] = useForm()
  const [submittable, setSubmittable] = useState(false)
  const values = Form.useWatch([], form)
  const [uploadData, uploadResult] = useUploadDataMutation()

  useEffect(() => {
    form.validateFields().then(
      () => {
        setSubmittable(true)
      },
      () => {
        setSubmittable(false)
      },
    )
  }, [form, values])

  let formData = new FormData()

  const props: UploadProps = {
    name: "file",
    multiple: false,
    accept: ".xls, .xlsx",
    maxCount: 1,
    fileList: undefined,
    headers: {
      authorization: `Bearer ${JSON.parse(
        JSON.parse(Encryption.decrypt(localStorage.getItem("*****") as string)),
      )}`,
    },
    onChange: (info) => {
      info.file.status = "done"

      // setFormRequest(info.file.originFileObj as RcFile, "file")
      formData.append("file", info.file.originFileObj)
    },
  }

  const { toggleFormModalOption } = useToggle()
  const { setFormRequest } = useSetRequest()
  const { handleApiMethodController, result } = useApiMethods()

  console.log(uploadResult)

  return (
    <PageModal
      openModal={state.terminal?.showCreateModal}
      modalWith="35rem"
      modalFooter={false}
      handleCancel={() => toggleFormModalOption(false, false)}
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
      <Spin spinning={result?.isLoading}>
        <Form
          form={form}
          layout="vertical"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          className="mx-20 mt-10 mb-5"
          onFinish={() =>
            !state.terminal?.isSingleCreation
              ? handleApiMethodController(
                  state,
                  apiEndpoints.terminal?.addNewTerminal +
                    state.request?.serialNo,
                  "CREATE",
                  state.terminal?.isSingleCreation && {
                    file: formData,
                  },
                )
              : uploadData({
                  uploadUrl: apiEndpoints.terminal.bulkUpload,
                  request: formData,
                })
          }
          fields={[
            {
              name: "serialNo",
              value: state.request?.serialNo,
            },
            {
              name: "file",
              value: state.request?.file,
            },
          ]}
        >
          <Row style={{ width: "100%" }}>
            {!state.terminal?.isSingleCreation ? (
              <div className="mb-36 w-full">
                <Col span={24}>
                  <Form.Item
                    label={
                      <h2 className="text-[#272848] font-semibold">
                        Terminal Serial Number
                      </h2>
                    }
                    name={"serialNo"}
                    rules={[
                      {
                        required: true,
                        message: "Terminal Serial number is reqired",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Enter Terminal serial number"
                      className="py-3 px-5"
                      onChange={(e) =>
                        setFormRequest(e.target.value, "serialNo")
                      }
                    />
                  </Form.Item>
                </Col>
              </div>
            ) : (
              <>
                <Col span={24} className="mt-5 mb-10">
                  <Form.Item
                    label="Upload File"
                    // name={"file"}
                    rules={[{ required: true }]}
                  >
                    <Dragger {...props}>
                      <img src={FileUpload} alt="file-upload" />
                    </Dragger>
                  </Form.Item>
                  {/* <form action={addfile} method="get"> */}
                  <button className="text-[#6D71F9] -mt-5 text-[0.8rem]">
                    Download sample file
                  </button>
                  {/* </form> */}
                </Col>
              </>
            )}

            <Col span={24}>
              <Button
                type="primary"
                htmlType="submit"
                className="flex items-center justify-center bg-[#6D71F9] py-5 px-5 mx-auto"
                disabled={submittable ? false : true}
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
      </Spin>
    </PageModal>
  )
}

export default TerminalCreateion
