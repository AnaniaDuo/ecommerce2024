import React, { useState } from "react";
import { connect } from "react-redux";
import { authenticate } from "../store";
import Button from "./reusableComponents/Button";
import { validateSignupForm } from "./utilities";
import ErrorMessage from "./reusableComponents/ErrorMessage";

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const { name, displayName, handleSubmit } = props;
  const [formError, setFormError] = useState({});

  async function handleSubmitFunc(e) {
    e.preventDefault();
    const result = await handleSubmit(e, name);
    if (result?.type === "error") {
      setFormError(result.error);
    }
    if (result?.auth?.error) {
      setFormError({ error: result?.auth?.error?.response?.data });
    }
  }

  return (
    <div className="auth-form">
      <div
        className="absolute inset-0  h-full w-full bg-cover bg-center z-0"
        style={{
          backgroundImage:
            'url("https://images.squarespace-cdn.com/content/v1/61e8bb2a2cf8670534839093/520b65a3-2fc1-4851-8513-f1b46cc3938a/image1.jpg")',
        }}
      ></div>
      <form
        onSubmit={handleSubmitFunc}
        name={name}
        className="absolute inset-0 flex flex-col items-center justify-center h-full text-xl"
      >
        <div className="mt-24">
          {name === "signup" && (
            <div>
              <div>
                {/* <label
                  htmlFor="firstName"
                  className="block mb-2  font-medium text-gray-900 "
                >
                  <small>First Name</small>
                </label> */}
                <input
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
                <ErrorMessage message={formError?.firstName} />
              </div>
              <div>
                {/* <label
                  htmlFor="lastName"
                  className="block mb-2  font-medium text-gray-900 "
                >
                  <small>Last Name</small>
                </label> */}
                <input
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
                <ErrorMessage message={formError?.lastName} />
              </div>
              <div>
                {/* <label
                  htmlFor="email"
                  className="block mb-2  font-medium text-gray-900 "
                >
                  <small>Email</small>
                </label> */}
                <input
                  name="email"
                  type="text"
                  placeholder="Email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
                <ErrorMessage message={formError?.email} />
              </div>
            </div>
          )}
          <div>
            {/* <label
              htmlFor="username"
              className="block mb-2  font-medium text-gray-900 "
            >
              <small>Username</small>
            </label> */}
            <input
              name="username"
              type="text"
              placeholder="Username"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            <ErrorMessage message={formError?.username} />
          </div>
          <div>
            {/* <label
              htmlFor="password"
              className="block mb-2 font-medium text-gray-900 "
            >
              <small>Password</small>
            </label> */}
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            <ErrorMessage message={formError?.password} />
          </div>
          {formError?.error && <ErrorMessage message={formError.error} />}
          <div className="w-full flex justify-center">
            <Button text={displayName} addedStyle="mt-4" />
          </div>
        </div>
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
  };
};

const mapSignup = (state) => {
  return {
    name: "signup",
    displayName: "Sign Up",
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt, method) {
      evt.preventDefault();
      const target = evt.target;
      const formName = target.name;
      const username = target.username.value;
      const password = target.password.value;
      const firstName = target?.firstName?.value;
      const lastName = target?.lastName?.value;
      const email = target?.email?.value;
      const error = validateSignupForm(
        {
          firstName,
          lastName,
          email,
          username,
          password,
        },
        method
      );
      if (Object.keys(error).length !== 0) {
        return { type: "error", error: error };
      }

      return dispatch(
        authenticate(username, password, formName, firstName, lastName, email)
      );
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
