import React from "react";
import "./Navbar.css";
import logo from '../../assets/logo.jpeg'
import { useDispatch } from "react-redux";


function Navbar() {
  const dispatch = useDispatch()

  return (
    <>

      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: ".5rem 3rem" }}>
        {/* <img src={logo} alt="Image Not Found" style={{ width: 100, height: 50 }} /> */}
        <h1 style={{textAlign:'center',fontSize:20}}>Library Management System</h1>
        <button className="btn btn-danger btn-sm" onClick={() => {
          // dispatch(setIsLogged({ isLogged: false }));
        }
        }> <span class="glyphicon glyphicon-log-out"></span> Log out</button>
      </div>
    </>
  );
}

export default Navbar;
