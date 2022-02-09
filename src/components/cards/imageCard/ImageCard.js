import React from "react";
import { GoGraph } from "react-icons/go";
import { AiFillPieChart } from "react-icons/ai";
import { GiProgression } from "react-icons/gi";
import { ImLocation2 } from "react-icons/im";

export default function ImageCard({
  imageSrc,
  title,
  desc,
  leftFooter,
  rightFooter,
  textAlign,
}) {
  return (
    <>
      <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
        <div
          class="card"
          style={{
            padding: "20px 15px 0px 15px",
            boxShadow: "0 1px 4px 0 rgb(0 0 0 / 14%)",
            borderRadius: 5,
            backgroundColor: "white",
            margin : "4rem 0rem"
          }}
        >
          <div style={{ marginTop: -60 }}>
            <img
              class="card-img-top"
              src={imageSrc}
              alt="Card image cap"
              width="100%"
              style={{
                borderRadius: 5,
              }}
            />
          </div>
          <div class="card-body">
            <div style={{ padding: "10px 0px", textAlign:  textAlign  }}>
              <h4 class="card-title">{title}</h4>
              <p>{desc}</p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                borderTop: "1px solid #eeeeee",
                padding: "10px 0px",
              }}
            >
              <h6>{leftFooter}</h6>
              <h6>{rightFooter}</h6>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
