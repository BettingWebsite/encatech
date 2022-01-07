import React, { Component } from "react";
import Nav from "../Include/Nav";
import Url from "../configure/configure.js";
import axios from "axios";
import Modal from "react-bootstrap-modal";
import Moment from "moment";
import $ from "jquery";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Redirect } from "react-router-dom";
import { Collapse } from "react-bootstrap";
require("react-bootstrap-modal/lib/css/rbm-complete.css");
import "../Transactions/Transactions.css";
const baseUrl = Url.baseUrl;

class Index extends Component {
  constructor(props) {
    super(props);
    let accessToken = localStorage.getItem("token");
    let user_id = localStorage.getItem("user_id");
    this.state = {
      accessToken: accessToken,
      matchids: "",
      BatAmount_second: "",
      proFitfirstval: "",
      proFitsecondval: "",
      getFancybet: false,
      getFancySecondbet: false,
      stake_amount: "",
      respStatus: "",
      respMessage: "",
      emptyField: false,
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
      profit14: 0,
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
      bookmaker_team_a: "",
      no_data_model: "",
      color_data_model: "",
      showUserAmountPopup: false,
      key_index: "",
      bookmaker_draw: false,
      bookmakerFirstTeamFound: false,
      bookmakerSecondTeamFound: false,
      fancyMatchSuspend: false,
      oddsMatchSuspend: false,
      showVideo: false,
      showVideoFromAdmin: false,
      currentMatchId: this.props.match.params.id,
      getFancyResultsHide: "",
      showBookMakerLiveApiData: true,
      profit15: 0,
      profit16: 0,
      profit17: 0,
      Newdate: 0,
      buttonValue111: "",
      isLoading: false,
      gameID: "",
      gameName: "",
      bookmaker_d_back_1: "",
      bookmaker_d_lay_1: "",
      openTv: false,
    };
    this.emailInput = React.createRef();
  }


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
    let minusone = this.state.lastPriceTraded1 - 1;
    let multiplyval = minusone * buttonValue;
    let numValue = new Intl.NumberFormat("en-IN", {
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
    let minusone = this.state.lastPriceTraded2 - 1;
    let multiplyval = minusone * buttonValue;
    let numValue = new Intl.NumberFormat("en-IN", {
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
    let minusone = this.state.lastPriceTraded1 - 1;
    let multiplyval = minusone * buttonValue;
    let numValue = new Intl.NumberFormat("en-IN", {
      maximumSignificantDigits: 2,
    }).format(multiplyval);

    this.setState({
      amountFancybetFirst: buttonValue,
    });
  }
  onTestClickFancySecond(e) {
    e.preventDefault();
    const buttonValue = e.target.value;
    let minusone = this.state.lastPriceTraded1 - 1;
    let multiplyval = minusone * buttonValue;
    let numValue = new Intl.NumberFormat("en-IN", {
      maximumSignificantDigits: 2,
    }).format(multiplyval);

    this.setState({
      amountFancybetSecond: buttonValue,
    });
  }
  cancelCourse = () => {
    window.location = "/matchdetail/" + this.state.matchids;
  };

  handleSubmit = (event) => {
    this.setState({ isLoading: true });
    event.preventDefault();

    let headers = {
      Authorization: "Bearer " + this.state.accessToken,
    };

    let matchid = this.props.match.params.id;
    let compareMainAmount = "";
    let current_market_odds = "";
    let type = "unmatch";
    let betOn = this.state.betOn;
    if (this.state.betMatchType === "teamone" && this.state.type === "back") {
      compareMainAmount =
        betOn === "bookmaker"
          ? this.state.bookmaker_a_back_1
          : this.state.teamOneFirstBack;
      current_market_odds =
        betOn === "bookmaker"
          ? this.state.bookmaker_a_back_1
          : this.state.teamOneFirstBack;
    } else if (
      this.state.betMatchType === "teamone" &&
      this.state.type === "lay"
    ) {
      compareMainAmount =
        betOn === "bookmaker"
          ? this.state.bookmaker_a_lay_1
          : this.state.teamOneFirstLay;
      current_market_odds =
        betOn === "bookmaker"
          ? this.state.bookmaker_a_lay_1
          : this.state.teamOneFirstLay;
    } else if (
      this.state.betMatchType === "teamtwo" &&
      this.state.type === "back"
    ) {
      compareMainAmount =
        betOn === "bookmaker"
          ? this.state.bookmaker_b_back_1
          : this.state.teamTwoFirstBack;
      current_market_odds =
        betOn === "bookmaker"
          ? this.state.bookmaker_b_back_1
          : this.state.teamTwoFirstBack;
    } else if (
      this.state.betMatchType === "teamtwo" &&
      this.state.type === "lay"
    ) {
      compareMainAmount =
        betOn === "bookmaker"
          ? this.state.bookmaker_b_lay_1
          : this.state.teamTwoFirstLay;
      current_market_odds =
        betOn === "bookmaker"
          ? this.state.bookmaker_b_lay_1
          : this.state.teamTwoFirstLay;
    } else if (
      this.state.betMatchType === "draw" &&
      this.state.type === "back"
    ) {
      compareMainAmount =
        betOn === "bookmaker"
          ? this.state.bookmaker_d_back_1
          : this.state.drawFirstBack;
      current_market_odds =
        betOn === "bookmaker"
          ? this.state.bookmaker_d_back_1
          : this.state.drawFirstBack;
    } else if (
      this.state.betMatchType === "draw" &&
      this.state.type === "lay"
    ) {
      compareMainAmount =
        betOn === "bookmaker"
          ? this.state.bookmaker_d_lay_1
          : this.state.drawFirstLay;
      current_market_odds =
        betOn === "bookmaker"
          ? this.state.bookmaker_d_lay_1
          : this.state.drawFirstLay;
    }

    if (this.state.betOn === "manual_bookmaker") {
      if (this.state.betMatchType === "teamone" && this.state.type === "back") {
        compareMainAmount = this.state.bookMakerAdminData.first_team_back;
        current_market_odds = this.state.bookMakerAdminData.first_team_back;
      } else if (
        this.state.betMatchType === "teamone" &&
        this.state.type === "lay"
      ) {
        compareMainAmount = this.state.bookMakerAdminData.first_team_lay;
        current_market_odds = this.state.bookMakerAdminData.first_team_lay;
      } else if (
        this.state.betMatchType === "teamtwo" &&
        this.state.type === "back"
      ) {
        compareMainAmount = this.state.bookMakerAdminData.second_team_back;
        current_market_odds = this.state.bookMakerAdminData.second_team_back;
      } else if (
        this.state.betMatchType === "teamtwo" &&
        this.state.type === "lay"
      ) {
        compareMainAmount = this.state.bookMakerAdminData.second_team_lay;
        current_market_odds = this.state.bookMakerAdminData.second_team_lay;
      } else if (
        this.state.betMatchType === "draw" &&
        this.state.type === "back"
      ) {
        compareMainAmount = this.state.bookMakerAdminData.draw_back;
        current_market_odds = this.state.bookMakerAdminData.draw_back;
      } else if (
        this.state.betMatchType === "draw" &&
        this.state.type === "lay"
      ) {
        compareMainAmount = this.state.bookMakerAdminData.draw_lay;
        current_market_odds = this.state.bookMakerAdminData.draw_lay;
      }
    }

    if (compareMainAmount === this.state.oddVal) {
      type = "match";
    }

    let loss = "";
    let new_array = [];
    let loss_team = "";
    let newpath = 0;
    if (this.state.betMatchType == "teamone") {
      loss = this.state.stackAmount_team2;
      if (this.state.stackAmount_team2 !== undefined) {
        newpath = Math.abs(this.state.stackAmount_team2);
      }

      loss_team = "teamtwo";
    }
    if (this.state.betMatchType == "teamtwo") {
      loss = this.state.stackAmount_team1;
      if (this.state.stackAmount_team1 !== undefined) {
        newpath = Math.abs(this.state.stackAmount_team1);
      }

      loss_team = "teamone";
    }

    if (isNaN(parseInt(this.state.oddVal)) || this.state.oddVal <= 0) {
      this.setState({ emptyField: true, errMsg: "Enter Valid Odds" });
      return false;
    }
    if (
      isNaN(parseInt(this.state.stake_amount)) ||
      this.state.stake_amount <= 0
    ) {
      this.setState({ emptyField: true, errMsg: "Enter Stake" });
      return false;
    }
    if (this.state.betOn == "bookmaker") {
      let data123 = this.state.oddVal;
      if (Number.isInteger(parseFloat(this.state.oddVal)) == true) {
        let data123 = parseFloat(this.state.oddVal) / parseFloat(100);
        data123 = parseFloat(1) + data123;
      } else {
        let data123 = parseFloat(this.state.oddVal) - parseFloat(1);
      }
    } else {
      let data123 = this.state.oddVal;
    }
    let exposure = 0;
    if (Math.sign(this.state.team_profit1) == -1) {
      exposure = this.state.team_profit1;
    }
    if (Math.sign(this.state.team_profit2) == -1) {
      exposure = this.state.team_profit2;
    }

    if (Math.sign(this.state.team_profit3) == -1) {
      exposure = this.state.team_profit3;
    }

    if (Math.sign(this.state.stackAmount_team1) == -1) {
      exposure = this.state.stackAmount_team1;
    }
    if (Math.sign(this.state.stackAmount_team2) == -1) {
      exposure = this.state.stackAmount_team2;
    }
    if (Math.sign(this.state.stackAmount_team3) == -1) {
      exposure = this.state.stackAmount_team3;
    }

    if (Math.sign(this.state.team_profit4) == -1) {
      exposure = this.state.team_profit4;
    }
    if (Math.sign(this.state.team_profit5) == -1) {
      exposure = this.state.team_profit5;
    }

    if (Math.sign(this.state.team_profit6) == -1) {
      exposure = this.state.team_profit6;
    }

    if (Math.sign(this.state.stackAmount_team4) == -1) {
      exposure = this.state.stackAmount_team4;
    }
    if (Math.sign(this.state.stackAmount_team5) == -1) {
      exposure = this.state.stackAmount_team5;
    }
    if (Math.sign(this.state.stackAmount_team6) == -1) {
      exposure = this.state.stackAmount_team6;
    }

    let savebet = {
      event_id: this.props.match.params.id,
      event_name: this.state.eventName,
      // odds: parseFloat(data123).toFixed(0),
      odds: this.state.oddVal,
      stake: this.state.stake_amount,
      profit: this.state.profit,
      bet_type: this.state.type,
      type: type,
      team_name: this.state.teamName,
      selection_id: this.state.betSelectionId,
      market_id: this.state.betMarketId,
      current_market_odds: current_market_odds,
      profit_team: this.state.betMatchType,
      loss_team: loss_team,
      loss: newpath,
      color: this.state.color,
      event_type: this.props.match.params.id1,
      type1: "odds",
      bet_on: this.state.betOn,
      exposure: exposure,
    };


    $(".blockUI").show();

    setTimeout(
      () =>
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
                stackAmount_team3: "",
                team_profit3: "",
                stackAmount_team4: "",
                stackAmount_team5: "",
                stackAmount_team6: "",
                team_profit4: "",
                team_profit5: "",
                team_profit6: "",
              });
              this.showTableHtml();
              $(".blockUI").hide();
              setTimeout(() => {
                this.setState({
                  respStatus: "",
                  betClick1: false,
                  betClick: false,
                  betClick2: false,
                });
              }, 3000);
            } else {
              this.setState({
                respStatus: resp.success,
                respMessage: resp.message,
              });
              $(".blockUI").hide();
              setTimeout(() => {
                this.setState({
                  respStatus: "",
                  betClick1: false,
                  betClick: false,
                  betClick2: false,
                });
              }, 3000);
            }
            this.callUserBetListApi();
            $(".blockUI").hide();
          }),
      1000
    );

    this.setState({ isLoading: false });
  };
  handleSubmitSession = (event) => {
    this.setState({ isLoading: true });
    event.preventDefault();
    let headers = {
      Authorization: "Bearer " + this.state.accessToken,
    };

    let matchid = this.props.match.params.id;
    let yes_amount = "";
    let no_amount = "";
    let new_value = "";

    let no_amount1 = "";
    if (this.state.no === "no") {
      new_value = this.state.session_input;
      no_amount = this.state.session_input;
      let no_amount1 = this.state.no;
    }
    if (this.state.no === "yes") {
      new_value = this.state.session_input;
      no_amount = this.state.session_input;
      let no_amount1 = this.state.no;
    }
    let exposure = "-" + this.state.stake_amount;

    let savebet = {
      event_id: this.props.match.params.id,
      event_name: this.state.eventName,
      yes: this.state.yes,
      no: no_amount1,
      market_id: this.state.betMarketId,
      type: "match",
      no_amount: this.state.session_input,
      stake: this.state.stake_amount,
      headname: this.state.headname,
      team_name: this.state.headname,
      odds: new_value,
      bet_type: "fancy",
      color: this.state.color,
      key_index: this.state.key_index,
      event_type: this.props.match.params.id,
      type1: "fancy",
      yes_no_stake: this.state.yes_no_STAKE,
      bet_on: "fancy",
      lay_price: this.state.layPrice,
      lay_size: this.state.laySize,
      back_price: this.state.backPrice,
      back_size: this.state.backSize,
      exposure: exposure,
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
          this.showTableHtml();
          setTimeout(() => {
            this.setState({
              respStatus: "",
              betClick1: false,
              betClick: false,
            });
          }, 6000);
        } else {
          this.setState({
            respStatus: resp.success,
            respMessage: resp.message,
          });
          setTimeout(() => {
            this.setState({
              respStatus: "",
              betClick1: false,
              betClick: false,
            });
          }, 6000);
        }
        this.callUserBetListApi();
      });
    this.setState({ isLoading: false });
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
      color: this.state.color,
      event_type: this.props.match.params.id1,
      type1: "bookmaker",
    };
    let headers = {
      Authorization: "Bearer " + this.state.accessToken,
    };
    axios
      .post(baseUrl + "/createbetuser", savebet, { headers })
      .then((resp) => {
        if (resp.data.success !== false) {
          this.setState({
            respStatus: resp.success,
            stake_amount: "",
            profit4: "",
            team_profit1: "",
            stackAmount_team4: "",
            team_profit5: "",
            stackAmount_team5: "",
            stackAmount_team6: "",
            team_profit6: "",
          });
          setTimeout(() => {
            this.setState({
              respStatus: "",
              betClick1: false,
              betClick: false,
            });
          }, 6000);
          window.location.href = "/matchdetail/" + resp.data.result.matchids;
        } else {
          this.setState({
            respMessage: resp.data.message,
          });
          setTimeout(() => {
            this.setState({
              respStatus: "",
              betClick1: false,
              betClick: false,
            });
          }, 6000);
        }
      });
  };

  componentDidMount() {
    let gameID = this.props.match.params.id;
    let gameName = this.props.match.params.id1;
    this.setState({ isLoading: true, gameID, gameName });
    let headers = {
      Authorization: "Bearer " + this.state.accessToken,
    };
    if (this.props.location.state !== undefined) {
      const { Newdate } = this.props.location.state;

      localStorage.setItem("mytime", Newdate);
      this.setState({ Newdate111: Newdate });
    } else {
      let Newdate111 = localStorage.getItem("mytime");
      this.setState({ Newdate111: Newdate111 });
    }
    this.getOddsValue();
    this.interval = setInterval(() => {
      this.getOddsValue();
    }, 2000);
    axios.get(baseUrl + "/button_value", { headers }).then((resp) => {
      var resps = resp.data;

      if (resps.success === true) {
        this.setState({ buttonValue111: resps.value });
      }
    });
    this.callUserBetListApi();
    this.callFancyListApi();
  }
  getOddsValue() {
    const data =
    {
      match_id: this.props.match.params.id,
      sport_type: this.props.match.params.id1
    }
    let headers = {
      Authorization: "Bearer " + this.state.accessToken,
    };
    axios.post("http://api.encabook999.com/match_odds/", data, { headers }).then((resp) => {
      if (resp) {
        this.setState({ isLoading: true });
        this.callMatchOddsApi(
          resp.data,
        );
      }
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  callFancyListApi = () => {
    let headers = {
      Authorization: "Bearer " + this.state.accessToken,
    };

    let matchid = this.props.match.params.id;
    // this.callMatchOddsApi()
    axios.get(baseUrl + "/fancyapi/" + matchid, { headers }).then((resp) => {
      let matchSuspendFromAdmin = resp.data.suspendcount === 0 ? false : true;
      this.setState({
        getFancyResults: resp.data.alldata.data,
        fancyDataFound: true,
        fancyMatchSuspend: matchSuspendFromAdmin,
      });
    });
    $(".blockUI").hide();
  };
  handleModelShow = (id, no, yes, no_stake, yes_stake) => {
    let headers = {
      Authorization: "Bearer " + this.state.accessToken,
    };
    let savebet = {
      match_id: this.props.match.params.id,
      match_name: id,
    };
    axios.post(baseUrl + "/userbetdata", savebet, { headers }).then((resp) => {
      this.setState({ no_data_model: resp, showUserAmountPopup: true });
    });
  };

  showFancyApiHtml = () => {
    if (this.state.fancyDataFound === true) {
      const html = [];
      let new_array = [];
      let new_array1 = [];
      let new_array2 = [];

      if (this.state.getResults !== undefined) {
        for (let i = 0; i < this.state.getResults.length; i++) {
          if (this.state.getResults[i].bet_type == "fancy") {
            if (
              this.state.getResults[i].key_index !== null &&
              this.state.getResults[i].key_index !== undefined
            ) {
              new_array[
                this.state.getResults[i].key_index
              ] = this.state.getResults[i].key_index;
              new_array1[
                this.state.getResults[i].key_index
              ] = this.state.getResults[i].stake;
              new_array2[
                this.state.getResults[i].key_index
              ] = this.state.getResults[i]._id;
            }
          }
        }
      }

      if (this.state.getFancyResultsHide !== undefined) {
        let index = 0;
        let i = 0;
        let hideMatchArr1 = ["demo"];
        if (this.state.getFancyResultsHide !== null) {
          if (
            this.state.getFancyResultsHide !== undefined &&
            this.state.getFancyResultsHide !== null &&
            this.state.getFancyResultsHide !== ""
          ) {
            for (let bn = 0; bn < this.state.getFancyResultsHide.length; bn++) {
              if (
                this.state.getFancyResultsHide[bn].hide == "suspended" ||
                this.state.getFancyResultsHide[bn].hide == "suspend"
              ) {
                hideMatchArr1.push(
                  this.state.getFancyResultsHide[bn].market_id
                );
              }
            }
          }
        }

        if (this.state.getFancyResults !== undefined) {
          for (let fancyNewData of Object.values(this.state.getFancyResults)) {
            let blockHtml = "";
            if (hideMatchArr1.indexOf(fancyNewData.market_id) !== "-1") {
              let blockHtml = (
                <div className="bet-info suspendedfancy row">
                  <span>SUSPENDED</span>
                </div>
              );
            }

            let new_value = "";
            let new_value1 = "";

            if (
              this.state.fancyMatchSuspend &&
              hideMatchArr1.indexOf(fancyNewData.market_id) == "-1"
            ) {
              let blockHtml = (
                <div className="bet-info suspendedfancy row">
                  <span>SUSPENDED</span>
                </div>
              );
            } else if (hideMatchArr1.indexOf(fancyNewData.market_id) == "-1") {
              let blockHtml =
                fancyNewData.DisplayMsg !== "" ? (
                  <div className="bet-info suspendedfancy row">
                    <span>{fancyNewData.DisplayMsg}</span>
                  </div>
                ) : (
                  ""
                );
            }

            if (fancyNewData.market_id == new_array[fancyNewData.market_id]) {
              if (
                fancyNewData.SessInptNo !== undefined &&
                fancyNewData.SessInptYes !== undefined
              ) {
                //if(fancyNewData.DisplayMsg!="SUSPENDED"){
                html.push(
                  <tr>
                    <td className="fb_64">
                      <a href="#">
                        {" "}
                        {fancyNewData.headname}
                        &nbsp;(-{new_array1[fancyNewData.market_id]} )
                      </a>
                      <button
                        className="tableman_btn"
                        onClick={this.handleModelShow.bind(
                          this,
                          fancyNewData.market_id,
                          fancyNewData.SessInptNo,
                          fancyNewData.SessInptYes
                        )}
                      >
                        Book
                      </button>
                    </td>
                    <td className="box-w1 bglay fb_td">
                      {blockHtml}
                      <button
                        className="bet-sec lay"
                        value={i}
                        onClick={this.handleBidClickSession.bind(
                          this,
                          "#faa9ba",
                          fancyNewData.headname,
                          "no",
                          this.state.marketId,
                          fancyNewData.SessInptNo,
                          "",
                          fancyNewData.market_id
                        )}
                      >
                        <span className="odd layprice">
                          {" "}
                          {fancyNewData.SessInptNo}
                        </span>
                        {fancyNewData.NoValume}
                      </button>
                    </td>

                    <td className="box-w1 bgback fb_td">
                      <button
                        value={i}
                        onClick={this.handleBidClickSession.bind(
                          this,
                          "#72bbef",
                          fancyNewData.headname,
                          "yes",
                          this.state.marketId,
                          fancyNewData.SessInptYes,
                          "",
                          fancyNewData.market_id
                        )}
                        className="bet-sec lay"
                      >
                        <span className="odd layprice">
                          {" "}
                          {fancyNewData.SessInptYes}
                        </span>
                        {fancyNewData.YesValume}
                      </button>
                    </td>

                    <td className="fb_td" style={{ textAlign: "center" }}>
                      {" "}
                      Min <br /> Max 10000
                    </td>
                  </tr>
                );
                //}
              }
            } else {
              if (
                fancyNewData.SessInptNo !== undefined &&
                fancyNewData.SessInptYes !== undefined
              ) {
                //if(fancyNewData.DisplayMsg!="SUSPENDED"){
                html.push(
                  <tr>
                    <td className="fb_64"> {fancyNewData.headname}</td>
                    <td className="box-w1 bglay">
                      {" "}
                      {blockHtml}
                      <button
                        className="bet-sec lay"
                        value={i}
                        onClick={this.handleBidClickSession.bind(
                          this,
                          "#faa9ba",
                          fancyNewData.headname,
                          "no",
                          this.state.marketId,
                          fancyNewData.SessInptNo,
                          "",
                          fancyNewData.market_id,
                          fancyNewData.SessInptYes
                        )}
                      >
                        <span className="odd layprice">
                          {" "}
                          {fancyNewData.SessInptNo}
                        </span>
                        {fancyNewData.NoValume}
                      </button>
                    </td>

                    <td className="box-w1 bgback fb_td">
                      <button
                        value={i}
                        onClick={this.handleBidClickSession.bind(
                          this,
                          "#72bbef",
                          fancyNewData.headname,
                          "yes",
                          this.state.marketId,
                          fancyNewData.SessInptYes,
                          "",
                          fancyNewData.market_id,
                          fancyNewData.SessInptNo
                        )}
                        className="bet-sec lay"
                      >
                        <span className="odd layprice">
                          {" "}
                          {fancyNewData.SessInptYes}
                        </span>
                        {fancyNewData.YesValume}
                      </button>
                    </td>

                    <td className="fb_td" style={{ textAlign: "center" }}>
                      {" "}
                      Min {this.state.min_fancy_limit} <br /> Max 10000
                      {/* {this.state.max_fancy_limit}{" "} */}
                    </td>
                  </tr>
                );
                //}
              }
            }
            index++;
            i++;
          }
        }
      }

      return (
        <table className="coupon-table table table-bordered">
          <thead>
            <tr>
              <th> &nbsp;</th>
              <th className="text-center  box-w1 lay"> No </th>
              <th
                className="text-center  box-w1 back"
                style={{ backgroundColor: "#72BBEF" }}
              >
                {" "}
                Yes{" "}
              </th>
              <th className="box-w2"> &nbsp; </th>
            </tr>
          </thead>
          <tbody>{html}</tbody>
        </table>
      );
    }
  };

  callUserBetListApi = () => {
    let headers = {
      Authorization: "Bearer " + this.state.accessToken,
    };

    let matchid = this.props.match.params.id;
    // this.callMatchOddsApi()
    axios.get(baseUrl + "/userbetlist/" + matchid, { headers }).then((resp) => {
      var resps = resp.data;
      let profit12 = 0;
      let profit13 = 0;
      if (resps.success === true) {
        this.setState({ getResults: resps.Betlist, betDataFound: true });
      }
    });
  };

  callMatchOddsApi = (
    data
  ) => {
    const { eventName } = this.state;
    if (data.session !== undefined) {
      let myFancy = data.session.filter(item => item.GameStatus !== "OFFLINE" && item.GameStatus !== "CLOSED")
      this.setState({ sessiondata: myFancy });
    }
    this.setState({
      eventName: data && data.market[0] && data.market[0].events[0] && data.market[0].events[0].RunnerName ? data.market[0].events[0].RunnerName : null +
        " v " +
        data && data.market[0] && data.market[0].events[1] && data.market[0].events[1].RunnerName ? data.market[0].events[1].RunnerName : null,
      marketId: data && data.market[0] && data.market[0].marketId ? data.market[0].marketId : null,
      firstTeamName: data.market[0] && data.market[0].events[0] && data.market[0].events[0].RunnerName ? data.market[0].events[0].RunnerName : null,
      secondTeamName: data.market[0] && data.market[0].events[0] && data.market[0].events[1].RunnerName ? data.market[0].events[1].RunnerName : null,
      teamOneSelectionId: data.market[0] && data.market[0].events[0] && data.market[0].events[1].RunnerName ? data.market[0].events[1].RunnerName : null,

      teamOneFirstBack: data.market[0] && data.market[0].events[0] && data.market[0].events[0].BackPrice1 ? data.market[0].events[0].BackPrice1 : 0,

      teamOneFirstBackSize: data.market[0] && data.market[0].events[0] && data.market[0].events[0].BackSize1 ? data.market[0].events[0].BackSize1 : 0,

      teamOneMiddleBack: data.market[0] && data.market[0].events[0] && data.market[0].events[0].BackPrice2 ? data.market[0].events[0].BackPrice2 : 0,

      teamOneMiddleBackSize: data.market[0] && data.market[0].events[0] && data.market[0].events[0].BackSize2 ? data.market[0].events[0].BackSize2 : 0,

      teamOneLastBack: data.market[0] && data.market[0].events[0] && data.market[0].events[0].BackPrice3 ? data.market[0].events[0].BackPrice3 : 0,

      teamOneLastBackSize: data.market[0] && data.market[0].events[0] && data.market[0].events[0].BackSize3 ? data.market[0].events[0].BackSize3 : 0,

      teamOneFirstLay: data.market[0] && data.market[0].events[0] && data.market[0].events[0].LayPrice1 ? data.market[0].events[0].LayPrice1 : 0,

      teamOneFirstLaySize: data.market[0] && data.market[0].events[0] && data.market[0].events[0].LaySize1 ? data.market[0].events[0].LaySize1 : 0,

      teamOneMiddleLay: data.market[0] && data.market[0].events[0] && data.market[0].events[0].LayPrice2 ? data.market[0].events[0].LayPrice2 : 0,

      teamOneMiddleLaySize: data.market[0] && data.market[0].events[0] && data.market[0].events[0].LaySize2 ? data.market[0].events[0].LaySize2 : 0,

      teamOneLastLay: data.market[0] && data.market[0].events[0] && data.market[0].events[0].LayPrice3 ? data.market[0].events[0].LayPrice3 : 0,

      teamOneLastLaySize: data.market[0] && data.market[0].events[0] && data.market[0].events[0].LaySize3 ? data.market[0].events[0].LaySize3 : 0,
    })

    if (this.state.teamOneFirstBack !== data.market[0].events[0].BackPrice1) {
      $("#blockin1").css("transition", "1s");
      $("#blockin1").css("background", "#ffc107");
      setTimeout(function () {
        $("#blockin1").css("background", "#b2d6f0");
      }, 400);
    }

    if (
      this.state.teamOneFirstBackSize !== data.market[0].events[0].BackSize1
    ) {
      $("#blockin1").css("transition", "1s");
      $("#blockin1").css("background", "#ffc107");
      setTimeout(function () {
        $("#blockin1").css("background", "#b2d6f0");
      }, 400);
    }
    if (this.state.teamOneMiddleBack !== data.market[0].events[0].BackPrice2) {
      $("#blockin2").css("transition", "1s");
      $("#blockin2").css("background", "#ffc107");
      setTimeout(function () {
        $("#blockin2").css("background", "#92c9f0");
      }, 400);
    }

    if (
      this.state.teamOneMiddleBackSize !== data.market[0].events[0].BackSize2
    ) {
      $("#blockin2").css("transition", "1s");
      $("#blockin2").css("background", "#ffc107");
      setTimeout(function () {
        $("#blockin2").css("background", "#92c9f0");
      }, 400);
    }
    if (this.state.teamOneLastBack !== data.market[0].events[0].BackPrice3) {
      $("#blockin3").css("transition", "1s");
      $("#blockin3").css("background", "#ffc107");
      setTimeout(function () {
        $("#blockin3").css("background", "#72bbef");
      }, 400);
    }

    if (this.state.teamOneLastBackSize !== data.market[0].events[0].BackSize3) {
      $("#blockin3").css("transition", "1s");
      $("#blockin3").css("background", "#ffc107");
      setTimeout(function () {
        $("#blockin3").css("background", "#72bbef");
      }, 400);
    }

    if (this.state.teamOneFirstLay !== data.market[0].events[0].LayPrice1) {
      $("#blockin4").css("transition", "1s");
      $("#blockin4").css("background", "#ffc107");
      setTimeout(function () {
        $("#blockin4").css("background", "#faa9ba");
      }, 400);
    }
    if (this.state.teamOneFirstLaySize !== data.market[0].events[0].LaySize1) {
      $("#blockin4").css("transition", "1s");
      $("#blockin4").css("background", "#ffc107");
      setTimeout(function () {
        $("#blockin4").css("background", "#faa9ba");
      }, 400);
    }


    if (this.state.teamOneMiddleLay !== data.market[0].events[0].LayPrice2) {
      $("#blockin5").css("transition", "1s");
      $("#blockin5").css("background", "#ffc107");
      setTimeout(function () {
        $("#blockin5").css("background", "#f8bbc8");
      }, 400);
    }

    if (this.state.teamOneMiddleLay !== data.market[0].events[0].LaySize2) {
      $("#blockin5").css("transition", "1s");
      $("#blockin5").css("background", "#ffc107");
      setTimeout(function () {
        $("#blockin5").css("background", "#f8bbc8");
      }, 400);
    }

    if (this.state.teamOneLastLay !== data.market[0].events[0].LayPrice3) {
      $("#blockin6").css("transition", "1s");
      $("#blockin6").css("background", "#ffc107");
      setTimeout(function () {
        $("#blockin6").css("background", "#f6cdd6");
      }, 400);
    }


    if (this.state.teamOneLastLaySize != data.market[0].events[0].LaySize3) {
      $("#blockin6").css("transition", "1s");
      $("#blockin6").css("background", "#ffc107");
      setTimeout(function () {
        $("#blockin6").css("background", "#f6cdd6");
      }, 400);
    }


    this.setState({
      teamTwoFirstBack: data.market[0] && data.market[0].events[1] && data.market[0].events[1].BackPrice1 ? data.market[0].events[1].BackPrice1 : 0,

      teamTwoFirstBackSize: data.market[0] && data.market[0].events[1] && data.market[0].events[1].BackSize1 ? data.market[0].events[1].BackSize1 : 0,

      teamTwoMiddleBack: data.market[0] && data.market[0].events[1] && data.market[0].events[1].BackPrice2 ? data.market[0].events[1].BackPrice2 : 0,

      teamTwoMiddleBackSize: data.market[0] && data.market[0].events[1] && data.market[0].events[1].BackSize2 ? data.market[0].events[1].BackSize2 : 0,

      teamTwoLastBack: data.market[0] && data.market[0].events[1] && data.market[0].events[1].BackPrice3 ? data.market[0].events[1].BackPrice3 : 0,

      teamTwoLastBackSize: data.market[0] && data.market[0].events[1] && data.market[0].events[1].BackSize3 ? data.market[0].events[1].BackSize3 : 0,

      teamTwoFirstLay: data.market[0] && data.market[0].events[1] && data.market[0].events[1].LayPrice1 ? data.market[0].events[1].LayPrice1 : 0,

      teamTwoFirstLaySize: data.market[0] && data.market[0].events[1] && data.market[0].events[1].LaySize1 ? data.market[0].events[1].LaySize1 : 0,

      teamTwoMiddleLay: data.market[0] && data.market[0].events[1] && data.market[0].events[1].LayPrice2 ? data.market[0].events[1].LayPrice2 : 0,

      teamTwoMiddleLaySize: data.market[0] && data.market[0].events[1] && data.market[0].events[1].LaySize2 ? data.market[0].events[1].LaySize2 : 0,

      teamTwoLastLay: data.market[0] && data.market[0].events[1] && data.market[0].events[1].LayPrice3 ? data.market[0].events[1].LayPrice3 : 0,

      teamTwoLastLaySize: data.market[0] && data.market[0].events[1] && data.market[0].events[1].LaySize3 ? data.market[0].events[1].LaySize3 : 0,
    })

    if (this.state.teamTwoFirstBack !== data.market[0].events[1].BackPrice1) {
      $("#blockin7").css("transition", "1s");
      $("#blockin7").css("background", "#ffc107");
      setTimeout(function () {
        $("#blockin7").css("background", "#b2d6f0");
      }, 400);
    }
    if (
      this.state.teamTwoFirstBackSize !== data.market[0].events[1].BackSize1
    ) {
      $("#blockin7").css("transition", "1s");
      $("#blockin7").css("background", "#ffc107");
      setTimeout(function () {
        $("#blockin7").css("background", "#b2d6f0");
      }, 400);
    }

    if (this.state.teamTwoMiddleBack !== data.market[0].events[1].BackPrice2) {
      $("#blockin8").css("transition", "1s");
      $("#blockin8").css("background", "#ffc107");
      setTimeout(function () {
        $("#blockin8").css("background", "#92c9f0");
      }, 400);
    }


    if (
      this.state.teamTwoMiddleBackSize !== data.market[0].events[1].BackSize2
    ) {
      $("#blockin8").css("transition", "1s");
      $("#blockin8").css("background", "#ffc107");
      setTimeout(function () {
        $("#blockin8").css("background", "#92c9f0");
      }, 400);
    }

    if (this.state.teamTwoLastBack !== data.market[0].events[1].BackPrice3) {
      $("#blockin9").css("transition", "1s");
      $("#blockin9").css("background", "#ffc107");
      setTimeout(function () {
        $("#blockin9").css("background", "#72bbef");
      }, 400);
    }
    if (this.state.teamTwoLastBackSize !== data.market[0].events[1].BackSize3) {
      $("#blockin9").css("transition", "1s");
      $("#blockin9").css("background", "#ffc107");
      setTimeout(function () {
        $("#blockin9").css("background", "#72bbef");
      }, 400);
    }

    this.state.teamTwoFirstLay = data.market[0].events[1].LayPrice1;
    if (this.state.teamTwoFirstLay !== data.market[0].events[1].LayPrice1) {
      $("#blockin10").css("transition", "1s");
      $("#blockin10").css("background", "#ffc107");
      setTimeout(function () {
        $("#blockin10").css("background", "#faa9ba");
      }, 400);
    }

    this.state.teamTwoFirstLaySize = data.market[0].events[1].LaySize1;
    if (this.state.teamTwoFirstLaySize !== data.market[0].events[1].LaySize1) {
      $("#blockin10").css("transition", "1s");
      $("#blockin10").css("background", "#ffc107");
      setTimeout(function () {
        $("#blockin10").css("background", "#faa9ba");
      }, 400);
    }
    this.state.teamTwoMiddleLay = data.market[0].events[1].LayPrice2;
    if (this.state.teamTwoMiddleLay !== data.market[0].events[1].LayPrice2) {
      $("#blockin11").css("transition", "1s");
      $("#blockin11").css("background", "#ffc107");
      setTimeout(function () {
        $("#blockin11").css("background", "#f8bbc8");
      }, 400);
    }
    this.state.teamTwoMiddleLaySize = data.market[0].events[1].LaySize2;

    if (this.state.teamTwoFirstLaySize !== data.market[0].events[1].LaySize2) {
      $("#blockin11").css("transition", "1s");
      $("#blockin11").css("background", "#ffc107");
      setTimeout(function () {
        $("#blockin11").css("background", "#f8bbc8");
      }, 400);
    }
    this.state.teamTwoLastLay = data.market[0].events[1].LayPrice3;
    if (this.state.teamTwoLastLay !== data.market[0].events[1].LayPrice3) {
      $("#blockin12").css("transition", "1s");
      $("#blockin12").css("background", "#ffc107");
      setTimeout(function () {
        $("#blockin12").css("background", "#f6cdd6");
      }, 400);
    }
    this.state.teamTwoLastLaySize = data.market[0].events[1].LaySize3;
    if (this.state.teamTwoLastLaySize !== data.market[0].events[1].LaySize3) {
      $("#blockin12").css("transition", "1s");
      $("#blockin12").css("background", "#ffc107");
      setTimeout(function () {
        $("#blockin12").css("background", "#f6cdd6");
      }, 400);
    }
    if (data.market[0].events[2] !== undefined) {
      this.setState({
        draw: true,
        drawTeamName: data.market[0] && data.market[0].events[2] && data.market[0].events[2].RunnerName ? data.market[0].events[2].RunnerName : null,
        drawFirstBack: data.market[0] && data.market[0].events[2] && data.market[0].events[2].BackPrice1 ? data.market[0].events[2].BackPrice1 : 0,

        drawFirstBackSize: data.market[0] && data.market[0].events[2] && data.market[0].events[2].BackSize1 ? data.market[0].events[2].BackSize1 : 0,

        drawMiddleBack: data.market[0] && data.market[0].events[2] && data.market[0].events[2].BackPrice2 ? data.market[0].events[2].BackPrice2 : 0,

        drawMiddleBackSize: data.market[0] && data.market[0].events[2] && data.market[0].events[2].BackSize2 ? data.market[0].events[2].BackSize2 : 0,

        drawLastBack: data.market[0] && data.market[0].events[2] && data.market[0].events[2].BackPrice3 ? data.market[0].events[2].BackPrice3 : 0,

        drawLastBackSize: data.market[0] && data.market[0].events[2] && data.market[0].events[2].BackSize3 ? data.market[0].events[2].BackSize3 : 0,

        drawFirstLay: data.market[0] && data.market[0].events[2] && data.market[0].events[2].LayPrice1 ? data.market[0].events[2].LayPrice1 : 0,

        drawFirstLaySize: data.market[0] && data.market[0].events[2] && data.market[0].events[2].LaySize1 ? data.market[0].events[2].LaySize1 : 0,

        drawMiddleLay: data.market[0] && data.market[0].events[2] && data.market[0].events[2].LayPrice2 ? data.market[0].events[2].LayPrice2 : 0,

        drawMiddleLaySize: data.market[0] && data.market[0].events[2] && data.market[0].events[2].LaySize2 ? data.market[0].events[2].LaySize2 : 0,

        drawLastLay: data.market[0] && data.market[0].events[2] && data.market[0].events[2].LayPrice3 ? data.market[0].events[2].LayPrice3 : 0,

        drawLastLaySize: data.market[0] && data.market[0].events[2] && data.market[0].events[2].LaySize3 ? data.market[0].events[2].LaySize3 : 0,
      })
    }

    if (
      data.bookmake[0].runners !== undefined &&
      data.bookmake[0].runners !== "Not Found"
    )
      this.setState({
        bookmakerFirstTeamFound: true,
        bookmaker_team1_status: data.bookmake[0] && data.bookmake[0].runners[0] && data.bookmake[0].runners[0].GameStatus ? data.bookmake[0].runners[0].GameStatus : null,
        bookmaker_team1: data.bookmake[0] && data.bookmake[0].runners[0] && data.bookmake[0].runners[0].RunnerName ? data.bookmake[0].runners[0].RunnerName : null,
        bookmaker_a_back_1: data.bookmake[0] && data.bookmake[0].runners[0] && data.bookmake[0].runners[0].BackPrice1 ? data.bookmake[0].runners[0].BackPrice1 : 0,
        bookmaker_a_back_2: data.bookmake[0] && data.bookmake[0].runners[0] && data.bookmake[0].runners[0].BackPrice2 ? data.bookmake[0].runners[0].BackPrice2 : 0,
        bookmaker_a_back_3: data.bookmake[0] && data.bookmake[0].runners[0] && data.bookmake[0].runners[0].BackPrice3 ? data.bookmake[0].runners[0].BackPrice3 : 0,
        bookmaker_a_lay_1: data.bookmake[0] && data.bookmake[0].runners[0] && data.bookmake[0].runners[0].LayPrice1 ? data.bookmake[0].runners[0].LayPrice1 : 0,
        bookmaker_a_lay_2: data.bookmake[0] && data.bookmake[0].runners[0] && data.bookmake[0].runners[0].LayPrice2 ? data.bookmake[0].runners[0].LayPrice2 : 0,
        bookmaker_a_lay_3: data.bookmake[0] && data.bookmake[0].runners[0] && data.bookmake[0].runners[0].LayPrice3 ? data.bookmake[0].runners[0].LayPrice3 : 0,
      })

    if (data.bookmake[0] && data.bookmake[0].runners[1] !== undefined) {
      this.setState({

        bookmaker_draw: true,
        bookmakerSecondTeamFound: true,
        bookmaker_team2_status: data.bookmake[0] && data.bookmake[0].runners[1] && data.bookmake[0].runners[1].GameStatus ? data.bookmake[0].runners[1].GameStatus : null,
        bookmaker_team2: data.bookmake[0] && data.bookmake[0].runners[1] && data.bookmake[0].runners[1].RunnerName ? data.bookmake[0].runners[1].RunnerName : null,
        bookmaker_b_back_1: data.bookmake[0] && data.bookmake[0].runners[1] && data.bookmake[0].runners[1].BackPrice1 ? data.bookmake[0].runners[1].BackPrice1 : 0,
        bookmaker_b_back_2: data.bookmake[0] && data.bookmake[0].runners[1] && data.bookmake[0].runners[1].BackPrice2 ? data.bookmake[0].runners[1].BackPrice2 : 0,
        bookmaker_b_back_3: data.bookmake[0] && data.bookmake[0].runners[1] && data.bookmake[0].runners[1].BackPrice3 ? data.bookmake[0].runners[1].BackPrice3 : 0,
        bookmaker_b_lay_1: data.bookmake[0] && data.bookmake[0].runners[1] && data.bookmake[0].runners[1].LayPrice1 ? data.bookmake[0].runners[1].LayPrice1 : 0,
        bookmaker_b_lay_2: data.bookmake[0] && data.bookmake[0].runners[1] && data.bookmake[0].runners[1].LayPrice2 ? data.bookmake[0].runners[1].LayPrice2 : 0,
        bookmaker_b_lay_3: data.bookmake[0] && data.bookmake[0].runners[1] && data.bookmake[0].runners[1].LayPrice3 ? data.bookmake[0].runners[1].LayPrice3 : 0,
        bookmaker_team3_status: data.bookmake[0] && data.bookmake[0].runners[2] && data.bookmake[0].runners[2].GameStatus ? data.bookmake[0].runners[2].GameStatus : null,
        bookmaker_team3: data.bookmake[0] && data.bookmake[0].runners[2] && data.bookmake[0].runners[2].RunnerName ? data.bookmake[0].runners[2].RunnerName : null,
        bookmaker_d_back_1: data.bookmake[0] && data.bookmake[0].runners[2] && data.bookmake[0].runners[2].BackPrice1 ? data.bookmake[0].runners[2].BackPrice1 : 0,
        bookmaker_d_back_2: data.bookmake[0] && data.bookmake[0].runners[2] && data.bookmake[0].runners[2].BackPrice2 ? data.bookmake[0].runners[2].BackPrice2 : 0,
        bookmaker_d_back_3: data.bookmake[0] && data.bookmake[0].runners[2] && data.bookmake[0].runners[2].BackPrice3 ? data.bookmake[0].runners[2].BackPrice3 : 0,
        bookmaker_d_lay_1: data.bookmake[0] && data.bookmake[0].runners[2] && data.bookmake[0].runners[2].LayPrice1 ? data.bookmake[0].runners[2].LayPrice1 : 0,
        bookmaker_d_lay_2: data.bookmake[0] && data.bookmake[0].runners[2] && data.bookmake[0].runners[2].LayPrice2 ? data.bookmake[0].runners[2].LayPrice2 : 0,
        bookmaker_d_lay_3: data.bookmake[0] && data.bookmake[0].runners[2] && data.bookmake[0].runners[2].LayPrice3 ? data.bookmake[0].runners[2].LayPrice3 : 0
      })

    }




    // var teamOneSelectionId = this.state.teamOneSelectionId;
    // var teamTwoSelectionId = this.state.teamTwoSelectionId;
    var profit12 = 0;
    var profit13 = 0;
    var profit14 = 0;
    var profit15 = 0;
    var profit17 = 0;
    var profit16 = 0;
    var NewProfit = 0;
    var NewProfit1 = 0;
    var NewProfit2 = 0;
    var new_array1 = [];
    var new_array2 = [];
    var new_arrayfancy = [];
    var new_arrayfancy1 = [];
    var new_arrayfancy2 = [];
    var index = 0;
    if (this.state.getResults !== undefined) {

      for (let i = 0; i < this.state.getResults.length; i++) {
        if (
          this.state.getResults[i].profit_team === "teamone" &&
          this.state.getResults[i].team_name !== "The Draw" &&
          this.state.getResults[i].bet_on === "odds"
        ) {
          if (this.state.getResults[i].bet_type !== "lay") {
            profit12 =
              parseFloat(profit12) +
              parseFloat(this.state.getResults[i].profit);
          } else {
            var data123 = parseFloat(this.state.getResults[i].odds) - 1;
            var new_data =
              parseFloat(this.state.getResults[i].profit) * parseFloat(data123);
            NewProfit = new_data;
            profit12 = parseFloat(profit12) - parseFloat(NewProfit);
          }

          if (this.state.getResults[i].loss !== undefined) {
            if (this.state.getResults[i].bet_type !== "lay") {
              profit13 =
                parseFloat(profit13) -
                parseFloat(this.state.getResults[i].loss);
              profit14 =
                parseFloat(profit14) -
                parseFloat(this.state.getResults[i].loss);
            } else {
              profit13 =
                parseFloat(profit13) +
                parseFloat(this.state.getResults[i].loss);
              profit14 =
                parseFloat(profit14) +
                parseFloat(this.state.getResults[i].loss);
            }
          }
        } else if (
          this.state.getResults[i].profit_team == "teamtwo" &&
          this.state.getResults[i].team_name !== "The Draw" &&
          this.state.getResults[i].bet_on === "odds"
        ) {
          if (this.state.getResults[i].bet_type !== "lay") {
            profit13 =
              parseFloat(profit13) +
              parseFloat(this.state.getResults[i].profit);
          } else {
            var data124 =
              parseFloat(this.state.getResults[i].odds) - parseFloat(1);
            var new_data1 =
              parseFloat(this.state.getResults[i].profit) * parseFloat(data124);

            NewProfit1 = new_data1;
            profit13 = parseFloat(profit13) - parseFloat(NewProfit1);
          }

          if (this.state.getResults[i].loss !== undefined) {
            if (this.state.getResults[i].bet_type !== "lay") {
              profit12 =
                parseFloat(profit12) -
                parseFloat(this.state.getResults[i].loss);
              profit14 =
                parseFloat(profit14) -
                parseFloat(this.state.getResults[i].loss);
            } else {
              profit12 =
                parseFloat(profit12) +
                parseFloat(this.state.getResults[i].loss);
              profit14 =
                parseFloat(profit14) +
                parseFloat(this.state.getResults[i].loss);
            }
          }
        } else {
          if (this.state.getResults[i].bet_on === "odds") {
            if (this.state.getResults[i].bet_type !== "lay") {
              profit14 =
                parseFloat(profit14) +
                parseFloat(this.state.getResults[i].profit);
            } else {
              var data125 =
                parseFloat(this.state.getResults[i].odds) - parseFloat(1);
              var new_data122 =
                parseFloat(this.state.getResults[i].profit) *
                parseFloat(data125);

              NewProfit2 = new_data122;
              profit14 = parseFloat(profit14) - NewProfit2;
            }

            if (this.state.getResults[i].loss !== undefined) {
              if (this.state.getResults[i].bet_type !== "lay") {
                profit12 =
                  parseFloat(profit12) -
                  parseFloat(this.state.getResults[i].stake);

                profit13 =
                  parseFloat(profit13) -
                  parseFloat(this.state.getResults[i].stake);
              } else {
                profit12 =
                  parseFloat(profit12) +
                  parseFloat(this.state.getResults[i].stake);
                profit13 =
                  parseFloat(profit13) +
                  parseFloat(this.state.getResults[i].stake);
              }
            }
          }
        }

        if (
          this.state.getResults[i].profit_team === "teamone" &&
          this.state.getResults[i].team_name !== "The Draw" &&
          this.state.getResults[i].bet_on === "bookmaker"
        ) {
          if (this.state.getResults[i].bet_type !== "lay") {
            profit15 =
              parseFloat(profit15) +
              parseFloat(this.state.getResults[i].profit);
          } else {
            var data123 = this.state.getResults[i].odds;
            if (Number.isInteger(parseFloat(data123)) === true) {
              var data123 = parseFloat(data123) / parseFloat(100);
            } else {
              var data123 =
                parseFloat(this.state.getResults[i].odds) - parseFloat(1);
            }

            var new_data =
              parseFloat(this.state.getResults[i].profit) * parseFloat(data123);
            NewProfit = new_data;
            profit15 = parseFloat(profit15) - parseFloat(NewProfit);
          }

          if (this.state.getResults[i].loss !== undefined) {
            if (this.state.getResults[i].bet_type !== "lay") {
              profit16 =
                parseFloat(profit16) -
                parseFloat(this.state.getResults[i].stake);
              profit17 =
                parseFloat(profit17) -
                parseFloat(this.state.getResults[i].stake);
            } else {
              profit16 =
                parseFloat(profit16) +
                parseFloat(this.state.getResults[i].stake);
              profit17 =
                parseFloat(profit17) +
                parseFloat(this.state.getResults[i].stake);
            }
          }
        } else if (
          this.state.getResults[i].profit_team === "teamtwo" &&
          this.state.getResults[i].team_name !== "The Draw" &&
          this.state.getResults[i].bet_on === "bookmaker"
        ) {
          if (this.state.getResults[i].bet_type !== "lay") {
            profit16 =
              parseFloat(profit16) +
              parseFloat(this.state.getResults[i].profit);
          } else {
            var data124 = this.state.getResults[i].odds;
            if (Number.isInteger(parseFloat(data124)) === true) {
              data124 = parseFloat(data124) / parseFloat(100);
            } else {
              var data124 =
                parseFloat(this.state.getResults[i].odds) - parseFloat(1);
            }
            var new_data1 =
              parseFloat(this.state.getResults[i].profit) * parseFloat(data124);

            NewProfit1 = new_data1;
            profit16 = parseFloat(profit16) - NewProfit1;
          }

          if (this.state.getResults[i].loss !== undefined) {
            if (this.state.getResults[i].bet_type !== "lay") {
              profit15 =
                parseFloat(profit15) -
                parseFloat(this.state.getResults[i].stake);
              profit17 =
                parseFloat(profit17) -
                parseFloat(this.state.getResults[i].stake);
            } else {
              profit15 =
                parseFloat(profit15) +
                parseFloat(this.state.getResults[i].stake);
              profit17 =
                parseFloat(profit17) +
                parseFloat(this.state.getResults[i].stake);
            }
          }
        } else {
          if (this.state.getResults[i].bet_on === "bookmaker") {
            if (this.state.getResults[i].bet_type !== "lay") {
              profit17 =
                parseFloat(profit17) +
                parseFloat(this.state.getResults[i].profit);
            } else {
              var data125 = this.state.getResults[i].odds;
              if (Number.isInteger(parseFloat(data125)) === true) {
                data125 = parseFloat(data125) / parseFloat(100);
              } else {
                var data125 =
                  parseFloat(this.state.getResults[i].odds) - parseFloat(1);
              }

              var new_data122 =
                parseFloat(this.state.getResults[i].profit) *
                parseFloat(data125);

              NewProfit2 = new_data122;
              profit17 = parseFloat(profit17) - parseFloat(NewProfit2);
            }

            if (this.state.getResults[i].loss !== undefined) {
              if (this.state.getResults[i].bet_type !== "lay") {
                profit15 =
                  parseFloat(profit15) -
                  parseFloat(this.state.getResults[i].stake);

                profit16 =
                  parseFloat(profit16) -
                  parseFloat(this.state.getResults[i].stake);
              } else {
                profit15 =
                  parseFloat(profit15) +
                  parseFloat(this.state.getResults[i].stake);
                profit16 =
                  parseFloat(profit16) +
                  parseFloat(this.state.getResults[i].stake);
              }
            }
          }
        }

        if (this.state.getResults[i].bet_on === "fancy") {
          if (
            this.state.getResults[i].bet_on !== null &&
            this.state.getResults[i].bet_on !== undefined
          ) {
            new_arrayfancy.push(this.state.getResults[i].headname);
          }
        }
      }
    }

    this.setState({
      profit13: profit13.toFixed(0),
      profit12: profit12.toFixed(0),
      profit14: profit14.toFixed(0),
      profit15: profit15.toFixed(0),
      profit16: profit16.toFixed(0),
      profit17: profit17.toFixed(0),
      fancydata: new_arrayfancy,
      fancydata1: new_arrayfancy1,
      fancydata1: new_arrayfancy2,
      isLoading: false,
    });
  };

  showDrawHtml = () => {
    if (this.state.draw === true) {
      let status = this.state.status;
      if (status !== "OPEN") {
        let status = this.state.status;
      } else {
        let status = "";
      }
      let blockHtml = "";
      if (this.state.oddsMatchSuspend) {
        let blockHtml = (
          <div className="bet-info suspendedodds row">
            <span>SUSPENDED</span>
          </div>
        );
      }
      let team_profit3 =
        this.state.team_profit3 === undefined || this.state.team_profit3 === ""
          ? this.state.team_profit3
          : parseFloat(this.state.team_profit3);

      return (
        <tr className="bet-info ">
          <td
            className="table-active fd-64"
          >
            <span>
              <strong>The Draw</strong>
            </span>
            <p className="box-w4">

              {/* {this.state.this.state.stackAmount_team3 || { team_profit3 } &&
                this.state.this.state.stackAmount_team3 > 0 ? (
                <strong className="text-success float-right book textD">

                  {team_profit3} {this.state.stackAmount_team3}
                </strong>
              ) : (
                <strong className="text-danger float-right book textD">

                  {team_profit3} {this.state.stackAmount_team3}
                </strong>
              )} */}
              {this.state.profit14 &&
                this.state.profit14 > 0 ? (
                <strong className="text-success float-left book textD">

                  {parseFloat(this.state.profit14)}
                </strong>
              ) : (
                <strong className="text-danger float-left book textD">

                  {parseFloat(this.state.profit14)}
                </strong>
              )}
            </p>
          </td>



          <td className="boxMobileback bgback">
            {status}
            <button
              className="bgback"
              onClick={this.handleBidClick.bind(
                this,
                this.state.drawTeamName,
                this.state.drawFirstBack,
                "#A8DBFF",
                "back",
                this.state.drawSelectionId,
                this.state.marketId,
                "draw",
                this.state.status,
                "odds"
              )}
            >
              {" "}
              <span className="odd2 backprice">
                {this.state.drawFirstBack}
              </span>{" "}
              <span className="textD">
                {this.state.drawFirstBackSize}</span>
            </button>
          </td>

          <td className="boxMobilelay bglay">
            {status}
            <button
              className="bglay"
              onClick={this.handleBidClick.bind(
                this,
                this.state.drawTeamName,
                this.state.drawFirstLay,
                "#faa9ba",
                "lay",
                this.state.drawSelectionId,
                this.state.marketId,
                "draw",
                this.state.status,
                "odds"
              )}
              value={this.state.lastPriceTraded1}
            >
              <span className="odd2 layprice">{this.state.drawFirstLay}</span>
              <span className="textD">  {this.state.drawFirstLaySize}</span>

            </button>
          </td>

        </tr>
      );
    }
  };

  showBookMarketAllHtml = () => {
    let returnHtml = [];
    if (this.state.showBookMakerLiveApiData === false) {
      return <div>{returnHtml}</div>;
    }
    if (
      this.state.bookmakerFirstTeamFound === true ||
      this.state.bookmakerSecondTeamFound === true ||
      this.state.bookmaker_draw === true
    ) {
      returnHtml.push(
        <div className="row">
          <div className="col-6 fb_642">{this.state.twoteamtotalmatch}</div>
          <div className="col-1 box-w1 ">&nbsp;</div>
          <div className=" col-1 box-w1">&nbsp;</div>
          <div className="col-1 bgback box-w1">BACK</div>
          <div className="col-1 bglay box-w1">LAY</div>
          <div className="col-1 box-w1">&nbsp;</div>
          <div className="col-1 box-w1">&nbsp;</div>
        </div>
      );
    }
    if (this.state.bookmakerFirstTeamFound === true) {
      let suspended =
        this.state.bookmaker_team1_status === "SUSPEND"
          ? "bet-info suspended row"
          : "bet-info row";
      let team_profit4 =
        this.state.team_profit4 === undefined || this.state.team_profit4 === ""
          ? this.state.team_profit4
          : parseFloat(this.state.team_profit4);
      returnHtml.push(
        <div className={suspended}>
          <div
            className="col-6 table-active fb_642"
            id="10301"
          >
            <span>
              <strong>{this.state.bookmaker_team1}</strong>
            </span>
            <p className="box-w4">
              <span className="float-right book" id="book_10301">
                {" "}
              </span>{" "}
              <span className="float-right profit" id="profit_10301">
                {team_profit4 && team_profit4 > 0 ? (
                  <strong className="text-success">
                    {this.state.team_profit4}

                    {this.state.stackAmount_team4}
                  </strong>
                ) : (
                  <strong className="text-danger">
                    {this.state.team_profit4}

                    {this.state.stackAmount_team4}
                  </strong>
                )}
              </span>
            </p>
            <p className="box-w4">
              <span className="float-left textD" id="profit_10301">
                {this.state.profit15 && this.state.profit15 > 0 ? (
                  <strong className="text-success textD">

                    {this.state.profit15}
                  </strong>
                ) : (
                  <strong className="text-danger textD">
                    {this.state.profit15}
                  </strong>
                )}
              </span>

            </p>
          </div>
          <div
            className="box-w1 col-1 bgback"
          >
            {status}
            <button
              className="bet-sec bgback "
              onClick={this.handleBidClickBook.bind(
                this,
                this.state.bookmaker_team2,
                this.state.bookmaker_a_back_3,
                "#B2D6F0",
                "back",
                this.state.teamOneSelectionId,
                this.state.marketId,
                "teamone",
                this.state.status,
                "bookmaker",
                "betunmatch"
              )}
            >

              <span className="odd2 backprice">
                {this.state.bookmaker_a_back_3}
              </span>
            </button>
          </div>
          <div
            className="box-w1 bgback col-1 "
          >
            {status}
            <button
              className="bet-sec bgback"
              onClick={this.handleBidClickBook.bind(
                this,
                this.state.bookmaker_team1,
                this.state.bookmaker_a_back_2,
                "#92C9F0",
                "back",
                this.state.teamOneSelectionId,
                this.state.marketId,
                "teamone",
                this.state.status,
                "bookmaker",
                "betunmatch"
              )}
            >
              {" "}
              <span className="odd2 backprice">
                {this.state.bookmaker_a_back_2}
              </span>
            </button>
          </div>

          <div className="box-w1 bgback col-1">
            {status}
            <button
              className="bet-sec bgback"
              onClick={this.handleBidClickBook.bind(
                this,
                this.state.bookmaker_team1,
                this.state.bookmaker_a_back_1,
                "#72bbef",
                "back",
                this.state.teamOneSelectionId,
                this.state.marketId,
                "teamone",
                this.state.status,
                "bookmaker",
                "betmatch"
              )}
            >
              {" "}
              <span className="odd2 backprice">
                {this.state.bookmaker_a_back_1}
              </span>
            </button>
          </div>

          <div className="box-w1 bglay col-1">
            {status}
            <button
              className="bet-sec bglay"
              onClick={this.handleBidClickBook.bind(
                this,
                this.state.bookmaker_team1,
                this.state.bookmaker_a_lay_1,
                "#FAA9BA",
                "lay",
                this.state.teamOneSelectionId,
                this.state.marketId,
                "teamone",
                this.state.status,
                "bookmaker",
                "betmatch"
              )}
            >
              <span className="odd2 layprice">
                {this.state.bookmaker_a_lay_1}
              </span>
            </button>
          </div>
          <div
            className="box-w1 bglay col-1"
          >
            {status}
            <button
              className="bet-sec bglay"
              onClick={this.handleBidClickBook.bind(
                this,
                this.state.bookmaker_team1,
                this.state.bookmaker_a_lay_2,
                "#F8BBC8",
                "lay",
                this.state.teamOneSelectionId,
                this.state.marketId,
                "teamone",
                this.state.status,
                "bookmaker",
                "betunmatch"
              )}
            >
              <span className="odd2 layprice">
                {this.state.bookmaker_a_lay_2}
              </span>
            </button>
          </div>
          <div
            className="box-w1 bglay col-1"
          >
            {status}
            <button
              className="bet-sec bglay"
              onClick={this.handleBidClickBook.bind(
                this,
                this.state.bookmaker_team1,
                this.state.bookmaker_a_lay_3,
                "#F6CDD6",
                "lay",
                this.state.teamOneSelectionId,
                this.state.marketId,
                "teamone",
                this.state.status,
                "bookmaker",
                "betunmatch"
              )}
            >
              <span className="odd2 layprice">
                {this.state.bookmaker_a_lay_3}
              </span>
            </button>
          </div>
        </div>
      );
    }

    if (this.state.bookmakerSecondTeamFound === true && this.state.bookmaker_team2 !== null) {
      let suspended1 =
        this.state.bookmaker_team2_status === "SUSPEND"
          ? "bet-info suspended row"
          : "bet-info row";
      let team_profit5 =
        this.state.team_profit5 === undefined || this.state.team_profit5 === ""
          ? this.state.team_profit5
          : parseFloat(this.state.team_profit5);
      returnHtml.push(
        <div className={suspended1}>
          <div className="col-6 table-active fb_642">
            <span>
              <strong>{this.state.bookmaker_team2}</strong>
            </span>
            <p className="box-w4">
              <span
                className="float-right book"
                id="book_349"
              >
                {team_profit5 && team_profit5 > 0 ? (
                  <strong className="text-success">
                    {this.state.team_profit5}

                    {this.state.stackAmount_team5}
                  </strong>
                ) : (
                  <strong className="text-danger">
                    {this.state.team_profit5}

                    {this.state.stackAmount_team5}
                  </strong>
                )}
              </span>{" "}
              <span className="float-left textD" id="profit_10301">
                {this.state.profit16 && this.state.profit16 > 0 ? (
                  <strong className="text-success textD">

                    {this.state.profit16}
                  </strong>
                ) : (
                  <strong className="text-danger textD">
                    {this.state.profit16}
                  </strong>
                )}
              </span>
            </p>

            <p className="box-w4">
              <span
                className="float-left book"
                style={{ color: "black" }}
              ></span>{" "}
              <span
                className="float-left  profit"
                style={{ color: "black" }}
              ></span>
            </p>
          </div>

          <div
            className="box-w1 bgback col-1"
          >
            {status}

            <button
              className="bet-sec bgback"
              onClick={this.handleBidClickBook.bind(
                this,
                this.state.bookmaker_team2,
                this.state.bookmaker_b_back_3,
                "#B2D6F0",
                "back",
                this.state.teamTwoSelectionId,
                this.state.marketId,
                "teamone",
                this.state.status,
                "bookmaker",
                "betunmatch"
              )}
            >
              {" "}
              <span className="odd2 backprice">
                {this.state.bookmaker_b_back_3}{" "}
              </span>
            </button>
          </div>
          <div
            className="box-w1 bgback col-1"
          >
            {status}
            <button
              className="bet-sec bgback "
              onClick={this.handleBidClickBook.bind(
                this,
                this.state.bookmaker_team2,
                this.state.bookmaker_b_back_2,
                "#92C9F0",
                "back",
                this.state.teamTwoSelectionId,
                this.state.marketId,
                "teamtwo",
                this.state.status,
                "bookmaker",
                "betunmatch"
              )}
            >
              {" "}
              <span className="odd2 backprice">
                {this.state.bookmaker_b_back_2}
              </span>{" "}
            </button>
          </div>

          <div className="box-w1 bgback col-1">
            {status}
            <button
              className="bet-sec bgback "
              onClick={this.handleBidClickBook.bind(
                this,
                this.state.bookmaker_team2,
                this.state.bookmaker_b_back_1,
                "#92C9F0",
                "back",
                this.state.teamTwoSelectionId,
                this.state.marketId,
                "teamtwo",
                this.state.status,
                "bookmaker",
                "betmatch"
              )}
            >
              {" "}
              <span className="odd2 backprice">
                {this.state.bookmaker_b_back_1}
              </span>{" "}
            </button>
          </div>

          <div className="box-w1 bglay col-1">
            {status}
            <button
              className="bet-sec bglay"
              onClick={this.handleBidClickBook.bind(
                this,
                this.state.bookmaker_team2,
                this.state.bookmaker_b_lay_1,
                "#faa9ba",
                "lay",
                this.state.teamTwoSelectionId,
                this.state.marketId,
                "teamtwo",
                this.state.status,
                "bookmaker",
                "betmatch"
              )}
            >
              <span className="odd2 layprice">
                {this.state.bookmaker_b_lay_1}
              </span>
            </button>
          </div>
          <div
            className="box-w1 bglay col-1"
            style={{ backgroundColor: "#F8BBC8" }}
          >
            {status}
            <button
              className="bet-sec bglay"
              onClick={this.handleBidClickBook.bind(
                this,
                this.state.bookmaker_team2,
                this.state.bookmaker_b_lay_2,
                "#F8BBC8",
                "lay",
                this.state.teamTwoSelectionId,
                this.state.marketId,
                "teamtwo",
                this.state.status,
                "bookmaker",
                "betunmatch"
              )}
            >
              <span className="odd2 layprice">
                {this.state.bookmaker_b_lay_2}
              </span>
            </button>
          </div>
          <div
            className="box-w1 bglay col-1"
            style={{ backgroundColor: "#F6CDD6" }}
          >
            {status}
            <button
              className="bet-sec bglay"
              onClick={this.handleBidClickBook.bind(
                this,
                this.state.bookmaker_team2,
                this.state.bookmaker_b_lay_3,
                "#F6CDD6",
                "lay",
                this.state.teamTwoSelectionId,
                this.state.marketId,
                "teamtwo",
                this.state.status,
                "bookmaker",
                "betunmatch"
              )}
            >
              <span className="odd2 layprice">
                {this.state.bookmaker_b_lay_3}
              </span>
            </button>
          </div>
        </div>
      );
    }
    if (this.state.bookmaker_draw === true && this.state.bookmaker_team3 !== null) {
      let suspended2 =
        this.state.bookmaker_team3_status === "SUSPEND"
          ? "bet-info suspended row"
          : "bet-info row";
      let team_profit6 =
        this.state.team_profit6 === undefined || this.state.team_profit6 === ""
          ? this.state.team_profit6
          : parseFloat(this.state.team_profit6);
      returnHtml.push(
        <div className={suspended2}>
          <div className="col-6 table-active fb_642">
            <span>
              <strong>{this.state.bookmaker_team3}</strong>
            </span>
            <p className="box-w4">

              <span className="float-right textD" id="profit_10301">
                {this.state.stackAmount_team6 && this.state.stackAmount_team6 > 0 ? (
                  <strong className="text-success textD">

                    {team_profit6}
                    {this.state.stackAmount_team6}
                  </strong>
                ) : (
                  <strong className="text-danger textD">

                    {team_profit6}
                    {this.state.stackAmount_team6}
                  </strong>
                )}
              </span>
              <span className="float-left textD" id="profit_10301">
                {this.state.profit17 && this.state.profit17 > 0 ? (
                  <strong className="text-success textD">

                    {this.state.profit17}
                  </strong>
                ) : (
                  <strong className="text-danger textD">
                    {this.state.profit17}
                  </strong>
                )}
              </span>
            </p>
          </div>

          <div
            className="box-w1 bgback col-1"
          >
            {status}
            <button
              className="bet-sec bgback "
              onClick={this.handleBidClickBook.bind(
                this,
                this.state.bookmaker_team3,
                this.state.bookmaker_d_back_3,
                "#B2D6F0",
                "back",
                this.state.drawSelectionId,
                this.state.marketId,
                "draw",
                this.state.status,
                "bookmaker",
                "betunmatch"
              )}
            >
              {" "}
              <span className="odd2 backprice">
                {this.state.bookmaker_d_back_3}
              </span>
            </button>
          </div>
          <div
            className="box-w1 bgback col-1"
          >
            <button
              className="bet-sec bgback "
              onClick={this.handleBidClickBook.bind(
                this,
                this.state.bookmaker_team3,
                this.state.bookmaker_d_back_2,
                "#92C9F0",
                "back",
                this.state.drawSelectionId,
                this.state.marketId,
                "draw",
                this.state.status,
                "bookmaker",
                "betunmatch"
              )}
            >
              {" "}
              <span className="odd2 backprice">
                {this.state.bookmaker_d_back_2}
              </span>{" "}
            </button>
          </div>

          <div className="box-w1 bgback col-1">
            {status}
            <button
              className="bet-sec bgback "
              onClick={this.handleBidClickBook.bind(
                this,
                this.state.bookmaker_team3,
                this.state.bookmaker_d_back_1,
                "#72bbef",
                "back",
                this.state.drawSelectionId,
                this.state.marketId,
                "draw",
                this.state.status,
                "bookmaker",
                "betmatch"
              )}
            >
              {" "}
              <span className="odd2 backprice">
                {this.state.bookmaker_d_back_1}
              </span>{" "}
            </button>
          </div>

          <div className="box-w1 bglay col-1">
            {status}
            <button
              className="bet-sec bglay"
              onClick={this.handleBidClickBook.bind(
                this,
                this.state.bookmaker_team3,
                this.state.bookmaker_d_lay_1,
                "#faa9ba",
                "lay",
                this.state.drawSelectionId,
                this.state.marketId,
                "draw",
                this.state.status,
                "bookmaker",
                "betmatch"
              )}
              value={this.state.bookmaker_d_lay_1}
            >
              <span className="odd2 layprice">
                {this.state.bookmaker_d_lay_1}
              </span>
            </button>
          </div>
          <div
            className="box-w1 bglay col-1"
          >
            {status}
            <button
              className="bet-sec bglay"
              value={this.state.bookmaker_d_lay_5}
              onClick={this.handleBidClickBook.bind(
                this,
                this.state.bookmaker_team3,
                this.state.bookmaker_d_lay_2,
                "#F8BBC8",
                "lay",
                this.state.drawSelectionId,
                this.state.marketId,
                "draw",
                this.state.status,
                "bookmaker",
                "betunmatch"
              )}
            >
              <span className="odd2 layprice">
                {this.state.bookmaker_d_lay_2}
              </span>
            </button>
          </div>
          <div
            className="box-w1 bglay col-1"
          >
            {status}
            <button
              className="bet-sec bglay"
              value={this.state.bookmaker_d_lay_3}
              onClick={this.handleBidClickBook.bind(
                this,
                this.state.bookmaker_team3,
                this.state.bookmaker_d_lay_3,
                "#F6CDD6",
                "lay",
                this.state.drawSelectionId,
                this.state.marketId,
                "draw",
                this.state.status,
                "bookmaker",
                "betunmatch"
              )}
            >
              <span className="odd2 layprice">
                {this.state.bookmaker_d_lay_3}
              </span>
            </button>
          </div>
        </div>
      );
    }

    return <div>{returnHtml}</div>;
  };

  showTableHtml = () => {

    if (this.state.betDataFound === true) {
      const html = [];
      const html1 = [];
      let profit12 = 0;
      let profit13 = 0;
      let loss = 0;
      //let custom_this=this;
      let teamOneSelectionId = this.state.teamOneSelectionId;
      let teamTwoSelectionId = this.state.teamOneSelectionId;
      for (let i = 0; i < this.state.getResults.length; i++) {
        let inPlayClass =
          this.state.getResults[i].inPlay === true ? "active" : "";
        let colorClass =
          this.state.getResults[i].color !== undefined
            ? this.state.getResults[i].color
            : "";
        if (this.state.getResults[i].type === "match") {
          html.push(
            <tr style={{ background: colorClass }}>
              <td style={{ textAlign: "left" }} colSpan="2">
                {" "}
                {this.state.getResults[i].team_name}{" "}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {this.state.getResults[i].odds}{" "}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {this.state.getResults[i].stake}{" "}
              </td>
            </tr>
          );
        } else {
          html1.push(
            <tr style={{ background: colorClass }}>
              <td style={{ textAlign: "left" }} colSpan="2">
                {" "}
                {this.state.getResults[i].team_name}{" "}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {this.state.getResults[i].odds}{" "}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {this.state.getResults[i].stake}{" "}
              </td>
            </tr>
          );
        }
      }
      return (
        <div>
          {/* <ul className="nav nav-tabs">
            <li className="nav-item">
              <a className="nav-link active" data-toggle="tab" href="#home">
                Match
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-toggle="tab" href="#menu1">
                Un Match
              </a>
            </li>
          </ul> */}
          {/* Tab panes */}
          <div className="tab-content">
            <div id="home" className=" tab-pane active">
              <br />
              <div className="right_tablescrool">
                <table className="table table-bordered1" style={{ marginTop: "-15px" }}>
                  <thead>
                    <tr>
                      <th style={{ textAlign: "left" }} colSpan="2">Nation</th>
                      <th style={{ textAlign: "right" }}>Odds</th>
                      <th style={{ textAlign: "right" }}>Amount</th>
                    </tr>
                  </thead>
                  {
                    this.state.betDataFound === true ?
                      <tbody>{html}</tbody> :
                      <tbody>
                        <tr>
                          <td colSpan="5" className="text-center">
                            <div className="profit"> No placed bet found !</div>
                          </td>
                        </tr>
                      </tbody>
                  }

                </table>
              </div>
            </div>
            <div id="menu1" className=" tab-pane fade">
              <br />
              <div className="right_tablescrool">
                <table className="table coupon-table">
                  <thead>
                    <tr>
                      <th style={{ textAlign: "center" }}> Team Name</th>
                      <th style={{ textAlign: "center" }}> Odds</th>
                      <th style={{ textAlign: "center" }}> Stake</th>
                    </tr>
                  </thead>
                  <tbody>{html1}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
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
    $(".pancypick").click(function () { });
  };
  showFancyTableHtml = () => {
    if (this.state.fancybet_betDataFound === true) {
      const html = [];

      for (let a = 0; a < this.state.fancybet_getResults.length; a++) {
        const value = this.state.fancybet_getResults[a];
        html.push(
          <tr className="bet-info">
            <td className="team-name nation">
              {" "}
              <span>
                <strong style={{ color: "font-weight:normal" }}>
                  {value.title}
                </strong>
              </span>
              <p>
                <span
                  className="float-left book"
                  id="book_175"
                  style={{ color: "black" }}
                >
                  0
                </span>{" "}
                <span className="float-right profit" id="profit_175"></span>
              </p>
            </td>
            <td className="bglay box-w1">
              <button
                className="bet-sec lay ses_row pancypick"
                value={value.no_first}
                onClick={this.onFancybetClick.bind(this)}
              >
                <span className="odd Jaya" id={"nofirstpink" + a}>
                  {value.no_first}
                </span>
                {value.no_second}
              </button>
            </td>
            <td className="text-center back box-w1">
              <button
                className="bet-sec lay ses_row"
                value={value.yes_first}
                onClick={this.onFancybetSecondClick.bind(this)}
              >
                <span className="odd">{value.yes_first}</span>
                {value.yes_second}
              </button>
            </td>
            <td className="text-right p-r-10 box-w2">
              <span>Min/Max</span>
            </td>
          </tr>
        );
      }

      return (
        <table className="coupon-table table table-bordered">
          <thead>
            <tr>
              <th></th>
              <th className="text-center  box-w1 lay">No</th>
              <th className="text-center  box-w1 lay">Yes</th>
              <th className="box-w2"></th>
            </tr>
          </thead>

          <tbody>{html} </tbody>
        </table>
      );
    }
  };

  //Onchange Value Amount
  handleChange = (event) => {
    let { name, value } = event.target;

    let profit = this.state.profit;
    // ////////////console.logprofit);
    let stackAmount = this.state.stake_amount;

    if (this.state.betClick == true) {
      if (this.state.type === "back") {
        profit = parseFloat(this.state.oddVal) - 1;
        profit = profit.toFixed(0) * event.target.value;

        if (this.state.betMatchType == "teamone") {
          this.setState({ team_profit1: profit.toFixed(0) });
        }
        if (this.state.betMatchType == "teamtwo") {
          this.setState({ team_profit2: profit.toFixed(0) });
        }
        if (this.state.betMatchType == "draw") {
          this.setState({ team_profit3: profit.toFixed(0) });
        }

        if (this.state.betMatchType == "teamone") {
          this.setState({ stackAmount_team2: "-" + event.target.value });
          this.setState({ stackAmount_team3: "-" + event.target.value });
        }
        if (this.state.betMatchType == "teamtwo") {
          this.setState({ stackAmount_team1: "-" + event.target.value });
          this.setState({ stackAmount_team3: "-" + event.target.value });
        }

        if (this.state.betMatchType == "draw") {
          this.setState({ stackAmount_team1: "-" + event.target.value });
          this.setState({ stackAmount_team2: "-" + event.target.value });
        }

        this.setState({
          [name]: value,
          profit: profit.toFixed(0),
          emptyField: false,
          errMsg: "",
        });
      } else if (this.state.type === "lay") {
        profit = parseFloat(this.state.oddVal) - 1;
        profit = profit.toFixed(0) * event.target.value;
        if (this.state.betMatchType == "teamone") {
          this.setState({ team_profit1: "-" + profit.toFixed(0) });
        } else if (this.state.betMatchType == "teamtwo") {
          this.setState({ team_profit2: "-" + profit.toFixed(0) });
        }

        if (this.state.betMatchType == "draw") {
          this.setState({ team_profit3: "-" + profit.toFixed(0) });
        }

        if (this.state.betMatchType == "teamone") {
          this.setState({ stackAmount_team2: event.target.value });
          this.setState({ stackAmount_team3: event.target.value });
        } else if (this.state.betMatchType == "teamtwo") {
          this.setState({ stackAmount_team1: event.target.value });
          this.setState({ stackAmount_team3: event.target.value });
        }

        if (this.state.betMatchType == "draw") {
          this.setState({ stackAmount_team1: event.target.value });
          this.setState({ stackAmount_team2: event.target.value });
        }
        this.setState({
          [name]: value,
          profit: event.target.value,
          emptyField: false,
          errMsg: "",
        });
      }
    }
    if (this.state.betClick2 == true) {
      if (this.state.type === "back") {

        if (Number.isInteger(parseFloat(this.state.oddVal)) == true) {
          profit = parseFloat(this.state.oddVal) / parseFloat(100);
        } else {
          profit = parseFloat(this.state.oddVal) - parseFloat(1);
        }

        profit = profit.toFixed(0) * parseFloat(event.target.value);
        if (this.state.betMatchType == "teamone") {
          this.setState({ team_profit4: profit.toFixed(0) });
        }
        if (this.state.betMatchType == "teamtwo") {
          this.setState({ team_profit5: profit.toFixed(0) });
        }
        if (this.state.betMatchType == "draw") {
          this.setState({ team_profit6: profit.toFixed(0) });
        }

        if (this.state.betMatchType == "teamone") {
          this.setState({ stackAmount_team5: "-" + event.target.value });
          this.setState({ stackAmount_team6: "-" + event.target.value });
        }
        if (this.state.betMatchType == "teamtwo") {
          this.setState({ stackAmount_team4: "-" + event.target.value });
          this.setState({ stackAmount_team6: "-" + event.target.value });
        }

        if (this.state.betMatchType == "draw") {
          this.setState({ stackAmount_team4: "-" + event.target.value });
          this.setState({ stackAmount_team5: "-" + event.target.value });
        }

        this.setState({
          [name]: value,
          profit: profit.toFixed(0),
          emptyField: false,
          errMsg: "",
        });
      } else if (this.state.type === "lay") {
        if (Number.isInteger(parseFloat(this.state.oddVal)) == true) {
          profit = parseFloat(this.state.oddVal) / parseFloat(100);
        } else {
          profit = parseFloat(this.state.oddVal) - parseFloat(1);
        }
        profit = profit.toFixed(0) * event.target.value;

        if (this.state.betMatchType == "teamone") {
          this.setState({ team_profit4: "-" + profit.toFixed(0) });
        } else if (this.state.betMatchType == "teamtwo") {
          this.setState({ team_profit5: "-" + profit.toFixed(0) });
        }

        if (this.state.betMatchType == "draw") {
          this.setState({ team_profit6: "-" + profit.toFixed(0) });
        }

        if (this.state.betMatchType == "teamone") {
          this.setState({ stackAmount_team5: event.target.value });
          this.setState({ stackAmount_team6: event.target.value });
        } else if (this.state.betMatchType == "teamtwo") {
          this.setState({ stackAmount_team4: event.target.value });
          this.setState({ stackAmount_team6: event.target.value });
        }

        if (this.state.betMatchType == "draw") {
          this.setState({ stackAmount_team4: event.target.value });
          this.setState({ stackAmount_team5: event.target.value });
        }
        this.setState({
          [name]: value,
          profit: event.target.value,
          emptyField: false,
          errMsg: "",
        });
      }
    }
  };

  handleChangeStakeamount = (event) => {
    this.setState({ stake_amount: event.target.value });
  };
  handleChange_session_input = (event) => {
    let profit = this.state.profit.toFixed(0);

    this.setState({ session_input: event.target.value });
  };

  handleButtonsClick = (getAmount) => {
    if (this.state.betClick == true) {
      let profit = "";
      if (this.state.type === "back") {
        profit = parseFloat(this.state.oddVal) - 1;
        profit = profit.toFixed(0) * getAmount;
        if (this.state.betMatchType == "teamone") {
          this.setState({ team_profit1: profit.toFixed(0) });
        }
        if (this.state.betMatchType == "teamtwo") {
          this.setState({ team_profit2: profit.toFixed(0) });
        }
        if (this.state.betMatchType == "draw") {
          this.setState({ team_profit3: profit.toFixed(0) });
        }

        if (this.state.betMatchType == "teamone") {
          this.setState({ stackAmount_team2: "-" + getAmount });
          this.setState({ stackAmount_team3: "-" + getAmount });
        }
        if (this.state.betMatchType == "teamtwo") {
          this.setState({ stackAmount_team1: "-" + getAmount });
          this.setState({ stackAmount_team3: "-" + getAmount });
        }
        if (this.state.betMatchType == "draw") {
          this.setState({ stackAmount_team1: "-" + getAmount });
          this.setState({ stackAmount_team2: "-" + getAmount });
        }

        this.setState({ stake_amount: getAmount, profit: profit });
      } else if (this.state.type === "lay") {

        profit = parseFloat(this.state.oddVal) - 1;
        profit = profit.toFixed(0) * getAmount;

        if (this.state.betMatchType == "teamone") {
          this.setState({ team_profit1: "-" + profit.toFixed(0) });
        } else if (this.state.betMatchType == "teamtwo") {
          this.setState({ team_profit2: "-" + profit.toFixed(0) });
        }

        if (this.state.betMatchType == "draw") {
          this.setState({ team_profit3: "-" + profit });
        }

        if (this.state.betMatchType == "teamone") {
          this.setState({ stackAmount_team2: getAmount });
          this.setState({ stackAmount_team3: getAmount });
        } else if (this.state.betMatchType == "teamtwo") {
          this.setState({ stackAmount_team1: getAmount });
          this.setState({ stackAmount_team3: getAmount });
        }

        if (this.state.betMatchType == "draw") {
          this.setState({ stackAmount_team1: getAmount });
          this.setState({ stackAmount_team2: getAmount });
        }
        this.setState({ stake_amount: getAmount, profit: getAmount });
      }
    }
    if (this.state.betClick2 == true) {
      let profit = "";
      if (this.state.type === "back") {
        if (Number.isInteger(parseFloat(this.state.oddVal)) == true) {
          profit = parseFloat(this.state.oddVal) / parseFloat(100);
        } else {
          profit = parseFloat(this.state.oddVal) - parseFloat(1);
        }

        profit = profit.toFixed(0) * getAmount;

        // ////////////console.logthis.state.betMatchType);
        if (this.state.betMatchType == "teamone") {
          this.setState({ team_profit4: profit.toFixed(0) });
        }
        if (this.state.betMatchType == "teamtwo") {
          this.setState({ team_profit5: profit.toFixed(0) });
        }
        if (this.state.betMatchType == "draw") {
          this.setState({ team_profit6: profit.toFixed(0) });
        }

        if (this.state.betMatchType == "teamone") {
          this.setState({ stackAmount_team5: "-" + getAmount });
          this.setState({ stackAmount_team6: "-" + getAmount });
        }
        if (this.state.betMatchType == "teamtwo") {
          this.setState({ stackAmount_team4: "-" + getAmount });
          this.setState({ stackAmount_team6: "-" + getAmount });
        }

        if (this.state.betMatchType == "draw") {
          this.setState({ stackAmount_team4: "-" + getAmount });
          this.setState({ stackAmount_team5: "-" + getAmount });
        }

        this.setState({ stake_amount: getAmount, profit: profit });
      } else if (this.state.type === "lay") {
        //profit = parseFloat(this.state.oddVal)-1;
        //profit = getAmount * getAmount;

        if (Number.isInteger(parseFloat(this.state.oddVal)) == true) {
          profit = parseFloat(this.state.oddVal) / parseFloat(100);
        } else {
          profit = parseFloat(this.state.oddVal) - parseFloat(1);
        }
        profit = profit.toFixed(0) * getAmount;

        if (this.state.betMatchType == "teamone") {
          this.setState({ team_profit4: "-" + profit.toFixed(0) });
        } else if (this.state.betMatchType == "teamtwo") {
          this.setState({ team_profit5: "-" + profit.toFixed(0) });
        }

        if (this.state.betMatchType == "draw") {
          this.setState({ team_profit6: "-" + profit.toFixed(0) });
        }

        if (this.state.betMatchType == "teamone") {
          this.setState({ stackAmount_team5: getAmount });
          this.setState({ stackAmount_team6: getAmount });
        } else if (this.state.betMatchType == "teamtwo") {
          this.setState({ stackAmount_team4: getAmount });
          this.setState({ stackAmount_team6: getAmount });
        }

        if (this.state.betMatchType == "draw") {
          this.setState({ stackAmount_team4: getAmount });
          this.setState({ stackAmount_team5: getAmount });
        }
        this.setState({ stake_amount: getAmount, profit: getAmount });
      }
    }
  };
  handleButtonsNewClick = (getAmount) => {
    this.setState({ stake_amount: getAmount });
  };

  handleBidClick = (
    teamName,
    oddVal,
    color,
    type,
    selectionId,
    marketId,
    getMatchType,
    status,
    betOn,
    betMatchUnmatchType
  ) => {
    if (
      betMatchUnmatchType === "betunmatch" &&
      this.state.unmatchOddStatus === "disable"
    ) {
      return false;
    }

    this.setState({ betClick: true, betClick1: false, betClick2: false });
    this.setState({
      teamName: teamName,
      oddVal: oddVal,
      color: color,
      type: type,
      betSelectionId: selectionId,
      betMarketId: marketId,
      betMatchType: getMatchType,
      betOn: "odds",
      stake_amount: "",
      profit22: "",
      profit: "",
      team_profit1: "",
      team_profit2: "",
      stackAmount_team3: "",
      stackAmount_team1: "",
      stackAmount_team2: "",
      team_profit3: "",

      team_profit4: "",
      team_profit5: "",
      stackAmount_team4: "",
      stackAmount_team5: "",
      stackAmount_team6: "",
      team_profit6: "",
    });
  };

  handleBidClickBook = (
    teamName,
    oddVal,
    color,
    type,
    selectionId,
    marketId,
    getMatchType,
    status,
    betOn,
    betMatchUnmatchType
  ) => {
    if (
      betMatchUnmatchType === "betunmatch" &&
      this.state.unmatchOddStatus === "disable"
    ) {
      return false;
    }

    this.setState({ betClick: false, betClick1: false, betClick2: true });
    this.setState({
      teamName: teamName,
      oddVal: oddVal,
      color: color,
      type: type,
      betSelectionId: selectionId,
      betMarketId: marketId,
      betMatchType: getMatchType,
      betOn: betOn,
      stake_amount: "",
      profit22: "",
      profit: "",
      team_profit1: "",
      team_profit2: "",
      stackAmount_team3: "",
      stackAmount_team1: "",
      stackAmount_team2: "",
      team_profit3: "",

      team_profit4: "",
      team_profit5: "",
      stackAmount_team4: "",
      stackAmount_team5: "",
      stackAmount_team6: "",
      team_profit6: "",
    });
  };

  handleBidClickSession = (
    color,
    headname,
    no,
    marketId,
    SessInptNo,
    yes,
    index1,
    layPrice,
    laySize,
    backPrice,
    backSize,
    yes_no_STAKE
  ) => {
    if (SessInptNo != 0) {
      this.setState({ betClick1: true, betClick: false, betClick2: false });
    }

    $("#btn_val").focus();
    this.setState({
      color: color,
      headname: headname,
      session_input: SessInptNo,
      yes_no_STAKE: yes_no_STAKE,
      yes: yes,
      no: no,
      stake_amount: "",
      profit22: "",
      profit: "",
      team_profit1: "",
      team_profit2: "",
      stackAmount_team1: "",
      stackAmount_team2: "",
      key_index: index1,
      layPrice: layPrice,
      laySize: laySize,
      backPrice: backPrice,
      backSize: backSize,
    });
  };
  handleBidCrossClick = () => {
    this.setState({
      betClick: false,
      betClick1: false,
      betClick2: false,
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
      let button_1 = 1000;
      let button_2 = 400;
      let button_3 = 10000;
      let button_4 = 2400;
      let button_5 = 4000;
      let button_6 = 100000;
      let button_7 = 400000;
      let button_8 = 40000;
      let button_9 = 1000000;
      let button_10 = 240000;

      let value_1 = 1000;
      let value_2 = 400;
      let value_3 = 10000;
      let value_4 = 2400;
      let value_5 = 4000;
      let value_6 = 100000;
      let value_7 = 400000;
      let value_8 = 40000;
      let value_9 = 1000000;
      let value_10 = 240000;

      if (this.state.buttonValue111 !== undefined) {
        if (this.state.buttonValue111.value_1 !== undefined) {
          value_1 = this.state.buttonValue111.value_1;
        }
        if (this.state.buttonValue111.value_2 !== undefined) {
          value_2 = this.state.buttonValue111.value_2;
        }

        if (this.state.buttonValue111.value_3 !== undefined) {
          value_3 = this.state.buttonValue111.value_3;
        }
        if (this.state.buttonValue111.value_1 !== undefined) {
          value_1 = this.state.buttonValue111.value_1;
        }

        if (this.state.buttonValue111.value_4 !== undefined) {
          value_4 = this.state.buttonValue111.value_4;
        }
        if (this.state.buttonValue111.value_1 !== undefined) {
          value_1 = this.state.buttonValue111.value_1;
        }

        if (this.state.buttonValue111.value_5 !== undefined) {
          value_5 = this.state.buttonValue111.value_5;
        }
        if (this.state.buttonValue111.value_6 !== undefined) {
          value_6 = this.state.buttonValue111.value_6;
        }
        if (this.state.buttonValue111.value_1 !== undefined) {
          value_7 = this.state.buttonValue111.value_7;
        }
        if (this.state.buttonValue111.value_8 !== undefined) {
          value_8 = this.state.buttonValue111.value_8;
        }
        if (this.state.buttonValue111.value_9 !== undefined) {
          value_9 = this.state.buttonValue111.value_9;
        }
        if (this.state.buttonValue111.value_10 !== undefined) {
          value_10 = this.state.buttonValue111.value_10;
        }

        if (this.state.buttonValue111.button_1 !== undefined) {
          button_1 = this.state.buttonValue111.button_1;
        }
        if (this.state.buttonValue111.button_2 !== undefined) {
          button_2 = this.state.buttonValue111.button_2;
        }

        if (this.state.buttonValue111.button_3 !== undefined) {
          button_3 = this.state.buttonValue111.button_3;
        }
        if (this.state.buttonValue111.button_1 !== undefined) {
          button_1 = this.state.buttonValue111.button_1;
        }

        if (this.state.buttonValue111.button_4 !== undefined) {
          button_4 = this.state.buttonValue111.button_4;
        }
        if (this.state.buttonValue111.button_1 !== undefined) {
          button_1 = this.state.buttonValue111.button_1;
        }

        if (this.state.buttonValue111.button_5 !== undefined) {
          button_5 = this.state.buttonValue111.button_5;
        }
        if (this.state.buttonValue111.button_6 !== undefined) {
          button_6 = this.state.buttonValue111.button_6;
        }
        if (this.state.buttonValue111.button_1 !== undefined) {
          button_7 = this.state.buttonValue111.button_7;
        }
        if (this.state.buttonValue111.button_8 !== undefined) {
          button_8 = this.state.buttonValue111.button_8;
        }
        if (this.state.buttonValue111.button_9 !== undefined) {
          button_9 = this.state.buttonValue111.button_9;
        }
        if (this.state.buttonValue111.button_10 !== undefined) {
          button_10 = this.state.buttonValue111.button_10;
        }
      }

      return (
        <div className=" hide-box-click22">
          <div
            className="table-responsive  "
            style={{
              paddingBottom: "4px",
              display: "block",
              background: this.state.color,
            }}
          >
            <div className=" popop_cancial">Placebet</div>
            <form onSubmit={this.handleSubmit} method="post" id="frm_placebet">
              <table className="coupon-table table table-borderedless">
                <thead>
                  <tr>
                    <th></th>
                    <th style={{ width: "35%", textAlign: "left" }}>
                      (Bet for)
                    </th>
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
                        className="text-danger clocebtn_popop"
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
                          ref={this.emailInput}
                          style={{ width: "52px" }}
                          maxLength="10"
                          value={this.state.stake_amount}
                          name="stake_amount"
                          type="number"
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
                        href="javascript:void(0);"
                        style={{ padding: "6px", color: "#000" }}
                        className="btn btn-success btn_dyn"
                        value={value_1}
                        onClick={this.handleButtonsClick.bind(this, value_1)}
                      >
                        {button_1}
                      </a>
                      <a
                        href="javascript:void(0);"
                        style={{ padding: "6px", color: "#000" }}
                        className="btn btn-success btn_dyn"
                        value={value_2}
                        onClick={this.handleButtonsClick.bind(this, value_2)}
                      >
                        {button_2}
                      </a>
                      <a
                        href="javascript:void(0);"
                        style={{ padding: "6px", color: "#000" }}
                        className="btn btn-success btn_dyn"
                        value={value_3}
                        onClick={this.handleButtonsClick.bind(this, value_3)}
                      >
                        {button_3}
                      </a>
                      <a
                        href="javascript:void(0);"
                        style={{ padding: "6px", color: "#000" }}
                        className="btn btn-success btn_dyn"
                        value={value_4}
                        onClick={this.handleButtonsClick.bind(this, value_4)}
                      >
                        {button_4}
                      </a>
                      <a
                        href="javascript:void(0);"
                        style={{ padding: "6px", color: "#000" }}
                        className="btn btn-success btn_dyn"
                        value={value_5}
                        onClick={this.handleButtonsClick.bind(this, value_5)}
                      >
                        {button_5}
                      </a>
                      <a
                        href="javascript:void(0);"
                        style={{ padding: "6px", color: "#000" }}
                        className="btn btn-success btn_dyn"
                        value={value_6}
                        onClick={this.handleButtonsClick.bind(this, value_6)}
                      >
                        {button_6}
                      </a>
                      <a
                        href="javascript:void(0);"
                        style={{ padding: "6px", color: "#000" }}
                        className="btn btn-success btn_dyn"
                        value={value_7}
                        onClick={this.handleButtonsClick.bind(this, value_7)}
                      >
                        {button_7}
                      </a>
                      <a
                        href="javascript:void(0);"
                        style={{ padding: "6px", color: "#000" }}
                        className="btn btn-success btn_dyn"
                        value={value_8}
                        onClick={this.handleButtonsClick.bind(this, value_8)}
                      >
                        {button_8}
                      </a>
                      <a
                        href="javascript:void(0);"
                        style={{ padding: "6px", color: "#000" }}
                        className="btn btn-success btn_dyn"
                        value={value_9}
                        onClick={this.handleButtonsClick.bind(this, value_9)}
                      >
                        {button_9}
                      </a>
                      <a
                        href="javascript:void(0);"
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
                  {this.state.isLoading ? (
                    <i
                      className="fa fa-spinner fa-spin fa-fw text-white"
                      aria-hidden="true"
                    ></i>
                  ) : null}
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    }
    if (this.state.betClick2 === true) {
      let button_1 = 1000;
      let button_2 = 400;
      let button_3 = 10000;
      let button_4 = 2400;
      let button_5 = 4000;
      let button_6 = 100000;
      let button_7 = 400000;
      let button_8 = 40000;
      let button_9 = 1000000;
      let button_10 = 240000;

      let value_1 = 1000;
      let value_2 = 400;
      let value_3 = 10000;
      let value_4 = 2400;
      let value_5 = 4000;
      let value_6 = 100000;
      let value_7 = 400000;
      let value_8 = 40000;
      let value_9 = 1000000;
      let value_10 = 240000;
      if (this.state.buttonValue111 !== undefined) {
        if (this.state.buttonValue111.value_1 !== undefined) {
          value_1 = this.state.buttonValue111.value_1;
        }
        if (this.state.buttonValue111.value_2 !== undefined) {
          value_2 = this.state.buttonValue111.value_2;
        }

        if (this.state.buttonValue111.value_3 !== undefined) {
          value_3 = this.state.buttonValue111.value_3;
        }
        if (this.state.buttonValue111.value_1 !== undefined) {
          value_1 = this.state.buttonValue111.value_1;
        }

        if (this.state.buttonValue111.value_4 !== undefined) {
          value_4 = this.state.buttonValue111.value_4;
        }
        if (this.state.buttonValue111.value_1 !== undefined) {
          value_1 = this.state.buttonValue111.value_1;
        }

        if (this.state.buttonValue111.value_5 !== undefined) {
          value_5 = this.state.buttonValue111.value_5;
        }
        if (this.state.buttonValue111.value_6 !== undefined) {
          value_6 = this.state.buttonValue111.value_6;
        }
        if (this.state.buttonValue111.value_1 !== undefined) {
          value_7 = this.state.buttonValue111.value_7;
        }
        if (this.state.buttonValue111.value_8 !== undefined) {
          value_8 = this.state.buttonValue111.value_8;
        }
        if (this.state.buttonValue111.value_9 !== undefined) {
          value_9 = this.state.buttonValue111.value_9;
        }
        if (this.state.buttonValue111.value_10 !== undefined) {
          value_10 = this.state.buttonValue111.value_10;
        }

        if (this.state.buttonValue111.button_1 !== undefined) {
          button_1 = this.state.buttonValue111.button_1;
        }
        if (this.state.buttonValue111.button_2 !== undefined) {
          button_2 = this.state.buttonValue111.button_2;
        }

        if (this.state.buttonValue111.button_3 !== undefined) {
          button_3 = this.state.buttonValue111.button_3;
        }
        if (this.state.buttonValue111.button_1 !== undefined) {
          button_1 = this.state.buttonValue111.button_1;
        }

        if (this.state.buttonValue111.button_4 !== undefined) {
          button_4 = this.state.buttonValue111.button_4;
        }
        if (this.state.buttonValue111.button_1 !== undefined) {
          button_1 = this.state.buttonValue111.button_1;
        }

        if (this.state.buttonValue111.button_5 !== undefined) {
          button_5 = this.state.buttonValue111.button_5;
        }
        if (this.state.buttonValue111.button_6 !== undefined) {
          button_6 = this.state.buttonValue111.button_6;
        }
        if (this.state.buttonValue111.button_1 !== undefined) {
          button_7 = this.state.buttonValue111.button_7;
        }
        if (this.state.buttonValue111.button_8 !== undefined) {
          button_8 = this.state.buttonValue111.button_8;
        }
        if (this.state.buttonValue111.button_9 !== undefined) {
          button_9 = this.state.buttonValue111.button_9;
        }
        if (this.state.buttonValue111.button_10 !== undefined) {
          button_10 = this.state.buttonValue111.button_10;
        }
      }

      return (
        <div
          className="table-responsive hide-box-click"
          style={{
            paddingBottom: "4px",
            display: "block",
            background: this.state.color,
          }}
        >
          {/* <div className=" popop_cancial">Placebet<i className="fa fa-times close22" onClick={this.handleBidCrossClick} ></i></div> */}
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
                      className="text-danger clocebtn_popop"
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
                        ref={this.emailInput}
                        style={{ width: "52px" }}
                        maxLength="10"
                        value={this.state.stake_amount}
                        name="stake_amount"
                        type="number"
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
                      href="javascript:void(0);"
                      style={{ padding: "6px", color: "#000" }}
                      className="btn btn-success btn_dyn"
                      value={value_1}
                      onClick={this.handleButtonsClick.bind(this, value_1)}
                    >
                      {button_1}
                    </a>
                    <a
                      href="javascript:void(0);"
                      style={{ padding: "6px", color: "#000" }}
                      className="btn btn-success btn_dyn"
                      value={value_2}
                      onClick={this.handleButtonsClick.bind(this, value_2)}
                    >
                      {button_2}
                    </a>
                    <a
                      href="javascript:void(0);"
                      style={{ padding: "6px", color: "#000" }}
                      className="btn btn-success btn_dyn"
                      value={value_3}
                      onClick={this.handleButtonsClick.bind(this, value_3)}
                    >
                      {button_3}
                    </a>
                    <a
                      href="javascript:void(0);"
                      style={{ padding: "6px", color: "#000" }}
                      className="btn btn-success btn_dyn"
                      value={value_4}
                      onClick={this.handleButtonsClick.bind(this, value_4)}
                    >
                      {button_4}
                    </a>
                    <a
                      href="javascript:void(0);"
                      style={{ padding: "6px", color: "#000" }}
                      className="btn btn-success btn_dyn"
                      value={value_5}
                      onClick={this.handleButtonsClick.bind(this, value_5)}
                    >
                      {button_5}
                    </a>
                    <a
                      href="javascript:void(0);"
                      style={{ padding: "6px", color: "#000" }}
                      className="btn btn-success btn_dyn"
                      value={value_6}
                      onClick={this.handleButtonsClick.bind(this, value_6)}
                    >
                      {button_6}
                    </a>
                    <a
                      href="javascript:void(0);"
                      style={{ padding: "6px", color: "#000" }}
                      className="btn btn-success btn_dyn"
                      value={value_7}
                      onClick={this.handleButtonsClick.bind(this, value_7)}
                    >
                      {button_7}
                    </a>
                    <a
                      href="javascript:void(0);"
                      style={{ padding: "6px", color: "#000" }}
                      className="btn btn-success btn_dyn"
                      value={value_8}
                      onClick={this.handleButtonsClick.bind(this, value_8)}
                    >
                      {button_8}
                    </a>
                    <a
                      href="javascript:void(0);"
                      style={{ padding: "6px", color: "#000" }}
                      className="btn btn-success btn_dyn"
                      value={value_9}
                      onClick={this.handleButtonsClick.bind(this, value_9)}
                    >
                      {button_9}
                    </a>
                    <a
                      href="javascript:void(0);"
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
                {this.state.isLoading ? (
                  <i
                    className="fa fa-spinner fa-spin fa-fw text-white"
                    aria-hidden="true"
                  ></i>
                ) : null}
              </button>
            </div>
          </form>
        </div>
      );
    }
  };

  showBidClickSessionHtml = () => {
    if (this.state.betClick1 === true) {
      let button_1 = 1000;
      let button_2 = 400;
      let button_3 = 10000;
      let button_4 = 2400;
      let button_5 = 4000;
      let button_6 = 100000;
      let button_7 = 400000;
      let button_8 = 40000;
      let button_9 = 1000000;
      let button_10 = 240000;

      let value_1 = 1000;
      let value_2 = 400;
      let value_3 = 10000;
      let value_4 = 2400;
      let value_5 = 4000;
      let value_6 = 100000;
      let value_7 = 400000;
      let value_8 = 40000;
      let value_9 = 1000000;
      let value_10 = 240000;
      if (this.state.buttonValue111 !== undefined) {
        if (this.state.buttonValue111.value_1 !== undefined) {
          value_1 = this.state.buttonValue111.value_1;
        }
        if (this.state.buttonValue111.value_2 !== undefined) {
          value_2 = this.state.buttonValue111.value_2;
        }

        if (this.state.buttonValue111.value_3 !== undefined) {
          value_3 = this.state.buttonValue111.value_3;
        }
        if (this.state.buttonValue111.value_1 !== undefined) {
          value_1 = this.state.buttonValue111.value_1;
        }

        if (this.state.buttonValue111.value_4 !== undefined) {
          value_4 = this.state.buttonValue111.value_4;
        }
        if (this.state.buttonValue111.value_1 !== undefined) {
          value_1 = this.state.buttonValue111.value_1;
        }

        if (this.state.buttonValue111.value_5 !== undefined) {
          value_5 = this.state.buttonValue111.value_5;
        }
        if (this.state.buttonValue111.value_6 !== undefined) {
          value_6 = this.state.buttonValue111.value_6;
        }
        if (this.state.buttonValue111.value_1 !== undefined) {
          value_7 = this.state.buttonValue111.value_7;
        }
        if (this.state.buttonValue111.value_8 !== undefined) {
          value_8 = this.state.buttonValue111.value_8;
        }
        if (this.state.buttonValue111.value_9 !== undefined) {
          value_9 = this.state.buttonValue111.value_9;
        }
        if (this.state.buttonValue111.value_10 !== undefined) {
          value_10 = this.state.buttonValue111.value_10;
        }

        if (this.state.buttonValue111.button_1 !== undefined) {
          button_1 = this.state.buttonValue111.button_1;
        }
        if (this.state.buttonValue111.button_2 !== undefined) {
          button_2 = this.state.buttonValue111.button_2;
        }

        if (this.state.buttonValue111.button_3 !== undefined) {
          button_3 = this.state.buttonValue111.button_3;
        }
        if (this.state.buttonValue111.button_1 !== undefined) {
          button_1 = this.state.buttonValue111.button_1;
        }

        if (this.state.buttonValue111.button_4 !== undefined) {
          button_4 = this.state.buttonValue111.button_4;
        }
        if (this.state.buttonValue111.button_1 !== undefined) {
          button_1 = this.state.buttonValue111.button_1;
        }

        if (this.state.buttonValue111.button_5 !== undefined) {
          button_5 = this.state.buttonValue111.button_5;
        }
        if (this.state.buttonValue111.button_6 !== undefined) {
          button_6 = this.state.buttonValue111.button_6;
        }
        if (this.state.buttonValue111.button_1 !== undefined) {
          button_7 = this.state.buttonValue111.button_7;
        }
        if (this.state.buttonValue111.button_8 !== undefined) {
          button_8 = this.state.buttonValue111.button_8;
        }
        if (this.state.buttonValue111.button_9 !== undefined) {
          button_9 = this.state.buttonValue111.button_9;
        }
        if (this.state.buttonValue111.button_10 !== undefined) {
          button_10 = this.state.buttonValue111.button_10;
        }
      }

      $("#stake_amount").focus();
      return (
        <div className=" hide-box-click22">
          <div
            className="table-responsive hide-box-click  hide-box-click22"
            style={{
              paddingBottom: "4px",
              display: "block",
              background: this.state.color,
              height: "fit-content",
            }}
          >
            <div className=" popop_cancial">Placebet</div>
            <form
              onSubmit={this.handleSubmitSession}
              method="post"
              id="frm_placebet"
            >
              <table className="coupon-table table table-borderedless">
                <thead>
                  <tr>
                    <th></th>
                    <th style={{ width: "35%", textAlign: "left" }}>
                      (Bet for)
                    </th>
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
                        className="text-danger clocebtn_popop"
                        onClick={this.handleBidCrossClick}
                      >
                        {" "}
                        <i className="fa fa-times"></i>{" "}
                      </a>
                    </td>
                    <td id="team_nm">{this.state.headname}</td>
                    <td style={{ width: "75px" }}>
                      <div className="form-group">
                        <input value={this.state.no} name="no" type="hidden" />
                        <input
                          value={this.state.yes}
                          name="yes"
                          type="hidden"
                        />
                        <input
                          value={this.state.SessInptNo}
                          name="session_input"
                          value={this.state.session_input}
                          className="amountint"
                          onChange={this.handleChange_session_input}
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
                          id="stake_amount"
                          style={{ width: "52px" }}
                          maxLength="10"
                          value={this.state.stake_amount}
                          name="stake_amount"
                          type="text"
                          onChange={this.handleChangeStakeamount}
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
                        onClick={this.handleButtonsNewClick.bind(this, value_1)}
                      >
                        {button_1}
                      </a>
                      <a
                        href="#"
                        style={{ padding: "6px", color: "#000" }}
                        className="btn btn-success btn_dyn"
                        value={value_2}
                        onClick={this.handleButtonsNewClick.bind(this, value_2)}
                      >
                        {button_2}
                      </a>
                      <a
                        href="#"
                        style={{ padding: "6px", color: "#000" }}
                        className="btn btn-success btn_dyn"
                        value={value_3}
                        onClick={this.handleButtonsNewClick.bind(this, value_3)}
                      >
                        {button_3}
                      </a>
                      <a
                        href="#"
                        style={{ padding: "6px", color: "#000" }}
                        className="btn btn-success btn_dyn"
                        value={value_4}
                        onClick={this.handleButtonsNewClick.bind(this, value_4)}
                      >
                        {button_4}
                      </a>
                      <a
                        href="#"
                        style={{ padding: "6px", color: "#000" }}
                        className="btn btn-success btn_dyn"
                        value={value_5}
                        onClick={this.handleButtonsNewClick.bind(this, value_5)}
                      >
                        {button_5}
                      </a>
                      <a
                        href="#"
                        style={{ padding: "6px", color: "#000" }}
                        className="btn btn-success btn_dyn"
                        value={value_6}
                        onClick={this.handleButtonsNewClick.bind(this, value_6)}
                      >
                        {button_6}
                      </a>
                      <a
                        href="#"
                        style={{ padding: "6px", color: "#000" }}
                        className="btn btn-success btn_dyn"
                        value={value_7}
                        onClick={this.handleButtonsNewClick.bind(this, value_7)}
                      >
                        {button_7}
                      </a>
                      <a
                        href="#"
                        style={{ padding: "6px", color: "#000" }}
                        className="btn btn-success btn_dyn"
                        value={value_8}
                        onClick={this.handleButtonsNewClick.bind(this, value_8)}
                      >
                        {button_8}
                      </a>
                      <a
                        href="#"
                        style={{ padding: "6px", color: "#000" }}
                        className="btn btn-success btn_dyn"
                        value={value_9}
                        onClick={this.handleButtonsNewClick.bind(this, value_9)}
                      >
                        {button_9}
                      </a>
                      <a
                        href="#"
                        style={{ padding: "6px", color: "#000" }}
                        className="btn btn-success btn_dyn"
                        value={value_10}
                        onClick={this.handleButtonsNewClick.bind(
                          this,
                          value_10
                        )}
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
                  {this.state.isLoading ? (
                    <i
                      className="fa fa-spinner fa-spin fa-fw text-white"
                      aria-hidden="true"
                    ></i>
                  ) : null}
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    }
  };

  handleDepoWithdrPopupClose = () => {
    this.setState({ showUserAmountPopup: false });
  };

  showVideo = () => {
    if (this.state.showVideo === true) {
      return (
        <iframe
          src={
            "https://new.apple365.bet/tvsetting/getMatchTvFeedApi/" +
            this.state.currentMatchId +
            "/172.105.40.76"
          }
        ></iframe>
      );
    } else {
      return <div>&nbsp;</div>;
    }
  };

  handleLiveTvClick = () => {
    this.setState({ showVideo: !this.state.showVideo });
  };

  render() {
    const { openTv } = this.state;
    let blockOddsHtml = "";
    if (this.state.oddsMatchSuspend || this.state.isSuspend === 1) {
      let blockOddsHtml = (
        <div className="bet-info suspendedodds row">
          <span>SUSPENDED</span>
        </div>
      );
    }

    let change_password = localStorage.getItem("change_password");
    if (change_password !== "" && change_password !== null) {
      return <Redirect to="/change_password" />;
    }
    let suspended = "bet-info ";
    if (this.state.bookmaker_a_status === "SUSPENDED") {
      suspended = "bet-info suspended row";
    }
    let suspended1 = "bet-info ";
    if (this.state.bookmaker_b_status === "SUSPENDED") {
      suspended1 = "bet-info suspended row";
    }
    let suspended2 = "bet-info row";

    if (this.state.bookmaker_d_status === "SUSPENDED") {
      suspended2 = "bet-info suspended row";
    }


    let new_array = [];
    let new_array1 = "";
    let datafancy = this.state.fancydata;
    if (this.state.sessiondata !== undefined) {
      for (let i = 0; i < this.state.sessiondata.length; i++) {
        let data123 = datafancy;

        if (data123 !== undefined) {

          if (data123.indexOf(this.state.sessiondata[i].RunnerName) >= 0) {

            new_array1 = (
              <tr>
                <td className="fb_64 table-active">
                  <a href="#">
                    <b className="sessionRunner">
                      {this.state.sessiondata[i].RunnerName}
                    &nbsp;{" "}</b>
                  </a>

                  <button
                    className="tableman_btn"
                    onClick={this.handleModelShow.bind(
                      this,
                      this.state.sessiondata[i].RunnerName,
                      this.state.sessiondata[i].LayPrice1,
                      this.state.sessiondata[i].BackPrice1
                    )}
                  >
                    Book
                  </button>
                </td>
                <td className="bglay boxMobilelay">
                  {/* {
                    this.state.sessiondata[i].GameStatus === "BALL_RUN" ?
                      (
                        <div className="suspendedfancy2">
                          <span>BALL_RUN</span>
                        </div>
                      ) : null

                  }
                  {
                    this.state.sessiondata[i].GameStatus === "SUSPEND" ?
                      (
                        <div className="suspendedfancy2">
                          <span>SUSPENDED</span>
                        </div>
                      ) : null

                  } */}
                  <button
                    value={i}
                    onClick={this.handleBidClickSession.bind(
                      this,
                      "#faa9ba",
                      this.state.sessiondata[i].RunnerName,
                      "no",
                      this.state.sessiondata[i].marketId,
                      this.state.sessiondata[i].LayPrice1,
                      "",
                      this.state.sessiondata[i].market_id,
                      this.state.sessiondata[i].LayPrice1,
                      this.state.sessiondata[i].LaySize1,
                      this.state.sessiondata[i].BackPrice1,
                      this.state.sessiondata[i].BackSize1
                    )}
                    className="bglay"
                  >
                    <span className="oddSession layprice">
                      {" "}
                      {this.state.sessiondata[i].LayPrice1}
                    </span>

                    <span className="textD"> {this.state.sessiondata[i].LaySize1}</span>
                  </button>
                </td>

                <td className="boxMobileback bgback">
                  {/* {
                    this.state.sessiondata[i].GameStatus === "BALL_RUN" ?
                      (
                        <div className="suspendedfancy2">
                          <span>BALL_RUN</span>
                        </div>
                      ) : null

                  }
                  {
                    this.state.sessiondata[i].GameStatus === "SUSPEND" ?
                      (
                        <div className="suspendedfancy2">
                          <span>SUSPENDED</span>
                        </div>
                      ) : null

                  } */}
                  <button
                    className="bgback"
                    value={i}
                    onClick={this.handleBidClickSession.bind(
                      this,
                      "#72bbef",
                      this.state.sessiondata[i].RunnerName,
                      "yes",
                      this.state.sessiondata[i].marketId,
                      this.state.sessiondata[i].BackPrice1,
                      "",
                      this.state.sessiondata[i].market_id,
                      this.state.sessiondata[i].LayPrice1,
                      this.state.sessiondata[i].LaySize1,
                      this.state.sessiondata[i].BackPrice1,
                      this.state.sessiondata[i].BackSize1
                    )}
                  >
                    <span className="oddSession backprice">
                      {" "}
                      {this.state.sessiondata[i].BackPrice1}
                    </span>

                    <span className="textD"> {this.state.sessiondata[i].BackSize1}</span>
                  </button>
                </td>
              </tr>
            );
            new_array.push(new_array1);
          } else {
            if (
              this.state.sessiondata[i].RunnerName
              === true
            ) {
              continue;
            }


            new_array1 = (
              <tr>
                <td className="fb_64 table-active">
                  <a href="#">
                    {" "}
                    <b className="sessionRunner">  {this.state.sessiondata[i].RunnerName}</b>
                    &nbsp;
                  </a>
                </td>
                <td className="boxMobilelay bglay">
                  {
                    this.state.sessiondata[i].GameStatus === "BALL_RUN" ?
                      (
                        <div className="suspendedfancy2">
                          <span><strong>BALLRUNNING</strong></span>
                        </div>
                      ) : null

                  }
                  {
                    this.state.sessiondata[i].GameStatus === "SUSPEND" ?
                      (
                        <div className="suspendedfancy2 px-3">
                          <span><strong>SUSPENDED</strong></span>
                        </div>
                      ) : null

                  }

                  <button
                    value={i}
                    onClick={this.handleBidClickSession.bind(
                      this,
                      "#faa9ba",
                      this.state.sessiondata[i].RunnerName,
                      "no",
                      this.state.sessiondata[i].marketId,
                      this.state.sessiondata[i].LayPrice1,
                      "",
                      this.state.sessiondata[i].market_id,
                      this.state.sessiondata[i].LayPrice1,
                      this.state.sessiondata[i].LaySize1,
                      this.state.sessiondata[i].BackPrice1,
                      this.state.sessiondata[i].BackSize1
                    )}
                    className="bglay"
                  >
                    <span className="oddSession layprice">
                      {" "}
                      {this.state.sessiondata[i].LayPrice1}
                    </span>

                    <span className="textD">  {this.state.sessiondata[i].LaySize1}</span>
                  </button>
                </td>

                <td className="boxMobileback bgback">

                  <button
                    className="bgback"
                    value={i}
                    onClick={this.handleBidClickSession.bind(
                      this,
                      "#72bbef",
                      this.state.sessiondata[i].RunnerName,
                      "yes",
                      this.state.sessiondata[i].marketId,
                      this.state.sessiondata[i].BackPrice1,
                      "",
                      this.state.sessiondata[i].market_id,
                      this.state.sessiondata[i].LayPrice1,
                      this.state.sessiondata[i].LaySize1,
                      this.state.sessiondata[i].BackPrice1,
                      this.state.sessiondata[i].BackSize1
                    )}
                  >
                    <span className="oddSession backprice">
                      {" "}
                      {this.state.sessiondata[i].BackPrice1}
                    </span>

                    <span className="textD">   {this.state.sessiondata[i].BackSize1}</span>
                  </button>
                </td>

              </tr>
            );
            new_array.push(new_array1);
          }
        } else {

          new_array1 = (
            <tr>
              <td className="fb_64 table-active">
                <a href="#">
                  {" "}
                  <b className="sessionRunner">{this.state.sessiondata[i].RunnerName}
                  &nbsp;{" "}</b>
                </a>
              </td>
              <td className="boxMobilelay bglay">
                {
                  this.state.sessiondata[i].GameStatus === "BALL_RUN" ?
                    (
                      <div className="suspendedfancy2">
                        <span><strong>BALLRUNNING</strong></span>
                      </div>
                    ) : null

                }
                {
                  this.state.sessiondata[i].GameStatus === "SUSPEND" ?
                    (
                      <div className="suspendedfancy2 px-3">
                        <span><strong>SUSPENDED</strong></span>
                      </div>
                    ) : null

                }
                <button
                  value={i}
                  onClick={this.handleBidClickSession.bind(
                    this,
                    "#faa9ba",
                    this.state.sessiondata[i].RunnerName,
                    "no",
                    this.state.sessiondata[i].marketId,
                    this.state.sessiondata[i].LayPrice1,
                    "",
                    this.state.sessiondata[i].market_id,
                    this.state.sessiondata[i].LayPrice1,
                    this.state.sessiondata[i].LaySize1,
                    this.state.sessiondata[i].BackPrice1,
                    this.state.sessiondata[i].BackSize1
                  )}
                  className="bglay"
                >
                  <span className="oddSession layprice">
                    {" "}
                    {this.state.sessiondata[i].LayPrice1}
                  </span>

                  <span className="textD"> {this.state.sessiondata[i].LaySize1}</span>
                </button>
              </td>

              <td className="boxMobileback bgback">
                <button
                  className="bgback"
                  value={i}
                  onClick={this.handleBidClickSession.bind(
                    this,
                    "#72bbef",
                    this.state.sessiondata[i].RunnerName,
                    "yes",
                    this.state.sessiondata[i].marketId,
                    this.state.sessiondata[i].BackPrice1,
                    "",
                    this.state.sessiondata[i].market_id,
                    this.state.sessiondata[i].LayPrice1,
                    this.state.sessiondata[i].LaySize1,
                    this.state.sessiondata[i].BackPrice1,
                    this.state.sessiondata[i].BackSize1
                  )}
                >
                  <span className="oddSession backprice">
                    {" "}
                    {this.state.sessiondata[i].BackPrice1}
                  </span>
                  {this.state.sessiondata[i].BackSize1}
                </button>
              </td>
            </tr>
          );
          new_array.push(new_array1);
        }
      }
    }

    let status = this.state.status;
    if (status !== "OPEN") {
      status = this.state.status;
    } else {
      status = "";
    }

    let accessToken = this.state.accessToken;

    if (accessToken === "" || accessToken === null) {
      return <Redirect to="/login" />;
    }
    let newdata11 = this.state.getResult11;
    //////console.log)
    let amount_data2 = "";
    let amount_data1 = "";
    let amount_data3 = "";
    let amount_data4 = "";
    let stake = 0;
    if (
      this.state.color_data_model !== "" &&
      this.state.color_data_model !== undefined
    ) {
      if (this.state.color_data_model.showdata !== undefined) {
        if (
          this.state.color_data_model.showdata.yes !== undefined &&
          this.state.color_data_model.showdata.yes !== ""
        ) {
          amount_data3 = "-";
        }
        if (
          this.state.color_data_model.showdata.no !== undefined &&
          this.state.color_data_model.showdata.no !== ""
        ) {
          amount_data4 = "-";
        }
        stake = this.state.color_data_model.showdata.stake;
      }

    }
    let new_fancy_arr = [];
    let htmllay112 = "";
    let htmllay113 = "";

    if (this.state.no_data_model !== undefined) {
      if (this.state.no_data_model.data !== undefined) {
        if (this.state.no_data_model.data.showdata !== undefined) {
          for (
            let index = 0;
            index < this.state.no_data_model.data.showdata.length;
            index++
          ) {
            let layprice = "0";
            let backprice = "0";
            let layprice1 = "0";
            let layprice2 = "0";
            let backprice1 = "0";
            let backprice3 = "0";
            let backprice2 = "0";
            let layprice3 = "0";
            if (
              this.state.no_data_model.data.showdata[index].lay_price !==
              undefined
            ) {
              if (this.state.no_data_model.data.showdata[index].no == "no") {
                let layprice =
                  parseFloat(
                    this.state.no_data_model.data.showdata[index].lay_price
                  ) - parseFloat(1);
                let layprice3 = parseFloat(
                  this.state.no_data_model.data.showdata[index].lay_price
                );

                let layprice1 = parseFloat(
                  this.state.no_data_model.data.showdata[index].stake
                );
                let layprice2 = "-" + layprice1;

                let htmllay112 = (
                  <tr className="bet-info ">
                    <td id="blockin3" className="box-w1 bglay">
                      <button className="bet-sec lay ">
                        {" "}
                        <span className="odd layprice">{layprice}</span>{" "}
                      </button>
                    </td>
                    <td id="blockin3" className="box-w1 bglay">
                      <button className="bet-sec lay ">
                        {" "}
                        <span className="odd layprice">{layprice1}</span>{" "}
                      </button>
                    </td>
                  </tr>
                );

                new_fancy_arr.push(htmllay112);

                let htmllay113 = (
                  <tr className="bet-info ">
                    <td id="blockin3" className="box-w1 bgback">
                      <button className="bet-sec back ">
                        {" "}
                        <span className="odd backprice">{layprice3}</span>{" "}
                      </button>
                    </td>
                    <td id="blockin3" className="box-w1 bgback">
                      <button className="bet-sec back ">
                        {" "}
                        <span className="odd backprice">{layprice2}</span>{" "}
                      </button>
                    </td>
                  </tr>
                );
                new_fancy_arr.push(htmllay113);
              }

              if (this.state.no_data_model.data.showdata[index].no == "yes") {
                if (
                  this.state.no_data_model.data.showdata[index].back_price !==
                  undefined
                ) {
                  let backprice = parseFloat(
                    this.state.no_data_model.data.showdata[index].back_price
                  );
                  let backprice1 =
                    parseFloat(
                      this.state.no_data_model.data.showdata[index].back_price
                    ) - parseFloat(1);
                  let backprice2 =
                    "-" + this.state.no_data_model.data.showdata[index].stake;
                  let backprice3 =
                    (parseFloat(
                      this.state.no_data_model.data.showdata[index].stake
                    ) *
                      parseFloat(
                        this.state.no_data_model.data.showdata[index].back_size
                      )) /
                    parseFloat(100);
                }

                let htmllay112 = (
                  <tr className="bet-info ">
                    <td
                      id="blockin3"
                      className="box-w1 bgback"
                      style={{
                        background: "rgb(114, 187, 239)",
                        transition: "all 1s ease 0s",
                      }}
                    >
                      <button className="bet-sec back ">
                        {" "}
                        <span className="odd backprice">{backprice}</span>{" "}
                      </button>
                    </td>
                    <td
                      id="blockin3"
                      className="box-w1 bgback"
                      style={{
                        background: "rgb(114, 187, 239)",
                        transition: "all 1s ease 0s",
                      }}
                    >
                      <button className="bet-sec back ">
                        {" "}
                        <span className="odd backprice">{backprice3}</span>{" "}
                      </button>
                    </td>
                  </tr>
                );

                new_fancy_arr.push(htmllay112);

                let htmllay113 = (
                  <tr className="bet-info ">
                    <td id="blockin3" className="box-w1 bglay">
                      <button className="bet-sec lay ">
                        {" "}
                        <span className="odd layprice">{backprice1}</span>{" "}
                      </button>
                    </td>
                    <td id="blockin3" className="box-w1 bglay">
                      <button className="bet-sec lay ">
                        {" "}
                        <span className="odd layprice">{backprice2}</span>{" "}
                      </button>
                    </td>
                  </tr>
                );

                new_fancy_arr.push(htmllay113);
              }
            }
          }
        }
      }
    }


    if (this.state.teamOneLastBack !== undefined) {
      let team_profit1 =
        this.state.team_profit1 === undefined || this.state.team_profit1 === ""
          ? this.state.team_profit1
          : parseFloat(this.state.team_profit1);
      let team_profit2 =
        this.state.team_profit2 === undefined || this.state.team_profit2 === ""
          ? this.state.team_profit2
          : parseFloat(this.state.team_profit2);
      return (
        <div className="w-100">
          <Nav />
          <div>
            <Tabs>
              <TabList className="flex-row mobile-casino tabpad w-100">
                <Tab>
                  <div className="texttab1 px-2 ">ODDS</div>
                </Tab>
                <Tab>
                  <div className="texttab1 px-2">MATCHED BET</div>
                </Tab>
                <div className="text-white float-right fas fa-tv mt-3 mr-2"
                  onClick={() => this.setState({ openTv: !openTv })} style={{ float: "right" }}>
                </div>
              </TabList>
              <TabPanel className="w-100">
                <div style={{ marginTop: "-15px" }}>

                  {" "} <Collapse in={openTv}>
                    <div>
                      <ul className="nav nav-tabs video_nav_tab">
                        <li className="nav-item">
                          <a
                            className="nav-link active"
                            data-toggle="tab"
                            href="#video1"
                          >
                            Channel 1
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            data-toggle="tab"
                            href="#video2"
                          >
                            Channel 2
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            data-toggle="tab"
                            href="#video3"
                          >
                            Channel 3
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            data-toggle="tab"
                            href="#video4"
                          >
                            Channel 4
                          </a>
                        </li>
                      </ul>
                      <div className="tab-content" style = {{height:"200px"}}>
                        <div id="video1" className=" tab-pane active">
                          <iframe
                            className="tab_video w-100"
                            src="https://video.indibetsportsbook.com:8888/embed_player?urlServer=wss://video.indibetsportsbook.com:8443&streamName=ch_1&autoplay=false&mediaProviders=WebRTC,Flash,MSE,WSPlayer"
                            style = {{height:"200px"}}
                          ></iframe>
                        </div>
                        <div id="video2" className=" tab-pane fade">
                          <iframe
                            className="tab_video w-100"
                            src="https://video.indibetsportsbook.com:8888/embed_player?urlServer=wss://video.indibetsportsbook.com:8443&streamName=ch_2&autoplay=false&mediaProviders=WebRTC,Flash,MSE,WSPlayer"
                            style = {{height:"200px"}} ></iframe>
                        </div>
                        <div id="video3" className=" tab-pane fade">
                          <iframe
                            className="tab_video w-100"
                            src=" https://video.indibetsportsbook.com:8888/embed_player?urlServer=wss://video.indibetsportsbook.com:8443&streamName=ch_3&autoplay=false&mediaProviders=WebRTC,Flash,MSE,WSPlayer
                            " style = {{height:"200px"}}
                          ></iframe>
                        </div>
                        <div id="video4" className=" tab-pane fade">
                          <iframe
                            className="tab_video w-100" style = {{height:"200px"}}
                            src="https://video.indibetsportsbook.com:8888/embed_player?urlServer=wss://video.indibetsportsbook.com:8443&streamName=ch_4&autoplay=false&mediaProviders=WebRTC,Flash,MSE,WSPlayer"
                          ></iframe>
                        </div>
                      </div>
                    </div>
                  </Collapse>

                  <div className="card-header4 px-2">
                    <span className="mt-2">
                      {this.state.firstTeamName} v{" "}
                      {this.state.secondTeamName}

                    </span>
                    <span
                      className="moment mt-1"
                      style={{ float: "right" }}
                    >

                      {Moment(this.props.match.params.date ?
                        this.props.match.params.date : null).format("MM/DD/YYYY HH:mm A")}
                    </span>

                  </div>
                  {/* 
                  {this.state.gameName === "soccer" ? (
                    <iframe
                      src={
                        "http://94.237.73.45:8000/" +
                        this.state.gameName +
                        "/" +
                        this.state.gameID
                      }
                      width="100%"
                    ></iframe>
                  ) : (
                    <iframe
                      src={
                        "https://graph.dreamcasino.live/" +
                        this.state.gameName +
                        "/" +
                        this.state.gameID
                      }
                      width="100%"
                    ></iframe>
                  )} */}

                  <div className="card-header3 w-100 px-2">
                    <span className="textC mt-2">
                      MATCH_ODDS{" "}</span>
                    <span
                      style={{ float: "right" }}>
                      <i className="fa fa-info-circle float-right mt-1" />
                    </span>
                  </div>

                  <div>
                    <div
                      className="table-responsive mb-1"
                      data-marketid="1.167146463"
                    >
                      <table className="table coupon-table table-bordered1 table-sm">
                        <thead>
                          <tr
                          >
                            <th className="fb_64"> Max:10000</th>
                            <th className="boxMobileback bgback">BACK</th>
                            <th className="boxMobilelay bglay">LAY</th>
                          </tr>
                        </thead>
                        <tbody id="dyn_bind">
                          <tr className="bet-info">
                            <td
                              className="table-active fb_64"
                            >
                              <span>
                                <strong>{this.state.firstTeamName}</strong>
                              </span>
                              <p className="box-w4">
                                <span
                                  className="float-right book"
                                  id="book_349"
                                >
                                  {this.state.team_profit1 &&
                                    this.state.team_profit1 > 0 ? (
                                    <strong className="text-success">
                                      {this.state.team_profit1}
                                    </strong>
                                  ) : (
                                    <strong className="text-danger">
                                      {this.state.team_profit1}
                                    </strong>
                                  )}

                                  {this.state.stackAmount_team1 &&
                                    this.state.stackAmount_team1 > 0 ? (
                                    <strong className="text-success">
                                      {this.state.stackAmount_team1}
                                    </strong>
                                  ) : (
                                    <strong className="text-danger">
                                      {this.state.stackAmount_team1}
                                    </strong>
                                  )}
                                </span>{" "}
                              </p>

                              <p className="box-w4">
                                {this.state.profit12 &&
                                  this.state.profit12 > 0 ? (
                                  <strong className="text-success float-left book textD">

                                    {parseFloat(this.state.profit12)}
                                  </strong>
                                ) : (
                                  <strong className="text-danger float-left book textD">

                                    {parseFloat(this.state.profit12)}
                                  </strong>
                                )}

                              </p>
                            </td>


                            <td id="blockin3" className="boxMobile fb_td bgback">
                              {status}
                              <button
                                className="bgback"
                                onClick={this.handleBidClick.bind(
                                  this,
                                  this.state.firstTeamName,
                                  this.state.teamOneFirstBack,
                                  "#A8DBFF",
                                  "back",
                                  this.state.teamOneSelectionId,
                                  this.state.marketId,
                                  "teamone",
                                  this.state.status,
                                  "odds",
                                  "betmatch"
                                )}
                              >
                                {" "}
                                <span className="odd2 backprice">
                                  {this.state.teamOneFirstBack}
                                </span>{" "}
                                <span className="textD">
                                  {this.state.teamOneFirstBackSize}
                                </span>
                              </button>
                            </td>

                            <td id="blockin4" className="boxMobilelay bglay fb_td">
                              {status}
                              <button
                                className="bglay"
                                value={this.state.lastPriceTraded1}
                                onClick={this.handleBidClick.bind(
                                  this,
                                  this.state.firstTeamName,
                                  this.state.teamOneFirstLay,
                                  "#FAC8D3",
                                  "lay",
                                  this.state.teamOneSelectionId,
                                  this.state.marketId,
                                  "teamone",
                                  this.state.status,
                                  "odds",
                                  "betmatch"
                                )}
                              >
                                <span className="odd2 layprice">
                                  {this.state.teamOneFirstLay}
                                </span>

                                <span className="textD">
                                  {this.state.teamOneFirstLaySize}
                                </span>
                              </button>
                            </td>

                          </tr>
                          <tr className="bet-info ">
                            <td
                              className="table-active"
                              id="10301"
                              style={{ width: "270px" }}
                            >
                              <span>
                                <strong>{this.state.secondTeamName}</strong>
                              </span>
                              <p className="box-w4">
                                <span
                                  className="float-right book"
                                  id="book_10301"
                                >
                                  {this.state.team_profit2 &&
                                    this.state.team_profit2 > 0 ? (
                                    <strong className="text-success">
                                      {this.state.team_profit2}
                                    </strong>
                                  ) : (
                                    <strong className="text-danger">
                                      {this.state.team_profit2}
                                    </strong>
                                  )}

                                  {this.state.stackAmount_team2 &&
                                    this.state.stackAmount_team2 > 0 ? (
                                    <strong className="text-success">
                                      {this.state.stackAmount_team2}
                                    </strong>
                                  ) : (
                                    <strong className="text-danger">
                                      {this.state.stackAmount_team2}
                                    </strong>
                                  )}
                                </span>{" "}

                              </p>
                              <p className="box-w4">

                                {this.state.profit13 &&
                                  this.state.profit13 > 0 ? (
                                  <strong className="text-success float-left book textD">

                                    {parseFloat(this.state.profit13)}
                                  </strong>
                                ) : (
                                  <strong className="text-danger float-left book textD">

                                    {parseFloat(this.state.profit13)}
                                  </strong>
                                )}
                              </p>
                            </td>


                            <td id="blockin9" className="boxMobileback bgback">
                              {status}
                              <button
                                className="bgback"
                                onClick={this.handleBidClick.bind(
                                  this,
                                  this.state.secondTeamName,
                                  this.state.teamTwoFirstBack,
                                  "#A8DBFF",
                                  "back",
                                  this.state.teamTwoSelectionId,
                                  this.state.marketId,
                                  "teamtwo",
                                  this.state.status,
                                  "odds",
                                  "betmatch"
                                )}
                              >
                                {" "}
                                <span className="odd2 backprice">
                                  {this.state.teamTwoFirstBack}
                                </span>
                                <span className="textD">
                                  {this.state.teamTwoFirstBackSize}{" "}
                                </span>
                              </button>
                            </td>

                            <td id="blockin10" className="boxMobilelay bglay">
                              {status}
                              <button
                                className="bglay"
                                value={this.state.lastPriceTraded1}
                                onClick={this.handleBidClick.bind(
                                  this,
                                  this.state.secondTeamName,
                                  this.state.teamTwoFirstLay,
                                  "#FAC8D3",
                                  "lay",
                                  this.state.teamTwoSelectionId,
                                  this.state.marketId,
                                  "teamtwo",
                                  this.state.status,
                                  "odds",
                                  "betmatch"
                                )}
                              >
                                <span className="odd2 layprice">
                                  {this.state.teamTwoFirstLay}
                                </span>

                                <span className="textD">
                                  {this.state.teamTwoFirstLaySize}
                                </span>
                              </button>
                            </td>

                          </tr>
                          {this.showDrawHtml()}
                        </tbody>
                      </table>
                    </div>

                    <div className="w-100" style={{ marginTop: "-17px" }}>
                      <div id="fancyHeadToHide">
                        <div className="card-header3 w-100 px-2">
                          {" "}
                          <span className="textC mt-3">
                            Bookmaker
                          </span>
                          <i class="fa fa-info-circle float-right mt-1"></i>
                        </div>
                        <div className="new_table1 coupon-table table table-bordered1">
                          {this.showBookMarketAllHtml()}
                        </div>

                        <Tabs>
                          <TabList className="d-flex flex-row tablist w-100" style={{ marginTop: "-12px" }}>
                            <Tab className="bg2 texttab3 text-center">
                              <div className="mt-1">Fancy</div>
                            </Tab>
                            <Tab className="texttab3 text-center">
                              <div className="mt-1">Fancy1</div>
                            </Tab>
                            <Tab className="texttab3 text-center">
                              <div className="mt-1">meter</div>
                            </Tab>    <Tab className="texttab3 text-center">
                              <div className="mt-1">khado</div>
                            </Tab>     <Tab className="texttab3 text-center">
                              <div className="mt-1">six</div>
                            </Tab><Tab className="texttab3 text-center">
                              <div className="mt-1">odd even</div>
                            </Tab><Tab className="texttab3 text-center px-3">
                              <div className="mt-1">wicket</div>
                            </Tab>     <Tab className="texttab3 text-center">
                              <div className="mt-1">four</div>
                            </Tab>

                            <Tab className="texttab3 text-center">
                              <div className="mt-1">cricket casino</div>
                            </Tab>
                          </TabList>
                          <TabPanel style={{ marginTop: "-15px" }}>
                            {
                              this.state.sessiondata && this.state.sessiondata.length ?
                                (<table className="table coupon-table table-bordered1 ">
                                  <thead>
                                    <tr>
                                      <th className="card-header3 w-100">
                                        <span className="textC text-left">Session Market</span>
                                        <i className="fa fa-info-circle float-right" /></th>

                                      <th className="boxMobilelay bglay">No</th>
                                      <th className="bgback boxMobileback">Yes</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {new_array}</tbody>
                                </table>) : (
                                  <table className="table">
                                    <tbody>
                                      <tr>
                                        <td colSpan="5" className="text-center bg4">
                                          <div className="profit font-weight-normal"> No real-time  records found!</div>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                )
                            }

                          </TabPanel>
                          <TabPanel style={{ "marginTop ": "-15px" }}>
                            <table className="table">
                              <tbody>
                                <tr>
                                  <td colSpan="5" className="text-center bg4">
                                    <div className="profit font-weight-normal"> No real-time  records found!</div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </TabPanel>
                          <TabPanel style={{ "marginTop ": "-15px" }}>
                            <table className="table">
                              <tbody>
                                <tr>
                                  <td colSpan="5" className="text-center bg4">
                                    <div className="profit font-weight-normal"> No real-time  records found!</div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </TabPanel>
                          <TabPanel style={{ "marginTop ": "-15px" }}>
                            <table className="table">
                              <tbody>
                                <tr>
                                  <td colSpan="5" className="text-center bg4">
                                    <div className="profit font-weight-normal"> No real-time  records found!</div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </TabPanel><TabPanel style={{ "marginTop ": "-15px" }}>
                            <table className="table">
                              <tbody>
                                <tr>
                                  <td colSpan="5" className="text-center bg4">
                                    <div className="profit font-weight-normal"> No real-time  records found!</div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </TabPanel><TabPanel style={{ "marginTop ": "-15px" }}>
                            <table className="table">
                              <tbody>
                                <tr>
                                  <td colSpan="5" className="text-center bg4">
                                    <div className="profit font-weight-normal"> No real-time  records found!</div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </TabPanel><TabPanel style={{ "marginTop ": "-15px" }}>
                            <table className="table">
                              <tbody>
                                <tr>
                                  <td colSpan="5" className="text-center bg4">
                                    <div className="profit font-weight-normal"> No real-time  records found!</div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </TabPanel><TabPanel style={{ "marginTop ": "-15px" }}>
                            <table className="table">
                              <tbody>
                                <tr>
                                  <td colSpan="5" className="text-center bg4">
                                    <div className="profit font-weight-normal"> No real-time  records found!</div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </TabPanel><TabPanel style={{ "marginTop ": "-15px" }}>
                            <table className="table">
                              <tbody>
                                <tr>
                                  <td colSpan="5" className="text-center bg4">
                                    <div className="profit font-weight-normal"> No real-time  records found!</div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </TabPanel>
                        </Tabs>


                      </div>
                    </div>
                  </div>

                </div>

                <div className="col-md-3 w-100">



                  <div className="card m-b-10 place-bet m-t-10">


                    {this.showBidClickHtml()}
                    {this.showBidClickSessionHtml()}
                  </div>

                  <form
                    onSubmit={this.handleFancybetSubmit}
                    method="post"
                    id="frm_placebet"
                  >
                    <table className="table table-borderedless place-bet px-3">
                      <tbody>
                        {this.getFancybet()}
                        {this.getFancybetPoint()}
                        <br></br>
                        {this.getFancySecondbet()}
                        {this.getSecondFancybetPoint()}
                      </tbody>
                    </table>
                  </form>
                </div>


                <Modal show={this.state.showUserAmountPopup}>
                  <Modal.Header>
                    <Modal.Title>Run Position</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <table className="table coupon-table table table-striped table-bordered m-t-10 mb-0">
                      <thead>
                        <tr>
                          <th className=" box-w1">Run</th>
                          <th className=" box-w1">Amount</th>
                        </tr>
                      </thead>
                      <tbody id="dyn_bind">{new_fancy_arr}</tbody>
                    </table>
                  </Modal.Body>
                  <Modal.Footer>
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-dismiss="modal"
                      onClick={this.handleDepoWithdrPopupClose}
                    >
                      <i className="fas fa-undo-alt"></i> Close
                  </button>
                  </Modal.Footer>
                </Modal>
              </TabPanel>
              <TabPanel style={{ marginTop: "-15px" }}>
                <div className="card place-bet">
                  <div className="card-header3">
                    <h6 className="card-title d-inline-block">My Bet</h6>
                  </div>
                  <div
                    className="table-responsive hide-box-click "
                    style={{ paddingBottom: "4px", display: "block" }}
                  >
                    {this.showTableHtml()}
                  </div>
                </div>
              </TabPanel>


            </Tabs>
          </div></div>
      );
    } else {
      return (
        <div className="d-flex flex-column">
          <Nav />
          <div className="card-header3 mt-1 w-100">
            <span className="textC">
              MATCH_ODDS{" "}
            </span>

            <i className="fa fa-info-circle float-right mt-1" />

          </div>
          <div className="card-header3 mt-1 w-100">
            <span className="textC">
              Bookmaker Market{" "}</span>

            <i className="fa fa-info-circle float-right mt-1" />

          </div>
          <div className="card-header3 mt-1 w-100">
            <span className="textC">
              Fancy Bet{" "}</span>

            <i className="fa fa-info-circle float-right mt-1" />

          </div>
          <div className="w-100 text-center">
            {this.state.isLoading ? <i
              className="fa fa-spinner fa-spin fa-3x fa-fw text-muted text-center mt-3"
              aria-hidden="true"
            ></i> : null}</div>
        </div>


      );
    }
  }
}

export default Index;
