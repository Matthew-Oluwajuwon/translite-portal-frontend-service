/* eslint-disable prettier/prettier */
export const apiEndpoints = {
  auth: {
    login: "authenticate",
    getAdminUser: "adminUser/info"
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
