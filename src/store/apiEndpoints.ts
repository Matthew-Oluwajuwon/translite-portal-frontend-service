/* eslint-disable prettier/prettier */
export const apiEndpoints = {
  auth: {
    login: "authenticate",
    getAdminUser: "adminUser/info",
    resetPassword: "adminUser/changeAdminPassword"
  },
  transaction: {
    dashboardDay: "transactions/dashboard/",
    getTransactions: "transactions",
    getTransactionsByProcessorName: "transactions/byProcessor/",
    searchTransaction: "transactions/search"
  },
  processor: {
    getProcessors: "processor"
  },
  users: {
    getUsers: "adminUser/all"
  }
}
