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
import CloseIcon from '@material-ui/icons/Close';
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const api = new Api();

export default function Book() {
  const [loading, setloading] = useState(true);

  const [book, setbook] = useState();
  const [open, setOpen] = React.useState(false);
  const [exits, setexits] = useState(false);

  const [msg, setmsg] = React.useState(null);
  const [snack, setsnack] = React.useState(false);

  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setsnack(false);
  };

  const columns = [
    "Id",
    "Book Name",
    "Book ISBN",
    "Book Quantity",
    "Book Author",
    "Genre",
    {
      name: "Actions",
      options: {
        filter: false,
        sort: false,
      },
    },
  ];

  const checkBookExits = async (e) => {
    try {
      if (e.target.value.length != 0) {
        const isExits = await api.Calls(`book/exits/${e.target.value}`, "GET");
        // console.log(isExits.data);
        setexits(isExits.data.success);
      }
    } catch (error) {}
  };

  const [trigger, settrigger] = useState(false);

  const handleTrigger = () => {
    settrigger(!trigger);
  };

  function handleChange(evt) {
    const value =
      evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
    setFormData({
      ...formData,
      [evt.target.name]: value,
    });
  }

  const [formData, setFormData] = useState({
    book_name: "",
    book_isbn: "",
    book_quantity: "",
    book_author: "",
    genre_type: "",
  });

  const handleClose = () => {
    setOpen(false);
  };
  const getBook = async () => {
    let changeToarray = [];
    setloading(true);
    try {
      const getbookData = await api.Calls(`book/`, "GET");
      // console.log(countData);
      if (getbookData.data.length > 0) {
        getbookData.data.map((d, i) => {
          changeToarray.push({
            // id:i+1,
            id: d.book_id,
            book_name: d.book_name,
            book_isbn: d.book_isbn,
            book_quantity: d.book_quantity,
            book_author: d.book_author,
            genre: d.genreModel.genre_type,
          });
        });
      }
      let arrayOfArrays =
        changeToarray && changeToarray.map((obj) => Object.values(obj));
      //  changeToarray=[...issuedData.data]
      setbook(arrayOfArrays);
      console.log("arrayOfArrays", arrayOfArrays);
    } catch (error) {
      console.log(error);
    }
    setloading(false);
  };

  useEffect(() => {
    getBook();
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
                Add Book
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
                    rows={book}
                    columns={columns}
                    title="Book"
                  />
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginRight: 20,
                }}
              >
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <DialogTitle id="alert-dialog-title">Add Book</DialogTitle>
                </div>
                <CloseIcon onClick={()=>handleClose()} />
              </div>

              <DialogContent>
                <div autoComplete="off">
                  <TextField
                    style={{ marginTop: 0 }}
                    variant="outlined"
                    required
                    fullWidth
                    id="book_name"
                    label="Book Name"
                    name="book_name"
                    value={formData.book_name}
                    // defaultValue={data && data[1]}
                    // autoComplete="phone"
                    onChange={(e) => {
                      handleChange(e);
                      checkBookExits(e);
                    }}
                  />
                  {exits && (
                    <label style={{ color: Colors.indianRed }}>
                      Book Already Exits
                    </label>
                  )}
                  {!exits && (
                    <TextField
                      style={{ marginTop: 20 }}
                      variant="outlined"
                      required
                      fullWidth
                      id="book_isbn"
                      label="Book ISBN"
                      name="book_isbn"
                      type="number"
                      value={formData.book_isbn}
                      // defaultValue={data && data[2]}
                      // autoComplete="phone"
                      onChange={handleChange}
                    />
                  )}
                  <TextField
                    style={{ marginTop: 20 }}
                    variant="outlined"
                    required
                    fullWidth
                    id="book_quantity"
                    label="Quantity"
                    name="book_quantity"
                    type="number"
                    value={formData.book_quantity}
                    // defaultValue={data && data[3]}
                    // autoComplete="phone"
                    onChange={handleChange}
                  />

                  {!exits && (
                    <>
                      {" "}
                      <TextField
                        style={{ marginTop: 20 }}
                        variant="outlined"
                        required
                        fullWidth
                        id="book_author"
                        label="Author"
                        name="book_author"
                        value={formData.book_author}
                        // defaultValue={data && data[4]}
                        // autoComplete="phone"
                        onChange={handleChange}
                      />
                      <TextField
                        style={{ marginTop: 20 }}
                        variant="outlined"
                        required
                        fullWidth
                        id="genre_type"
                        label="Genre"
                        name="genre_type"
                        value={formData.genre_type}
                        // defaultValue={data && data[5]}
                        // autoComplete="phone"
                        onChange={handleChange}
                      />
                    </>
                  )}
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
                  onClick={async () => {
                    try {
                      if (exits) {
                        if (formData.book_name.length == 0) {
                          setmsg("Book Name is required");
                          setsnack(true);
                        } else if (formData.book_quantity.length == 0) {
                          setmsg("Book Quantity is required");
                          setsnack(true);
                        } else {
                          const data = {
                            book_name: formData.book_name,
                            book_quantity: formData.book_quantity,
                          };
                          const bookUpdate = await api.Calls(
                            `book/quantity`,
                            "PUT",
                            data
                          );
                          if (bookUpdate.status == 200) {
                            handleTrigger();
                            setmsg("Book Updated Successfully");
                            setsnack(true);
                            setexits(false);
                          } else {
                            setmsg(bookUpdate.msg.response.data.message);
                            setsnack(true);
                          }
                        }
                      } else {
                        if (formData.book_name.length == 0) {
                          setmsg("Book Name is required");
                          setsnack(true);
                        } else if (formData.book_isbn.length == 0) {
                          setmsg("Book ISBN is required");
                          setsnack(true);
                        } else if (formData.book_quantity.length == 0) {
                          setmsg("Book Quantity is required");
                          setsnack(true);
                        } else if (formData.book_author.length == 0) {
                          setmsg("Book Author is required");
                          setsnack(true);
                        } else if (formData.genre_type.length == 0) {
                          setmsg("Genre is required");
                          setsnack(true);
                        } else {
                          const addbook = await api.Calls(
                            `book/`,
                            "POST",
                            formData
                          );
                          // console.log(addbook)
                          if (addbook.status == 201) {
                            handleTrigger();
                            setmsg("Book Added Successfully");
                            setsnack(true);
                            setexits(false);
                          } else {
                            setmsg(addbook.msg.response.data.message);
                            setsnack(true);
                          }
                        }
                      }
                      // console.log(formData);
                      setFormData({ book_name: "" });
                      setFormData({ book_isbn: "" });
                      setFormData({ book_quantity: "" });
                      setFormData({ book_author: "" });
                      setFormData({ genre_type: "" });
                      setOpen(false);
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                >
                  Add Book
                </Button>
              </div>
            </Dialog>
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
