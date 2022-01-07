/* eslint-disable */
import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import Url from "../configure/configure.js";
import WelcomeModal from "../LoginPage/WelcomeModal";
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
      userBetList: [],
      show2: false,
    };
  }
  componentDidMount() {
    this.ModalOpen();
    this.UserBalance()
    this.interval = setInterval(() => {
      this.UserBalance();
    }, 5000);
    this.interval1 = setInterval(() => {
      this.userCurrentInformation();
    }, 10000);

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
    axios
      .get("http://api.encabook999.com/user_curr_balance/", { headers })
      .then((resp) => {
        var respNew = resp.data;
        if (respNew.success === true) {
          var balnce =
            respNew.adminlist[0].balance + respNew.adminlist[0].profit_loss;
          var exposerAmount = Math.abs(respNew.adminlist[0].data_new);
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
  };

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
  };

  ModalOpen = () => {
    if (!localStorage.getItem("show")) {
      this.setState({ show: true });
    }
    localStorage.setItem("show", true);
  };

  ModalClose = () => {
    this.setState({ show: false });
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
      this.setState({
        userBetList:
          resp.data && resp.data.bet_record ? resp.data.bet_record : null,
      });
    });
  };

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
    const { show, userBetList, show2 } = this.state;

    return (
      <div className="bg">
        <div
          className="navbar navbar-expand desktop-hide mob-show d-flex justify-content-between"
          style={{ height: "100px" }}
        >
          <div className="d-flex flex-row mt-3">
            <div>
              <a className="" href="/matches/cricket">
                <span className="text-white">
                  <i className="fas fa-home text-center mt-5 fa-lg"></i>
                </span>
              </a>
            </div>

            <div className="d-flex flex-column justify-content-end">
              <span className="">
                <img
                  src="/img/hari.png"
                  height="65"
                  width="85"
                  className="mt-1"
                />
              </span>
              <span className="heera text-center">ENCABOOK</span>
            </div>
          </div>
          <div>
            <ul className="navbar-nav ulTop">
              <div className="d-flex flex-row justify-content-end text-white text-right w-100 mt-1">
                <span className="textE flot-right text-white">
                  <i className="fas fa-university" />
                  <b> {this.state.balnce}</b>
                </span>
              </div>{" "}
              <span className="d-flex flex-row">
                {/* <span className="lineBottom text-white pt-1 textE" onClick={() => this.ModalOpen2()}>
                Exp:
                {this.state.exposerAmount}  </span> */}
                <small className="text-white textE mt-2" onClick={() => this.ModalOpen2()}>
                  <span className="ml-1 lineBottom" onClick={() => this.ModalOpen2()}>
                    Exp:
                    {this.state.exposerAmount}
                  </span>
                </small>

                <span className="nav-item dropdown no-arrow mb-1">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="userDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <div className="d-flex flex-column text-white">
                      <small className="text-white textE">
                        <span className="lineBottom">
                          {" "}
                          {this.state.username}
                        </span>
                        <i className="fa fa-caret-down text-white ml-1"></i>
                      </small>
                    </div>
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

                    <Link className="dropdown-item dpnone" to="/casino_report">
                      Casino Report History
                    </Link>
                    <a className="dropdown-item" href="/changebuttonvalue">
                      Set Button Values{" "}
                    </a>
                    <a className="dropdown-item dpnone" href="/change_password">
                      Change Password
                    </a>

                    <hr />
                    <Link className="text-danger" to="/logout">
                      <i className="fa fa-sign-out fa-fw"></i> Logout
                    </Link>
                  </div>
                </span>
              </span>
            </ul>

            <WelcomeModal show={show} ModalClose={() => this.ModalClose()} />
            <ExposureModal
              show={this.state.show2}
              userBetList={userBetList}
              ModalClose={() => this.ModalClose2()}
            />
          </div>
        </div>
        <div className="d-flex flex-row">
          <span className="ml-2 dot rounded-circle text-center mb-1">
            <i class="fas fa-search mt-2" />
          </span>{" "}
          <marquee className="text-white pt-1">
            {/* <small className="text-white"> Welcome to our Exchange </small> */}
            {messageResponse}
          </marquee>
        </div>
      </div>
    );
  }
}

export default Nav;
