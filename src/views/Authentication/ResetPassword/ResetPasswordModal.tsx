/* eslint-disable prettier/prettier */
import { useCallback } from "react"
import { useAppDispatch, useAppSelector } from "../../../store/hooks"
import { SuccessModal } from "../../../common/components/SuccessModal"
import { setAuthKey } from "../../../store"
import { useNavigate } from "react-router-dom"
import { ROUTE } from "@common/constants"

export const ResetPasswordResponseModal: React.FC = () => {
  const dispatch = useAppDispatch()
  const state = useAppSelector((state) => state.auth)
  
  const navigate = useNavigate()

  const handleClick = useCallback(() => {
    dispatch(
      setAuthKey({ key: "showResetPasswordResponseModal", value: true }),
    )
    navigate(ROUTE.INDEX, {
      replace: true
    })
  }, [dispatch, navigate])

  return (
    <SuccessModal
      onClick={handleClick}
      openModal={state.showChangePasswordResponseModal}
    >
      <div className="my-10 mx-10">
        <h1 className="text-[#272848] text-xl font-bold text-center">
          Successful
        </h1>
        <p className="text-[#717E95] my-3 mx-auto text-center text-md w-full lg:w-[75%]">
          Your Password has changed, please continue to login
        </p>
      </div>
    </SuccessModal>
  )
}
