import React, { Component } from "react";
import Nav from "../Include/Nav";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Moment from "moment";
import DataTable, { createTheme } from "react-data-table-component";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "react-bootstrap";
const $ = window.$;
const baseUrl = "http://api.encabook999.com:4000";

createTheme("solarized", {
  text: {
    primary: "#268bd2",
    secondary: "#2aa198",
  },
  background: {
    default: "#002b36",
  },
  context: {
    background: "#cb4b16",
    text: "#FFFFFF",
  },
  divider: {
    default: "#073642",
  },
  action: {
    button: "rgba(0,0,0,.54)",
    hover: "rgba(0,0,0,.08)",
    disabled: "rgba(0,0,0,.12)",
  },
});

const columns = [
  {
    name: "NO",
    selector: "s_no",
    sortable: true,
  },
  {
    name: "Event Name",
    selector: "event_name",
    sortable: true,
  },
  {
    name: "Nation",
    selector: "team_name",
    sortable: true,
  },
  {
    name: "Event Type",
    selector: "event_type",
    sortable: true,
  },
  {
    name: "Market Name",
    selector: "team_name1",
    sortable: true,
  },
  {
    name: "Side",
    selector: "bet_type",
    sortable: true,
  },
  {
    name: "Rate",
    selector: "rate",
    sortable: true,
  },
  {
    name: "Amount",
    selector: "stake",
    sortable: true,
  },

  ,
  {
    name: "Place Date",
    selector: "created",
    sortable: true,
  },
  {
    name: "Match Date",
    selector: "matchDate",
    sortable: true,
  },
];

class MyBetList extends Component {
  constructor(props) {
    super(props);
    var accessToken = localStorage.getItem("token");
    this.state = {
      accessToken: accessToken,
      betDataFound: false,
      gotoindex: false,
      getResults11: "",
      startDate: new Date(),
      endDate: new Date(),
      getResults: [],
    };
  }
  goToIndex = () => {
    if (this.state.gotoindex === true) {
      return <Redirect to="/matches/4" />;
    }
  };
  componentDidMount() {
    this.callMyBetList();

    let headers = {
      Authorization: "Bearer " + this.state.accessToken,
    };
  }

  handleSubmit = (event) => {
    let headers = {
      Authorization: "Bearer " + this.state.accessToken,
    };
    let sendData = {
      type_data: this.state.type_data,
    };
    event.preventDefault();
    axios
      .post(baseUrl + "/api/userbetlist_new", sendData, { headers })
      .then((resps) => {

        var respNew = resps.data;

        if (respNew.success === true) {
          this.setState({ getResults: respNew.showdata, betDataFound: true });
        } else {
          this.setState({ getResults: [] });
        }
      });
  };

  handleChange111 = (date) => {
    this.setState({
      startDate: date,
    });
  };
  handleChange1 = (date) => {
    this.setState({
      endDate: date,
    });
  };

  handleChange123 = (event) => {
    this.setState({ type_data: event.target.value });
  };
  callMyBetList = () => {
    let headers = {
      Authorization: "Bearer " + this.state.accessToken,
    };
    axios.get(baseUrl + "/api/userbetlist_new", { headers }).then((resp) => {
      var resps = resp.data;
      if (resps.success === true) {
        this.setState({ getResults: resps.Betlist, betDataFound: true });
      }
    });
  };

  deleteBet = (event_id) => {
    let headers = {
      Authorization: "Bearer " + this.state.accessToken,
    };
    axios
      .get(baseUrl + "/api/delete_bet_list/" + event_id, { headers })
      .then((resp) => {
        var resps = resp.data;

        this.setState({ getResults11: resps.message });
      });
  };
  showTableHtml = () => {
    if (this.state.betDataFound === true) {
      const html = [];
      for (var i = 0; i < this.state.getResults.length; i++) {
        var value = this.state.getResults[i];

        var mainHtml = {
          s_no: i + 1,
          event_name: value.event_name,
          team_name: value.team_name,
          event_type: value.event_type,
          team_name1: value.team_name,
          bet_type: value.bet_type,
          rate: value.odds,
          amount: value.amount,
          created: Moment(value.createdDate).format("lll"),
          matchDate: value.matchDate
            ? Moment(value.matchDate).format("lll")
            : "",
        };

        html.push(mainHtml);
      }

      return <DataTable columns={columns} data={html} pagination={true} />;
    }
  };
  //this.deleteBet(e.target.value)
  submit = (e) => {
    var value = e.target.value;
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.deleteBet(value),
        },
        {
          label: "No",
        },
      ],
    });
  };

  render() {
    var accessToken = this.state.accessToken;

    if (accessToken === "" || accessToken === null) {
      return <Redirect to="/login" />;
    }
    var change_password = localStorage.getItem("change_password");
    if (change_password != "" && change_password != null) {
      return <Redirect to="/change_password" />;
    }
    const { getResults } = this.state;
    return (
      <div>
        {this.goToIndex()}
        <Nav />
        <div className="card-header3 w-100 px-2">
          Un-Setteled Bet
						</div>

        <form onSubmit={this.handleSubmit} className="mt-2 px-1">
          <div className="select-report d-inline-block pto form-group">
            <select
              id="bind_opt_select"
              className="form-control1"
              required
              name="type_data"
              onChange={this.handleChange123}
            >
              <option value="">Please Select</option>
              <option value="match">Match</option>
              <option value="delete">Deleted</option>
            </select>
          </div>
          <div className="d-inline-block ml-2">
            <Button className="bg w-100 man_btn width-100" value="submit" type="submit" size="sm">Submit</Button>
          </div>
        </form>
        <table className="table table-bordered1 table-sm mt-2">
          <thead>
            <tr>
              <th scope="col" className="bg2 text-white text-center moment">No</th>
              <th scope="col" className="bg2  text-white text-center moment">Event Name</th>
              <th scope="col" className="bg2  text-white text-center moment">Nation</th>
              {/* <th scope="col" className="bg2  text-white text-center">Event Type</th> */}
              <th scope="col" className="bg2  text-white text-center moment">Side</th>
              <th scope="col" className="bg2  text-white text-center moment">Rate</th>
              <th scope="col" className="bg2  text-white text-center moment">Amount</th>
              <th scope="col" className="bg2  text-white text-center moment">Place Date</th>
            </tr>
          </thead>
          <tbody>
            {
              getResults && getResults.length ? (
                getResults.map((item, index) => {
                  return (
                    
                    <tr key={index} className={item.bet_type ==="back" ||item.no ==="yes" ? "back" : "lay"}>

                      <td className="text-center moment">
                        {index + 1}
                      </td>
                      <td className="moment">
                        {item.event_name}
                      </td>
                      <td className="moment">
                        {item.team_name}
                      </td>
                      <td className="moment">
                        {
                          item.bet_type
                        }
                      </td>
                      <td className="moment">
                        {item.odds}
                      </td>

                      <td className="moment">
                        {item.stake}
                      </td>
                      <td className="moment">

                        {Moment(item.createdDate).format('L')}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr><td colspan="7"><h6 className="text-center">Not found</h6></td></tr>
              )
            }
          </tbody>
        </table>

      </div>

    );
  }
}

export default MyBetList;
