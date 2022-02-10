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

const api = new Api();

export default function Book() {
  const [loading, setloading] = useState(true);

  const [book, setbook] = useState();
  const [open, setOpen] = React.useState(false);
  const [exits, setexits] = useState(false);

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
              <div style={{ display: "flex", justifyContent: "center" }}>
                <DialogTitle id="alert-dialog-title">Add Book</DialogTitle>
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
                          alert("Book Updated Successfully");
                          setexits(false);
                        } else {
                          alert(bookUpdate.msg.response.data.message);
                        }
                      } else {
                        const addbook = await api.Calls(
                          `book/`,
                          "POST",
                          formData
                        );
                        // console.log(addbook)
                        if (addbook.status == 201) {
                          handleTrigger();
                          alert("Book Added Successfully");
                          setexits(false);
                        } else {
                          alert(addbook.msg.response.data.message);
                        }
                      }
                      // console.log(formData);
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
    </>
  );
}
