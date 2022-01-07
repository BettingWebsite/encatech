/* eslint-disable */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Url from "../configure/configure";
import moment from "moment";
const baseUrl = Url.baseUrl;
const $ = window.$;
class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      position: "left",
      noOverlay: true,
      matchData: "",
      matchName: "",
      matchData1: "",
      matchData1: "",
      matchName2: "",
      loader: false,
      admin_text: "",
      isLoding: false,
      token: "",
      platform: "",
      lang: "",
      ip: "",
      game_id: "",
      lobby_url: "",
      result: "",
      showLiveStrem: false,
      accessToken: localStorage.getItem("token"),
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();

    $(".blockUI").show();

    let headers = {
      Authorization: "Bearer " + this.state.accessToken,
    };

    axios
      .get(baseUrl + "/usermatch_serieslist/cricket", { headers })
      .then((resp) => {
        var resp = resp.data;
        //console.log(resp);

        this.setState({ matchData: resp.data });
        const items2 = [];
        for (var index = 0; index < this.state.matchData.length; index++) {
          items2.push(this.state.matchData[index].series_id);
        }
        this.handleSubmitMatchname(items2);
      });
    var match = localStorage.getItem("match");
    if (match != undefined) {
      localStorage.setItem("match", parseInt(match) + parseInt(1));
    } else {
      localStorage.setItem("match", 1);
    }
  };

  handleSubmitMatchname = (value) => {
    var match = localStorage.getItem("match");

    if (match <= 1 || match === undefined) {
      let headers = {
        Authorization: "Bearer " + this.state.accessToken,
      };

      let sendData = {
        event_id: value.toString(),
      };

      $(".blockUI").show();

      axios
        .post(baseUrl + "/partiuser_match_deatils/cricket", sendData, {
          headers,
        })
        .then((resp) => {
          var resp = resp.data;
          this.setState({ matchName: resp.data });
        });
    }
  };

  showTableHtml1 = (series_id) => {
    const items1 = [];

    if (this.state.matchName != undefined) {
      for (var a = 0; a < this.state.matchName.length; a++) {
        for (var b = 0; b < this.state.matchName[a].length; b++) {
          var value = this.state.matchName[a][b];

          if (series_id == value.series_id) {
            items1.push(
              <li>
                {moment(value.open_date).format("LL")}
                <div className="expander" />
                <ul>
                  <li>{value.match_name}</li>
                  <div className="expander" />
                  <ul>
                    <li>
                      <Link
                        to={"/matchdetail/" + value.match_id + "/" + "cricket"}
                      >
                        MATCH_ODDS
                      </Link>
                    </li>
                  </ul>
                </ul>
              </li>
            );
          }
        }
      }
      $(".blockUI").hide();
    }

    return items1;
  };

  showTableHtml = () => {
    const items = [];

    for (var a = 0; a < this.state.matchData.length; a++) {
      items.push(
        <li>
          {this.state.matchData[a].series_name}
          <div className="expander" />
          <ul>{this.showTableHtml1(this.state.matchData[a].series_id)}</ul>
        </li>
      );
    }
    return <ul>{items}</ul>;
  };

  handleSubmitSoccer = (event) => {
    event.preventDefault();

    $(".blockUI").show();
    let headers = {
      Authorization: "Bearer " + this.state.accessToken,
    };
    axios
      .get(baseUrl + "/usermatch_serieslist/soccer", { headers })
      .then((resp) => {
        var resp = resp.data;
        //console.log(resp);

        this.setState({ matchData1: resp.data });
        const items2 = [];
        for (var index = 0; index < this.state.matchData1.length; index++) {
          items2.push(this.state.matchData1[index].series_id);
        }
        this.handleSubmitMatchnameSoccer(items2);
      });
    var match = localStorage.getItem("match1");
    if (match != undefined) {
      localStorage.setItem("match1", parseInt(match) + parseInt(1));
    } else {
      localStorage.setItem("match1", 1);
    }
  };

  handleSubmitMatchnameSoccer = (value) => {
    var match = localStorage.getItem("match1");

    if (match <= 1 || match === undefined) {
      let headers = {
        Authorization: "Bearer " + this.state.accessToken,
      };

      let sendData = {
        event_id: value.toString(),
      };

      $(".blockUI").show();
      axios
        .post(baseUrl + "/api/partiuser_match_deatils/soccer", sendData, {
          headers,
        })
        .then((resp) => {
          var resp = resp.data;
          this.setState({ matchName1: resp.data });
        });
    }
  };

  showTableHtmlSoccer1 = (series_id) => {
    const items1 = [];

    if (this.state.matchName1 != undefined) {
      for (var a = 0; a < this.state.matchName1.length; a++) {
        for (var b = 0; b < this.state.matchName1[a].length; b++) {
          var value = this.state.matchName1[a][b];

          if (series_id == value.series_id) {
            items1.push(
              <li>
                {moment(value.open_date).format("LL")}
                <div className="expander" />
                <ul>
                  <li>{value.match_name}</li>
                  <div className="expander" />
                  <ul>
                    <li>
                      <Link
                        to={"/matchdetail/" + value.match_id + "/" + "soccer"}
                      >
                        MATCH_ODDS
                      </Link>
                    </li>
                  </ul>
                </ul>
              </li>
            );
          }
        }
        $(".blockUI").hide();
      }
    }

    return items1;
  };

  showTableHtmlSoccer = () => {
    const items = [];

    for (var a = 0; a < this.state.matchData1.length; a++) {
      items.push(
        <li>
          {this.state.matchData1[a].series_name}
          <div className="expander" />
          <ul>
            {this.showTableHtmlSoccer1(this.state.matchData1[a].series_id)}
          </ul>
        </li>
      );
    }
    return <ul>{items}</ul>;
  };

  handleSubmitTennis = (event) => {
    event.preventDefault();

    $(".blockUI").show();

    let headers = {
      Authorization: "Bearer " + this.state.accessToken,
    };
    axios
      .get(baseUrl + "/api/usermatch_serieslist/tennis", { headers })
      .then((resp) => {
        var resp = resp.data;
        //console.log(resp);

        this.setState({ matchData2: resp.data });
        const items2 = [];
        for (var index = 0; index < this.state.matchData2.length; index++) {
          items2.push(this.state.matchData2[index].series_id);
        }
        this.handleSubmitMatchnameTennis(items2);
      });
    var match = localStorage.getItem("match2");
    if (match != undefined) {
      localStorage.setItem("match2", parseInt(match) + parseInt(1));
    } else {
      localStorage.setItem("match2", 1);
    }
  };

  handleSubmitMatchnameTennis = (value) => {
    var match = localStorage.getItem("match2");

    if (match <= 1 || match === undefined) {
      let headers = {
        Authorization: "Bearer " + this.state.accessToken,
      };

      let sendData = {
        event_id: value.toString(),
      };

      $(".blockUI").show();
      axios
        .post(baseUrl + "/api/partiuser_match_deatils/tennis", sendData, {
          headers,
        })
        .then((resp) => {
          var resp = resp.data;
          this.setState({ matchName2: resp.data });
        });
    }
  };

  showTableHtmlTennis1 = (series_id) => {
    const items1 = [];

    if (this.state.matchName2 != undefined) {
      for (var a = 0; a < this.state.matchName2.length; a++) {
        for (var b = 0; b < this.state.matchName2[a].length; b++) {
          var value = this.state.matchName2[a][b];

          if (series_id == value.series_id) {
            items1.push(
              <li>
                {moment(value.open_date).format("LL")}
                <div className="expander" />
                <ul>
                  <li>{value.match_name}</li>
                  <div className="expander" />
                  <ul>
                    <li>
                      <Link
                        to={"/matchdetail/" + value.match_id + "/" + "tennis"}
                      >
                        MATCH_ODDS
                      </Link>
                    </li>
                  </ul>
                </ul>
              </li>
            );
          }
        }
        $(".blockUI").hide();
      }
    }

    return items1;
  };

  showTableHtmlTennis = () => {
    const items = [];
    if (this.state.matchData2 != undefined) {
      for (var a = 0; a < this.state.matchData2.length; a++) {
        items.push(
          <li>
            {this.state.matchData2[a].series_name}
            <div className="expander" />
            <ul>
              {this.showTableHtmlTennis1(this.state.matchData2[a].series_id)}
            </ul>
          </li>
        );
      }
    }

    return <ul>{items}</ul>;
  };
  render() {
    const { result, showLiveStrem, isLoding } = this.state;
    var sports_casino21 = (
      <li className="nav-item nav-link">
        <div className="expander"></div>
        <Link to="/matches/cricket">Table Tennis</Link>
      </li>
    );
    var sports_casino22 = (
      <li className="nav-item nav-link">
        <div className="expander"></div>
        <Link to="/matches/cricket">Darts</Link>
      </li>
    );
    var sports_casino23 = (
      <li className="nav-item nav-link">
        <div className="expander"></div>{" "}
        <Link to="/matches/cricket">Badminton</Link>
      </li>
    );
    var sports_casino24 = (
      <li className="nav-item nav-link">
        <div className="expander"></div>
        <Link to="/matches/cricket">Basketball</Link>
      </li>
    );
    var sports_casino25 = (
      <li className="nav-item nav-link">
        <div className="expander"></div>
        <Link to="/matches/cricket">Volleyball</Link>
      </li>
    );
    var sports_casino26 = (
      <li className="nav-item nav-link">
        <div className="expander"></div>
        <Link to="/">Ice Hockey</Link>
      </li>
    );
    var sports_casino27 = (
      <li className="nav-item nav-link">
        <div className="expander"></div>
        <Link to="/matches/cricket">
          <span>Baccarat</span>
        </Link>
      </li>
    );
    var sports_casino28 = (
      <li className="nav-item nav-link">
        <div className="expander"></div>
        <Link to="/matches/cricket">
          <span>Politics</span>
        </Link>
      </li>
    );
    // var sports_casino29 = (
    //   <li className="nav-item nav-link">
    //     <div className="expander"></div>
    //     <Link to="/matches/cricket">
    //       <span>Kabaddi</span>
    //     </Link>
    //   </li>
    // );
    var sports_casino30 = (
      <li className="nav-item nav-link">
        <div className="expander"></div>
        <Link to="/matches/cricket">
          <span>Boxing</span>
        </Link>
      </li>
    );
    var sports_casino31 = (
      <li className="nav-item nav-link">
        <div className="expander"></div>
        <Link to="/matches/cricket">
          <span>Mixed Martial Arts</span>
        </Link>
      </li>
    );
    var sports_casino32 = (
      <li className="nav-item nav-link">
        <div className="expander"></div>
        <Link to="/matches/cricket">
          <span>Motor Sports</span>
        </Link>
      </li>
    );
    var sports_casino1 = (
      <li
        className="nav-item"
        // onClick={() => {
        //   this.liveStremModalOpen(2668);
        // }}
      >
        <Link to="/roulette" className="nav-link">
          <span className="newlacunch-menu">Roulette (vip)</span>
        </Link>
      </li>
    );
    var sports_casino2 = (
      <li
        className="nav-item"
        // onClick={() => {
        //   this.liveStremModalOpen(3929);
        // }}
      >
        <Link to="/andar-bahar" className="nav-link">
          <span className="" style={{ cursor: "pointer" }}>
            Andar Bahar
          </span>
        </Link>
      </li>
    );
    var sports_casino3 = (
      <li
        className="nav-item"
        // onClick={() => {
        //   this.liveStremModalOpen(9013);
        // }}
      >
        <Link to="/roulette" className="nav-link">
          <span style={{ cursor: "pointer" }}>Roulette</span>
        </Link>
      </li>
    );
    var sports_casino4 = (
      <li
        className="nav-item"
        // onClick={() => {
        //   this.liveStremModalOpen(3924);
        // }}
      >
        <Link to="/blackjack" className="nav-link">
          <span className="" style={{ cursor: "pointer" }}>
            BlackJack
          </span>
        </Link>
      </li>
    );
    var sports_casino5 = (
      <li
        className="nav-item"
        // onClick={() => {
        //   this.liveStremModalOpen(2900);
        // }}
      >
        <Link to="/blackjack" className="nav-link">
          <span className="" style={{ cursor: "pointer" }}>
            Speed Blackjack B
          </span>
        </Link>
      </li>
    );
    var sports_casino6 = (
      <li
        className="nav-item"
        // onClick={() => {
        //   this.liveStremModalOpen(3926);
        // }}
        style={{ cursor: "pointer" }}
      >
        <Link to="/lottery" className="nav-link">
          <span className=""> Lottery</span>
        </Link>
      </li>
    );
    var sports_casino7 = (
      <li
        className="nav-item"
        // onClick={() => {
        //   this.liveStremModalOpen(2651);
        // }}
        style={{ cursor: "pointer" }}
      >
        <Link to="/baccarat" className="nav-link">
          <span className=""> Baccarat</span>
        </Link>
      </li>
    );
    var sports_casino8 = (
      <li
        className="nav-item"
        // onClick={() => {
        //   this.liveStremModalOpen(2072);
        // }}
        style={{ cursor: "pointer" }}
      >
        <Link to="/dragontiger" className="nav-link">
          <span className=""> Dragon Tiger</span>
        </Link>
      </li>
    );
    var sports_casino9 = (
      <li
        className="nav-item"
        // onClick={() => {
        //   this.liveStremModalOpen(3920);
        // }}
      >
        <Link to="/teen-patti" className="nav-link">
          <span className="">Teen Patti</span>
        </Link>
      </li>
    );
    var sports_casino10 = (
      <li className="nav-item">
        <Link to="/bigbash" class="nav-link">
          <span className="newlacunch-menu">Bigbash</span>
        </Link>
      </li>
    );
    var sports_casino11 = (
      <li className="nav-item">
        <Link to="/binary" className="nav-link">
          <span className=""> Binary</span>
        </Link>
      </li>
    );
    var sports_casino12 = (
      <li className="nav-item">
        <Link to="/slots" className="nav-link">
          <span className="">Slots</span>
        </Link>
      </li>
    );

    var sports_casino13 = (
      <li className="nav-item">
        <Link to="/vip-casino" className="nav-link">
          <span className="newlacunch-menu">Live CASINO</span>
        </Link>
      </li>
    );

    var sports_casino14 = (
      <li className="nav-item ">
        <Link to="/euzgi_casino" className="nav-link">
          <span className="">Kabaddi</span>
        </Link>
      </li>
    );

    return (
      <ul className="sidebar navbar-nav">
        <li>
          <div
            data-toggle="collapse"
            data-target=".casino"
            className="sidebar-title all_sp font-weight-normal"
            aria-expanded="true"
          >
            Others
          </div>
          <nav className="casino collapse show">
            <ul class="left_ul">
              {sports_casino1}
              {sports_casino2}
              {sports_casino3}
              {sports_casino4}
              {sports_casino5}
              {sports_casino6}
              {sports_casino7}
              {sports_casino8}
              {sports_casino9}
              {/* {sports_casino10} */}
              {sports_casino11}
              {sports_casino12}
              {sports_casino13}
              {/* {sports_casino14} */}
            </ul>
          </nav>
        </li>
        <li
          class="nav-item all_sp"
          data-toggle="collapse"
          data-target=".casino2"
          className="sidebar-title all_sp font-weight-normal"
          aria-expanded="true"
        >
          All Sports
        </li>
        <li className="casino2 collapse show">
          <ul className="tree">
            <li>
              Cricket
              <div
                className="expander"
                id="cricket"
                onClick={this.handleSubmit}
              />
              {this.showTableHtml()}
            </li>
            <li>
              Football
              <div
                className="expander"
                id="Soccer"
                onClick={this.handleSubmitSoccer}
              />
              {this.showTableHtmlSoccer()}
            </li>

            <li>
              Tennis
              <div
                className="expander"
                id="tennis"
                onClick={this.handleSubmitTennis}
              />
              {this.showTableHtmlTennis()}
            </li>

            {sports_casino21}
            {sports_casino22}
            {sports_casino23}
            {sports_casino24}
            {sports_casino25}
            {sports_casino26}
            {sports_casino27}
            {sports_casino28}
            {/* {sports_casino29} */}
            {sports_casino30}
            {sports_casino31}
            {sports_casino32}
          </ul>
        </li>
      </ul>
    );
  }
}

export default Sidebar;
