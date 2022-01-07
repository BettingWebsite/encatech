import React, { Component } from "react";
import Nav from "../Include/Nav";
import Menu from "../Include/Menu";
import Sidebar from "../Include/Sidebar";
import Footer from "../Include/footer";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import Moment from "moment";
import NumberFormat from "react-number-format";
import Url from "../configure/configure.js";
const $ = window.$;
const baseUrl = Url.baseUrl;

class ChangeButtonValue extends Component {
  constructor(props) {
    super(props);
    var accessToken = localStorage.getItem("token");
    var user_id = localStorage.getItem("user_id");
    this.state = {
      accessToken: accessToken,
      collapsed: false,
      getFirstLay: false,
      getSecondBack: false,
      user_id: user_id,
      oddsfirstlay: "",
      matchids: "",
      BatAmount_second: "",
      proFitfirstval: "",
      proFitsecondval: "",
      getFancybet: false,
      getFancySecondbet: false,
      pancypickCall: false,
      value_1: "1000",
      value_2: "5000",
      value_3: "10000",
      value_4: "25000",
      value_5: "50000",
      value_6: "100000",
      value_7: "200000",
      value_8: "500000",
      value_9: "1000000",
      value_10: "2500000",
      button_1: "1000",
      button_2: "5000",
      button_3: "10000",
      button_4: "25000",
      button_5: "50000",
      button_6: "100000",
      button_7: "200000",
      button_8: "500000",
      button_9: "1000000",
      button_10: "2500000",
      respMessage: "",
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

  responseHtml = () => {
    if (this.state.respStatus === false) {
      return <div className="alert alert-danger">{this.state.respMessage}</div>;
    } else if (this.state.respStatus === true) {
      return (
        <div className="alert alert-success">{this.state.respMessage}</div>
      );
    }
  };
  getFancybet = () => {
    if (this.state.getFancybet === true) {
      return (
        <tr style={{ background: "#F3DCE2" }}>
          <td className="text-center">
            <a href="#" className="text-danger">
              {" "}
              <i className="fa fa-times"></i>{" "}
            </a>
          </td>
          <td id="team_nm">{this.state.teamname1}</td>
          <td style={{ width: "75px" }}>
            <div className="form-group">
              <input
                value={this.state.amountFancybetBal}
                name="amountFancybetBal"
                className="amountint"
                onChange={this.handleChange}
                type="number"
                style={{
                  float: "left",
                  width: "45px",
                  verticalAlign: "middle",
                }}
                id="odds"
                readOnly
                required="required"
              />
            </div>
          </td>
          <td>
            <div className="form-group bet-stake">
              <input
                value={this.state.amountFancybetFirst}
                name="amountFancybetFirst"
                type="text"
                onChange={this.handleChange}
                id="btn_val"
                style={{ width: "52px" }}
                maxLength="10"
                required="required"
              />
            </div>
          </td>{" "}
        </tr>
      );
    }
  };
  getFancybetPoint = () => {
    if (this.state.getFancybet === true) {
      return (
        <tr style={{ background: "#F3DCE2" }}>
          <td colSpan="5" style={{ padding: "5px" }} className="value-buttons">
            <button
              className="btn btn-success btn_dyn"
              value="4"
              onClick={(e) => this.onTestClickFancyFirst(e)}
            >
              4
            </button>
            <button
              className="btn btn-success btn_dyn"
              value="20"
              onClick={(e) => this.onTestClickFancyFirst(e)}
            >
              20
            </button>
            <button
              className="btn btn-success btn_dyn"
              value="30"
              onClick={(e) => this.onTestClickFancyFirst(e)}
            >
              30
            </button>
            <button
              className="btn btn-success btn_dyn"
              value="50"
              onClick={(e) => this.onTestClickFancyFirst(e)}
            >
              50
            </button>
            <button
              className="btn btn-success btn_dyn"
              value="500"
              onClick={(e) => this.onTestClickFancyFirst(e)}
            >
              500
            </button>
            <button
              className="btn btn-success btn_dyn"
              value="1000"
              onClick={(e) => this.onTestClickFancyFirst(e)}
            >
              1000
            </button>
          </td>
        </tr>
      );
    }
  };

  getFirstLayPoint = () => {
    if (this.state.getFirstLay === true) {
      return (
        <tr style={{ background: "#F3DCE2" }}>
          <td colSpan="5" style={{ padding: "5px" }} className="value-buttons">
            <button
              className="btn btn-success btn_dyn"
              value="4"
              onClick={(e) => this.onTestClick(e)}
            >
              4
            </button>
            <button
              className="btn btn-success btn_dyn"
              value="20"
              onClick={(e) => this.onTestClick(e)}
            >
              20
            </button>
            <button
              className="btn btn-success btn_dyn"
              value="30"
              onClick={(e) => this.onTestClick(e)}
            >
              30
            </button>
            <button
              className="btn btn-success btn_dyn"
              value="50"
              onClick={(e) => this.onTestClick(e)}
            >
              50
            </button>
            <button
              className="btn btn-success btn_dyn"
              value="500"
              onClick={(e) => this.onTestClick(e)}
            >
              500
            </button>
            <button
              className="btn btn-success btn_dyn"
              value="1000"
              onClick={(e) => this.onTestClick(e)}
            >
              1000
            </button>
          </td>
        </tr>
      );
    }
  };
  // getFirstLayLiability = () => {

  // 	if (this.state.getFirstLay === true) {

  // 		return (<tr style={{ background: "#F3DCE2" }}>
  // 			<td></td><td></td><td></td><td>Liability</td>
  // 			<td> {this.state.proFitfirstval}</td></tr>);
  // 	}
  // }
  getSecondLayPoint = () => {
    if (this.state.getSecondBack === true) {
      return (
        <tr style={{ background: "#BEDDF4" }}>
          <td colSpan="5" style={{ padding: "5px" }} className="value-buttons">
            <button
              className="btn btn-success btn_dyn"
              value="4"
              onClick={(e) => this.onTestClickSecond(e)}
            >
              4
            </button>
            <button
              className="btn btn-success btn_dyn"
              value="20"
              onClick={(e) => this.onTestClickSecond(e)}
            >
              20
            </button>
            <button
              className="btn btn-success btn_dyn"
              value="30"
              onClick={(e) => this.onTestClickSecond(e)}
            >
              30
            </button>
            <button
              className="btn btn-success btn_dyn"
              value="50"
              onClick={(e) => this.onTestClickSecond(e)}
            >
              50
            </button>
            <button
              className="btn btn-success btn_dyn"
              value="500"
              onClick={(e) => this.onTestClickSecond(e)}
            >
              500
            </button>
            <button
              className="btn btn-success btn_dyn"
              value="1000"
              onClick={(e) => this.onTestClickSecond(e)}
            >
              1000
            </button>
          </td>
        </tr>
      );
    }
  };
  getSecondFancybetPoint = () => {
    if (this.state.getFancySecondbet === true) {
      return (
        <tr style={{ background: "#BEDDF4" }}>
          <td colSpan="5" style={{ padding: "5px" }} className="value-buttons">
            <button
              className="btn btn-success btn_dyn"
              value="4"
              onClick={(e) => this.onTestClickFancySecond(e)}
            >
              4
            </button>
            <button
              className="btn btn-success btn_dyn"
              value="20"
              onClick={(e) => this.onTestClickFancySecond(e)}
            >
              20
            </button>
            <button
              className="btn btn-success btn_dyn"
              value="30"
              onClick={(e) => this.onTestClickFancySecond(e)}
            >
              30
            </button>
            <button
              className="btn btn-success btn_dyn"
              value="50"
              onClick={(e) => this.onTestClickFancySecond(e)}
            >
              50
            </button>
            <button
              className="btn btn-success btn_dyn"
              value="500"
              onClick={(e) => this.onTestClickFancySecond(e)}
            >
              500
            </button>
            <button
              className="btn btn-success btn_dyn"
              value="1000"
              onClick={(e) => this.onTestClickFancySecond(e)}
            >
              1000
            </button>
          </td>
        </tr>
      );
    }
  };
  // getSecondLayLiability = () => {
  // 	if (this.state.getSecondBack === true) {
  // 		return (<tr style={{ background: "#BEDDF4" }}>
  // 			<td></td><td></td><td></td><td>Liability</td>
  // 			<td>{this.state.proFitsecondval}</td></tr>);
  // 	}
  // }

  getFirstLay = () => {
    if (this.state.getFirstLay === true) {
      return (
        <tr style={{ background: "#F3DCE2" }}>
          <td className="text-center">
            <a href="#" className="text-danger">
              {" "}
              <i className="fa fa-times"></i>{" "}
            </a>
          </td>
          <td id="team_nm">{this.state.teamname1}</td>
          <td style={{ width: "75px" }}>
            <div className="form-group">
              <input
                value={this.state.lastPriceTraded1}
                name="lastPriceTraded1"
                className="amountint"
                onChange={this.handleChange}
                type="text"
                style={{
                  float: "left",
                  width: "45px",
                  verticalAlign: "middle",
                }}
                id="odds"
                required="required"
                readOnly
              />
            </div>
          </td>
          <td>
            <div className="form-group bet-stake">
              <input
                value={this.state.amountshowFirst}
                name="amountshowFirst"
                type="text"
                onChange={this.handleChange}
                id="btn_val"
                style={{ width: "52px" }}
                maxLength="10"
                required="required"
              />
            </div>
          </td>{" "}
          <td id="prft" className="text-right">
            <input
              value={this.state.proFitfirstval}
              name="proFitsecondval"
              onChange={this.handleChange}
              type="text"
              readOnly
              style={{ float: "left", width: "45px", verticalAlign: "middle" }}
            />
          </td>
        </tr>
      );
    }
  };
  getSecondBack = () => {
    if (this.state.getSecondBack === true) {
      return (
        <tr style={{ background: "#BEDDF4" }}>
          <td className="text-center">
            <a href="#" className="text-danger">
              {" "}
              <i className="fa fa-times"></i>{" "}
            </a>
          </td>
          <td id="team_nm">{this.state.teamname2}</td>
          <td style={{ width: "75px" }}>
            <div className="form-group">
              <input
                value={this.state.lastPriceTraded2}
                name="lastPriceTraded2"
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
              />
            </div>
          </td>
          <td>
            <div className="form-group bet-stake">
              <input
                id="btn_val"
                style={{ width: "52px" }}
                maxLength="10"
                value={this.state.amountshowSecond}
                type="text"
                onChange={this.handleChange}
                required="required"
              />
            </div>
          </td>
          <td id="prft" className="text-right">
            <input
              value={this.state.proFitsecondval}
              name="proFitsecondval"
              onChange={this.handleChange}
              type="text"
              readOnly
              style={{ float: "left", width: "45px", verticalAlign: "middle" }}
            />
          </td>
        </tr>
      );
    }
  };
  getFancySecondbet = () => {
    if (this.state.getFancySecondbet === true) {
      return (
        <tr style={{ background: "#BEDDF4" }}>
          <td className="text-center">
            <a href="#" className="text-danger">
              {" "}
              <i className="fa fa-times"></i>{" "}
            </a>
          </td>
          <td id="team_nm">{this.state.teamname2}</td>
          <td style={{ width: "75px" }}>
            <div className="form-group">
              <input
                value={this.state.amountFancybetBalSecond}
                name="lastPriceTraded2"
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
                readOnly
              />
            </div>
          </td>
          <td>
            <div className="form-group bet-stake">
              <input
                id="btn_val"
                style={{ width: "52px" }}
                maxLength="10"
                value={this.state.amountFancybetSecond}
                type="text"
                onChange={this.handleChange}
                required="required"
              />
            </div>
          </td>{" "}
        </tr>
      );
    }
  };

  onTestClick(e) {
    e.preventDefault();
    const buttonValue = e.target.value;
    var minusone = this.state.lastPriceTraded1 - 1;
    var multiplyval = minusone * buttonValue;
    var numValue = new Intl.NumberFormat("en-IN", {
      maximumSignificantDigits: 2,
    }).format(multiplyval);

    this.setState({
      amountshowFirst: buttonValue,
      proFitfirstval: numValue,
    });
  }
  onTestClickSecond(e) {
    e.preventDefault();
    const buttonValue = e.target.value;
    var minusone = this.state.lastPriceTraded2 - 1;
    var multiplyval = minusone * buttonValue;
    var numValue = new Intl.NumberFormat("en-IN", {
      maximumSignificantDigits: 2,
    }).format(multiplyval);

    this.setState({
      amountshowSecond: buttonValue,
      proFitsecondval: numValue,
    });
  }

  onTestClickFancyFirst(e) {
    e.preventDefault();
    const buttonValue = e.target.value;
    var minusone = this.state.lastPriceTraded1 - 1;
    var multiplyval = minusone * buttonValue;
    var numValue = new Intl.NumberFormat("en-IN", {
      maximumSignificantDigits: 2,
    }).format(multiplyval);

    this.setState({
      amountFancybetFirst: buttonValue,
    });
  }
  onTestClickFancySecond(e) {
    e.preventDefault();
    const buttonValue = e.target.value;
    var minusone = this.state.lastPriceTraded1 - 1;
    var multiplyval = minusone * buttonValue;
    var numValue = new Intl.NumberFormat("en-IN", {
      maximumSignificantDigits: 2,
    }).format(multiplyval);

    this.setState({
      amountFancybetSecond: buttonValue,
    });
  }
  cancelCourse = () => {
    window.location = "/matchdetail/" + this.state.matchids;
    //this.setState({ amountshowFirst: "", amountshowSecond: "", proFitfirstval: "", proFitsecondval: "" });
  };

  handleSubmit = (event) => {
    let headers = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    event.preventDefault();
    let savebet = {
      value_1: this.state.value_1,
      value_2: this.state.value_2,
      value_3: this.state.value_3,
      value_4: this.state.value_4,
      value_5: this.state.value_5,
      value_6: this.state.value_6,
      value_7: this.state.value_7,
      value_8: this.state.value_8,
      value_9: this.state.value_9,
      value_10: this.state.value_10,

      button_1: this.state.button_1,
      button_2: this.state.button_2,
      button_3: this.state.button_3,
      button_4: this.state.button_4,
      button_5: this.state.button_5,
      button_6: this.state.button_6,
      button_7: this.state.button_7,
      button_8: this.state.button_8,
      button_9: this.state.button_9,
      button_10: this.state.button_10,
    };
    axios
      .post(baseUrl + "/submit_button_value", savebet, { headers })
      .then((resp) => {
        if (resp.data.success === true) {
          this.setState({
            respStatus: resp.data.success,
            respMessage: resp.data.message,
          });
          //window.location.href = "/matchdetail/" + resp.data.result.matchids;
        } else {
          this.setState({
            respStatus: resp.data.success,
            respMessage: resp.data.message,
          });
        }
      });
  };

  componentDidMount() {
    let headers = {
      Authorization: "Bearer " + this.state.accessToken,
    };
    let matchid = {
      id: this.props.match.params.id,
    };

    axios.get(baseUrl + "/button_value", { headers }).then((resp) => {
      var resp = resp.data.value;

      this.setState({
        value_1: resp.value_1,
        value_2: resp.value_2,
        value_3: resp.value_3,
        value_4: resp.value_4,
        value_5: resp.value_5,
        value_6: resp.value_6,
        value_7: resp.value_7,
        value_8: resp.value_8,
        value_9: resp.value_9,
        value_10: resp.value_10,
        button_1: resp.button_1,
        button_2: resp.button_2,
        button_3: resp.button_3,
        button_4: resp.button_4,
        button_5: resp.button_5,
        button_6: resp.button_6,
        button_7: resp.button_7,
        button_8: resp.button_8,
        button_9: resp.button_9,
        button_10: resp.button_10,
      });
    });
  }

  handleChange = (event) => {
    let { name, value } = event.target;
    this.setState({ [name]: value });
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

    return (
      <div>
        <Nav />
        <Menu />
        <div id="wrapper">
          <Sidebar />
          <div id="content-wrapper">
            <div className="container-fluid re_man_p0">
              <div className="card">
                <div className="card-header breadcrumb">Set Button Value</div>
                <div className="card-body">
                  <div className="table-responsive">
                    <form onSubmit={this.handleSubmit}>
                      <table
                        id="button-value"
                        className="table table-striped table-bordered"
                        style={{ width: "100%" }}
                      >
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Button Value</th>
                            <th className="width_changebuttonvalue">
                              Button Name
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td className="form-group">
                              <input
                                className="form-control"
                                type="number"
                                name="button_1"
                                onChange={this.handleChange}
                                min="1"
                                max="99999999"
                                maxlength="9"
                                value={this.state.button_1}
                                required=""
                              />
                            </td>
                            <td className="form-group">
                              <input
                                className="form-control"
                                type="text"
                                maxlength="7"
                                onChange={this.handleChange}
                                name="value_1"
                                value={this.state.value_1}
                                required=""
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td className="form-group">
                              <input
                                className="form-control"
                                type="number"
                                min="1"
                                onChange={this.handleChange}
                                name="button_2"
                                max="99999999"
                                maxlength="9"
                                value={this.state.button_2}
                                required=""
                              />
                            </td>
                            <td className="form-group">
                              <input
                                className="form-control"
                                type="text"
                                maxlength="7"
                                onChange={this.handleChange}
                                name="value_2"
                                value={this.state.value_2}
                                required=""
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>3</td>
                            <td className="form-group">
                              <input
                                className="form-control"
                                type="number"
                                min="1"
                                onChange={this.handleChange}
                                name="button_3"
                                max="99999999"
                                maxlength="9"
                                value={this.state.button_3}
                                required=""
                              />
                            </td>
                            <td className="form-group">
                              <input
                                className="form-control"
                                type="text"
                                maxlength="7"
                                onChange={this.handleChange}
                                name="value_3"
                                value={this.state.value_3}
                                required=""
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>4</td>
                            <td className="form-group">
                              <input
                                className="form-control"
                                type="number"
                                min="1"
                                onChange={this.handleChange}
                                name="button_4"
                                max="99999999"
                                maxlength="9"
                                value={this.state.button_4}
                                required=""
                              />
                            </td>
                            <td className="form-group">
                              <input
                                className="form-control"
                                type="text"
                                maxlength="7"
                                onChange={this.handleChange}
                                name="value_4"
                                value={this.state.value_4}
                                required=""
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>5</td>
                            <td className="form-group">
                              <input
                                className="form-control"
                                type="number"
                                min="1"
                                name="button_5"
                                max="99999999"
                                maxlength="9"
                                value={this.state.button_5}
                                onChange={this.handleChange}
                                required=""
                              />
                            </td>
                            <td className="form-group">
                              <input
                                className="form-control"
                                type="text"
                                maxlength="7"
                                onChange={this.handleChange}
                                name="value_5"
                                value={this.state.value_5}
                                required=""
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>6</td>
                            <td className="form-group">
                              <input
                                className="form-control"
                                type="number"
                                min="1 "
                                name="button_6"
                                max="99999999"
                                maxlength="9"
                                value={this.state.button_6}
                                onChange={this.handleChange}
                                required=""
                              />
                            </td>
                            <td className="form-group">
                              <input
                                className="form-control"
                                type="text"
                                maxlength="7"
                                onChange={this.handleChange}
                                name="value_6"
                                value={this.state.value_6}
                                required=""
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>7</td>
                            <td className="form-group">
                              <input
                                className="form-control"
                                type="number"
                                min="1"
                                name="button_7"
                                max="99999999"
                                maxlength="9"
                                value={this.state.button_7}
                                onChange={this.handleChange}
                                required=""
                              />
                            </td>
                            <td className="form-group">
                              <input
                                className="form-control"
                                type="text"
                                maxlength="7"
                                onChange={this.handleChange}
                                name="value_7"
                                value={this.state.value_7}
                                required=""
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>8</td>
                            <td className="form-group">
                              <input
                                className="form-control"
                                type="number"
                                min="1"
                                name="button_8"
                                max="99999999"
                                maxlength="9"
                                value={this.state.button_8}
                                onChange={this.handleChange}
                                required=""
                              />
                            </td>
                            <td className="form-group">
                              <input
                                className="form-control"
                                type="text"
                                maxlength="7"
                                onChange={this.handleChange}
                                name="value_8"
                                value={this.state.value_8}
                                required=""
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>9</td>
                            <td className="form-group">
                              <input
                                className="form-control"
                                type="number"
                                min="1"
                                name="button_9"
                                max="99999999"
                                maxlength="9"
                                value={this.state.button_9}
                                onChange={this.handleChange}
                                required=""
                              />
                            </td>
                            <td className="form-group">
                              <input
                                className="form-control"
                                type="text"
                                maxlength="7"
                                onChange={this.handleChange}
                                name="value_9"
                                value={this.state.value_9}
                                required=""
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>10</td>
                            <td className="form-group">
                              <input
                                className="form-control"
                                type="number"
                                min="1"
                                onChange={this.handleChange}
                                name="button_10"
                                max="99999999"
                                maxlength="9"
                                value={this.state.button_10}
                                required=""
                              />
                            </td>
                            <td className="form-group">
                              <input
                                className="form-control"
                                type="text"
                                maxlength="7"
                                onChange={this.handleChange}
                                name="value_10"
                                value={this.state.value_10}
                                required=""
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="form-group">
                        <button className="btn btn-primary" type="submit">
                          Submit
                        </button>
                      </div>
                      {this.responseHtml()}
                    </form>
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

export default ChangeButtonValue;
