/* eslint-disable prettier/prettier */
export namespace ApiResponse {
  export class API {
    status?: string
    responseCode?: string
    failureReason?: string
    data: any
  }

  export class UserInfo {
    id?: number
    email?: string
    firstName?: string
    lastName?: string
    disabled?: boolean
  }

  export class Dashboard {
    dayReport?: DayReport
    sevenDaysReport?: SevenDaysReport[]
  }

  export class DayReport {
    totalValue?: number
    failedValue?: number
    successValue?: number
    totalCount?: number
    failedCount?: number
    successCount?: number
    successPercentage?: string
    processorSuccessPercentage?: ProcessorSuccessPercentage[]
  }

  export class ProcessorSuccessPercentage {
    name?: string
    value?: string
    type?: string
  }

  export class SevenDaysReport {
    day?: string
    type?: string
    value?: number
    count?: number
  }

  export class Transaction {
    id?: number
    rrn?: string
    pan?: string
    amount?: number
    terminalId?: string
    processedBy?: string
    responseCode?: string
    responseDescription?: string
    createdDate?: string
  }

  export class Processor {
    id?: number
    name?: string
    ip?: string
    port?: number
    allowKeyExchange?: boolean
    cardSchemes?: string[]
    createdDate?: string
  }

  export class SystemTerminal {
    id?: number
    serialNo?: string
    terminalId?: string
    uploadedBy?: string
    createdDate?: string
  }

  export class TerminalProcessor {
    id?: number
    terminalId?: string
    uploadedBy?: string
    createdDate?: string
    processorDTO?: Processor
    terminalStatus?: string
  }
  
  export class CustomConfiguration {
    id?: number
    cardScheme?: string
    boundsDTOS?: BoundsDtos[]
    creationDate?: string
    updatedDate?: any
  }
  
  export class BoundsDtos {
    processorName?: string
    lowerBound?: number
    upperBound?: number
  }
  
}
