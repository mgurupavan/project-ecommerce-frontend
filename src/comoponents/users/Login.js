// import React, { Component } from "react";
// import axios from "../../config/config";
// import { Redirect } from "react-router-dom";
// class Login extends Component {
//   constructor() {
//     super();
//     this.state = {
//       email: "",
//       password: "",
//       redirectCategories: false,
//       emailError: "",
//       passwordError: ""
//     };
//     //this.passwordHandle.bind(this);
//   }
//   emailHandle = e => {
//     const email = e.target.value;
//     this.setState(() => ({ email }));
//   };
//   passwordHandle = e => {
//     e.persist(); //when ever u read diractely in setState use event.persist() must
//     this.setState(() => ({ password: e.target.value }));
//   };

//   //valdition
//   validate = () => {
//     let isError = false;
//     const errors = {
//       emailError: "",
//       passwordError: ""
//     };

//     if (this.state.email.indexOf("@") === -1) {
//       isError = true;
//       errors.emailError = "please provide valid email id";
//     }
//     if (!this.state.password) {
//       isError = true;
//       errors.passwordError = "please enter password";
//     }

//     this.setState({
//       ...this.state,
//       ...errors
//     });
//     return isError;
//   };

//   handleSubmit = e => {
//     e.preventDefault();
//     const err = this.validate();
//     if (!err) {
//       this.setState({
//         email: "",
//         password: "",
//         emailError: "",
//         passwordError: ""
//       });
//     }
//     const formData = {
//       email: this.state.email,
//       password: this.state.password,
//       redirectCategories: false
//     };
//     axios
//       .post("/users/login", formData)
//       .then(responce => {
//         this.setState(() => ({
//           //   email: "",
//           //   password: "",
//           //   redirectCategories: true
//         }));
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   };
//   render() {
//     // console.log(this.state);
//     if (this.state.redirectCategories) {
//       // return <Redirect to="/categories" />;
//     }
//     return (
//       <div>
//         <h3>Login</h3>
//         <form onSubmit={this.handleSubmit}>
//           <label>
//             Email:
//             <input
//               type="text"
//               name="email"
//               value={this.state.email}
//               onChange={this.emailHandle}
//               // required
//               autoFocus
//               placeholder="write your name"
//               // pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$"
//               title="example@example.com"
//             />
//           </label>
//           <p>{this.state.emailError}</p>
//           <br />
//           <label>
//             Password:
//             <input
//               type="password"
//               name="password"
//               value={this.state.password}
//               onChange={this.passwordHandle}
//               //required
//               placeholder="write your password"
//             />
//           </label>
//           <p>{this.state.passwordError}</p>
//           <br />

//           <input type="submit" onSubmit={this.handleSubmit} />
//         </form>
//       </div>
//     );
//   }
// }

// export default Login;

import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "../../config/config";

const LoginPage = ({ values, errors, touched }) => (
  <Form>
    <div>
      {touched.email && errors.email && <p>{errors.email}</p>}
      <Field type="email" name="email" placeholder="email" />
    </div>
    <div>
      {touched.password && errors.password && <p>{errors.password}</p>}
      <Field type="password" name="password" placeholder="password" />
    </div>

    <button>Submit</button>
  </Form>
);

const Login = withFormik({
  mapPropsToValues({ email, password }) {
    return {
      email: email || "",
      password: password || ""
    };
  },
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email("Please provide Valid Email")
      .required("Please provide Email"),
    password: Yup.string()
      .min(8, "Password must be 8 characters")
      .required("Please provide password")
  }),
  handleSubmit(values, { resetForm }) {
    console.log(values);
    axios
      .post("/users/login", values)
      .then(response => {
        console.log(response.data);
        localStorage.setItem("token", response.data);
        resetForm({
          email: "",
          password: ""
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
})(LoginPage);

export default Login;
