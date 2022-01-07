import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Footer from "../Include/footer";
import Nav from "../Include/Nav";
import Menu from "../Include/Menu";
import Sidebar from "../Include/Sidebar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReactPaginate from "react-paginate";

class Receive extends Component {
  constructor(props) {
    super(props);
    var accessToken = localStorage.getItem("token");
    this.state = {
      accessToken: accessToken,
      tabledata: [],
      respStatus: false,
      startDate: new Date(),
      endDate: new Date(),
      responsedData: [],
      html11: "",
      q: "",
      offset: 0,
      data: [],
      perPage: 10,
      currentPage: 0,
      isLoding: false,
    };
  }

  componentDidMount() {
    this.setState({ isLoding: true });
    this.UserData();
  }
  UserData = () => {
    this.setState({ isLoding: true });
    let headers = {
      Authorization: "Bearer " + this.state.accessToken,
    };
    axios.get("http://api.encabook999.com/user_profit_loss/", { headers }).then((resp) => {
      var respNew = resp.data;
      if (resp.data.stat === true) {
        this.setState({ tabledata: respNew.bet_record, isLoding: false });
      } else {
        this.setState({ isLoding: false });
      }
    });

  }
  receivedData(tabledata1) {
    const data = tabledata1;
    const slice = data.slice(
      this.state.offset,
      this.state.offset + this.state.perPage
    );
    this.setState({
      pageCount: Math.ceil(data.length / this.state.perPage),
      tabledata: slice
    });
  }
  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;
    this.setState(
      {
        currentPage: selectedPage,
        offset: offset,
      },
      () => {
        this.UserData();
      }
    );
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

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ isLoding: true });
    let headers = {
      Authorization: "Bearer " + this.state.accessToken,
    };
    let sendData = {
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      q: 3,
    };
    axios
      .post("http://api.encabook999.com/user_profit_loss/", sendData, { headers })
      .then((resp) => {
        var respNew = resp.data;
        if (resp.data.stat===true) {
          this.setState({ tabledata: respNew.bet_record, isLoding: false });
        }
      });
  };
  handleChange = (event) => {
    this.setState({ q: event.target.value });
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
    const { tabledata, isLoding } = this.state;
    return (
      <div>
        <Nav />
        <Menu />
        <div id="wrapper">
          <Sidebar />
          <div id="content-wrapper">
            <div className="container-fluid re_man_p0">
              <div className="card">
                <div className="card-header breadcrumb">Profit Loss</div>
                <div className="card-body">
                  <form onSubmit={this.handleSubmit}>
                    <div className="row">
                      <div className="col-6 col-md-2">
                        <div className="datepicker-wrapper form-group">
                          <DatePicker
                            selected={this.state.startDate}
                            onChange={this.handleChange111}
                          />
                          <i className="fas fa-calendar-alt"></i>
                        </div>
                      </div>
                      <div className=" col-md-111 re_none tc mt-2 ">
                        <span className="">to</span>
                      </div>
                      <div className="col-6 col-md-2">
                        <div className="datepicker-wrapper form-group">
                          <DatePicker
                            selected={this.state.endDate}
                            onChange={this.handleChange1}
                          />
                          <i className="fas fa-calendar-alt"></i>
                        </div>
                      </div>
                      <div className=" col-12 col-md-2">
                        <button
                          className="btn btn-primary modb"
                          value="submit"
                          type="submit"
                        >
                          Submit
                          </button>
                      </div>
                    </div>
                  </form>
                  <div className="table-responsive dot_table">
                    <table id="customers1">
                      <thead>
                        <tr>
                          <th className="text-center">Event Type</th>
                          <th className="text-center">Event Name	</th>
                          <th className="text-center">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tabledata
                          ? Object.entries(tabledata).map(([key, value]) => {
                            return (
                              <tr className={value.profit_loss>0?"back" : "lay"}>
                                <td className="text-center">
                                  {value.event_type}
                                </td>
                                <td className="text-center">
                                  {value.match_name}
                                </td>
                                <td className="text-center">

                                  {
                                    value.profit_loss > 0
                                      ? (
                                        <strong className="text-success">
                                          {value.profit_loss.toFixed(0)}
                                        </strong>
                                      ) : (
                                        <strong className="text-danger">
                                          {value.profit_loss.toFixed(0)}
                                        </strong>
                                      )
                                  }
                                </td></tr>
                            )
                          })
                          : (

                            <tr>
                              <td colspan="6"><h5
                                className="text-center pt-2 pb-2">
                                {isLoding === true ? (
                                  <i
                                    className="fa fa-spinner fa-spin fa-fw fa-2x"
                                  />
                                ) : (<h6 className="text-center">There are no records to show</h6>
                                )}</h5>
                              </td>
                            </tr>
                          )}

                        {/* 
                        {
                          tabledata && tabledata.length ? (
                            tabledata.map((item, index) => {
                              total = total + item.amount;
                              return (
                                <tr key={index}>
                                  <td className="text-center">
                                    {item.userbet_id && item.userbet_id.event_name ? item.userbet_id.event_name : null}
                                  </td>
                                  <td className="text-center">
                                    {item.userbet_id && item.userbet_id.
                                      event_name ? item.userbet_id.
                                      event_name : null}
                                  </td>
                                  <td className="text-center">
                                    {
                                      item.amount < 0 || item.remark === "loss"
                                        ? (
                                          <strong className="text-danger">
                                            {item.amount.toFixed(0)}
                                          </strong>
                                        ) : (
                                          <strong className="text-success">
                                            {item.amount.toFixed(0)}
                                          </strong>
                                        )
                                    }
                                  </td>
                                </tr>
                              );
                            })
                          ) : (
                            <tr><td colspan="6"><h6
                              className="text-center">There are no records to show</h6></td></tr>
                          )
                        } */}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

export default Receive;
