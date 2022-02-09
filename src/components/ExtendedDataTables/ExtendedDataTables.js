import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { GrEdit } from "react-icons/gr";
import { AiOutlineDelete } from "react-icons/ai";
import ClearIcon from "@material-ui/icons/Clear";
import EditIcon from "@material-ui/icons/Edit";
import axios from "axios";

import "./ExtendedDataTables.css";
import { IconContext } from "react-icons/lib";

// // Choice of filtering view. enum('checkbox', 'dropdown', 'multiselect', 'textField', 'custom')
// // https://codesandbox.io/s/wno91qwk98?file=/index.js

export default function ExtendedDataTables(props) {
  // console.log("ExtendedDataTablesPROPS", props);
  const { navigation } = props;
  const [data, setData] = useState([]);
  // const [editRouteData, setEditRouteData] = useState([]);
  const [apidata, setApiData] = useState([]);
  const [columns, setColumns] = useState([
    "Name",
    {
      name: "Actions",
      options: {
        filter: false,
        sort: false,
      },
    },
  ]);
  const [options, setOptions] = useState({
    filterType: "textField",
    responsive: "scroll",
  });
  const arrayOfArrays = (myData) => {
    const tblData = myData.map((obj) => {
      console.log("objx", obj);
      // let tempData = {};
      // Object.keys(obj).map((item, key) => {
      //   console.log("objx", item, obj[item], columns);
      //   tempData = { ...tempData, [item]: obj.item };
      // });
      return Object.values(obj);
    });
    let finalData = [];
    console.log("tblData", tblData);
    if (tblData) {
      finalData = tblData.map((d) => {
        const f = [
          ...d,
          <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="center"
            style={{
              color: "#000",
              height: "100%",
            }}
            spacing={1}
          >
            <Grid item>
              <Button
                color="primary"
                size="large"
                onClick={() => {
                  console.log("d0", d, props.editRoute);
                  props.navigation.history.push(props.editRoute);
                }}
              >
                <IconContext.Provider>
                  <div
                    style={{
                      padding: "1rem 1rem",
                      backgroundColor: "#4caf50",
                      borderRadius: 3,
                      color: "white",
                    }}
                  >
                    <EditIcon />
                  </div>
                </IconContext.Provider>
              </Button>
            </Grid>
            <Grid item>
              <Button
                color="secondary"
                size="large"
                onClick={() => console.log(d[0])}
              >
                <IconContext.Provider>
                  <div
                    style={{
                      padding: "1rem 1rem",
                      backgroundColor: "#f44335",
                      borderRadius: 3,
                      color: "white",
                    }}
                  >
                    <ClearIcon />
                  </div>
                </IconContext.Provider>
              </Button>
            </Grid>
          </Grid>,
        ];
        return f;
      });
      setData(finalData);
    }
    // return data.map((obj) => Object.values(obj));
  };
  useEffect(() => {
    setOptions(props.options);
    if (props.data) {
      setColumns([
        ...props.cols,
        {
          name: "Actions",
          options: {
            filter: false,
            sort: false,
          },
        },
      ]);
      arrayOfArrays(props.data);
    }
  }, []);
  useEffect(() => {
    setOptions(props.options);
  }, [props.options]);
  useEffect(() => {
    console.log("props. viewApi", props.viewApi, props.apiCol);
    if (!props.data && props.viewApi) {
      axios({
        url: props.viewApi,
        method: props.apiType,
        headers: {
          "Content-Type": "application/json",
          ...props.headers,
          ...props.auth,
        },
        params: { ...props.params },
        data: {},
      }).then(
        (response) => {
          console.log("/request", response.data);
          inflater(response.data.results);
        },
        (error) => {
          console.log({ ...error });
        }
      );
    }
  }, [props.viewApi, props.data]);

  const inflater = (defs) => {
    const apicols = props.cols;
    console.log("viewApiDEFS", defs, apicols, typeof apicols[0]);
    let tempCol = [];
    if (typeof apicols[0] == "string") {
      console.log("yourapicols", apicols);
      setColumns(apicols);
    } else {
      if (typeof apicols == "object") {
        Object.keys(apicols).map((acol) => {
          console.log("viewApi acol", acol, typeof apicols[acol]);
          if (!apicols[acol]) {
            tempCol = [...tempCol, acol];
          }
          if (typeof apicols[acol] == "string") {
            tempCol = [...tempCol, apicols[acol]];
          }
          if (typeof apicols[acol] == "function") {
            const tmpCol = apicols[acol](defs).colName;
            tempCol = [...tempCol, tmpCol];
            console.log("viewApiX", apicols[acol], tempCol);
            // tempCol = [...tempCol, apicols[acol]];
          }
        });
        tempCol = [
          ...tempCol,
          {
            name: "Actions",
            options: {
              filter: false,
              sort: false,
            },
          },
        ];
      }
    }
    console.log("tempCol", tempCol);
    setColumns(tempCol);
    if (typeof defs === "object") {
      const datacols = defs || props.data;
      console.log(
        "defxobject",
        typeof props.cols[0],
        props.cols[0],
        props.cols
      );
      if (typeof props.cols[0] == "string") {
      }
      if (!props.cols[0]) {
        // arrayOfArrays()
        if (typeof props.cols == "object") {
          let actions = (id) => (
            <Grid
              container
              direction="row"
              justify="space-around"
              alignItems="center"
              style={{
                color: "#000",
                height: "100%",
                minWidth: 200,
              }}
              spacing={1}
            >
              <Grid item>
                <Button
                  color="primary"
                  size="large"
                  onClick={() => {
                    console.log("EDIT ", id, props.editRoute);
                    props.navigation.history.push(props.editRoute + "/" + id);
                  }}
                >
                  <IconContext.Provider>
                    <div
                      style={{
                        padding: "1rem 1rem",
                        backgroundColor: "#4caf50",
                        borderRadius: 3,
                        color: "white",
                      }}
                    >
                      <EditIcon />
                    </div>
                  </IconContext.Provider>
                </Button>
              </Grid>
              <Grid item>
                <Button
                  color="secondary"
                  size="large"
                  onClick={() => {
                    console.log("DELETE ", id);
                    if (props.deleteRoute) {
                      props.navigation.history.push(props.deleteRoute);
                    }
                    deleteEntry(id);
                  }}
                >
                  <IconContext.Provider>
                    <div
                      style={{
                        padding: "1rem 1rem",
                        backgroundColor: "#f44335",
                        borderRadius: 3,
                        color: "white",
                      }}
                    >
                      <ClearIcon />
                    </div>
                  </IconContext.Provider>
                </Button>
              </Grid>
            </Grid>
          );
          let tempData = {};
          let tempDataRows = [];
          Object.keys(datacols).map((dk) => {
            console.log("loop dataCols", dk, datacols[0]);

            Object.keys(props.cols).map((item) => {
              let tmpDt = null;
              let tmpKey = item;
              const _id = datacols[dk]._id;
              tmpDt = datacols[dk][item];
              if (typeof props.cols[item] == "string" && tmpDt) {
                tmpKey = props.cols[item];
                tempData = {
                  ...tempData,
                  [tmpKey]: tmpDt,
                  Actions: actions(_id),
                };
              }
              if (!props.cols[item] && tmpDt) {
                tempData = {
                  ...tempData,
                  [tmpKey]: tmpDt,
                  Actions: actions(_id),
                };
              }
              if (typeof props.cols[item] == "function" && tmpDt) {
                let tmpKey2 = props.cols[item];
                console.log(
                  "tmpDt 1",
                  tmpDt,
                  datacols[dk],
                  item,
                  props.cols[item]
                );
                tmpDt = tmpKey2(datacols[dk])["return"];
                tmpKey = tmpKey2(datacols[dk])["colName"];
                console.log("tmpDt 2", tmpDt, item, props.cols[item]);
                tempData = {
                  ...tempData,
                  [tmpKey]: tmpDt,
                  Actions: actions(_id),
                };
              }
            });
            tempDataRows = [...tempDataRows, tempData];
          });

          setData(tempDataRows);

          console.log("loop tempData", tempDataRows);
          // setColumns(Object.keys(props.cols))
        }
      }
    }
    // return false;
  };

  const deleteEntry = (id) => {
    if (id && props.deleteApi) {
      axios({
        url: props.deleteApi + "/" + id,
        method: props.deleteApiType,
        headers: {
          "Content-Type": "application/json",
          ...props.headers,
          ...props.auth,
        },
        params: { ...props.params },
        data: {},
      }).then(
        (response) => {
          console.log("/request", response.data);
          inflater(response.data.results);
        },
        (error) => {
          console.log({ ...error });
        }
      );
    }
  };
  console.log("loop DATA<==>COLS", data, columns);
  return (
    <div style={{ maxWidth: "100%" }}>
      <MUIDataTable
        title={"Employee List"}
        data={data}
        columns={columns}
        options={options}
      />
    </div>
  );
}
