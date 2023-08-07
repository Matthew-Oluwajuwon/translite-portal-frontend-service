/* eslint-disable prettier/prettier */
import { Button, Form } from "antd"
import CardHeader from "../components/CardHeader"
import LabeledInput from "../components/LabelInput"
import { Link } from "react-router-dom"
import { ROUTE } from "../../../common/constants"

const Login: React.FC = () => {
  return (
    <div>
      <CardHeader
        cardDescription="Glad to have you back. Enter your details to proceed"
        cardTitle="Sign In"
      />
      <Form className="grid gap-7 mt-20">
        <LabeledInput
          label={"Enter email or user name"}
          type={"text"}
          htmlFor={"email or username"}
          value={undefined}
        />
        <LabeledInput
          label={"Password"}
          type={"password"}
          htmlFor={"email or username"}
          value={undefined}
        />
        <div className="flex items-center justify-between mt-5">
          <Link
            to={ROUTE.SEND_MAIL_FOR_PASSWORD_CHANGE}
            className="text-[#1C166A] font-medium text-base"
          >
            Reset Password?
          </Link>
          <Button
            type="primary"
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
