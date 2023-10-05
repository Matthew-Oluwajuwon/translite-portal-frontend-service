/* eslint-disable prettier/prettier */
import { useCallback } from "react"
import { useAppDispatch, useAppSelector } from "../../../store/hooks"
import { SuccessModal } from "../../../common/components/SuccessModal"
import { setAllGlobalKey } from "../../../store"
import { useNavigate } from "react-router-dom"
import { ROUTE } from "@common/constants"

export const AddNewUserResponseModal: React.FC = () => {
  const dispatch = useAppDispatch()
  const state = useAppSelector((state: { global: any }) => state.global)

  const navigate = useNavigate()

  const handleClick = useCallback(() => {
    dispatch(
      setAllGlobalKey({
        ...state,
        user: {
          ...state.user,
          showAddUserSuccessResponseModal:
            !state.user?.showAddUserSuccessResponseModal,
        },
      }),
    )
    navigate(ROUTE.SYSTEM_USERS, {
      replace: true,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, navigate, state.user?.showAddUserSuccessResponseModal])

  return (
    <SuccessModal
      onClick={handleClick}
      openModal={state.user?.showAddUserSuccessResponseModal}
    >
      <div className="my-10 mx-10">
        <h1 className="text-[#272848] text-xl font-bold text-center">
          Successful
        </h1>
        <p className="text-[#717E95] my-3 mx-auto text-center text-md w-full lg:w-[75%]">
          User saved Succesfully!
        </p>
      </div>
    </SuccessModal>
  )
}
