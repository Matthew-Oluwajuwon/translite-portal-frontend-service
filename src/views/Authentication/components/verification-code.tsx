/* eslint-disable prettier/prettier */
import { Button } from "antd"
import React, { useCallback } from "react"
import PinInput from "react-pin-input"
import { setStateKey } from "../../../store"
import { PageModal } from "../../../common/components/modal"
import { useAppDispatch, useAppSelector } from "../../../store/hooks"

export const VerificationCode: React.FC = () => {
  const dispatch = useAppDispatch()
  const state = useAppSelector((state) => {
    return state.auth
  })

  const handleClick = useCallback(() => {
    dispatch(
      setStateKey({
        key: "showVerficationCodeModal",
        value: !state.showVerficationCodeModal,
      }),
    )
    dispatch(
      setStateKey({ key: "showChangePasswordResponseModal", value: true }),
    )
  }, [dispatch, state.showVerficationCodeModal])
  return (
    <PageModal
      openModal={state.showVerficationCodeModal}
      modalWith="35rem"
      modalFooter={false}
      closable={false}
      centered={true}
    >
      <div className="md:m-[1rem] lg:m-[3rem]">
        <h1 className="text-3xl text-[#272848] mb-2 font-[Poppins] font-bold">
          Verification Code
        </h1>
        <p className="text-[#94A0B4] font-[poppins]">
          Please enter verification code attached to email
        </p>
        <div className="my-20">
          <p className="text-[#272848]">Enter OTP Code in your mail</p>
          <PinInput
            length={5}
            initialValue=""
            placeholder="-"
            secret
            type="numeric"
            inputMode="number"
            style={{ padding: "0.5rem 0" }}
            inputStyle={{
              borderColor: "#DEDFEC",
              borderRadius: "8px",
              height: "70px",
            }}
            inputFocusStyle={{ borderColor: "#00C3F9" }}
            //   onComplete={(value) => {
            //     VerifyPin(value);
            //   }}
            autoSelect={true}
            regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
          />
          <p className="text-[#272848] font-[poppins] mt-3">
            Couldn’t find OTP?{" "}
          </p>
          <p className="text-[#94A0B4] font-[poppins] w-[75%]">
            Please check your inbox, below password reset link
          </p>
        </div>
        <Button
          onClick={handleClick}
          type="primary"
          htmlType="button"
          className="text-[#ffffff]font-[PoppinsRegular] px-[2rem] py-[1.5rem] lg:py-5 flex items-center justify-center hover:scale-90 mx-auto"
        >
          Continue
        </Button>
      </div>
    </PageModal>
  )
}
