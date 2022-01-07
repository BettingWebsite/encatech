import React, { Component } from "react";
import Nav from "../Include/Nav";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import axios from "axios";
import Url from "../configure/configure.js";
import LiveStremEvolution from "./LiveStremEvolution";
import { Row, Col } from 'react-bootstrap';
import "./Loader.css";
var jwt = require("jsonwebtoken");
const baseUrl = Url.baseUrl;
const privateKey = "aIjehGjJM38oN2eg89d13voolKEhHQySurtaledrlnE";

const games = [
  {
    game_id: 3697,
    name: "Blackjack Gold 5",
    url_thumb: "https://cdn.hub88.io/ezugi/ezg_blackjackgold5.jpg",
  },

  {
    game_id: 3885,
    name: "Blackjack Platinum 1",
    url_thumb: "https://cdn.hub88.io/ezugi/ezg_blackjackplatinum1.jpg",
  },
  {
    game_id: 3886,
    name: "Blackjack 1",
    url_thumb: "https://cdn.hub88.io/ezugi/ezg_blackjack1.jpg",
  },
  {
    game_id: 3888,
    name: "Blackjack Gold 3",
    url_thumb: "https://cdn.hub88.io/ezugi/gold-bj-thumb-v2.jpg",
  },
  {
    game_id: 3891,
    name: "VIP Blackjack",
    url_thumb: "https://cdn.hub88.io/ezugi/vip-bj-thumb-v2.jpg",
  },

  {
    game_id: 3897,
    name: "Baccarat",
    url_thumb: "https://cdn.hub88.io/ezugi/ezg_baccarat.jpg",
  },

  {
    game_id: 3890,
    name: "VIP Blackjack with Surrender",
    url_thumb: "https://cdn.hub88.io/ezugi/vip-bj-surrender-thumb-v2.jpg",
  },
  {
    game_id: 3892,
    name: "Turkish Blackjack",
    url_thumb:
      "https://s3.eu-central-1.amazonaws.com/cdn.hub88.io/ezugi/ezg_turkishblackjack.jpg",
  },

  {
    game_id: 3893,
    name: "Rumba Blackjack 1",
    url_thumb: "https://cdn.hub88.io/ezugi/ezg_merengueblackjack1.jpg",
  },
  {
    game_id: 3889,
    name: "Blackjack 7",
    url_thumb:
      "https://s3.eu-central-1.amazonaws.com/cdn.hub88.io/ezugi/ezg_blackjack7.jpg",
  },

  {
    game_id: 3894,
    name: "Merengue Blackjack 2",
    url_thumb: "https://cdn.hub88.io/ezugi/ezg_merengueblackjack2.jpg",
  },
  {
    game_id: 3919,
    name: "Casino Hold'em",
    url_thumb: "https://cdn.hub88.io/ezugi/ezg_casinoholdem.jpg",
  },

  {
    game_id: 3748,
    name: "32 Cards",
    url_thumb: "https://cdn.hub88.io/ezugi/ezg_32cards-thumb.jpg",
  },
  {
    game_id: 3920,
    name: "Teen Patti",
    url_thumb: "https://cdn.hub88.io/ezugi/ezg_teenpatti.jpg",
  },
  {
    game_id: 3922,
    name: "Roulette Lobby",
    url_thumb: "https://cdn.hub88.io/ezugi/ezg_roulettelobby.jpg",
  },
];

class Ezugi extends Component {
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

  render() {
    const { result, isLoding, showLiveStrem, gameName } = this.state;

    return (
      <div>
        <Nav />
        <div>
          <ul className="nav nav-tabs nav_top_mobile">
            <li className="nav-item">
              <a href="/inplay/cricket" className="nav-link">
                In-play
            </a>
            </li>
            <li className="nav-item router-link-exact-active">
              <a href="/matches/cricket" className="nav-link">
                Sports
            </a>
            </li>
            <li className="nav-item">
              <a href="/casino" style={{ borderTop: "2px solid #fff" }} className="nav-link">
                Casino + Slot
            </a>
            </li>
            <li className="nav-item">
              <Link to="/binary" className="nav-link">
                Others
            </Link>
            </li>
          </ul>

        </div>
        <React.Fragment className="mt-5">
          <Row className="game_img_man px-3 ">
            {games && games.length ? (
              games.map((item, index) => {
                return (
                  <Col xs={4} key={index}>
                    <span className="game_img">
                      <img
                        src={item.url_thumb}
                        className="img-fluid"
                        alt="img"
                        onClick={() => {
                          this.liveStremModalOpen(item.game_id, item.name);
                        }}
                        style={{ height: "100px", width: "150px" }}
                      />{" "}
                      <div className="casino-name"> {item.name}</div>
                    </span>
                  </Col>
                );
              })
            ) : (
              <Col><h1 className="text-white">wait for responce</h1></Col>
            )}
          </Row>

        </React.Fragment>


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
export default Ezugi;
