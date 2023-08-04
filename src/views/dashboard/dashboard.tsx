/* eslint-disable prettier/prettier */

import { useLayoutEffect } from "react"
import { PageLayout } from "../../common/layout/page-layout"
import { Chart } from "./chart"
import { PageStat } from "./statistics"
import { TransactionTable } from "./transaction-table"

export const Dashboard: React.FC = () => {
  useLayoutEffect(() => {
    document.title = "Dashboard | Translite"
  }, [])
  return (
    <PageLayout
      defaultSelectedKeys="01"
      pageTitle="Dashboard"
      breadcrumb={
        <span className="font-light text-sm breadcrumb-before">
          {"Home > Dashboard"}
        </span>
      }
    >
      <PageStat />
      <Chart />
      <TransactionTable />
    </PageLayout>
  )
}
