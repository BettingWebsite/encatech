import React, { Component } from "react";
import Nav from "../Include/Nav";
import Footer from "../Include/footer";
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
    game_id: 2071,
    name: "Super Sic Bo",
    url_thumb: "https://cdn.hub88.io/evolution/evo_supersicbo.jpg",
  },
  {
    game_id: 2072,
    name: "Dragon Tiger",
    url_thumb: "https://cdn.hub88.io/evolution/evo_dragontiger.jpg",
  },
  {
    game_id: 2073,
    name: "Speed Baccarat A",
    url_thumb: "https://cdn.hub88.io/evolution/evo_livespeedbaccarata.jpg",
  },
  {
    game_id: 2074,
    name: "Speed Baccarat B",
    url_thumb: "https://cdn.hub88.io/evolution/evo_livespeedbaccaratb.jpg",
  },
  {
    game_id: 2075,
    name: "Speed Baccarat C",
    url_thumb: "https://cdn.hub88.io/evolution/evo_livespeedbaccaratc.jpg",
  },
  {
    game_id: 2076,
    name: "Speed Baccarat D",
    url_thumb: "https://cdn.hub88.io/evolution/evo_livespeedbaccaratd.jpg",
  },
  {
    game_id: 2077,
    name: "Speed Baccarat E",
    url_thumb: "https://cdn.hub88.io/evolution/evo_livespeedbaccarate.jpg",
  },

  {
    game_id: 2078,
    name: "Speed Baccarat F",
    url_thumb: "https://cdn.hub88.io/evolution/evo_livespeedbaccaratf.jpg",
  },
  {
    game_id: 2079,
    name: "Speed Baccarat G",
    url_thumb: "https://cdn.hub88.io/evolution/evo_livespeedbaccaratg.jpg",
  },
  {
    game_id: 2080,
    name: "Speed Baccarat H",
    url_thumb: "https://cdn.hub88.io/evolution/evo_livespeedbaccarath.jpg",
  },
  {
    game_id: 3073,
    name: "Ultimate Texas Holdem Lobby",

    url_thumb:
      "https://cdn.hub88.io/evolution/evo_ultimatetexasholdemlobby.jpg",
  },
  {
    game_id: 3074,
    name: "First Person Baccarat Lobby",
    url_thumb: "https://cdn.hub88.io/evolution/evo_firstpersonbaccarat.jpg",
  },

  {
    game_id: 3075,
    name: "Scalable Blackjack Lobby",
    url_thumb: "https://cdn.hub88.io/evolution/evo_scalableblackjacklobby.jpg",
  },

  {
    game_id: 3325,
    name: "Blackjack VIP Q",
    url_thumb: "https://cdn.hub88.io/evolution/evo_blackjackvipq.jpg",
  },

  {
    game_id: 3496,
    name: "Blackjack VIP Z",
    url_thumb: "https://cdn.hub88.io/evolution/evo_blackjackvipq.jpg",
  },

  {
    game_id: 3326,
    name: "Blackjack VIP j",
    url_thumb: "https://cdn.hub88.io/evolution/evo_blackjackvipj.jpg",
  },

  {
    game_id: 3935,
    name: "Mega Ball",
    url_thumb: "https://cdn.hub88.io/evolution/MegaBall_Thumbnail.jpg",
  },

  {
    game_id: 8941,
    name: "Blackjack VIP Gamma",
    url_thumb: "https://cdn.hub88.io/evolution/evo_blackjackvipj.jpg",
  },

  {
    game_id: 3935,
    name: "Mega Ball",
    url_thumb: "https://cdn.hub88.io/evolution/MegaBall_Thumbnail.jpg",
  },
];

class Evolution extends Component {
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
export default Evolution;
