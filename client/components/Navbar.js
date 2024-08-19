import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

const Navbar = (props) => {
  const { handleClick, isLoggedIn, firstName, isAdmin } = props;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = function () {
      if (window.scrollY > 150) setScrolled(true);
      else setScrolled(false);
    };

    window.addEventListener("scroll", onScroll);

    // remove scroll event when component unmount from DOM
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`text-white sticky top-0 z-10 bg-gray-900 opacity-75 tracking-wider ${
        scrolled && "nav-scrolled"
      }`}
    >
      <div className="flex items-center w-full">
        <div className="w-1/3 flex justify-end">
          {/* <img className="w-40 h-28" src={`${REACT_APP_BASE_URL}/logo.png`} /> */}
          <img className="w-40 h-28" src={"https://i.imgur.com/dmKma80.png"} />
        </div>
        <nav
          className="w-full flex justify-center items-center
        "
        >
          {isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <span className="hover:text-gray-300">
                <Link to="/home">Home</Link>
              </span>
              <span className="hover:text-gray-300">
                <Link to={`/about`}>About Us</Link>
              </span>

              {!isAdmin && (
                <span className="hover:text-gray-300">
                  <Link to={`/users/${props.userId}/cart`}>Cart</Link>
                </span>
              )}
              <a className="hover:text-gray-300" href="#" onClick={handleClick}>
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
