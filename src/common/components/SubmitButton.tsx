/* eslint-disable prettier/prettier */
import { Button, Form, FormInstance } from "antd"
import React from "react"

const SubmitButton = ({
  form,
  name,
  onClick,
  htmlType,
  block,
  loading,
}: {
  form?: FormInstance
  name: string
  htmlType: "button" | "submit" | "reset" | undefined
  block?: boolean
  onClick?: () => void
  loading?: boolean
}) => {
  const [submittable, setSubmittable] = React.useState(false)

  // Watch all values
  const values = Form.useWatch([], form)

  React.useEffect(() => {
    form?.validateFields({ validateOnly: true }).then(
      () => {
        setSubmittable(true)
      },
      () => {
        setSubmittable(false)
      },
    )
  }, [form, values])

  return (
    <Button
      type="primary"
      htmlType={htmlType}
      disabled={submittable ? false : true}
      className="bg-[#6D71F9] border-[#6D71F9] disabled:bg-[#6D71F930] mx-auto disabled:hover:scale-100 disabled:hover:border-[#6D71F930!important] disabled:hover:bg-[#6D71F930!important] disabled:hover:text-[#ffffff!important] text-[#ffffff!important] hover:bg-[transparent!important] hover:text-[#6D71F9!important] hover:scale-105 transition-all flex items-center justify-center py-5 px-10"
      block={block}
      onClick={onClick}
      loading={loading}
    >
      {name}
    </Button>
  )
}

export default SubmitButton
