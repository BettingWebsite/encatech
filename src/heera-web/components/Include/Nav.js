/* eslint-disable */
import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import Url from "../configure/configure.js";
import WelcomeModal from "../LoginPage/WelcomeModal";
import RulesModal from "./RulesModal";
import ExposureModal from "./ExposureModal";
const baseUrl = Url.baseUrl;
const messageResponse ="";

class Nav extends Component {
  constructor(props) {
    super(props);
    var accessToken = localStorage.getItem("token");
    this.state = {
      accessToken: accessToken,
      session_id: "",
      username: "",
      balnce: 0,
      exposerAmount: 0,
      user_text: "",
      on_off: "",
      qr_code_data: "",
      show: false,
      show1: false,
      show2: false,
      userBetList: [],
      visible: false,
      
    };
  }
  componentDidMount() {
    this.ModalOpen();
    this.UserBalance();
    this.interval = setInterval(() => {
      this.UserBalance();
    }, 5000);
    this.interval1 = setInterval(() => {
      this.userCurrentInformation();
    }, 15000);

    // Header Message
    let headers = {
      Authorization: "Bearer " + this.state.accessToken,
    };
    axios.get("http://api.encabook999.com:4000/api/get_admin_text_value",  { headers }).then((resp) => {
      messageResponse = resp.data.value.user_text;
      console.log("Message Response" + JSON.stringify(messageResponse));
  
    });
  }
  componentWillUnmount() {
    clearInterval(this.interval);
    clearInterval(this.interval1);
  }
  UserBalance = () => {
    let headers = {
      Authorization: "Bearer " + this.state.accessToken,
    };
    axios.get("http://api.encabook999.com/user_curr_balance/", { headers }).then((resp) => {
      var respNew = resp.data;
      if (respNew.success === true) {
        var balnce =
          respNew.adminlist[0].balance + respNew.adminlist[0].profit_loss;
        var exposerAmount = Math.abs(respNew.adminlist[0].data_new);
        localStorage.setItem("exposerAmount",exposerAmount);
        if (exposerAmount === undefined || exposerAmount === "") {
          exposerAmount = 0;
        }
        
        this.setState({
          balnce: balnce,
          exposerAmount: exposerAmount.toFixed(0),
          username: respNew.adminlist[0].username,
        });
      }
    });
  }

  userCurrentInformation = () => {
    let headers = {
      Authorization: "Bearer " + this.state.accessToken,
    };
    axios.get(baseUrl + "/current", { headers }).then((resp) => {
      if (resp.data.session_id !== undefined) {
        if (resp.data.user_status === "N") {
          window.location.href = "/login";
          return false;
        }
        this.setState({ session_id: resp.data.session_id });
      }
      if (resp.data.qr_code_on_off !== "null") {
        localStorage.setItem("on_off", resp.data.qr_code_on_off);
      }

      localStorage.setItem("qr_code_id", resp.data.qr_code_id);
      this.setState({
        on_off: resp.data.qr_code_on_off,
        qr_code_data: resp.data.qr_code_data,
      });
    });
  }

  ModalOpen = () => {
    if (!localStorage.getItem("show")) {
      this.setState({ show: true });
    }
    localStorage.setItem("show", true);
  };

  ModalClose = () => {
    this.setState({ show: false });
  };
  ModalOpen1 = () => {
    this.setState({ show1: true });
  };

  ModalClose1 = () => {
    this.setState({ show1: false });
  };
  ModalOpen2 = () => {
    this.getbets();
    this.setState({ show2: true });
  };

  ModalClose2 = () => {
    this.setState({ show2: false });
  };
  getbets = () => {
    let headers = {
      Authorization: "Bearer " + this.state.accessToken,
    };
    axios.get("http://api.encabook999.com/userbetslist/", { headers }).then((resp) => {
      this.setState({ userBetList: resp.data && resp.data.bet_record ? resp.data.bet_record : null });
    });
  }

 
  render() {
    var session_id = localStorage.getItem("session_id");
    var qr_code_data = localStorage.getItem("qr_code_data");

    if (this.state.session_id !== undefined && this.state.session_id !== "") {
      if (session_id !== this.state.session_id) {
        localStorage.clear();

        return <Redirect to="/login" />;
      }
    }
    if (qr_code_data === "" || qr_code_data === null) {
      localStorage.clear();

      return <Redirect to="/qr_code" />;
    }
    const { show, show1, userBetList, visible } = this.state;
    return (
      <nav
        className="navbar navbar-expand justify-content-between"
        style={{ height: "80px" }}
      >
        <ul className="navbar-nav d-flex flex-column">
          <li className="nav-item no-arrow search ">
            <img src="/img/hari.png" height="50px" className="ml-1 mt-1" />
          </li>
          <li className="textheera ml-2 re_none">ENCABOOK</li>
        </ul>


        <marquee className="text-white mt-5 font-weight-normal">
          {/* Mixed Martial Arts Advance Bet Started In Our Exchange */}
          {messageResponse}
          </marquee>

        <ul className="navbar-nav ml-auto ml-md-0 right_nav">
          <li className="nav-item no-arrow search" style={{display:"flex"}}>
           {visible? <input
              name="game_keyword"
              placeholder="All Events"
              autocomplete="off"
              type="text"
              className="search-input-show"
            />:''}
            <a href="#">
              <i className="fas fa-search-plus" onClick={() => this.state.visible=!visible} ></i>
            </a>
          </li>
          <li className="no-arrow" style={{ width: "115px" }}>
            <div className="d-flex flex-row text3 text-white">
              <span
                className="font-weight-bold"
                onClick={() => this.ModalOpen1()}
                style={{ cursor: "pointer" }}
              >
                Rules
                </span>
            </div>
            <div className="text3 text-white">
              <span className="re_none">
                Download Apk
                  <i className="fab fa-android text-white ml-1" />
              </span>
            </div>
          </li>
          <li className="no-arrow">
            <div className="d-flex flex-row text3 text-white">
              <span className="re_none  font-weight-normal">Balance:</span>{" "}
              <i className="fas fa-university mr-1 mo_op"></i>
              <span id="u_bal font-weight-bold">
                <b className="text3 ml-1">{this.state.balnce}</b>
              </span>
            </div>
            <div className="d-flex flex-row font-weight-normal text3 text-white" style={{ textDecoration: "underline" }}
              onClick={() => this.ModalOpen2()}>
              Exposure:
                <span id="expose">
                <b className="text3 ml-1"
                  onClick={() => this.ModalOpen2()}>{this.state.exposerAmount}</b>
              </span>
            </div>
          </li>
          <li className="nav-item dropdown no-arrow">
            <a
              className="nav-link dropdown-toggle flright"
              href="#"
              id="userDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span className="font-weight-normal text3 text-white">
                {this.state.username}
                <i className="fas fa-chevron-down fa-fw"></i>
              </span>
            </a>
            <div
              className="dropdown-menu dropdown-menu-right"
              aria-labelledby="userDropdown"
            >
              <Link className="dropdown-item" to="/transactions">
                Account statement
                </Link>
              <a className="dropdown-item" href="/unsetteledbet">
                UnSetteled Bet
                </a>
              <a className="dropdown-item" href="/profitloss">
                Profit Loss
                </a>
              <Link className="dropdown-item" to="/bethistory">
                Bet History
                </Link>

              <a className="dropdown-item" href="/casino_report">
                Casino Report History
                </a>
              <a className="dropdown-item" href="/changebuttonvalue">
                Set Button Values{" "}
              </a>
              <a className="dropdown-item" href="/change_password">
                Change Password
                </a>
              <span className="dropdown-item dpnone">
                Balance
                  <div className="custom-control custom-checkbox dropdown_checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customCheck"
                    name="example1"
                  />
                  <label
                    className="custom-control-label"
                    for="customCheck"
                  ></label>
                </div>
              </span>
              <span className="dropdown-item dpnone" href="#">
                Exposure
                  <div className="custom-control custom-checkbox dropdown_checkbox">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    id="customCheck"
                    name="example1"
                  />
                  <label
                    className="custom-control-label"
                    for="customCheck"
                  ></label>
                </div>
              </span>
              <a className="dropdown-item dpnone" href="#">
                Rules
                </a>
              <hr />
              <Link className="text-danger" to="/logout">
                <i className="fa fa-sign-out fa-fw"></i> Logout
                </Link>
            </div>
          </li>
        </ul>

        <WelcomeModal show={show} ModalClose={() => this.ModalClose()} />

        <RulesModal show={show1} ModalClose={() => this.ModalClose1()} />
        <ExposureModal show={this.state.show2} userBetList={userBetList} ModalClose={() => this.ModalClose2()} />
      </nav>

    );
  }
}

export default Nav;
