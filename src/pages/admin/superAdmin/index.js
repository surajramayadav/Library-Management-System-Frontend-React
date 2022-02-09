import { Button, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Api from "../../../api";
import DataTable from "../../../components/DataTable/DataTable";
import Loading from "../../../components/Loading";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextareaAutosize,
  TextField,
} from "@material-ui/core";
const api = new Api();

export default function SuperAdmin() {
  const [loading, setloading] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [admin, setadmin] = useState();
  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    "Id",
    "Admin Username",
    "Admin Role",
    {
      name: "Actions",
      options: {
        filter: false,
        sort: false,
      },
    },
  ];
  const [formData, setFormData] = useState({
    admin_username: "",
    admin_role: "",
    admin_password:""
    
  });

  function handleChange(evt) {
    const value =
      evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
    setFormData({
      ...formData,
      [evt.target.name]: value,
    });
  }
  const getAdmin = async () => {
    let changeToarray = [];
    setloading(true);
    const getAdminData = await api.Calls(`admin/`, "GET");
    // console.log(countData);
    if (getAdminData.data.length > 0) {
      getAdminData.data.map((d, i) => {
        changeToarray.push({
          // id:i+1,
          id: d.admin_id,
          username: d.admin_username,
          role: d.admin_role,
        });
      });
    }
    let arrayOfArrays =
      changeToarray && changeToarray.map((obj) => Object.values(obj));
    //  changeToarray=[...issuedData.data]
    setadmin(arrayOfArrays);
    console.log("arrayOfArrays", arrayOfArrays);

    setloading(false);
  };

  useEffect(() => {
    getAdmin();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <div style={{ margin: 50 }}>
            <div style={{display:'flex',justifyContent:'flex-end'}}>
              <Button
                style={{ marginTop: 20, marginBottom: 0 }}
                variant="contained"
                color="primary"
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => {
                  
                  setOpen(true);
                }}
              >
                Add Admin
              </Button>
            </div>

            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              style={{
                color: "#000",
                height: "100%",
                marginTop: 5,
              }}
              spacing={5}
            >
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                style={{ height: "inherit" }}
              >
                {!loading && (
                  <DataTable rows={admin} columns={columns} title="Admin" />
                )}
              </Grid>
            </Grid>
          </div>

          <div>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <div style={{ display: "flex", justifyContent: "center" }}>
                <DialogTitle id="alert-dialog-title">Add Admin</DialogTitle>
              </div>

              <DialogContent>
                <div autoComplete="off">
                  <TextField
                    style={{ marginTop: 0 }}
                    variant="outlined"
                    required
                    fullWidth
                    id="admin_username"
                    label="Admin Username"
                    name="admin_username"
                    // defaultValue={data && data[1]}
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
                    // defaultValue={data && data[3]}
                    // autoComplete="phone"
                    onChange={handleChange}
                  />                  <TextField
                    style={{ marginTop: 20 }}
                    variant="outlined"
                    required
                    fullWidth
                    type="password"
                    id="admin_password"
                    label="Admin Password"
                    name="admin_password"
                    // defaultValue={data && data[2]}
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
                  Add Admin
                </Button>
              </div>
            </Dialog>
          </div>
        </div>
      )}
    </>
  );
}
