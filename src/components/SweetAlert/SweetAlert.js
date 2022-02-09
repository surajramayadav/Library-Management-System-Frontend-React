import React from "react";
import { Button, Modal } from "react-bootstrap";
import "./SweetAlert.css";

export default function SweetAlert({handleClose,show}) { 
  return (
    <>
      <Modal
          onHide={handleClose}
          show={show}
          style={{ marginTop: "33vh", opacity: 1, zIndex: 1000000 }}
        >
          <div>
            <div style={{ textAlign: "center", padding: "5rem 0rem" }}>
              <h3>Here's Message</h3>
              <button
                className="btn"
                style={{
                  backgroundColor: "#e91e63",
                  color: "white",
                  padding: "5px 50px",
                  marginTop: 20,
                }}
                onClick={handleClose}
                type="submit"
              >
                <b>OK</b>
              </button>
            </div>
          </div>
        </Modal>
    </>
  );
}
