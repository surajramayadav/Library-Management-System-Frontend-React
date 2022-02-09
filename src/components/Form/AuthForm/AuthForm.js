import React from "react";
import { IconContext } from "react-icons";
import { GiProgression } from "react-icons/gi";
import FormikContainer from "../FormikContainer";

export default function AuthForm({
  TotalFields,
  onSubmit,
  authFormWidth = "col-md-6",
}) {
  console.log(TotalFields);
  return (
    <>
      <div className={authFormWidth}>
        <div className="card-box">
          <div style={{ display: "flex" }}>
            <div style={{ marginTop: "-50px" }}>
              <IconContext.Provider value={{ className: "form-icon" }}>
                <div
                  style={{
                    padding: 15,
                    backgroundColor: "#e91e63",
                    borderRadius: 3,
                  }}
                >
                  {TotalFields.icon}
                </div>
              </IconContext.Provider>
            </div>
            <h4>{TotalFields.title}</h4>
          </div>
          <div className="row">
            <FormikContainer inputData={TotalFields} onSubmit={onSubmit} />
            <div className="col-md-12" style={{ textAlign: "center" }}>
              <button
                className="btn"
                style={{
                  backgroundColor: "#e91e63",
                  color: "white",
                  padding: "5px 50px",
                  marginTop: 20,
                }}
                type="submit"
              >
                <b>{TotalFields.buttonText}</b>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
