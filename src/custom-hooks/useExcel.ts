/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as XLSX from "xlsx"

export const useExcel = () => {
  const downloadDataToExcel = async (data: {
    title?: string
    rows?: Array<any>
    column?: Array<string>
    fileName?: string
    extension?: "xlsx" | "csv"
  }) => {
    if (data.rows?.length) {
      const wb = XLSX?.utils?.book_new(),
        ws = XLSX?.utils?.json_to_sheet(data?.rows)
      XLSX?.utils?.book_append_sheet(wb, ws, "files")
      XLSX?.writeFile(wb, `${data.fileName}.${data.extension}`)
    }
  }
  const generateData = (data: [], keys: Array<string>) => {
    if (Array.isArray(data) && keys?.length) {
      const newData: Array<any> = []
      data.map((obj: any, index) => {
        let newObj = {}
        const key = "SN"
        newObj = { ...newObj, [key]: (index + 1).toString() }
        keys?.forEach((x) => {
          newObj = {
            ...newObj,
            [x]:
              obj[x] === undefined
                ? "N/A"
                : Object.prototype.toString.call(obj[x]) === "[object Object]"
                ? JSON.stringify(obj[x])
                : obj[x]?.toString(),
          }
        })
        newData.push(newObj)

        return newData
      })
      return newData
    }
    return data
  }
  return { downloadDataToExcel, generateData }
}
