import React, { Component } from "react";
import Nav from "../Include/Nav";
import Menu from "../Include/Menu";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import Moment from "moment";
import { Row, Col } from "react-bootstrap";
import LiveGame from "../vip casino/LiveGame";
const baseUrl = "http://api.encabook999.com:4000";
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
    };
  }

  componentDidMount() {
    const url = window.location.pathname;
    const urlSplit = url.split("/");
    let isActive = urlSplit[urlSplit.length - 1];
    this.setState({ isActive: urlSplit[urlSplit.length - 1] });
    if (this.props.match.params.id === undefined) {
      this.setState({ gotoindex: true });
    }
    // if (isActive === "cricket") {
    //   let tableData = localStorage.getItem(isActive);
    //   if (tableData) {
    //     this.setState({ tableData: JSON.parse(tableData) })
    //   }
    //   else {
    //     this.getOddsValue(this.props.match.params.id);
    //   }
    // }
    // else if (isActive === "soccer") {
    //   let tableData = localStorage.getItem(isActive);
    //   if (tableData) {
    //     this.setState({ tableData: JSON.parse(tableData) })
    //   }
    //   else {
    //     this.getOddsValue(this.props.match.params.id);
    //   }
    // }
    // else if (isActive === "tennis") {
    //   let tableData = localStorage.getItem(isActive);
    //   if (tableData) {
    //     this.setState({ tableData: JSON.parse(tableData) })
    //   }
    //   else {
    //     this.getOddsValue(this.props.match.params.id);
    //   }
    // }
    this.getOddsValue(this.props.match.params.id);

  }

  getOddsValue = (matchName) => {
    let headers = {
      Authorization: "Bearer " + this.state.accessToken,
    };
    axios.get(`http://api.encabook999.com/cricket_data/${matchName}`, { headers })
      .then((response) => {
        // localStorage.setItem(matchName, JSON.stringify(response.data));
        this.setState({ tableData: response.data })
      });
  }
  goToIndex = () => {
    if (this.state.gotoindex === true) {
      return <Redirect to="/matches/cricket" />;
    }
  };

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
    const { tableData } = this.state;
    return (
      <div>
        {this.goToIndex()}
        <Nav /> 
        <Menu />
        <div id="content-wrapper">
          <div className="home_mobile">
            <div className="tab-content">
              {
                tableData && tableData.length ? (
                  tableData.map((item, index) => {
                    return (
                      <Row className="w-100" key={index}>
                        <Col xs={9}>
                          <div className="game-name d-flex flex-column mt-2 px-3 w-100">

                            <Link
                              to={{
                                pathname:
                                  "/matchdetail/" +
                                  item.match_id +
                                  "/" +
                                  item.sport_type + "/" +
                                  item.open_date

                              }}
                            >

                              <b className="game-name "> {item.match_name ? item.match_name : null}</b>
                            </Link>

                            <span className="moment">    {Moment(item.open_date ?
                              item.open_date : null).format("lll")} (IST)
                                        </span>

                          </div>{" "}
                        </Col>
                        <Col xs={3}>
                          <div className="d-flex flex-row-reverse bd-highlight w-100 mt-2 px-2">


                            {item.InPlay === true ? <i className="fas fa-circle mt-1 activeicon mr-1" /> : null}

                            {item.icon_status && item.icon_status.tv && item.icon_status.tv === "Tv" ? <i className="fa fa-tv mr-1" /> : null}

                            {item.icon_status && item.icon_status.bm && item.icon_status.bm === "BM"
                              ? <img src='/img/casino/ic_bm.png' height='15' width='20' className="mr-1" /> : null}
                            {item.icon_status && item.icon_status.fancy && item.icon_status.fancy === "Fancy" ? <img src='/img/casino/ic_fancy.png' height='15' width='20' className="mr-1" /> : null}

                          </div>
                        </Col>

                        <Col lg={12}>
                          <div className="d-flex flex-row justify-content-around textmenu px-3">
                            <span>1</span>
                            <span>X</span>
                            <span>2</span>
                          </div>
                          <div className="d-flex flex-row px-3">
                            <button className="back btn_mobile">
                              <span
                                className="odd"
                              >
                                {item.odds && item.odds[0] && item.odds[0].BackPrice1 ? item.odds[0].BackPrice1 :
                                  "-"}
                              </span>
                            </button>
                            <button className="lay btn_mobile">
                              <span className="odd" >

                                {item.odds && item.odds[0] && item.odds[0].LayPrice1 ? item.odds[0].LayPrice1 :
                                  "-"}
                              </span>{" "}
                            </button>{" "}
                            <button className="back btn_mobile">
                              <span className="odd" >

                                {item.odds && item.odds[2] && item.odds[2].BackPrice1 ? item.odds[2].BackPrice1 :
                                  "-"}
                              </span>{" "}
                            </button>
                            <button className="lay btn_mobile">
                              {" "}
                              <span className="odd" >
                                {item.odds && item.odds[2] && item.odds[2].LayPrice1 ? item.odds[2].LayPrice1 :
                                  "-"}
                              </span>{" "}
                            </button>{" "}
                            <button className="back btn_mobile">
                              {" "}
                              <span className="odd">

                                {item.odds && item.odds[1] && item.odds[0].BackPrice1 ? item.odds[1].BackPrice1 :
                                  "-"}
                              </span>{" "}

                            </button>{" "}
                            <button className="lay btn_mobile">
                              {" "}
                              <span className="odd">
                                {item.odds && item.odds[1] && item.odds[0].LayPrice1 ? item.odds[1].LayPrice1 :
                                  "-"}
                              </span>{" "}
                            </button>{" "}
                          </div>

                          <hr></hr>
                        </Col>
                      </Row>
                    );
                  })
                ) : (
                  <Row className="w-100">
                    <Col xs={12} className="bg4 text-center">

                      <div className="profit font-weight-normal mt-1 mb-1"> No real-time  records found!</div></Col></Row>
                )
              }

            <div>
              <h5 className="px-3 mt-2"><b>LIVE CASINO</b></h5>
              <LiveGame /></div>
            
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Index;
