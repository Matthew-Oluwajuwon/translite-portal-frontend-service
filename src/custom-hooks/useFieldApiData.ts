/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import useApiMethods from "./useApiMethods";
import { setGlobalKey } from "../store";
import { apiEndpoints } from "../store/apiEndpoints";

const useFieldApiData = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(state => {
    return state.global
  })
  const { handleApiMethodController, data, result } = useApiMethods();
  
  const fetchSelectFieldData = useCallback(
    (field: string) => {
      switch (field) {
        case "Processor":
          handleApiMethodController(
            state,
            apiEndpoints.processor.getProcessors,
            "READ"
          );
          dispatch(
            setGlobalKey({
                key: "processor",
                value: data?.data?.data?.processorDTOS,
              })
          );
          break;
          case "CardSchemes":
          handleApiMethodController(
            state,
            apiEndpoints.processor.cardSchemes,
            "GET_BY_POST_METHOD"
          );
          dispatch(
            setGlobalKey({
                key: "cardSchemes",
                value: result?.data?.data?.cardSchemes,
              })
          );
          break;
        default:
          break;
      }
      
    },
    [data?.data?.data?.processorDTOS, dispatch],
  )
  
 
   useEffect(() => {
    fetchSelectFieldData(state.selectField as string)
   },
    [fetchSelectFieldData, state.selectField]
  );


  return { fetchSelectFieldData, apiDataLoading: data.isLoading || data.isFetching };
};


export default useFieldApiData;
