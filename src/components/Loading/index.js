import React from "react";
import ReactLoading from "react-loading";
export default function Loading() {
  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "40vh" }}
    >
      <ReactLoading
        type="bubbles"
        color="#4169E1"
        height={"20%"}
        width={"10%"}
      />
    </div>
  );
}
