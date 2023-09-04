/* eslint-disable prettier/prettier */
import { Button, Form, Popover } from "antd"
import CardHeader from "../components/CardHeader"
import LabeledInput from "../components/LabelInput"
import { useAuthQuery } from "../../../custom-hooks/useAuthQuery"
import { useAppDispatch, useAppSelector } from "../../../store/hooks"
import { setAuthKey, useResetPasswordMutation } from "../../../store"
import { VerificationCode } from "../components/verification-code"
import { ForgotPasswordResponseModal } from "../SendMailForPasswordChange/ForgotPasswordResponeModal"
import { ResetPasswordResponseModal } from "./ResetPasswordModal"
import { apiEndpoints } from "../../../store/apiEndpoints"
import { useEffect } from "react"
import Notify from "@common/components/notification"
import { useLocation } from "react-router-dom"

const ResetPassword: React.FC = () => {
  const dispatch = useAppDispatch()
  const state = useAppSelector((state) => {
    return state.auth
  })
  const { contentData, passwordValidator, setResetInputField } = useAuthQuery()
  const [resetPassword, resetPasswordResult] = useResetPasswordMutation()
  const location = useLocation()

  const content = (
    <div className="grid gap-3">
      {contentData.map((item, index) => (
        <span key={index} className="flex gap-3 items-center">
          <img src={item.img} className="w-[1.50rem]" alt="checker-img" />
          <p>{item.text}</p>
        </span>
      ))}
    </div>
  )

  useEffect(() => {
    if (resetPasswordResult.data?.responseCode === "00") {
      Notify("success", resetPasswordResult.data?.status)
      dispatch(
        setAuthKey({
          key: "showChangePasswordResponseModal",
          value: true,
        }),
      )
    } else {
      Notify(
        "error",
        resetPasswordResult.data?.failureReason
          ?.toLowerCase()
          .includes("invalid token")
          ? "Unable to reset password, kindly login to try again"
          : resetPasswordResult.data?.failureReason,
      )
    }
  }, [dispatch, resetPasswordResult.data])
  
  return (
    <div className="sm:ml-20 lg:ml-7">
      <VerificationCode />
      <ForgotPasswordResponseModal />
      {state.showChangePasswordResponseModal && <ResetPasswordResponseModal />}
      <CardHeader
        cardDescription="Please reset your admin password to continue, this will only happen the first time you login!"
        cardTitle={
          <span>
            Reset Password
            <span className="text-[#00C3F9] font-semibold">?</span>
          </span>
        }
      />
      <Form
        onFinish={() =>
          resetPassword({
            ...state,
            postUrl: apiEndpoints.auth?.resetPassword,
            request: {
              oldPassword: location.state?.oldPassword,
              password: state.request?.password,
              confirmPassword: state.request?.confirmPassword
            }
          })
        }
        fields={[
          {
            name: "confirmPassword",
            value: state.request?.confirmPassword,
          },
          {
            name: "password",
            value: state.request?.password,
          },
        ]}
        className="grid gap-7 mt-20"
      >
        <div>
          <Popover content={content} trigger="focus" placement="top">
            <div>
              <Form.Item
                name={"newPassword"}
                required
                rules={[
                  { required: true, message: "Please enter password" },
                  { validator: passwordValidator },
                ]}
              >
                <LabeledInput
                  label={"Password"}
                  type={"password"}
                  htmlFor={"password"}
                  onChange={(e) =>
                    setResetInputField(e.target.value, "password")
                  }
                  value={state.request?.password}
                />
              </Form.Item>
            </div>
          </Popover>
          {(state.request?.password?.length as any) < 8 && (
            <p className="text-[#94A0B4] text-[0.7rem]">
              You need a stronger password 💪🏽
            </p>
          )}
        </div>
        <Form.Item
          name={"confirmPassword"}
          required
          rules={[
            { required: true, message: "Please enter password" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve()
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!"),
                )
              },
            }),
          ]}
          validateTrigger={["onChange", "onBlur"]}
          dependencies={["password"]}
        >
          <LabeledInput
            label={"Confirm Password"}
            type={"confirmPassword"}
            htmlFor={"confirmPassword"}
            value={state.request?.confirmPassword}
            onChange={(e) => setResetInputField(e.target.value, "confirmPassword")}
          />
        </Form.Item>
        <div className="flex items-center justify-center mt-14">
          <Button
            type="primary"
            className="flex items-center justify-center p-5 px-7 bg-[#6D71F9] font-semibold"
            htmlType="submit"
            loading={resetPasswordResult.isLoading}
          >
            Reset my Password
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default ResetPassword
