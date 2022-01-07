import React, { Component } from "react";
import Nav from "../Include/Nav";
import Menu from "../Include/Menu";
import Footer from "../Include/footer";
import Sidebar from "../Include/Sidebar";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import Url from "../configure/configure.js";
import LiveStremEvolution from "./LiveStremEvolution";

import { Card, Row, Col } from "react-bootstrap";
import "./Loader.css";
var jwt = require("jsonwebtoken");
const baseUrl = Url.baseUrl;
const privateKey = "aIjehGjJM38oN2eg89d13voolKEhHQySurtaledrlnE";

const games = [
  {
    game_id: 2150,
    name: "20=20 Poker",
    url_thumb: "/img/casino/2020poker.jfif",
    url: "casino/poker20",
  },
  {
    game_id: 2338,
    name: "One Day Poker",
    url_thumb: "/img/casino/1daypoker.jfif",
    url: "poker",
  },
  {
    game_id: 2338,
    name: "6 Player Poker",
    url_thumb: "/img/casino/6playerpoker.jfif",
    url: "poker",
  },
  // {
  //   game_id: 2338,
  //   name: "Poker Lobby",
  //   url_thumb: "https://cdn.hub88.io/evolution/evo_pokerlobby.jpg",
  // },
  // {
  //   game_id: 2150,
  //   name: "Live Poker",
  //   url_thumb: "https://cdn.hub88.io/evolution/evo_2handcasinoholdem.jpg",
  // },
];

class Poker extends Component {
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
      token1: "",
    };
  }

  componentDidMount() {
    let headers = {
      Authorization: "Bearer " + this.state.accessToken,
    };

    axios.get(baseUrl + "/user_curr_balance", { headers }).then((resp) => {
      var respNew = resp.data;
      this.setState({
        username: respNew.adminlist[0].username,
      });
    });

    this.setState({
      lobby_url: window.location.href,
      token: uuidv4(),
    });
    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      this.setState({ platform: "GPL_MOBILE" });
    } else {
      this.setState({ platform: "GPL_DESKTOP" });
    }
    this.getIpAddress();
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
  liveStremModalOpen = (id, name) => {
    this.setState({ showLiveStrem: true, gameName: name }, () =>
      this.saveToken(id)
    );
  };
  liveStremModalClose = () => {
    this.setState(
      { showLiveStrem: false, game_id: "", gameName: "", result: "" },
      () => this.expaireToken()
    );
  };

  saveToken = async (id) => {
    this.setState({ isLoding: true });
    const { token, username } = this.state;
    const data = {
      username: username,
      token: token,
      game_id: id,
      expired: "N",
    };
    let signature = await jwt
      .sign(data, privateKey, { algorithm: "HS256", expiresIn: 60 })
      .toString("base64");
    await axios({
      method: "get",
      url: "http://18.168.89.144/production/api/v2/save_token",
      responseType: "stream",
      headers: { "X-Casino-Signature": signature },
    });
    this.getUrl(id);

    this.setState({ isLoding: false });
  };
  getUrl = async (id) => {
    this.setState({ isLoding: true });
    const { token, lobby_url, ip, platform, username } = this.state;
    const data = {
      user: username,
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
  expaireToken = async () => {
    const { token } = this.state;
    const data = {
      token: token,
    };
    let signature = await jwt
      .sign(data, privateKey, { algorithm: "HS256", expiresIn: 60 })
      .toString("base64");
    await axios({
      method: "get",
      url: "http://18.168.89.144/production/api/v2/expire_token",
      headers: { "X-Casino-Signature": signature },
    });
  };

  EzugiLobiToken = async () => {
    const { token1 } = this.state;
    axios.post("http://51.140.207.82:8080/auth/internal/launch-token", {
      username: "andrew111@gmail.com",
      password: "idldewm1ng"
    })
      .then((response) => {
        this.setState({ token1: response.data.playerTokenAtLaunch })
        this.getEzugiLobi();
      }, (error) => {
        console.log(error);
      });
  }
  getEzugiLobi() {
    const { token1 } = this.state;
    let partner_id = '1001';
    axios.get(`https://api.dreamcasino.live/ez/games/launch?token=${token1}&partner_id=${partner_id}`)

  }


  render() {
    const { result, isLoding, showLiveStrem, gameName, token1 } = this.state;
    let partner_id = '1001';
    return (
      <div>
        <Nav />
        <Menu />
        <div id="wrapper">
          <Sidebar />
          <div id="content-wrapper">
            {token1 ? (
              <Row>
                <Col lg={12}>

                  <iframe
                    src={
                      `https://api.dreamcasino.live/ez/games/launch?token=${token1}&partner_id=${partner_id}`
                    }
                    width="100%"
                    height="600px"
                  ></iframe>
                </Col></Row>) : (
              <div>
                <Row className="mt-3">

                  {games && games.length ? (
                    games.map((item, index) => {
                      return (
                        <Col lg={3} className="px-3 mt-3">
                          <Card
                            // onClick={() => {
                            //   this.liveStremModalOpen(item.game_id, item.name);
                            // }}
                          >
                            <a href= {`/${item.url}`}>
                            <img
                              src={item.url_thumb}
                              className="img-fluid"
                              alt="img"
                              // onClick={() => {
                              //   this.liveStremModalOpen(item.game_id, item.name);
                              // }}
                            /></a>{" "}
                          </Card>
                        </Col>
                      );
                    })
                  ) : (
                    <h1 className="text-white">wait for responce</h1>
                  )}
                </Row>
                {/* <Row>
                  <Col lg={4} className="px-3 mt-3">
                    <Card
                      onClick={() => {
                        this.EzugiLobiToken();
                      }}
                    >
                      <Card.Img
                        src="https://dzm0kbaskt4pv.cloudfront.net/v1/static/img/livecasino/euzgi_casino.png"
                        height="180px"
                      />

                      <Card.Footer
                        className="text-center"
                        style={{ backgroundColor: "#000000" }}
                      >
                        <small className="text-white">Ezugi CASINO</small>
                      </Card.Footer>
                    </Card>

                  </Col>
                </Row>*/}
                </div>)} 
          </div>
        </div>

        <Footer />

        <LiveStremEvolution
          show={showLiveStrem}
          handleCloseModel={() => this.liveStremModalClose()}
          result={result}
          isLoding={isLoding}
          gameName={gameName}
        />
      </div>
    );
  }
}
export default Poker;
