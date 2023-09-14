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
    type?: string;
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
    createdDate?: string
  }
  
}
