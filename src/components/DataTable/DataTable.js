import React, { Component } from "react";
import MUIDataTable from "mui-datatables";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { GrEdit } from "react-icons/gr";
import { AiOutlineDelete } from "react-icons/ai";
import ClearIcon from "@material-ui/icons/Clear";
import EditIcon from "@material-ui/icons/Edit";
import "./DataTable.css";
import { IconContext } from "react-icons/lib";

const classes = {};
const styles = {};
// const columns = [
//   "Name",
//   "Company",
//   "City",
//   "State",
//   {
//     name: "Actions",
//     options: {
//       filter: false,
//       sort: false,
//     },
//   },
// ];

// const data = [
//   { name: "Joe James", company: "Test Corp", city: "Yonkers", state: "NY" },
//   { name: "John Walsh", company: "Test Corp", city: "Hartford", state: "CT" },
//   { name: "Bob Herm", company: "Test Corp", city: "Tampa", state: "FL" },
//   { name: "James Houston", company: "Test Corp", city: "Dallas", state: "TX" },
// ];

// let arrayOfArrays = data.map((obj) => Object.values(obj));

// console.log(arrayOfArrays);

const options = {
  filterType: "textField",
  responsive: "scroll",
};

// // Choice of filtering view. enum('checkbox', 'dropdown', 'multiselect', 'textField', 'custom')
// // https://codesandbox.io/s/wno91qwk98?file=/index.js

export default function DataTable({ rows, columns, title }) {
  let state = {};

  return (
    <div style={{ maxWidth: "100%" }}>
      <MUIDataTable
        title={title}
        data={rows.map((d) => {
          // console.log(d);
          const f = [
            ...d,
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              style={{
                color: "#000",
                height: "100%",
              }}
              spacing={5}
            >
              <Grid item>
                <Button
                  color="primary"
                  size="large"
                  onClick={() => console.log(d[0])}
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
          // console.log(f);
          return f;
        })}
        columns={columns}
        options={options}
      />
    </div>
  );
}
