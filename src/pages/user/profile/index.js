import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import * as React from "react";
import { BsFillLockFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import Api from "../../../api";
import { setuserData } from "../../../redux/slice/loginSlice";
import Colors from "../../../utils/styles/colors";


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const api = new Api();
export default function EditProfile() {
  const [msg, setmsg] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const login = useSelector((state) => state.login);
  const { userData } = login;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const [formData, setFormData] = React.useState({
    user_name: userData.user_name,
    user_phone: userData.user_phone,
    user_address: userData.user_address,
  });

  function handleChange(evt) {
    const value =
      evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
    setFormData({
      ...formData,
      [evt.target.name]: value,
    });
  }

  const handleUpdate = async () => {
    try {
      const updatedData = await api.Calls(
        `user/${userData.user_id}`,
        "PUT",
        formData
      );
      if (updatedData.status == 200) {
        setmsg("User Updated Successfully");
        setOpen(true);
        const getUserData = await api.Calls(`user/${userData.user_id}`, "GET");
        if (getUserData.status == 200) {
          dispatch(setuserData(getUserData.data));
        }
      } else {
        setmsg(updatedData.msg.response.data.message);
        setOpen(true);
        console.log(updatedData.msg.response.data.message);
      }
    } catch (error) {}
  };

  return (
    <Container component="main" maxWidth="xs" style={{marginTop:50}}>
      <CssBaseline />
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
        <Typography component="h1" variant="h5" style={{marginTop:20}}>
          Edit Profile
        </Typography>
        <Box noValidate sx={{ mt: 3 }}>
          <TextField
          style={{marginTop:20}}
           variant="outlined"
            autoComplete="given-name"
            name="user_name"
            required
            id="user_name"
            label="Name"
            defaultValue={userData.user_name}
            // autoFocus
            fullWidth
            onChange={handleChange}
          />

          <TextField
           variant="outlined"
            style={{ marginTop: 20 }}
            required
            fullWidth
            id="user_phone"
            label="Phone Number"
            name="user_phone"
            defaultValue={userData.user_phone}
            onChange={handleChange}

            // autoComplete="family-name"
          />

          <Grid item xs={12}>
            <TextField
             variant="outlined"
              style={{ marginTop: 20 }}
              id="user_address"
              label="Address"
              multiline
              fullWidth
              name="user_address"
              rows={4}
              defaultValue={userData.user_address}
              onChange={handleChange}
            />
          </Grid>

          <Button
           variant="contained"
           color="primary"
            type="submit"
            fullWidth
            style={{marginTop:20}}
            sx={{ mt: 3, mb: 2 }}
            onClick={() => handleUpdate()}
          >
            Update
          </Button>
        </Box>
        
      </div>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
          {msg}
        </Alert>
      </Snackbar>
    </Container>
  );
}
