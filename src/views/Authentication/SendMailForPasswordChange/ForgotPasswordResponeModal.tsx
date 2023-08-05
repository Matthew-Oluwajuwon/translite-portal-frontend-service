/* eslint-disable prettier/prettier */
import { useAppSelector, useAppDispatch } from "../../../store/hooks"
import { setAuthKey } from "../../../store"
import { SuccessModal } from "../../../common/components/SuccessModal"
import { useCallback } from "react"
export const ForgotPasswordResponseModal: React.FC = () => {
  const dispatch = useAppDispatch()
  const state = useAppSelector((state) => state.auth)

  const handleClick = useCallback(() => {
    dispatch(
      setAuthKey({ key: "showForgotPasswordResponseModal", value: true }),
    )
    window.history.back()
  }, [dispatch])

  return (
    <SuccessModal
      onClick={handleClick}
      openModal={state.showForgotPasswordResponseModal}
    >
      <div className="my-5 mx-10">
        <h1 className="text-[#272848] font-[PoppinsBold] text-xl font-bold text-center">
          Please Check you Email
        </h1>
        <p className="text-[#717E95] my-3 text-center text-md">
          A link has been sent to your inbox, click the link to reset your
          password
        </p>
      </div>
      <div className="my-10 text-center">
        <p className="text-[#272848]">
          Didn’t receive an email?{" "}
          <span className="cursor-pointer text-[#6D71F9] hover:scale-90">
            Resend
          </span>
        </p>
      </div>
    </SuccessModal>
  )
}
