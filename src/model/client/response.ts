/* eslint-disable prettier/prettier */
export namespace ApiResponse {
  export class API {
    status?: string
    responseCode?: string
    failureReason?: string
    data: any
  }
  
  export class UserInfo {
      id?: number;
      email?: string;
      firstName?: string;
      lastName?: string;
  }
  
  export class Root {
    selectedDayPerformance?: SelectedDayPerformance
    last7daysPerformances?: Last7daysPerformances
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
  
  export class Last7daysPerformances {
    Thursday?: Thursday
  }
  
  export class Thursday {
    totalTransaction?: number
    failedTransaction?: number
    successfulTransaction?: number
    totalCount?: number
    failedCount?: number
    successCount?: number
    processorPerformanceMap?: ProcessorPerformanceMap2
  }
  
  export class ProcessorPerformanceMap2 {}
}
