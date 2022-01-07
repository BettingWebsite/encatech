import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Moment from "moment";
import Url from "../configure/configure.js";
import Nav from "../Include/Nav";
import Footer from "../Include/footer";
import Menu from "../Include/Menu";
import Sidebar from "../Include/Sidebar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReactPaginate from "react-paginate";
import "./Transactions.css";
import TransactionModal from "./TransactionModal.js";
import CommissionModal from "./CommissionModal";
const baseUrl = Url.baseUrl;
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
      show1: false,
      userbetlist: [],
      Commissionlist: [],
      oppningBalance: "",
      score: "",
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
  ModalOpen1 = (Data, score) => {
    if (Data && Data[0].userbet_id !== null) {
      let myData = Data.filter((item) => item.remark === "Commission");
      this.setState({ show1: true, Commissionlist: myData, score: score });
    }
  };

  ModalClose1 = () => {
    this.setState({ show1: false, Commissionlist: "", score: "" });
  };

  ModalClose = () => {
    this.setState({ show: false, userbetlist: "", score: "" });
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
        <Menu />
        <div id="wrapper">
          <Sidebar />
          <div id="content-wrapper">
            <div className="container-fluid re_man_p0">
              <div className="card">
                <div className="card-header text-white">
                  <h4>Account Statement</h4>
                </div>
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
                            className="form-control"
                            selected={this.state.endDate}
                            onChange={this.handleChange1}
                          />
                          <i className="fas fa-calendar-alt"></i>
                        </div>
                      </div>
                      <div className="col-12 col-md-2">
                        <div className="select-report  form-group">
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
                  <div>
                    {" "}
                    <div className="card-body">
                      <table id="customers">
                        <thead>
                          <tr>
                            <th className="text-center">Date </th>
                            <th className="text-right"> Sr No.</th>
                            <th className="text-right">Credit </th>
                            <th className="text-right">Debit</th>
                            <th className="text-right">Balance</th>
                            <th className="text-center">Remark</th>
                          </tr>
                        </thead>
                        <tbody>
                          {tabledata1 && tabledata1.length ? (
                            tabledata1.map((item, index) => {
                              return (
                                <React.Fragment>
                                  <tr
                                    onClick={() =>
                                      this.ModalOpen(
                                        item.mergeData,
                                        item.result_score
                                      )
                                    }
                                  >
                                    <td className="text-center momemt">
                                      {Moment(
                                        item.createdDate
                                          ? item.createdDate
                                          : null
                                      ).format("YYYY-MM-DD HH:mm")}
                                    </td>
                                    <td className="text-right">{index + 1}</td>
                                    <td className="text-right">
                                      {item.amount > 0 ? (
                                        <strong
                                          className="text-success"
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
                                    <td className="text-right momemt">
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
                                    <td className="text-right">
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
                                      <h6 className="text-center">
                                        {!item.remark && index === 0 ? (
                                          <span>Opening Balance </span>
                                        ) : null}
                                        {!item.userbet_id && !item.userbet_id
                                          ? item.remark
                                            ? item.remark
                                            : null
                                          : null}
                                      </h6>
                                      <p className="text-center text-capitalize">
                                        {item.userbet_id &&
                                        item.userbet_id.event_type
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
                                      </p>
                                    </td>
                                  </tr>
                                  {item.amount > 0 &&
                                  item.remark !== "Settelment" &&
                                  index !== 0 ? (
                                    <tr
                                      onClick={() =>
                                        this.ModalOpen1(
                                          item.mergeData,
                                          item.result_score
                                        )
                                      }
                                    >
                                      <td className="text-center momemt">
                                        {Moment(
                                          item.createdDate
                                            ? item.createdDate
                                            : null
                                        ).format("YYYY-MM-DD HH:mm")}
                                      </td>
                                      <td className="text-right">
                                      
                                      </td>
                                      <td className="text-right">
                                        {item.amount > 0 ? (
                                          <strong
                                            className="text-success"
                                            onClick={() =>
                                              this.ModalOpen1(
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
                                      <td className="text-right momemt">
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
                                      <td className="text-right">
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
                                        <h6 className="text-center">
                                          {!item.remark && index === 0 ? (
                                            <span>Opening Balance </span>
                                          ) : null}
                                          {!item.userbet_id && !item.userbet_id
                                            ? item.remark
                                              ? item.remark
                                              : null
                                            : null}
                                        </h6>
                                        <p className="text-center text-capitalize">
                                          {item.userbet_id &&
                                          item.userbet_id.event_type
                                            ? item.userbet_id.event_type +
                                              "/" +
                                              (item.userbet_id.bet_on ===
                                              "fancy"
                                                ? item.userbet_id.headname +
                                                  "/" +
                                                  item.userbet_id.bet_on +
                                                  "-" +
                                                  (item.result_score
                                                    ? item.result_score
                                                    : " ")
                                                : item.userbet_id.match_name +
                                                  "/" +
                                                  item.userbet_id.bet_on) +
                                              "/" +
                                              "Commission"
                                            : null}
                                        </p>
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
                          )}
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />

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
