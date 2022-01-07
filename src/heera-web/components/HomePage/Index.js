import React, { Component, useEffect, useState } from "react";
import Nav from "../Include/Nav";
import Menu from "../Include/Menu";
import Footer from "../Include/footer";
import Sidebar from "../Include/Sidebar";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import Moment from "moment";
import LiveGame from "../vip casino/LiveGame";
import * as signalR from '@aspnet/signalr';

class Index extends Component {

  constructor(props) {
    super(props);
    var accessToken = localStorage.getItem("token");
    this.state = {
      accessToken: accessToken,
      gotoindex: false,
      loading: true,
      session_id: "",
      isLoading: true,
      tableData: [],
      isActive: "cricket",
      bookingMessage: '',
      bookingHubConnection: null,
      dataFromSigalR: new Map()
    };
    this.timer = null;
    this.connection = null;
    this.getDataFromSignalR = this.getDataFromSignalR.bind(this);
  }



  componentDidMount() {
    let _this = this;
    const url = window.location.pathname;
    const urlSplit = url.split("/");
    let isActive = urlSplit[urlSplit.length - 1];
    this.setState({ isActive: urlSplit[urlSplit.length - 1] })


    if (this.props.match.params.id === undefined) {
      this.setState({ gotoindex: true });
    }

    this.getOddsValue(this.props.match.params.id);

    var vUri = "http://a112.thebetmarket.com/SignalR";
    this.connection = new signalR.HubConnectionBuilder().withUrl(vUri).build();
    this.connection.on('Connected', function (vobj) {
      console.log('connected: ', vobj);
    });
    this.connection.on('DSRate', function (marketrate) {
      //populate data:
      let oldData = _this.state.dataFromSigalR;
      let siObject = _this._collectSelectionItem(marketrate);
      oldData.set(siObject.key, siObject.value);
      _this.setState({ dataFromSigalR: oldData });
    });
    this.connection.start();
    _this.timer = setInterval(() => {
      _this.getDataFromSignalR();
    }, 5000);
  }

  _collectSelectionItem(matchItem) {
    let match_id = matchItem.mi;
    let match_Arrays = matchItem.rt;
    let siSet = {};
    for (let j = 0; j < match_Arrays.length; j++) {
      const item = match_Arrays[j];
      let obj = { re: item.re, rv: item.rv, pr: item.pr, pt: item.pt };
      let value = siSet[item.si];
      if (value) {
        if (!value['back'] && item.ib) {
          value['back'] = obj;
        }
        else if (!value['lay'] && !item.ib) {
          value['lay'] = obj;
        }
      } else {
        let value = {};
        if (item.ib) {
          value['back'] = obj;
        } else {
          value['lay'] = obj;
        }
        siSet[item.si] = value;
      }
    }
    return {
      key: match_id,
      value: siSet
    };
  }

  componentWillUnmount() {
    if (this.connection)
      this.connection.stop();
    if (this.timer)
      clearInterval(this.timer);
  }

  getOddsValue = (matchName) => {


    let headers = {
      Authorization: "Bearer " + this.state.accessToken,
    };
    axios.get(`http://api.encabook999.com/cricket_data/${matchName}`, { headers })
      .then((response) => {
        // localStorage.setItem(matchName, JSON.stringify(response.data));
        // let myData = response.data.filter(item => item.InPlay === true)
        let myData = response.data;
        this.setState({ tableData: myData })
      });
  }

  getDataFromSignalR() {
    let myData = this.state.tableData;
    let pmids = [];
    if (myData && myData.length > 0) {
      for (let i = 0; i < myData.length; i++) {
        const element = myData[i];
        if (element.odds) {
          pmids.push(element.odds.pmid);
        }
      }
    }
    //call to signalR:
    let stringIds = pmids.join(',');
    this.connection.invoke("ConnectDSRate", stringIds);
  }
  goToIndex = () => {
    if (this.state.gotoindex === true) {
      return <Redirect to="/matches/cricket" />;
    }
  };
  _renderBackLay(item) {
    let realTimeData = this.state.dataFromSigalR.get(item.odds.pmid);
    //console.log('data from signalR: ', realTimeData);
    let firstColumns = realTimeData ? realTimeData[Object.keys(realTimeData)[0]] : null;
    let secondColumns = realTimeData ? realTimeData[Object.keys(realTimeData)[1]] : null;
    let xColumns = realTimeData ? realTimeData[Object.keys(realTimeData)[2]] : null;
    return <span className="d-flex flex-row  justify-content-end game">
      <div className="d-flex flex-row align-items-center">

        {item.InPlay === true ? <i class="fas fa-circle text-success fa-lg mr-2" /> : null}

        {item.icon_status && item.icon_status.tv && item.icon_status.tv === "Tv" ? <i className="fa fa-tv mr-2"></i> : null}

        {item.icon_status && item.icon_status.bm && item.icon_status.bm === "BM" ? <img src='/img/bm.png' height='15' width='20' className="mr-2" /> : null}

        {item.icon_status && item.icon_status.fancy && item.icon_status.fancy === "Fancy" ? <img src='/img/f.png' height='15' width='20' className="mr-2" /> : null}

      </div>
      <button className="back btn_web">
        <span className="odd"        >
          {firstColumns && firstColumns['back'] ? firstColumns['back'].re : "-"}
        </span>
      </button>
      <button className="lay btn_web">
        <span className="odd" >
          {firstColumns && firstColumns['lay'] ? firstColumns['lay'].re : "-"}
        </span>{" "}
      </button>{" "}
      <button className="back btn_web">
        <span className="odd" >
          {xColumns && xColumns['back'] ? xColumns['back'].re : "-"}
        </span>{" "}
      </button>
      <button className="lay btn_web">
        {" "}
        <span className="odd" >
          {xColumns && xColumns['lay'] ? xColumns['lay'].re : "-"}
        </span>{" "}
      </button>{" "}
      <button className="back  btn_web">
        {" "}
        <span className="odd" >
          {secondColumns && secondColumns['back'] ? secondColumns['back'].re : "-"}
        </span>{" "}
      </button>{" "}
      <button className="lay  btn_web">
        {" "}
        <span className="odd">
          {secondColumns && secondColumns['lay'] ? secondColumns['lay'].re : "-"}
        </span>{" "}
      </button>{" "}
    </span>
  }
  render() {
    var accessToken = this.state.accessToken;

    var session_id = localStorage.getItem("session_id");
    if (accessToken === "" || accessToken === null) {
      return <Redirect to="/login" />;
    }
    var change_password = localStorage.getItem("change_password");
    if (change_password != "" && change_password != null) {
      return <Redirect to="/change_password" />;
    }

    var htmlData123 = (
      <div className="row game_img_man">
        <div className="col-12">
          <h4 className="hadding2">Live Casino</h4>
        </div>
        <LiveGame />
      </div>
    );
    const { tableData, isActive } = this.state;
    return (
      <div>
        {this.goToIndex()}
        <Nav />
        <Menu />
        <div id="wrapper">
          <Sidebar />
          <div id="content-wrapper">
            <div className="container-fluid">
              <ul
                role="tablist"
                id="home-events"
                className="nav nav-tabs m-b-20"
                style={{ marginTop: "2px" }}
              >
                <li className="nav-item text-left">
                  <a href="/matches/soccer" className={`nav-link ${isActive === "soccer" ? 'link2' : ''}`}>
                    Football
                  </a>
                </li>
                <li className="nav-item text-left">
                  <a href="/matches/tennis" className={`nav-link ${isActive === "tennis" ? 'link2' : ''}`}>
                    Tennis
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/matches/cricket" className={`nav-link ${isActive === "cricket" ? 'link2' : ''}`}>
                    Cricket
                  </a>
                </li>
                <li className="nav-item text-left">
                  <a href="/matches/Ice-Hockey" className={`nav-link ${isActive === "Ice-Hockey" ? 'link2' : ''}`}>
                    Ice Hockey
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/matches/volleyball" className={`nav-link ${isActive === "volleyball" ? 'link2' : ''}`}>
                    Volleyball
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/matches/basketball" className={`nav-link ${isActive === "basketball" ? 'link2' : ''}`}>
                    Basketball
                  </a>
                </li>
                <li className="nav-item text-left">
                  <a href="/matches/table-tennis" className={`nav-link ${isActive === "table-tennis" ? 'link2' : ''}`}>
                    Table Tennis
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/matches/Darts" className={`nav-link ${isActive === "Darts" ? 'link2' : ''}`}>
                    Darts
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/matches/Badminton" className={`nav-link ${isActive === "Badminton" ? 'link2' : ''}`}>
                    Badminton
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/matches/Kabaddi" className={`nav-link ${isActive === "Kabaddi" ? 'link2' : ''}`}>
                    Kabaddi
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/matches/Boxing" className={`nav-link ${isActive === "Boxing" ? 'link2' : ''}`}>
                    Boxing
                  </a>
                </li>
                <li className="nav-item text-left">
                  <a href="/matches/Mixed-Martial-Arts" className={`nav-link ${isActive === "Mixed-Martial-Arts" ? 'link2' : ''}`}>
                    Mixed Martial Arts
                  </a>
                </li>
                <li className="nav-item text-left">
                  <a href="/matches/Motor-Sport" className={`nav-link ${isActive === "Motor-Sport" ? 'link2' : ''}`}>
                    Motor Sport
                  </a>
                </li>
              </ul>

              <div className="tab-content">
                <div id="home" className="tab-pane active">

                  <div className="coupon-card coupon-card-first">
                    <div className="card-content" id="home_match_data">
                      <div className="table-responsive">
                        <table class="table">
                          <tr>
                            <th colSpan={4} className="game1">Game</th>
                            <th></th>
                            <th colSpan={1} className="text-center game1">1</th>
                            <th colSpan={1} className="text-center game1">x</th>
                            <th colSpan={1} className="text-center game1">2</th>
                          </tr>

                          <tbody>

                            {
                              tableData && tableData.length ? (
                                tableData.map((item, index) => {
                                  return (
                                    <tr>
                                      <td colSpan={3}>

                                        <div>

                                          <Link
                                            to={{
                                              pathname:
                                                "/matchdetail/" +
                                                item.match_id +
                                                "/" +
                                                item.sport_type + "/"
                                                +
                                                item.open_date +
                                                "/"+item.odds.pmid
                                            }}
                                          >
                                            <div className="text-dark"> {item.match_name ? item.match_name : null}/   {Moment(item.open_date ? item.open_date : null).format("lll")} (IST){" "}</div>

                                          </Link>
                                        </div>{" "}
                                      </td>
                                      <td>

                                      </td>
                                      <td colSpan={4}>
                                        {
                                          this._renderBackLay(item)
                                        }
                                      </td>
                                    </tr>
                                  );
                                })
                              ) : (
                                <tr><td colSpan={13} className="game norecords">No real-time records found</td></tr>
                              )
                            }
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <button onClick={this.getDataFromSignalR}>Test SignalR</button> */}
              {htmlData123}

            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

export default Index;
