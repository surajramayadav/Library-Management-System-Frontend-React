import React, { useState } from "react";
import { useAsyncDebounce } from "react-table";

export const GlobalFilter = ({ filter, setFilter }) => {
  const [value, setValue] = useState(filter);
  const onChange = useAsyncDebounce((value) => {
    setFilter(value || undefined);
  }, 1000);
  return (
    <span>
      <span style={{ fontWeight: "bold", fontSize: "19px" }}></span> {" "}
      <input
        value={value || ""}
        placeholder="Search records"
        style={{borderTop:"0",borderRight:"0",borderLeft:"0" ,backgroundColor:"inherit",padding:"1rem",float:"right"}}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
      />
    </span>
  );
};
