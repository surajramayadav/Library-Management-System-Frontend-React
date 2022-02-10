import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Api from "../../../api";
import DataTable from "../../../components/DataTable/DataTable";
import Loading from "../../../components/Loading";

const api = new Api();

export default function ReturnBook() {
  const login = useSelector((state) => state.login);
  const { userData } = login;

  const [loading, setloading] = useState(true);

  const [issuedData, setissuedData] = useState();

  const columns = [
    "Id",
    "Issued Date",
    "Return Date",
    "Return Status",
    "Book Name",
    "User Name",
    "Admin",
    "Book Id",
    "User Id",
    {
      name: "Actions",
      options: {
        filter: false,
        sort: false,
      },
    },
  ];
  const [trigger, settrigger] = useState(false);

  const handleTrigger = () => {
    settrigger(!trigger);
  };
  const getIssuedBookData = async () => {
    let changeToarray = [];
    setloading(true);
    const issuedData = await api.Calls(`issuedbook/`, "GET");
    if (issuedData.data.length > 0) {
      issuedData.data.map((d, i) => {
        changeToarray.push({
          // id:i+1,
          id: d.issuedbook_id,
          issued_date: d.issued_date,
          return_date: d.return_date,
          return_status: d.return_status,
          book: d.bookModel.book_name,
          user: d.userModel.user_name,
          admin: d.adminModel.admin_username,
          book_id:d.bookModel.book_id,
          user_id:d.userModel.user_id
        });
      });
    }
    let arrayOfArrays =
      changeToarray && changeToarray.map((obj) => Object.values(obj));
    //  changeToarray=[...issuedData.data]
    setissuedData(arrayOfArrays);
    console.log("arrayOfArrays", arrayOfArrays);
    setloading(false);
  };

  useEffect(() => {
    getIssuedBookData();
  }, [trigger]);
  console.log(loading);
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
                <DataTable
                handleTrigger={handleTrigger}
                  rows={issuedData}
                  columns={columns}
                  title="Return Book"
                />
              )}
            </Grid>
          </Grid>
        </div>
      )}
    </>
  );
}
