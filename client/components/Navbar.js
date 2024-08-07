import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

const Navbar = (props) => {
  const { handleClick, isLoggedIn, firstName, isAdmin } = props;
  const REACT_APP_BASE_URL = "http://localhost:8080";
  return (
    <div
      className="text-white sticky top-0 z-10 bg-gray-800"
      // style={{ backgroundColor: "#92a143" }}
      // style={{ backgroundColor: "#b0d4c7" }}
    >
      <div className="flex items-center w-full">
        <div className="w-1/3 flex justify-end">
          <img className="w-40 h-28" src={`${REACT_APP_BASE_URL}/logo.png`} />
        </div>
        <nav
          className="w-full flex justify-center items-center
        "
        >
          {isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <Link to="/home">Home</Link>
              <Link to={`/about`}>About Us</Link>
              {!isAdmin && <Link to={`/users/${props.userId}/cart`}>Cart</Link>}
              <a href="#" onClick={handleClick}>
                Logout
              </a>
            </div>
          ) : (
            <div>
              {/* The navbar will show these links before you log in */}
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
          )}
        </nav>
        <div className="w-1/3">
          {isLoggedIn ? `Welcome, ${firstName}!` : ""}
        </div>
      </div>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    userId: state.auth.id,
    firstName: state.auth.firstName,
    isAdmin: state.auth.isAdmin,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
