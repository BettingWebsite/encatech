import React, { Component } from "react";
import Nav from "../Include/Nav";
import Menu from "../Include/Menu";
import Footer from "../Include/footer";
import Sidebar from "../Include/Sidebar";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import Url from "../configure/configure.js";
import Iframe from "react-iframe";
import "./Loader.css";
var jwt = require("jsonwebtoken");
const baseUrl = Url.baseUrl;
const privateKey = "aIjehGjJM38oN2eg89d13voolKEhHQySurtaledrlnE";

class LiveGame1 extends Component {
  constructor(props) {
    super(props);
    var accessToken = localStorage.getItem("token");
    this.state = {
      isLoding: false,
      token: "",
      platform: "",
      lang: "",
      ip: "",
      game_id: "",
      currency: "",
      country: "",
      lobby_url: "",
      result: "",
      showLiveStrem: false,
      accessToken: accessToken,
      username: "",
    };
  }

  componentDidMount() {
    const { game_id } = this.props.match.params;
    this.setState({ game_id: game_id });
    let headers = {
      Authorization: "Bearer " + this.state.accessToken,
    };
    axios.get(baseUrl + "/user_curr_balance", { headers }).then((resp) => {
      var respNew = resp.data;
      const username = respNew.adminlist[0].username;
      this.setState({
        username: respNew.adminlist[0].username,
      });
    });
    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      this.setState({ platform: "GPL_MOBILE" });
    } else {
      this.setState({ platform: "GPL_DESKTOP" });
    }
    this.getIpAddress();
    this.saveToken(game_id);
  }

  getIpAddress = async () => {
    const response = await axios({
      url: "https://geoip-db.com/json/",
      method: "get",
    });
    if (response) {
      this.setState({
        ip: response.data.IPv4,
      });
    }
  };

  saveToken = async (game_id) => {
    this.setState({ isLoding: true });
    const { token, username } = this.state;
    const data = {
      username: "peace",
      token: uuidv4(),
      game_id: game_id,
      expired: "N",
    };
console.log("savetoken",data);
    let signature = await jwt
      .sign(data, privateKey, { algorithm: "HS256", expiresIn: 60 })
      .toString("base64");
    await axios({
      method: "get",
      url: "http://18.168.89.144/production/api/v2/save_token",
      responseType: "stream",
      headers: { "X-Casino-Signature": signature },
    });
    this.getUrl(game_id);
    this.setState({ isLoding: false });
  };
  getUrl = async (id) => {
    this.setState({ isLoding: true });
    const { token, lobby_url, ip, platform, username } = this.state;
    const data = {
      user: "peace",
      token: token,
      partner_id: "heeraexch",
      platform: platform,
      lobby_url: lobby_url,
      lang: "en",
      ip: ip,
      game_id: id,
    };
    let signature = await jwt
      .sign(data, privateKey, { algorithm: "HS256", expiresIn: 60 })
      .toString("base64");
    await axios({
      method: "get",
      url: "http://18.168.89.144/production/api/v2/game/url",
      responseType: "stream",
      headers: { "X-Casino-Signature": signature },
    }).then((res) => {
      this.setState({
        result: res,
      });
    });

    this.setState({ isLoding: false });
  };
  //   expaireToken = async () => {
  //     const { token } = this.state;
  //     const data = {
  //       token: token,
  //     };
  //     let signature = await jwt
  //       .sign(data, privateKey, { algorithm: "HS256", expiresIn: 60 })
  //       .toString("base64");
  //     await axios({
  //       method: "get",
  //       url: "http://18.168.89.144/production/api/v2/expire_token",
  //       headers: { "X-Casino-Signature": signature },
  //     });
  //   };

  render() {
    const { result } = this.state;
    return (
      <div>
        <Nav />
        <Menu />
        <div id="wrapper">
          <Sidebar />
          <div id="content-wrapper">
            <div className="px-5">
              <Iframe
              url={
                result && result.data && result.data.url ? result.data.url : null
              }
                height="500"
                width="100%"
                id="myId"
                className="myClassname"
                display="initial"
                position="relative"
                allowfullscreen
              />
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}
export default LiveGame1;
