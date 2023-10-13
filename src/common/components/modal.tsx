/* eslint-disable prettier/prettier */
import { Modal } from "antd"
import React from "react"
import { PageProps } from "../../model/application/props"

export const PageModal: React.FC<PageProps.ModalProps> = ({
  cancelText,
  centered,
  children,
  closable,
  handleCancel,
  maskClosable,
  modalFooter,
  modalTitle,
  modalWith,
  okText,
  onOk,
  openModal,
}) => {
  return (
    <Modal
      open={openModal}
      onCancel={handleCancel}
      title={<div className="text-center">{modalTitle}</div>}
      cancelText={cancelText}
      okText={okText}
      width={modalWith}
      closeIcon={null}
      closable={closable}
      maskClosable={maskClosable}
      footer={modalFooter}
      centered={centered}
      onOk={onOk}
      okButtonProps={{ type: "primary" }}
    >
      <div className="h-[85vh] overflow-auto">{children}</div>
    </Modal>
  )
}
