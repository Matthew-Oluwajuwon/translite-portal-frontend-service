/* eslint-disable prettier/prettier */
export const apiEndpoints = {
  auth: {
    login: "authenticate",
    getAdminUser: "adminUser/info",
    resetPassword: "adminUser/resetAdminPassword?token="
  },
  transaction: {
    dashboardDay: "transactions/dashboard/",
    getTransactions: "transactions",
    getTransactionsByProcessorName: "transactions/byProcessor/",
    searchTransaction: "transactions/search"
  },
  processor: {
    getProcessors: "processor"
  }
}
