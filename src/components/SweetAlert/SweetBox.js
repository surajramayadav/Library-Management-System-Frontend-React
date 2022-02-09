import React, { useState } from "react";
import { Alert, Button, Modal } from "react-bootstrap"; 
import SweetAlert from "./SweetAlert";
import "./SweetBox.css";

export default function SweetBox({ alertTrigger }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {show && (
        <SweetAlert handleClose={handleClose}  show={show}/>
      )}
      {alertTrigger.map((d, i) => {
        return (
          <>
            <div className="col-md-3">
              <div style={{ margin: "5rem 1rem" }}>
                <div
                  class="card text-center"
                  style={{
                    boxShadow: "0 1px 4px 0 rgb(0 0 0 / 14%)",
                    padding: "3rem 3rem",
                    margin: 0,
                    backgroundColor: "white",
                  }}
                >
                  <div class="card-body">
                    <h4 class="card-title">{d.title}</h4>
                    <button
                      className="btn"
                      style={{
                        backgroundColor: "#e91e63",
                        color: "white",
                        padding: "5px 50px",
                        marginTop: 20,
                      }}
                      onClick={handleShow}
                      type="submit"
                    >
                      <b>{d.buttonText}</b>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
}
