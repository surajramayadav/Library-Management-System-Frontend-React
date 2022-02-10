import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Api from "../../../api";
import DataTable from "../../../components/DataTable/DataTable";
import Loading from "../../../components/Loading";

const columns = [
  "Id",
  "Book Name",
  "Book ISBN",
  "Book Quantity",
  "Book Author",
  "Genre",
  // {
  //   name: "Actions",
  //   options: {
  //     filter: false,
  //     sort: false,
  //   },
  // },
];

const api = new Api();

export default function SearchBook() {
  const [book, setbook] = useState([]);
  const [loading, setloading] = useState(true);
  const getBookData = async () => {
    setloading(true);
    try {
      let changeToarray = [];
      const bookData = await api.Calls(`book/`, "GET");
      if (bookData.data.length > 0) {
        bookData.data.map((d, i) => {
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
      console.log(arrayOfArrays);
    } catch (error) {
      console.log(error);
    }
    setloading(false);
  };

  useEffect(() => {
    getBookData();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div style={{ margin: 50 }}>
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
                <DataTable rows={book} columns={columns} title="Search Book" />
              )}
            </Grid>
          </Grid>
        </div>
      )}
    </>
  );
}
