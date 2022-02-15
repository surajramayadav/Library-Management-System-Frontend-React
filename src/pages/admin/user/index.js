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
import Colors from "../../../utils/styles/colors";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const api = new Api();
export default function User() {
  const [loading, setloading] = useState(true);
  const [open, setOpen] = React.useState(false);

  const [user, setuser] = useState();

  const [exits, setexits] = useState(false);

  const [trigger, settrigger] = useState(false);

  const classes = useStyles();

  const [openbackdrop, setopenbackdrop] = React.useState(false);

  const handleTrigger = () => {
    settrigger(!trigger);
  };

  const [msg, setmsg] = React.useState(null);
  const [snack, setsnack] = React.useState(false);

  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setsnack(false);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const columns = [
    "Id",
    "User name",
    "Phone Number",
    "Email",
    "Address",
    {
      name: "Actions",
      options: {
        filter: false,
        sort: false,
      },
    },
  ];
  const [formData, setFormData] = useState({
    user_password: "123456",
    user_name: "",
    user_phone: "",
    user_address: "",
    user_email: "",
  });

  function handleChange(evt) {
    const value =
      evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
    setFormData({
      ...formData,
      [evt.target.name]: value,
    });
  }

  const getUser = async () => {
    let changeToarray = [];
    setloading(true);
    try {
      const getUserData = await api.Calls(`user/`, "GET");
      // console.log(countData);
      if (getUserData.data.length > 0) {
        getUserData.data.map((d, i) => {
          changeToarray.push({
            // id:i+1,
            id: d.user_id,
            name: d.user_name,
            phone: d.user_phone,
            email: d.user_email,
            address: d.user_address,
          });
        });
      }
      let arrayOfArrays =
        changeToarray && changeToarray.map((obj) => Object.values(obj));
      //  changeToarray=[...issuedData.data]
      setuser(arrayOfArrays);
      console.log("arrayOfArrays", arrayOfArrays);
    } catch (error) {
      console.log(error);
    }
    setloading(false);
  };

  const checkUserExits = async (e) => {
    try {
      if (e.target.value.length != 0) {
        const isExits = await api.Calls(`user/exits/${e.target.value}`, "GET");
        // console.log(isExits.data);
        setexits(isExits.data.success);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, [trigger]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <div style={{ margin: 50 }}>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
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
                Add User
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
                  <DataTable
                    handleTrigger={handleTrigger}
                    rows={user}
                    columns={columns}
                    title="User"
                  />
                )}
              </Grid>
            </Grid>

            <div>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginRight: 20,
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <DialogTitle id="alert-dialog-title">Add User</DialogTitle>
                  </div>
                  <CloseIcon onClick={() => handleClose()} />
                </div>
                <DialogContent>
                  <div autoComplete="off">
                    <TextField
                      style={{ marginTop: 0 }}
                      variant="outlined"
                      required
                      fullWidth
                      id="user_name"
                      label="User Name"
                      name="user_name"
                      value={formData.user_name}
                      // defaultValue={data && data[1]}
                      // autoComplete="phone"
                      onChange={handleChange}
                    />
                    <TextField
                      style={{ marginTop: 20 }}
                      variant="outlined"
                      required
                      fullWidth
                      id="user_phone"
                      type="number"
                      label="Phone Number"
                      name="user_phone"
                      value={formData.user_phone}
                      // defaultValue={data && data[3]}
                      // autoComplete="phone"
                      onChange={(e) => {
                        handleChange(e);
                        checkUserExits(e);
                      }}
                    />
                    {exits && (
                      <label style={{ color: Colors.indianRed }}>
                        Phone Number Already Exits
                      </label>
                    )}
                    <TextField
                      style={{ marginTop: 20 }}
                      variant="outlined"
                      required
                      fullWidth
                      id="user_address"
                      label="Address"
                      name="user_address"
                      value={formData.user_address}
                      // defaultValue={data && data[3]}
                      // autoComplete="phone"
                      onChange={handleChange}
                    />

                    <TextField
                      style={{ marginTop: 20 }}
                      variant="outlined"
                      required
                      fullWidth
                      id="user_email"
                      label="Email"
                      name="user_email"
                      value={formData.user_email}
                      // defaultValue={data && data[3]}
                      // autoComplete="phone"
                      onChange={handleChange}
                    />
                    {/* <TextField
                      style={{ marginTop: 20 }}
                      variant="outlined"
                      required
                      fullWidth
                      type="password"
                      id="user_password"
                      label="User Password"
                      name="user_password"
                      value={formData.user_password}
                      // defaultValue={data && data[3]}
                      // autoComplete="phone"
                      onChange={handleChange}
                    /> */}
                  </div>
                </DialogContent>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  {openbackdrop ? (
                    <Button
                      style={{ marginTop: 20, width: "90%", marginBottom: 30 }}
                      variant="contained"
                      color="primary"
                      type="submit"
                      fullWidth
                      variant="contained"
                      // disabled={true}
                      sx={{ mt: 3, mb: 2 }}
                    >
                      <CircularProgress color="white" style={{ padding: 2}} />
                    </Button>
                  ) : (
                    <Button
                      style={{ marginTop: 20, width: "90%", marginBottom: 30 }}
                      variant="contained"
                      color="primary"
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      disabled={exits ? true : false}
                      onClick={async () => {
                        try {
                          setopenbackdrop(true);
                          console.log(formData);
                          if (formData.user_name.length == 0) {
                            setmsg("Username is required");
                            setsnack(true);
                          } else if (formData.user_phone.length == 0) {
                            setmsg("Phone Number is required");
                            setsnack(true);
                          } else if (formData.user_address.length == 0) {
                            setmsg("Address is required");
                            setsnack(true);
                          } else if (formData.user_email.length == 0) {
                            setmsg("Email is required");
                            setsnack(true);
                          } else {
                            console.log(formData);
                            const userAddData = {
                              user_name: formData.user_name,
                              user_phone: formData.user_phone,
                              user_address: formData.user_address,
                              user_email: formData.user_email,
                              user_password: "123456",
                            };
                            const addUser = await api.Calls(
                              `user/`,
                              "POST",
                              userAddData
                            );
                            console.log(addUser);
                            if (addUser.status == 201) {
                              const sendMailData = {
                                user_phone: formData.user_phone,
                                user_email: formData.user_email,
                              };
                              const sendMail = await api.Calls(
                                `user/reset`,
                                "POST",
                                sendMailData
                              );
                              if (sendMail.status == 200) {
                                handleTrigger();
                                setmsg(
                                  "User Successfully Added And Email is Send For Password"
                                );
                                setsnack(true);
                              } else {
                                setmsg(sendMail.msg.response.data.message);
                                setsnack(true);
                              }
                            } else {
                              setmsg(addUser.msg.response.data.message);
                              setsnack(true);
                            }
                            setOpen(false);
                            setFormData({ user_name: "" });
                            setFormData({ user_phone: "" });
                            setFormData({ user_address: "" });
                          }
                          setopenbackdrop(false);
                        } catch (error) {
                          console.log(error);
                          setopenbackdrop(false);
                        }
                      }}
                    >
                      Add User
                    </Button>
                  )}
                </div>
              </Dialog>
            </div>
          </div>
        </div>
      )}
      <Snackbar open={snack} autoHideDuration={2000} onClose={handleSnackClose}>
        <Alert
          onClose={handleSnackClose}
          severity="info"
          sx={{ width: "100%" }}
        >
          {msg}
        </Alert>
      </Snackbar>
    </>
  );
}
