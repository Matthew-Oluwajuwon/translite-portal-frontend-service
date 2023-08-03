/* eslint-disable prettier/prettier */
import { Button, Form } from "antd"
import CardHeader from "../components/CardHeader"
import LabeledInput from "../components/LabelInput"

const ResetPassword: React.FC = () => {
  return (
    <div className="sm:ml-20 lg:ml-7">
      <CardHeader
        cardDescription="Please reset your admin password to continue, this will only happen the first time you login!"
        cardTitle={
          <span>
            Reset Password
            <span className="text-[#00C3F9] font-semibold">?</span>
          </span>
        }
      />
      <Form className="grid gap-7 mt-20">
        <div>
          
          <LabeledInput
            label={"Password"}
            type={"password"}
            htmlFor={"password"}
            value={undefined}
          />
        <p className="text-[#94A0B4] mt-1 font-normal text-[0.8rem]">
          You need a stronger password 💪🏽
        </p>
        </div>
        <LabeledInput
          label={"Confirm Password"}
          type={"password"}
          htmlFor={"confirmPassword"}
          value={undefined}
        />
        <div className="flex items-center justify-center mt-14">
          <Button
            type="primary"
            className="flex items-center justify-center p-5 px-7 bg-[#6D71F9] font-semibold"
          >
            Reset my Password
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default ResetPassword
