import React, { useMemo } from "react";

// import { useDispatch, useSelector } from "react-redux";
// import { getAllCase } from "../../../redux/Slice/caseSlice";

import {
  // useFilters,
  useGlobalFilter,
  useSortBy,
  useTable,
  usePagination,
} from "react-table";
// import { format } from "date-fns";
import "./Table.css";
import { GlobalFilter } from "./components/GlobalFilter";
// import { useSelector } from "react-redux";

const Table = ({ data, column, error, loading,tableCss }) => {
  const columns = useMemo(() => column, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    // rows,
    prepareRow,
    state,
    setGlobalFilter,
    page,
    gotoPage,
    pageCount,
    pageOptions,
    setPageSize,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
  } = useTable(
    {
      columns,
      data: data,
      initialState: { pageIndex: 0 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { globalFilter, pageIndex, pageSize } = state;
console.log(tableCss);
  return (
    <>
      <></>
      {loading ? (
        <h1>Loading ...</h1>
      ) : error ? (
        <h1>{error.message}</h1>
      ) : (
        <>
          <div style={{ padding: "1rem" }}>
          <select
                style={{ width: "120px" ,borderLeft:"0",borderTop:"0",borderRight:"0",padding:"1rem",float:"left",backgroundColor:"inherit"}}
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
              >
                {[10, 25, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize} 
                  </option>
                ))}
              </select> 
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
            <br />
            <br />
            <table {...getTableProps()} className="content-table" >
              <thead>
                {headerGroups.map((headerGroup) => {
                  return (
                    <tr {...headerGroup.getHeaderGroupProps} style={tableCss.tableHeaderStyle}>
                      {headerGroup.headers.map((column) => {
                        return (
                          <th
                            {...column.getHeaderProps(
                              column.getSortByToggleProps()
                            )}
                          >
                            {column.render("Header")}
                            <span>
                              {column.isSorted
                                ? column.isSortedDesc
                                  ? " 🔽"
                                  : " 🔼"
                                : ""}
                            </span>
                          </th>
                        );
                      })}
                    </tr>
                  );
                })}
              </thead>
              <tbody {...getTableBodyProps()}>
                <>
                  {data && data.length > 0 ? (
                    <>
                      {" "}
                      {page.map((row) => {
                        prepareRow(row);
                        return (
                          <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                              return (
                                <td {...cell.getCellProps()}>
                                  {cell.render("Cell")}
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}{" "}
                    </>
                  ) : (
                    <tr>
                      <td>Empty data</td>
                    </tr>
                  )}
                </>
              </tbody>
            </table>
            <br />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div className="row" style={{padding:"2rem"}}> 
              <span>
                Page{" "}
                <strong>
                  {pageIndex + 1} of {pageOptions.length}
                </strong>{" "}
              </span>
              <span>
                | Go to page:{" "}
                <input
                  type="number"
                  defaultValue={pageIndex + 1}
                  onChange={(e) => {
                    const pageNumber = e.target.value
                      ? Number(e.target.value) - 1
                      : 0;
                    gotoPage(pageNumber);
                  }}
                  style={{ width: "50px" }}
                />
              </span>{" "}
              </div>
              &nbsp; &nbsp; &nbsp;
              {/* <select
                style={{ width: "120px" }}
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
              >
                {[10, 25, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select> */}
              &nbsp; &nbsp; &nbsp;
              {/* <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                {"<<"}
              </button>{" "}
              <button
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                Previous
              </button>{" "}
              <button onClick={() => nextPage()} disabled={!canNextPage}>
                Next
              </button>{" "}
              <button
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
              >
                {">>"}
              </button>{" "} */}
              <div className="but-content" style={{float:"right", }}>
            <ul class="pagination pagination-info"> 
              <li>
                <a href="javascript:void(0);"> prev</a>
              </li>
              <li>
                <a href="javascript:void(0);">1</a>
              </li>
              <li>
                <a href="javascript:void(0);">2</a>
              </li>
              <li class="active">
                <a href="javascript:void(0);">3</a>
              </li>
              <li>
                <a href="javascript:void(0);">4</a>
              </li>
              <li>
                <a href="javascript:void(0);">5</a>
              </li>
              <li>
                <a href="javascript:void(0);">next </a>
              </li>
            </ul>
          </div>
            </div>
          </div>
        </>
      )}
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  );
};

export default Table;
