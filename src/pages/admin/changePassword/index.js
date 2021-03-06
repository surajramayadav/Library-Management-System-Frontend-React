import * as React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import Api from "../../../api";
import { useSelector } from "react-redux";
import { BsFillLockFill } from "react-icons/bs";
import Colors from "../../../utils/styles/colors";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const api = new Api();

export default function AdminChangePassword() {
  const [msg, setmsg] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    admin_password: "",
    admin_cpassword: "",
  });
  const login = useSelector((state) => state.login);
  const { adminData } = login;
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  function handleChange(evt) {
    const value =
      evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
    setFormData({
      ...formData,
      [evt.target.name]: value,
    });
  }

  const handleChangePassword = async () => {
    try {
      if(formData.admin_password.length == 0){
        setmsg("Password is required");
        setOpen(true);
      }else{
        if (formData.admin_password != formData.admin_cpassword) {
          setmsg("Password and confirm password not matching");
          setOpen(true);
        } else {
          const updatedData = await api.Calls(
            `admin/password/${adminData.admin_id}`,
            "PUT",
            { admin_password: formData.admin_password }
          );
          if (updatedData.status == 200) {
            setmsg("Password is Updated SuccessFully");
            setOpen(true);
          } else {
            setmsg(updatedData.msg.response.data.message);
            setOpen(true);
          }
        }
      }
     
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: 50 }}>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              borderWidth: 1,
              borderRadius: 50,
              height: 100,
              width: 100,
              backgroundColor: "#646f79",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <BsFillLockFill size={50} color={Colors.white} />
          </div>
        </div>
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 20 }}
        >
          {" "}
          <Typography component="h1" variant="h5">
            Change Password
          </Typography>
        </div>

        <Box noValidate sx={{ mt: 3 }} style={{ marginTop: 20 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                autoComplete="given-name"
                name="admin_password"
                required
                fullWidth
                id="admin_password"
                label="Password"
                type="password"
                value={formData.admin_password}
                onChange={handleChange}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                variant="outlined"
                fullWidth
                id="admin_cpassword"
                label="Confirm Password"
                name="admin_cpassword"
                type="password"
                value={formData.admin_cpassword}
                onChange={handleChange}

                // autoComplete="family-name"
              />
            </Grid>
          </Grid>
          <Button
            style={{ marginTop: 20 }}
            type="submit"
            color="primary"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => handleChangePassword()}
          >
            Change password
          </Button>
        </Box>
      </Box>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
          {msg}
        </Alert>
      </Snackbar>
    </Container>
  );
}
