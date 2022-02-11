import React, { useEffect } from "react";
import { IconContext } from "react-icons";
import { FaUserFriends } from "react-icons/fa";
import { GoGraph } from "react-icons/go";
import { AiFillPieChart } from "react-icons/ai";
import { GiProgression } from "react-icons/gi";
import { GrUserAdmin } from "react-icons/gr";
import { ImLocation2 } from "react-icons/im";
import IconCard from "../../../components/cards/iconCard/IconCard";
import ImageCard from "../../../components/cards/imageCard/ImageCard";
import Colors from "../../../utils/styles/colors";
import { useState } from "react";
import Api from "../../../api";
import Loading from "../../../components/Loading";
import { Grid } from "@material-ui/core";
import DataTable from "../../../components/DataTable/DataTable";

const api = new Api();

export default function Dashboard() {
  const [loading, setloading] = useState(true);

  const [returnBook, setreturnBook] = useState();

  const [countGenre, setcountGenre] = useState();

  const [userCount, setuserCount] = useState();

  const [adminCount, setadminCount] = useState();

  const [bookCount, setbookCount] = useState();

  const [issuedCount, setissuedCount] = useState();

  const columns = ["Id", "Genre", "Count"];
  const columns1 = ["Id", "Book", "User"];

  const getcountGenreByBook = async () => {
    let changeToarray = [];
    setloading(true);
    try {
      const countData = await api.Calls(`report/count`, "GET");
      console.log(countData);
      if (countData.data.length > 0) {
        countData.data.map((d, i) => {
          changeToarray.push({
            // id:i+1,
            id: i + 1,
            genre: d.genre_type,
            count: d.count,
          });
        });
      }
      let arrayOfArrays =
        changeToarray && changeToarray.map((obj) => Object.values(obj));
      //  changeToarray=[...issuedData.data]
      setcountGenre(arrayOfArrays);
      console.log("arrayOfArrays", arrayOfArrays);

      const returnToday = await api.Calls(`report/today`, "GET");
      let changeToarray1 = [];
      if (returnToday.data.length > 0) {
        returnToday.data.map((d, i) => {
          changeToarray1.push({
            // id:i+1,
            id: i + 1,
            book: d.book_name,
            user: d.user_name,
          });
        });
      }
      let arrayOfArrays1 =
        changeToarray1 && changeToarray1.map((obj) => Object.values(obj));
      //  changeToarray=[...issuedData.data]
      setreturnBook(arrayOfArrays1);
      console.log(arrayOfArrays1);

      const user = await api.Calls(`user/`, "GET");
      setuserCount(user.data.length);
      const admin = await api.Calls(`admin/`, "GET");
      setadminCount(admin.data.length);
      const book = await api.Calls(`book/`, "GET");
      setbookCount(book.data.length);
      const issued = await api.Calls(`issuedbook/`, "GET");
      setissuedCount(issued.data.length);
    } catch (error) {
      console.log(error);
    }
    setloading(false);
  };

  useEffect(() => {
    getcountGenreByBook();
  }, []);

  const iconCardData = [
    {
      id: 1,
      icon: (
        <>
          <FaUserFriends />
        </>
      ),
      title: "Users",
      count: userCount,
      link: <>{/* Get more details... */}</>,
      bgColor: "#fe9f19",
    },
    {
      id: 2,
      icon: (
        <>
          <GoGraph />
        </>
      ),
      title: "Books",
      count: bookCount,
      link: (
        <>
          {/* <button type="button" class="btn btn-primary">
            Primary
          </button> */}
        </>
      ),
      bgColor: "#de2668",
    },
    {
      id: 3,
      icon: (
        <>
          <GiProgression />
        </>
      ),
      title: "Issued ",
      count: issuedCount,
      link: (
        <>
          {/* <button type="button" class="btn btn-primary">
            Primary
          </button> */}
        </>
      ),
      bgColor: "#60b664",
    },
    {
      id: 4,
      icon: (
        <>
          <AiFillPieChart />
        </>
      ),
      title: "Admin",
      count: adminCount,
      link: (
        <>
          {/* <button type="button" class="btn btn-primary">
            Primary
          </button> */}
        </>
      ),
      bgColor: "#17bcd0",
    },
  ];

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div style={{ backgroundColor: "#eeeeee", padding: "1rem " }}>
          <div class="row">
            {iconCardData.map((d, i) => {
              // console.log(d, i);
              return (
                <>
                  <IconCard
                    icon={d.icon}
                    title={d.title}
                    count={d.count}
                    link={d.link}
                    bgColor={d.bgColor}
                  />
                </>
              );
            })}
          </div>

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
                    rows={countGenre}
                    columns={columns}
                    title="Count Genre By Book"
                  />
                )}
              </Grid>
            </Grid>
          </div>

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
                    rows={returnBook}
                    columns={columns1}
                    title="Book Return Today"
                  />
                )}
              </Grid>
            </Grid>
          </div>
        </div>
      )}
    </>
  );
}
