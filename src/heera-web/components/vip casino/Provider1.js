import React, { Component } from "react";
import Nav from "../Include/Nav";
import Menu from "../Include/Menu";
import Footer from "../Include/footer";
import Sidebar from "../Include/Sidebar";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import Moment from "moment";
import LiveGame from "../vip casino/LiveGame";
class Provider1 extends Component {
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
    this.getOddsValue(this.props.match.params.id);
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

    var htmlData123 = (
      <div className="row game_img_man">
        {/* <div className="col-12">
          <h4 className="hadding2">Live Casino</h4>
        </div> */}
        <LiveGame />
      </div>
    );
    const { tableData, isActive } = this.state;
    return (
      <div>
        <Nav />
        <Menu />
        <div id="wrapper">
          <Sidebar />
          <div id="content-wrapper">
            <div className="container-fluid">
          
              {htmlData123}

            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

export default Provider1;
