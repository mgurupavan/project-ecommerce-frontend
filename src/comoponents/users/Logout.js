import React from "react";
import axios from "../../config/config";

const Logout = props => {
  axios
    .delete("/users/logout", {
      headers: {
        "x-auth": localStorage.getItem("token")
      }
    })
    .then(responce => {
      return {
        statusText: "you have successfully logged out",
        localStorage: localStorage.setItem("token", [])
      };
    })
    .catch(err => {
      return { statusText: "something went wrong" };
    });
  return <div />;
};

export default Logout;
