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

  export class Statistics {
    selectedDayPerformance?: SelectedDayPerformance
  }

  export class SelectedDayPerformance {
    totalTransaction?: number
    failedTransaction?: number
    successfulTransaction?: number
    totalCount?: number
    failedCount?: number
    successCount?: number
    processorPerformanceMap?: ProcessorPerformanceMap
  }

  export class ProcessorPerformanceMap {}

  export class ProcessorPerformanceMap2 {}
  
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
