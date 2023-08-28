/* eslint-disable prettier/prettier */
export namespace ApiRequest {
  export class Auth {
    email?: string;
    password?: string;
    newPassword?: string;
    username?: string;
  }
  
  export class SearchTransaction {
    size?: number
    page?: number
    rrn?: string
    status?: string
    toDate?: string
    fromDate?: string
    terminalId?: string
    processedBy?: string
  }
}
