import React from "react";
import { MdUpdate } from "react-icons/md";
import { IconContext } from "react-icons/lib";
import "../ExtendedCard/ExtendedCard.css";

export default function ExtendedCard({ pickerTypes }) { 
  return (
    <>
      {pickerTypes.map((d, i) => {
        return (
          <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
            <div style={{ margin: "40px 0px" }}>
              <div className="extended-card ">
                <div style={{ display: "flex" }}>
                  <div style={{ marginTop: -40 }}>
                    <IconContext.Provider
                      value={{ className: "extended-card-icon" }}
                    >
                      <div
                        style={{
                          padding: "1.5rem 2rem",
                          backgroundColor: "#de2668",
                          borderRadius: 3,
                        }}
                      >
                        {d.icon}
                      </div>
                    </IconContext.Provider>
                  </div>
                  <div>
                    <h4
                      style={{
                        marginTop: -10,
                        paddingLeft: 20,
                        fontWeight: "normal",
                      }}
                    >
                      {d.title}
                    </h4>
                  </div>
                </div>
                <div>
                  <h5 style={{ marginTop: 30, fontWeight: "normal" }}>
                    {d.subTitle}
                  </h5>
                </div>
                <div>
                  {d.inputType} 
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
