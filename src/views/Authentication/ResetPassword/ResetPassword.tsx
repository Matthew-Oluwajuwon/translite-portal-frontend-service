/* eslint-disable prettier/prettier */
import { Button, Form, Popover } from "antd"
import CardHeader from "../components/CardHeader"
import LabeledInput from "../components/LabelInput"
import Warning from "../../assets/icons/warning.svg"
import GrayChecker from "../../assets/icons/gray-check.svg"
import WarningLight from "../../assets/icons/warningLight.svg"
import RedCheck from "../../assets/icons/red-check.svg"
import GreenCheck from "../../assets/icons/green-check.svg"
import { useAppSelector } from "../../../store/hooks"

const ResetPassword: React.FC = () => {
  //   const contentData = [
  //     {
  //       text: "Minimum number of characters: 8",
  //       img:
  //         state.request?.password === ""
  //           ? GrayChecker
  //           : state.request?.password === undefined
  //           ? GrayChecker
  //           : state.isPasswordLength
  //           ? GreenCheck
  //           : RedCheck,
  //     },
  //     {
  //       text: "Contains a capital letter",
  //       img:
  //         state.request?.password === ""
  //           ? GrayChecker
  //           : state.request?.password === undefined
  //           ? GrayChecker
  //           : state.isUpperCase
  //           ? GreenCheck
  //           : RedCheck,
  //     },
  //     {
  //       text: "Contains a lowercase letter",
  //       img:
  //         state.request?.password === ""
  //           ? GrayChecker
  //           : state.request?.password === undefined
  //           ? GrayChecker
  //           : state.isLowerCase
  //           ? GreenCheck
  //           : RedCheck,
  //     },
  //     {
  //       text: "Contains a number",
  //       img:
  //         state.request?.password === ""
  //           ? GrayChecker
  //           : state.request?.password === undefined
  //           ? GrayChecker
  //           : state.hasNumber
  //           ? GreenCheck
  //           : RedCheck,
  //     },
  //     {
  //       text: "Includes a special character",
  //       img:
  //         state.request?.password === ""
  //           ? GrayChecker
  //           : state.request?.password === undefined
  //           ? GrayChecker
  //           : state.isSpecialChar
  //           ? GreenCheck
  //           : RedCheck,
  //     },
  //   ]
    const state = useAppSelector((state) => state.auth)

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
        <Popover>
          <LabeledInput
            label={"Password"}
            type={"password"}
            htmlFor={"password"}
            value={undefined}
          />
        </Popover>
        <p className="text-[#94A0B4] mt-0 font-normal text-[0.8rem]">
          You need a stronger password 💪🏽
        </p>
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
