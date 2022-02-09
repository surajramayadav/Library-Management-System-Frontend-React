import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Api from "../../../api";
import DataTable from "../../../components/DataTable/DataTable";
import Loading from "../../../components/Loading";

const api = new Api();

export default function SuperAdmin() {
  const [loading, setloading] = useState(true);

  const [admin, setadmin] = useState();

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
                <DataTable rows={admin} columns={columns} title="Admin" />
              )}
            </Grid>
          </Grid>
        </div>
      )}
    </>
  );
}
