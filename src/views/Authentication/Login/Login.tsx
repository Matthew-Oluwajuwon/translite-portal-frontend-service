/* eslint-disable prettier/prettier */
import { Button, Form } from "antd"
import CardHeader from "../components/CardHeader"
import LabeledInput from "../components/LabelInput"
import { Link, useOutletContext } from "react-router-dom"
import { FORM_METHODS, ROUTE } from "../../../common/constants"
import { useAppSelector } from "../../../store/hooks"
import useAuthApi from "../../../custom-hooks/useAuthApi"
import { useEffect } from "react"
import { apiEndpoints } from "../../../store/apiEndpoints"
import { useAuthQuery } from "../../../custom-hooks/useAuthQuery"

const Login: React.FC = () => {
  const state = useAppSelector((state) => {
    return state.auth
  })
  const { isLoading, handleLogin } = useAuthApi()
  const { setAuthRequestField } = useAuthQuery()
  const setChildrenData: any = useOutletContext()

  useEffect(() => {
    setChildrenData(FORM_METHODS.POST, apiEndpoints.auth.login)
  }, [setChildrenData])

  return (
    <div>
      <CardHeader
        cardDescription="Glad to have you back. Enter your details to proceed"
        cardTitle="Sign In"
      />
      <Form
        layout="vertical"
        wrapperCol={{ span: 24 }}
        labelCol={{ span: 24 }}
        onFinish={handleLogin}
        fields={[
          {
            name: "username",
            value: state.request?.username,
          },
          {
            name: "password",
            value: state.request?.password,
          },
        ]}
        className="grid gap-7 mt-20"
      >
        <Form.Item
          name="username"
          rules={[
            { required: true, message: "Email Address or username is required" },
            {
              type: "email",
              message: "Email Address or username is invalid",
            },
          ]}
        >
          <LabeledInput
            label={"Enter email or username"}
            type={"text"}
            htmlFor={"email or username"}
            value={state.request?.username}
            onChange={(e) => setAuthRequestField("username", e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Password is required" }]}
        >
          <LabeledInput
            label={"Password"}
            type={"password"}
            htmlFor={"password"}
            value={state.request?.password}
            onChange={(e) => setAuthRequestField("password", e.target.value)}
          />
        </Form.Item>
        <div className="flex items-center justify-between mt-5">
          <Link
            to={ROUTE.SEND_MAIL_FOR_PASSWORD_CHANGE}
            className="text-[#1C166A] font-medium text-base"
          >
            Reset Password?
          </Link>
          <Button
            type="primary"
            loading={isLoading}
            htmlType="submit"
            className="flex items-center justify-center p-5 px-7 bg-[#6D71F9] font-semibold"
          >
            Log In
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default Login
