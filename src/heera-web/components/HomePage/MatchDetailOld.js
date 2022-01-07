/* eslint-disable */
import React, { Component } from "react";
import Nav from "../Include/Nav";
import Menu from "../Include/Menu";
import Sidebar from "../Include/Sidebar";
import Url from "../configure/configure.js";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { Card, Modal } from "react-bootstrap";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Moment from "moment";
import FullPageLoader from "../Loader/FullPageLoader";
import $ from "jquery";
const baseUrl = Url.baseUrl;

class Index extends Component {
  constructor(props) {
    super(props);
    var accessToken = localStorage.getItem("token");
    var user_id = localStorage.getItem("user_id");
    this.state = {
      accessToken: accessToken,
      draw: false,
      user_id: user_id,
      matchids: "",
      BatAmount_second: "",
      proFitfirstval: "",
      proFitsecondval: "",
      getFancybet: false,
      getFancySecondbet: false,
      pancypickCall: false,
      stake_amount: 0,
      respStatus: "",
      respMessage: "",
      emptyField: false,
      loading: true,
      team_profit1: "",
      team_profit2: "",
      new_array: {},
      stackAmount_team1: "",
      stackAmount_team2: "",
      stackAmount_team3: "",
      stackAmount_team4: "",
      stackAmount_team5: "",
      stackAmount_team6: "",
      profit22: "",
      profit_team: "",
      loss_team: "",
      profit12: 0,
      profit13: 0,
      profit14: 0,
      loss: 0,
      profit: 0,
      fancyDataFound: false,
      getFancyResults: "",
      betClick1: false,
      headname: "",
      SessInptNo: "",
      no: "",
      yes: "",
      status: "",
      buttonvalue_new: "",
      no_data_model: "",
      yes_data_model: "",
      color_data_model: "",
      showUserAmountPopup: false,
      key_index: "",
      bookmaker_draw: false,
      bookmakerFirstTeamFound: false,
      bookmakerSecondTeamFound: false,
      fancyMatchSuspend: false,
      oddsMatchSuspend: false,
      showVideo: false,
      currentMatchId: this.props.match.params.id,
      getFancyResultsHide: "",
      showBookMakerLiveApiData: true,
      profit15: 0,
      profit16: 0,
      profit17: 0,
      buttonValue111: "",
      isLoading: false,
      gameID: "",
      gameName: "",
      bookmaker_d_back_1: "",
      bookmaker_d_lay_1: "",
      eventName: "",
      betLoder: false,
      bookmakerMax: 0,
      bookmakerMin: 0,
      matchOddsMax: 0,
      matchOddsMin: 0,
      fancyMax: 0,
      fancyMin: 0,
      exposure: 0,
      bet_team: "",
      matchOdds: [],
    };
    this.emailInput = React.createRef();
    this.currentUserDetail();
  }

  currentUserDetail = () => {
    let headers = {
      Authorization: "Bearer " + this.state.accessToken,
    };
    axios.get(baseUrl + "/current", { headers }).then((resp) => {
      var resp = resp.data;
      this.setState({ userData: resp });
    });
  };

  componentDidMount() {
    let gameID = this.props.match.params.id;
    let gameName = this.props.match.params.id1;
    this.setState({ isLoading: true, gameID, gameName });
    let headers = {
      Authorization: "Bearer " + this.state.accessToken,
    };

    this.getoddsValue();
    this.interval = setInterval(() => {
      this.getoddsValue();
    }, 1000);

    axios.get(baseUrl + "/button_value", { headers }).then((resp) => {
      var resps = resp.data;
      if (resps.success === true) {
        this.setState({ buttonValue111: resps.value });
      }
    });
    this.callUserBetListApi();
    this.callFancyListApi();
    this.adminMaxMin();
  }

  getoddsValue() {
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
        this.callMatchoddsApi(
          resp.data,
        );
      }

    });
  }
  adminMaxMin = () => {
    const data =
    {
      match_id: this.props.match.params.id,
    }
    let headers = {
      Authorization: "Bearer " + this.state.accessToken,
    };
    axios.post("http://api.encabook999.com/maxmin_bet_limit/", data, { headers }).then((resp) => {
      if (resp) {
        this.setState({
          bookmakerMin: resp.data.limits && resp.data.limits.bookmaker_minimum_bet_limit ? resp.data.limits.bookmaker_minimum_bet_limit : 100,
          bookmakerMax: resp.data.limits && resp.data.limits.bookmaker_maximum_bet_limit ? resp.data.limits.bookmaker_maximum_bet_limit : 50000,
          matchOddsMin: resp.data.limits && resp.data.limits.minimum_bet_limit ? resp.data.limits.minimum_bet_limit : 100,
          matchOddsMax: resp.data.limits && resp.data.limits.maximum_bet_limit ? resp.data.limits.maximum_bet_limit : 50000,
          fancyMin: resp.data.limits && resp.data.limits.fancy_minimum_bet_limit ? resp.data.limits.fancy_minimum_bet_limit : 100,
          fancyMax: resp.data.limits && resp.data.limits.fancy_maximum_bet_limit ? resp.data.limits.fancy_maximum_bet_limit : 50000,
        })
      }

    });
  };
  componentWillUnmount() {
    clearInterval(this.interval);
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
  };
  // UserExposure = () => {
  //   let headers = {
  //     Authorization: "Bearer " + this.state.accessToken,
  //   };
  //   axios.get(baseUrl + "/user_curr_balance", { headers }).then((resp) => {
  //     var respNew = resp.data;
  //     if (respNew.success === true) {
  //       var exposerAmount = respNew.adminlist[0].data_new;
  //       if (exposerAmount === undefined || exposerAmount === "") {
  //         exposerAmount = 0;
  //       }
  //       this.setState({
  //         exposerAmount: exposerAmount,
  //       });
  //     }
  //   });
  // }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ betLoder: true });
    const { exposure, betOn, matchOdds, oddVal,type ,teamName} = this.state;
    let headers = {
      Authorization: "Bearer " + this.state.accessToken,
    };
    if (isNaN(parseInt(this.state.oddVal)) || this.state.oddVal <= 0) {
      this.setState({
        emptyField: true, errMsg: "Enter Valid odds",
        betLoder: false
      });
      return false;
    }
    if (
      isNaN(parseInt(this.state.stake_amount)) ||
      this.state.stake_amount <= 0
    ) {
      this.setState({ emptyField: true, errMsg: "Enter Stake", betLoder: false });
      return false;
    }
    if (betOn === "odds") {
      let market = matchOdds;
      let marketData = market.filter(item => item.RunnerName === teamName);
      console.log("marketData",marketData);
      if (type=== 'back') {
        if (marketData[0].BackPrice1 !== oddVal && marketData[0].BackPrice2 !== oddVal && marketData[0].BackPrice3 !== oddVal) {
          this.setState({
            emptyField: true, errMsg: "Enter Valid odds",
            betLoder: false
          });
        }

      } else if (type === 'lay') {
        if (marketData[0].LayPrice1 !== oddVal && marketData[0].LayPrice2 !== oddVal && marketData[0].LayPrice3 !== oddVal) {
          this.setState({
            emptyField: true, errMsg: "Enter Valid odds",
            betLoder: false
          });
        }
      }
    }
    let exposure1 = exposure;
    let exposerAmount = localStorage.getItem("exposerAmount") ? localStorage.getItem("exposerAmount") : 0;
    if (exposerAmount < 0) {
      exposure1 = parseInt(exposerAmount) + exposure1;
      exposure1 = 0 - exposure1;
    }
    else {
      exposure1 = parseInt(exposerAmount) - exposure1;
      exposure1 = 0 - exposure1
    }
    let savebet = {
      event_id: this.props.match.params.id,
      event_name: this.props.match.params.id1,
      odds: this.state.oddVal,
      stake: this.state.stake_amount,
      profit: parseInt(this.state.profit),
      bet_type: this.state.type,
      type: "match",
      team_name: this.state.teamName,
      selection_id: this.state.betSelectionId,
      market_id: this.state.betMarketId,
      current_market_odds: this.state.oddVal,
      profit_team: this.state.profit_team,
      loss_team: this.state.loss_team,
      loss: parseInt("-" + this.state.loss),
      color: this.state.color,
      event_type: this.props.match.params.id1,
      type1: "odds",
      bet_on: this.state.betOn,
      bet_team: this.state.bet_team,
    };
    var delay_time = this.state.userData.cricket_delay * 1000;
    if (this.state.betOn == "bookmaker") {
      var delay_time = 0;
    }
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
                betLoder: false,
              });
              this.showTableHtml();
              $(".blockUI").hide();
              setTimeout(() => {
                this.setState({
                  respStatus: "",
                  betClick1: false,
                  betClick: false,
                  betClick2: false,
                  betLoder: false,
                });
              }, 3000);
            } else {
              this.setState({
                respStatus: resp.success,
                respMessage: resp.message,
                betLoder: false,
              });

              $(".blockUI").hide();
              setTimeout(() => {
                this.setState({
                  respStatus: "",
                  betClick1: false,
                  betClick: false,
                  betClick2: false,
                  betLoder: false,
                });
              }, 3000);

            }
            this.callUserBetListApi();
            $(".blockUI").hide();
          }),
      delay_time
    );
  };
  handleSubmitSession = (event) => {
    this.handleButtonsClick(this.state.stake_amount);
    this.setState({ betLoder: true });
    event.preventDefault();
    let headers = {
      Authorization: "Bearer " + this.state.accessToken,
    };

    let matchid = this.props.match.params.id;
    var yes_amount = "";
    var no_amount = "";
    var new_value = "";

    var no_amount1 = "";
    if (this.state.no === "no") {
      new_value = this.state.session_input;
      no_amount = this.state.session_input;
      var no_amount1 = this.state.no;
    }
    if (this.state.no === "yes") {
      new_value = this.state.session_input;
      no_amount = this.state.session_input;
      var no_amount1 = this.state.no;
    }
    var exposure = "-" + this.state.stake_amount;

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
      yes_no_stake: "",
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
            betLoder: false,
          });
          this.showTableHtml();
          setTimeout(() => {
            this.setState({
              respStatus: "",
              betClick1: false,
              betClick: false,

              betLoder: false,
            });
          }, 6000);
        } else {
          this.setState({
            respStatus: resp.success,
            respMessage: resp.message,

            betLoder: false,
          });
          setTimeout(() => {
            this.setState({
              respStatus: "",
              betClick1: false,
              betClick: false,

              betLoder: false,
            });
          }, 6000);
        }
        this.callUserBetListApi();
      });
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
    this.setState({ betLoder: true })
    event.preventDefault();
    let savebet = {
      event_id: this.props.match.params.id,
      user_id: this.state.user_id,
      team_id: this.state.teamid1,
      team_id_second: this.state.teamid2,
      matchids: this.state.matchids,
      eventName: this.state.eventName,
      odds: this.state.marketName,
      odds_first_lay: this.state.amountFancybetBal,
      odds_second_lay: this.state.amountFancybetBalSecond,
      teamname: this.state.teamname1,
      teamname_second: this.state.teamname2,
      BatAmount: this.state.amountFancybetFirst * this.state.amountFancybetBal,
      BatAmount_second: this.state.amountFancybetSecond * this.state.amountFancybetBalSecond,
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
            betLoder: false,
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
            betLoder: false,
            betLoder: false,
          });
          setTimeout(() => {
            this.setState({
              respStatus: "",
              betClick1: false,
              betClick: false,
              betLoder: false,
            });
          }, 6000);
        }
      });
  };


  callFancyListApi = () => {
    let headers = {
      Authorization: "Bearer " + this.state.accessToken,
    };

    let matchid = this.props.match.params.id;
    axios.get(baseUrl + "/fancyapi/" + matchid, { headers }).then((resp) => {
      var matchSuspendFromAdmin = resp.data.suspendcount === 0 ? false : true;
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
      var new_array = [];
      var new_array1 = [];
      var new_array2 = [];

      if (this.state.getResults !== undefined) {
        for (var i = 0; i < this.state.getResults.length; i++) {
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
        var index = 0;
        var i = 0;
        var hideMatchArr1 = ["demo"];
        if (this.state.getFancyResultsHide !== null) {
          if (
            this.state.getFancyResultsHide !== undefined &&
            this.state.getFancyResultsHide !== null &&
            this.state.getFancyResultsHide !== ""
          ) {
            for (var bn = 0; bn < this.state.getFancyResultsHide.length; bn++) {
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
            var blockHtml = "";
            if (hideMatchArr1.indexOf(fancyNewData.market_id) !== "-1") {
              var blockHtml = (
                <div className="bet-info suspendedfancy row">
                  <span>SUSPENDED</span>
                </div>
              );
            }

            var new_value = "";
            var new_value1 = "";

            if (
              this.state.fancyMatchSuspend &&
              hideMatchArr1.indexOf(fancyNewData.market_id) == "-1"
            ) {
              var blockHtml = (
                <div className="bet-info suspendedfancy row">
                  <span>SUSPENDED</span>
                </div>
              );
            } else if (hideMatchArr1.indexOf(fancyNewData.market_id) == "-1") {
              var blockHtml =
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

                html.push(
                  <tr>
                    <td className="fb_64 table-active">
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
                    <td className="box-w1 lay-color fb_td">
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
                        <span className="odd1 layprice">
                          {" "}
                          {fancyNewData.SessInptNo}
                        </span>
                        {fancyNewData.NoValume}
                      </button>
                    </td>

                    <td className="box-w1 back-color fb_td">
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
                        <span className="odd1 layprice">
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
                html.push(
                  <tr>
                    <td className="fb_64 table-active"> {fancyNewData.headname}</td>
                    <td className="box-w1 lay-color">
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
                        <span className="odd1 layprice">
                          {" "}
                          {fancyNewData.SessInptNo}
                        </span>
                        {fancyNewData.NoValume}
                      </button>
                    </td>

                    <td className="box-w1 back-color fb_td">
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
                        <span className="odd1 layprice">
                          {" "}
                          {fancyNewData.SessInptYes}
                        </span>
                        {fancyNewData.YesValume}
                      </button>
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
    axios.get(baseUrl + "/userbetlist/" + matchid, { headers }).then((resp) => {
      var resps = resp.data;
      if (resps.success === true) {

        this.setState({ getResults: resps.Betlist, betDataFound: true });

        // let teamBack = resp.data.Betlist.filter(item => item.bet_type === "back")
        // let teamLay = resp.data.Betlist.filter(item => item.bet_type === "lay")
        // team2 = resp.data.Betlist.filter(item => item.profit_team === "teamtwo" && item.bet_type === "lay")

        // let team22 = resp.data.Betlist.filter(item => item.profit_team === "teamtwo" && item.bet_type === "lay")

        // var totalProfitBack = teamBack.reduce(function (prev, cur) {
        //   return prev + parseInt(cur.profit);
        // }, 0);
        // var totalProfitLay = teamLay.reduce(function (prev, cur) {
        //   return prev + parseInt(cur.profit);
        // }, 0);
        // var totallossBack = teamBack.reduce(function (prev, cur) {
        //   return prev + parseInt(cur.loss);
        // }, 0);
        // var totallosslay = teamLay.reduce(function (prev, cur) {
        //   return prev + parseInt(cur.loss);
        // }, 0);

      }
    });
  };

  callMatchoddsApi = (
    data
  ) => {
    const { eventName } = this.state;
    let matchOdds = data && data.market && data.market.length && data.market[0] && data.market[0].events ? data.market[0] && data.market[0].events : null;
    this.setState({ matchOdds: matchOdds });
    let bookmaker = data.bookmake[0] && data.bookmake[0].runners ? data.bookmake[0].runners : null;
    if (data.session !== undefined && data.session && data.session[0] !== "No Data") {
      let myFancy = data.session.filter(item => item.GameStatus !== "OFFLINE" && item.GameStatus !== "CLOSED")
      this.setState({ sessiondata: myFancy });
    }
    this.setState({
      eventName: data && data.market && data.market.length && data.market[0] && data.market[0].events && data.market[0].events.length && data.market[0].events[0] && data.market[0].events[0].RunnerName ? data.market[0].events[0].RunnerName : null +
        " v " +
        data && data.market[0] && data.market[0].events[1] && data.market[0].events[1].RunnerName ? data.market[0].events[1].RunnerName : null,
      marketId: data && data.market && data.market[0] && data.market[0].marketId ? data.market[0].marketId : null,
      firstTeamName: data.market && data.market[0] && data.market[0].events[0] && data.market[0].events[0].RunnerName ? data.market[0].events[0].RunnerName : null,
      secondTeamName: data.market && data.market[0] && data.market[0].events[1] && data.market[0].events[1].RunnerName ? data.market[0].events[1].RunnerName : null,
      teamOneSelectionId: data.market && data.market[0] && data.market[0].events[0] && data.market[0].events[0].SelectionId ? data.market[0].events[0].SelectionId : 0,
      teamTwoSelectionId: data.market && data.market[0] && data.market[0].events[1] && data.market[0].events[1].SelectionId ? data.market[0].events[1].SelectionId : 0,

    })

    if (data.market !== undefined || data.market && data.market.market !== "no data") {

      if (data.market[0] && data.market[0].events[0] !== undefined) {
        this.setState({
          firstTeamName: matchOdds[0].RunnerName ? matchOdds[0].RunnerName : null,
          teamOneFirstBack: matchOdds[0].BackPrice1 ? matchOdds[0].BackPrice1 : 0,
          teamOneFirstBackSize: matchOdds[0].BackSize1 ? matchOdds[0].BackSize1 : 0,
          teamOneMiddleBack: matchOdds[0].BackPrice2 ? matchOdds[0].BackPrice2 : 0,
          teamOneMiddleBackSize: matchOdds[0].BackSize2 ? matchOdds[0].BackSize2 : 0,
          teamOneLastBack: matchOdds[0].BackPrice3 ? matchOdds[0].BackPrice3 : 0,
          teamOneLastBackSize: matchOdds[0].BackSize3 ? matchOdds[0].BackSize3 : 0,
          teamOneFirstLay: matchOdds[0].LayPrice1 ? matchOdds[0].LayPrice1 : 0,
          teamOneFirstLaySize: matchOdds[0].LaySize1 ? matchOdds[0].LaySize1 : 0,
          teamOneMiddleLay: matchOdds[0].LayPrice2 ? matchOdds[0].LayPrice2 : 0,
          teamOneMiddleLaySize: matchOdds[0].LaySize2 ? matchOdds[0].LaySize2 : 0,
          teamOneLastLay: matchOdds[0].LayPrice3 ? matchOdds[0].LayPrice3 : 0,
          teamOneLastLaySize: matchOdds[0].LaySize3 ? matchOdds[0].LaySize3 : 0,
        })
      }
      if (data.market[0] && data.market[0].events[1] !== undefined) {
        this.setState({
          secondTeamName: matchOdds[1].RunnerName ? matchOdds[1].RunnerName : null,
          teamTwoFirstBack: matchOdds[1].BackPrice1 ? matchOdds[1].BackPrice1 : 0,
          teamTwoFirstBackSize: matchOdds[1].BackSize1 ? matchOdds[1].BackSize1 : 0,
          teamTwoMiddleBack: matchOdds[1].BackPrice2 ? matchOdds[1].BackPrice2 : 0,
          teamTwoMiddleBackSize: matchOdds[1].BackSize2 ? matchOdds[1].BackSize2 : 0,
          teamTwoLastBack: matchOdds[1].BackPrice3 ? matchOdds[1].BackPrice3 : 0,
          teamTwoLastBackSize: matchOdds[1].BackSize3 ? matchOdds[1].BackSize3 : 0,
          teamTwoFirstLay: matchOdds[1].LayPrice1 ? matchOdds[1].LayPrice1 : 0,
          teamTwoFirstLaySize: matchOdds[1].LaySize1 ? matchOdds[1].LaySize1 : 0,
          teamTwoMiddleLay: matchOdds[1].LayPrice2 ? matchOdds[1].LayPrice2 : 0,
          teamTwoMiddleLaySize: matchOdds[1].LaySize2 ? matchOdds[1].LaySize2 : 0,
          teamTwoLastLay: matchOdds[1].LayPrice3 ? matchOdds[1].LayPrice3 : 0,
          teamTwoLastLaySize: matchOdds[1].LaySize3 ? matchOdds[1].LaySize3 : 0,
        })
      }
      if (data.market[0] && data.market[0].events[2] !== undefined) {
        this.setState({
          draw: true,
          drawTeamName: matchOdds[2].RunnerName ? matchOdds[2].RunnerName : null,
          drawFirstBack: matchOdds[2].BackPrice1 ? matchOdds[2].BackPrice1 : 0,
          drawFirstBackSize: matchOdds[2].BackSize1 ? matchOdds[2].BackSize1 : 0,
          drawMiddleBack: matchOdds[2].BackPrice2 ? matchOdds[2].BackPrice2 : 0,
          drawMiddleBackSize: matchOdds[2].BackSize2 ? matchOdds[2].BackSize2 : 0,
          drawLastBack: matchOdds[2].BackPrice3 ? matchOdds[2].BackPrice3 : 0,
          drawLastBackSize: matchOdds[2].BackSize3 ? matchOdds[2].BackSize3 : 0,
          drawFirstLay: matchOdds[2].LayPrice1 ? matchOdds[2].LayPrice1 : 0,
          drawFirstLaySize: matchOdds[2].LaySize1 ? matchOdds[2].LaySize1 : 0,
          drawMiddleLay: matchOdds[2].LayPrice2 ? matchOdds[2].LayPrice2 : 0,
          drawMiddleLaySize: matchOdds[2].LaySize2 ? matchOdds[2].LaySize2 : 0,
          drawLastLay: matchOdds[2].LayPrice3 ? matchOdds[2].LayPrice3 : 0,
          drawLastLaySize: matchOdds[2].LaySize3 ? matchOdds[2].LaySize3 : 0,
        })
      }
    }

    if (data.bookmake !== undefined && data.bookmake[0] && data.bookmake[0].runners && data.bookmake[0].runners[0] !== "unexpected Error Occur" && data.bookmake[0].runners[0] !== "No Data") {
      if (bookmaker[0] !== undefined) {
        this.setState({
          bookmakerFirstTeamFound: true,
          bookmaker_team1_status: bookmaker[0].GameStatus ? bookmaker[0].GameStatus : null,
          bookmaker_team1: bookmaker[0].RunnerName ? bookmaker[0].RunnerName : null,
          bookmaker_a_back_1: bookmaker[0] && bookmaker[0].BackPrice1 ? bookmaker[0].BackPrice1 : 0,
          bookmaker_a_back_2: bookmaker[0] && bookmaker[0].BackPrice2 ? bookmaker[0].BackPrice2 : 0,
          bookmaker_a_back_3: bookmaker[0] && bookmaker[0].BackPrice3 ? bookmaker[0].BackPrice3 : 0,
          bookmaker_a_lay_1: bookmaker[0] && bookmaker[0].LayPrice1 ? bookmaker[0].LayPrice1 : 0,
          bookmaker_a_lay_2: bookmaker[0] && bookmaker[0].LayPrice2 ? bookmaker[0].LayPrice2 : 0,
          bookmaker_a_lay_3: bookmaker[0] && bookmaker[0].LayPrice3 ? bookmaker[0].LayPrice3 : 0,
        })
      }
      if (bookmaker[1] !== undefined) {
        this.setState({
          bookmakerSecondTeamFound: true,
          bookmaker_team2_status: bookmaker[1].GameStatus ? bookmaker[1].GameStatus : null,
          bookmaker_team2: bookmaker[1].RunnerName ? bookmaker[1].RunnerName : null,
          bookmaker_b_back_1: bookmaker[1] && bookmaker[1].BackPrice1 ? bookmaker[1].BackPrice1 : 0,
          bookmaker_b_back_2: bookmaker[1] && bookmaker[1].BackPrice2 ? bookmaker[1].BackPrice2 : 0,
          bookmaker_b_back_3: bookmaker[1] && bookmaker[1].BackPrice3 ? bookmaker[1].BackPrice3 : 0,
          bookmaker_b_lay_1: bookmaker[1] && bookmaker[1].LayPrice1 ? bookmaker[1].LayPrice1 : 0,
          bookmaker_b_lay_2: bookmaker[1] && bookmaker[1].LayPrice2 ? bookmaker[1].LayPrice2 : 0,
          bookmaker_b_lay_3: bookmaker[1] && bookmaker[1].LayPrice3 ? bookmaker[1].LayPrice3 : 0,
        })
      }
      if (bookmaker[2] !== undefined) {
        this.setState({
          bookmaker_draw: true,
          bookmaker_team3_status: bookmaker[2].GameStatus ? bookmaker[2].GameStatus : null,
          bookmaker_team3: bookmaker[2].RunnerName ? bookmaker[2].RunnerName : null,
          bookmaker_d_back_1: bookmaker[2] && bookmaker[2].BackPrice1 ? bookmaker[2].BackPrice1 : 0,
          bookmaker_d_back_2: bookmaker[2] && bookmaker[2].BackPrice2 ? bookmaker[2].BackPrice2 : 0,
          bookmaker_d_back_3: bookmaker[2] && bookmaker[2].BackPrice3 ? bookmaker[2].BackPrice3 : 0,
          bookmaker_d_lay_1: bookmaker[2] && bookmaker[2].LayPrice1 ? bookmaker[2].LayPrice1 : 0,
          bookmaker_d_lay_2: bookmaker[2] && bookmaker[2].LayPrice2 ? bookmaker[2].LayPrice2 : 0,
          bookmaker_d_lay_3: bookmaker[2] && bookmaker[2].LayPrice3 ? bookmaker[2].LayPrice3 : 0,
        })
      }
    }

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


    let teamOneSelectionId = this.state.teamOneSelectionId;
    let teamTwoSelectionId = this.state.teamTwoSelectionId;
    var profit12 = 0;
    var profit13 = 0;
    var profit14 = 0;
    var profit15 = 0;
    var profit17 = 0;
    var profit16 = 0;
    var NewProfit = 0;
    var NewProfit1 = 0;
    var NewProfit2 = 0;
    var new_arrayfancy = [];
    var new_arrayfancy1 = [];
    var new_arrayfancy2 = [];
    if (this.state.getResults !== undefined) {
      for (let i = 0; i < this.state.getResults.length; i++) {
        if (
          this.state.getResults[i].profit_team === "teamone" &&
          this.state.getResults[i].team_name !== "The Draw" &&
          this.state.getResults[i].bet_on === "odds"
        ) {
          if (this.state.getResults[i].bet_type === "back") {
            profit12 = parseFloat(profit12) + parseFloat(this.state.getResults[i].profit);
            profit13 = parseFloat(profit13) + parseFloat(this.state.getResults[i].loss);
            profit14 = parseFloat(profit14) + parseFloat(this.state.getResults[i].loss);
          }
          else {
            profit12 = parseFloat(profit12) + parseFloat(this.state.getResults[i].profit);
            profit13 = parseFloat(profit13) + parseFloat(this.state.getResults[i].loss);
            profit14 = parseFloat(profit14) + parseFloat(this.state.getResults[i].profit);
          }
        }
        else if (
          this.state.getResults[i].profit_team == "teamtwo" &&
          this.state.getResults[i].team_name !== "The Draw" &&
          this.state.getResults[i].bet_on === "odds"
        ) {
          if (this.state.getResults[i].bet_type !== "lay") {
            profit12 = parseFloat(profit12) + parseFloat(this.state.getResults[i].loss);
            profit13 = parseFloat(profit13) + parseFloat(this.state.getResults[i].profit);
            profit14 = parseFloat(profit14) + parseFloat(this.state.getResults[i].loss);
          } else {
            profit12 = parseFloat(profit12) + parseFloat(this.state.getResults[i].loss);
            profit13 = parseFloat(profit13) + parseFloat(this.state.getResults[i].profit);
            profit14 = parseFloat(profit14) + parseFloat(this.state.getResults[i].profit);
          }
        } else {
          if (this.state.getResults[i].bet_on === "odds" &&
            this.state.getResults[i].team_name === "The Draw") {
            if (this.state.getResults[i].bet_type !== "lay") {
              profit12 = parseFloat(profit12) + parseFloat(this.state.getResults[i].loss);
              profit13 = parseFloat(profit13) + parseFloat(this.state.getResults[i].loss);
              profit14 = parseFloat(profit14) + parseFloat(this.state.getResults[i].profit);
            }
            else {
              profit12 = parseFloat(profit12) + parseFloat(this.state.getResults[i].profit);
              profit13 = parseFloat(profit13) + parseFloat(this.state.getResults[i].profit);
              profit14 = parseFloat(profit14) + parseFloat(this.state.getResults[i].loss);
            }
          }
        }
        if (
          this.state.getResults[i].profit_team === "teamone" &&
          this.state.getResults[i].team_name !== "The Draw" &&
          this.state.getResults[i].bet_on === "bookmaker"
        ) {
          if (this.state.getResults[i].bet_type === "back") {
            profit15 = parseFloat(profit15) + parseFloat(this.state.getResults[i].profit);
            profit16 = parseFloat(profit16) + parseFloat(this.state.getResults[i].loss);
            profit17 = parseFloat(profit17) + parseFloat(this.state.getResults[i].loss);
          }
          else {
            profit15 = parseFloat(profit15) + parseFloat(this.state.getResults[i].profit);
            profit16 = parseFloat(profit16) + parseFloat(this.state.getResults[i].loss);
            profit17 = parseFloat(profit17) + parseFloat(this.state.getResults[i].profit);
          }
        }
        else if (
          this.state.getResults[i].profit_team == "teamtwo" &&
          this.state.getResults[i].team_name !== "The Draw" &&
          this.state.getResults[i].bet_on === "bookmaker"
        ) {
          if (this.state.getResults[i].bet_type !== "lay") {
            profit15 = parseFloat(profit15) + parseFloat(this.state.getResults[i].loss);
            profit16 = parseFloat(profit16) + parseFloat(this.state.getResults[i].profit);
            profit17 = parseFloat(profit17) + parseFloat(this.state.getResults[i].loss);
          } else {
            profit15 = parseFloat(profit15) + parseFloat(this.state.getResults[i].loss);
            profit16 = parseFloat(profit16) + parseFloat(this.state.getResults[i].profit);
            profit17 = parseFloat(profit17) + parseFloat(this.state.getResults[i].profit);
          }
        } else {
          if (this.state.getResults[i].bet_on === "bookmaker" &&
            this.state.getResults[i].team_name === "The Draw") {
            if (this.state.getResults[i].bet_type !== "lay") {
              profit15 = parseFloat(profit15) + parseFloat(this.state.getResults[i].loss);
              profit16 = parseFloat(profit16) + parseFloat(this.state.getResults[i].loss);
              profit17 = parseFloat(profit17) + parseFloat(this.state.getResults[i].profit);
            }
            else {
              profit15 = parseFloat(profit15) + parseFloat(this.state.getResults[i].profit);
              profit16 = parseFloat(profit16) + parseFloat(this.state.getResults[i].profit);
              profit17 = parseFloat(profit17) + parseFloat(this.state.getResults[i].loss);
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
    });
  };


  showDrawHtml = () => {
    if (this.state.draw === true && this.state.drawTeamName !== null) {
      var status = this.state.status;
      if (status !== "OPEN") {
        var status = this.state.status;
      } else {
        var status = "";
      }
      var blockHtml = "";
      if (this.state.oddsMatchSuspend) {
        var blockHtml = (
          <div className="bet-info suspendedodds row">
            <span>SUSPENDED</span>
          </div>
        );
      }
      var team_profit3 =
        this.state.team_profit3 === undefined || this.state.team_profit3 === ""
          ? this.state.team_profit3
          : parseFloat(this.state.team_profit3);

      return (
        <tr className="bet-info ">
          <td
            className="team-name nation table-active"
            style={{ width: "270px" }}
          >
            <span>
              {this.state.drawTeamName}
            </span>

            <p className="box-w4 textProfit">
              <span
                className="float-right book"
              >
                {this.state.team_profit3 &&
                  this.state.team_profit3 > 0 ? (
                  <span className="text-success textProfit">
                    {this.state.team_profit3}
                  </span>
                ) : (
                  <span className="text-danger textProfit">
                    {this.state.team_profit3}
                  </span>
                )}

                {this.state.stackAmount_team3 &&
                  this.state.stackAmount_team3 > 0 ? (
                  <span className="text-success">
                    {this.state.stackAmount_team3}
                  </span>
                ) : (
                  <span className="text-danger">
                    {this.state.stackAmount_team3}
                  </span>
                )}
              </span>{" "}

            </p>


            <p className="box-w4">
              <span
                className="float-left book"

              >

                {this.state.profit14 &&
                  this.state.profit14 > 0 ? (
                  <span className="text-success float-left textProfit">
                    {parseFloat(this.state.profit14)}
                  </span>
                ) : (
                  <span className="text-danger float-left textProfit">
                    {parseFloat(this.state.profit14)}
                  </span>
                )}</span>
            </p>
          </td>

          <td
            className="box-w1 back-color re_none"
            style={{ backgroundColor: "#B2D6F0" }}
          >
            {blockHtml}
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
                this.state.status,
                "odds"
              )}
            >
              {" "}
              <span className="odd1 backprice">{this.state.drawLastBack}</span>

              <span className="text11">{this.state.drawLastBackSize}</span>
            </button>
          </td>
          <td
            className="box-w1 back-color re_none"
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
                this.state.status,
                "odds"
              )}
            >
              {" "}
              <span className="odd1 backprice">
                {this.state.drawMiddleBack}
              </span>{" "}

              <span className="text11"> {this.state.drawMiddleBackSize}</span>
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
                this.state.status,
                "odds"
              )}
            >
              {" "}
              <span className="odd1 backprice">
                {this.state.drawFirstBack}
              </span>{" "}
              <span className="text11"> {this.state.drawFirstBackSize}</span>
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
                this.state.status,
                "odds"
              )}
              value={this.state.lastPriceTraded1}
            >
              <span className="odd1 layprice">{this.state.drawFirstLay}</span>

              <span className="text11"> {this.state.drawFirstLaySize}</span>
            </button>
          </td>
          <td
            className="box-w1 lay-color re_none"
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
                this.state.status,
                "odds"
              )}
            >
              <span className="odd1 layprice">{this.state.drawMiddleLay}</span>

              <span className="text11">      {this.state.drawMiddleLaySize}</span>
            </button>
          </td>
          <td
            className="box-w1 lay-color re_none"
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
                this.state.status,
                "odds"
              )}
            >
              <span className="odd1 layprice">{this.state.drawLastLay}</span>

              <span className="text11"> {this.state.drawLastLaySize}</span>
            </button>
          </td>
        </tr>
      );
    }
  };


  showTableHtml = () => {
    if (this.state.betDataFound === true) {
      const html = [];
      const html1 = [];
      //var custom_this=this;
      let teamOneSelectionId = this.state.teamOneSelectionId;
      let teamTwoSelectionId = this.state.teamOneSelectionId;
      for (let i = 0; i < this.state.getResults.length; i++) {
        var inPlayClass =
          this.state.getResults[i].inPlay === true ? "active" : "";
        var colorClass =
          this.state.getResults[i].color != undefined
            ? this.state.getResults[i].color
            : "";
        if (this.state.getResults[i].type === "match") {
          html.push(
            <tr style={{ background: colorClass }}>
              <td style={{ textAlign: "center" }}>
                {" "}
                {this.state.getResults[i].team_name}{" "}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {this.state.getResults[i].odds}{" "}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {parseInt(this.state.getResults[i].stake).toFixed(0)}
              </td>
            </tr>
          );
        } else {
          html1.push(
            <tr style={{ background: colorClass }}>
              <td style={{ textAlign: "center" }}>
                {" "}
                {this.state.getResults[i].team_name}{" "}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {this.state.getResults[i].odds}{" "}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {parseInt(this.state.getResults[i].stake).toFixed(0)}
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
              <div className="right_tablescrool">
                <table className="table coupon-table">
                  <thead>
                    <tr>
                      <th style={{ textAlign: "center" }}>Matched Bet</th>
                      <th style={{ textAlign: "center" }}>Odds</th>
                      <th style={{ textAlign: "center" }}> Stake</th>
                    </tr>
                  </thead>
                  {this.state.betDataFound === true ? (
                    <tbody>{html}</tbody>
                  ) : (
                    <tbody>
                      <tr>
                        <td colSpan="5" className="text-center">
                          <div className="profit"> No placed bet found !</div>
                        </td>
                      </tr>
                    </tbody>
                  )}

                </table>
              </div>
            </div>
            <div id="menu1" className=" tab-pane fade">
              <br />
              <div className="right_tablescrool">
                <table className="table coupon-table">
                  <thead>
                    <tr>
                      <th style={{ textAlign: "center" }}>Matched Bet</th>
                      <th style={{ textAlign: "center" }}>Odds</th>
                      <th style={{ textAlign: "center" }}>Stake</th>
                    </tr>
                  </thead>   {this.state.betDataFound === true ? (
                    <tbody>{html1}</tbody>
                  ) : (
                    <tbody>
                      <tr>
                        <td colSpan="5" className="text-center">
                          <div className="profit"> No placed bet found !</div>
                        </td>
                      </tr>
                    </tbody>
                  )}
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

      for (var a = 0; a < this.state.fancybet_getResults.length; a++) {
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
            <td className="lay-color box-w1">
              <button
                className="bet-sec lay ses_row pancypick"
                value={value.no_first}
                onClick={this.onFancybetClick.bind(this)}
              >
                <span className="odd1 Jaya" id={"nofirstpink" + a}>
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
                <span className="odd1">{value.yes_first}</span>
                {value.yes_second}
              </button>
            </td>
            <td className="text-right p-r-10 box-w2">
              <span>Min/Max</span>
              <br></br> {value.minimum}/{value.maximum}
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

  handleChange = (event) => {
    const { profit13, profit14, profit15, profit17, profit12, profit16, exposure, drawTeamName } = this.state;
    let { name, value } = event.target;
    if (this.state.betClick === true) {
      let getAmount = event.target.value;
      if (this.state.type === "back") {
        let profit = ((parseFloat(this.state.oddVal) - 1) * getAmount).toFixed(0);
        let loss = parseInt(getAmount);
        let exposure = 0;
        if (this.state.betMatchType === "teamone") {
          this.setState({
            team_profit1: parseInt(profit) + parseInt(profit12)
            , profit_team: "teamone", loss_team: "teamtwo", bet_team: "teamone"
          });

        }
        if (this.state.betMatchType === "teamtwo") {

          this.setState({
            team_profit2: parseInt(profit) + parseInt(profit13),
            profit_team: "teamtwo", loss_team: "teamone", bet_team: "teamtwo"
          });
        }
        if (this.state.betMatchType === "draw") {
          this.setState({
            team_profit3: parseInt(profit) + parseInt(profit14)
            , profit_team: "draw", loss_team: "teamone", bet_team: "draw"
          });
        }

        if (this.state.betMatchType === "teamone") {
          if ((parseInt(profit13) - parseInt(getAmount)) < 0) {
            exposure = exposure + (parseInt(profit13) - parseInt(getAmount));
          }
          else if ((parseInt(profit) + parseInt(profit12)) < 0) {
            exposure = exposure + (parseInt(profit) + parseInt(profit12));
          }
          if (this.state.drawTeamName !== null && this.state.drawTeamName !== undefined && (parseInt(profit14) - parseInt(getAmount)) < 0) {
            exposure = exposure + (parseInt(profit14) - parseInt(getAmount));
          }

          this.setState({ exposure: exposure });
          this.setState({ stackAmount_team2: parseInt(profit13) - parseInt(getAmount) });
          this.setState({ stackAmount_team3: parseInt(profit14) - parseInt(getAmount) });
        }
        if (this.state.betMatchType === "teamtwo") {
          if ((parseInt(profit12) - parseInt(getAmount)) < 0) {
            exposure = exposure + (parseInt(profit12) - parseInt(getAmount));
          } else if ((parseInt(profit) + parseInt(profit13)) < 0) {
            exposure = exposure + (parseInt(profit) + parseInt(profit13));
          }
          if (this.state.drawTeamName !== null && this.state.drawTeamName !== undefined
            && (parseInt(profit14) - parseInt(getAmount)) < 0) {
            exposure = exposure + (parseInt(profit14) - parseInt(getAmount));
          }
          this.setState({ exposure: exposure });
          this.setState({ stackAmount_team1: parseInt(profit12) - parseInt(getAmount) });
          this.setState({ stackAmount_team3: parseInt(profit14) - parseInt(getAmount) });
        }

        if (this.state.betMatchType === "draw") {
          if ((parseInt(profit13) - parseInt(getAmount)) < 0) {
            exposure = exposure + (parseInt(profit13) - parseInt(getAmount));
          }
          if ((parseInt(profit12) - parseInt(getAmount)) < 0) {
            exposure = exposure + (parseInt(profit12) - parseInt(getAmount));
          }
          if (!(parseInt(profit13) - parseInt(getAmount)) < 0 && !(parseInt(profit12) - parseInt(getAmount)) < 0 && (parseInt(profit) + parseInt(profit14)) < 0) {
            exposure = exposure + (parseInt(profit) + parseInt(profit14));
          }
          this.setState({ exposure: exposure });
          this.setState({ stackAmount_team1: parseInt(profit12) - parseInt(getAmount) });
          this.setState({ stackAmount_team2: parseInt(profit13) - parseInt(getAmount) });
        }
        console.log("profit,loss,newExposure", profit, loss, exposure);
        this.setState({
          [name]: value,
          profit: profit, loss: loss,
          emptyField: false,
          errMsg: "",
        });
      }
      else if (this.state.type === "lay") {

        let profit = parseFloat(getAmount);
        let loss = ((parseFloat(this.state.oddVal) - 1) * getAmount).toFixed(0);
        let stackCustom = ((parseFloat(this.state.oddVal) - 1) * getAmount).toFixed(0);
        let exposure = 0;
        if (this.state.betMatchType === "teamone") {
          this.setState({
            team_profit1: parseInt(profit12) - parseInt(stackCustom),
            profit_team: "teamtwo", loss_team: "teamone", bet_team: "teamone"
          });
        } else if (this.state.betMatchType === "teamtwo") {
          this.setState({
            team_profit2: parseInt(profit13) - parseInt(stackCustom),
            profit_team: "teamone", loss_team: "teamtwo", bet_team: "teamtwo"
          });
        }

        if (this.state.betMatchType === "draw") {
          this.setState({
            team_profit3: parseInt(profit14) - parseInt(stackCustom),
            profit_team: "teamonevteamtwo", loss_team: "draw", bet_team: "draw"
          });
        }

        if (this.state.betMatchType === "teamone") {
          if ((parseInt(profit13) + parseInt(profit)) < 0) {
            exposure = exposure + (parseInt(profit13) + parseInt(profit));
          }
          else if ((parseInt(profit12) - parseInt(stackCustom)) < 0) {
            exposure = exposure + (parseInt(profit12) - parseInt(stackCustom));
          }
          else if ((parseInt(profit12) - parseInt(stackCustom)) < 0 && (parseInt(profit13) - parseInt(stackCustom)) < 0) {
            exposure = exposure + (parseInt(profit12) - parseInt(stackCustom)) + (parseInt(profit13) - parseInt(stackCustom));
          }
          if (this.state.drawTeamName !== null && this.state.drawTeamName !== undefined
            && (parseInt(profit14) + parseInt(profit)) < 0) {
            exposure = exposure + (parseInt(profit14) + parseInt(profit));
          }
          this.setState({ exposure: exposure });
          this.setState({ stackAmount_team2: parseInt(profit13) + parseInt(profit) });
          this.setState({ stackAmount_team3: parseInt(profit14) + parseInt(profit) });
        } else if (this.state.betMatchType === "teamtwo") {
          if ((parseInt(profit12) + parseInt(profit)) < 0) {
            exposure = exposure + (parseInt(profit12) + parseInt(profit));
          }
          else if ((parseInt(profit13) - parseInt(stackCustom)) < 0) {
            exposure = exposure + (parseInt(profit12) - parseInt(stackCustom));
          }
          if (this.state.drawTeamName !== null && this.state.drawTeamName !== undefined && (parseInt(profit14) + parseInt(profit)) < 0) {
            exposure = exposure + (parseInt(profit14) + parseInt(profit));
          }
          this.setState({ exposure: exposure });
          this.setState({ stackAmount_team1: parseInt(profit12) + parseInt(profit) });
          this.setState({ stackAmount_team3: parseInt(profit14) + parseInt(profit) });
        }

        if (this.state.betMatchType === "draw") {
          if ((parseInt(profit13) + parseInt(getAmount)) < 0) {
            exposure = exposure + (parseInt(profit13) + parseInt(profit));
          }
          if ((parseInt(profit12) + parseInt(getAmount)) < 0) {
            exposure = exposure + (parseInt(profit12) + parseInt(profit));
          }
          if (!(parseInt(profit13) + parseInt(getAmount)) < 0 && !(parseInt(profit12) + parseInt(getAmount)) < 0 && (parseInt(profit14) - parseInt(stackCustom)) < 0) {
            exposure = exposure + (parseInt(profit14) - parseInt(stackCustom));
          }
          this.setState({ exposure: exposure });
          this.setState({ stackAmount_team1: parseInt(profit12) + parseInt(profit) });
          this.setState({ stackAmount_team2: parseInt(profit13) + parseInt(profit) });
        }
        console.log("profit,loss", profit, loss, exposure);
        this.setState({
          [name]: value,
          profit: profit, loss: loss,
          emptyField: false,
          errMsg: "",
        });
      }
    }
    if (this.state.betClick2 == true) {
      if (this.state.type === "back") {
        let profit = ((parseFloat(this.state.oddVal) / 100) * parseFloat(event.target.value)).toFixed(0);
        let loss = parseInt(event.target.value);
        if (this.state.betMatchType === "teamone") {
          this.setState({
            team_profit4: parseInt(profit) + parseInt(profit15)
            , profit_team: "teamone", loss_team: "teamtwo", bet_team: "teamone"
          });
        }
        if (this.state.betMatchType === "teamtwo") {
          this.setState({
            team_profit5: parseInt(profit) + parseInt(profit16)
            , profit_team: "teamtwo", loss_team: "teamone", bet_team: "teamtwo"
          });
        }
        if (this.state.betMatchType === "draw") {
          this.setState({
            team_profit6: parseInt(profit) + parseInt(profit17)
            , profit_team: "the draw", loss_team: "teamone", bet_team: "draw"
          });
        }

        if (this.state.betMatchType === "teamone") {

          this.setState({ stackAmount_team5: parseInt(profit16) - parseInt(event.target.value) });
          this.setState({ stackAmount_team6: parseInt(profit17) - parseInt(event.target.value) });
        }
        if (this.state.betMatchType === "teamtwo") {
          this.setState({ stackAmount_team4: parseInt(profit15) - parseInt(event.target.value) });
          this.setState({ stackAmount_team6: parseInt(profit17) - parseInt(event.target.value) });
        }

        if (this.state.betMatchType === "draw") {
          this.setState({ stackAmount_team4: parseInt(profit15) - parseInt(event.target.value) });
          this.setState({ stackAmount_team5: parseInt(profit16) - parseInt(event.target.value) });
        }

        this.setState({
          [name]: value,
          profit: profit,
          loss: loss,
          emptyField: false,
          errMsg: "",
        });
      }
      else if (this.state.type === "lay") {
        let profit = parseInt(event.target.value);
        let stackCustom = (this.state.oddVal / 100) * event.target.value;
        let loss = ((parseFloat(this.state.oddVal) / 100) * event.target.value).toFixed(0);

        if (this.state.betMatchType === "teamone") {
          this.setState({
            team_profit4: parseInt(profit15) - parseInt(stackCustom)
            , profit_team: "teamtwo", loss_team: "teamone", bet_team: "teamone"
          });
        } else if (this.state.betMatchType === "teamtwo") {
          this.setState({
            team_profit5: parseInt(profit16) - parseInt(stackCustom)
            , profit_team: "teamone", loss_team: "teamtwo", bet_team: "teamtwo"
          });
        }
        if (this.state.betMatchType === "draw") {
          this.setState({
            team_profit6: parseInt(profit17) - parseInt(stackCustom)
            , profit_team: "teamone", loss_team: "the draw", bet_team: "draw"
          });
        }
        if (this.state.betMatchType === "teamone") {
          this.setState({ stackAmount_team5: parseInt(profit16) + parseInt(profit) });
          this.setState({ stackAmount_team6: parseInt(profit17) + parseInt(profit) });
        }
        else if (this.state.betMatchType === "teamtwo") {
          this.setState({ stackAmount_team4: parseInt(profit15) + parseInt(profit) });
          this.setState({ stackAmount_team6: parseInt(profit17) + parseInt(profit) });
        }

        if (this.state.betMatchType === "draw") {
          this.setState({ stackAmount_team4: parseInt(profit15) + parseInt(profit) });
          this.setState({ stackAmount_team5: parseInt(profit16) + parseInt(profit) });
        }
        this.setState({
          [name]: value,
          profit: profit,
          loss: loss,
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
    var profit = this.state.profit.toFixed(0);
    this.setState({ session_input: event.target.value });
  };

  handleButtonsClick = (getAmount) => {
    const { profit12, profit13, profit14, profit15, profit16, profit17 } = this.state;
    if (this.state.betClick === true) {
      if (this.state.type === "back") {
        let profit = ((parseFloat(this.state.oddVal) - 1) * getAmount).toFixed(0);
        let loss = parseInt(getAmount);
        if (this.state.betMatchType === "teamone") {

          this.setState({
            team_profit1: parseInt(profit) + parseInt(profit12)
            , profit_team: "teamone", loss_team: "teamtwo",
            bet_team: "teamone"
          });

        }
        if (this.state.betMatchType === "teamtwo") {
          this.setState({
            team_profit2: parseInt(profit) + parseInt(profit13),
            profit_team: "teamtwo", loss_team: "teamone", bet_team: "teamtwo"
          });
        }
        if (this.state.betMatchType === "draw") {
          this.setState({
            team_profit3: parseInt(profit) + parseInt(profit14)
            , profit_team: "draw", loss_team: "teamone", bet_team: "draw"
          });
        }

        if (this.state.betMatchType === "teamone") {
          this.setState({ stackAmount_team2: parseInt(profit13) - parseInt(getAmount) });
          this.setState({ stackAmount_team3: parseInt(profit14) - parseInt(getAmount) });
        }
        if (this.state.betMatchType === "teamtwo") {
          this.setState({ stackAmount_team1: parseInt(profit12) - parseInt(getAmount) });
          this.setState({ stackAmount_team3: parseInt(profit14) - parseInt(getAmount) });
        }

        if (this.state.betMatchType === "draw") {
          this.setState({ stackAmount_team1: parseInt(profit12) - parseInt(getAmount) });
          this.setState({ stackAmount_team2: parseInt(profit13) - parseInt(getAmount) });
        }
        this.setState({ stake_amount: getAmount, profit: profit, loss: loss });
      }
      else if (this.state.type === "lay") {
        let profit = parseInt(getAmount);
        let loss = ((parseFloat(this.state.oddVal) - 1) * getAmount).toFixed(0);
        let exposure = ((parseFloat(this.state.oddVal) - 1) * getAmount).toFixed(0);
        let stackCustom = ((parseFloat(this.state.oddVal) - 1) * getAmount).toFixed(0);
        if (this.state.betMatchType === "teamone") {
          if (profit12 === 0) {
            this.setState({ exposure: loss })
          }
          this.setState({
            team_profit1: parseInt(profit12) - parseInt(stackCustom),
            profit_team: "teamtwo", loss_team: "teamone", bet_team: "teamone"
          });
        } else if (this.state.betMatchType === "teamtwo") {
          this.setState({
            team_profit2: parseInt(profit13) - parseInt(stackCustom),
            profit_team: "teamone", loss_team: "teamtwo", bet_team: "teamtwo"
          });
        }

        if (this.state.betMatchType === "draw") {
          this.setState({
            team_profit3: parseInt(profit14) - parseInt(stackCustom),
            profit_team: "teamonevteamtwo", loss_team: "draw", bet_team: "draw"
          });
        }

        if (this.state.betMatchType === "teamone") {
          this.setState({ stackAmount_team2: parseInt(profit13) + parseInt(profit) });
          this.setState({ stackAmount_team3: parseInt(profit14) + parseInt(profit) });
        } else if (this.state.betMatchType === "teamtwo") {
          this.setState({ stackAmount_team1: parseInt(profit12) + parseInt(profit) });
          this.setState({ stackAmount_team3: parseInt(profit14) + parseInt(profit) });
        }

        if (this.state.betMatchType === "draw") {
          this.setState({ stackAmount_team1: parseInt(profit12) + parseInt(profit) });
          this.setState({ stackAmount_team2: parseInt(profit13) + parseInt(profit) });
        }

        this.setState({ stake_amount: getAmount, profit: profit, loss: loss, exposure: exposure });
      }
    }
    if (this.state.betClick2 === true) {
      var profit = "";
      if (this.state.type === "back") {
        profit = ((parseFloat(this.state.oddVal) / 100) * getAmount).toFixed(0);
        let loss = parseInt(getAmount);
        if (this.state.betMatchType === "teamone") {
          this.setState({
            team_profit4: parseInt(profit) + parseInt(profit15)
            , profit_team: "teamone", loss_team: "teamtwo", bet_team: "teamone"
          });
        }

        if (this.state.betMatchType === "teamtwo") {
          this.setState({
            team_profit5: parseInt(profit) + parseInt(profit16)
            , profit_team: "teamtwo", loss_team: "teamone", bet_team: "teamtwo"
          });
        }
        if (this.state.betMatchType === "draw") {
          this.setState({
            team_profit6: parseInt(profit) + parseInt(profit17)
            , profit_team: "the drow", loss_team: "teamone", bet_team: "draw"
          });
        }

        if (this.state.betMatchType === "teamone") {

          this.setState({ stackAmount_team5: parseInt(profit16) - parseInt(getAmount) });
          this.setState({ stackAmount_team6: parseInt(profit17) - parseInt(getAmount) });
        }
        if (this.state.betMatchType === "teamtwo") {
          this.setState({ stackAmount_team4: parseInt(profit15) - parseInt(getAmount) });
          this.setState({ stackAmount_team6: parseInt(profit17) - parseInt(getAmount) });
        }

        if (this.state.betMatchType === "draw") {
          this.setState({ stackAmount_team4: parseInt(profit15) - parseInt(getAmount) });
          this.setState({ stackAmount_team5: parseInt(profit16) - parseInt(getAmount) });
        }
        this.setState({ stake_amount: getAmount, profit: profit, loss: loss });
      }

      else if (this.state.type === "lay") {
        profit = parseInt(getAmount);
        let stackCustom = (this.state.oddVal / 100) * getAmount;
        let loss = ((parseFloat(this.state.oddVal) / 100) * getAmount).toFixed(0);
        if (this.state.betMatchType === "teamone") {
          this.setState({
            team_profit4: parseInt(profit15) - parseInt(stackCustom)
            , profit_team: "teamtwo", loss_team: "teamone", bet_team: "teamone"
          });
        } else if (this.state.betMatchType === "teamtwo") {
          this.setState({
            team_profit5: parseInt(profit16) - parseInt(stackCustom)
            , profit_team: "teamone", loss_team: "teamtwo", bet_team: "teamtwo"
          });
        }
        if (this.state.betMatchType === "draw") {
          this.setState({
            team_profit6: parseInt(profit17) - parseInt(stackCustom)
            , profit_team: "teamone", loss_team: "teamone", bet_team: "draw"
          });
        }
        if (this.state.betMatchType === "teamone") {
          this.setState({ stackAmount_team5: parseInt(profit16) + parseInt(profit) });
          this.setState({ stackAmount_team6: parseInt(profit17) + parseInt(profit) });
        }
        else if (this.state.betMatchType === "teamtwo") {
          this.setState({ stackAmount_team4: parseInt(profit15) + parseInt(profit) });
          this.setState({ stackAmount_team6: parseInt(profit17) + parseInt(profit) });
        }

        if (this.state.betMatchType === "draw") {
          this.setState({ stackAmount_team4: parseInt(profit15) + parseInt(profit) });
          this.setState({ stackAmount_team5: parseInt(profit16) + parseInt(profit) });
        }
        this.setState({ stake_amount: getAmount, profit: profit, loss: loss });
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
    if (SessInptNo !== 0) {
      this.setState({ betClick1: true, betClick: false, betClick2: false });
    }

    $("#btn_val").focus();
    this.setState({
      color: color,
      headname: headname,
      session_input: SessInptNo,
      yes_no_STAKE: "",
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
      var button_1 = 1000;
      var button_2 = 400;
      var button_3 = 10000;
      var button_4 = 2400;
      var button_5 = 4000;
      var button_6 = 100000;
      var button_7 = 400000;
      var button_8 = 40000;
      var button_9 = 1000000;
      var button_10 = 240000;

      var value_1 = 1000;
      var value_2 = 400;
      var value_3 = 10000;
      var value_4 = 2400;
      var value_5 = 4000;
      var value_6 = 100000;
      var value_7 = 400000;
      var value_8 = 40000;
      var value_9 = 1000000;
      var value_10 = 240000;

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
                    <td>{this.state.profit ? this.state.profit : 0}</td>
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
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    }
    if (this.state.betClick2 === true) {
      var button_1 = 1000;
      var button_2 = 400;
      var button_3 = 10000;
      var button_4 = 2400;
      var button_5 = 4000;
      var button_6 = 100000;
      var button_7 = 400000;
      var button_8 = 40000;
      var button_9 = 1000000;
      var button_10 = 240000;

      var value_1 = 1000;
      var value_2 = 400;
      var value_3 = 10000;
      var value_4 = 2400;
      var value_5 = 4000;
      var value_6 = 100000;
      var value_7 = 400000;
      var value_8 = 40000;
      var value_9 = 1000000;
      var value_10 = 240000;
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
                  <td>{this.state.profit ? this.state.profit : 0}</td>
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
              </button>
            </div>
          </form>
        </div>
      );
    }
  };

  showBidClickSessionHtml = () => {
    if (this.state.betClick1 === true) {
      var button_1 = 1000;
      var button_2 = 400;
      var button_3 = 10000;
      var button_4 = 2400;
      var button_5 = 4000;
      var button_6 = 100000;
      var button_7 = 400000;
      var button_8 = 40000;
      var button_9 = 1000000;
      var button_10 = 240000;

      var value_1 = 1000;
      var value_2 = 400;
      var value_3 = 10000;
      var value_4 = 2400;
      var value_5 = 4000;
      var value_6 = 100000;
      var value_7 = 400000;
      var value_8 = 40000;
      var value_9 = 1000000;
      var value_10 = 240000;
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
    const {
      matchOddsMax,
      matchOddsMin,
      fancyMax,
      fancyMin, profit15, profit16, profit17 } = this.state;
    var blockoddsHtml = "";
    var change_password = localStorage.getItem("change_password");
    if (change_password !== "" && change_password !== null) {
      return <Redirect to="/change_password" />;
    }
    var new_array = [];
    var new_array1 = "";
    var datafancy = this.state.fancydata;
    if (this.state.sessiondata !== undefined) {
      for (var i = 0; i < this.state.sessiondata.length; i++) {


        var data123 = datafancy;

        if (data123 !== undefined) {

          if (data123.indexOf(this.state.sessiondata[i].RunnerName) >= 0) {
            new_array1 = (
              <tr>
                <td className="fb_64 table-active">
                  <a href="#">
                    {" "}
                    {this.state.sessiondata[i].RunnerName}
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

                <td className="box-w1 lay-color fb_td">
                  {
                    this.state.sessiondata[i].GameStatus === "BALL_RUN" ?
                      (
                        <div className="suspendedfancy1 d-flex align-items-center">
                          <span>BALL RUNNING</span>
                        </div>
                      ) : null

                  }
                  {
                    this.state.sessiondata[i].GameStatus === "SUSPEND" ?
                      (
                        <div className="suspendedfancy1 bet-info d-flex align-items-center">
                          <span>SUSPENDED</span>
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
                    className="bet-sec lay"
                  >
                    <span className="odd1 layprice">
                      {" "}
                      {this.state.sessiondata[i].LayPrice1}
                    </span>
                    {this.state.sessiondata[i].LaySize1}
                  </button>
                </td>

                <td className="box-w1 back-color fb_td">
                  <button
                    className="bet-sec back"
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
                    <span className="odd1 backprice">
                      {" "}
                      {this.state.sessiondata[i].BackPrice1}
                    </span>
                    {this.state.sessiondata[i].BackSize1}
                  </button>
                </td>
                <td className="box-w1 table-active fb_td">
                  <div className="d-flex justify-content-center flex-column  pt-1 pb-1 px-2">
                    <small className="font-weight-normal">
                      Min:{fancyMin ? fancyMin : 100}
                    </small>
                    <small className="font-weight-normal d-flex flex-row">
                      Max: {fancyMax ? fancyMax : 50000}
                    </small>
                  </div>
                </td>
              </tr>
            );
            new_array.push(new_array1);
          } else {


            new_array1 = (
              <tr>
                <td className="fb_64 table-active">
                  <a href="#">
                    {" "}
                    {this.state.sessiondata[i].RunnerName}
                    &nbsp;{" "}
                  </a>
                </td>
                <td className="box-w1 lay-color fb_td">
                  {
                    this.state.sessiondata[i].GameStatus === "BALL_RUN" ?
                      (
                        <div className="suspendedfancy1 bet-info d-flex align-items-center">
                          <span>BALL RUNNING</span>
                        </div>
                      ) : null

                  }
                  {
                    this.state.sessiondata[i].GameStatus === "SUSPEND" ?
                      (
                        <div className="suspendedfancy1 bet-info d-flex align-items-center">
                          <span> SUSPENDED</span>
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
                    className="bet-sec lay"
                  >
                    <span className="odd1 layprice">
                      {" "}
                      {this.state.sessiondata[i].LayPrice1}
                    </span>
                    {this.state.sessiondata[i].LaySize1}
                  </button>
                </td>

                <td className="box-w1 back-color fb_td">
                  <button
                    className="bet-sec back"
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
                    <span className="odd1 backprice">
                      {" "}
                      {this.state.sessiondata[i].BackPrice1}
                    </span>
                    {this.state.sessiondata[i].BackSize1}
                  </button>
                </td>
                <td className="box-w1 table-active fb_td">
                  <div className="d-flex justify-content-center flex-column px-3  pt-1 pb-1">
                    <small className="font-weight-normal">
                      Min:{fancyMin ? fancyMin : 100}
                    </small>
                    <small className="font-weight-normal">
                      Max: {fancyMax ? fancyMax : 50000}
                    </small>
                  </div>
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
                  {this.state.sessiondata[i].RunnerName}
                  &nbsp;{" "}
                </a>
              </td>
              <td className="box-w1 lay-color fb_td">
                {
                  this.state.sessiondata[i].GameStatus === "BALL_RUN" ?
                    (
                      <div className="suspendedfancy1 bet-info">
                        <span>BALL RUNNING</span>
                      </div>
                    ) : null

                }
                {
                  this.state.sessiondata[i].GameStatus === "SUSPEND" ?
                    (
                      <div className="suspendedfancy1 px-1">
                        <span className="mt-2">SUSPENDED</span>
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
                  className="bet-sec lay"
                >
                  <span className="odd1 layprice">
                    {" "}
                    {this.state.sessiondata[i].LayPrice1}
                  </span>
                  {this.state.sessiondata[i].LaySize1}
                </button>
              </td>

              <td className="box-w1 back-color fb_td">
                <button
                  className="bet-sec back"
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
                  <span className="odd1 backprice">
                    {" "}
                    {this.state.sessiondata[i].BackPrice1}
                  </span>
                  {this.state.sessiondata[i].BackSize1}
                </button>
              </td>
              <td className="box-w1 table-active fb_td">
                <div className="d-flex justify-content-center flex-column px-3 pt-1 pb-1">
                  <small className="font-weight-normal">
                    Min:{fancyMin ? fancyMin : 100}
                  </small>
                  <small className="font-weight-normal">
                    Max: {fancyMax ? fancyMax : 50000}
                  </small>
                </div>
              </td>
            </tr>
          );
          new_array.push(new_array1);
        }
      }
    }

    var status = this.state.status;
    if (status !== "OPEN") {
      status = this.state.status;
    } else {
      status = "";
    }


    var accessToken = this.state.accessToken;

    if (accessToken === "" || accessToken === null) {
      return <Redirect to="/login" />;
    }
    var newdata11 = this.state.getResult11;
    var amount_data2 = "";
    var amount_data1 = "";
    var amount_data3 = "";
    var amount_data4 = "";
    var stake = "";
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
    var new_fancy_arr = [];
    var stake = 0;
    var htmllay112 = "";
    var htmllay113 = "";

    if (this.state.no_data_model !== undefined) {
      if (this.state.no_data_model.data !== undefined) {
        if (this.state.no_data_model.data.showdata !== undefined) {
          for (
            var index = 0;
            index < this.state.no_data_model.data.showdata.length;
            index++
          ) {
            var layprice = "0";
            var backprice = "0";
            var layprice1 = "0";
            var layprice2 = "0";
            var backprice1 = "0";
            var backprice3 = "0";
            var backprice2 = "0";
            var layprice3 = "0";

            if (
              this.state.no_data_model.data.showdata[index].lay_price !==
              undefined
            ) {
              if (this.state.no_data_model.data.showdata[index].no == "no") {
                var layprice =
                  parseFloat(
                    this.state.no_data_model.data.showdata[index].lay_price
                  ) - parseFloat(1);
                var layprice3 = parseFloat(
                  this.state.no_data_model.data.showdata[index].lay_price
                );

                var layprice1 = parseFloat(
                  this.state.no_data_model.data.showdata[index].stake
                );
                var layprice2 = "-" + layprice1;

                var htmllay112 = (
                  <tr className="bet-info ">
                    <td id="blockin3" className="box-w1 lay-color">
                      <button className="bet-sec lay ">
                        {" "}
                        <span className="odd1 layprice">{layprice}</span>{" "}
                      </button>
                    </td>
                    <td id="blockin3" className="box-w1 lay-color">
                      <button className="bet-sec lay ">
                        {" "}
                        <span className="odd1 layprice">{layprice1}</span>{" "}
                      </button>
                    </td>
                  </tr>
                );

                new_fancy_arr.push(htmllay112);

                var htmllay113 = (
                  <tr className="bet-info ">
                    <td id="blockin3" className="box-w1 back-color">
                      <button className="bet-sec back ">
                        {" "}
                        <span className="odd1 backprice">{layprice3}</span>{" "}
                      </button>
                    </td>
                    <td id="blockin3" className="box-w1 back-color">
                      <button className="bet-sec back ">
                        {" "}
                        <span className="odd1 backprice">{layprice2}</span>{" "}
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
                  var backprice = parseFloat(
                    this.state.no_data_model.data.showdata[index].back_price
                  );
                  var backprice1 =
                    parseFloat(
                      this.state.no_data_model.data.showdata[index].back_price
                    ) - parseFloat(1);
                  var backprice2 =
                    "-" + this.state.no_data_model.data.showdata[index].stake;
                  var backprice3 =
                    (parseFloat(
                      this.state.no_data_model.data.showdata[index].stake
                    ) *
                      parseFloat(
                        this.state.no_data_model.data.showdata[index].back_size
                      )) /
                    parseFloat(100);
                }

                var htmllay112 = (
                  <tr className="bet-info ">
                    <td
                      id="blockin3"
                      className="box-w1 back-color"
                      style={{
                        background: "rgb(114, 187, 239)",
                        transition: "all 1s ease 0s",
                      }}
                    >
                      <button className="bet-sec back ">
                        {" "}
                        <span className="odd1 backprice">{backprice}</span>{" "}
                      </button>
                    </td>
                    <td
                      id="blockin3"
                      className="box-w1 back-color"
                      style={{
                        background: "rgb(114, 187, 239)",
                        transition: "all 1s ease 0s",
                      }}
                    >
                      <button className="bet-sec back ">
                        {" "}
                        <span className="odd1 backprice">{backprice3}</span>{" "}
                      </button>
                    </td>
                  </tr>
                );

                new_fancy_arr.push(htmllay112);

                var htmllay113 = (
                  <tr className="bet-info ">
                    <td id="blockin3" className="box-w1 lay-color">
                      <button className="bet-sec lay ">
                        {" "}
                        <span className="odd1 layprice">{backprice1}</span>{" "}
                      </button>
                    </td>
                    <td id="blockin3" className="box-w1 lay-color">
                      <button className="bet-sec lay ">
                        {" "}
                        <span className="odd1 layprice">{backprice2}</span>{" "}
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


    return (
      <div>
        <Nav />
        <Menu />
        <div id="wrapper">
          <Sidebar />
          {this.state.betLoder === true ? <FullPageLoader /> : null}
          <div id="content-wrapper">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-9 featured-box-detail">
                  <img className="img-fluid" src="/img/timg.jpg" />
                  <div className="coupon-card">
                    <div className="game-heading1 mb-1 text-uppercase font-weight-normal">
                      {" "}
                      <span>
                        {this.state.firstTeamName} v{" "}
                        {this.state.secondTeamName}
                      </span>
                      <span
                        style={{ float: "right" }}
                      >
                        {Moment(this.props.match.params.date ?
                          this.props.match.params.date : null).format("MM/DD/YYYY HH:mm")}
                      </span>


                    </div>
                    <div className="mb-1">

                      <iframe
                        src={
                          "https://graph.dreamcasino.live/" +
                          this.state.gameName +
                          "/" +
                          this.state.gameID
                        }
                        width="100%"
                        height="220px"
                      ></iframe>

                    </div>
                    <div className="game-heading">
                      {" "}
                      <span className="font-weight-normal text-white">
                        MATCH_ODDS
                          <a
                          href="#"
                          className=" m-r-5 game-rules-icon blinking"
                          data-id="match"
                        >
                          <span>
                            <i className="fa fa-info-circle float-right"></i>
                          </span>
                        </a>
                      </span>{" "}
                      <span className="float-right m-r-10 font-weight-normal">
                        Maximum Bet: {matchOddsMax ? matchOddsMax : 50000}
                      </span>
                    </div>

                    {this.state.firstTeamName !== null ? (
                      <Card className="w-100">
                        <div
                          className="table-responsive main-market market-bf"
                          data-marketid="1.167146463"
                          style={{ marginTop: "-10px" }}
                        >
                          <table className="table coupon-table table table-striped table-bordered m-t-10 mb-0">
                            <thead>
                              <tr>

                                <th>{this.state.twoteamtotalmatch}</th>
                                <th className="box-w1 re_none">&nbsp;</th>
                                <th className="box-w1 re_none">&nbsp;</th>
                                <th className="back box-w3 text-center">BACK</th>
                                <th className="lay box-w3 text-center">LAY</th>
                                <th className="box-w1 re_none">&nbsp;</th>
                                <th className="box-w1 re_none">&nbsp;</th>
                              </tr>
                            </thead>
                            <tbody id="dyn_bind">
                              <tr className="bet-info ">
                                <td
                                  className="team-name nation table-active"
                                  style={{ width: "270px" }}
                                >
                                  <span>
                                    {this.state.firstTeamName}
                                  </span>
                                  <p className="box-w4">
                                    <span
                                      className="float-right book"
                                      id="book_349"
                                    >
                                      {this.state.team_profit1 &&
                                        this.state.team_profit1 > 0 ? (
                                        <span className="text-success textProfit">
                                          {this.state.team_profit1}
                                        </span>
                                      ) : (
                                        <span className="text-danger textProfit">
                                          {this.state.team_profit1}
                                        </span>
                                      )}

                                      {this.state.stackAmount_team1 &&
                                        this.state.stackAmount_team1 > 0 ? (
                                        <span className="text-success textProfit">
                                          {this.state.stackAmount_team1}
                                        </span>
                                      ) : (
                                        <span className="text-danger textProfit">
                                          {this.state.stackAmount_team1}
                                        </span>
                                      )}
                                    </span>
                                  </p>

                                  <p className="box-w4">
                                    <span
                                      className="float-left book"

                                    >
                                      {this.state.profit12 &&
                                        this.state.profit12 > 0 ? (
                                        <span className="text-success textProfit flot-left">
                                          {parseFloat(this.state.profit12)}
                                        </span>
                                      ) : (
                                        <span className="text-danger textProfit flot-left">
                                          {parseFloat(this.state.profit12)}
                                        </span>
                                      )}

                                    </span>{" "}
                                  </p>
                                </td>

                                <td
                                  className="box-w1 back-color re_none"
                                  id="blockin1"
                                  style={{ backgroundColor: "#B2D6F0" }}
                                >
                                  {blockoddsHtml}
                                  {status}

                                  <button
                                    className="bet-sec back "
                                    onClick={this.handleBidClick.bind(
                                      this,
                                      this.state.firstTeamName,
                                      this.state.teamOneLastBack,
                                      "#B2D6F0",
                                      "back",
                                      this.state.teamOneSelectionId,
                                      this.state.marketId,
                                      "teamone",
                                      this.state.status,
                                      "odds",
                                      "betunmatch"
                                    )}
                                  >
                                    {" "}
                                    <span className="backprice odd1">
                                      {this.state.teamOneLastBack}
                                    </span>
                                    <span className="text11">
                                      {this.state.teamOneLastBackSize}{" "}</span>
                                  </button>
                                </td>
                                <td
                                  id="blockin2"
                                  className="box-w1 back-color re_none"
                                  style={{ backgroundColor: "#92C9F0" }}
                                >
                                  {status}
                                  <button
                                    className="bet-sec back "
                                    onClick={this.handleBidClick.bind(
                                      this,
                                      this.state.firstTeamName,
                                      this.state.teamOneMiddleBack,
                                      "#92C9F0",
                                      "back",
                                      this.state.teamOneSelectionId,
                                      this.state.marketId,
                                      "teamone",
                                      this.state.status,
                                      "odds",
                                      "betunmatch"
                                    )}
                                  >
                                    {" "}
                                    <span className="backprice odd1">
                                      {this.state.teamOneMiddleBack}
                                    </span>{" "}
                                    <span className="text11">
                                      {this.state.teamOneMiddleBackSize}</span>
                                  </button>
                                </td>

                                <td id="blockin3" className="box-w1 back-color font-weight-bold">
                                  {status}
                                  <button
                                    className="bet-sec back "
                                    onClick={this.handleBidClick.bind(
                                      this,
                                      this.state.firstTeamName,
                                      this.state.teamOneFirstBack,
                                      "#72bbef",
                                      "back",
                                      this.state.teamOneSelectionId,
                                      this.state.marketId,
                                      "teamone",
                                      this.state.status,
                                      "odd1",
                                      "betmatch"
                                    )}
                                  >
                                    {" "}
                                    <span className="odd1 backprice">
                                      {this.state.teamOneFirstBack}
                                    </span>{" "}
                                    <span className="text11">
                                      {this.state.teamOneFirstBackSize}</span>
                                  </button>
                                </td>

                                <td id="blockin4" className="box-w1 lay-color">
                                  {status}
                                  <button
                                    className="bet-sec lay"
                                    value={this.state.lastPriceTraded1}
                                    onClick={this.handleBidClick.bind(
                                      this,
                                      this.state.firstTeamName,
                                      this.state.teamOneFirstLay,
                                      "#faa9ba",
                                      "lay",
                                      this.state.teamOneSelectionId,
                                      this.state.marketId,
                                      "teamone",
                                      this.state.status,
                                      "odds",
                                      "betmatch"
                                    )}
                                  >
                                    <span className="odd1 layprice">
                                      {this.state.teamOneFirstLay}
                                    </span>
                                    <span className="text11">
                                      {this.state.teamOneFirstLaySize}</span>

                                  </button>
                                </td>
                                <td
                                  id="blockin5"
                                  className="box-w1 lay-color re_none"
                                  style={{ backgroundColor: "#F8BBC8" }}
                                >
                                  {status}
                                  <button
                                    className="bet-sec lay"
                                    value={this.state.lastPriceTraded1}
                                    onClick={this.handleBidClick.bind(
                                      this,
                                      this.state.firstTeamName,
                                      this.state.teamOneMiddleLay,
                                      "#F8BBC8",
                                      "lay",
                                      this.state.teamOneSelectionId,
                                      this.state.marketId,
                                      "teamone",
                                      this.state.status,
                                      "odds",
                                      "betunmatch"
                                    )}
                                  >
                                    <span className="odd1 layprice">
                                      {this.state.teamOneMiddleLay}
                                    </span>
                                    <span className="text11">
                                      {this.state.teamOneMiddleLaySize}</span>

                                  </button>
                                </td>
                                <td
                                  id="blockin6"
                                  className="box-w1 lay-color re_none"
                                  style={{ backgroundColor: "#F6CDD6" }}
                                >
                                  {status}
                                  <button
                                    className="bet-sec lay"
                                    value={this.state.lastPriceTraded1}
                                    onClick={this.handleBidClick.bind(
                                      this,
                                      this.state.firstTeamName,
                                      this.state.teamOneLastLay,
                                      "#F6CDD6",
                                      "lay",
                                      this.state.teamOneSelectionId,
                                      this.state.marketId,
                                      "teamone",
                                      this.state.status,
                                      "odds",
                                      "betunmatch"
                                    )}
                                  >
                                    <span className="odd1 layprice">
                                      {this.state.teamOneLastLay}
                                    </span>
                                    <span className="text11">
                                      {this.state.teamOneLastLaySize}</span>

                                  </button>
                                </td>
                              </tr>
                              <tr className="bet-info ">
                                <td
                                  className="team-name nation table-active"
                                  id="10301"
                                  style={{ width: "270px" }}
                                >
                                  <span>
                                    {this.state.secondTeamName}
                                  </span>
                                  <p className="box-w4 textProfit">
                                    <span
                                      className="float-right book"
                                      id="book_10301"
                                    >
                                      {this.state.team_profit2 &&
                                        this.state.team_profit2 > 0 ? (
                                        <span className="text-success textProfit">
                                          {this.state.team_profit2}
                                        </span>
                                      ) : (
                                        <span className="text-danger textProfit">
                                          {this.state.team_profit2}

                                        </span>
                                      )}

                                      {this.state.stackAmount_team2 &&
                                        this.state.stackAmount_team2 > 0 ? (
                                        <span className="text-success">
                                          {this.state.stackAmount_team2}
                                        </span>
                                      ) : (
                                        <span className="text-danger">
                                          {this.state.stackAmount_team2}
                                        </span>
                                      )}
                                    </span>{" "}

                                  </p>


                                  <p className="box-w4">
                                    <span
                                      className="float-left book"

                                    >

                                      {this.state.profit13 &&
                                        this.state.profit13 > 0 ? (
                                        <span className="text-success float-left textProfit">
                                          {parseFloat(this.state.profit13)}
                                        </span>
                                      ) : (
                                        <span className="text-danger float-left textProfit">
                                          {parseFloat(this.state.profit13)}
                                        </span>
                                      )}</span>
                                  </p>
                                </td>
                                <td
                                  id="blockin7"
                                  className="box-w1 back-color re_none"
                                  style={{ backgroundColor: "#B2D6F0" }}
                                >
                                  {blockoddsHtml}
                                  {status}
                                  <button
                                    className="bet-sec back "
                                    onClick={this.handleBidClick.bind(
                                      this,
                                      this.state.secondTeamName,
                                      this.state.teamTwoLastBack,
                                      "#B2D6F0",
                                      "back",
                                      this.state.teamTwoSelectionId,
                                      this.state.marketId,
                                      "teamtwo",
                                      this.state.status,
                                      "odds",
                                      "betunmatch"
                                    )}
                                  >
                                    {" "}
                                    <span className="odd1 backprice">
                                      {this.state.teamTwoLastBack}
                                    </span>
                                    <span className="text11">
                                      {this.state.teamTwoLastBackSize}</span>

                                  </button>
                                </td>
                                <td
                                  id="blockin8"
                                  className="box-w1 back-color re_none"
                                  style={{ backgroundColor: "#92C9F0" }}
                                >
                                  {status}
                                  <button
                                    className="bet-sec back "
                                    onClick={this.handleBidClick.bind(
                                      this,
                                      this.state.secondTeamName,
                                      this.state.teamTwoMiddleBack,
                                      "#92C9F0",
                                      "back",
                                      this.state.teamTwoSelectionId,
                                      this.state.marketId,
                                      "teamtwo",
                                      this.state.status,
                                      "odds",
                                      "betunmatch"
                                    )}
                                  >
                                    {" "}
                                    <span className="odd1 backprice">
                                      {this.state.teamTwoMiddleBack}
                                    </span>
                                    <span className="text11">
                                      {this.state.teamTwoMiddleBackSize}</span>

                                  </button>
                                </td>

                                <td id="blockin9" className="box-w1 back-color">
                                  {status}
                                  <button
                                    className="bet-sec back "
                                    onClick={this.handleBidClick.bind(
                                      this,
                                      this.state.secondTeamName,
                                      this.state.teamTwoFirstBack,
                                      "#72bbef",
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
                                    <span className="odd1 backprice">
                                      {this.state.teamTwoFirstBack}
                                    </span>
                                    <span className="text11">
                                      {this.state.teamTwoFirstBackSize}{" "}</span>
                                  </button>
                                </td>

                                <td id="blockin10" className="box-w1 lay-color">
                                  {status}
                                  <button
                                    className="bet-sec lay"
                                    value={this.state.lastPriceTraded1}
                                    onClick={this.handleBidClick.bind(
                                      this,
                                      this.state.secondTeamName,
                                      this.state.teamTwoFirstLay,
                                      "#FAA9BA",
                                      "lay",
                                      this.state.teamTwoSelectionId,
                                      this.state.marketId,
                                      "teamtwo",
                                      this.state.status,
                                      "odds",
                                      "betmatch"
                                    )}
                                  >
                                    <span className="odd1 layprice">
                                      {this.state.teamTwoFirstLay}
                                    </span>
                                    <span className="text11">
                                      {this.state.teamTwoFirstLaySize}</span>

                                  </button>
                                </td>
                                <td
                                  id="blockin11"
                                  className="box-w1 lay-color re_none"
                                  style={{ backgroundColor: "#F8BBC8" }}
                                >
                                  {status}
                                  <button
                                    className="bet-sec lay"
                                    value={this.state.lastPriceTraded1}
                                    onClick={this.handleBidClick.bind(
                                      this,
                                      this.state.secondTeamName,
                                      this.state.teamTwoMiddleLay,
                                      "#F8BBC8",
                                      "lay",
                                      this.state.teamTwoSelectionId,
                                      this.state.marketId,
                                      "teamtwo",
                                      this.state.status,
                                      "odds",
                                      "betunmatch"
                                    )}
                                  >
                                    <span className="odd1 layprice">
                                      {this.state.teamTwoMiddleLay}
                                    </span>
                                    <span className="text11">
                                      {this.state.teamTwoMiddleLaySize}</span>

                                  </button>
                                </td>
                                <td
                                  id="blockin12"
                                  className="box-w1 lay-color re_none"
                                  style={{ backgroundColor: "#F6CDD6" }}
                                >
                                  {status}
                                  <button
                                    className="bet-sec lay"
                                    value={this.state.lastPriceTraded1}
                                    onClick={this.handleBidClick.bind(
                                      this,
                                      this.state.secondTeamName,
                                      this.state.teamTwoLastLay,
                                      "#F6CDD6",
                                      "lay",
                                      this.state.teamTwoSelectionId,
                                      this.state.marketId,
                                      "teamtwo",
                                      this.state.status,
                                      "odds",
                                      "betunmatch"
                                    )}
                                  >
                                    <span className="odd1 layprice">
                                      {this.state.teamTwoLastLay}
                                    </span>
                                    <span className="text11">
                                      {this.state.teamTwoLastLaySize}</span>
                                  </button>
                                </td>
                              </tr>
                              {this.showDrawHtml()}
                            </tbody>
                          </table>
                        </div></Card>) : (
                      <table className="table">
                        <tbody>
                          <tr>
                            <td colSpan="5" className="text-center bg4">
                              <div className="profit font-weight-normal"> No real-time  records found!</div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    )}
                    <div class="game-heading mt-1">
                      {" "}
                      <span className="font-weight-normal">
                        Bookmaker Market{" "}

                        <span>
                          <i class="fa fa-info-circle float-right"></i>
                        </span>

                      </span>
                    </div>
                    {this.state.bookmakerFirstTeamFound === true ||
                      this.state.bookmakerSecondTeamFound === true ||
                      this.state.bookmaker_draw ? (
                      <Card className="w-100">
                        <div
                          className="table-responsive main-market market-bf"
                          data-marketid="1.167146463"
                          style={{ marginTop: "-10px" }}
                        >
                          <table className="table coupon-table table table-striped table-bordered m-t-10 mb-0">
                            <thead>
                              <tr>

                                <th><span className="MINN font-weight-normal">Min: {this.state.bookmakerMax ? this.state.bookmakerMin : 100}{" "} Max: {this.state.bookmakerMax ? this.state.bookmakerMax : 50000}</span></th>
                                <th className="box-w1 re_none">&nbsp;</th>
                                <th className="box-w1 re_none">&nbsp;</th>
                                <th className="back box-w3 text-center">BACK</th>
                                <th className="lay box-w3 text-center">LAY</th>
                                <th className="box-w1 re_none">&nbsp;</th>
                                <th className="box-w1 re_none">&nbsp;</th>
                              </tr>
                            </thead>
                            <tbody id="dyn_bind">
                              <tr className="bet-info ">
                                <td
                                  className="team-name nation table-active"
                                  style={{ width: "270px" }}
                                >
                                  <span>
                                    {this.state.bookmaker_team1}
                                  </span>
                                  <p className="box-w4">
                                    <span
                                      className="float-right book"
                                      id="book_349"
                                    >
                                      {this.state.team_profit4 &&
                                        this.state.team_profit4 > 0 ? (
                                        <span className="text-success textProfit">
                                          {this.state.team_profit4}
                                        </span>
                                      ) : (
                                        <span className="text-danger textProfit">
                                          {this.state.team_profit4}
                                        </span>
                                      )}

                                      {this.state.stackAmount_team4 &&
                                        this.state.stackAmount_team4 > 0 ? (
                                        <span className="text-success textProfit">
                                          {this.state.stackAmount_team4}
                                        </span>
                                      ) : (
                                        <span className="text-danger textProfit">
                                          {this.state.stackAmount_team4}
                                        </span>
                                      )}
                                    </span>
                                  </p>

                                  <p className="box-w4">
                                    <span
                                      className="float-left book"

                                    >
                                      {this.state.profit15 &&
                                        this.state.profit15 > 0 ? (
                                        <span className="text-success textProfit flot-left">
                                          {parseFloat(this.state.profit15)}
                                        </span>
                                      ) : (
                                        <span className="text-danger textProfit flot-left">
                                          {parseFloat(this.state.profit15)}
                                        </span>
                                      )}

                                    </span>{" "}
                                  </p>
                                </td>

                                <td
                                  className="box-w1 back-color re_none"
                                  id="blockin1"
                                  style={{ backgroundColor: "#B2D6F0" }}
                                >

                                  {
                                    this.state.bookmaker_team1_status === "SUSPEND" ?
                                      (
                                        <div className="suspendedodds">
                                          <span>SUSPENDED</span>
                                        </div>
                                      ) : null}

                                  {
                                    this.state.bookmaker_team1_status === "Ball_Run" ?
                                      (
                                        <div className="suspendedodds">
                                          <span>Ball RUNNING</span>
                                        </div>
                                      ) : null}

                                  <button
                                    className="bet-sec back "
                                    onClick={this.handleBidClickBook.bind(
                                      this,
                                      this.state.bookmaker_team1,
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
                                    {" "}
                                    <span className="backprice odd1">
                                      {this.state.bookmaker_a_back_3}
                                    </span>
                                  </button>
                                </td>
                                <td
                                  id="blockin2"
                                  className="box-w1 back-color re_none"
                                  style={{ backgroundColor: "#92C9F0" }}
                                >
                                  {status}
                                  <button
                                    className="bet-sec back "
                                    onClick={this.handleBidClickBook.bind(
                                      this,
                                      this.state.bookmaker_team1,
                                      this.state.bookmaker_a_back_2,
                                      "#92c9F0",
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
                                    <span className="backprice odd1">
                                      {this.state.bookmaker_a_back_2}
                                    </span>{" "}
                                  </button>
                                </td>

                                <td id="blockin3" className="box-w1 back-color font-weight-bold">
                                  {status}
                                  <button
                                    className="bet-sec back "
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
                                      "betunmatch"
                                    )}
                                  >
                                    {" "}
                                    <span className="odd1 backprice">
                                      {this.state.bookmaker_a_back_1}
                                    </span>{" "}
                                  </button>
                                </td>

                                <td id="blockin4" className="box-w1 lay-color">
                                  {status}
                                  <button
                                    className="bet-sec lay"
                                    value={this.state.lastPriceTraded1}
                                    onClick={this.handleBidClickBook.bind(
                                      this,
                                      this.state.bookmaker_team1,
                                      this.state.bookmaker_a_lay_1,
                                      "#faa9ba",
                                      "lay",
                                      this.state.teamOneSelectionId,
                                      this.state.marketId,
                                      "teamone",
                                      this.state.status,
                                      "bookmaker",
                                      "betmatch"
                                    )}
                                  >
                                    <span className="odd1 layprice">
                                      {this.state.bookmaker_a_lay_1}
                                    </span>

                                  </button>
                                </td>
                                <td
                                  id="blockin5"
                                  className="box-w1 lay-color re_none"
                                  style={{ backgroundColor: "#F8BBC8" }}
                                >
                                  {status}
                                  <button
                                    className="bet-sec lay"
                                    value={this.state.lastPriceTraded1}
                                    onClick={this.handleBidClickBook.bind(
                                      this,
                                      this.state.bookmaker_team1,
                                      this.state.bookmaker_a_lay_2,
                                      "#F8BBC8",
                                      "lay",
                                      this.state.teamOneSelectionId,
                                      this.state.marketId,
                                      "teamone",
                                      "bookmaker",
                                      "betunmatch"
                                    )}
                                  >
                                    <span className="odd1 layprice">
                                      {this.state.bookmaker_a_lay_2}
                                    </span>

                                  </button>
                                </td>
                                <td
                                  id="blockin6"
                                  className="box-w1 lay-color re_none"
                                  style={{ backgroundColor: "#F6CDD6" }}
                                >
                                  <button
                                    className="bet-sec lay"
                                    value={this.state.lastPriceTraded1}
                                    onClick={this.handleBidClickBook.bind(
                                      this,
                                      this.state.bookmaker_team1,
                                      this.state.bookmaker_a_lay_3,
                                      "#F6CDD6",
                                      "lay",
                                      this.state.teamOneSelectionId,
                                      this.state.marketId,
                                      "teamone",
                                      "bookmaker",
                                      "betunmatch"
                                    )}
                                  >
                                    <span className="odd1 layprice">
                                      {
                                        this.state.bookmaker_a_lay_3}
                                    </span>

                                  </button>
                                </td>
                              </tr>

                              {this.state.bookmakerSecondTeamFound === true ? (
                                <tr className="bet-info ">
                                  <td
                                    className="team-name nation table-active"
                                    id="10301"
                                    style={{ width: "270px" }}
                                  >
                                    <span>
                                      {this.state.bookmaker_team2}
                                    </span>
                                    <p className="box-w4 textProfit">
                                      <span
                                        className="float-right book"
                                        id="book_10301"
                                      >
                                        {this.state.team_profit5 &&
                                          this.state.team_profit5 > 0 ? (
                                          <span className="text-success textProfit">
                                            {this.state.team_profit5}
                                          </span>
                                        ) : (
                                          <span className="text-danger textProfit">
                                            {this.state.team_profit5}

                                          </span>
                                        )}

                                        {this.state.stackAmount_team5 &&
                                          this.state.stackAmount_team5 > 0 ? (
                                          <span className="text-success">
                                            {this.state.stackAmount_team5}
                                          </span>
                                        ) : (
                                          <span className="text-danger">
                                            {this.state.stackAmount_team5}
                                          </span>
                                        )}
                                      </span>{" "}

                                    </p>


                                    <p className="box-w4">
                                      <span
                                        className="float-left book"

                                      >

                                        {this.state.profit16 &&
                                          this.state.profit16 > 0 ? (
                                          <span className="text-success float-left textProfit">
                                            {parseFloat(this.state.profit16)}
                                          </span>
                                        ) : (
                                          <span className="text-danger float-left textProfit">
                                            {parseFloat(this.state.profit16)}
                                          </span>
                                        )}</span>
                                    </p>
                                  </td>

                                  <td
                                    id="blockin7"
                                    className="box-w1 back-color re_none"
                                    style={{ backgroundColor: "#B2D6F0" }}
                                  >

                                    {
                                      this.state.bookmaker_team2_status === "SUSPEND" ?
                                        (
                                          <div className="suspendedodds">
                                            <span>SUSPENDED</span>
                                          </div>
                                        ) : null}

                                    {
                                      this.state.bookmaker_team2_status === "Ball_Run" ?
                                        (
                                          <div className="suspendedodds">
                                            <span>Ball RUNNING</span>
                                          </div>
                                        ) : null}
                                    <button
                                      className="bet-sec back "
                                      onClick={this.handleBidClickBook.bind(
                                        this,
                                        this.state.bookmaker_team2,
                                        this.state.bookmaker_b_back_3,
                                        "#B2D6F0",
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
                                      <span className="odd1 backprice">
                                        {this.state.bookmaker_b_back_3}
                                      </span>
                                    </button>
                                  </td>
                                  <td
                                    id="blockin8"
                                    className="box-w1 back-color re_none"
                                    style={{ backgroundColor: "#92C9F0" }}
                                  >
                                    {status}
                                    <button
                                      className="bet-sec back "
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
                                      <span className="odd1 backprice">
                                        {this.state.bookmaker_b_back_2}
                                      </span>

                                    </button>
                                  </td>

                                  <td id="blockin9" className="box-w1 back-color">
                                    {status}
                                    <button
                                      className="bet-sec back "
                                      onClick={this.handleBidClickBook.bind(
                                        this,
                                        this.state.bookmaker_team2,
                                        this.state.bookmaker_b_back_1,
                                        "#72bbef",
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
                                      <span className="odd1 backprice">
                                        {this.state.bookmaker_b_back_1}
                                      </span>
                                    </button>
                                  </td>

                                  <td id="blockin10" className="box-w1 lay-color">
                                    {status}
                                    <button
                                      className="bet-sec lay"
                                      value={this.state.lastPriceTraded1}
                                      onClick={this.handleBidClickBook.bind(
                                        this,
                                        this.state.bookmaker_team2,
                                        this.state.bookmaker_b_lay_1,
                                        "#FAA9BA",
                                        "lay",
                                        this.state.teamTwoSelectionId,
                                        this.state.marketId,
                                        "teamtwo",
                                        this.state.status,
                                        "bookmaker",
                                        "betmatch"
                                      )}
                                    >
                                      <span className="odd1 layprice">
                                        {this.state.bookmaker_b_lay_1}
                                      </span>

                                    </button>
                                  </td>
                                  <td
                                    id="blockin11"
                                    className="box-w1 lay-color re_none"
                                    style={{ backgroundColor: "#F8BBC8" }}
                                  >
                                    {status}
                                    <button
                                      className="bet-sec lay"
                                      value={this.state.lastPriceTraded1}
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
                                      <span className="odd1 layprice">
                                        {this.state.bookmaker_b_lay_2}
                                      </span>

                                    </button>
                                  </td>
                                  <td
                                    id="blockin12"
                                    className="box-w1 lay-color re_none"
                                    style={{ backgroundColor: "#F6CDD6" }}
                                  >
                                    {status}
                                    <button
                                      className="bet-sec lay"
                                      value={this.state.lastPriceTraded1}
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
                                      <span className="odd1 layprice">
                                        {
                                          this.state.bookmaker_b_lay_3}
                                      </span>
                                    </button>
                                  </td>
                                </tr>
                              ) : null}  {this.state.bookmaker_draw === true ? (
                                <tr className="bet-info ">
                                  <td
                                    className="team-name nation table-active"
                                    id="10301"
                                    style={{ width: "270px" }}
                                  >
                                    <span>
                                      {this.state.bookmaker_team3}
                                    </span>
                                    <p className="box-w4 textProfit">
                                      <span
                                        className="float-right book"
                                        id="book_10301"
                                      >
                                        {this.state.team_profit6 &&
                                          this.state.team_profit6 > 0 ? (
                                          <span className="text-success textProfit">
                                            {this.state.team_profit6}
                                          </span>
                                        ) : (
                                          <span className="text-danger textProfit">
                                            {this.state.team_profit6}
                                          </span>
                                        )}

                                        {this.state.stackAmount_team6 &&
                                          this.state.stackAmount_team6 > 0 ? (
                                          <span className="text-success">
                                            {this.state.stackAmount_team6}
                                          </span>
                                        ) : (
                                          <span className="text-danger">
                                            {this.state.stackAmount_team6}
                                          </span>
                                        )}
                                      </span>{" "}

                                    </p>
                                    <p className="box-w4">
                                      <span
                                        className="float-left book"

                                      >

                                        {this.state.profit17 &&
                                          this.state.profit17 > 0 ? (
                                          <span className="text-success float-left textProfit">
                                            {parseFloat(this.state.profit17)}
                                          </span>
                                        ) : (
                                          <span className="text-danger float-left textProfit">
                                            {parseFloat(this.state.profit17)}
                                          </span>
                                        )}</span>
                                    </p>
                                  </td>
                                  <td
                                    id="blockin7"
                                    className="box-w1 back-color re_none"
                                    style={{ backgroundColor: "#B2D6F0" }}
                                  >

                                    {
                                      this.state.bookmaker_team3_status === "SUSPEND" ?
                                        (
                                          <div className="bet-info suspendedodds row">
                                            <span>SUSPENDED</span>
                                          </div>
                                        ) : null}
                                    <button
                                      className="bet-sec back "
                                      onClick={this.handleBidClickBook.bind(
                                        this,
                                        this.state.bookmaker_team3,
                                        this.state.bookmaker_d_back_3,
                                        "#B2D6F0",
                                        "back",
                                        this.state.teamTwoSelectionId,
                                        this.state.marketId,
                                        "draw",
                                        this.state.status,
                                        "bookmaker",
                                        "betunmatch"
                                      )}
                                    >
                                      {" "}
                                      <span className="odd1 backprice">
                                        {this.state.bookmaker_d_back_3}
                                      </span>
                                    </button>
                                  </td>
                                  <td
                                    id="blockin8"
                                    className="box-w1 back-color re_none"
                                    style={{ backgroundColor: "#92C9F0" }}
                                  >
                                    {status}
                                    <button
                                      className="bet-sec back "
                                      onClick={this.handleBidClickBook.bind(
                                        this,
                                        this.state.bookmaker_team3,
                                        this.state.bookmaker_d_back_2,
                                        "#92C9F0",
                                        "back",
                                        this.state.teamTwoSelectionId,
                                        this.state.marketId,
                                        "draw",
                                        this.state.status,
                                        "bookmaker",
                                        "betunmatch"
                                      )}
                                    >
                                      {" "}
                                      <span className="odd1 backprice">
                                        {this.state.bookmaker_d_back_2}
                                      </span>

                                    </button>
                                  </td>

                                  <td id="blockin9" className="box-w1 back-color">
                                    {status}
                                    <button
                                      className="bet-sec back "
                                      onClick={this.handleBidClickBook.bind(
                                        this,
                                        this.state.bookmaker_team2,
                                        this.state.bookmaker_d_back_1,
                                        "#72bbef",
                                        "back",
                                        this.state.teamTwoSelectionId,
                                        this.state.marketId,
                                        "drow",
                                        this.state.status,
                                        "bookmaker",
                                        "betmatch"
                                      )}
                                    >
                                      {" "}
                                      <span className="odd1 backprice">
                                        {this.state.bookmaker_d_back_1}
                                      </span>
                                    </button>
                                  </td>

                                  <td id="blockin10" className="box-w1 lay-color">
                                    {status}
                                    <button
                                      className="bet-sec lay"
                                      value={this.state.lastPriceTraded1}
                                      onClick={this.handleBidClickBook.bind(
                                        this,
                                        this.state.bookmaker_team3,
                                        this.state.bookmaker_d_lay_1,
                                        "#FAA9BA",
                                        "lay",
                                        this.state.teamTwoSelectionId,
                                        this.state.marketId,
                                        "drow",
                                        this.state.status,
                                        "bookmaker",
                                        "betmatch"
                                      )}
                                    >
                                      <span className="odd1 layprice">
                                        {this.state.bookmaker_d_lay_1}
                                      </span>

                                    </button>
                                  </td>
                                  <td
                                    id="blockin11"
                                    className="box-w1 lay-color re_none"
                                    style={{ backgroundColor: "#F8BBC8" }}
                                  >
                                    {status}
                                    <button
                                      className="bet-sec lay"
                                      value={this.state.lastPriceTraded1}
                                      onClick={this.handleBidClickBook.bind(
                                        this,
                                        this.state.bookmaker_team3,
                                        this.state.bookmaker_d_lay_2,
                                        "#F8BBC8",
                                        "lay",
                                        this.state.teamTwoSelectionId,
                                        this.state.marketId,
                                        "drow",
                                        this.state.status,
                                        "bookmaker",
                                        "betunmatch"
                                      )}
                                    >
                                      <span className="odd1 layprice">
                                        {this.state.bookmaker_d_lay_2}
                                      </span>

                                    </button>
                                  </td>
                                  <td
                                    id="blockin12"
                                    className="box-w1 lay-color re_none"
                                    style={{ backgroundColor: "#F6CDD6" }}
                                  >
                                    {status}
                                    <button
                                      className="bet-sec lay"
                                      value={this.state.lastPriceTraded1}
                                      onClick={this.handleBidClickBook.bind(
                                        this,
                                        this.state.bookmaker_team3,
                                        this.state.bookmaker_d_lay_3,
                                        "#F6CDD6",
                                        "lay",
                                        this.state.teamTwoSelectionId,
                                        this.state.marketId,
                                        "drow",
                                        this.state.status,
                                        "bookmaker",
                                        "betunmatch"
                                      )}
                                    >
                                      <span className="odd1 layprice">
                                        {
                                          this.state.bookmaker_d_lay_3}
                                      </span>
                                    </button>
                                  </td>
                                </tr>) : null}
                            </tbody>
                          </table>
                        </div></Card>) : (
                      <table className="table">
                        <tbody>
                          <tr>
                            <td colSpan="5" className="text-center bg4">
                              <div className="profit font-weight-normal"> No real-time  records found!</div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    )}


                    {this.state.gameName === "cricket" ? (
                      <div className="w-100">

                        <div id="div_fancy">
                          <div class="game-heading mt-1">
                            {" "}
                            <span className="font-weight-normal">
                              Session Market{" "}

                              <span>
                                <i class="fa fa-info-circle float-right"></i>
                              </span>

                            </span>

                          </div>
                          {
                            this.state.sessiondata && this.state.sessiondata.length ?
                              (<table className="table coupon-table table table-bordered"
                              >
                                <thead>
                                  <tr>
                                    <th className="fb_64">{" "}
                                    </th>

                                    <th className="lay box-w2">No</th>
                                    <th className="back box-w2">Yes</th>
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
                        </div>
                        <div style={{ marginTop: "-10px" }}>
                          <Tabs>
                            <TabList className="d-flex flex-row justify-content-between tablist2 w-100">
                              <Tab className="texttab5">
                                <div className="mt-2 px-3">Fancy 1</div>
                              </Tab>
                              <Tab className="texttab5">
                                <div className="mt-2 px-3">meter</div>
                              </Tab>    <Tab className="texttab5">
                                <div className="mt-2 px-3">khado</div>
                              </Tab>    <Tab className="texttab5">
                                <div className="mt-2 px-3">odd even</div>
                              </Tab><Tab className="texttab5">
                                <div className="mt-2 px-3">wicket</div>
                              </Tab>     <Tab className="texttab5">
                                <div className="mt-2 px-3">four</div>
                              </Tab>
                              <Tab className="texttab5">
                                <div className="mt-2 px-3">six</div>
                              </Tab>
                              <Tab className="texttab5">
                                <div className="mt-2 px-3">cricket casino</div>
                              </Tab>
                            </TabList>

                            <TabPanel style={{ marginTop: "-13px" }}>
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
                            <TabPanel style={{ marginTop: "-13px" }}>
                              <table className="table">
                                <tbody>
                                  <tr>
                                    <td colSpan="5" className="text-center bg4">
                                      <div className="profit font-weight-normal"> No real-time  records found!</div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </TabPanel> <TabPanel style={{ marginTop: "-13px" }}>
                              <table className="table">
                                <tbody>
                                  <tr>
                                    <td colSpan="5" className="text-center bg4">
                                      <div className="profit font-weight-normal"> No real-time  records found!</div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </TabPanel> <TabPanel style={{ marginTop: "-13px" }}>
                              <table className="table">
                                <tbody>
                                  <tr>
                                    <td colSpan="5" className="text-center bg4">
                                      <div className="profit font-weight-normal"> No real-time  records found!</div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </TabPanel> <TabPanel style={{ marginTop: "-13px" }}>
                              <table className="table">
                                <tbody>
                                  <tr>
                                    <td colSpan="5" className="text-center bg4">
                                      <div className="profit font-weight-normal"> No real-time  records found!</div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </TabPanel> <TabPanel style={{ marginTop: "-13px" }}>
                              <table className="table">
                                <tbody>
                                  <tr>
                                    <td colSpan="5" className="text-center bg4">
                                      <div className="profit font-weight-normal"> No real-time  records found!</div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </TabPanel> <TabPanel style={{ marginTop: "-13px" }}>
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
                            <TabPanel style={{ marginTop: "-13px" }}>
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
                    ) : null}


                  </div>
                </div>
                <div className="col-md-3 sidebar-right">
                  <div
                    className="card-header"
                    data-toggle="collapse"
                    data-target="#demo"
                    onClick={this.handleLiveTvClick}
                  >
                    <h6 className="card-title">
                      Live Match{" "}
                      <span className="float-right">
                        <i className="fa fa-tv"></i> live stream started
                        </span>{" "}
                    </h6>
                  </div>
                  <div id="demo" className="collapse hide ">
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
                    <div className="tab-content">
                      <div id="video1" className=" tab-pane active">
                        <iframe
                          className="tab_video"
                          src="https://video.indibetsportsbook.com:8888/embed_player?urlServer=wss://video.indibetsportsbook.com:8443&streamName=ch_1&autoplay=false&mediaProviders=WebRTC,Flash,MSE,WSPlayer"

                        ></iframe>
                      </div>
                      <div id="video2" className=" tab-pane fade">
                        <iframe
                          className="tab_video"
                          src="https://video.indibetsportsbook.com:8888/embed_player?urlServer=wss://video.indibetsportsbook.com:8443&streamName=ch_2&autoplay=false&mediaProviders=WebRTC,Flash,MSE,WSPlayer"
                        ></iframe>
                      </div>
                      <div id="video3" className=" tab-pane fade">
                        <iframe
                          className="tab_video"
                          src=" https://video.indibetsportsbook.com:8888/embed_player?urlServer=wss://video.indibetsportsbook.com:8443&streamName=ch_3&autoplay=false&mediaProviders=WebRTC,Flash,MSE,WSPlayer
                            "
                        ></iframe>
                      </div>
                      <div id="video4" className=" tab-pane fade">
                        <iframe
                          className="tab_video"
                          src="https://video.indibetsportsbook.com:8888/embed_player?urlServer=wss://video.indibetsportsbook.com:8443&streamName=ch_4&autoplay=false&mediaProviders=WebRTC,Flash,MSE,WSPlayer"
                        ></iframe>
                      </div>
                    </div>
                  </div>

                  <div className="card m-b-10 place-bet m-t-10">
                    <div className="card-header">
                      <h6 className="card-title d-inline-block">Place Bet</h6>
                    </div>

                    {this.showBidClickHtml()}
                    {this.showBidClickSessionHtml()}
                  </div>
                  <div className="card m-b-10 place-bet">
                    <div className="card-header">
                      <h6 className="card-title d-inline-block">My Bet</h6>
                    </div>
                    <div
                      className="table-responsive hide-box-click"
                      style={{ display: "block" }}
                    >
                      {this.showTableHtml()}
                    </div>
                  </div>
                  <form
                    onSubmit={this.handleFancybetSubmit}
                    method="post"
                    id="frm_placebet"
                  >
                    <table className="table table-borderedless place-bet">
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
              </div>
            </div>
          </div>

          <Modal show={this.state.showUserAmountPopup} style={{ opacity: 1 }}>
            <Modal.Header
              className="bg d-flex flex-row justify-content-between w-100"
              style={{ height: "40px" }}>
              <h5 className="text-white">Run Position</h5>
              <h6 className="text-right">
                <i
                  class="fa fa-times text-white"
                  aria-hidden="true"
                  onClick={() => this.handleDepoWithdrPopupClose()}
                  style={{ cursor: "pointer" }}
                />
              </h6>
            </Modal.Header>
            <Modal.Body>
              <table className="table coupon-table table table-striped table-bordered1">
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
                className="btn bg text-white"
                data-dismiss="modal"
                onClick={this.handleDepoWithdrPopupClose}
              >
                <i className="fas fa-undo-alt"></i> Close
                    </button>
            </Modal.Footer>
          </Modal>          </div>
      </div >
    );
  }
}


export default Index;
