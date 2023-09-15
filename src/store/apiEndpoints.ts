/* eslint-disable prettier/prettier */
export const apiEndpoints = {
  auth: {
    login: "authenticate",
    getAdminUser: "adminUser/info",
    resetPassword: "adminUser/changeAdminPassword",
  },
  transaction: {
    dashboardDay: "transactions/dashboard/",
    getTransactions: "transactions",
    getTransactionsByProcessorName: "transactions/byProcessor/",
    searchTransaction: "transactions/search",
  },
  processor: {
    getProcessors: "processor",
    cardSchemes: "processor/cardSchemes",
    addProcessor:"processor/add",
    updateProcessor:"processor/update/"
  },
  users: {
    getUsers: "adminUser/all",
    addNewUser: "adminUser/add",
    enableAdminUser: "adminUser/enableAdminUser/",
    disableAdminUser: "adminUser/disableAdminUser/",
  },
}
