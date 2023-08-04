/* eslint-disable prettier/prettier */
import { PageModal } from "./modal"
import Check from "../../assets/images/success-check.svg"
import { Button } from "antd"
import { PageProps } from "../../model/application/props"

export const SuccessModal: React.FC<PageProps.SuccessModal> = ({
  children,
  onClick,
  openModal,
}) => {
  return (
    <PageModal
      openModal={openModal}
      modalWith="30rem"
      modalFooter={false}
      closable={false}
      centered={true}
    >
      <img src={Check} alt="check" className="mx-auto" />
      {children}
      <Button
        type="primary"
        htmlType="submit"
        className="text-[#ffffff]font-[PoppinsRegular] px-[2rem] py-[1.5rem] lg:py-5 flex items-center justify-center hover:scale-90 mx-auto"
        onClick={onClick}
      >
        Continue
      </Button>
    </PageModal>
  )
}
