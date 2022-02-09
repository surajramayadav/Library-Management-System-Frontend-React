import React, { Component, useState } from "react";
import MUIDataTable from "mui-datatables";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { GrEdit } from "react-icons/gr";
import { AiOutlineDelete } from "react-icons/ai";
import ClearIcon from "@material-ui/icons/Clear";
import EditIcon from "@material-ui/icons/Edit";
import "./DataTable.css";
import { IconContext } from "react-icons/lib";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextareaAutosize,
  TextField,
} from "@material-ui/core";
import { setadminData } from "../../redux/slice/loginSlice";

let classes = {};

const options = {
  filterType: "textField",
  responsive: "scroll",
};

export default function DataTable({ rows, columns, title }) {
  let state = {};
  const [open, setOpen] = React.useState(false);
  const [data, setdata] = useState();
  const [formData, setFormData] = useState({
    admin_username: "",
    admin_role: "",
  });

  const [userData, setUserData] = useState({
    user_name: "",
    user_phone: "",
    user_address: "",
  });

  // console.log("data", data);
  const handleClickOpen = (data) => {
    switch (title) {
      case "Admin":
        setdata(data);
        setOpen(true);
        break;
      case "User":
        setdata(data);
        setOpen(true);
        break;

      default:
        break;
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleChange(evt) {
    const value =
      evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
    switch (title) {
      case "Admin":
        setFormData({
          ...formData,
          [evt.target.name]: value,
        });
        break;
      case "User":
        setUserData({
          ...formData,
          [evt.target.name]: value,
        });
        break;
      default:
        break;
    }
  }

  React.useEffect(() => {
    if (data) {
      switch (title) {
        case "Admin":
          setFormData({
            admin_username: data && data[1],
            admin_role: data && data[2],
          });
          break;
        case "User":
          setUserData({
            user_name: data && data[1],
            user_phone: data && data[2],
            user_address: data && data[3],
          });
          break;
        default:
          break;
      }
    }
  }, [open]);
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
                  onClick={() => handleClickOpen(d)}
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
                    switch (title) {
                      case "Admin":
                        console.log(d[0]);
                        break;
                      case "User":
                        console.log(d[0]);
                        break;

                      default:
                        break;
                    }
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
            </Grid>,
          ];
          // console.log(f);
          return f;
        })}
        columns={columns}
        options={options}
      />

      {title == "User" && (
        <div>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <div style={{ display: "flex", justifyContent: "center" }}>
              <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            </div>

            <DialogContent>
              <div className={classes.root} autoComplete="off">
                <TextField
                  style={{ marginTop: 0 }}
                  variant="outlined"
                  required
                  fullWidth
                  id="admin_username"
                  label="Admin Username"
                  name="admin_username"
                  defaultValue={data && data[1]}
                  // autoComplete="phone"
                  onChange={handleChange}
                />
                <TextField
                  style={{ marginTop: 20 }}
                  variant="outlined"
                  required
                  fullWidth
                  id="user_phone"
                  label="Phone Number"
                  name="user_phone"
                  defaultValue={data && data[2]}
                  // autoComplete="phone"
                  onChange={handleChange}
                />
                <TextField
                  style={{ marginTop: 20 }}
                  variant="outlined"
                  required
                  fullWidth
                  id="user_address"
                  label="Address"
                  name="user_address"
                  defaultValue={data && data[3]}
                  // autoComplete="phone"
                  onChange={handleChange}
                />
              </div>
            </DialogContent>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                style={{ marginTop: 20, width: "90%", marginBottom: 30 }}
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => {
                  console.log(userData);
                  setOpen(false);
                }}
              >
                Update {title}
              </Button>
            </div>
          </Dialog>
        </div>
      )}

      {title == "Admin" && (
        <div>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <div style={{ display: "flex", justifyContent: "center" }}>
              <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            </div>

            <DialogContent>
              <div className={classes.root} autoComplete="off">
                <TextField
                  style={{ marginTop: 0 }}
                  variant="outlined"
                  required
                  fullWidth
                  id="user_name"
                  label="Name"
                  name="user_name"
                  defaultValue={data && data[1]}
                  // autoComplete="phone"
                  onChange={handleChange}
                />
                <TextField
                  style={{ marginTop: 20 }}
                  variant="outlined"
                  required
                  fullWidth
                  id="admin_role"
                  label="Admin Role"
                  name="admin_role"
                  defaultValue={data && data[2]}
                  // autoComplete="phone"
                  onChange={handleChange}
                />
              </div>
            </DialogContent>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                style={{ marginTop: 20, width: "90%", marginBottom: 30 }}
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => {
                  console.log(formData);
                  setOpen(false);
                }}
              >
                Update {title}
              </Button>
            </div>
          </Dialog>
        </div>
      )}
    </div>
  );
}
