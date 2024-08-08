import React from "react";
import { connect } from "react-redux";
import { authenticate } from "../store";
import Button from "./reusableComponents/Button";

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;

  return (
    <div>
      <div
        className="absolute inset-0 opacity-50 h-full w-full bg-cover bg-center z-0"
        style={{
          backgroundImage:
            'url("https://images.squarespace-cdn.com/content/v1/61e8bb2a2cf8670534839093/520b65a3-2fc1-4851-8513-f1b46cc3938a/image1.jpg")',
        }}
      ></div>
      <form
        onSubmit={handleSubmit}
        name={name}
        className="absolute inset-0 flex flex-col items-center justify-center h-full text-xl"
      >
        {name === "signup" && (
          <div>
            <div>
              <label
                htmlFor="firstName"
                className="block mb-2  font-medium text-gray-900 "
              >
                <small>First Name</small>
              </label>
              <input
                name="firstName"
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block mb-2  font-medium text-gray-900 "
              >
                <small>Last Name</small>
              </label>
              <input
                name="lastName"
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2  font-medium text-gray-900 "
              >
                <small>Email</small>
              </label>
              <input
                name="email"
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
          </div>
        )}
        <div>
          <label
            htmlFor="username"
            className="block mb-2  font-medium text-gray-900 "
          >
            <small>Username</small>
          </label>
          <input
            name="username"
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-2 font-medium text-gray-900 "
          >
            <small>Password</small>
          </label>
          <input
            name="password"
            type="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>

        <Button text={displayName} addedStyle="mt-4" />
        {error && error.response ? (
          <div className="text-red-700"> {error.response.data} </div>
        ) : (
          <div className="invisible">Good</div>
        )}
      </form>
    </div>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: "login",
    displayName: "Login",
    error: state.auth.error,
  };
};

const mapSignup = (state) => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const target = evt.target;
      const formName = target.name;
      const username = target.username.value;
      const password = target.password.value;
      const firstName = target?.firstName?.value;
      const lastName = target?.lastName?.value;
      const email = target?.email?.value;
      dispatch(
        authenticate(username, password, formName, firstName, lastName, email)
      );
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
