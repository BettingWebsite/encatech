import React, { Component } from "react";
import Nav from "../Include/Nav";
import Menu from "../Include/Menu";
import Footer from "../Include/footer";
import Sidebar from "../Include/Sidebar";
import Url from "../configure/configure.js";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Timer from "react-compound-timer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-bootstrap-modal";
import FullPageLoader from "../Loader/FullPageLoader";
import { Card } from "react-bootstrap";
const baseUrl = Url.baseUrl;
// Third argument is the inner text

class Index extends Component {
  constructor(props) {
    super(props);
    var accessToken = localStorage.getItem("token");
    var user_id = localStorage.getItem("user_id");
    this.state = {
      accessToken: accessToken,
      user_id: user_id,
      pancypickCall: false,
      stake_amount: "",
      respStatus: "",
      respMessage: "",
      emptyField: false,
      betClick1: false, buttonvalue_new: "",
      isLoading: false,
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



  handleSubmit = (event) => {
    event.preventDefault();
    const { isLoading, autotime } = this.state;
    this.setState({ isLoading: true })
    if (autotime === 0) {
      toast.error(`Bet Lock`);
    }
    else {
      let headers = {
        Authorization: "Bearer " + this.state.accessToken,
      };
      var exposure = "-" + this.state.stake_amount;
      let savebet = {
        event_name: "casino",
        odds: this.state.oddVal,
        stake: this.state.stake_amount,
        status: 'pending',
        mid: this.state.mid,
        event_type: this.state.event_type,
        team_name: this.state.teamName,
        casnio_type: "unmatch",
        exposure: exposure,
        sid: this.state.sid
      };

      axios
        .post("http://122.168.190.17:8000/casino_bet", savebet, { headers })
        .then((resp) => {
          var resp = resp.data;
          if (resp.success === true) {
            this.setState({
              respStatus: resp.success,
              respMessage: resp.message,
              oddVal: "",
              stake_amount: "",
              isLoading: false
            });
            axios.get(baseUrl + "/teenpattit20", { headers }).then((resp) => {
              this.setState({ casinoresult: resp.data.Betlist });
            });

            setTimeout(() => {
              this.setState({ respStatus: "", isLoading: false });
            }, 2000);
          } else {
            this.setState({
              respStatus: resp.success,
              respMessage: resp.message,
              isLoading: false
            });
            setTimeout(() => {
              this.setState({ respStatus: "" });
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


  componentDidMount() {
    this.interval = setInterval(() => {
      this.getoddsValue();
    }, 2000);

  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  getoddsValue = async () => {
    let headers = {
      Authorization: "Bearer " + this.state.accessToken,
    };
//    await axios.get("http://13.232.171.240:3000/getteen20", { headers }).then((resp) => {
    // await axios.get("http://139.162.213.154:8040/demo-api/getdata/teen20", { headers }).then((resp) => {
      await axios.get("http://13.126.49.41:3000/getdata/teen20", { headers }).then((resp) => {
      this.setState({
        casinoData: resp.data.data.t2, card: resp.data.data.t1,
        autotime: resp.data && resp.data.data && resp.data.data.t1[0].autotime,
        mid: resp.data && resp.data.data && resp.data.data.t1[0].mid,
        event_type: resp.data && resp.data.data && resp.data.data.t1[0].gtype,
        max:resp.data && resp.data.data && resp.data.data.t1[0].max,
        min:resp.data && resp.data.data && resp.data.data.t1[0].min,
      });
    });
  }

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
              {this.state.casinoresult[i].rate}{" "}
            </td>
            <td style={{ textAlign: "center" }}>
              {" "}
              {this.state.casinoresult[i].stake}{" "}
            </td>
            <td style={{ textAlign: "center" }}>
              {" "}
              {this.state.casinoresult[i].nation}{" "}
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

  handleBidClick = (type, team_name, rate, color, gstatus, sid) => {
    if (gstatus === 0) {
      toast.error(`Casino is not Active`)
      return false
    }
    this.setState({ betClick: true, betClick1: false });
    this.setState({
      teamName: team_name,
      oddVal: rate,
      color: color,
      type: type,
      sid: sid
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
      var mid = this.state.mid;
      if (mid != undefined) {
        var new_mid = mid;
      }
    }

    var newdata11 = this.state.getResult11;
    var newarray = [];
    if (
      this.state.casinodt20 != undefined &&
      this.state.casinodt20 != "" &&
      this.state.casinodt20 != null
    ) {
      if (this.state.casinodt20.t1 != undefined) {
        for (var i = 0; i < this.state.casinodt20.t1.length; i++) {
          var result = "";
          if (this.state.casinodt20.t1[i].result == 1) {
            result = "A";
          }
          if (this.state.casinodt20.t1[i].result == 3) {
            result = "B";
          }

          newarray.push(<span className="ball-runs ">{result}</span>);
        }
      }

      //console.log(newarray);
    }

    var timer = 0;
    var suspendcaino1 = "box-w1  back-color";
    var suspendcaino2 = "box-w1  back-color suspended-casino ";
    if (this.state.autotime != 0 && this.state.autotime != undefined) {
      console.log(this.state.lasttime_b);
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

    const { casinoresult, casinoData, card, autotime, isLoading } = this.state;

    return (
      <div>
        <Nav />
        <Menu />

        <div id="wrapper">
          <Sidebar />
          <div id="content-wrapper">

            {isLoading === true ? <FullPageLoader /> : null}
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-9 featured-box-detail">
                  <div className="game-heading bg1 pt-2">
                    <span className="text-white">
                      {" "}
                      Teen Patti T20
                      <a
                        href="#"
                        className=" m-l-5 game-rules-icon rules_a"
                        onClick={this.handleBidCrossClick123}
                      >
                        RULESs
                      </a>
                    </span>
                    <span className="float-right m-r-10">
                      Round ID: {new_mid} | Min: {this.state.min} | Max:{" "}
                      {this.state.max}
                    </span>
                  </div>
                  <div className="coupon-card mt-5">
                    <div className="card-content">
                      <div className="casino_video">
                        <div className="divsmall col-md-9">
                          <div className="d-flex flex-column">

                            <div className="d-flex flex-column text-center">
                              <h6 className="text-left font-weight-bold text-white">
                                {" "}
                                PLAYER A
                              </h6>
                              {card && card.length > 0
                                ? card.map((item1, index1) => {

                                  let image = require(`../CARD/CARD/${item1.C1}.png`);
                                  let image1 = require(`../CARD/CARD/${item1.C2}.png`);
                                  let image2 = require(`../CARD/CARD/${item1.C3}.png`);
                                  return (
                                    <div key={index1} className="d-flex flex-row">

                                      <Card
                                        className="card-inner"

                                      >
                                        {image ? (
                                          <img src={image} />
                                        ) : (
                                          <img src="https://dzm0kbaskt4pv.cloudfront.net/img/cards/1.png" />
                                        )}

                                      </Card>
                                      <Card
                                        className="card-inner ml-2"

                                      >
                                        {image1 ? (
                                          <img src={image1} />
                                        ) : (
                                          <img src="https://dzm0kbaskt4pv.cloudfront.net/img/cards/1.png" />
                                        )}

                                      </Card>
                                      <Card
                                        className="card-inner ml-2"

                                      >
                                        {image2 ? (
                                          <img src={image2} />
                                        ) : (
                                          <img src="https://dzm0kbaskt4pv.cloudfront.net/img/cards/1.png" />
                                        )}

                                      </Card>


                                    </div>
                                  );
                                })
                                : null}
                            </div>
                            <div className="d-flex flex-column text-center">

                              <h6 className="text-left font-weight-bold text-white mt-1">
                                {" "}
                                PLAYER B
                              </h6>
                              {card && card.length > 0
                                ? card.map((item1, index1) => {

                                  let image3 = require(`../CARD/CARD/${item1.C4}.png`);
                                  let image4 = require(`../CARD/CARD/${item1.C5}.png`);
                                  let image5 = require(`../CARD/CARD/${item1.C6}.png`);
                                  return (
                                    <div key={index1} className="d-flex flex-row">

                                      <Card
                                        className="card-inner"

                                      >
                                        {image3 ? (
                                          <img src={image3} />
                                        ) : (
                                          <img src="https://dzm0kbaskt4pv.cloudfront.net/img/cards/1.png" />
                                        )}

                                      </Card>
                                      <Card
                                        className="card-inner ml-2"

                                      >
                                        {image4 ? (
                                          <img src={image4} />
                                        ) : (
                                          <img src="https://dzm0kbaskt4pv.cloudfront.net/img/cards/1.png" />
                                        )}

                                      </Card>   <Card
                                        className="card-inner ml-2"

                                      >
                                        {image5 ? (
                                          <img src={image5} />
                                        ) : (
                                          <img src="https://dzm0kbaskt4pv.cloudfront.net/img/cards/1.png" />
                                        )}

                                      </Card>

                                    </div>
                                  );
                                })
                                : null}
                            </div>
                          </div>

                        </div>


                        <iframe
                          className="live_video ifram"
                          height="315"
                          src="http://45.79.121.125/demo/teen20/"
                          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                          allowfullscreen
                        />

                        <div className="timer_v">
                          <React.Fragment>{timer}</React.Fragment>
                        </div>
                      </div>
                      <div
                        className=" m-b-10 main-market market-bf"
                        data-marketid="1.167146463"
                      >
                        <table className="coupon-table table table-bordered bg_light">
                          <thead>
                            <tr>
                              <th> &nbsp;</th>
                              <th
                                className="text-center  box-w1 back"
                                colspan="2"
                              >
                                {" "}
                                BACK
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              casinoData && casinoData.length ?
                                casinoData.map((item, index) => {
                                  return (
                                    <tr>
                                      <td>
                                        <span>
                                          <strong>{item.nation}</strong>
                                        </span>
                                      </td>
                                      <td
                                        className={item.gstatus === "0" ? "suspended-casino back-color" : "suspendcaino1 back-color"}
                                      >
                                        <button
                                          onClick={this.handleBidClick.bind(
                                            this,
                                            "back",
                                            item.nation,
                                            item.rate,
                                            "#faa9ba",
                                            item.gstatus,
                                            item.sid
                                          )}
                                          className="bet-sec "
                                        >
                                          <span className="layprice">
                                            {" "}
                                            <b>   {item.rate ? item.rate : 0}</b>
                                          </span>
                                        </button>
                                      </td>

                                    </tr>

                                  )
                                }) : null

                            }
                          </tbody>
                        </table>
                      </div>
                      {/* <div className="">
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
                      </div> */}
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
                      <table className="table table-bordered rules-table mb-0">
                        <tbody>
                          <tr className="text-center">
                            <th colSpan={2}>Pair Plus</th>
                          </tr>
                          <tr>
                            <td width="60%">Pair (Double)</td>
                            <td>1 To 1</td>
                          </tr>

                          <tr>
                            <td width="60%">Flush (Color)</td>
                            <td>1 To 4</td>
                          </tr>

                          <tr>
                            <td width="60%">Straight (Rown)</td>
                            <td>1 To 6</td>
                          </tr>

                          <tr>
                            <td width="60%">Trio (Teen)</td>
                            <td>1 To 35</td>
                          </tr>

                          <tr>
                            <td width="60%">Straight Flush (Pakki Rown)</td>
                            <td>1 To 45</td>
                          </tr>
                        </tbody>
                      </table>
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
                <img src="/img/tp-rules.jpg" width="100%" />
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
