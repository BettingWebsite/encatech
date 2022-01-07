import React, { Component } from "react";
import Nav from "../Include/Nav";
import Menu from "../Include/Menu";
import Footer from "../Include/footer";
import Sidebar from "../Include/Sidebar";
import Url from "../configure/configure.js";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import Moment from "moment";
import NumberFormat from "react-number-format";
import Loading from "react-fullscreen-loading";
import { useClearCache } from "react-clear-cache";
import Timer from "react-compound-timer";
import socketIOClient from "socket.io-client";
import Modal from "react-bootstrap-modal";

var CryptoJS = require("crypto-js");
const ENDPOINT = "http://172.105.40.76:4003";

const $ = window.$;
const baseUrl = Url.baseUrl;
// Third argument is the inner text

class Index extends Component {
  constructor(props) {
    super(props);
    var accessToken = localStorage.getItem("token");
    var user_id = localStorage.getItem("user_id");
    this.state = {
      accessToken: accessToken,
      collapsed: false,
      draw: false,
      getFirstLay: false,
      getSecondBack: false,
      user_id: user_id,
      oddsfirstlay: "",
      matchids: "",
      BatAmount_second: "",
      proFitfirstval: "",
      proFitsecondval: "",
      getFancybet: false,
      getFancySecondbet: false,
      pancypickCall: false,
      stake_amount: "",
      respStatus: "",
      respMessage: "",
      emptyField: false,
      loading: true,
      team_profit1: "",
      team_profit2: "",
      new_array: {},
      stackAmount_team1: "",
      stackAmount_team2: "",
      profit22: "",
      profit_team: "",
      loss_team: "",
      profit12: 0,
      profit13: 0,
      loss: 0,
      maxminBet: "",
      fancyDataFound: false,
      getFancyResults: "",
      betClick1: false,
      headname: "",
      SessInptNo: "",
      no: "",
      yes: "",
      status: "",
      buttonvalue_new: "",
    };
  }

  onFirstLayClick = () => {
    const { getFirstLay } = this.state;
    this.setState(() => ({
      getFirstLay: !getFirstLay,
    }));
  };

  onSecondLayClick = () => {
    const { getSecondBack } = this.state;
    this.setState(() => ({
      getSecondBack: !getSecondBack,
    }));
  };

  currentUserDetail = () => {
    let headers = {
      Authorization: "Bearer " + this.state.accessToken,
    };
    axios.get(baseUrl + "/current", { headers }).then((resp) => {
      var resp = resp.data;
      this.setState({ userData: resp });
    });
  };
  getUserCurrentBalance = () => {
    let headers = {
      Authorization: "Bearer " + this.state.accessToken,
    };
    axios
      .get(baseUrl + "/maxbet_minbet/" + this.props.match.params.id, {
        headers,
      })
      .then((resp) => {
        var resp = resp.data;
        this.setState({ maxminBet: resp });
      });
  };

  getFancybet = () => {
    if (this.state.getFancybet === true) {
      return (
        <tr style={{ background: "#F3DCE2" }}>
          <td className="text-center">
            <a href="#" className="text-danger">
              {" "}
              <i className="fa fa-times"></i>{" "}
            </a>
          </td>
          <td id="team_nm">{this.state.teamname1}</td>
          <td style={{ width: "75px" }}>
            <div className="form-group">
              <input
                value={this.state.amountFancybetBal}
                name="amountFancybetBal"
                className="amountint"
                onChange={this.handleChange}
                type="number"
                style={{
                  float: "left",
                  width: "45px",
                  verticalAlign: "middle",
                }}
                id="odds"
                readOnly
                required="required"
              />
            </div>
          </td>
          <td>
            <div className="form-group bet-stake">
              <input
                value={this.state.amountFancybetFirst}
                name="amountFancybetFirst"
                type="text"
                onChange={this.handleChange}
                id="btn_val"
                style={{ width: "52px" }}
                maxLength="10"
                required="required"
              />
            </div>
          </td>{" "}
        </tr>
      );
    }
  };
  getFancybetPoint = () => {
    if (this.state.getFancybet === true) {
      return (
        <tr style={{ background: "#F3DCE2" }}>
          <td colSpan="5" style={{ padding: "5px" }} className="value-buttons">
            <button
              className="btn btn-success btn_dyn"
              value="4"
              onClick={(e) => this.onTestClickFancyFirst(e)}
            >
              4
            </button>
            <button
              className="btn btn-success btn_dyn"
              value="20"
              onClick={(e) => this.onTestClickFancyFirst(e)}
            >
              20
            </button>
            <button
              className="btn btn-success btn_dyn"
              value="30"
              onClick={(e) => this.onTestClickFancyFirst(e)}
            >
              30
            </button>
            <button
              className="btn btn-success btn_dyn"
              value="50"
              onClick={(e) => this.onTestClickFancyFirst(e)}
            >
              50
            </button>
            <button
              className="btn btn-success btn_dyn"
              value="500"
              onClick={(e) => this.onTestClickFancyFirst(e)}
            >
              500
            </button>
            <button
              className="btn btn-success btn_dyn"
              value="1000"
              onClick={(e) => this.onTestClickFancyFirst(e)}
            >
              1000
            </button>
          </td>
        </tr>
      );
    }
  };

  getFirstLayPoint = () => {
    if (this.state.getFirstLay === true) {
      return (
        <tr style={{ background: "#F3DCE2" }}>
          <td colSpan="5" style={{ padding: "5px" }} className="value-buttons">
            <button
              className="btn btn-success btn_dyn"
              value="4"
              onClick={(e) => this.onTestClick(e)}
            >
              4
            </button>
            <button
              className="btn btn-success btn_dyn"
              value="20"
              onClick={(e) => this.onTestClick(e)}
            >
              20
            </button>
            <button
              className="btn btn-success btn_dyn"
              value="30"
              onClick={(e) => this.onTestClick(e)}
            >
              30
            </button>
            <button
              className="btn btn-success btn_dyn"
              value="50"
              onClick={(e) => this.onTestClick(e)}
            >
              50
            </button>
            <button
              className="btn btn-success btn_dyn"
              value="500"
              onClick={(e) => this.onTestClick(e)}
            >
              500
            </button>
            <button
              className="btn btn-success btn_dyn"
              value="1000"
              onClick={(e) => this.onTestClick(e)}
            >
              1000
            </button>
          </td>
        </tr>
      );
    }
  };
  // getFirstLayLiability = () => {

  // 	if (this.state.getFirstLay === true) {

  // 		return (<tr style={{ background: "#F3DCE2" }}>
  // 			<td></td><td></td><td></td><td>Liability</td>
  // 			<td> {this.state.proFitfirstval}</td></tr>);
  // 	}
  // }
  getSecondLayPoint = () => {
    if (this.state.getSecondBack === true) {
      return (
        <tr style={{ background: "#BEDDF4" }}>
          <td colSpan="5" style={{ padding: "5px" }} className="value-buttons">
            <button
              className="btn btn-success btn_dyn"
              value="4"
              onClick={(e) => this.onTestClickSecond(e)}
            >
              4
            </button>
            <button
              className="btn btn-success btn_dyn"
              value="20"
              onClick={(e) => this.onTestClickSecond(e)}
            >
              20
            </button>
            <button
              className="btn btn-success btn_dyn"
              value="30"
              onClick={(e) => this.onTestClickSecond(e)}
            >
              30
            </button>
            <button
              className="btn btn-success btn_dyn"
              value="50"
              onClick={(e) => this.onTestClickSecond(e)}
            >
              50
            </button>
            <button
              className="btn btn-success btn_dyn"
              value="500"
              onClick={(e) => this.onTestClickSecond(e)}
            >
              500
            </button>
            <button
              className="btn btn-success btn_dyn"
              value="1000"
              onClick={(e) => this.onTestClickSecond(e)}
            >
              1000
            </button>
          </td>
        </tr>
      );
    }
  };
  getSecondFancybetPoint = () => {
    if (this.state.getFancySecondbet === true) {
      return (
        <tr style={{ background: "#BEDDF4" }}>
          <td colSpan="5" style={{ padding: "5px" }} className="value-buttons">
            <button
              className="btn btn-success btn_dyn"
              value="4"
              onClick={(e) => this.onTestClickFancySecond(e)}
            >
              4
            </button>
            <button
              className="btn btn-success btn_dyn"
              value="20"
              onClick={(e) => this.onTestClickFancySecond(e)}
            >
              20
            </button>
            <button
              className="btn btn-success btn_dyn"
              value="30"
              onClick={(e) => this.onTestClickFancySecond(e)}
            >
              30
            </button>
            <button
              className="btn btn-success btn_dyn"
              value="50"
              onClick={(e) => this.onTestClickFancySecond(e)}
            >
              50
            </button>
            <button
              className="btn btn-success btn_dyn"
              value="500"
              onClick={(e) => this.onTestClickFancySecond(e)}
            >
              500
            </button>
            <button
              className="btn btn-success btn_dyn"
              value="1000"
              onClick={(e) => this.onTestClickFancySecond(e)}
            >
              1000
            </button>
          </td>
        </tr>
      );
    }
  };

  getFirstLay = () => {
    if (this.state.getFirstLay === true) {
      return (
        <tr style={{ background: "#F3DCE2" }}>
          <td className="text-center">
            <a href="#" className="text-danger">
              {" "}
              <i className="fa fa-times"></i>{" "}
            </a>
          </td>
          <td id="team_nm">{this.state.teamname1}</td>
          <td style={{ width: "75px" }}>
            <div className="form-group">
              <input
                value={this.state.lastPriceTraded1}
                name="lastPriceTraded1"
                className="amountint"
                onChange={this.handleChange}
                type="text"
                style={{
                  float: "left",
                  width: "45px",
                  verticalAlign: "middle",
                }}
                id="odds"
                required="required"
                readOnly
              />
            </div>
          </td>
          <td>
            <div className="form-group bet-stake">
              <input
                value={this.state.amountshowFirst}
                name="amountshowFirst"
                type="text"
                onChange={this.handleChange}
                id="btn_val"
                style={{ width: "52px" }}
                maxLength="10"
                required="required"
              />
            </div>
          </td>{" "}
          <td id="prft" className="text-right">
            <input
              value={this.state.proFitfirstval}
              name="proFitsecondval"
              onChange={this.handleChange}
              type="text"
              readOnly
              style={{ float: "left", width: "45px", verticalAlign: "middle" }}
            />
          </td>
        </tr>
      );
    }
  };
  getSecondBack = () => {
    if (this.state.getSecondBack === true) {
      return (
        <tr style={{ background: "#BEDDF4" }}>
          <td className="text-center">
            <a href="#" className="text-danger">
              {" "}
              <i className="fa fa-times"></i>{" "}
            </a>
          </td>
          <td id="team_nm">{this.state.teamname2}</td>
          <td style={{ width: "75px" }}>
            <div className="form-group">
              <input
                value={this.state.lastPriceTraded2}
                name="lastPriceTraded2"
                className="amountint"
                onChange={this.handleChange}
                type="number"
                required="required"
                maxLength="4"
                style={{
                  float: "left",
                  width: "45px",
                  verticalAlign: "middle",
                }}
                id="odds"
              />
            </div>
          </td>
          <td>
            <div className="form-group bet-stake">
              <input
                id="btn_val"
                style={{ width: "52px" }}
                maxLength="10"
                value={this.state.amountshowSecond}
                type="text"
                onChange={this.handleChange}
                required="required"
              />
            </div>
          </td>
          <td id="prft" className="text-right">
            <input
              value={this.state.proFitsecondval}
              name="proFitsecondval"
              onChange={this.handleChange}
              type="text"
              readOnly
              style={{ float: "left", width: "45px", verticalAlign: "middle" }}
            />
          </td>
        </tr>
      );
    }
  };
  getFancySecondbet = () => {
    if (this.state.getFancySecondbet === true) {
      return (
        <tr style={{ background: "#BEDDF4" }}>
          <td className="text-center">
            <a href="#" className="text-danger">
              {" "}
              <i className="fa fa-times"></i>{" "}
            </a>
          </td>
          <td id="team_nm">{this.state.teamname2}</td>
          <td style={{ width: "75px" }}>
            <div className="form-group">
              <input
                value={this.state.amountFancybetBalSecond}
                name="lastPriceTraded2"
                className="amountint"
                onChange={this.handleChange}
                type="number"
                required="required"
                maxLength="4"
                style={{
                  float: "left",
                  width: "45px",
                  verticalAlign: "middle",
                }}
                id="odds"
                readOnly
              />
            </div>
          </td>
          <td>
            <div className="form-group bet-stake">
              <input
                id="btn_val"
                style={{ width: "52px" }}
                maxLength="10"
                value={this.state.amountFancybetSecond}
                type="text"
                onChange={this.handleChange}
                required="required"
              />
            </div>
          </td>{" "}
        </tr>
      );
    }
  };

  onTestClick(e) {
    e.preventDefault();
    const buttonValue = e.target.value;
    var minusone = this.state.lastPriceTraded1 - 1;
    var multiplyval = minusone * buttonValue;
    var numValue = new Intl.NumberFormat("en-IN", {
      maximumSignificantDigits: 2,
    }).format(multiplyval);

    this.setState({
      amountshowFirst: buttonValue,
      proFitfirstval: numValue,
    });
  }
  onTestClickSecond(e) {
    e.preventDefault();
    const buttonValue = e.target.value;
    var minusone = this.state.lastPriceTraded2 - 1;
    var multiplyval = minusone * buttonValue;
    var numValue = new Intl.NumberFormat("en-IN", {
      maximumSignificantDigits: 2,
    }).format(multiplyval);

    this.setState({
      amountshowSecond: buttonValue,
      proFitsecondval: numValue,
    });
  }

  onTestClickFancyFirst(e) {
    e.preventDefault();
    const buttonValue = e.target.value;
    var minusone = this.state.lastPriceTraded1 - 1;
    var multiplyval = minusone * buttonValue;
    var numValue = new Intl.NumberFormat("en-IN", {
      maximumSignificantDigits: 2,
    }).format(multiplyval);

    this.setState({
      amountFancybetFirst: buttonValue,
    });
  }
  onTestClickFancySecond(e) {
    e.preventDefault();
    const buttonValue = e.target.value;
    var minusone = this.state.lastPriceTraded1 - 1;
    var multiplyval = minusone * buttonValue;
    var numValue = new Intl.NumberFormat("en-IN", {
      maximumSignificantDigits: 2,
    }).format(multiplyval);

    this.setState({
      amountFancybetSecond: buttonValue,
    });
  }
  cancelCourse = () => {
    window.location = "/matchdetail/" + this.state.matchids;
    //this.setState({ amountshowFirst: "", amountshowSecond: "", proFitfirstval: "", proFitsecondval: "" });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let headers = {
      Authorization: "Bearer " + this.state.accessToken,
    };

    let savebet = {
      event_name: "dtoneday",
      odds: this.state.oddVal,
      stake: this.state.stake_amount,
      event_id: this.state.mid,
      event_type: "dtoneday",
      team_name: this.state.teamName,
      casnio_type: "unmatch",
    };

    axios
      .post(baseUrl + "/createbetuser", savebet, { headers })
      .then((resp) => {
        var resp = resp.data;
        if (resp.success === true) {
          this.setState({
            respStatus: resp.success,
            respMessage: resp.message,
            oddVal: "",
            stake_amount: "",
            profit: "",
            team_profit1: "",
            stackAmount_team1: "",
            team_profit2: "",
            stackAmount_team2: "",
          });
          axios
            .get(baseUrl + "/casino_dt_one_day", { headers })
            .then((resp) => {
              this.setState({ casinoresult: resp.data.Betlist });
            });

          setTimeout(() => {
            this.setState({ respStatus: "" });
          }, 2000);
        } else {
          this.setState({
            respStatus: resp.success,
            respMessage: resp.message,
          });
          setTimeout(() => {
            this.setState({ respStatus: "" });
          }, 2000);
        }
      });
  };
  // handleSubmitSession = (event) => {

  // 	event.preventDefault();
  // 	let headers = {
  // 		Authorization: "Bearer " + this.state.accessToken,
  // 	};

  // 	let matchid = this.props.match.params.id;
  // 	var yes_amount="";
  // 	var no_amount ="";

  // 	if(this.state.no==="no"){
  // 			no_amount=this.state.session_input;
  // 	}
  // 	if(this.state.yes==="yes"){
  // 			yes_amount=this.state.session_input;
  // 	}
  // 	let savebet = {
  // 		event_id: this.props.match.params.id,
  // 		event_name: this.state.eventName,
  // 		yes: this.state.yes,
  // 		no: this.state.no,
  // 		market_id: this.state.betMarketId,
  // 		yes_amount:yes_amount,
  // 		no_amount: no_amount,
  // 		stake:this.state.stake_amount,
  // 		headname:this.state.headname

  // 	};

  // 	axios.post(baseUrl + '/createbetusersession', savebet,{headers}).then((resp) => {
  // 		var resp = resp.data;
  // 		if(resp.success === true){
  // 			this.setState({
  // 				respStatus: resp.success,
  // 				respMessage:resp.message,
  // 				oddVal:"",
  // 				stake_amount:"",
  // 				profit:"",
  // 				team_profit1:"",
  // 				stackAmount_team1:"",
  // 				team_profit2:"",
  // 				stackAmount_team2:""
  // 			});
  // 			this.getUserCurrentBalance();
  // 			this.showTableHtml();
  // 				// this.callMatchOddsApi()

  // 			setTimeout(() => {this.setState({ respStatus: "" });}, 7000);
  // 		} else {
  // 			this.setState({
  // 				respStatus: resp.success,
  // 				respMessage:resp.message
  // 			});
  // 			setTimeout(() => {this.setState({ respStatus: "" });}, 7000);
  // 		}
  // 		this.callUserBetListApi();
  // 	});

  // }

  responseHtml = () => {
    if (this.state.respStatus === false) {
      return <div className="alert alert-danger">{this.state.respMessage}</div>;
    } else if (this.state.respStatus === true) {
      return (
        <div className="alert alert-success">{this.state.respMessage}</div>
      );
    }
  };

  emptyHtml = () => {
    if (this.state.emptyField === true) {
      return <div className="alert alert-danger">{this.state.errMsg}</div>;
    }
  };

  handleFancybetSubmit = (event) => {
    event.preventDefault();
    let savebet = {
      event_id: this.props.match.params.id,
      user_id: this.state.user_id,
      team_id: this.state.teamid1,
      team_id_second: this.state.teamid2,
      matchids: this.state.matchids,
      eventName: this.state.eventName,
      Odds: this.state.marketName,
      odds_first_lay: this.state.amountFancybetBal,
      odds_second_lay: this.state.amountFancybetBalSecond,
      teamname: this.state.teamname1,
      teamname_second: this.state.teamname2,
      BatAmount: this.state.amountFancybetFirst * this.state.amountFancybetBal,
      BatAmount_second:
        this.state.amountFancybetSecond * this.state.amountFancybetBalSecond,
      eventTypeId: this.state.eventTypeId,
    };
    axios.post(baseUrl + "/createbetuser", savebet).then((resp) => {
      if (resp.data.success != false) {
        this.setState({
          respStatus: resp.success,
        });
        window.location.href = "/matchdetail/" + resp.data.result.matchids;
      } else {
        this.setState({
          respMessage: resp.data.message,
        });
      }
    });
  };

  componentDidMount() {
    let headers = {
      Authorization: "Bearer " + this.state.accessToken,
    };

    axios.get(baseUrl + "/casino_dt_one_day", { headers }).then((resp) => {
      this.setState({ casinoresult: resp.data.Betlist });
    });

    const socket = socketIOClient(ENDPOINT);
    socket.on("FromAPI3", (data) => {
      this.setState({ casinodt20: data.data });
      this.callMatchOddsApi(data.data);
    });

    // io.on("connection", socket => {
    // 	console.log("New client connected"), setInterval(
    // 	  () => this.callMatchOddsApi (socket),
    // 	  1000
    // 	);
    // 	socket.on("disconnect", () => console.log("Client disconnected"));
    //   });
    //let counter = setInterval(this.callMatchOddsApi , 1000);
    //let counterFancy = setInterval(this.callFancyListApi , 2000);
  }

  callMatchOddsApi = (data) => {
    const new_array = {};
    console.log(data.data);

    if (data.data.data.t1[0] != undefined) {
      if (data.data.data.t1[0].autotime != undefined) {
        new_array["autotime"] = data.data.data.t1[0].autotime;
      } else {
        new_array["autotime"] = "";
      }
    } else {
      new_array["autotime"] = "";
    }

    new_array["mid"] = data.data.data.t1[0].mid;

    new_array["b1"] = data.data.data.t2[0].b1;
    new_array["bs1"] = data.data.data.t2[0].bs1;
    new_array["l1"] = data.data.data.t2[0].l1;
    new_array["ls1"] = data.data.data.t2[0].ls1;
    new_array["nat"] = data.data.data.t2[0].nat;
    new_array["max"] = data.data.data.t2[0].max;
    new_array["min"] = data.data.data.t2[0].min;
    new_array["b1_1"] = data.data.data.t2[1].b1;
    new_array["bs1_1"] = data.data.data.t2[1].bs1;
    new_array["l1_1"] = data.data.data.t2[1].l1;
    new_array["ls1_1"] = data.data.data.t2[1].ls1;
    new_array["nat_1"] = data.data.data.t2[1].nat;
    new_array["max_1"] = data.data.data.t2[1].max;
    new_array["min_1"] = data.data.data.t2[1].min;
    new_array["b1_2"] = data.data.data.t2[2].b1;
    new_array["bs1_2"] = data.data.data.t2[2].bs1;
    new_array["l1_2"] = data.data.data.t2[2].l1;
    new_array["ls1_2"] = data.data.data.t2[2].ls1;
    new_array["nat_2"] = data.data.data.t2[2].nat;
    new_array["max_2"] = data.data.data.t2[2].max;
    new_array["min_2"] = data.data.data.t2[2].min;
    new_array["b1_2"] = data.data.data.t2[2].b1;
    new_array["bs1_2"] = data.data.data.t2[2].bs1;
    new_array["l1_2"] = data.data.data.t2[2].l1;
    new_array["ls1_2"] = data.data.data.t2[2].ls1;
    new_array["nat_2"] = data.data.data.t2[2].nat;
    new_array["max_2"] = data.data.data.t2[2].max;
    new_array["min_2"] = data.data.data.t2[2].min;
    new_array["b1_3"] = data.data.data.t2[3].b1;
    new_array["bs1_3"] = data.data.data.t2[3].bs1;
    new_array["l1_3"] = data.data.data.t2[3].l1;
    new_array["ls1_3"] = data.data.data.t2[3].ls1;
    new_array["nat_3"] = data.data.data.t2[3].nat;
    new_array["max_3"] = data.data.data.t2[3].max;
    new_array["min_3"] = data.data.data.t2[3].min;
    new_array["b1_4"] = data.data.data.t2[4].b1;
    new_array["bs1_4"] = data.data.data.t2[4].bs1;
    new_array["l1_4"] = data.data.data.t2[4].l1;
    new_array["ls1_4"] = data.data.data.t2[4].ls1;
    new_array["nat_4"] = data.data.data.t2[4].nat;
    new_array["max_4"] = data.data.data.t2[4].max;
    new_array["min_4"] = data.data.data.t2[4].min;
    new_array["b1_5"] = data.data.data.t2[5].b1;
    new_array["bs1_5"] = data.data.data.t2[5].bs1;
    new_array["l1_5"] = data.data.data.t2[5].l1;
    new_array["ls1_5"] = data.data.data.t2[5].ls1;
    new_array["nat_5"] = data.data.data.t2[5].nat;
    new_array["max_5"] = data.data.data.t2[5].max;
    new_array["min_5"] = data.data.data.t2[5].min;
    new_array["b1_6"] = data.data.data.t2[6].b1;
    new_array["bs1_6"] = data.data.data.t2[6].bs1;
    new_array["l1_6"] = data.data.data.t2[6].l1;
    new_array["ls1_6"] = data.data.data.t2[6].ls1;
    new_array["nat_6"] = data.data.data.t2[6].nat;
    new_array["max_6"] = data.data.data.t2[6].max;
    new_array["min_6"] = data.data.data.t2[6].min;
    new_array["b1_7"] = data.data.data.t2[7].b1;
    new_array["bs1_7"] = data.data.data.t2[7].bs1;
    new_array["l1_7"] = data.data.data.t2[7].l1;
    new_array["ls1_7"] = data.data.data.t2[7].ls1;
    new_array["nat_7"] = data.data.data.t2[7].nat;
    new_array["max_7"] = data.data.data.t2[7].max;
    new_array["min_7"] = data.data.data.t2[7].min;
    new_array["b1_8"] = data.data.data.t2[8].b1;
    new_array["bs1_8"] = data.data.data.t2[8].bs1;
    new_array["l1_8"] = data.data.data.t2[8].l1;
    new_array["ls1_8"] = data.data.data.t2[8].ls1;
    new_array["nat_8"] = data.data.data.t2[8].nat;
    new_array["max_8"] = data.data.data.t2[8].max;
    new_array["min_8"] = data.data.data.t2[8].min;
    new_array["b1_9"] = data.data.data.t2[9].b1;
    new_array["bs1_9"] = data.data.data.t2[9].bs1;
    new_array["l1_9"] = data.data.data.t2[9].l1;
    new_array["ls1_9"] = data.data.data.t2[9].ls1;
    new_array["nat_9"] = data.data.data.t2[9].nat;
    new_array["max_9"] = data.data.data.t2[9].max;
    new_array["min_9"] = data.data.data.t2[9].min;
    new_array["b1_10"] = data.data.data.t2[10].b1;
    new_array["bs1_10"] = data.data.data.t2[10].bs1;
    new_array["l1_10"] = data.data.data.t2[10].l1;
    new_array["ls1_10"] = data.data.data.t2[10].ls1;
    new_array["nat_10"] = data.data.data.t2[10].nat;
    new_array["max_10"] = data.data.data.t2[10].max;
    new_array["min_10"] = data.data.data.t2[10].min;
    new_array["b1_11"] = data.data.data.t2[11].b1;
    new_array["bs1_11"] = data.data.data.t2[11].bs1;
    new_array["l1_11"] = data.data.data.t2[11].l1;
    new_array["ls1_11"] = data.data.data.t2[11].ls1;
    new_array["nat_11"] = data.data.data.t2[11].nat;
    new_array["max_11"] = data.data.data.t2[11].max;
    new_array["min_11"] = data.data.data.t2[11].min;
    new_array["b1_12"] = data.data.data.t2[12].b1;
    new_array["bs1_12"] = data.data.data.t2[12].bs1;
    new_array["l1_12"] = data.data.data.t2[12].l1;
    new_array["ls1_12"] = data.data.data.t2[12].ls1;
    new_array["nat_12"] = data.data.data.t2[12].nat;
    new_array["max_12"] = data.data.data.t2[12].max;
    new_array["min_12"] = data.data.data.t2[12].min;
    new_array["b1_13"] = data.data.data.t2[13].b1;
    new_array["bs1_13"] = data.data.data.t2[13].bs1;
    new_array["l1_13"] = data.data.data.t2[13].l1;
    new_array["ls1_13"] = data.data.data.t2[13].ls1;
    new_array["nat_13"] = data.data.data.t2[13].nat;
    new_array["max_13"] = data.data.data.t2[13].max;
    new_array["min_13"] = data.data.data.t2[13].min;
    new_array["b1_14"] = data.data.data.t2[14].b1;
    new_array["bs1_14"] = data.data.data.t2[14].bs1;
    new_array["l1_14"] = data.data.data.t2[14].l1;
    new_array["ls1_14"] = data.data.data.t2[14].ls1;
    new_array["nat_14"] = data.data.data.t2[14].nat;
    new_array["max_14"] = data.data.data.t2[14].max;
    new_array["min_14"] = data.data.data.t2[14].min;
    new_array["b1_15"] = data.data.data.t2[15].b1;
    new_array["bs1_15"] = data.data.data.t2[15].bs1;
    new_array["l1_15"] = data.data.data.t2[15].l1;
    new_array["ls1_15"] = data.data.data.t2[15].ls1;
    new_array["nat_15"] = data.data.data.t2[15].nat;
    new_array["max_15"] = data.data.data.t2[15].max;
    new_array["min_15"] = data.data.data.t2[15].min;
    new_array["b1_16"] = data.data.data.t2[16].b1;
    new_array["bs1_16"] = data.data.data.t2[16].bs1;
    new_array["l1_16"] = data.data.data.t2[16].l1;
    new_array["ls1_16"] = data.data.data.t2[16].ls1;
    new_array["nat_16"] = data.data.data.t2[16].nat;
    new_array["max_16"] = data.data.data.t2[16].max;
    new_array["min_16"] = data.data.data.t2[16].min;
    new_array["b1_17"] = data.data.data.t2[17].b1;
    new_array["bs1_17"] = data.data.data.t2[17].bs1;
    new_array["l1_17"] = data.data.data.t2[17].l1;
    new_array["ls1_17"] = data.data.data.t2[17].ls1;
    new_array["nat_17"] = data.data.data.t2[17].nat;
    new_array["max_17"] = data.data.data.t2[17].max;
    new_array["min_17"] = data.data.data.t2[17].min;
    new_array["b1_18"] = data.data.data.t2[18].b1;
    new_array["bs1_18"] = data.data.data.t2[18].bs1;
    new_array["l1_18"] = data.data.data.t2[18].l1;
    new_array["ls1_18"] = data.data.data.t2[18].ls1;
    new_array["nat_18"] = data.data.data.t2[18].nat;
    new_array["max_18"] = data.data.data.t2[18].max;
    new_array["min_18"] = data.data.data.t2[18].min;

    this.setState(new_array);
  };
  showDrawHtml = () => {
    if (this.state.draw === true) {
      var status = this.state.status;
      if (status != "OPEN") {
        var status = this.state.status;
      } else {
        var status = "";
      }

      return (
        <tr className="bet-info ">
          <td className="team-name nation">
            <span>
              <strong>The Draw</strong>
            </span>
            <p className="box-w4">
              <span
                className="float-left book"
                id="book_349"
                style={{ color: "black" }}
              >
                0
              </span>{" "}
              <span
                className="float-right profit"
                id="profit_349"
                style={{ color: "black" }}
              ></span>
            </p>
          </td>

          <td
            className="box-w1 back-color"
            style={{ backgroundColor: "#B2D6F0" }}
          >
            {status}
            <button
              className="bet-sec back "
              onClick={this.handleBidClick.bind(
                this,
                this.state.drawTeamName,
                this.state.drawLastBack,
                "#B2D6F0",
                "back",
                this.state.drawSelectionId,
                this.state.marketId,
                "draw",
                this.state.status
              )}
            >
              {" "}
              <span className="odd backprice">{this.state.drawLastBack}</span>
              {this.state.drawLastBackSize}{" "}
            </button>
          </td>
          <td
            className="box-w1 back-color"
            style={{ backgroundColor: "#92C9F0" }}
          >
            <button
              className="bet-sec back "
              onClick={this.handleBidClick.bind(
                this,
                this.state.drawTeamName,
                this.state.drawMiddleBack,
                "#92C9F0",
                "back",
                this.state.drawSelectionId,
                this.state.marketId,
                "draw",
                this.state.status
              )}
            >
              {" "}
              <span className="odd backprice">
                {this.state.drawMiddleBack}
              </span>{" "}
              {this.state.drawMiddleBackSize}{" "}
            </button>
          </td>

          <td className="box-w1 back-color">
            {status}
            <button
              className="bet-sec back "
              onClick={this.handleBidClick.bind(
                this,
                this.state.drawTeamName,
                this.state.drawFirstBack,
                "#72bbef",
                "back",
                this.state.drawSelectionId,
                this.state.marketId,
                "draw",
                this.state.status
              )}
            >
              {" "}
              <span className="odd backprice">
                {this.state.drawFirstBack}
              </span>{" "}
              {this.state.drawFirstBackSize}{" "}
            </button>
          </td>

          <td className="box-w1 lay-color">
            {status}
            <button
              className="bet-sec lay"
              onClick={this.handleBidClick.bind(
                this,
                this.state.drawTeamName,
                this.state.drawFirstLay,
                "#faa9ba",
                "lay",
                this.state.drawSelectionId,
                this.state.marketId,
                "draw",
                this.state.status
              )}
              value={this.state.lastPriceTraded1}
            >
              <span className="odd layprice">{this.state.drawFirstLay}</span>
              {this.state.drawFirstLaySize}
            </button>
          </td>
          <td
            className="box-w1 lay-color"
            style={{ backgroundColor: "#F8BBC8" }}
          >
            {status}
            <button
              className="bet-sec lay"
              value={this.state.lastPriceTraded1}
              onClick={this.handleBidClick.bind(
                this,
                this.state.drawTeamName,
                this.state.drawMiddleLay,
                "#F8BBC8",
                "lay",
                this.state.drawSelectionId,
                this.state.marketId,
                "draw",
                this.state.status
              )}
            >
              <span className="odd layprice">{this.state.drawMiddleLay}</span>
              {this.state.drawMiddleLaySize}
            </button>
          </td>
          <td
            className="box-w1 lay-color"
            style={{ backgroundColor: "#F6CDD6" }}
          >
            {status}
            <button
              className="bet-sec lay"
              value={this.state.lastPriceTraded1}
              onClick={this.handleBidClick.bind(
                this,
                this.state.drawTeamName,
                this.state.drawLastLay,
                "#F6CDD6",
                "lay",
                this.state.drawSelectionId,
                this.state.marketId,
                "draw",
                this.state.status
              )}
            >
              <span className="odd layprice">{this.state.drawLastLay}</span>
              {this.state.drawLastLaySize}
            </button>
          </td>
        </tr>
      );
    }
  };
  showTableHtml = () => {
    const html = [];
    if (
      this.state.casinoresult != undefined &&
      this.state.casinoresult != "" &&
      this.state.casinoresult != null
    ) {
      for (let i = 0; i < this.state.casinoresult.length; i++) {
        html.push(
          <tr>
            <td style={{ textAlign: "center" }}>
              {" "}
              {this.state.casinoresult[i].odds}{" "}
            </td>
            <td style={{ textAlign: "center" }}>
              {" "}
              {this.state.casinoresult[i].stake}{" "}
            </td>
            <td style={{ textAlign: "center" }}>
              {" "}
              {this.state.casinoresult[i].team_name}{" "}
            </td>
          </tr>
        );
      }

      ////////console.log(this.state.profit12);

      return (
        <table className="table coupon-table">
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}> Odds</th>
              <th style={{ textAlign: "center" }}> Stake</th>
              <th style={{ textAlign: "center" }}> Team Name</th>
            </tr>
          </thead>
          <tbody>{html}</tbody>
        </table>
      );
    }
  };
  onFancybetClick = (e) => {
    let currVal = e.target.value;
    const { getFancybet } = this.state;
    this.setState(() => ({
      getFancybet: !getFancybet,
      amountFancybetBal: currVal,
    }));
  };
  onFancybetSecondClick = (f) => {
    let currSecVal = f.target.value;
    const { getFancySecondbet } = this.state;
    this.setState(() => ({
      getFancySecondbet: !getFancySecondbet,
      amountFancybetBalSecond: currSecVal,
    }));
    $(".pancypick").click(function () {});
  };
  handleChange = (event) => {
    let { name, value } = event.target;
    this.setState({ [name]: event.target.value });
  };

  handleChangeStakeamount = (event) => {
    this.setState({ stake_amount: event.target.value });
  };
  handleChange_session_input = (event) => {
    this.setState({ session_input: event.target.value });
  };

  handleButtonsClick = (getAmount) => {
    var profit = "";
    if (this.state.type === "back") {
      profit = parseFloat(this.state.oddVal) - 1;
      profit = profit.toFixed(2) * getAmount;

      if (this.state.betMatchType == "teamone") {
        this.setState({ team_profit1: profit });
      }
      if (this.state.betMatchType == "teamtwo") {
        this.setState({ team_profit2: profit });
      }

      if (this.state.betMatchType == "teamone") {
        this.setState({ stackAmount_team2: "-" + getAmount });
      }
      if (this.state.betMatchType == "teamtwo") {
        this.setState({ stackAmount_team1: "-" + getAmount });
      }
    } else if (this.state.type === "lay") {
      profit = parseFloat(this.state.oddVal) - 1;
      profit = profit.toFixed(2) * getAmount;
      profit = profit.toFixed(0);
      if (this.state.betMatchType == "teamone") {
        this.setState({ team_profit1: "-" + profit });
      } else if (this.state.betMatchType == "teamtwo") {
        this.setState({ team_profit2: "-" + profit });
      }

      if (this.state.betMatchType == "teamone") {
        this.setState({ stackAmount_team2: getAmount });
      } else if (this.state.betMatchType == "teamtwo") {
        this.setState({ stackAmount_team1: getAmount });
      }
    }

    this.setState({ stake_amount: getAmount, profit: profit });
  };
  handleButtonsNewClick = (getAmount) => {
    this.setState({ stake_amount: getAmount });
  };

  handleBidClick = (type, team_name, rate, color) => {
    console.log(team_name);
    console.log(rate);

    console.log(type);
    console.log(color);

    // if(this.state.autotime<3){
    // 	this.setState({betClick:false,});
    // }

    this.setState({ betClick: true, betClick1: false });

    this.setState({
      teamName: team_name,
      oddVal: rate,
      color: color,
      type: type,
    });
  };

  handleBidClickSession = (color, headname, no, marketId, SessInptNo, yes) => {
    //////console.log(SessInptNo);

    this.setState({ betClick1: true, betClick: false });

    this.setState({
      color: color,
      headname: headname,
      session_input: SessInptNo,
      yes: yes,
      no: no,
      stake_amount: "",
      profit22: "",
      profit: "",
      team_profit1: "",
      team_profit2: "",
      stackAmount_team1: "",
      stackAmount_team2: "",
    });
  };
  handleBidCrossClick = () => {
    this.setState({
      betClick: false,
      betClick1: false,
      teamName: "",
      oddVal: "",
      color: "",
      type: "",
      betSelectionId: "",
      betMarketId: "",
      betMatchType: "",
      stake_amount: "",
      profit: "",
    });
  };

  showBidClickHtml = () => {
    if (this.state.betClick === true) {
      var button_1 = 1000;
      var button_2 = 5000;
      var button_3 = 10000;
      var button_4 = 25000;
      var button_5 = 50000;
      var button_6 = 100000;
      var button_7 = 200000;
      var button_8 = 500000;
      var button_9 = 1000000;
      var button_10 = 2500000;

      var value_1 = 1000;
      var value_2 = 5000;
      var value_3 = 10000;
      var value_4 = 25000;
      var value_5 = 50000;
      var value_6 = 100000;
      var value_7 = 200000;
      var value_8 = 500000;
      var value_9 = 1000000;
      var value_10 = 2500000;

      return (
        <div
          className="table-responsive hide-box-click "
          style={{
            paddingBottom: "4px",
            display: "block",
            background: this.state.color,
          }}
        >
          <form onSubmit={this.handleSubmit} method="post" id="frm_placebet">
            <table className="coupon-table table table-borderedless">
              <thead>
                <tr>
                  <th></th>
                  <th style={{ width: "35%", textAlign: "left" }}>(Bet for)</th>
                  <th style={{ width: "35%", textAlign: "left" }}>Odds</th>
                  <th style={{ width: "35%", textAlign: "left" }}>Stake</th>
                  <th
                    style={{ width: "35%", textAlign: "right" }}
                    id="profit-head"
                  >
                    Profit
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-center">
                    <a
                      href="#;"
                      className="text-danger"
                      onClick={this.handleBidCrossClick}
                    >
                      {" "}
                      <i className="fa fa-times"></i>{" "}
                    </a>
                  </td>
                  <td id="team_nm">{this.state.teamName}</td>
                  <td style={{ width: "75px" }}>
                    <div className="form-group">
                      <input
                        value={this.state.type}
                        name="type"
                        type="hidden"
                      />
                      <input
                        value={this.state.oddVal}
                        name="oddVal"
                        className="amountint"
                        onChange={this.handleChange}
                        type="number"
                        required="required"
                        maxLength="4"
                        style={{
                          float: "left",
                          width: "45px",
                          verticalAlign: "middle",
                        }}
                        id="odds"
                        step="0.01"
                      />
                    </div>
                  </td>
                  <td>
                    <div className="form-group bet-stake">
                      <input
                        id="btn_val"
                        style={{ width: "52px" }}
                        maxLength="10"
                        value={this.state.stake_amount}
                        name="stake_amount"
                        type="text"
                        onChange={this.handleChange}
                        required="required"
                      />
                    </div>
                  </td>
                  <td>{this.state.profit}</td>
                </tr>
                <tr>
                  <td
                    colSpan="5"
                    style={{ padding: "5px" }}
                    className="value-buttons"
                  >
                    <a
                      href="#"
                      style={{ padding: "6px", color: "#000" }}
                      className="btn btn-success btn_dyn"
                      value={value_1}
                      onClick={this.handleButtonsClick.bind(this, value_1)}
                    >
                      {button_1}
                    </a>
                    <a
                      href="#"
                      style={{ padding: "6px", color: "#000" }}
                      className="btn btn-success btn_dyn"
                      value={value_2}
                      onClick={this.handleButtonsClick.bind(this, value_2)}
                    >
                      {button_2}
                    </a>
                    <a
                      href="#"
                      style={{ padding: "6px", color: "#000" }}
                      className="btn btn-success btn_dyn"
                      value={value_3}
                      onClick={this.handleButtonsClick.bind(this, value_3)}
                    >
                      {button_3}
                    </a>
                    <a
                      href="#"
                      style={{ padding: "6px", color: "#000" }}
                      className="btn btn-success btn_dyn"
                      value={value_4}
                      onClick={this.handleButtonsClick.bind(this, value_4)}
                    >
                      {button_4}
                    </a>
                    <a
                      href="#"
                      style={{ padding: "6px", color: "#000" }}
                      className="btn btn-success btn_dyn"
                      value={value_5}
                      onClick={this.handleButtonsClick.bind(this, value_5)}
                    >
                      {button_5}
                    </a>
                    <a
                      href="#"
                      style={{ padding: "6px", color: "#000" }}
                      className="btn btn-success btn_dyn"
                      value={value_6}
                      onClick={this.handleButtonsClick.bind(this, value_6)}
                    >
                      {button_6}
                    </a>
                    <a
                      href="#"
                      style={{ padding: "6px", color: "#000" }}
                      className="btn btn-success btn_dyn"
                      value={value_7}
                      onClick={this.handleButtonsClick.bind(this, value_7)}
                    >
                      {button_7}
                    </a>
                    <a
                      href="#"
                      style={{ padding: "6px", color: "#000" }}
                      className="btn btn-success btn_dyn"
                      value={value_8}
                      onClick={this.handleButtonsClick.bind(this, value_8)}
                    >
                      {button_8}
                    </a>
                    <a
                      href="#"
                      style={{ padding: "6px", color: "#000" }}
                      className="btn btn-success btn_dyn"
                      value={value_9}
                      onClick={this.handleButtonsClick.bind(this, value_9)}
                    >
                      {button_9}
                    </a>
                    <a
                      href="#"
                      style={{ padding: "6px", color: "#000" }}
                      className="btn btn-success btn_dyn"
                      value={value_10}
                      onClick={this.handleButtonsClick.bind(this, value_10)}
                    >
                      {button_10}
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="col-md-12">
              {this.responseHtml()}
              {this.emptyHtml()}
              <button
                className="btn btn-sm btn-danger float-left"
                type="button"
                onClick={this.handleBidCrossClick}
              >
                Reset
              </button>
              <button
                className="btn btn-sm btn-success float-right"
                type="submit"
                id="submit_btn"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      );
    }
  };

  handleDepoWithdrPopupClose = () => {
    this.setState({ showUserAmountPopup1: false });
  };

  handleBidCrossClick123 = () => {
    this.setState({ showUserAmountPopup1: true });
  };

  render() {
    //console.log(this.state.nat_Dragon);
    var status = this.state.status;
    if (status != "OPEN") {
      status = this.state.status;
    } else {
      status = "";
    }
    var maximum_bet_limit = this.state.maxminBet.adminlist;
    if (maximum_bet_limit != undefined) {
      maximum_bet_limit = maximum_bet_limit.maximum_bet_limit;
    } else {
      maximum_bet_limit = "N/A";
    }
    var minimum_bet_limit = this.state.maxminBet.adminlist;
    if (minimum_bet_limit != undefined) {
      minimum_bet_limit = minimum_bet_limit.minimum_bet_limit;
    } else {
      minimum_bet_limit = "N/A";
    }

    var accessToken = this.state.accessToken;

    if (accessToken === "" || accessToken === null) {
      return <Redirect to="/login" />;
    }
    var change_password = localStorage.getItem("change_password");
    if (change_password != "" && change_password != null) {
      return <Redirect to="/change_password" />;
    }
    var new_mid = 0;

    if (this.state.mid != 0 && this.state.mid != undefined) {
      var mid = this.state.mid.split(".");

      if (mid[1] != undefined) {
        var new_mid = mid[1];
      }
    }

    var newdata11 = this.state.getResult11;
    var newarray = [];
    if (
      this.state.casinodt20 != undefined &&
      this.state.casinodt20 != "" &&
      this.state.casinodt20 != null
    ) {
      for (var i = 0; i < this.state.casinodt20.result.data.t1.length; i++) {
        var result = "";
        if (this.state.casinodt20.result.data.t1[i].result == 1) {
          result = "D";
        }
        if (this.state.casinodt20.result.data.t1[i].result == 2) {
          result = "T";
        }

        newarray.push(<span className="ball-runs ">{result}</span>);
      }
      //console.log(newarray);
    }

    var b1 = "box-w1  back-color";
    var b2 = "box-w1  back-color";

    var b3 = "box-w1  back-color";
    var b4 = "box-w1  back-color";

    var b5 = "box-w1  back-color";

    var b6 = "box-w1  back-color";

    var b7 = "box-w1  back-color";
    var b8 = "box-w1  back-color";
    var b9 = "box-w1  back-color";
    var b10 = "box-w1  back-color";
    var b11 = "box-w1  back-color";
    var b12 = "box-w1  back-color";
    var b13 = "box-w1  back-color";
    var b14 = "box-w1  back-color";
    var b15 = "box-w1  back-color";
    var b16 = "box-w1  back-color";
    var b17 = "box-w1  back-color";
    var b18 = "box-w1  back-color";
    var b19 = "box-w1  back-color";
    var b20 = "m-t-10 ";

    if (this.state.b1 < 0 || this.state.b1 === "0.00") {
      console.log(this.state.b1);
      b1 = "box-w1  back-color suspended-casino";
    }
    if (this.state.b1_2 < 0 || this.state.b1_2 === "0.00") {
      console.log(this.state.b1);
      b20 = "m-t-10 low-high-btn suspended-casino";
    }

    if (this.state.b1_1 < 0 || this.state.b1_1 === "0.00") {
      b2 = "box-w1  back-color suspended-casino";
    }
    if (this.state.b1_2 < 0 || this.state.b1_2 === "0.00") {
      b3 = "box-w1  back-color suspended-casino";
    }
    if (this.state.b1_3 < 0 || this.state.b1_3 === "0.00") {
      b4 = "box-w1  back-color suspended-casino";
    }

    if (this.state.b1_4 < 0 || this.state.b1_4 === "0.00") {
      b5 = "box-w1  back-color suspended-casino";
    }
    if (this.state.b1_5 < 0 || this.state.b1_5 === "0.00") {
      b6 = "box-w1  back-color suspended-casino";
    }
    if (this.state.b1_6 < 0 || this.state.b1_6 === "0.00") {
      b7 = "box-w1  back-color suspended-casino";
    }
    if (this.state.b1_7 < 0 || this.state.b1_7 === "0.00") {
      b8 = "box-w1  back-color suspended-casino";
    }
    if (this.state.b1_8 < 0 || this.state.b1_8 === "0.00") {
      b9 = "box-w1  back-color suspended-casino";
    }
    if (this.state.b1_9 < 0 || this.state.b1_9 === "0.00") {
      b10 = "box-w1  back-color suspended-casino";
    }

    if (this.state.b1_10 < 0 || this.state.b1_10 === "0.00") {
      b11 = "box-w1  back-color suspended-casino";
    }
    if (this.state.b1_11 < 0 || this.state.b1_11 === "0.00") {
      b12 = "box-w1  back-color suspended-casino";
    }
    if (this.state.b1_12 < 0 || this.state.b1_12 === "0.00") {
      b13 = "box-w1  back-color suspended-casino";
    }
    if (this.state.b1_13 < 0 || this.state.b1_13 === "0.00") {
      b14 = "box-w1  back-color suspended-casino";
    }
    if (this.state.b1_14 < 0 || this.state.b1_14 === "0.00") {
      b15 = "box-w1  back-color suspended-casino";
    }
    if (this.state.b1_15 < 0 || this.state.b1_15 === "0.00") {
      b16 = "box-w1  back-color suspended-casino";
    }
    if (this.state.b1_16 < 0 || this.state.b1_16 === "0.00") {
      b17 = "box-w1  back-color suspended-casino";
    }
    if (this.state.b1_17 < 0 || this.state.b1_17 === "0.00") {
      b18 = "box-w1  back-color suspended-casino";
    }
    if (this.state.b1_18 < 0 || this.state.b1_18 === "0.00") {
      b19 = "box-w1  back-color suspended-casino";
    }

    // <td className="box-w1  back-color">
    // <div className="bet-info  "></div><button className="bet-sec ">
    // <span className="odd layprice"> {this.state.b1_1}</span>{this.state.bs1_1}</button></td>

    var timer = 0;

    if (this.state.autotime != 0 && this.state.autotime != undefined) {
      console.log(this.state.autotime);
      var timer = (
        <Timer
          initialTime={this.state.autotime * 1000}
          direction="backward"
          timeToUpdate={1}
          checkpoints={[
            {
              time: 0,
              callback: () => this.state.autotime,
            },
          ]}
        >
          <Timer.Seconds />
        </Timer>
      );
    }

    return (
      <div>
        <Nav />
        <Menu />

        <div id="wrapper">
          <Sidebar />
          <div id="content-wrapper">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-9 featured-box-detail">
                  <div className="coupon-card">
                    <div className="game-heading">
                      <span className="card-header-title">
                        {" "}
                        20-20 Poker
                        <a
                          href="#"
                          className=" m-l-5 game-rules-icon rules_a"
                          onClick={this.handleBidCrossClick123}
                        >
                          RULES
                        </a>
                      </span>
                      <span className="float-right m-r-10">
                        Round ID: {new_mid}
                      </span>
                    </div>
                    <div className="card-content">
                      <div className="casino_video">
                        <iframe
                          e
                          className="live_video"
                          height="315"
                          src="https://c_n.casinovid.in/ddiamond/20poker/"
                          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                          allowfullscreen
                        />
                        <div className="timer_v">
                          <React.Fragment>{timer}</React.Fragment>
                        </div>
                      </div>
                      <div
                        className="dt-one-day_table mb-0 main-market market-bf"
                        data-marketid="1.167146463"
                      >
                        <div className="row">
                          <div className="table-responsive col-md-6 mb-0 main-market p-r-5">
                            <div className="live-poker">
                              <table className="table coupon-table mb-0 table table-bordered ">
                                <thead>
                                  <tr>
                                    <th className="box-6" />
                                    <th className="box-2 back">Player A</th>
                                    <th className="box-2 back">Player B</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr
                                    data-title="SUSPENDED"
                                    className="bet-info "
                                  >
                                    <td className="box-6">Winner</td>
                                    <td className="box-2 back teen-section">
                                      <button className="back">
                                        <span className="odd">1.98</span>{" "}
                                        <span style={{ color: "black" }}>
                                          0
                                        </span>
                                      </button>
                                    </td>
                                    <td className="box-2 back teen-section">
                                      <button className="back">
                                        <span className="odd">1.98</span>{" "}
                                        <span style={{ color: "black" }}>
                                          0
                                        </span>
                                      </button>
                                    </td>
                                  </tr>
                                  <tr data-title="" className="bet-info ">
                                    <td className="box-6">One Pair</td>
                                    <td className="box-2 back  teen-section">
                                      <button className="back">
                                        <span className="odd">2.00</span>{" "}
                                        <span style={{ color: "black" }}>
                                          0
                                        </span>
                                      </button>
                                    </td>
                                    <td className="box-2 back  teen-section">
                                      <button className="back">
                                        <span className="odd">2.00</span>{" "}
                                        <span style={{ color: "black" }}>
                                          0
                                        </span>
                                      </button>
                                    </td>
                                  </tr>
                                  <tr data-title="" className="bet-info ">
                                    <td className="box-6">Two Pair</td>
                                    <td className="box-2 back  teen-section">
                                      <button className="back">
                                        <span className="odd">3.75</span>{" "}
                                        <span style={{ color: "black" }}>
                                          0
                                        </span>
                                      </button>
                                    </td>
                                    <td className="box-2 back  teen-section">
                                      <button className="back">
                                        <span className="odd">3.75</span>{" "}
                                        <span style={{ color: "black" }}>
                                          0
                                        </span>
                                      </button>
                                    </td>
                                  </tr>
                                  <tr data-title="" className="bet-info ">
                                    <td className="box-6">Three of a Kind</td>
                                    <td className="box-2 back  teen-section">
                                      <button className="back">
                                        <span className="odd">16.00</span>{" "}
                                        <span style={{ color: "black" }}>
                                          0
                                        </span>
                                      </button>
                                    </td>
                                    <td className="box-2 back  teen-section">
                                      <button className="back">
                                        <span className="odd">16.00</span>{" "}
                                        <span style={{ color: "black" }}>
                                          0
                                        </span>
                                      </button>
                                    </td>
                                  </tr>
                                  <tr data-title="" className="bet-info ">
                                    <td className="box-6">Straight</td>
                                    <td className="box-2 back  teen-section">
                                      <button className="back">
                                        <span className="odd">16.00</span>{" "}
                                        <span style={{ color: "black" }}>
                                          0
                                        </span>
                                      </button>
                                    </td>
                                    <td className="box-2 back  teen-section">
                                      <button className="back">
                                        <span className="odd">16.00</span>{" "}
                                        <span style={{ color: "black" }}>
                                          0
                                        </span>
                                      </button>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                          <div className="table-responsive col-md-6 mb-0 main-market p-l-5">
                            <div className="live-poker">
                              <table className="table coupon-table table table-bordered ">
                                <thead>
                                  <tr>
                                    <th className="box-6" />
                                    <th className="box-2 back ">Player A</th>
                                    <th className="box-2 back ">Player B</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr data-title="" className="bet-info ">
                                    <td className="box-6">Flush</td>
                                    <td className="box-2 back  teen-section">
                                      <button className="back">
                                        <span className="odd">26.00</span>{" "}
                                        <span style={{ color: "black" }}>
                                          0
                                        </span>
                                      </button>
                                    </td>
                                    <td className="box-2 back  teen-section">
                                      <button className="back">
                                        <span className="odd">26.00</span>{" "}
                                        <span style={{ color: "black" }}>
                                          0
                                        </span>
                                      </button>
                                    </td>
                                  </tr>
                                  <tr data-title="" className="bet-info ">
                                    <td className="box-6">Full House</td>
                                    <td className="box-2 back  teen-section">
                                      <button className="back">
                                        <span className="odd">29.00</span>{" "}
                                        <span style={{ color: "black" }}>
                                          0
                                        </span>
                                      </button>
                                    </td>
                                    <td className="box-2 back  teen-section">
                                      <button className="back">
                                        <span className="odd">29.00</span>{" "}
                                        <span style={{ color: "black" }}>
                                          0
                                        </span>
                                      </button>
                                    </td>
                                  </tr>
                                  <tr data-title="" className="bet-info ">
                                    <td className="box-6">Four of a Kind</td>
                                    <td className="box-2 back  teen-section">
                                      <button className="back">
                                        <span className="odd">251.00</span>{" "}
                                        <span style={{ color: "black" }}>
                                          0
                                        </span>
                                      </button>
                                    </td>
                                    <td className="box-2 back  teen-section">
                                      <button className="back">
                                        <span className="odd">251.00</span>{" "}
                                        <span style={{ color: "black" }}>
                                          0
                                        </span>
                                      </button>
                                    </td>
                                  </tr>
                                  <tr data-title="" className="bet-info ">
                                    <td className="box-6">Straight Flush</td>
                                    <td className="box-2 back  teen-section">
                                      <button className="back">
                                        <span className="odd">501.00</span>{" "}
                                        <span style={{ color: "black" }}>
                                          0
                                        </span>
                                      </button>
                                    </td>
                                    <td className="box-2 back  teen-section">
                                      <button className="back">
                                        <span className="odd">501.00</span>{" "}
                                        <span style={{ color: "black" }}>
                                          0
                                        </span>
                                      </button>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="ander_bahar_marquee">
                        <marquee>
                          In each round, player will be a winner from player A/B
                          and from the remaining patterns, only high pattern
                          will be considered as winner for each player | tie
                          round will be considered as a cancel round.
                        </marquee>
                      </div>
                      <div className="">
                        <div className="row row-12">
                          <div className="col-md-12" id="fancyHeadToHide">
                            <div className="fancy-marker-title">
                              <h4>
                                Last Result
                                <a
                                  href="#"
                                  className=" m-r-5 game-rules-icon blinking"
                                  data-id="fancy"
                                >
                                  <span>
                                    <i className="fa fa-info-circle float-right"></i>
                                  </span>
                                </a>
                              </h4>
                            </div>
                            <div className="scorecard m-b-5">
                              <p className="text-right ball-by-ball m-t-10">
                                {newarray}
                              </p>
                            </div>
                          </div>
                          <div className="col-md-6 fancy-market"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-3 sidebar-right">
                  {/*
      <div className="card-header m-b-10" data-toggle="collapse" data-target="#demo">
         <h6 className="card-title">Live Match <span className="float-right"><i className="fa fa-tv"></i> live stream started</span> </h6>
         <iframe src="https://bet-fair.co/exchange/tplive1?type=dt20" style={{border: 'none'}} allowFullScreen sandbox="allow-scripts allow-presentation allow-same-origin" allow="autoplay; fullscreen; picture-in-picture; xr-spatial-tracking; encrypted-media" />
      </div>
      */}
                  <div className="card m-b-10 place-bet ">
                    <div className="card-header">
                      <h6 className="card-title d-inline-block">Place Bet</h6>
                      {/*<a className="btn btn-secondary float-right change-value" id="cng_btn_val" href="#">Change Button Value</a>*/}
                    </div>
                    {this.showBidClickHtml()}
                  </div>
                  <div className="card m-b-10 place-bet">
                    <div className="card-header">
                      <h6 className="card-title d-inline-block">My Bet</h6>
                      {/*<a className="btn btn-danger float-right change-value" id="cng_btn_val" href="#">ClearAll</a>*/}
                    </div>
                    <div
                      className="table-responsive hide-box-click "
                      style={{ paddingBottom: "4px", display: "block" }}
                    >
                      {this.showTableHtml()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Modal show={this.state.showUserAmountPopup1}>
              <Modal.Header className="mancolorsite">
                <Modal.Title>Rules</Modal.Title>
                <a
                  href="#"
                  className="Close"
                  data-dismiss="modal"
                  onClick={this.handleDepoWithdrPopupClose}
                >
                  <i className="fas fa-times"></i>{" "}
                </a>
              </Modal.Header>
              <Modal.Body className="p-0 rulcebody">
                <img src="/img/poker-rules.jpeg" width="100%" />
                <br />
              </Modal.Body>
            </Modal>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Index;
