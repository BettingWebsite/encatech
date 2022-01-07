import React, { Component } from "react";
import axios from "axios";
import "./Graph.css";

class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: [],
      team1: "",
      team2: "",
      innings: "",
      Boller: "",
      batting: {},
      bowling: {},
      currantRate: "",
      requiredRate: "",
      matchId: "",
    };
  }

  componentDidMount() {
    const matchId = this.props.gameID;
    this.getGraphData(matchId);
    this.setState({ matchId: this.props.gameID });
    this.interval = setInterval(() => {
      const { matchId } = this.state;
      this.getGraphData(matchId);
    }, 2000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getGraphData = async (matchId) => {
    await axios({
      method: "get",
      url: `https://cric.dreamcasino.live/sportsdata/?mid=${matchId}`,
    }).then((res) => {
      let result1 =
        res.data &&
        res.data.result &&
        res.data.result &&
        res.data.result[0].data &&
        res.data.result[0].data.match
          ? res.data.result[0].data.match
          : [];
      let currantRate =
        result1 && result1.current_run_rate ? result1.current_run_rate : "";

      let requiredRate =
        result1 && result1.required_run_rate ? result1.required_run_rate : "";
      let result2 =
        res.data &&
        res.data.result &&
        res.data.result &&
        res.data.result[0].data &&
        res.data.result[0].data.events[0]
          ? res.data.result[0].data.events[0]
          : [];
      let teams = result1;
      result1 && result1.teams && result1.teams.home ? result1.teams.home : {};
      let team1 =
        result1 &&
        result1.teams &&
        result1.teams.home &&
        result1.teams.home.name
          ? result1.teams.home.name
          : "";
      let teamID =
        result1 && result1.teams && result1.teams.home && result1.teams.home.uid
          ? result1.teams.home.uid
          : "";
      let team2 =
        result1 &&
        result1.teams &&
        result1.teams.away &&
        result1.teams.away.name
          ? result1.teams.away.name
          : "";
      let innings =
        result1 && result1.resultinfo && result1.resultinfo.innings
          ? result1.resultinfo.innings
          : {};
      let Boller =
        result2 && result2.bowling && result2.bowling.bowler
          ? result2.bowling.bowler
          : {};

      let bowling = result2 && result2.bowling ? result2.bowling : {};
      let batting = result2 && result2.batting ? result2.batting : {};

      if (innings[1].team === "home") {
        let team1Over = innings[1] && innings[1].overs ? innings[1].overs : 0;
        let team1Runs = innings[1] && innings[1].runs ? innings[1].runs : 0;
        let team1Wickets =
          innings[1] && innings[1].wickets ? innings[1].wickets : 0;
        this.setState({
          team1Over,
          team1Runs,
          team1Wickets,
        });
      }
      if (innings[2].team === "away") {
        let team2Over = innings[2] && innings[2].overs ? innings[2].overs : 0;
        let team2Runs = innings[2] && innings[2].runs ? innings[2].runs : 0;
        let team2Wickets =
          innings[2] && innings[2].wickets ? innings[2].wickets : 0;
        this.setState({
          team2Over,
          team2Runs,
          team2Wickets,
        });
      }

      this.setState({
        team1,
        team2,
        currantRate,
        requiredRate,
      });
    });
  };
  render() {
    const {
      team1Over,
      team1Runs,
      team1Wickets,
      team2Over,
      team2Runs,
      team2Wickets,
      currantRate,
      requiredRate,
    } = this.state;
    return (
      <div style={{ height: "200px", backgroundColor: "#456625" }}>
        <div
          style={{ height: "40px", backgroundColor: "#334932" }}
          className="d-flex flex-row"
        >
          <h6 className="text-white text-left mt-2">
            <b>
              {" "}
              {this.state.team1 ? this.state.team1 : null} vs{" "}
              {this.state.team2 ? this.state.team2 : null}
            </b>
          </h6>
        </div>
        <table class="table table-sm">
          <thead className="table-borderless th1">
            <tr>
              <th scope="col" className="th1">
                <span>Teams</span>
              </th>
              <th scope="col" className="th1">
                <span>Runs</span>
              </th>
              <th scope="col" className="th1">
                <span>Over</span>
              </th>
              <th scope="col" className="th1">
                <span>Wickets</span>
              </th>
            </tr>
          </thead>
          <tbody className="text-white mt-3">
            <tr>
              <td className="text-white td1">
                {this.state.team1 ? this.state.team1 : null}
              </td>

              <td className="td1">{team1Runs ? team1Runs : 0}</td>
              <td className="td1">{team1Over ? team1Over : 0}</td>
              <td className="td1">{team1Wickets ? team1Wickets : 0}</td>
            </tr>
            <tr>
              <td className="text-white td1">
                {this.state.team2 ? this.state.team2 : null}
              </td>
              <td className="td1">
                {team2Runs && team2Runs > 0 ? (
                  <strong className="text-white">
                    {team2Runs ? team2Runs : 0}
                  </strong>
                ) : (
                  <strong className="text-muted">
                    {team2Runs ? team2Runs : 0}
                  </strong>
                )}
              </td>
              <td className="td1">{team2Over ? team2Over : 0}</td>

              <td className="td1">
                {team2Wickets && team2Wickets > 0 ? (
                  <strong className="text-white">
                    {team2Wickets ? team2Wickets : 0}
                  </strong>
                ) : (
                  <strong className="text-muted">
                    {team2Wickets ? team2Wickets : 0}
                  </strong>
                )}
              </td>
            </tr>
          </tbody>
        </table>
        <div className="mt-2 px-5">
          <table class="table table-sm">
            <thead className="table-borderless th1">
              <tr>
                <th scope="col" className="th1">
                  <span>Batsman</span>
                </th>
                <th scope="col" className="th1">
                  <span>Bowler</span>
                </th>
                <th scope="col" className="th1">
                  <span>Currant Run Rate </span>
                </th>

                <th scope="col" className="th1">
                  <span>Required Run Rate </span>
                </th>
              </tr>
            </thead>
            <tbody className="text-white mt-3">
              <tr>
                <td className="td1"></td>
                <td className="td1"></td>
                <td className="td1">{currantRate ? currantRate : 0}</td>
                <td className="td1">{requiredRate}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="divsmall d-flex justify-content-center w-100">
          <img src="https://widgets.sir.sportradar.com/assets/f33297c14fdeca117d2e82a0d233f44d.png" />
        </div>
      </div>
    );
  }
}

export default Graph;
