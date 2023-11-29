/* eslint-disable prettier/prettier */
import React from "react";
import { LoadingOutlined } from "@ant-design/icons";

const LazyLoader: React.FC = () => {
  return (
    <div className="grid place-content-center h-[100svh]">
      <LoadingOutlined spin className="mx-auto text-3xl text-[#4C469B]" />
      <p className="text-center font-medium text-lg mt-5">Loading...</p>
    </div>
  );
};

export default LazyLoader;
