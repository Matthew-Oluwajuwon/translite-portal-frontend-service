/* eslint-disable prettier/prettier */
import { PageModal } from "./modal"
import Check from "../../assets/images/success-check.svg"
import FailedCheck from "../../assets/images/failed-check.svg"
import { Button } from "antd"
import { PageProps } from "../../model/application/props"

export const SuccessModal: React.FC<PageProps.SuccessModal> = ({
  children,
  onClick,
  openModal,
  status = true,
  extraBtn,
  btnText
}) => {
  return (
    <PageModal
      openModal={openModal}
      modalWith="30rem"
      modalFooter={false}
      closable={false}
      centered
    >
      <img src={status ? Check : FailedCheck} alt="check" className="mx-auto" />
      {children}
      <Button
        type="primary"
        htmlType="submit"
        className="text-[#ffffff] px-[2rem] py-[1.5rem] bg-[#6D71F9] lg:py-5 flex items-center justify-center hover:scale-90 mx-auto mb-10"
        onClick={onClick}
      >
        {btnText ? btnText : "Continue"}
      </Button>
    </PageModal>
  )
}
