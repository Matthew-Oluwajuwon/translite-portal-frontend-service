/* eslint-disable prettier/prettier */
import { Spin, Table } from "antd";
import React from "react";
import { PageProps } from "../../model/application/props";
// import { setAllAppState } from "../../store";
// import { useAppDispatch, useAppSelector } from "../../store/hooks";

export const PageTable: React.FC<PageProps.TableData> = ({
    column,
    dataSource,
    loading,
    onPagination,
    pageSize,
    total,
    shouldExpand
}) => {
    // const dispatch = useAppDispatch()
    // const state = useAppSelector(state => state.app)
    const onRowSelect = (rowIndex: number, record: any) => {
        // const tableElement = ref.current?.querySelector("table");
        // const tbodyElement = tableElement?.querySelector("tbody");
        // const elementsWithClass = tbodyElement?.querySelectorAll("tr");
        // elementsWithClass?.forEach((element: any) => {
        //     element.classList.remove("bg-[#86b893]");
        // });
        // const tr = tbodyElement?.children[rowIndex + 1];
        // tr?.classList?.add("bg-[#86b893]");

        // dispatch(
        //     setAllAppState({
        //         ...state,
        //         expand: shouldExpand ? true : false,
        //         record
        //     })
        // );
    };
    return (
        <Spin spinning={loading}>
            <Table
                columns={column}
                dataSource={dataSource}
                pagination={{
                    position: ["bottomRight"],
                    // itemRender,
                    onChange: onPagination,
                    showSizeChanger: false,
                    total: total,
                    pageSize: pageSize,
                }}
                scroll={{x: 1000}}
                onRow={(record: any, rowIndex: number | undefined) => {
                    return {
                        onClick: async (event) => {
                            onRowSelect(rowIndex as number, record);
                        },
                    };
                }}
            />
        </Spin>
    );
};
