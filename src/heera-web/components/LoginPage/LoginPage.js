import React, { Component } from "react";
var axios = require("axios");
import { Redirect } from "react-router-dom";
import Url from "../configure/configure.js";
const { detect } = require("detect-browser");
const browser = detect();
const baseUrl = Url.baseUrl;
import { Card } from "react-bootstrap";
class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      respStatus: "",
      respMessage: "",
      gotoindex: false,
      browser_name: "",
      version: "",
      os: "",
      ip_address: "",
      isLoading: false,
      isLoader: true,
    };
  }
  componentDidMount() {
    localStorage.clear();
    localStorage.removeItem('cricket', 'soccer', 'tennis')
    if (browser) {
      var browser_name = browser.name;
      var version = browser.version;
      var os = browser.os;
      this.setState({ browser_name: browser_name, version: version, os: os });
    }
    setInterval(() => {
      this.setState({ isLoader: false });
    }, 3000);

    axios.get("https://api.ipify.org/?format=json").then((resp) => {
      this.setState({ ip_address: resp.data.ip });
    });
  }

  goToIndex = () => {
    if (this.state.gotoindex === true) {
      return <Redirect to="/matches/cricket" />;
    }
  };
  handleSubmit = (event) => {
    this.setState({ isLoading: true });
    event.preventDefault();
    let loginData = {
      email: this.state.email,
      password: this.state.password,
    };

    axios.post(baseUrl + "/login", loginData).then((resp) => {

      if (resp.data.success === false) {
        this.setState({
          respStatus: false,
          respMessage: resp.data.message,
          isLoading: false,
        });
        setTimeout(() => {
          this.setState({ respStatus: "", gotoindex: false, isLoading: false });
        }, 10000);
      } else {
        if (resp.data.message.user_status === "Y") {
          if (resp.data.message.userType === 6) {
            if (
              resp.data.message.hash_new === undefined ||
              resp.data.message.hash_new === ""
            ) {
              localStorage.setItem("token", resp.data.message.token);
              localStorage.setItem("user_id", resp.data.message._id);
              localStorage.setItem("session_id", resp.data.session_id);
              localStorage.setItem("popup", 1);
              localStorage.setItem("qr_code_data", 1);
              let registerData = {
                browser_name: this.state.browser_name,
                version: this.state.version,
                os: this.state.os,
                ip_address: this.state.ip_address,
              };
              let headers = {
                Authorization: "Bearer " + localStorage.getItem("token"),
              };

              axios
                .post(baseUrl + "/update_browser_details", registerData, {
                  headers,
                })
                .then((resp) => {
                  console.log(resp);

                  //var resp = resp.data;
                });

              window.location.href = "/matches/cricket";
              return false;
            } else {
              localStorage.setItem("token", resp.data.message.token);
              localStorage.setItem("user_id", resp.data.message._id);
              localStorage.setItem("user_Type", resp.data.message.userType);
              localStorage.setItem("session_id", resp.data.session_id);
              localStorage.setItem("change_password", 1);
              window.location.href = "/change_password";
              return false;
            }
          } else {
            this.setState({
              respMessage: "Invalid Username And Password",
              respStatus: false,
              isLoading: false,
            });
          }
        } else {
          this.setState({
            respStatus: false,
            respMessage: "Something went wrong Please Contact upline",
            isLoading: false,
          });
          return false;
          window.location.href = "/login";
        }
      }
    });
  };

  handleChange = (event) => {
    let { name, value } = event.target;
    this.setState({ [name]: value });
  };

  responseHtml = () => {
    if (this.state.respStatus === false) {
      return <div className="alert alert-danger">{this.state.respMessage}</div>;
    } else if (this.state.respStatus === true) {
      return (
        <div className="alert alert-success">{this.state.respMessage}</div>
      );
    }
  };
  render() {
    var htmllogo1 = <img className="login_logo" src="/img/hari.png" />;
    const { show, isLoader } = this.state;
    return (
      <div className="loginman">
        {isLoader ? (
          <div className="d-flex flex-column justify-content-center align-items-center h-100 d-inline-block">
            <span className="d-flex flex-column">
              <img src="/img/hari.png" height={55} width={75} />

              <h6 className="text-white text-center textheera">ENCABOOK</h6>
            </span>
            <i
              className="fa fa-spinner fa-spin fa-2x fa-fw text-white mt-3"
              aria-hidden="true"
            ></i>
          </div>
        ) : (
          <div className="d-flex flex-column justify-content-center align-items-center px-4">
            <span className="d-flex flex-column align-items-center mt-5">
              <img src="/img/hari.png" className="" height={55} width={75} />

              <h6 className="text-white text-center textheera">ENCABOOK</h6>
            </span>
            <Card style={{ minheight: "280px", width: "300px" }} className="d-flex flex-column align-items-center mt-2">
              <form
                className="form align-items-center"
                onSubmit={this.handleSubmit}
                className="px-3"
              >
                <div className="card-header-1">
                  Login <i className="fas fa-hand-point-down"></i>
                </div>
                <div className="form-group mt-1">
                  <div className="form-label-group">
                    <input
                      type="text"
                      id="inputEmail"
                      onChange={this.handleChange}
                      name="email"
                      className="form-control"
                      value={this.state.email}
                      placeholder="User Name"
                      required="required"
                    />
                    <i className="fas fa-user"></i>
                  </div>
                </div>
                <div className="form-group">
                  <div className="form-label-group">
                    <input
                      type="password"
                      id="inputPassword"
                      onChange={this.handleChange}
                      value={this.state.password}
                      className="form-control"
                      placeholder="Password"
                      name="password"
                      required="required"
                    />
                    <i className="fas fa-key"></i>
                  </div>
                </div>
                {this.goToIndex()}
                {this.responseHtml()}
                <div className="form-group form-label-group">
                  <button type="submit" className="btn man_btn width-100 mt-1">
                    Login
                    {this.state.isLoading ? (
                      <i
                        className="fa fa-spinner fa-spin fa-fw text-white"
                        aria-hidden="true"
                      ></i>
                    ) : (
                      <i className="fas fa-sign-in-alt"></i>
                    )}
                  </button>
                </div>

                <div className="mttext">
                  This site is protected by reCAPTCHA and the Google
                  <a
                    href="https://policies.google.com/privacy"
                    className="text-primary nav-item"
                  >
                    {" "}
                    Privacy Policy{" "}
                  </a>
                  and{" "}
                  <a
                    href="https://policies.google.com/terms"
                    className="text-primary nav-item"
                  >
                    Terms of Service apply.
                  </a>
                </div>
                <div className="form-group form-label-group mt-1">
                  <button className="btn man_btn width-100 mb-2">
                    <span className="newlacunch-menu"> Download APK
                    <i className="fab fa-android text-white newlacunch-menu" /></span>
                  </button>
                </div>
              </form>
            </Card>
          </div>
        )}
      </div>
    );
  }
}

export default LoginPage;
