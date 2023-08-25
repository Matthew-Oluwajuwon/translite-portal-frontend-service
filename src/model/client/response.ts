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
}
