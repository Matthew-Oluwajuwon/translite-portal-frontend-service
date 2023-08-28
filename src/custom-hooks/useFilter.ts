/* eslint-disable prettier/prettier */
import SearchDatatable from "@common/utils/searchDatatable";
import { useCallback } from "react";
import { setAllGlobalKey } from "../store";
import { useAppDispatch, useAppSelector } from "../store/hooks";

export const useFilter = (
 
) => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => {
    return state.global;
  });
  
  const onChangeSearch = useCallback(
    async (value: string) => {
      let originalData = state.originalResponse as any;
      let data = await SearchDatatable.Search(
        originalData ?? [],
        value,
      );
      const dataSource = data?.map((x: any, index: any) => ({
        ...x,
        key: index + 1,
      }));
      dispatch(
        setAllGlobalKey({
          ...state,
          response: dataSource,
        })
      );
    },
    [dispatch, state]
  );

  return { onChangeSearch };
};
