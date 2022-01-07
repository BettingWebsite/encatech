/* eslint-disable */
import React, { Component } from "react";
import Url from "../configure/configure.js";
import axios from "axios";
import Nav from "../Include/Nav";
import { Modal, Col,Row} from "react-bootstrap";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import FullPageLoader from "../Loader/FullPageLoader";
import { Link } from "react-router-dom";
import "../Transactions/Transactions.css";
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
      isActive: "",
      
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    this.getBinaryOdds();
    this.interval = setInterval(() => {
      this.getBinaryOdds();
    }, 5000);
    this.getbets();
    const url = window.location.pathname;
    this.setState({ isActive: url });
  }
  getBinaryOdds = () => {
    let headers = {
      Authorization: "Bearer " + this.state.accessToken,
    };
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
      this.setState({ Binaryresult: resp.data.Betlist,isLoading: false  });
    });
  }
   handleCloseModel = () => {
    this.setState({ show: false ,
      betClick: false,emptyField: false,errMsg: ""});
  };
  handleShowModel = () => {
    if ($(window).width() < 850) {
      this.setState({ show: true });
    }
  };
  handleSubmit = (event) => {
    const { stake_amount,bet_on } = this.state;
    this.setState({isLoading:true});
    event.preventDefault();
    if (parseInt(stake_amount) < 100 || parseInt(stake_amount) >= 50000) {
      this.setState(
        { emptyField: true, errMsg: "Min value 100 and Max value 50000" },
        () => this.emptyHtml()
      );
    }else if (bet_on === "binary") {
      this.setState(
        { emptyField: true, errMsg: "Betting on binary market is currently closed.",isLoading: false },
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
        // casnio_type: "unmatch",
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
              isLoading: false 
            });
            axios.get(baseUrl + "/binarybets", { headers }).then((resp) => {
              this.setState({ Binaryresult: resp.data.Betlist,isLoading: false  });
            });
          } else {
            this.setState({
              respStatus: resp.success,
              respMessage: resp.message,
              isLoading: false ,
              show: false 
            });
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
      this.state.Binaryresult !== undefined &&
      this.state.Binaryresult !== "" &&
      this.state.Binaryresult !== null
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

      ////////console.log(this.state.profit12);

      return (
        <table className="table table-sm coupon-table table-bordered1 ">
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

  handleChangeStakeamount = (event) => {
    this.setState({ stake_amount: event.target.value });
  };
  handleChange_session_input = (event) => {
    this.setState({ session_input: event.target.value });
  };

  handleButtonsClick = (getAmount) => {
    this.setState({ stake_amount: getAmount })
  };


  handleBidClick = (type, team_name, rate, color) => {
    this.handleShowModel();
    this.setState({ betClick: true});
    this.setState({
      teamName: team_name,
      oddVal: rate,
      color: color,
      type: type,   
       bet_on:"binary",
 
    });
  };

  handleBidCrossClick = () => {
    this.setState({
      betClick: false,
      show: false,
      teamName: "",
      oddVal: "",
      color: "",
      type: "",
      stake_amount: "",
      profit: "",
      emptyField: false,
      errMsg: ""
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
          <Row className="mt-2 px-2">
                <Col>
                  <i className="fa fa-times text-danger ml-3" onClick={this.handleBidCrossClick}></i>{" "}
                  <small><b>{this.state.teamName}</b></small>
                </Col><Col></Col>
                <Col>  <input
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
                      width: "100%",
                      verticalAlign: "middle",
                    }}
                    id="odds"
                    step="0.01"
                  /></Col>
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

                  {/* <div className="text-center pt-1">
                    {this.state.profit ? this.state.profit:0}</div> */}
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
                    </a></div>
                </Col>

                <Col>
                  <div>
                    <a
                      href="javascript:void(0);" className="valueBtn btn text-center"
                      value={value_2}
                      onClick={this.handleButtonsClick.bind(this, value_2)}
                    >
                      {button_2}

                    </a></div>
                </Col>
                <Col>
                  <div>
                    <a
                      href="javascript:void(0);" className="valueBtn btn text-center"
                      value={value_3}
                      onClick={this.handleButtonsClick.bind(this, value_3)}
                    >
                      {button_3}

                    </a></div>
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
                    </a></div>
                </Col>

                <Col>
                  <div>
                    <a
                      href="javascript:void(0);" className="valueBtn btn text-center"
                      value={value_5}
                      onClick={this.handleButtonsClick.bind(this, value_5)}
                    >
                      {button_5}

                    </a></div>
                </Col>
                <Col>
                  <div>
                    <a
                      href="javascript:void(0);" className="valueBtn btn text-center"
                      value={value_6}
                      onClick={this.handleButtonsClick.bind(this, value_6)}
                    >
                      {button_6}

                    </a></div>
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
                    </a></div>
                </Col>

                <Col>
                  <div>
                    <a
                      href="javascript:void(0);" className="valueBtn btn text-center"
                      value={value_8}
                      onClick={this.handleButtonsClick.bind(this, value_8)}
                    >
                      {button_8}

                    </a></div>
                </Col>
                <Col>
                  <div>
                    <a
                      href="javascript:void(0);" className="valueBtn btn text-center"
                      value={value_9}
                      onClick={this.handleButtonsClick.bind(this, value_9)}
                    >
                      {button_9}

                    </a></div>
                </Col>
              </Row>
              <Row className="px-3 mt-3">
                <Col>
                  {this.responseHtml()}
                  {this.emptyHtml()}</Col>
              </Row>
            
          </form>
        </div>
      );
    }
  };

  render() {
    const { isActive } = this.state;
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
     
       {this.state.isLoading ? <FullPageLoader /> : null}
      
        <Tabs>
          <div>
        <ul className="nav nav-tabs nav_top_mobile">
                    <li className="nav-item">
                        <a href="/binary" className={`nav-link ${isActive === "/binary" ? 'nav-link1' : ''}`} style={{background:"#223577", fontSize:"16px"}}>
                            IPL 2021
                        </a>
                    </li>
                </ul>
                </div>
              <TabList className="flex-row mobile-casino tabpad w-100">
                <Tab>
                  <div className="texttab1 px-2 ">ODDS</div>
                </Tab>
                <Tab>
                  <div className="texttab1 px-2">MATCHED BET</div>
                </Tab>
              </TabList>
              <TabPanel>
                <div style={{ marginTop: "-15px" }}>
                <div className="card-header3 w-100 px-2">
                        <span>Binary</span>
                      </div>
                      <table className="coupon-table table table-bordered1">
                            <thead>
                              <tr>
                                <th> &nbsp;</th>
                                <th className="text-center box-w1 bgback">
                                  {" "}
                                Yes
                                </th>
                                <th className="text-center  box-w1 bglay">
                                  {" "}
                                  No{" "}
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
                                            className="box-w1 bgback"
                                          >
                                            <span className="odd1 layprice">
                                              {" "}
                                              {item.BackPrice1 ? item.BackPrice1 : "-"}
                                            </span>
                                          </button></div>
                                      </td>
                                      <td
                                        className={item.LayPrice1 === 0 || item.LayPrice1 === "" ? suspendLay : null}>
                                        <div className="bet-info bglay">
                                          <button
                                            className="box-w1 bglay"
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
                                <tr 
                                className="profit font-weight-normal bg4 w-100 mt-2">
                                  <td colSpan = "5" className = "table-active text-center"> No real-time  records found!</td></tr>
                              )
                            }
                          </tbody>
                          </table>
                       
                </div>
           </TabPanel>
           <TabPanel className="w-100">
                <div style={{ marginTop: "-15px" }}>
                <div className="card-header3 w-100 px-2">
                        <span>My Bets</span>
                      </div>
                      {this.showTableHtml()}
                </div>
           </TabPanel></Tabs>
     
        <Modal show={show}  style={{ opacity: 1 }} >
         <Modal.Header style={{ height: "40px" }}
       className="bg d-flex flex-row justify-content-between w-100">
  <span className="text-white texttitle h-100 d-inline-block">Placebet</span>
 <span className="text-right">
                          <i
                            class="fa fa-times text-white"
                            aria-hidden="true"
                            onClick={() =>  this.handleCloseModel()}
                            style={{ cursor: "pointer" }}
                          />
                        </span>
                      </Modal.Header>
                 
                      {this.showBidClickHtml()}
         
                    </Modal>
            
      </div>
    );
  }
}

export default Index;
