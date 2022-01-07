import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Moment from "moment";
import Url from "../configure/configure.js";
import Nav from "../Include/Nav";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReactPaginate from "react-paginate";
import { Button } from "react-bootstrap";
import TransactionModal from "./TransactionModal.js";
import CommissionModal from "./CommissionModal";
import "./Transactions.css";
const baseUrl = Url.baseUrl;

const $ = require("jquery");
const columns = [
  {
    dataField: "id",
    text: "Product ID",
  },
];

class Receive extends Component {
  constructor(props) {
    super(props);
    var accessToken = localStorage.getItem("token");
    this.state = {
      user_id: localStorage.getItem("user_id"),
      accessToken: accessToken,
      tabledata: "",
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
      show: false,
      userbetlist: "",
      oppningBalance: "",
      score: "",
      show1: false,
    };
  }
  componentDidMount() {
    this.userAccountStatment();
  }
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
    const { user_id } = this.state;
    let headers = {
      Authorization: "Bearer " + this.state.accessToken,
    };
    let sendData = {
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      q: this.state.q,
      user_id: user_id,
    };
    axios
      .post(baseUrl + "/transactions", sendData, { headers })
      .then((resp) => {
        let respNew = resp.data;
        if (respNew.success === true) {
          this.receivedData(respNew.showdata);
          this.setState({
            tabledata: respNew.showdata,
            respStatus: respNew.success,
          });
        }
      });
  };

  userAccountStatment() {
    let headers = {
      Authorization: "Bearer " + this.state.accessToken,
    };
    axios.get(baseUrl + "/transactionsuser", { headers }).then((resp) => {
      var respNew = resp.data;

      if (respNew.success === true) {
        this.receivedData(respNew.showdata);
      }
    });
  }

  handleChange = (event) => {
    this.setState({ q: event.target.value });
  };
  receivedData(tabledata) {
    const data = tabledata;
    const slice = data.slice(
      this.state.offset,
      this.state.offset + this.state.perPage
    );
    this.setState({
      pageCount: Math.ceil(data.length / this.state.perPage),
      isLoding: false,
      tabledata1: slice,
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
        this.userAccountStatment();
      }
    );
  };
  ModalOpen = (Data, score) => {
    if (Data && Data[0].userbet_id !== null) {
      let myData = Data.filter((item) => item.remark !== "Commission");
      this.setState({ show: true, userbetlist: myData, score: score });
    }
  };
  ModalClose = () => {
    this.setState({ show: false, userbetlist: "" });
  };
  ModalOpen1 = (Data, score) => {
    if (Data && Data[0].userbet_id !== null) {
      let myData = Data.filter((item) => item.remark === "Commission");
      this.setState({ show1: true, Commissionlist: myData, score: score });
    }
  };

  ModalClose1 = () => {
    this.setState({ show1: false, Commissionlist: "", score: "" });
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
    const { tabledata1, userbetlist, score, Commissionlist } = this.state;
    return (
      <div>
        <Nav />

        <div className="card-header3 w-100 px-2">Account Statement</div>
        <form onSubmit={this.handleSubmit} className="mt-2 px-2">
          <div className="row">
            <div className="col-6 col-md-2">
              <div className="datepicker-wrapper form-group">
                <DatePicker
                  className="form-control"
                  selected={this.state.startDate}
                  onChange={this.handleChange111}
                />
                <i className="fas fa-calendar-alt"></i>
              </div>
            </div>

            <div className="col-6 col-md-2">
              <div className="datepicker-wrapper form-group">
                <DatePicker
                  className="form-control"
                  selected={this.state.endDate}
                  onChange={this.handleChange1}
                />
                <i className="fas fa-calendar-alt"></i>
              </div>
            </div>
            <div className="col-12 col-md-2">
              <div className="select-report form-group">
                <select
                  id="bind_opt_select"
                  className="form-control"
                  name="q"
                  onChange={this.handleChange}
                >
                  <option value="1" selected="selected">
                    All
                  </option>
                  <option value="2">Deposite/Withdrow Report</option>
                  <option value="3">Game Report</option>
                </select>
              </div>
            </div>
            <div className=" col-12 col-md-2 text-center">
              <Button
                className="bg w-100 man_btn width-100"
                value="submit"
                type="submit"
                size="sm"
              >
                Submit
              </Button>
            </div>
          </div>
          <div className="d-flex flex-row justify-content-between mt-1 mb-1">
            <div>
              <span className="text text-dark">show</span>
              <button
                className="dropdown-toggle"
                type="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                50
              </button>
            </div>
            <span className="float-right">
              <span className="text text-dark">Search</span>
              <input
                type="text"
                className="form-control2 w-50"
                placeholder="Type to Search"
              />
            </span>
          </div>
        </form>
        <div className="table-responsive">
          <table className="table table-bordered1 table-striped mt-1">
            <thead>
              <tr>
                <th className="bg2 text-white text-center" scope="col">
                  Date{" "}
                </th>
                <th className="bg2 text-white" scope="col">
                  {" "}
                  Sr No.
                </th>
                <th className="text-center bg2 text-white" scope="col">
                  Credit{" "}
                </th>
                <th className="text-center bg2 text-white" scope="col">
                  Debit
                </th>
                <th className="text-center bg2 text-white" scope="col">
                  Balance
                </th>
                <th className="text-center bg2 text-white" scope="col">
                  Remark
                </th>
              </tr>
            </thead>
            <tbody>
              {tabledata1 && tabledata1.length ? (
                tabledata1.map((item, index) => {
                  return (
                    <React.Fragment>
                      <tr
                        onClick={() =>
                          this.ModalOpen(item.mergeData, item.result_score)
                        }
                      >
                        <td>
                          {" "}
                          <div className="widthcol pt-2">
                            {Moment(
                              item.createdDate ? item.createdDate : null
                            ).format("YYYY-MM-DD HH:mm")}
                          </div>
                        </td>
                        <td className="text-right">
                          <div className="widthcol1 pt-1">{index + 1}</div>
                        </td>
                        <td className="text-right">
                          {item.amount > 0 ? (
                            <strong
                              className="text-success pt-1"
                              onClick={() =>
                                this.ModalOpen(
                                  item.mergeData,
                                  item.result_score
                                )
                              }
                            >
                              {item.amount.toFixed(0)}
                            </strong>
                          ) : (
                            "-"
                          )}
                        </td>{" "}
                        <td className="text-right momemt pt-1">
                          {item.amount < 0 ? (
                            <strong
                              className="text-danger"
                              onClick={() =>
                                this.ModalOpen(
                                  item.mergeData,
                                  item.result_score
                                )
                              }
                            >
                              {item.amount.toFixed(0)}
                            </strong>
                          ) : (
                            "-"
                          )}
                        </td>
                        <td className="text-right pt-1">
                          {item.balance < 0 ? (
                            <strong className="text-danger">
                              {item.balance.toFixed(2)}
                            </strong>
                          ) : (
                            <strong className="text-success">
                              {item.balance.toFixed(2)}
                            </strong>
                          )}
                        </td>
                        <td>
                          <div className="widthcol3 pt-1 text-center">
                            {!item.remark && index === 0 ? (
                              <span className="w-100">Opening Balance </span>
                            ) : null}
                            {!item.userbet_id && !item.userbet_id
                              ? item.remark
                                ? item.remark
                                : null
                              : null}
                          </div>
                          <div className="text-capitalize widthcol3 pt-1 text-center">
                            {item.userbet_id && item.userbet_id.event_type
                              ? item.userbet_id.event_type +
                                "/" +
                                (item.userbet_id.bet_on === "fancy"
                                  ? item.userbet_id.headname +
                                    "/" +
                                    item.userbet_id.bet_on +
                                    "-" +
                                    (item.result_score
                                      ? item.result_score
                                      : " ")
                                  : item.userbet_id.match_name +
                                    "/" +
                                    item.userbet_id.bet_on)
                              : null}
                          </div>
                        </td>
                      </tr>
                      {item.amount > 0 &&
                      item.remark !== "Settelment" &&
                      index !== 0 ? (
                        <tr
                          onClick={() =>
                            this.ModalOpen1(item.mergeData, item.result_score)
                          }
                        >
                          <td>
                            {" "}
                            <div className="widthcol pt-2">
                              {Moment(
                                item.createdDate ? item.createdDate : null
                              ).format("YYYY-MM-DD HH:mm")}
                            </div>
                          </td>
                          <td className="text-right">
                            <div className="widthcol1 pt-1"></div>
                          </td>
                          <td className="text-right">
                            {item.amount > 0 ? (
                              <strong
                                className="text-success pt-1"
                                onClick={() =>
                                  this.ModalOpen(
                                    item.mergeData,
                                    item.result_score
                                  )
                                }
                              >
                                {item.amount.toFixed(0)}
                              </strong>
                            ) : (
                              "-"
                            )}
                          </td>{" "}
                          <td className="text-right momemt pt-1">
                            {item.amount < 0 ? (
                              <strong
                                className="text-danger"
                                onClick={() =>
                                  this.ModalOpen(
                                    item.mergeData,
                                    item.result_score
                                  )
                                }
                              >
                                {item.amount.toFixed(0)}
                              </strong>
                            ) : (
                              "-"
                            )}
                          </td>
                          <td className="text-right pt-1">
                            {item.balance < 0 ? (
                              <strong className="text-danger">
                                {item.balance.toFixed(2)}
                              </strong>
                            ) : (
                              <strong className="text-success">
                                {item.balance.toFixed(2)}
                              </strong>
                            )}
                          </td>
                          <td>
                            <div className="widthcol3 pt-1 text-center">
                              {!item.remark && index === 0 ? (
                                <span className="w-100">Opening Balance </span>
                              ) : null}
                              {!item.userbet_id && !item.userbet_id
                                ? item.remark
                                  ? item.remark
                                  : null
                                : null}
                            </div>
                            <div className="text-capitalize widthcol3 pt-1 text-center">
                              {item.userbet_id && item.userbet_id.event_type
                                ? item.userbet_id.event_type +
                                  "/" +
                                  (item.userbet_id.bet_on === "fancy"
                                    ? item.userbet_id.headname +
                                      "/" +
                                      item.userbet_id.bet_on +
                                      "-" +
                                      (item.result_score
                                        ? item.result_score
                                        : " ")
                                    : item.userbet_id.match_name +
                                      "/" +
                                      item.userbet_id.bet_on)
                                : null}
                            </div>
                          </td>
                        </tr>
                      ) : null}
                    </React.Fragment>
                  );
                })
              ) : (
                <tr>
                  <td colspan="7">
                    <h6 className="text-center">
                      There are no records to show
                    </h6>
                  </td>
                </tr>
              )}{" "}
            </tbody>
          </table>
        </div>
        <div className="d-flex justify-content-end">
          <ReactPaginate
            previousLabel={"prev"}
            nextLabel={"next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={this.state.pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
        </div>

        <TransactionModal
          show={this.state.show}
          userBetList={userbetlist}
          score={score}
          ModalClose={() => this.ModalClose()}
        />
        <CommissionModal
          show={this.state.show1}
          userBetList={Commissionlist}
          score={score}
          ModalClose={() => this.ModalClose1()}
        />
      </div>
    );
  }
}

export default Receive;
