/* eslint-disable prettier/prettier */

import { Button, Form } from "antd"
import CardHeader from "../components/CardHeader"
import LabeledInput from "../components/LabelInput"
import { ForgotPasswordResponseModal } from "./ForgotPasswordResponeModal"
import { setAuthKey } from "../../../store"
import { useAppSelector, useAppDispatch } from "../../../store/hooks"

const SendMailForPasswordChange: React.FC = () => {
  const dispatch = useAppDispatch()
  const state = useAppSelector((state) => {
    return state.auth
  })
  return (
    <div className="sm:ml-20 lg:ml-7">
      <ForgotPasswordResponseModal />
      <CardHeader
        cardTitle={
          <span>
            Reset Password{" "}
            <span className="text-[#00C3F9] font-semibold">?</span>
          </span>
        }
        cardDescription={
          "No problem, Enter your Email address and you will receive a link in your inbox shortly"
        }
      />
      <Form className="mt-20">
        <LabeledInput
          label={"Enter your email"}
          type={"email"}
          htmlFor={"email or username"}
          value={undefined}
        />
        <p className="text-[#94A0B4] mt-2 font-normal text-[0.8rem]">
          Please enter email linked to your Translite account ⚠️
        </p>
        <div className="flex items-center justify-center mt-14">
          <Button
            type="primary"
            className="flex items-center justify-center p-5 px-7 bg-[#6D71F9] font-semibold"
            onClick={() =>
              dispatch(
                setAuthKey({
                  key: "showForgotPasswordResponseModal",
                  value: !state.showForgotPasswordResponseModal,
                }),
              )
            }
          >
            Continue
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default SendMailForPasswordChange
