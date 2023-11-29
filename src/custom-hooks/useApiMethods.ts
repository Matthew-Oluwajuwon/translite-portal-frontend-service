/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react"
import {
  setAllGlobalKey,
  useDeleteDataMutation,
  useGetDataByPostMethodSecuredMutation,
  useLazyGetDataQuery,
  usePostDataMutation,
  useUpdateDataMutation,
} from "../store"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import Notify from "../common/components/notification"
import { State } from "../model/application/state"
import { ResponseCode } from "@common/constants"
import { ApiRequest } from "../model/client/request"

export type FORM_ACTION =
  | "CREATE"
  | "UPDATE"
  | "DELETE"
  | "READ"
  | "GET_BY_POST_METHOD"

const useApiMethods = () => {
  const dispatch = useAppDispatch()
  const state = useAppSelector((state) => {
    return state.global
  })
  const [action, setAction] = useState<FORM_ACTION>("READ")
  const [postData, postDataResult] = usePostDataMutation()
  const [updateData, updateDataResult] = useUpdateDataMutation()
  const [deleteData, deleteDataResult] = useDeleteDataMutation()
  const [getDataByPostMethod, getDataByPostMethodResult] =
    useGetDataByPostMethodSecuredMutation()
  const [getData, result] = useLazyGetDataQuery()

  const handleGetData = useCallback(
    (getUrl?: string) => {
      getData({
        ...state,
        getUrl,
        page: 1,
      })
    },
    [getData],
  )

  const handleApiMethodController = useCallback(
    (
      state: State.Global,
      url: string,
      action: FORM_ACTION,
      request?: any,
      page?: number,
    ) => {
      setAction(action)
      if (url) {
        switch (action) {
          case "CREATE":
            postData({
              ...state,
              postUrl: url,
              request,
            })
            break
          case "UPDATE":
            updateData({
              ...state,
              updateUrl: url,
              request,
            })
            break
          case "DELETE":
            deleteData({
              ...state,
              deleteUrl: url,
              request,
            })
            break
          case "GET_BY_POST_METHOD":
            getDataByPostMethod({
              ...state,
              getPostUrl: url,
              request,
              page,
            })
            break
          default:
            handleGetData(url)
            break
        }
      }
    },
    [deleteData, handleGetData, postData, updateData],
  )

  useEffect(() => {
    if (
      (!postDataResult.isLoading && postDataResult.data) ||
      (!updateDataResult.isLoading && updateDataResult.data) ||
      (!deleteDataResult.isLoading && deleteDataResult.data)
    ) {
      dispatch(
        setAllGlobalKey({
          ...state,
          showFormModal: false,
          request: new ApiRequest.SearchTransaction(),
          user: {
            ...state.user,
            showAddUserModal: false,
          },
          terminal: {
            ...state.terminal,
            showCreateModal: false,
          },
          transactionRouting: {
            showAddNewRuleModal: false
          }
        }),
      )
    }
  }, [
    deleteDataResult.data,
    deleteDataResult.isLoading,
    dispatch,
    postDataResult.data,
    postDataResult.isLoading,
    updateDataResult.data,
    updateDataResult.isLoading,
  ])

  useEffect(() => {
    if (
      postDataResult.data?.responseCode === ResponseCode.SUCCESS ||
      updateDataResult.data?.responseCode === ResponseCode.SUCCESS ||
      deleteDataResult.data?.responseCode === ResponseCode.SUCCESS ||
      getDataByPostMethodResult.data?.responseCode === ResponseCode.SUCCESS
    ) {
      Notify(
        "success",
        postDataResult.data?.status ||
          updateDataResult.data?.status ||
          deleteDataResult.data?.status,
        // result.data?.status
      )
    } else {
      Notify(
        "error",
        postDataResult.data?.failureReason ||
          updateDataResult.data?.failureReason ||
          deleteDataResult.data?.failureReason ||
          result.data?.failureReason ||
          getDataByPostMethodResult.data?.failureReason,
      )
    }
  }, [
    deleteDataResult.data?.responseCode,
    deleteDataResult.data?.failureReason,
    postDataResult.data?.responseCode,
    postDataResult.data?.failureReason,
    updateDataResult.data?.responseCode,
    updateDataResult.data?.failureReason,
    // getDataByPostMethodResult.data?.responseCode,
    getDataByPostMethodResult.data?.failureReason,
  ])

  return {
    handleApiMethodController,
    data: result,
    result:
      action === "CREATE"
        ? postDataResult
        : action === "UPDATE"
        ? updateDataResult
        : action === "GET_BY_POST_METHOD"
        ? getDataByPostMethodResult
        : deleteDataResult,
  }
}

export default useApiMethods
