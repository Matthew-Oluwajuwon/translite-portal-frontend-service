/* eslint-disable prettier/prettier */
export namespace PageProps {
  export class AuthLayoutProps {
    children?: any
    padding?: string
  }
  export class ModalProps {
    openModal?: boolean
    handleCancel?: any
    modalTitle?: any
    modalFooter?: any
    onOk?: any
    children?: any
    cancelText?: string
    okText?: any
    modalWith?: string
    centered?: boolean
    maskClosable?: boolean
    closable?: boolean
  }

  export class SuccessModal {
    openModal?: boolean
    onClick?: () => void
    children?: any
    onCancel?: () => any
  }
  export class PageLayoutProps {
    children?: any
    pageTitle?: string
    defaultSelectedKeys?: string
    defaultOpenKeys?: string
    breadcrumb?: any
  }
  export class TableData {
    dataSource?: any[]
    column?: any[]
    loading?: boolean
    total?: number
    pageSize?: number
    onPagination?: () => void
    shouldExpand?: boolean
  }
}
