/* eslint-disable prettier/prettier */
import React from "react"
import { PageModal } from "./modal"
import Log from "../../assets/icons/Congratulations.svg"
import { Button } from "antd"

interface Props {
  openModal?: boolean
  onClick?: () => void
  onCancel?: () => void
}

export const Logout: React.FC<Props> = ({ openModal, onClick, onCancel }) => {
  return (
    <PageModal
      openModal={openModal}
      modalWith="30rem"
      modalFooter={false}
      closable={false}
      centered={true}
    >
      <img src={Log} alt="check" className="mx-auto mt-10" />
      <div className="my-5">
        <h1 className="text-[#101038] text-2xl text-center font-bold leading-loose">
          Log Out
        </h1>
        <p className="text-[#10103899] font-semibold text-center">
          Are you sure you want to log out this <br /> account?
        </p>
      </div>
      <Button
        type="primary"
        htmlType="submit"
        className="text-[#ffffff] bg-[#6D71F9] px-[2rem] py-[1.5rem] lg:py-5 flex items-center justify-center hover:scale-90 mx-auto"
        onClick={onClick}
      >
        Yes, Log Out
      </Button>
      <Button
        type="text"
        htmlType="submit"
        className="bg-[#F5F3F7] font-semibold text-[#272848] my-3 px-[2rem] py-[1.5rem] lg:py-5 flex items-center justify-center hover:scale-90 mx-auto"
        onClick={onCancel}
      >
        Cancel
      </Button>
    </PageModal>
  )
}
