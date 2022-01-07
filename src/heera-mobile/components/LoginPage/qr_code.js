import React, { Component } from "react";
var axios = require("axios");
import { Redirect } from "react-router-dom";
import Url from "../configure/configure.js";
import "./LoginPage.css";
const { detect } = require("detect-browser");
const browser = detect();
const baseUrl = Url.baseUrl;
var speakeasy = require("speakeasy");
var QRCode = require("qrcode");

var secret = speakeasy.generateSecret({
  name: "Diamond Exchange",
  issuer: "diamondexchange",
  length: 30,
});
// var token = speakeasy.totp({
// 	secret: secret.base32,
// 	encoding: 'base32',
//   });

// Get the data URL of the authenticator URL

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      respStatus: "",
      respMessage: "",
      gotoindex: false,
      qr_code_id: "",
      error: "",
      browser_name: "",
      version: "",
      os: "",
      ip_address: "",
    };
  }
  componentDidMount() {
    if (browser) {
      var browser_name = browser.name;
      var version = browser.version;
      var os = browser.os;
      this.setState({ browser_name: browser_name, version: version, os: os });
    }
    axios.get("https://api.ipify.org/?format=json").then((resp) => {
      this.setState({ ip_address: resp.data.ip });
    });
    //localStorage.clear();
    let headers = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    axios
      .get(baseUrl + "/update_qrcode/" + secret.base32, { headers })
      .then((resp) => {
        this.setState({ qr_code_id: resp.data.qr_code_id });
      });

    axios.get(baseUrl + "/current", { headers }).then((resp) => {
      if (resp.data.qr_code_id != undefined) {
        this.setState({ qr_code_id: resp.data.qr_code_id });
      }
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let loginData = {
      code: this.state.code,
    };

    var tokenValidates = speakeasy.totp.verify({
      secret: this.state.qr_code_id,
      encoding: "base32",
      token: this.state.code,
      window: 6,
    });
    if (tokenValidates === true) {
      let headers = {
        Authorization: "Bearer " + localStorage.getItem("token"),
      };
      localStorage.setItem("qr_code_data", 1);
      window.location.href = "/matches/cricket";
    } else {
      this.setState({ error: "Please Enter Valid Code" });
    }
  };

  handleChange = (event) => {
    let { name, value } = event.target;
    this.setState({ [name]: value });
  };

  responseHtml = () => {
    if (this.state.error != "") {
      return <div className="alert alert-danger">{this.state.error}</div>;
    }
  };
  render() {
    var accessToken = localStorage.getItem("token");

    if (
      accessToken === "" ||
      accessToken === null ||
      accessToken === undefined
    ) {
      return <Redirect to="/login" />;
    }
    var data = "";
    if (secret.base32 == this.state.qr_code_id) {
      QRCode.toDataURL(secret.otpauth_url, function (err, data_url) {
        data = '<img src="' + data_url + '">';
      });
    }

    return (
      <div className="loginman">
        <div className="container">
          <div className="card card-login mx-auto mmt-12 border-none">
            <img class="login_logo" src="/img/logo.gif" />
            <div className="card-header-1">
              Login <i className="fas fa-hand-point-down"></i>
            </div>
            <span style={{ color: "red", padding: "0px 70px " }}>
              {this.state.respMessage}
            </span>
            <div className="card-body">
              <form className="form loginform" onSubmit={this.handleSubmit}>
                {this.responseHtml()}
                <div className="form-group">
                  <div className="form-label-group">
                    <center>
                      <div dangerouslySetInnerHTML={{ __html: data }} />
                    </center>
                  </div>
                </div>
                <div className="form-group">
                  <div className="form-label-group">
                    <input
                      type="text"
                      id="inputEmail"
                      onChange={this.handleChange}
                      name="code"
                      className="form-control"
                      value={this.state.code}
                      placeholder="code"
                      required="required"
                    />
                    <i className="fas fa-user"></i>
                  </div>
                </div>

                <div className="form-group form-label-group">
                  <button type="submit" className="btn man_btn width-100">
                    Login <i className=" ml-2 fas fa-sign-in-alt"></i>
                  </button>
                </div>
                <div className="m-t-20 text-center download-apk">
                  <a href="#" className=" btn man_btn width-100">
                    <span className="newlacunch-menu">
                      <i className="fab fa-android"></i>
                      <b>Download Apk</b>{" "}
                    </span>
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;
