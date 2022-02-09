import React from "react";
import { IconContext } from "react-icons";
import { FaUserFriends } from "react-icons/fa";
import '../iconCard/IconCard.css'

export default function IconCard({ icon, title, count, link, bgColor }) { 
  return (
    <>
      <div className="col-lg-3 col-md-4 col-sm-12 col-xs-12">
        <div style={{margin : "40px 0px"}}>
          <div
            className="icon-cards"
            style={{
              boxShadow: "0 1px 4px 0 rgb(0 0 0 / 14%)",
              padding: "20px 25px",
              borderRadius: 6,
              backgroundColor : "white"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ marginTop: -40 }}>
                <IconContext.Provider
                  value={{ className: "form-card-icon" }}
                >
                  <div
                    style={{
                      padding: 20,
                      backgroundColor: bgColor,
                      borderRadius: 3,
                    }}
                  >
                    {icon}
                  </div>
                </IconContext.Provider>
              </div>
              <div>
                <h6 style={{ marginTop: 0 }}>{title}</h6>
                <h3 style={{ marginTop: 0, direction: "rtl" }}>{count}</h3>
              </div>
            </div>
            <div style={{ borderTop: "1px solid #eeeeee", minHeight:"1.5rem" }}>{link}</div>
          </div>
        </div>
      </div>
    </>
  );
}
