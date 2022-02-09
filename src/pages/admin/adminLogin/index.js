import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Snackbar from "@material-ui/core/Snackbar";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import MuiAlert from "@material-ui/lab/Alert";
import * as React from "react";
import { BsFillLockFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import Api from "../../../api";
import {
  setadminData,
  setadminLogin,
  setuserData,
  setuserLogin,
} from "../../../redux/slice/loginSlice";
import Colors from "../../../utils/styles/colors";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit">Library Management System</Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const api = new Api();
export default function AdminLogin() {
  const login = useSelector((state) => state.login);

  const history = useHistory();
  const dispatch = useDispatch();

  const [msg, setmsg] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const [formData, setFormData] = React.useState({
    admin_username: "",
    admin_password: "",
  });

  function handleChange(evt) {
    const value =
      evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
    setFormData({
      ...formData,
      [evt.target.name]: value,
    });
  }

  const handleLogin = async () => {
    try {
      const loginData = await api.Calls("admin/login", "POST", formData);
      if (loginData.status == 200) {
        dispatch(setuserLogin(false));
        dispatch(setadminLogin(true));
        dispatch(setadminData(loginData.data));
        history.push("/admin/home");
      } else {
        setmsg(loginData.msg.response.data.message);
        setOpen(true);
        console.log(loginData.msg.response.data.message);
      }
    } catch (error) {}
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: 50 }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: 50,
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
          <Typography component="h1" variant="h5">
            Admin Login
          </Typography>
        </div>
        <Box sx={{ mt: 1 }} style={{ marginTop: 20 }}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="admin_username"
            label="Username"
            name="admin_username"
            // autoComplete="phone"
            onChange={handleChange}
          />
          <TextField
            style={{ marginTop: 20 }}
            variant="outlined"
            required
            fullWidth
            name="admin_password"
            label="Password"
            type="password"
            id="admin_password"
            // autoComplete="new-password"
            onChange={handleChange}
          />

          <Button
            style={{ marginTop: 20 }}
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => handleLogin()}
          >
            Sign In
          </Button>

          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 5 }} >
            <Link href="/" variant="body2">
              if you are User ? Sign in
            </Link>
          </div>
        </Box>
      </div>
      <Copyright sx={{ mt: 8, mb: 4 }} />
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {msg}
        </Alert>
      </Snackbar>
    </Container>
  );
}
