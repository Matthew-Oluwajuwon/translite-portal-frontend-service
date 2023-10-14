/* eslint-disable prettier/prettier */
import { Button, Col, Divider, List, Row } from "antd"
import React, { useCallback, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { PageModal } from "./modal"
import Download from "../../assets/icons/white-download.svg"
import { setAllGlobalKey } from "../../store"
import useAmountFormat from "../../custom-hooks/useAmountFormat"
import dayjs from "dayjs"

interface Props {
  modalCardTitle: string
  isDownloadable: boolean
  extraContent?: any
}

export const TableExpandModal: React.FC<Props> = ({
  modalCardTitle,
  isDownloadable,
  extraContent,
}) => {
  const dispatch = useAppDispatch()
  const state = useAppSelector((state) => state.global)

  interface PropsData {
    key: string
    value: any
  }

  const GetData = useCallback((): PropsData[] => {
    let data: PropsData[] = [] as any
    if (state?.record && state?.record !== null) {
      Object.keys(state?.record).forEach((key) => {
        data.push({
          key,
          value: state?.record[key],
        })
      })
    }
    return data
  }, [state?.record])

  const convertCamelCaseToTitle = (title: any) => {
    const result = title.replaceAll(/([A-Z])/g, " $1").replaceAll("_", " ")
    return result.charAt(0).toUpperCase() + result.slice(1)
  }

  useEffect(() => {
    GetData()
  }, [GetData])

  const { numberWithCommas } = useAmountFormat()

  return (
    <PageModal
      openModal={state.expand}
      modalFooter={false}
      modalWith="35rem"
      handleCancel={() =>
        dispatch(
          setAllGlobalKey({
            ...state,
            expand: false,
            record: null,
          }),
        )
      }
      modalTitle={
        <div>
          <h1 className="text-[#272848] text-xl text-center my-3">
            {modalCardTitle}
          </h1>
        </div>
      }
      centered={true}
    >
      <Divider />
      <List
        dataSource={
          Array.isArray(GetData())
            ? GetData().filter(
                (x) =>
                  x.value !== null &&
                  x.key?.toLowerCase() !== "id" &&
                  x.key !== "key" &&
                  x.value !== false &&
                  x.value !== true,
              )
            : []
        }
        className="mx-1 sm:mx-10 bg-[#F9F9F9] p-2"
        renderItem={(item) => (
          <List.Item>
            <Row
              style={{ width: "100%" }}
              className="grid grid-cols-[6rem_1fr] lg:grid-cols-[12rem_1fr]"
            >
              <Col className="text-[0.7rem] lg:text-[0.8rem] text-[#717E95]">
                {convertCamelCaseToTitle(
                  item.key.toLowerCase() === "rrn" ? "RRN" : item.key,
                )}
                :
              </Col>
              <Col className="text-[0.7rem] lg:text-[0.8rem] text-[#272848] font-semibold">
                {item.key?.toLowerCase() === "amount" ? (
                  <span className="font-bold text-[#272848] text-[1rem] lg:text-xl">
                    ₦{numberWithCommas(item.value)}
                  </span>
                ) : item.key?.toLowerCase().includes("date") ? (
                  dayjs(item.value).toString()
                ) : item.key?.toLowerCase() === "processordto" ? (
                  item.value.name
                ) : item.key?.toLowerCase() === "terminalstatus" ? <div className="flex items-center">
                  <div
              className={item.value === "ACTIVE" ? "s" : "f"}
            />{item.value}
                </div> : (
                  item.value
                )}
              </Col>
            </Row>
          </List.Item>
        )}
      />
      {extraContent}
      {isDownloadable && (
        <div className="flex items-center justify-center my-5">
          <Button
            type="primary"
            className="flex justify-between bg-[#6D71F9] items-center gap-5 py-5 px-0 pl-3"
            onClick={() => window.print()}
          >
            Download{" "}
            <img src={Download} className="text-[#ffffff]" alt="icon-right" />
          </Button>
        </div>
      )}
    </PageModal>
  )
}
