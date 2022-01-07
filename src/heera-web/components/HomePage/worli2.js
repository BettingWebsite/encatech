import React, { Component } from "react";
import Nav from "../Include/Nav";
import Menu from "../Include/Menu";
import Footer from "../Include/footer";
import Sidebar from "../Include/Sidebar";
import Url from "../configure/configure.js";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Timer from "react-compound-timer";
import socketIOClient from "socket.io-client";
import Modal from "react-bootstrap-modal";
var CryptoJS = require("crypto-js");
const ENDPOINT = "http://172.105.40.76:4011";

const $ = window.$;
const baseUrl = Url.baseUrl;

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
  // getSecondLayLiability = () => {
  // 	if (this.state.getSecondBack === true) {
  // 		return (<tr style={{ background: "#BEDDF4" }}>
  // 			<td></td><td></td><td></td><td>Liability</td>
  // 			<td>{this.state.proFitsecondval}</td></tr>);
  // 	}
  // }

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
      event_name: "worli2",
      odds: this.state.oddVal,
      stake: this.state.stake_amount,
      event_id: this.state.mid,
      event_type: "worli2",
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
          axios.get(baseUrl + "/worli2", { headers }).then((resp) => {
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

    // axios.get(baseUrl + '/casino-result', { headers }).then((resp) => {
    // 	//console.log(resp.data.Betlist);
    // 	this.setState({casinoresult:resp.data.Betlist})
    // })
    //const { endpoint } = this.state;
    //const socket = socketIOClient(endpoint);

    //socket.on("FromAPI", data => console.log(this.sate.data));

    axios.get(baseUrl + "/worli2", { headers }).then((resp) => {
      this.setState({ casinoresult: resp.data.Betlist });
    });

    const socket = socketIOClient(ENDPOINT);
    socket.on("FromAPI11", (data) => {
      //setResponse(data);

      this.setState({ casinodt20: data.data1.data });
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
    console.log(data);

    const new_array = {};
    new_array["mid"] = data.data.t1[0].mid;
    new_array["autotime"] = data.data.t1[0].autotime;
    new_array["min"] = data.data.t1[0].min;
    new_array["max"] = data.data.t1[0].max;
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
    this.setState({ stake_amount: getAmount });
  };
  handleButtonsNewClick = (getAmount) => {
    this.setState({ stake_amount: getAmount });
  };
  handleBidClick = (team_name, rate, color) => {
    this.setState({ betClick: true, betClick1: false });
    this.setState({
      teamName: team_name,
      oddVal: rate,
      color: color,
    });
  };

  handleBidClickSession = (color, headname, no, marketId, SessInptNo, yes) => {
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
      for (var i = 0; i < this.state.casinodt20.t1.length; i++) {
        var result = "R";
        newarray.push(<span className="ball-runs ">{result}</span>);
      }
    }

    var timer = 0;
    var data = "";
    var suspendcaino1 = "m-b-10 main-market market-bf";

    if (this.state.autotime != 0 && this.state.autotime != undefined) {
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
    } else {
      var suspendcaino1 = "m-b-10 main-market market-bf suspended-casino";
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
                      <span className="card-header-title"> INSTANT WORLI</span>
                      <span className="float-right m-r-10">
                        Round ID: {new_mid} | Min: {this.state.min} | Max:{" "}
                        {this.state.max}
                      </span>
                    </div>
                    <div className="card-content">
                      <div className="casino_video">
                        <iframe
                          e
                          className="live_video"
                          height="315"
                          src={this.state.randomElement}
                          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                          allowfullscreen
                        />
                        <div className="timer_v">
                          <React.Fragment>{timer}</React.Fragment>
                        </div>
                      </div>
                      <div
                        className={suspendcaino1}
                        data-marketid="1.167146463"
                      >
                        <table className="coupon-table worli-table table table-bordered mb-0">
                          <thead>
                            <tr>
                              <th colspan="5" className="text-center card-odds">
                                <b>9</b>
                              </th>
                              <th colspan="2" className="text-center card-odds">
                                <b>9</b>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="text-center  box-w1 back">
                                {" "}
                                <button
                                  className="d-block card-number"
                                  onClick={this.handleBidClick.bind(
                                    this,
                                    "1 Single",
                                    "9",
                                    "#faa9ba"
                                  )}
                                >
                                  1
                                </button>
                              </td>
                              <td className="text-center  box-w1 back">
                                {" "}
                                <span
                                  onClick={this.handleBidClick.bind(
                                    this,
                                    "2 Single",
                                    "9",
                                    "#faa9ba"
                                  )}
                                  className="d-block card-number"
                                >
                                  2
                                </span>
                              </td>
                              <td className="text-center  box-w1 back">
                                {" "}
                                <span
                                  onClick={this.handleBidClick.bind(
                                    this,
                                    "3 Single",
                                    "9",
                                    "#faa9ba"
                                  )}
                                  className="d-block card-number"
                                >
                                  3
                                </span>
                              </td>
                              <td className="text-center  box-w1 back">
                                {" "}
                                <span
                                  onClick={this.handleBidClick.bind(
                                    this,
                                    "4 Single",
                                    "9",
                                    "#faa9ba"
                                  )}
                                  className="d-block card-number"
                                >
                                  4
                                </span>
                              </td>
                              <td className="text-center  box-w1 back">
                                {" "}
                                <span
                                  onClick={this.handleBidClick.bind(
                                    this,
                                    "5 Single",
                                    "9",
                                    "#faa9ba"
                                  )}
                                  className="d-block card-number"
                                >
                                  5
                                </span>
                              </td>

                              <td className="text-center  box-w1 back">
                                <button
                                  className="back"
                                  onClick={this.handleBidClick.bind(
                                    this,
                                    "Line 1",
                                    "9",
                                    "#faa9ba"
                                  )}
                                >
                                  {" "}
                                  <span className="odd layprice"> Line 1</span>
                                  1|2|3|4|5
                                </button>
                              </td>
                              <td className="text-center  box-w1 back">
                                <button
                                  className="back"
                                  onClick={this.handleBidClick.bind(
                                    this,
                                    "EVEN",
                                    "9",
                                    "#faa9ba"
                                  )}
                                >
                                  {" "}
                                  <span className="odd layprice">EVEN</span>
                                  1|3|5|7|9
                                </button>
                              </td>
                            </tr>
                            <tr>
                              <td className="text-center  box-w1 back">
                                {" "}
                                <span
                                  onClick={this.handleBidClick.bind(
                                    this,
                                    "Single 6",
                                    "9",
                                    "#faa9ba"
                                  )}
                                  className="d-block card-number"
                                >
                                  6
                                </span>
                              </td>
                              <td className="text-center  box-w1 back">
                                {" "}
                                <span
                                  onClick={this.handleBidClick.bind(
                                    this,
                                    "Single 7",
                                    "9",
                                    "#faa9ba"
                                  )}
                                  className="d-block card-number"
                                >
                                  7
                                </span>
                              </td>
                              <td className="text-center  box-w1 back">
                                {" "}
                                <span
                                  onClick={this.handleBidClick.bind(
                                    this,
                                    "Single 8",
                                    "9",
                                    "#faa9ba"
                                  )}
                                  className="d-block card-number"
                                >
                                  8
                                </span>
                              </td>
                              <td className="text-center  box-w1 back">
                                {" "}
                                <span
                                  onClick={this.handleBidClick.bind(
                                    this,
                                    "Single 9",
                                    "9",
                                    "#faa9ba"
                                  )}
                                  className="d-block card-number"
                                >
                                  9
                                </span>
                              </td>
                              <td className="text-center  box-w1 back">
                                {" "}
                                <span
                                  onClick={this.handleBidClick.bind(
                                    this,
                                    "Single 10",
                                    "9",
                                    "#faa9ba"
                                  )}
                                  className="d-block card-number"
                                >
                                  0
                                </span>
                              </td>
                              <td className="text-center  box-w1 back">
                                <button
                                  className="back"
                                  onClick={this.handleBidClick.bind(
                                    this,
                                    "Line 2",
                                    "9",
                                    "#faa9ba"
                                  )}
                                >
                                  {" "}
                                  <span className="odd layprice"> Line 2</span>
                                  6|7|8|9|0
                                </button>
                              </td>
                              <td className="text-center  box-w1 back">
                                <button
                                  className="back"
                                  onClick={this.handleBidClick.bind(
                                    this,
                                    "EVEN",
                                    "9",
                                    "#faa9ba"
                                  )}
                                >
                                  {" "}
                                  <span className="odd layprice"> EVEN</span>
                                  2|4|6|8|0
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="ander_bahar_marquee">
                        <marquee>welcome single</marquee>
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
              <Modal.Header>
                <Modal.Title>Rules</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <button
                  type="button"
                  className="btn btn-info"
                  data-dismiss="modal"
                  onClick={this.handleDepoWithdrPopupClose}
                >
                  <i className="fas fa-undo-alt"></i> Close
                </button>
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
