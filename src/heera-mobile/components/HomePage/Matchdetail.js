/* eslint-disable */
import React, { Component } from "react";
import Nav from "../Include/Nav";
import Url from "../configure/configure.js";
import axios from "axios";
import Moment from "moment";
import $ from "jquery";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Redirect } from "react-router-dom";
import { Collapse, Modal, Row, Col, Card } from "react-bootstrap";
import "../Transactions/Transactions.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FullPageLoader from "../Loader/FullPageLoader";
var jwt = require("jsonwebtoken");

const privateKey = "aIjehGjJM38oN2eg89d13voolKEhHQySurtaledrlnE";
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
      stake_amount: 0,
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
      isShowBidClickHtml: false,
      betLoder: false,
      openCard: false,
    };
    this.emailInput = React.createRef();
  }

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

    // this.getScorePoints();
    this.getOddsValue();
    this.interval = setInterval(() => {
      this.getOddsValue();
      this.getScorePoints();
    }, 3000);

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
  async getScorePoints() {
    const data = {
      event_id: this.props.match.params.id,
    };
    await axios
      .post("http://122.168.190.16/score/scorecard", data)
      .then((resp) => {
        if (resp) {
          this.setState({ CardData: resp.data.cards ? resp.data.cards : {} });
        }
      });
  }
  getOddsValue() {
    const data = {
      match_id: this.props.match.params.id,
      sport_type: this.props.match.params.id1,
    };
    let headers = {
      Authorization: "Bearer " + this.state.accessToken,
    };
    axios
      .post("http://api.encabook999.com/match_odds/", data, { headers })
      .then((resp) => {
        if (resp) {
          this.setState({ isLoading: true });
          this.callMatchOddsApi(resp.data);
        }
      });
  }
  adminMaxMin = () => {
    const data = {
      match_id: this.props.match.params.id,
    };
    let headers = {
      Authorization: "Bearer " + this.state.accessToken,
    };
    axios
      .post("http://api.encabook999.com/maxmin_bet_limit/", data, { headers })
      .then((resp) => {
        if (resp) {
          this.setState({
            bookmakerMin:
              resp.data.limits && resp.data.limits.bookmaker_minimum_bet_limit
                ? resp.data.limits.bookmaker_minimum_bet_limit
                : 0,
            bookmakerMax:
              resp.data.limits && resp.data.limits.bookmaker_maximum_bet_limit
                ? resp.data.limits.bookmaker_maximum_bet_limit
                : 0,
            matchOddsMin:
              resp.data.limits && resp.data.limits.minimum_bet_limit
                ? resp.data.limits.minimum_bet_limit
                : 0,
            matchOddsMax:
              resp.data.limits && resp.data.limits.maximum_bet_limit
                ? resp.data.limits.maximum_bet_limit
                : 0,
            fancyMin:
              resp.data.limits && resp.data.limits.fancy_minimum_bet_limit
                ? resp.data.limits.fancy_minimum_bet_limit
                : 0,
            fancyMax:
              resp.data.limits && resp.data.limits.fancy_maximum_bet_limit
                ? resp.data.limits.fancy_maximum_bet_limit
                : 0,
          });
        }
      });
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  CloseCard = () => {
    setInterval(() => {
      this.setState({
        openCard: !openCard,
        SelectionId: "",
      });
    }, 2000);
  };
  handleSubmit = async(event) => {
    event.preventDefault();
    const {
      betOn,
      matchOdds,
      oddVal,
      type,
      teamName,
      bookmaker,
      team_profit1,
      stackAmount_team1,
      team_profit2,
      stackAmount_team2,
      team_profit3,
      stackAmount_team3,
    } = this.state;

    this.setState({ betLoder: true });
    let headers = {
      Authorization: "Bearer " + this.state.accessToken,
    };
    if (isNaN(parseInt(this.state.oddVal)) || this.state.oddVal <= 0) {
      this.setState({
        emptyField: true,
        errMsg: "Please Enter Valid Odds.",
        betLoder: false,
      });
      return false;
    }
    if (
      isNaN(parseInt(this.state.stake_amount)) ||
      this.state.stake_amount <= 0
    ) {
      this.setState({
        emptyField: true,
        errMsg: "Enter Stake",
        betLoder: false,
      });
      return false;
    }
    if (betOn === "odds") {
      let market = matchOdds;
      let marketData = market.filter((item) => item.RunnerName === teamName);
      if (type === "back") {
        if (
          marketData[0].BackPrice1 !== oddVal &&
          marketData[0].BackPrice2 !== oddVal &&
          marketData[0].BackPrice3 !== oddVal
        ) {
          this.setState({
            emptyField: true,
            errMsg: `${oddVal} is not valid.`,
            betLoder: false,
          });
          return false;
        }
      } else if (type === "lay") {
        if (
          marketData[0].LayPrice1 !== oddVal &&
          marketData[0].LayPrice2 !== oddVal &&
          marketData[0].LayPrice3 !== oddVal
        ) {
          this.setState({
            emptyField: true,
            errMsg: `${oddVal} is not valid.`,
            betLoder: false,
          });
          return false;
        }
      }
    } else if (betOn === "bookmaker") {
      let bookmakerData = bookmaker.filter(
        (item) => item.RunnerName === teamName
      );
      if (type === "back") {
        if (
          bookmakerData[0].BackPrice1 !== oddVal &&
          bookmakerData[0].BackPrice2 !== oddVal &&
          bookmakerData[0].BackPrice3 !== oddVal
        ) {
          this.setState({
            emptyField: true,
            errMsg: `${oddVal} is not valid.`,
            betLoder: false,
          });
          return false;
        }
      } else if (type === "lay") {
        if (
          bookmakerData[0].LayPrice1 !== oddVal &&
          bookmakerData[0].LayPrice2 !== oddVal &&
          bookmakerData[0].LayPrice3 !== oddVal
        ) {
          this.setState({
            emptyField: true,
            errMsg: `${oddVal} is not valid.`,
            betLoder: false,
          });
          return false;
        }
      }
    }
    let expoArr = [
      team_profit1,
      stackAmount_team1,
      team_profit2,
      stackAmount_team2,
      team_profit3,
      stackAmount_team3,
    ];
    let minexpo = Math.min(...expoArr);
    let matchName =
      this.state.firstTeamName + " v " + this.state.secondTeamName;
    let drawFounded = "no";
    if (
      this.state.draw === true &&
      this.state.drawTeamName !== null &&
      this.state.betOn == "odds"
    ) {
      drawFounded = "yes";
    }
    if (
      this.state.betOn == "bookmaker" &&
      this.state.bookmaker_team3 !== null &&
      this.state.bookmaker_draw === true
    ) {
      drawFounded = "yes";
    }
    let savebet = {
      event_id: this.props.match.params.id,
      event_name: matchName,
      match_name: matchName,
      odds: this.state.oddVal,
      stake: this.state.stake_amount,
      profit: parseInt(this.state.profit),
      bet_type: this.state.type,
      draw_found: drawFounded,
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
      exposure: minexpo,
    };

    $(".blockUI").show();
    let jsonData = await jwt
    .sign(savebet, privateKey, { algorithm: "HS256"}).toString("base64")
    setTimeout(() =>
      axios
        .post(baseUrl + "/createbetuser", { endata: jsonData }, { headers })
        .then((resp) => {
          var resp = resp.data;
          if (resp.success === true) {
            this.setState({
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
            {
              resp.success === true
                ? toast.success(`${resp.message}`)
                : toast.error(`${resp.message}`);
            }
            this.showTableHtml();
            $(".blockUI").hide();
            setTimeout(() => {
              this.setState({
                respStatus: "",
                betClick1: false,
                betClick: false,
                betClick2: false,
                betLoder: false,
                isShowBidClickHtml: false,
              });
            }, 1000);
          } else {
            toast.error(`${resp.message}`);
            this.setState({
              betLoder: false,
              isShowBidClickHtml: false,
            });

            $(".blockUI").hide();
            setTimeout(() => {
              this.setState({
                respStatus: "",
                betClick1: false,
                betClick: false,
                betClick2: false,
                betLoder: false,
                isShowBidClickHtml: false,
              });
            }, 1000);
          }
          this.callUserBetListApi();
          $(".blockUI").hide();
        })
    );
  };
  handleSubmitSession = async(event) => {
    event.preventDefault();
    this.setState({ betLoder: true });
    const { betOn, oddVal, sessiondata, headname } = this.state;
    let headers = {
      Authorization: "Bearer " + this.state.accessToken,
    };
    if (betOn === "fency") {
      let fancy = sessiondata.filter((item) => item.RunnerName === headname);
      if (fancy[0].GameStatus !== "ONLINE") {
        this.setState({
          emptyField: true,
          errMsg: `${oddVal} is not Active.`,
          betLoder: false,
        });
        return false;
      } else if (
        fancy[0].LayPrice1 !== oddVal &&
        fancy[0].BackPrice1 !== oddVal
      ) {
        this.setState({
          emptyField: true,
          errMsg: `${oddVal} is not valid.`,
          betLoder: false,
        });
        return false;
      }
    }
    let yes_amount = "";
    let no_amount = "";
    let new_value = "";
    let newAmount = 0;
    let profit = 0;
    let loss = 0;
    let no_amount1;
    if (this.state.no === "no") {
      new_value = this.state.session_input;
      no_amount = this.state.session_input;
      no_amount1 = this.state.no;
      profit = this.state.stake_amount;
      loss = (
        parseInt(this.state.stake_amount) *
        (parseFloat(this.state.laySize) / 100)
      ).toFixed(0);
    }

    if (this.state.no === "yes") {
      new_value = this.state.session_input;
      no_amount = this.state.session_input;
      no_amount1 = this.state.no;
      profit = (
        parseInt(this.state.stake_amount) *
        (parseFloat(this.state.backSize) / 100)
      ).toFixed(0);
      loss = parseInt(this.state.stake_amount);
    }
    let exposure = "-" + newAmount;
    let matchName =
      this.state.firstTeamName + " v " + this.state.secondTeamName;

    let savebet = {
      event_id: this.props.match.params.id,
      event_name: matchName,
      match_name: matchName,
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
      event_type: "cricket",
      type1: "fancy",
      yes_no_stake: this.state.yes_no_STAKE,
      bet_on: "fancy",
      lay_price: this.state.layPrice,
      lay_size: this.state.laySize,
      back_price: this.state.backPrice,
      back_size: this.state.backSize,
      exposure: exposure,
      profit: profit,
      loss: loss,
    };
    let jsonData = await jwt
    .sign(savebet, privateKey, { algorithm: "HS256"}).toString("base64")
    axios
      .post(baseUrl + "/createbetuser", { endata: jsonData }, { headers })
      .then((resp) => {
        var resp = resp.data;
        if (resp.success === true) {
          this.setState({
            oddVal: "",
            stake_amount: "",
            profit: "",
            team_profit1: "",
            stackAmount_team1: "",
            team_profit2: "",
            stackAmount_team2: "",
            betLoder: false,
          });
          toast.success(`${resp.message}`);
          this.showTableHtml();
          setTimeout(() => {
            this.setState({
              betClick1: false,
              betClick: false,
              betClick2: false,
              isShowBidClickHtml: false,
              betLoder: false,
            });
          }, 1000);
        } else {

          toast.error(`${resp.message}`);
          this.setState({
            betLoder: false,
          });
          setTimeout(() => {
            this.setState({
              respStatus: "",
              betClick1: false,
              betClick: false,
              betClick2: false,
              betLoder: false,
              isShowBidClickHtml: false,
            });
          }, 1000);
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
    axios.get(baseUrl + "/userbetlist/" + matchid, { headers }).then((resp) => {
      var resps = resp.data;
      if (resps.success === true) {
        this.setState({ getResults: resps.Betlist, betDataFound: true });
      }
    });
  };

  callMatchOddsApi = (data) => {
    const { eventName } = this.state;
    let matchOdds =
      data &&
        data.market &&
        data.market.length &&
        data.market[0] &&
        data.market[0].events
        ? data.market[0] && data.market[0].events
        : null;
    let bookmaker =
      data.bookmake[0] && data.bookmake[0].runners
        ? data.bookmake[0].runners
        : null;
    this.setState({ matchOdds: matchOdds, bookmaker: bookmaker });
    if (
      data.session !== undefined &&
      data.session &&
      data.session[0] !== "No Data"
    ) {
      let myFancy = data.session.filter(
        (item) => item.GameStatus !== "OFFLINE" && item.GameStatus !== "CLOSED"
      );
      this.setState({ sessiondata: myFancy });
    }
    this.setState({
      eventName:
        data &&
          data.market &&
          data.market.length &&
          data.market[0] &&
          data.market[0].events &&
          data.market[0].events.length &&
          data.market[0].events[0] &&
          data.market[0].events[0].RunnerName
          ? data.market[0].events[0].RunnerName
          : null + " v " + data &&
            data.market[0] &&
            data.market[0].events[1] &&
            data.market[0].events[1].RunnerName
            ? data.market[0].events[1].RunnerName
            : null,
      marketId:
        data && data.market && data.market[0] && data.market[0].marketId
          ? data.market[0].marketId
          : null,
      firstTeamName:
        data.market &&
          data.market[0] &&
          data.market[0].events[0] &&
          data.market[0].events[0].RunnerName
          ? data.market[0].events[0].RunnerName
          : null,
      secondTeamName:
        data.market &&
          data.market[0] &&
          data.market[0].events[1] &&
          data.market[0].events[1].RunnerName
          ? data.market[0].events[1].RunnerName
          : null,
      teamOneSelectionId:
        data.market &&
          data.market[0] &&
          data.market[0].events[0] &&
          data.market[0].events[0].SelectionId
          ? data.market[0].events[0].SelectionId
          : 0,
      teamTwoSelectionId:
        data.market &&
          data.market[0] &&
          data.market[0].events[1] &&
          data.market[0].events[1].SelectionId
          ? data.market[0].events[1].SelectionId
          : 0,
    });

    if (
      data.market !== undefined ||
      (data.market && data.market.market !== "no data")
    ) {
      if (data.market[0] && data.market[0].events[0] !== undefined) {
        this.setState({
          firstTeamName: matchOdds[0].RunnerName
            ? matchOdds[0].RunnerName
            : null,
          teamOneFirstBack: matchOdds[0].BackPrice1
            ? matchOdds[0].BackPrice1
            : 0,
          teamOneFirstBackSize: matchOdds[0].BackSize1
            ? matchOdds[0].BackSize1
            : 0,
          teamOneMiddleBack: matchOdds[0].BackPrice2
            ? matchOdds[0].BackPrice2
            : 0,
          teamOneMiddleBackSize: matchOdds[0].BackSize2
            ? matchOdds[0].BackSize2
            : 0,
          teamOneLastBack: matchOdds[0].BackPrice3
            ? matchOdds[0].BackPrice3
            : 0,
          teamOneLastBackSize: matchOdds[0].BackSize3
            ? matchOdds[0].BackSize3
            : 0,
          teamOneFirstLay: matchOdds[0].LayPrice1 ? matchOdds[0].LayPrice1 : 0,
          teamOneFirstLaySize: matchOdds[0].LaySize1
            ? matchOdds[0].LaySize1
            : 0,
          teamOneMiddleLay: matchOdds[0].LayPrice2 ? matchOdds[0].LayPrice2 : 0,
          teamOneMiddleLaySize: matchOdds[0].LaySize2
            ? matchOdds[0].LaySize2
            : 0,
          teamOneLastLay: matchOdds[0].LayPrice3 ? matchOdds[0].LayPrice3 : 0,
          teamOneLastLaySize: matchOdds[0].LaySize3 ? matchOdds[0].LaySize3 : 0,
        });
      }
      if (data.market[0] && data.market[0].events[1] !== undefined) {
        this.setState({
          secondTeamName: matchOdds[1].RunnerName
            ? matchOdds[1].RunnerName
            : null,
          teamTwoFirstBack: matchOdds[1].BackPrice1
            ? matchOdds[1].BackPrice1
            : 0,
          teamTwoFirstBackSize: matchOdds[1].BackSize1
            ? matchOdds[1].BackSize1
            : 0,
          teamTwoMiddleBack: matchOdds[1].BackPrice2
            ? matchOdds[1].BackPrice2
            : 0,
          teamTwoMiddleBackSize: matchOdds[1].BackSize2
            ? matchOdds[1].BackSize2
            : 0,
          teamTwoLastBack: matchOdds[1].BackPrice3
            ? matchOdds[1].BackPrice3
            : 0,
          teamTwoLastBackSize: matchOdds[1].BackSize3
            ? matchOdds[1].BackSize3
            : 0,
          teamTwoFirstLay: matchOdds[1].LayPrice1 ? matchOdds[1].LayPrice1 : 0,
          teamTwoFirstLaySize: matchOdds[1].LaySize1
            ? matchOdds[1].LaySize1
            : 0,
          teamTwoMiddleLay: matchOdds[1].LayPrice2 ? matchOdds[1].LayPrice2 : 0,
          teamTwoMiddleLaySize: matchOdds[1].LaySize2
            ? matchOdds[1].LaySize2
            : 0,
          teamTwoLastLay: matchOdds[1].LayPrice3 ? matchOdds[1].LayPrice3 : 0,
          teamTwoLastLaySize: matchOdds[1].LaySize3 ? matchOdds[1].LaySize3 : 0,
        });
      }
      if (data.market[0] && data.market[0].events[2] !== undefined) {
        this.setState({
          draw: true,
          drawTeamName: matchOdds[2].RunnerName
            ? matchOdds[2].RunnerName
            : null,
          drawFirstBack: matchOdds[2].BackPrice1 ? matchOdds[2].BackPrice1 : 0,
          drawFirstBackSize: matchOdds[2].BackSize1
            ? matchOdds[2].BackSize1
            : 0,
          drawMiddleBack: matchOdds[2].BackPrice2 ? matchOdds[2].BackPrice2 : 0,
          drawMiddleBackSize: matchOdds[2].BackSize2
            ? matchOdds[2].BackSize2
            : 0,
          drawLastBack: matchOdds[2].BackPrice3 ? matchOdds[2].BackPrice3 : 0,
          drawLastBackSize: matchOdds[2].BackSize3 ? matchOdds[2].BackSize3 : 0,
          drawFirstLay: matchOdds[2].LayPrice1 ? matchOdds[2].LayPrice1 : 0,
          drawFirstLaySize: matchOdds[2].LaySize1 ? matchOdds[2].LaySize1 : 0,
          drawMiddleLay: matchOdds[2].LayPrice2 ? matchOdds[2].LayPrice2 : 0,
          drawMiddleLaySize: matchOdds[2].LaySize2 ? matchOdds[2].LaySize2 : 0,
          drawLastLay: matchOdds[2].LayPrice3 ? matchOdds[2].LayPrice3 : 0,
          drawLastLaySize: matchOdds[2].LaySize3 ? matchOdds[2].LaySize3 : 0,
        });
      }
    }
    if (
      data.bookmake !== undefined &&
      data.bookmake[0] &&
      data.bookmake[0].runners &&
      data.bookmake[0].runners[0] !== "unexpected Error Occur" &&
      data.bookmake[0].runners[0] !== "No Data"
    ) {
      if (bookmaker[0] !== undefined) {
        this.setState({
          bookmakerFirstTeamFound: true,
          bookmaker_team1_status: bookmaker[0].GameStatus
            ? bookmaker[0].GameStatus
            : null,
          bookmaker_team1: bookmaker[0].RunnerName
            ? bookmaker[0].RunnerName
            : null,
          bookmaker_a_back_1:
            bookmaker[0] && bookmaker[0].BackPrice1
              ? bookmaker[0].BackPrice1
              : 0,
          bookmaker_a_back_2:
            bookmaker[0] && bookmaker[0].BackPrice2
              ? bookmaker[0].BackPrice2
              : 0,
          bookmaker_a_back_3:
            bookmaker[0] && bookmaker[0].BackPrice3
              ? bookmaker[0].BackPrice3
              : 0,
          bookmaker_a_lay_1:
            bookmaker[0] && bookmaker[0].LayPrice1 ? bookmaker[0].LayPrice1 : 0,
          bookmaker_a_lay_2:
            bookmaker[0] && bookmaker[0].LayPrice2 ? bookmaker[0].LayPrice2 : 0,
          bookmaker_a_lay_3:
            bookmaker[0] && bookmaker[0].LayPrice3 ? bookmaker[0].LayPrice3 : 0,
        });
      }
      if (bookmaker[1] !== undefined) {
        this.setState({
          bookmakerSecondTeamFound: true,
          bookmaker_team2_status: bookmaker[1].GameStatus
            ? bookmaker[1].GameStatus
            : null,
          bookmaker_team2: bookmaker[1].RunnerName
            ? bookmaker[1].RunnerName
            : null,
          bookmaker_b_back_1:
            bookmaker[1] && bookmaker[1].BackPrice1
              ? bookmaker[1].BackPrice1
              : 0,
          bookmaker_b_back_2:
            bookmaker[1] && bookmaker[1].BackPrice2
              ? bookmaker[1].BackPrice2
              : 0,
          bookmaker_b_back_3:
            bookmaker[1] && bookmaker[1].BackPrice3
              ? bookmaker[1].BackPrice3
              : 0,
          bookmaker_b_lay_1:
            bookmaker[1] && bookmaker[1].LayPrice1 ? bookmaker[1].LayPrice1 : 0,
          bookmaker_b_lay_2:
            bookmaker[1] && bookmaker[1].LayPrice2 ? bookmaker[1].LayPrice2 : 0,
          bookmaker_b_lay_3:
            bookmaker[1] && bookmaker[1].LayPrice3 ? bookmaker[1].LayPrice3 : 0,
        });
      }
      if (bookmaker[2] !== undefined) {
        this.setState({
          bookmaker_draw: true,
          bookmaker_team3_status: bookmaker[2].GameStatus
            ? bookmaker[2].GameStatus
            : null,
          bookmaker_team3: bookmaker[2].RunnerName
            ? bookmaker[2].RunnerName
            : null,
          bookmaker_d_back_1:
            bookmaker[2] && bookmaker[2].BackPrice1
              ? bookmaker[2].BackPrice1
              : 0,
          bookmaker_d_back_2:
            bookmaker[2] && bookmaker[2].BackPrice2
              ? bookmaker[2].BackPrice2
              : 0,
          bookmaker_d_back_3:
            bookmaker[2] && bookmaker[2].BackPrice3
              ? bookmaker[2].BackPrice3
              : 0,
          bookmaker_d_lay_1:
            bookmaker[2] && bookmaker[2].LayPrice1 ? bookmaker[2].LayPrice1 : 0,
          bookmaker_d_lay_2:
            bookmaker[2] && bookmaker[2].LayPrice2 ? bookmaker[2].LayPrice2 : 0,
          bookmaker_d_lay_3:
            bookmaker[2] && bookmaker[2].LayPrice3 ? bookmaker[2].LayPrice3 : 0,
        });
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
            profit12 =
              parseFloat(profit12) +
              parseFloat(this.state.getResults[i].profit);
            profit13 =
              parseFloat(profit13) + parseFloat(this.state.getResults[i].loss);
            profit14 =
              parseFloat(profit14) + parseFloat(this.state.getResults[i].loss);
          } else {
            profit12 =
              parseFloat(profit12) +
              parseFloat(this.state.getResults[i].profit);
            profit13 =
              parseFloat(profit13) + parseFloat(this.state.getResults[i].loss);
            profit14 =
              parseFloat(profit14) +
              parseFloat(this.state.getResults[i].profit);
          }
        } else if (
          this.state.getResults[i].profit_team == "teamtwo" &&
          this.state.getResults[i].team_name !== "The Draw" &&
          this.state.getResults[i].bet_on === "odds"
        ) {
          if (this.state.getResults[i].bet_type !== "lay") {
            profit12 =
              parseFloat(profit12) + parseFloat(this.state.getResults[i].loss);
            profit13 =
              parseFloat(profit13) +
              parseFloat(this.state.getResults[i].profit);
            profit14 =
              parseFloat(profit14) + parseFloat(this.state.getResults[i].loss);
          } else {
            profit12 =
              parseFloat(profit12) + parseFloat(this.state.getResults[i].loss);
            profit13 =
              parseFloat(profit13) +
              parseFloat(this.state.getResults[i].profit);
            profit14 =
              parseFloat(profit14) +
              parseFloat(this.state.getResults[i].profit);
          }
        } else {
          if (
            this.state.getResults[i].bet_on === "odds" &&
            this.state.getResults[i].team_name === "The Draw"
          ) {
            if (this.state.getResults[i].bet_type !== "lay") {
              profit12 =
                parseFloat(profit12) +
                parseFloat(this.state.getResults[i].loss);
              profit13 =
                parseFloat(profit13) +
                parseFloat(this.state.getResults[i].loss);
              profit14 =
                parseFloat(profit14) +
                parseFloat(this.state.getResults[i].profit);
            } else {
              profit12 =
                parseFloat(profit12) +
                parseFloat(this.state.getResults[i].profit);
              profit13 =
                parseFloat(profit13) +
                parseFloat(this.state.getResults[i].profit);
              profit14 =
                parseFloat(profit14) +
                parseFloat(this.state.getResults[i].loss);
            }
          }
        }
        if (
          this.state.getResults[i].profit_team === "teamone" &&
          this.state.getResults[i].team_name !== "The Draw" &&
          this.state.getResults[i].bet_on === "bookmaker"
        ) {
          if (this.state.getResults[i].bet_type === "back") {
            profit15 =
              parseFloat(profit15) +
              parseFloat(this.state.getResults[i].profit);
            profit16 =
              parseFloat(profit16) + parseFloat(this.state.getResults[i].loss);
            profit17 =
              parseFloat(profit17) + parseFloat(this.state.getResults[i].loss);
          } else {
            profit15 =
              parseFloat(profit15) +
              parseFloat(this.state.getResults[i].profit);
            profit16 =
              parseFloat(profit16) + parseFloat(this.state.getResults[i].loss);
            profit17 =
              parseFloat(profit17) +
              parseFloat(this.state.getResults[i].profit);
          }
        } else if (
          this.state.getResults[i].profit_team == "teamtwo" &&
          this.state.getResults[i].team_name !== "The Draw" &&
          this.state.getResults[i].bet_on === "bookmaker"
        ) {
          if (this.state.getResults[i].bet_type !== "lay") {
            profit15 =
              parseFloat(profit15) + parseFloat(this.state.getResults[i].loss);
            profit16 =
              parseFloat(profit16) +
              parseFloat(this.state.getResults[i].profit);
            profit17 =
              parseFloat(profit17) + parseFloat(this.state.getResults[i].loss);
          } else {
            profit15 =
              parseFloat(profit15) + parseFloat(this.state.getResults[i].loss);
            profit16 =
              parseFloat(profit16) +
              parseFloat(this.state.getResults[i].profit);
            profit17 =
              parseFloat(profit17) +
              parseFloat(this.state.getResults[i].profit);
          }
        } else {
          if (
            this.state.getResults[i].bet_on === "bookmaker" &&
            this.state.getResults[i].team_name === "The Draw"
          ) {
            if (this.state.getResults[i].bet_type !== "lay") {
              profit15 =
                parseFloat(profit15) +
                parseFloat(this.state.getResults[i].loss);
              profit16 =
                parseFloat(profit16) +
                parseFloat(this.state.getResults[i].loss);
              profit17 =
                parseFloat(profit17) +
                parseFloat(this.state.getResults[i].profit);
            } else {
              profit15 =
                parseFloat(profit15) +
                parseFloat(this.state.getResults[i].profit);
              profit16 =
                parseFloat(profit16) +
                parseFloat(this.state.getResults[i].profit);
              profit17 =
                parseFloat(profit17) +
                parseFloat(this.state.getResults[i].loss);
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

      return (
        <tr className="bet-info ">
          <td className="table-active fd-64">
            <strong>{this.state.drawTeamName}</strong>
            <p className="box-w4 textProfit">
              <span className="float-right book">
                {this.state.team_profit3 && this.state.team_profit3 > 0 ? (
                  <span className="text-success textProfit">
                    {this.state.team_profit3}
                  </span>
                ) : (
                  <strong className="text-danger textProfit">
                    {this.state.team_profit3}
                  </strong>
                )}

                {this.state.stackAmount_team3 &&
                  this.state.stackAmount_team3 > 0 ? (
                  <strong className="text-success">
                    {this.state.stackAmount_team3}
                  </strong>
                ) : (
                  <strong className="text-danger">
                    {this.state.stackAmount_team3}
                  </strong>
                )}
              </span>{" "}
            </p>

            <p className="box-w4">
              <span className="float-left book">
                {this.state.profit14 && this.state.profit14 > 0 ? (
                  <strong className="text-success float-left book textD">
                    {parseFloat(this.state.profit14)}
                  </strong>
                ) : (
                  <strong className="text-danger float-left book textD">
                    {parseFloat(this.state.profit14)}
                  </strong>
                )}
              </span>
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
              <span className="textD">{this.state.drawFirstBackSize}</span>
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
              <span className="textD"> {this.state.drawFirstLaySize}</span>
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
          <div className="col-6 d-flex flex-row" style={{ height: "22px" }}>
            <span className="textmax mt-1">
              Min: {this.state.bookmakerMax ? this.state.bookmakerMin : 0}{" "}
            </span>
            <span className="textmax mt-1 ml-1">
              Max: {this.state.bookmakerMax ? this.state.bookmakerMax : 0}
            </span>
          </div>
          <div
            className="col-1 box-w1 table-borderless"
            style={{ border: "none" }}
          >
            &nbsp;
          </div>
          <div
            className=" col-1 box-w1 table-borderless "
            style={{ border: "none" }}
          >
            &nbsp;
          </div>
          <div
            className="col-1 bgback box-w4 text-center pt-1"
            style={{ height: "22px" }}
          >
            BACK
          </div>
          <div
            className="col-1 bglay box-w4 text-center pt-1"
            style={{ height: "22px" }}
          >
            LAY
          </div>
          <div
            className="col-1 box-w1 table-borderless"
            style={{ border: "none" }}
          >
            &nbsp;
          </div>
          <div
            className="col-1 box-w1 table-borderless"
            style={{ border: "none" }}
          >
            &nbsp;
          </div>
        </div>
      );
    }
    if (
      this.state.bookmakerFirstTeamFound === true &&
      this.state.bookmaker_team1 !== null
    ) {
      returnHtml.push(
        <div
          className={
            this.state.bookmaker_team1_status === "SUSPEND"
              ? "bet-info suspended row"
              : this.state.bookmaker_team1_status === "BALL_RUN"
                ? "bet-info ball_running row"
                : "bet-info row"
          }
          style={{ marginTop: "-12px" }}
        >
          <div className="col-6 table-active fb_642" id="10301">
            <span>
              <strong>{this.state.bookmaker_team1}</strong>
            </span>
            <p className="box-w4">
              <span className="float-right book" id="book_349">
                {this.state.team_profit4 && this.state.team_profit4 > 0 ? (
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
              <span className="float-left book">
                {this.state.profit15 && this.state.profit15 > 0 ? (
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
          </div>
          <div className="box-w1 col-1 bgback">
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
              <span className="odd2 backprice mt-2">
                {this.state.bookmaker_a_back_3}
              </span>
            </button>
          </div>
          <div className="box-w1 bgback col-1 ">
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
              <span className="odd2 backprice mt-2">
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
              <span className="odd2 backprice mt-2">
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
              <span className="odd2 layprice mt-2">
                {this.state.bookmaker_a_lay_1}
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
              <span className="odd2 layprice mt-2">
                {this.state.bookmaker_a_lay_2}
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
              <span className="odd2 layprice mt-2">
                {this.state.bookmaker_a_lay_3}
              </span>
            </button>
          </div>
        </div>
      );
    }

    if (
      this.state.bookmakerSecondTeamFound === true &&
      this.state.bookmaker_team2 !== null
    ) {
      returnHtml.push(
        <div
          className={
            this.state.bookmaker_team2_status === "SUSPEND"
              ? "bet-info suspended row"
              : this.state.bookmaker_team2_status === "BALL_RUN"
                ? "bet-info ball_running row"
                : "bet-info row"
          }
        >
          <div className="col-6 table-active fb_642">
            <span>
              <strong>{this.state.bookmaker_team2}</strong>
            </span>
            <p className="box-w4">
              <span className="float-right book" id="book_349">
                {this.state.team_profit5 && this.state.team_profit5 > 0 ? (
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
                  <span className="text-success textProfit">
                    {this.state.stackAmount_team5}
                  </span>
                ) : (
                  <span className="text-danger textProfit mt-2">
                    {this.state.stackAmount_team5}
                  </span>
                )}
              </span>
            </p>

            <p className="box-w4">
              <span className="float-left book">
                {this.state.profit16 && this.state.profit16 > 0 ? (
                  <span className="text-success textProfit flot-left">
                    {parseFloat(this.state.profit16)}
                  </span>
                ) : (
                  <span className="text-danger textProfit flot-left">
                    {parseFloat(this.state.profit16)}
                  </span>
                )}
              </span>{" "}
            </p>
          </div>

          <div className="box-w1 bgback col-1">
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
              <span className="odd2 backprice mt-2">
                {this.state.bookmaker_b_back_3}{" "}
              </span>
            </button>
          </div>
          <div className="box-w1 bgback col-1">
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
              <span className="odd2 backprice mt-2">
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
              <span className="odd2 backprice mt-2">
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
              <span className="odd2 layprice mt-2">
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
              <span className="odd2 layprice mt-2">
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
              <span className="odd2 layprice mt-2">
                {this.state.bookmaker_b_lay_3}
              </span>
            </button>
          </div>
        </div>
      );
    }
    if (
      this.state.bookmaker_draw === true &&
      this.state.bookmaker_team3 !== null
    ) {
      returnHtml.push(
        <div
          className={
            this.state.bookmaker_team3_status === "SUSPEND"
              ? "bet-info suspended row"
              : this.state.bookmaker_team3_status === "BALL_RUN"
                ? "bet-info ball_running row"
                : "bet-info row"
          }
        >
          <div className="col-6 table-active fb_642">
            <span>
              <strong>{this.state.bookmaker_team3}</strong>
            </span>

            <p className="box-w4">
              <span className="float-right book" id="book_349">
                {this.state.team_profit17 && this.state.team_profit17 > 0 ? (
                  <span className="text-success textProfit">
                    {this.state.team_profit17}
                  </span>
                ) : (
                  <span className="text-danger textProfit">
                    {this.state.team_profit17}
                  </span>
                )}

                {this.state.stackAmount_team6 &&
                  this.state.stackAmount_team6 > 0 ? (
                  <span className="text-success textProfit">
                    {this.state.stackAmount_team6}
                  </span>
                ) : (
                  <span className="text-danger textProfit">
                    {this.state.stackAmount_team6}
                  </span>
                )}
              </span>
            </p>
            <p className="box-w4">
              <span className="float-left book">
                {this.state.profit17 && this.state.profit17 > 0 ? (
                  <span className="text-success textProfit flot-left">
                    {parseFloat(this.state.profit17)}
                  </span>
                ) : (
                  <span className="text-danger textProfit flot-left">
                    {parseFloat(this.state.profit17)}
                  </span>
                )}
              </span>{" "}
            </p>
          </div>

          <div className="box-w1 bgback col-1">
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
              <span className="odd2 backprice mt-2">
                {this.state.bookmaker_d_back_3}
              </span>
            </button>
          </div>
          <div className="box-w1 bgback col-1">
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
              <span className="odd2 backprice mt-2">
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
              <span className="odd2 backprice mt-2">
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
              <span className="odd2 layprice mt-2">
                {this.state.bookmaker_d_lay_1}
              </span>
            </button>
          </div>
          <div className="box-w1 bglay col-1">
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
              <span className="odd2 layprice mt-2">
                {this.state.bookmaker_d_lay_2}
              </span>
            </button>
          </div>
          <div className="box-w1 bglay col-1">
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
              <span className="odd2 layprice mt-2">
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
      for (let i = 0; i < this.state.getResults.length; i++) {
        let colorClass =
          this.state.getResults[i].color !== undefined
            ? this.state.getResults[i].color
            : "";
        if (this.state.getResults[i].type === "match") {
          html.push(
            <tr style={{ background: colorClass }}>
              <td style={{ textAlign: "left" }} colSpan="2">
                {" "}
                {this.state.getResults[i].team_name}
                {this.state.getResults[i].bet_on === "fancy" &&
                  this.state.getResults[i].no === "no"
                  ? " / " + this.state.getResults[i].lay_size
                  : null}
                {this.state.getResults[i].bet_on === "fancy" &&
                  this.state.getResults[i].no === "yes"
                  ? " / " + this.state.getResults[i].back_size
                  : null}
              </td>
              <td style={{ textAlign: "right" }}>
                {" "}
                {parseFloat(this.state.getResults[i].odds).toFixed(2)}
              </td>
              <td style={{ textAlign: "right" }}>
                {" "}
                {this.state.getResults[i].stake}{" "}
              </td>
            </tr>
          );
        }
      }
      return (
        <div>
          <div id="home">
            <div className="right_tablescrool">
              <table className="table table-bordered1">
                <thead>
                  <tr>
                    <th style={{ textAlign: "left" }} colSpan="2">
                      Nation
                    </th>
                    <th style={{ textAlign: "right" }}>Odds</th>
                    <th style={{ textAlign: "right" }}>Amount</th>
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
    const {
      profit13,
      profit14,
      profit15,
      profit17,
      profit12,
      profit16,
    } = this.state;
    let { name, value } = event.target;
    if (this.state.betClick === true) {
      let getAmount = event.target.value;
      if (this.state.type === "back") {
        let profit = ((parseFloat(this.state.oddVal) - 1) * getAmount).toFixed(
          0
        );
        let loss = parseInt(getAmount);
        if (this.state.betMatchType === "teamone") {
          this.setState({
            team_profit1: parseInt(profit) + parseInt(profit12),
            profit_team: "teamone",
            loss_team: "teamtwo",
            bet_team: "teamone",
          });
        }
        if (this.state.betMatchType === "teamtwo") {
          this.setState({
            team_profit2: parseInt(profit) + parseInt(profit13),
            profit_team: "teamtwo",
            loss_team: "teamone",
            bet_team: "teamtwo",
          });
        }
        if (this.state.betMatchType === "draw") {
          this.setState({
            team_profit3: parseInt(profit) + parseInt(profit14),
            profit_team: "draw",
            loss_team: "teamone,teamtwo",
            bet_team: "draw",
          });
        }
        if (this.state.betMatchType === "teamone") {
          this.setState({
            stackAmount_team2: parseInt(profit13) - parseInt(getAmount),
          });
          this.setState({
            stackAmount_team3: parseInt(profit14) - parseInt(getAmount),
          });
        }
        if (this.state.betMatchType === "teamtwo") {
          this.setState({
            stackAmount_team1: parseInt(profit12) - parseInt(getAmount),
          });
          this.setState({
            stackAmount_team3: parseInt(profit14) - parseInt(getAmount),
          });
        }

        if (this.state.betMatchType === "draw") {
          this.setState({
            stackAmount_team1: parseInt(profit12) - parseInt(getAmount),
          });
          this.setState({
            stackAmount_team2: parseInt(profit13) - parseInt(getAmount),
          });
        }
        this.setState({
          [name]: value,
          profit: profit,
          loss: loss,
          emptyField: false,
          errMsg: "",
        });
      } else if (this.state.type === "lay") {
        let profit = parseFloat(getAmount);
        let loss = ((parseFloat(this.state.oddVal) - 1) * getAmount).toFixed(0);
        let stackCustom = (
          (parseFloat(this.state.oddVal) - 1) *
          getAmount
        ).toFixed(0);
        if (this.state.betMatchType === "teamone") {
          this.setState({
            team_profit1: parseInt(profit12) - parseInt(stackCustom),
            profit_team: "teamtwo",
            loss_team: "teamone",
            bet_team: "teamone",
          });
        } else if (this.state.betMatchType === "teamtwo") {
          this.setState({
            team_profit2: parseInt(profit13) - parseInt(stackCustom),
            profit_team: "teamone",
            loss_team: "teamtwo",
            bet_team: "teamtwo",
          });
        }

        if (this.state.betMatchType === "draw") {
          this.setState({
            team_profit3: parseInt(profit14) - parseInt(stackCustom),
            profit_team: "teamone,teamtwo",
            loss_team: "draw",
            bet_team: "draw",
          });
        }

        if (this.state.betMatchType === "teamone") {
          this.setState({
            stackAmount_team2: parseInt(profit13) + parseInt(profit),
          });
          this.setState({
            stackAmount_team3: parseInt(profit14) + parseInt(profit),
          });
        } else if (this.state.betMatchType === "teamtwo") {
          this.setState({
            stackAmount_team1: parseInt(profit12) + parseInt(profit),
          });
          this.setState({
            stackAmount_team3: parseInt(profit14) + parseInt(profit),
          });
        }
        if (this.state.betMatchType === "draw") {
          this.setState({
            stackAmount_team1: parseInt(profit12) + parseInt(profit),
          });
          this.setState({
            stackAmount_team2: parseInt(profit13) + parseInt(profit),
          });
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
    if (this.state.betClick2 == true) {
      if (this.state.type === "back") {
        let profit = (
          (parseFloat(this.state.oddVal) / 100) *
          parseFloat(event.target.value)
        ).toFixed(0);
        let loss = parseInt(event.target.value);
        if (this.state.betMatchType === "teamone") {
          this.setState({
            team_profit4: parseInt(profit) + parseInt(profit15),
            profit_team: "teamone",
            loss_team: "teamtwo",
            bet_team: "teamone",
          });
        }
        if (this.state.betMatchType === "teamtwo") {
          this.setState({
            team_profit5: parseInt(profit) + parseInt(profit16),
            profit_team: "teamtwo",
            loss_team: "teamone",
            bet_team: "teamtwo",
          });
        }
        if (this.state.betMatchType === "draw") {
          this.setState({
            team_profit6: parseInt(profit) + parseInt(profit17),
            profit_team: "the draw",
            loss_team: "teamone,teamtwo",
            bet_team: "draw",
          });
        }

        if (this.state.betMatchType === "teamone") {
          this.setState({
            stackAmount_team5:
              parseInt(profit16) - parseInt(event.target.value),
          });
          this.setState({
            stackAmount_team6:
              parseInt(profit17) - parseInt(event.target.value),
          });
        }
        if (this.state.betMatchType === "teamtwo") {
          this.setState({
            stackAmount_team4:
              parseInt(profit15) - parseInt(event.target.value),
          });
          this.setState({
            stackAmount_team6:
              parseInt(profit17) - parseInt(event.target.value),
          });
        }

        if (this.state.betMatchType === "draw") {
          this.setState({
            stackAmount_team4:
              parseInt(profit15) - parseInt(event.target.value),
          });
          this.setState({
            stackAmount_team5:
              parseInt(profit16) - parseInt(event.target.value),
          });
        }

        this.setState({
          [name]: value,
          profit: profit,
          loss: loss,
          emptyField: false,
          errMsg: "",
        });
      } else if (this.state.type === "lay") {
        let profit = parseInt(event.target.value);
        let stackCustom = (this.state.oddVal / 100) * event.target.value;
        let loss = (
          (parseFloat(this.state.oddVal) / 100) *
          event.target.value
        ).toFixed(0);

        if (this.state.betMatchType === "teamone") {
          this.setState({
            team_profit4: parseInt(profit15) - parseInt(stackCustom),
            profit_team: "teamtwo",
            loss_team: "teamone",
            bet_team: "teamone",
          });
        } else if (this.state.betMatchType === "teamtwo") {
          this.setState({
            team_profit5: parseInt(profit16) - parseInt(stackCustom),
            profit_team: "teamone",
            loss_team: "teamtwo",
            bet_team: "teamtwo",
          });
        }
        if (this.state.betMatchType === "draw") {
          this.setState({
            team_profit6: parseInt(profit17) - parseInt(stackCustom),
            profit_team: "teamone,teamtwo",
            loss_team: "draw",
            bet_team: "draw",
          });
        }
        if (this.state.betMatchType === "teamone") {
          this.setState({
            stackAmount_team5: parseInt(profit16) + parseInt(profit),
          });
          this.setState({
            stackAmount_team6: parseInt(profit17) + parseInt(profit),
          });
        } else if (this.state.betMatchType === "teamtwo") {
          this.setState({
            stackAmount_team4: parseInt(profit15) + parseInt(profit),
          });
          this.setState({
            stackAmount_team6: parseInt(profit17) + parseInt(profit),
          });
        }

        if (this.state.betMatchType === "draw") {
          this.setState({
            stackAmount_team4: parseInt(profit15) + parseInt(profit),
          });
          this.setState({
            stackAmount_team5: parseInt(profit16) + parseInt(profit),
          });
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
    const { no, layPrice, laySize, backPrice, backSize } = this.state;
    if (no === "no") {
      this.setState({ profit: event.target.value });
    }
    if (no === "yes") {
      let profit = parseInt(event.target.value) * (parseFloat(backSize) / 100);
      this.setState({ profit: profit });
    }
  };
  handleChange_session_input = (event) => {
    this.setState({ session_input: event.target.value });
    const { no, layPrice, laySize, backPrice, backSize } = this.state;
    if (no === "no") {
      this.setState({ profit: event.target.value });
    }
    if (no === "yes") {
      let profit = parseInt(event.target.value) * (parseFloat(backSize) / 100);
      this.setState({ profit: profit });
    }
  };

  handleButtonsClick = (getAmount) => {
    const {
      profit12,
      profit13,
      profit14,
      profit15,
      profit16,
      profit17,
    } = this.state;
    if (this.state.betClick === true) {
      if (this.state.type === "back") {
        let profit = ((parseFloat(this.state.oddVal) - 1) * getAmount).toFixed(
          0
        );
        let loss = parseInt(getAmount);
        if (this.state.betMatchType === "teamone") {
          this.setState({
            team_profit1: parseInt(profit) + parseInt(profit12),
            profit_team: "teamone",
            loss_team: "teamtwo",
            bet_team: "teamone",
          });
        }
        if (this.state.betMatchType === "teamtwo") {
          this.setState({
            team_profit2: parseInt(profit) + parseInt(profit13),
            profit_team: "teamtwo",
            loss_team: "teamone",
            bet_team: "teamtwo",
          });
        }
        if (this.state.betMatchType === "draw") {
          this.setState({
            team_profit3: parseInt(profit) + parseInt(profit14),
            profit_team: "draw",
            loss_team: "teamone,teamtwo",
            bet_team: "draw",
          });
        }

        if (this.state.betMatchType === "teamone") {
          this.setState({
            stackAmount_team2: parseInt(profit13) - parseInt(getAmount),
          });
          this.setState({
            stackAmount_team3: parseInt(profit14) - parseInt(getAmount),
          });
        }
        if (this.state.betMatchType === "teamtwo") {
          this.setState({
            stackAmount_team1: parseInt(profit12) - parseInt(getAmount),
          });
          this.setState({
            stackAmount_team3: parseInt(profit14) - parseInt(getAmount),
          });
        }

        if (this.state.betMatchType === "draw") {
          this.setState({
            stackAmount_team1: parseInt(profit12) - parseInt(getAmount),
          });
          this.setState({
            stackAmount_team2: parseInt(profit13) - parseInt(getAmount),
          });
        }
        this.setState({ stake_amount: getAmount, profit: profit, loss: loss });
      } else if (this.state.type === "lay") {
        let profit = parseInt(getAmount);
        let loss = ((parseFloat(this.state.oddVal) - 1) * getAmount).toFixed(0);
        let stackCustom = (
          (parseFloat(this.state.oddVal) - 1) *
          getAmount
        ).toFixed(0);
        if (this.state.betMatchType === "teamone") {
          this.setState({
            team_profit1: parseInt(profit12) - parseInt(stackCustom),
            profit_team: "teamtwo",
            loss_team: "teamone",
            bet_team: "teamone",
          });
        } else if (this.state.betMatchType === "teamtwo") {
          this.setState({
            team_profit2: parseInt(profit13) - parseInt(stackCustom),
            profit_team: "teamone",
            loss_team: "teamtwo",
            bet_team: "teamtwo",
          });
        }

        if (this.state.betMatchType === "draw") {
          this.setState({
            team_profit3: parseInt(profit14) - parseInt(stackCustom),
            profit_team: "teamone,teamtwo",
            loss_team: "draw",
            bet_team: "draw",
          });
        }

        if (this.state.betMatchType === "teamone") {
          this.setState({
            stackAmount_team2: parseInt(profit13) + parseInt(profit),
          });
          this.setState({
            stackAmount_team3: parseInt(profit14) + parseInt(profit),
          });
        } else if (this.state.betMatchType === "teamtwo") {
          this.setState({
            stackAmount_team1: parseInt(profit12) + parseInt(profit),
          });
          this.setState({
            stackAmount_team3: parseInt(profit14) + parseInt(profit),
          });
        }

        if (this.state.betMatchType === "draw") {
          this.setState({
            stackAmount_team1: parseInt(profit12) + parseInt(profit),
          });
          this.setState({
            stackAmount_team2: parseInt(profit13) + parseInt(profit),
          });
        }

        this.setState({ stake_amount: getAmount, profit: profit, loss: loss });
      }
    }
    if (this.state.betClick2 === true) {
      var profit = "";
      if (this.state.type === "back") {
        profit = ((parseFloat(this.state.oddVal) / 100) * getAmount).toFixed(0);
        let loss = parseInt(getAmount);
        if (this.state.betMatchType === "teamone") {
          this.setState({
            team_profit4: parseInt(profit) + parseInt(profit15),
            profit_team: "teamone",
            loss_team: "teamtwo",
            bet_team: "teamone",
          });
        }

        if (this.state.betMatchType === "teamtwo") {
          this.setState({
            team_profit5: parseInt(profit) + parseInt(profit16),
            profit_team: "teamtwo",
            loss_team: "teamone",
            bet_team: "teamtwo",
          });
        }
        if (this.state.betMatchType === "draw") {
          this.setState({
            team_profit6: parseInt(profit) + parseInt(profit17),
            profit_team: "drow",
            loss_team: "teamone,teamtwo",
            bet_team: "draw",
          });
        }

        if (this.state.betMatchType === "teamone") {
          this.setState({
            stackAmount_team5: parseInt(profit16) - parseInt(getAmount),
          });
          this.setState({
            stackAmount_team6: parseInt(profit17) - parseInt(getAmount),
          });
        }
        if (this.state.betMatchType === "teamtwo") {
          this.setState({
            stackAmount_team4: parseInt(profit15) - parseInt(getAmount),
          });
          this.setState({
            stackAmount_team6: parseInt(profit17) - parseInt(getAmount),
          });
        }

        if (this.state.betMatchType === "draw") {
          this.setState({
            stackAmount_team4: parseInt(profit15) - parseInt(getAmount),
          });
          this.setState({
            stackAmount_team5: parseInt(profit16) - parseInt(getAmount),
          });
        }
        this.setState({ stake_amount: getAmount, profit: profit, loss: loss });
      } else if (this.state.type === "lay") {
        profit = parseInt(getAmount);
        let stackCustom = (this.state.oddVal / 100) * getAmount;
        let loss = ((parseFloat(this.state.oddVal) / 100) * getAmount).toFixed(
          0
        );
        if (this.state.betMatchType === "teamone") {
          this.setState({
            team_profit4: parseInt(profit15) - parseInt(stackCustom),
            profit_team: "teamtwo",
            loss_team: "teamone",
            bet_team: "teamone",
          });
        } else if (this.state.betMatchType === "teamtwo") {
          this.setState({
            team_profit5: parseInt(profit16) - parseInt(stackCustom),
            profit_team: "teamone",
            loss_team: "teamtwo",
            bet_team: "teamtwo",
          });
        }
        if (this.state.betMatchType === "draw") {
          this.setState({
            team_profit6: parseInt(profit17) - parseInt(stackCustom),
            profit_team: "teamone,teamtwo",
            loss_team: "draw",
            bet_team: "draw",
          });
        }
        if (this.state.betMatchType === "teamone") {
          this.setState({
            stackAmount_team5: parseInt(profit16) + parseInt(profit),
          });
          this.setState({
            stackAmount_team6: parseInt(profit17) + parseInt(profit),
          });
        } else if (this.state.betMatchType === "teamtwo") {
          this.setState({
            stackAmount_team4: parseInt(profit15) + parseInt(profit),
          });
          this.setState({
            stackAmount_team6: parseInt(profit17) + parseInt(profit),
          });
        }

        if (this.state.betMatchType === "draw") {
          this.setState({
            stackAmount_team4: parseInt(profit15) + parseInt(profit),
          });
          this.setState({
            stackAmount_team5: parseInt(profit16) + parseInt(profit),
          });
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
      isShowBidClickHtml: true,
      emptyField: false,
      errMsg: "",
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
      emptyField: false,
      errMsg: "",
      team_profit4: "",
      team_profit5: "",
      stackAmount_team4: "",
      stackAmount_team5: "",
      stackAmount_team6: "",
      team_profit6: "",
      isShowBidClickHtml: true,
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
      isShowBidClickHtml: true,
      emptyField: false,
      errMsg: "",
    });
  };
  handleBidCrossClick = () => {
    this.setState({
      isShowBidClickHtml: false,
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

      emptyField: false,
      errMsg: "",
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

      if (this.state.buttonValue111 && this.state.buttonValue111 !== null) {
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
      }

      return (
        <div className="hide-box-click22">
          <div
            className="table-responsive"
            style={{
              paddingBottom: "4px",
              display: "block",
              background: this.state.color,
            }}
          >
            <div
              style={{ height: "40px" }}
              className="bg d-flex flex-row justify-content-between w-100 pt-2"
            >
              <span className="text-white texttitle h-100 d-inline-block pt-2 px-2">
                Placebet
              </span>

              <span className="text-right px-2">
                <i
                  class="fa fa-times text-white"
                  aria-hidden="true"
                  onClick={() => this.handleBidCrossClick()}
                  style={{ cursor: "pointer" }}
                />
              </span>
            </div>
            <form onSubmit={this.handleSubmit} method="post" id="frm_placebet">
              <Row className="mt-2 px-2">
                <Col>
                  <i
                    className="fa fa-times text-danger ml-3"
                    onClick={this.handleBidCrossClick}
                  ></i>{" "}
                  <small>
                    <b>{this.state.teamName}</b>
                  </small>
                </Col>
                <Col></Col>
                <Col>
                  {" "}
                  <input value={this.state.type} name="type" type="hidden" />
                  <input
                    value={this.state.oddVal}
                    name="oddVal"
                    className="amountint"
                    onChange={this.handleChange}
                    type="number"
                    required="required"
                    maxLength="4"
                    style={{
                      width: "100%",
                      verticalAlign: "middle",
                    }}
                    id="odds"
                    step="0.01"
                  />
                </Col>
              </Row>
              <Row className="px-3 mt-2">
                <Col>
                  <div className="form-group bet-stake">
                    <input
                      id="btn_val"
                      ref={this.emailInput}
                      style={{ width: "100%" }}
                      maxLength="10"
                      value={this.state.stake_amount}
                      name="stake_amount"
                      type="number"
                      onChange={this.handleChange}
                      required="required"
                    />
                  </div>
                </Col>
                <Col>
                  <button
                    className="btn btn-sm bg text-white"
                    type="submit"
                    id="submit_btn"
                    style={{ width: "100%" }}
                  >
                    Submit
                  </button>
                </Col>
                <Col>
                  <div className="text-center pt-1">{this.state.profit}</div>
                </Col>
              </Row>
              <Row className="px-3 mt-2">
                <Col>
                  <div>
                    <a
                      href="javascript:void(0);"
                      className="valueBtn btn text-center"
                      value={value_1}
                      onClick={this.handleButtonsClick.bind(this, value_1)}
                    >
                      {button_1}
                    </a>
                  </div>
                </Col>

                <Col>
                  <div>
                    <a
                      href="javascript:void(0);"
                      className="valueBtn btn text-center"
                      value={value_2}
                      onClick={this.handleButtonsClick.bind(this, value_2)}
                    >
                      {button_2}
                    </a>
                  </div>
                </Col>
                <Col>
                  <div>
                    <a
                      href="javascript:void(0);"
                      className="valueBtn btn text-center"
                      value={value_3}
                      onClick={this.handleButtonsClick.bind(this, value_3)}
                    >
                      {button_3}
                    </a>
                  </div>
                </Col>
              </Row>
              <Row className="px-3 mt-2">
                <Col>
                  <div>
                    <a
                      href="javascript:void(0);"
                      className="valueBtn btn text-center"
                      value={value_4}
                      onClick={this.handleButtonsClick.bind(this, value_4)}
                    >
                      {button_4}
                    </a>
                  </div>
                </Col>

                <Col>
                  <div>
                    <a
                      href="javascript:void(0);"
                      className="valueBtn btn text-center"
                      value={value_5}
                      onClick={this.handleButtonsClick.bind(this, value_5)}
                    >
                      {button_5}
                    </a>
                  </div>
                </Col>
                <Col>
                  <div>
                    <a
                      href="javascript:void(0);"
                      className="valueBtn btn text-center"
                      value={value_6}
                      onClick={this.handleButtonsClick.bind(this, value_6)}
                    >
                      {button_6}
                    </a>
                  </div>
                </Col>
              </Row>
              <Row className="px-3 mt-2">
                <Col>
                  <div>
                    <a
                      href="javascript:void(0);"
                      className="valueBtn btn text-center"
                      value={value_7}
                      onClick={this.handleButtonsClick.bind(this, value_7)}
                    >
                      {button_7}
                    </a>
                  </div>
                </Col>

                <Col>
                  <div>
                    <a
                      href="javascript:void(0);"
                      className="valueBtn btn text-center"
                      value={value_8}
                      onClick={this.handleButtonsClick.bind(this, value_8)}
                    >
                      {button_8}
                    </a>
                  </div>
                </Col>
                <Col>
                  <div>
                    <a
                      href="javascript:void(0);"
                      className="valueBtn btn text-center"
                      value={value_9}
                      onClick={this.handleButtonsClick.bind(this, value_9)}
                    >
                      {button_9}
                    </a>
                  </div>
                </Col>
              </Row>
              <Row className="px-3 mt-2">
                <Col className="font-weight-normal" xs={6}>
                  {this.state.firstTeamName}
                </Col>
                <Col className="text-center" xs={3}>
                  {this.state.profit12 && this.state.profit12 > 0 ? (
                    <strong className="text-success mt-2">
                      {parseFloat(this.state.profit12)}
                    </strong>
                  ) : (
                    <strong className="text-danger mt-2">
                      {parseFloat(this.state.profit12)}
                    </strong>
                  )}
                </Col>

                <Col className="text-right" xs={3}>
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
                  {this.state.team_profit1 && this.state.team_profit1 > 0 ? (
                    <strong className="text-success text-right">
                      {this.state.team_profit1}
                    </strong>
                  ) : (
                    <strong className="text-danger text-right">
                      {this.state.team_profit1}
                    </strong>
                  )}
                </Col>
              </Row>
              <Row className="px-3 mt-2">
                <Col className="font-weight-normal" xs={6}>
                  {this.state.secondTeamName}
                </Col>
                <Col className="text-center" xs={3}>
                  {this.state.profit13 && this.state.profit13 > 0 ? (
                    <strong className="text-success mt-2">
                      {parseFloat(this.state.profit13)}
                    </strong>
                  ) : (
                    <strong className="text-danger mt-2">
                      {parseFloat(this.state.profit13)}
                    </strong>
                  )}
                </Col>
                <Col className="text-right" xs={3}>
                  {this.state.team_profit2 && this.state.team_profit2 > 0 ? (
                    <strong className="text-success text-right">
                      {this.state.team_profit2}
                    </strong>
                  ) : (
                    <strong className="text-danger text-right">
                      {this.state.team_profit2}
                    </strong>
                  )}
                  {this.state.stackAmount_team2 &&
                    this.state.stackAmount_team2 > 0 ? (
                    <strong className="text-success ">
                      {this.state.stackAmount_team2}
                    </strong>
                  ) : (
                    <strong className="text-danger">
                      {this.state.stackAmount_team2}
                    </strong>
                  )}
                </Col>
              </Row>
              {this.state.draw === true && this.state.drawTeamName !== null ? (
                <Row className="px-3 mt-2">
                  <Col className="font-weight-normal" xs={6}>
                    {this.state.drawTeamName}
                  </Col>
                  <Col className="text-center" xs={3}>
                    {this.state.profit12 && this.state.profit14 > 0 ? (
                      <strong className="text-success mt-2">
                        {parseFloat(this.state.profit14)}
                      </strong>
                    ) : (
                      <strong className="text-danger mt-2">
                        {parseFloat(this.state.profit14)}
                      </strong>
                    )}
                  </Col>

                  <Col className="text-right" xs={3}>
                    {this.state.stackAmount_team3 &&
                      this.state.stackAmount_team3 > 0 ? (
                      <strong className="text-success">
                        {this.state.stackAmount_team3}
                      </strong>
                    ) : (
                      <strong className="text-danger">
                        {this.state.stackAmount_team3}
                      </strong>
                    )}
                    {this.state.team_profit3 && this.state.team_profit3 > 0 ? (
                      <strong className="text-success text-right">
                        {this.state.team_profit3}
                      </strong>
                    ) : (
                      <strong className="text-danger text-right">
                        {this.state.team_profit3}
                      </strong>
                    )}
                  </Col>
                </Row>
              ) : null}
              <Row className="px-3 mt-3">
                <Col>
                  {this.responseHtml()}
                  {this.emptyHtml()}
                </Col>
              </Row>
            </form>
          </div>
        </div>
      );
    }
    if (this.state.betClick2 === true) {
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

      if (this.state.buttonValue111 && this.state.buttonValue111 !== null) {
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
          <form onSubmit={this.handleSubmit} method="post" id="frm_placebet">
            <Row className="mt-2 px-2">
              <Col>
                <i
                  className="fa fa-times text-danger ml-3"
                  onClick={this.handleBidCrossClick}
                ></i>{" "}
                <small>
                  <b>{this.state.teamName}Book</b>
                </small>
              </Col>
              <Col>{""}</Col>
              <Col>
                <input value={this.state.type} name="type" type="hidden" />
                <input
                  value={this.state.oddVal}
                  name="oddVal"
                  className="amountint"
                  onChange={this.handleChange}
                  type="number"
                  required="required"
                  maxLength="4"
                  style={{
                    width: "100%",
                    verticalAlign: "middle",
                  }}
                  id="odds"
                  step="0.01"
                />
              </Col>
            </Row>
            <Row className="px-3 mt-2">
              <Col>
                <div className="form-group bet-stake">
                  <input
                    id="btn_val"
                    ref={this.emailInput}
                    style={{ width: "100%" }}
                    maxLength="10"
                    value={this.state.stake_amount}
                    name="stake_amount"
                    type="number"
                    onChange={this.handleChange}
                    required="required"
                  />
                </div>
              </Col>
              <Col>
                <button
                  className="btn btn-sm bg text-white"
                  type="submit"
                  id="submit_btn"
                  style={{ width: "100%" }}
                >
                  Submit
                </button>
              </Col>
              <Col>
                <div className="text-center pt-1">{this.state.profit}</div>
              </Col>
            </Row>
            <Row className="px-3 mt-2">
              <Col>
                <div>
                  <a
                    href="javascript:void(0);"
                    className="valueBtn btn text-center"
                    value={value_1}
                    onClick={this.handleButtonsClick.bind(this, value_1)}
                  >
                    {button_1}
                  </a>
                </div>
              </Col>

              <Col>
                <div>
                  <a
                    href="javascript:void(0);"
                    className="valueBtn btn text-center"
                    value={value_2}
                    onClick={this.handleButtonsClick.bind(this, value_2)}
                  >
                    {button_2}
                  </a>
                </div>
              </Col>
              <Col>
                <div>
                  <a
                    href="javascript:void(0);"
                    className="valueBtn btn text-center"
                    value={value_3}
                    onClick={this.handleButtonsClick.bind(this, value_3)}
                  >
                    {button_3}
                  </a>
                </div>
              </Col>
            </Row>
            <Row className="px-3 mt-2">
              <Col>
                <div>
                  <a
                    href="javascript:void(0);"
                    className="valueBtn btn text-center"
                    value={value_4}
                    onClick={this.handleButtonsClick.bind(this, value_4)}
                  >
                    {button_4}
                  </a>
                </div>
              </Col>

              <Col>
                <div>
                  <a
                    href="javascript:void(0);"
                    className="valueBtn btn text-center"
                    value={value_5}
                    onClick={this.handleButtonsClick.bind(this, value_5)}
                  >
                    {button_5}
                  </a>
                </div>
              </Col>
              <Col>
                <div>
                  <a
                    href="javascript:void(0);"
                    className="valueBtn btn text-center"
                    value={value_6}
                    onClick={this.handleButtonsClick.bind(this, value_6)}
                  >
                    {button_6}
                  </a>
                </div>
              </Col>
            </Row>
            <Row className="px-3 mt-2">
              <Col>
                <div>
                  <a
                    href="javascript:void(0);"
                    className="valueBtn btn text-center"
                    value={value_7}
                    onClick={this.handleButtonsClick.bind(this, value_7)}
                  >
                    {button_7}
                  </a>
                </div>
              </Col>

              <Col>
                <div>
                  <a
                    href="javascript:void(0);"
                    className="valueBtn btn text-center"
                    value={value_8}
                    onClick={this.handleButtonsClick.bind(this, value_8)}
                  >
                    {button_8}
                  </a>
                </div>
              </Col>
              <Col>
                <div>
                  <a
                    href="javascript:void(0);"
                    className="valueBtn btn text-center"
                    value={value_9}
                    onClick={this.handleButtonsClick.bind(this, value_9)}
                  >
                    {button_9}
                  </a>
                </div>
              </Col>
            </Row>
            <Row className="px-3 mt-2">
              <Col className="font-weight-normal" xs={6}>
                {this.state.bookmaker_team1}
              </Col>
              <Col className="text-center" xs={3}>
                {this.state.profit15 && this.state.profit15 > 0 ? (
                  <strong className="text-success mt-2">
                    {parseFloat(this.state.profit15)}
                  </strong>
                ) : (
                  <strong className="text-danger mt-2">
                    {parseFloat(this.state.profit15)}
                  </strong>
                )}
              </Col>

              <Col className="text-right" xs={3}>
                {this.state.stackAmount_team4 &&
                  this.state.stackAmount_team4 > 0 ? (
                  <strong className="text-success">
                    {this.state.stackAmount_team4}
                  </strong>
                ) : (
                  <strong className="text-danger">
                    {this.state.stackAmount_team4}
                  </strong>
                )}
                {this.state.team_profit4 && this.state.team_profit4 > 0 ? (
                  <strong className="text-success text-right">
                    {this.state.team_profit4}
                  </strong>
                ) : (
                  <strong className="text-danger text-right">
                    {this.state.team_profit4}
                  </strong>
                )}
              </Col>
            </Row>
            <Row className="px-3 mt-2">
              <Col className="font-weight-normal" xs={6}>
                {this.state.bookmaker_team2}
              </Col>
              <Col className="text-center" xs={3}>
                {this.state.profit16 && this.state.profit16 > 0 ? (
                  <strong className="text-success mt-2">
                    {parseFloat(this.state.profit16)}
                  </strong>
                ) : (
                  <strong className="text-danger mt-2">
                    {parseFloat(this.state.profit16)}
                  </strong>
                )}
              </Col>
              <Col className="text-right" xs={3}>
                {this.state.team_profit5 && this.state.team_profit5 > 0 ? (
                  <strong className="text-success text-right">
                    {this.state.team_profit5}
                  </strong>
                ) : (
                  <strong className="text-danger text-right">
                    {this.state.team_profit5}
                  </strong>
                )}
                {this.state.stackAmount_team5 &&
                  this.state.stackAmount_team5 > 0 ? (
                  <strong className="text-success ">
                    {this.state.stackAmount_team5}
                  </strong>
                ) : (
                  <strong className="text-danger">
                    {this.state.stackAmount_team5}
                  </strong>
                )}
              </Col>
            </Row>
            {this.state.bookmaker_draw === true &&
              this.state.bookmaker_team3 !== null ? (
              <Row className="px-3 mt-2">
                <Col className="font-weight-normal" xs={6}>
                  {this.state.bookmaker_team3}
                </Col>
                <Col className="text-center" xs={3}>
                  {this.state.profit17 && this.state.profit17 > 0 ? (
                    <strong className="text-success mt-2">
                      {parseFloat(this.state.profit17)}
                    </strong>
                  ) : (
                    <strong className="text-danger mt-2">
                      {parseFloat(this.state.profit17)}
                    </strong>
                  )}
                </Col>

                <Col className="text-right" xs={3}>
                  {this.state.stackAmount_team6 &&
                    this.state.stackAmount_team6 > 0 ? (
                    <strong className="text-success">
                      {this.state.stackAmount_team6}
                    </strong>
                  ) : (
                    <strong className="text-danger">
                      {this.state.stackAmount_team6}
                    </strong>
                  )}
                  {this.state.team_profit6 && this.state.team_profit6 > 0 ? (
                    <strong className="text-success text-right">
                      {this.state.team_profit6}
                    </strong>
                  ) : (
                    <strong className="text-danger text-right">
                      {this.state.team_profit6}
                    </strong>
                  )}
                </Col>
              </Row>
            ) : null}
            <Row className="px-3 mt-3">
              <Col>
                {this.responseHtml()}
                {this.emptyHtml()}
              </Col>
            </Row>
          </form>
        </div>
      );
    }
  };

  showBidClickSessionHtml = () => {
    if (this.state.betClick1 === true) {
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

      if (this.state.buttonValue111 && this.state.buttonValue111 !== null) {
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
      }

      $("#stake_amount").focus();
      return (
        <div className="hide-box-click22">
          <div
            className="table-responsive hide-box-click  hide-box-click22"
            style={{
              paddingBottom: "4px",
              display: "block",
              background: this.state.color,
              height: "fit-content",
            }}
          >
            <div
              style={{ height: "40px" }}
              className="bg d-flex flex-row justify-content-between w-100 pt-2"
            >
              <span className="text-white texttitle h-100 d-inline-block pt-2 px-2">
                Placebet
              </span>

              <span className="text-right px-2">
                <i
                  class="fa fa-times text-white"
                  aria-hidden="true"
                  onClick={() => this.handleBidCrossClick()}
                  style={{ cursor: "pointer" }}
                />
              </span>
            </div>
            <form
              onSubmit={this.handleSubmitSession}
              method="post"
              id="frm_placebet"
            >
              <Row className="mt-2 px-2">
                <Col>
                  <i
                    className="fa fa-times text-danger ml-3"
                    onClick={this.handleBidCrossClick}
                  ></i>{" "}
                  <small>
                    <b>{this.state.headname}</b>
                  </small>
                </Col>
                <Col>
                  <input value={this.state.no} name="no" type="hidden" />
                  <input value={this.state.yes} name="yes" type="hidden" />
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
                      width: "100%",
                      verticalAlign: "middle",
                    }}
                    id="odds"
                    step="0.01"
                  />
                </Col>
                <Col className="text-right"></Col>
              </Row>
              <Row className="px-3 mt-2">
                <Col>
                  <div className="form-group bet-stake">
                    <input
                      id="stake_amount"
                      style={{ width: "100%" }}
                      maxLength="10"
                      value={this.state.stake_amount}
                      name="stake_amount"
                      type="text"
                      onChange={this.handleChangeStakeamount}
                      required="required"
                    />
                  </div>
                </Col>
                <Col>
                  <button
                    className="btn btn-sm bg text-white"
                    type="submit"
                    id="submit_btn"
                    style={{ width: "100%" }}
                  >
                    Submit
                    {this.state.betLoder ? (
                      <i
                        className="fa fa-spinner fa-spin fa-fw text-white"
                        aria-hidden="true"
                      ></i>
                    ) : null}
                  </button>
                </Col>
                <Col className="text-right pt-2">
                  <div>{this.state.profit}</div>
                </Col>
              </Row>
              <Row className="px-3 mt-2">
                <Col>
                  <div>
                    <a
                      href="#"
                      className="valueBtn btn text-center"
                      value={value_1}
                      onClick={this.handleButtonsNewClick.bind(this, value_1)}
                    >
                      {button_1}
                    </a>
                  </div>
                </Col>

                <Col>
                  <div>
                    <a
                      href="#"
                      className="valueBtn btn text-center"
                      value={value_2}
                      onClick={this.handleButtonsNewClick.bind(this, value_2)}
                    >
                      {button_2}
                    </a>
                  </div>
                </Col>
                <Col>
                  <div>
                    <a
                      href="#"
                      className="valueBtn btn text-center"
                      value={value_3}
                      onClick={this.handleButtonsNewClick.bind(this, value_3)}
                    >
                      {button_3}
                    </a>
                  </div>
                </Col>
              </Row>
              <Row className="px-3 mt-2">
                <Col>
                  <div>
                    <a
                      href="#"
                      className="valueBtn btn text-center"
                      value={value_4}
                      onClick={this.handleButtonsNewClick.bind(this, value_4)}
                    >
                      {button_4}
                    </a>
                  </div>
                </Col>

                <Col>
                  <div>
                    <a
                      href="#"
                      className="valueBtn btn text-center"
                      value={value_5}
                      onClick={this.handleButtonsNewClick.bind(this, value_5)}
                    >
                      {button_5}
                    </a>
                  </div>
                </Col>
                <Col>
                  <div>
                    <a
                      href="#"
                      className="valueBtn btn text-center"
                      value={value_6}
                      onClick={this.handleButtonsNewClick.bind(this, value_6)}
                    >
                      {button_6}
                    </a>
                  </div>
                </Col>
              </Row>
              <Row className="px-3 mt-2">
                <Col>
                  <div>
                    <a
                      href="#"
                      className="valueBtn btn text-center"
                      value={value_7}
                      onClick={this.handleButtonsNewClick.bind(this, value_7)}
                    >
                      {button_7}
                    </a>
                  </div>
                </Col>

                <Col>
                  <div>
                    <a
                      href="#"
                      className="valueBtn btn text-center"
                      value={value_8}
                      onClick={this.handleButtonsNewClick.bind(this, value_8)}
                    >
                      {button_8}
                    </a>
                  </div>
                </Col>
                <Col>
                  <div>
                    <a
                      href="#"
                      className="valueBtn btn text-center"
                      value={value_9}
                      onClick={this.handleButtonsNewClick.bind(this, value_9)}
                    >
                      {button_9}
                    </a>
                  </div>
                </Col>
              </Row>
              <Row className="px-3 mt-3">
                <Col>
                  {this.responseHtml()}
                  {this.emptyHtml()}
                </Col>
              </Row>
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
    const { openTv, CardData, openCard, fancyMin, fancyMax } = this.state;
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
              <tr className="w-100">
                <td className="table-active w-70">
                  <div className="d-flex flex-row justify-content-between">
                    <div>
                      {this.state.sessiondata[i].RunnerName}

                      <span
                        className="text-success ml-2"
                        onClick={this.handleModelShow.bind(
                          this,
                          this.state.sessiondata[i].RunnerName,
                          this.state.sessiondata[i].LayPrice1,
                          this.state.sessiondata[i].BackPrice1
                        )}
                      >
                        Book
                      </span>
                    </div>
                    <div>
                      <i
                        className="fa fa-info-circle float-right text-mahrun mt-1"
                        onClick={() =>
                          this.setState(
                            {
                              openCard: !openCard,
                              SelectionId: this.state.sessiondata[i]
                                .SelectionId,
                            },
                            () =>
                              setTimeout(() => {
                                this.setState({
                                  openCard: !openCard,
                                  SelectionId: "",
                                });
                              }, 5000)
                          )
                        }
                      />

                      <Collapse
                        in={
                          openCard &&
                          this.state.sessiondata[i].SelectionId ===
                          this.state.SelectionId
                        }
                      >
                        <Card style={{ position: "absolute" }}>
                          <div className="d-flex flex-column px-3 pt-2 pb-2">
                            <span>Min: {fancyMin && fancyMin}</span>
                            <span>Max: {fancyMax && fancyMax}</span>
                          </div>
                        </Card>
                      </Collapse>
                    </div>
                  </div>
                </td>
                <td className="bglay boxMobilelay w-15">
                  {this.state.sessiondata[i].GameStatus === "BALL_RUN" ? (
                    <div className="suspendedfancy2 w-30 px-3">
                      <span>BALLRUNNING</span>
                    </div>
                  ) : null}
                  {this.state.sessiondata[i].GameStatus === "SUSPEND" ? (
                    <div className="suspendedfancy2 px-3 w-30">
                      <span>SUSPENDED</span>
                    </div>
                  ) : null}
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
                    disabled={
                      this.state.sessiondata[i].GameStatus === "SUSPEND" ||
                        this.state.sessiondata[i].GameStatus === "BALL_RUN"
                        ? true
                        : false
                    }
                  >
                    <span className="oddSession layprice">
                      {" "}
                      {this.state.sessiondata[i].LayPrice1}
                    </span>

                    <span className="textD">
                      {" "}
                      {this.state.sessiondata[i].LaySize1}
                    </span>
                  </button>
                </td>

                <td className="boxMobileback bgback w-15">
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
                    disabled={
                      this.state.sessiondata[i].GameStatus === "SUSPEND" ||
                        this.state.sessiondata[i].GameStatus === "BALL_RUN"
                        ? true
                        : false
                    }
                  >
                    <span className="oddSession backprice">
                      {" "}
                      {this.state.sessiondata[i].BackPrice1}
                    </span>

                    <span className="textD">
                      {" "}
                      {this.state.sessiondata[i].BackSize1}
                    </span>
                  </button>
                </td>
              </tr>
            );
            new_array.push(new_array1);
          } else {
            if (this.state.sessiondata[i].RunnerName === true) {
              continue;
            }

            new_array1 = (
              <tr className="w-100">
                <td className="table-active w-70">
                  <div className="d-flex flex-row justify-content-between">
                    <div>{this.state.sessiondata[i].RunnerName}</div>
                    <div>
                      <i
                        className="fa fa-info-circle float-right text-mahrun mt-1"
                        onClick={() =>
                          this.setState(
                            {
                              openCard: !openCard,
                              SelectionId: this.state.sessiondata[i]
                                .SelectionId,
                            },
                            () =>
                              setTimeout(() => {
                                this.setState({
                                  openCard: !openCard,
                                  SelectionId: "",
                                });
                              }, 5000)
                          )
                        }
                      />

                      <Collapse
                        in={
                          openCard &&
                          this.state.sessiondata[i].SelectionId ===
                          this.state.SelectionId
                        }
                      >
                        <Card style={{ position: "absolute" }}>
                          <div className="d-flex flex-column px-3 pt-2 pb-2">
                            <span>Min: {fancyMin && fancyMin}</span>
                            <span>Max: {fancyMax && fancyMax}</span>
                          </div>
                        </Card>
                      </Collapse>
                    </div>
                  </div>
                </td>

                <td className="boxMobilelay bglay w-15">
                  {this.state.sessiondata[i].GameStatus === "BALL_RUN" ? (
                    <div className="suspendedfancy2 w-30 px-3">
                      <span>BALLRUNNING</span>
                    </div>
                  ) : null}
                  {this.state.sessiondata[i].GameStatus === "SUSPEND" ? (
                    <div className="suspendedfancy2 px-3 w-30">
                      <span>SUSPENDED</span>
                    </div>
                  ) : null}

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
                    disabled={
                      this.state.sessiondata[i].GameStatus === "SUSPEND" ||
                        this.state.sessiondata[i].GameStatus === "BALL_RUN"
                        ? true
                        : false
                    }
                  >
                    <span className="oddSession layprice">
                      {" "}
                      {this.state.sessiondata[i].LayPrice1}
                    </span>

                    <span className="textD">
                      {" "}
                      {this.state.sessiondata[i].LaySize1}
                    </span>
                  </button>
                </td>

                <td className="boxMobileback bgback w-15">
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
                    disabled={
                      this.state.sessiondata[i].GameStatus === "SUSPEND" ||
                        this.state.sessiondata[i].GameStatus === "BALL_RUN"
                        ? true
                        : false
                    }
                  >
                    <span className="oddSession backprice">
                      {" "}
                      {this.state.sessiondata[i].BackPrice1}
                    </span>

                    <span className="textD">
                      {" "}
                      {this.state.sessiondata[i].BackSize1}
                    </span>
                  </button>
                </td>
              </tr>
            );
            new_array.push(new_array1);
          }
        } else {
          new_array1 = (
            <tr className="w-100">
              <td className="fb_64 table-active w-70">
                <a href="#">
                  {" "}
                  <b className="sessionRunner">
                    {" "}
                    {this.state.sessiondata[i].RunnerName}
                    &nbsp;{" "}
                  </b>
                </a>
              </td>
              <td className="boxMobilelay bglay w-15">
                {this.state.sessiondata[i].GameStatus === "BALL_RUN" ? (
                  <div className="suspendedfancy2 w-30">
                    <span>BALLRUNNING</span>
                  </div>
                ) : null}
                {this.state.sessiondata[i].GameStatus === "SUSPEND" ? (
                  <div className="suspendedfancy2 px-3 w-30">
                    <span>SUSPENDED</span>
                  </div>
                ) : null}
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
                  disabled={
                    this.state.sessiondata[i].GameStatus === "SUSPEND" ||
                      this.state.sessiondata[i].GameStatus === "BALL_RUN"
                      ? true
                      : false
                  }
                >
                  <span className="oddSession layprice">
                    {" "}
                    {this.state.sessiondata[i].LayPrice1}
                  </span>

                  <span className="textD">
                    {" "}
                    {this.state.sessiondata[i].LaySize1}
                  </span>
                </button>
              </td>

              <td className="boxMobileback bgback w-15">
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
                  disabled={
                    this.state.sessiondata[i].GameStatus === "SUSPEND" ||
                      this.state.sessiondata[i].GameStatus === "BALL_RUN"
                      ? true
                      : false
                  }
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
    var new_fancy_arr = [];
    let new_showdata = [];

    if (this.state.no_data_model !== undefined) {
      if (this.state.no_data_model.data !== undefined) {
        if (this.state.no_data_model.data.showdata !== undefined) {
          let minOdds = 0;
          let maxOdds = 0;
          this.state.no_data_model.data.showdata.map((item1, index) => {
            if (index === 0) {
              minOdds = parseInt(item1.odds);
              maxOdds = parseInt(item1.odds);
            } else {
              minOdds =
                parseInt(item1.odds) < minOdds ? parseInt(item1.odds) : minOdds;
              maxOdds =
                parseInt(item1.odds) > maxOdds ? parseInt(item1.odds) : maxOdds;
            }
          });
          minOdds = minOdds - 1 >= 0 ? minOdds - 1 : 0;
          maxOdds = maxOdds + 1;
          this.state.no_data_model.data.showdata.map((item) => {
            if (item.no === "no") {
              for (let i = parseInt(item.odds) - minOdds; i > 0; i--) {
                new_showdata.push({
                  odds: parseInt(item.odds) - i,
                  value: parseInt(item.profit),
                });
              }
              new_showdata.push({
                odds: parseInt(item.odds),
                value: 0 - parseInt(item.loss),
              });
              for (let j = 1; j <= maxOdds - parseInt(item.odds); j++) {
                new_showdata.push({
                  odds: parseInt(item.odds) + j,
                  value: 0 - parseInt(item.loss),
                });
              }
            } else {
              for (let i = parseInt(item.odds) - minOdds; i > 0; i--) {
                new_showdata.push({
                  odds: parseInt(item.odds) - i,
                  value: 0 - parseInt(item.loss),
                });
              }
              new_showdata.push({
                odds: parseInt(item.odds),
                value: parseInt(item.profit),
              });
              for (let j = 1; j <= maxOdds - parseInt(item.odds); j++) {
                new_showdata.push({
                  odds: parseInt(item.odds) + j,
                  value: parseInt(item.profit),
                });
              }
            }
          });

          const combinedItems = (new_showdata = []) => {
            const res = new_showdata.reduce((acc, obj) => {
              let found = false;
              for (let i = 0; i < acc.length; i++) {
                if (acc[i].odds === obj.odds) {
                  found = true;
                  acc[i].value = acc[i].value + obj.value;
                }
              }
              if (!found) {
                acc.push(obj);
              }
              return acc;
            }, []);
            return res;
          };
          new_showdata = combinedItems(new_showdata);
          new_showdata.map((itm, index) => {
            new_fancy_arr.push(
              <tr
                key={index}
                className={parseInt(itm.value) < 0 ? "lay" : "back"}
              >
                <td>
                  <button className={parseInt(itm.value) < 0 ? "lay" : "back"}>
                    {" "}
                    <span className="odd1">{itm.odds}</span>{" "}
                  </button>
                </td>
                <td className={parseInt(itm.value) < 0 ? "lay" : "back"}>
                  <button className={parseInt(itm.value) < 0 ? "lay" : "back"}>
                    {" "}
                    <span className="odd1">
                      <span
                        className={
                          parseInt(itm.value) < 0
                            ? "text-danger"
                            : "text-success"
                        }
                      >
                        {parseFloat(itm.value).toFixed(0)}
                      </span>
                    </span>
                  </button>
                </td>
              </tr>
            );
          });
        }
      }
    }
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
                <div className="texttab1 px-2">
                  MATCHED BET (
                  {this.state.getResults !== undefined &&
                    this.state.getResults.length
                    ? this.state.getResults.length
                    : 0}
                  )
                </div>
              </Tab>
              <div
                className="text-white float-right fas fa-tv mt-3 mr-2"
                onClick={() => this.setState({ openTv: !openTv })}
                style={{ float: "right" }}
              ></div>
            </TabList>
            <TabPanel className="w-100">
              <div style={{ marginTop: "-15px" }}>
                {" "}
                <Collapse in={openTv} className="mb-2">
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
                    <div
                      className="tab-content"
                      style={{ height: "200px", marginTop: "-8px" }}
                    >
                      <div id="video1" className=" tab-pane active">
                        <iframe
                          className="tab_video w-100"
                          src="https://video.indibetsportsbook.com:8888/embed_player?urlServer=wss://video.indibetsportsbook.com:8443&streamName=ch_1&autoplay=false&mediaProviders=WebRTC,Flash,MSE,WSPlayer"
                          style={{ height: "200px" }}
                        ></iframe>
                      </div>
                      <div id="video2" className=" tab-pane fade">
                        <iframe
                          className="tab_video w-100"
                          src="https://video.indibetsportsbook.com:8888/embed_player?urlServer=wss://video.indibetsportsbook.com:8443&streamName=ch_2&autoplay=false&mediaProviders=WebRTC,Flash,MSE,WSPlayer"
                          style={{ height: "200px" }}
                        ></iframe>
                      </div>
                      <div id="video3" className=" tab-pane fade">
                        <iframe
                          className="tab_video w-100"
                          src=" https://video.indibetsportsbook.com:8888/embed_player?urlServer=wss://video.indibetsportsbook.com:8443&streamName=ch_3&autoplay=false&mediaProviders=WebRTC,Flash,MSE,WSPlayer
                            "
                          style={{ height: "200px" }}
                        ></iframe>
                      </div>
                      <div id="video4" className=" tab-pane fade">
                        <iframe
                          className="tab_video w-100"
                          style={{ height: "200px" }}
                          src="https://video.indibetsportsbook.com:8888/embed_player?urlServer=wss://video.indibetsportsbook.com:8443&streamName=ch_4&autoplay=false&mediaProviders=WebRTC,Flash,MSE,WSPlayer"
                        ></iframe>
                      </div>
                    </div>
                  </div>
                </Collapse>
                <div className="card-header4 px-2">
                  <span className="mt-2">
                    {this.state.firstTeamName} v {this.state.secondTeamName}
                  </span>
                  <span className="moment mt-1" style={{ float: "right" }}>
                    {Moment(
                      this.props.match.params.date
                        ? this.props.match.params.date
                        : null
                    ).format("MM/DD/YYYY HH:mm A")}
                  </span>
                </div>
                {this.state.gameName === "cricket" ? (
                  <div>
                    <div>
                      <div class="container2">
                        <img
                          src="https://dzm0kbaskt4pv.cloudfront.net/v2/static/front/img/scorecard-bg.png"
                          alt="Snow"
                          className="w-100 imgscroe"
                          height="80px"
                        />

                        <div className="top-left2">
                          <span>
                            {CardData && CardData.spnnation1}
                            <span className="ml-1">
                              {CardData && CardData.score1}
                            </span>
                            <span className="ml-1">
                              {CardData && CardData.spnrunrate1}
                            </span>
                          </span>
                        </div>

                        <div className="top-right2">
                          <span>{CardData && CardData.spnnation2}</span>
                          <span className="ml-1">
                            {CardData && CardData.score2}
                          </span>
                          <span className="ml-1">
                            {CardData && CardData.spnrunrate2}
                          </span>
                        </div>
                        <div class="bottom-right2">
                          {CardData && CardData.balls && CardData.balls.length
                            ? CardData.balls.map((item, index) => {
                              return (
                                <span
                                  className={`dot2 ml-1 pt-1 ${item === "4"
                                    ? "bg-success"
                                    : item === "6"
                                      ? "bg-puppal"
                                      : item === "ww"
                                        ? "bg-orange"
                                        : null
                                    }`}
                                >
                                  <b>{item}</b>
                                </span>
                              );
                            })
                            : null}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
                <div className="card-header3 w-100 px-2">
                  <span className="textC mt-2">MATCH_ODDS </span>
                  <span style={{ float: "right" }}>
                    <i className="fa fa-info-circle float-right mt-1" />
                  </span>
                </div>
                {this.state.firstTeamName === null ? (
                  <table className="table">
                    <tbody>
                      <tr>
                        <td colSpan="5" className="text-center bg4">
                          <div className="profit font-weight-normal">
                            {" "}
                            No real-time records found!
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                ) : (
                  <div
                    className="table-responsive mb-1"
                    data-marketid="1.167146463"
                  >
                    <table className="table coupon-table table-bordered1 table-sm">
                      <thead>
                        <tr>
                          <th style={{ height: "20px" }}>
                            {" "}
                            Max:{" "}
                            {this.state.matchOddsMax
                              ? this.state.matchOddsMax
                              : 0}
                          </th>
                          <th
                            className="bgback text-center"
                            style={{ height: "20px" }}
                          >
                            BACK
                          </th>
                          <th
                            className="bglay text-center"
                            style={{ height: "20px" }}
                          >
                            LAY
                          </th>
                        </tr>
                      </thead>

                      <tbody id="dyn_bind">
                        <tr className="bet-info">
                          <td className="table-active fb_64">
                            <span>
                              <strong>{this.state.firstTeamName}</strong>
                            </span>
                            <p className="box-w4">
                              <span className="float-right book" id="book_349">
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

                          <td
                            id="blockin4"
                            className="boxMobilelay bglay fb_td"
                          >
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
                )}
                {this.state.gameName === "cricket" ? (
                  <div id="fancyHeadToHide" style={{ marginTop: "-15px" }}>
                    <div className="card-header3 w-100 px-2">
                      {" "}
                      <span className="textC mt-3">Bookmaker</span>
                      <i class="fa fa-info-circle float-right mt-1"></i>
                    </div>
                    <div className="new_table1 coupon-table table table-bordered1">
                      {this.state.bookmakerFirstTeamFound === true ||
                        this.state.bookmakerSecondTeamFound === true ||
                        this.state.bookmaker_draw ? (
                        this.showBookMarketAllHtml()
                      ) : (
                        <table className="table">
                          <tbody>
                            {this.state.gameName === "cricket" ? (
                              <tr>
                                <td colSpan="5" className="text-center bg4">
                                  <div className="profit font-weight-normal">
                                    {" "}
                                    No real-time records found!
                                  </div>
                                </td>
                              </tr>
                            ) : null}
                          </tbody>
                        </table>
                      )}
                      {/* {this.showBookMarketAllHtml()} */}
                    </div>
                    <Tabs>
                      <TabList
                        className="tablist d-flex flex-row"
                        style={{ marginTop: "-12px" }}
                      >
                        <Tab className="bg2 texttab3 text-center">
                          <div className="mt-1">Fancy</div>
                        </Tab>
                        <Tab className="texttab3 text-center">
                          <div className="mt-1 px-1">Fancy 1</div>
                        </Tab>
                        <Tab className="texttab3 text-center">
                          <div className="mt-1 px-2">meter</div>
                        </Tab>{" "}
                        <Tab className="texttab3 text-center">
                          <div className="mt-1 px-2">khado</div>
                        </Tab>{" "}
                        <Tab className="texttab3 text-center">
                          <div className="mt-1 px-1">odd even</div>
                        </Tab>
                        <Tab className="texttab3 text-center px-3">
                          <div className="mt-1 px-2">wicket</div>
                        </Tab>{" "}
                        <Tab className="texttab3 text-center">
                          <div className="mt-1 px-3">four</div>
                        </Tab>
                        <Tab className="texttab3 text-center">
                          <div className="mt-1 px-3">six</div>
                        </Tab>
                        <Tab className="texttab7 text-center">
                          <div className="mt-1 px-2">cricket casino</div>
                        </Tab>
                      </TabList>
                      <TabPanel style={{ marginTop: "-15px" }}>
                        {this.state.sessiondata &&
                          this.state.sessiondata.length ? (
                          <table className="table coupon-table table-bordered1 ">
                            <thead>
                              <tr className="w-100">
                                <th className="card-header3 w-70">
                                  <span className="textC text-left mb-1">
                                    Session Market
                                  </span>
                                  <i className="fa fa-info-circle float-right" />
                                </th>

                                <th className="boxMobilelay bglay w-15">No</th>
                                <th className="bgback boxMobileback w-15">
                                  Yes
                                </th>
                              </tr>
                            </thead>
                            <tbody>{new_array}</tbody>
                          </table>
                        ) : (
                          <table className="table">
                            <tbody>
                              <tr>
                                <td colSpan="5" className="text-center bg4">
                                  <div className="profit font-weight-normal">
                                    {" "}
                                    No real-time records found!
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        )}
                      </TabPanel>
                      <TabPanel style={{ "marginTop ": "-15px" }}>
                        <table className="table">
                          <tbody>
                            <tr>
                              <td colSpan="5" className="text-center bg4">
                                <div className="profit font-weight-normal">
                                  {" "}
                                  No real-time records found!
                                </div>
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
                                <div className="profit font-weight-normal">
                                  {" "}
                                  No real-time records found!
                                </div>
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
                                <div className="profit font-weight-normal">
                                  {" "}
                                  No real-time records found!
                                </div>
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
                                <div className="profit font-weight-normal">
                                  {" "}
                                  No real-time records found!
                                </div>
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
                                <div className="profit font-weight-normal">
                                  {" "}
                                  No real-time records found!
                                </div>
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
                                <div className="profit font-weight-normal">
                                  {" "}
                                  No real-time records found!
                                </div>
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
                                <div className="profit font-weight-normal">
                                  {" "}
                                  No real-time records found!
                                </div>
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
                                <div className="profit font-weight-normal">
                                  {" "}
                                  No real-time records found!
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </TabPanel>
                    </Tabs>
                  </div>
                ) : null}
              </div>

              <div className="col-md-3 w-100">
                <div className="card m-b-10 place-bet m-t-10">
                  <Modal
                    show={this.state.isShowBidClickHtml}
                    style={{ opacity: 1 }}
                  >
                    <Modal.Header
                      style={{ height: "40px" }}
                      className="bg d-flex flex-row justify-content-between w-100"
                    >
                      <span className="text-white texttitle h-100 d-inline-block">
                        Placebet
                      </span>

                      <span className="text-right">
                        <i
                          class="fa fa-times text-white"
                          aria-hidden="true"
                          onClick={() => this.handleBidCrossClick()}
                          style={{ cursor: "pointer" }}
                        />
                      </span>
                    </Modal.Header>

                    {this.state.betLoder === true ? <FullPageLoader /> : null}
                    {this.showBidClickHtml()}
                    {this.showBidClickSessionHtml()}
                  </Modal>
                </div>
              </div>

              <Modal
                show={this.state.showUserAmountPopup}
                style={{ opacity: 1 }}
              >
                <Modal.Header
                  className="bg d-flex flex-row justify-content-between w-100"
                  style={{ height: "40px" }}
                >
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
              </Modal>
            </TabPanel>
            <TabPanel style={{ marginTop: "-15px" }}>
              <div className="card place-bet">
                <div className="card-header3">
                  <h6 className="card-title d-inline-block">My Bet</h6>
                </div>
                <div
                  className="table-responsive hide-box-click "
                  style={{ display: "block" }}
                >
                  {this.showTableHtml()}
                </div>
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default Index;
