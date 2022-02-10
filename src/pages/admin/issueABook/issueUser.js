import { Button, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Api from "../../../api";
import DataTable from "../../../components/DataTable/DataTable";
import Loading from "../../../components/Loading";

const api = new Api();

export default function IssueUser() {
  const [loading, setloading] = useState(true);

  const [user, setuser] = useState();

  const columns = [
    "Id",
    "User name",
    "Phone Number",
    "Address",
    {
      name: "Actions",
      options: {
        filter: false,
        sort: false,
      },
    },
  ];

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

  useEffect(() => {
    getUser();
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
                <DataTable rows={user} columns={columns} title="Select User" />
              )}
            </Grid>
          </Grid>
        </div>
      )}
    </>
  );
}
