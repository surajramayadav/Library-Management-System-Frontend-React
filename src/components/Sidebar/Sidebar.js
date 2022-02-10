import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { BiMenu, BiMenuAltLeft, BiBorderOuter } from "react-icons/bi";
import { MdDashboard } from "react-icons/md";
import { HiTemplate } from "react-icons/hi";
import { FaShippingFast } from "react-icons/fa";
import { ImPriceTags } from "react-icons/im";
import { GrStackOverflow } from "react-icons/gr";
import { RiShoppingBasketFill } from "react-icons/ri";

import React from "react";

import "./Sidebar.css";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setadminData,
  setadminLogin,
  setuserData,
  setuserLogin,
} from "../../redux/slice/loginSlice";

const Sidebar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [toggleSidebar, setToggleSidebar] = React.useState(false);

  const handleClick = () => {
    setToggleSidebar(!toggleSidebar);
  };

  const login = useSelector((state) => state.login);
  const { userLogin, adminLogin, adminData } = login;
  return (
    <ProSidebar collapsed={toggleSidebar}>
      <Menu iconShape="square">
        <MenuItem
          iconShape={"round"}
          onClick={() => handleClick()}
          icon={toggleSidebar ? <BiMenu /> : <BiMenuAltLeft />}
        >
          <div style={{ padding: "0.5rem" }}>
            <h1 style={{ color: "#fff" }}>LMS </h1>
          </div>
        </MenuItem>

        {userLogin ? (
          <>
            <MenuItem
              onClick={() => history.push("/user/home")}
              iconShape="circle"
              icon={<MdDashboard />}
            >
              Issued Book
            </MenuItem>
            <MenuItem
              onClick={() => history.push("/user/search-book")}
              iconShape="round"
              icon={<GrStackOverflow />}
            >
              Search Book
            </MenuItem>

            <SubMenu title="Edit Profile" icon={<GrStackOverflow />}>
              <MenuItem
                onClick={() => history.push("/user/profile")}
                iconShape="round"
                // icon={<HiDocumentText />}
              >
                Edit Information
              </MenuItem>

              <MenuItem
                onClick={() => history.push("/user/profile/change-password")}
                iconShape="round"
                // icon={<HiDocumentText />}
              >
                Change Password
              </MenuItem>
            </SubMenu>
          </>
        ) : (
          <>
            <MenuItem
              onClick={() => history.push("/admin/home")}
              iconShape="circle"
              icon={<MdDashboard />}
            >
              Dashboard
            </MenuItem>
            <MenuItem
              onClick={() => history.push("/admin/issue")}
              iconShape="circle"
              icon={<MdDashboard />}
            >
              Issue A Book
            </MenuItem>
            <MenuItem
              onClick={() => history.push("/admin/issue/return")}
              iconShape="circle"
              icon={<MdDashboard />}
            >
              Return Book
            </MenuItem>
            {adminData.admin_role == "super" && (
              <MenuItem
                onClick={() => history.push("/admin/super")}
                iconShape="circle"
                icon={<MdDashboard />}
              >
                Admin
              </MenuItem>
            )}
            <MenuItem
              onClick={() => history.push("/admin/user")}
              iconShape="circle"
              icon={<MdDashboard />}
            >
              User
            </MenuItem>
            <MenuItem
              onClick={() => history.push("/admin/book")}
              iconShape="circle"
              icon={<MdDashboard />}
            >
              Book
            </MenuItem>

            <MenuItem
              onClick={() => history.push("/admin/change-password")}
              iconShape="circle"
              icon={<MdDashboard />}
            >
              Change Password
            </MenuItem>
          </>
        )}

        <MenuItem
          onClick={() => {
            if (userLogin) {
              history.push("/");
            } else {
              history.push("/admin");
            }
            dispatch(setuserLogin(false));
            dispatch(setadminLogin(false));
            dispatch(setuserData([]));
            dispatch(setadminData([]));
          }}
          iconShape="circle"
          icon={<MdDashboard />}
        >
          Logout
        </MenuItem>
      </Menu>
    </ProSidebar>
  );
};

export default Sidebar;
