import React, { Component } from "react";
import Url from "../configure/configure.js";
import axios from "axios";
import Nav from "../Include/Nav";
import Menu from "../Include/Menu";
import Footer from "../Include/footer";
import Sidebar from "../Include/Sidebar";
import { Modal} from "react-bootstrap";
import FullPageLoader from "../Loader/FullPageLoader";
// const ENDPOINT = "https://in.dreamcasino.live:4002";

const $ = window.$;
const baseUrl = Url.baseUrl;
class Index extends Component {
  constructor(props) {
    super(props);
    var accessToken = localStorage.getItem("token");
    var user_id = localStorage.getItem("user_id");
    this.state = {
      accessToken: accessToken,
      user_id: user_id,
      stake_amount: "",
      respStatus: "",
      respMessage: "",
      emptyField: false,
      loading: true,
      new_array: {},
      maxminBet: "",
      betClick: false,
      isLoading: false,
      tableData: [],
      bet_on: "",
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    this.getBinaryOdds();
    this.interval = setInterval(() => {
      this.getBinaryOdds();
    }, 5000);
    this.getbets();
  }
  getBinaryOdds = () => {
    let headers = {
      Authorization: "Bearer " + this.state.accessToken,
    };
//    axios.get("https://cric.dreamcasino.live/trading/", { headers }).then((res) => {
    axios.get("http://odds.encabook999.com/runnerodds/1.179157300", { headers }).then((res) => {
      if (res.data) {
        this.setState({ tableData: res.data.market[0].events, isLoading: false });
      }
    });

  };
  getbets = () => {
    let headers = {
      Authorization: "Bearer " + this.state.accessToken,
    };
    axios.get(baseUrl + "/binarybets", { headers }).then((resp) => {
      this.setState({ Binaryresult: resp.data.Betlist });
    });
    this.setState({ isLoading: false })
  }
  handleSubmit = (event) => {
    event.preventDefault();
    const { stake_amount, bet_on } = this.state;
    this.setState({ isLoading: true });
    if (parseInt(stake_amount) < 100 || parseInt(stake_amount) >= 50000) {
      this.setState(
        { emptyField: true, errMsg: "Min value 100 and Max value 50000", isLoading: false },
        () => this.emptyHtml()
      );
    }
    else if (bet_on === "binary") {
      this.setState(
        { emptyField: true, errMsg: "Betting on binary market is currently closed.", isLoading: false },
        () => this.emptyHtml()
      );
    } else {
      this.setState({ emptyField: false, errMsg: "" }, () => this.emptyHtml());

      let headers = {
        Authorization: "Bearer " + this.state.accessToken,
      };

      var exposure = "-" + this.state.stake_amount;
      let savebet = {
        event_name: "Binary",
        odds: this.state.oddVal,
        stake: this.state.stake_amount,
        event_id: "99999",
        event_type: "Binary",
        team_name: this.state.teamName,
        bet_type: this.state.type,
        exposure: exposure,
        bet_on:"binary",
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
              isLoading: false,
            });
            axios.get(baseUrl + "/binarybets", { headers }).then((resp) => {
              this.setState({ Binaryresult: resp.data.Betlist });
            });

            setTimeout(() => {
              this.setState({ respStatus: "" });
            }, 2000);
          } else {
            this.setState({
              respStatus: resp.success,
              respMessage: resp.message,
              isLoading: false,
            });
            setTimeout(() => {
              this.setState({ respStatus: "", isLoading: false });
            }, 2000);
          }
        });
    }
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


  showTableHtml = () => {
    const html = [];
    if (
      this.state.Binaryresult != undefined &&
      this.state.Binaryresult != "" &&
      this.state.Binaryresult != null
    ) {
      for (let i = 0; i < this.state.Binaryresult.length; i++) {
        html.push(
          <tr>
            <td style={{ textAlign: "center" }}>
              {" "}
              {this.state.Binaryresult[i].odds}{" "}
            </td>
            <td style={{ textAlign: "center" }}>
              {" "}
              {this.state.Binaryresult[i].stake}{" "}
            </td>
            <td style={{ textAlign: "center" }}>
              {" "}
              {this.state.Binaryresult[i].team_name}{" "}
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
  handleChange = (event) => {
    let { name, value } = event.target;
    this.setState({ [name]: event.target.value });
  };

  handleButtonsClick = (getAmount) => {
    this.setState({ stake_amount: getAmount });
  };


  handleBidClick = (type, team_name, rate, color) => {
    this.setState({ betClick: true });
    this.setState({
      teamName: team_name,
      oddVal: rate,
      color: color,
      type: type,
      bet_on: "binary"
    });
  };

  handleBidCrossClick = () => {
    this.setState({
      betClick: false,
      teamName: "",
      oddVal: "",
      color: "",
      type: "",
      stake_amount: "",
      errMsg: "",
      emptyField: false,
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
                {this.state.isLoading ? (
                  <i
                    className="fa fa-spinner fa-spin fa-fw text-white"
                    aria-hidden="true"
                  ></i>
                ) : (
                  <i className=" ml-2 fas fa-sign-in-alt"></i>
                )}
              </button>
            </div>
          </form>
        </div>
      );
    }
  };

  render() {
    const { show, tableData } = this.state;
    var newdata11 = this.state.getResult11;
    var newarray = [];
    if (
      this.state.casinodt20 != undefined &&
      this.state.casinodt20 != "" &&
      this.state.casinodt20 != null
    ) {
      for (var i = 0; i < this.state.casinodt20.length; i++) {
        var result = "";
        if (this.state.casinodt20[i].result == 1) {
          result = "A";
        }
        if (this.state.casinodt20[i].result == 2) {
          result = "B";
        }

        newarray.push(<span className="ball-runs ">{result}</span>);
      }
    }
    var suspendBack = "box-w1 back-color suspended-casino";
    var suspendLay = "box-w1  lay-color suspended-casino";
    return (
      <div>
        <Nav />
        <Menu />

        <div id="wrapper">
          {this.state.isLoading ? <FullPageLoader /> : null}

          <Sidebar />
          <div id="content-wrapper">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-9 featured-box-detail">
                  <div className="coupon-card">
                    <div className="game-heading d-flex flex-row justify-content-between">
                      <span className="card-header-title">Indian Premier League Winner</span>
                    </div>
                    <div className="card-content">
                      <div className="casino_video"></div>
                      <div
                        className=" m-b-10 main-market market-bf"
                        data-marketid="1.167146463"
                      >
                        <table className="coupon-table table table-bordered">
                          <thead>
                            <tr>
                              <th> &nbsp;</th>
                              <th className="text-center box-w2 back">
                                {" "}
                                  Yes
                                </th>
                              <th className="text-center  box-w2 lay">
                                {" "}
                                 No
                                </th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              tableData && tableData.length ? (
                                tableData.map((item, index) => {
                                  return (
                                    <tr key={index}>
                                      <td className="nation table-active">

                                        <span className="d-flex flex-column">
                                          <span>
                                            {item.RunnerName ? item.RunnerName : null}</span>
                                          <i className="fas fa-chart-line fa-lg" />
                                        </span>{" "}
                                      </td>
                                      <td className={item.BackPrice1 === 0 || item.BackPrice1 === "" ? suspendBack : null}>
                                        <div className="bet-info back">
                                          <button
                                            onClick={this.handleBidClick.bind(
                                              this,
                                              "back",
                                              item.RunnerName,
                                              item.BackPrice1,
                                              "#A8DBFF",
                                              item.Market,

                                            )}
                                            className="bet-sec "
                                          >
                                            <span className="odd1 layprice">
                                              {" "}
                                              {item.BackPrice1 ? item.BackPrice1 : "-"}
                                            </span>
                                          </button></div>
                                      </td>
                                      <td
                                        className={item.LayPrice1 === 0 || item.LayPrice1 === "" ? suspendLay : null}>
                                        <div className="bet-info lay">
                                          <button
                                            className="bet-sec lay"
                                            onClick={this.handleBidClick.bind(
                                              this,
                                              "lay",
                                              item.RunnerName,
                                              item.LayPrice1,
                                              "#faa9ba",
                                              item.Market,

                                            )}
                                          >
                                            <span className="odd1 layprice">
                                              {" "}
                                              {item.LayPrice1 ? item.LayPrice1 : "-"}
                                            </span>
                                          </button></div>
                                      </td>

                                    </tr>
                                  );
                                })
                              ) : (
                                <tr className="profit font-weight-normal mt-1 mb-1 w-100"> No real-time  records found!</tr>
                              )
                            }
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 sidebar-right">
                  <div className="card m-b-10 place-bet ">
                    <div className="card-header">
                      <h6 className="card-title d-inline-block">Place Bet</h6>
                    </div>
                    {this.showBidClickHtml()}
                  </div>
                  <div className="card m-b-10 place-bet">
                    <div className="card-header">
                      <h6 className="card-title d-inline-block">My Bet</h6>
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
          </div>
        </div>
        <Modal
          style={{ opacity: 1 }}
          show={show}
          onHide={() => this.handleCloseModel()}
          scrollable="true"
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <div className="card m-b-10 place-bet ">
              <div className="card-header">
                <h6 className="card-title d-inline-block">Place Bet</h6>
              </div>
              {this.showBidClickHtml()}
            </div>
            <div className="card m-b-10 place-bet">
              <div className="card-header">
                <h6 className="card-title d-inline-block">My Bet</h6>
              </div>
              <div
                className="table-responsive hide-box-click "
                style={{ paddingBottom: "4px", display: "block" }}
              >
                {this.showTableHtml()}
              </div>
            </div>
          </Modal.Body>
        </Modal>
        <Footer />
      </div>
    );
  }
}

export default Index;
