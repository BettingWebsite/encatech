import React, { Component } from "react";
import Nav from "../Include/Nav";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
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
    game_id: 2643,
    name: "Roulette (low-roller)",
    url_thumb:
      "https://cdn.coingaming.io/casino-hub88/superspadeclub/roulette-lowroller-thumb.jpg",
  },
  {
    game_id: 2649,
    name: "Baccarat 2 (vip)",
    url_thumb:
      "https://cdn.coingaming.io/casino-hub88/superspadeclub/baccarat-vip-2.jpg",
  },
  {
    game_id: 2651,
    name: "Baccarat 2 (regular)",
    url_thumb:
      "https://cdn.coingaming.io/casino-hub88/superspadeclub/baccarat-regular-2.jpg",
  },
  {
    game_id: 2650,
    name: "Baccarat 2 (high-roller)",
    url_thumb:
      "https://cdn.coingaming.io/casino-hub88/superspadeclub/baccarat-highroller-2.jpg",
  },
  {
    game_id: 2652,
    name: "Baccarat 2 (low-roller)",
    url_thumb:
      "https://cdn.coingaming.io/casino-hub88/superspadeclub/baccarat-lowroller-2.jpg",
  },
  {
    game_id: 2655,
    name: "Super Spade Club Lobby",
    url_thumb:
      "https://cdn.coingaming.io/casino-hub88/superspadeclub/super-spade-games-lobby-thumb.jpg",
  },
  {
    game_id: 2656,
    name: "Speed Andar Bahar (vip)",
    url_thumb:
      "https://cdn.coingaming.io/casino-hub88/superspadeclub/andarbahar-vip-thumb.jpg",
  },
  {
    game_id: 2658,
    name: "Speed Andar Bahar (high-roller)",
    url_thumb:
      "https://cdn.coingaming.io/casino-hub88/superspadeclub/andarbahar-highroller-thumb.jpg",
  },
  {
    game_id: 2659,
    name: "Speed Andar Bahar (low-roller)",
    url_thumb:
      "https://cdn.coingaming.io/casino-hub88/superspadeclub/andarbahar-lowroller-thumb.jpg",
  },
  {
    game_id: 2666,
    name: "Dragon Tiger (vip)",
    url_thumb:
      "https://cdn.coingaming.io/casino-hub88/superspadeclub/dragontiger-vip-thumb.jpg",
  },
  {
    game_id: 9061,
    name: "NC Baccarat 1",
    url_thumb: "https://cdn.hub88.io/superspadeclub/ssc_ncbaccarat.jpg",
  },
  {
    game_id: 9062,
    name: "NC Baccarat 2",
    url_thumb: "https://cdn.hub88.io/superspadeclub/ssc_ncbaccarat2.jpg",
  },
  {
    game_id: 9065,
    name: "NC Baccarat 3",
    url_thumb: "https://cdn.hub88.io/superspadeclub/ssc_ncbaccarat3.jpg",
  },
  {
    game_id: 8,
    name: "Book of Oz",
    url_thumb: "https://cdn.hub88.io/microgaming/mgg_bookofoz.jpg",
  },
  {
    game_id: 9,
    name: "108 Heroes Multiplier Fortunes",
    url_thumb:
      "https://cdn.hub88.io/microgaming/mgg_108heroesmultiplierfortunes.jpg",
  },

  {
    game_id: 12,
    name: "5 Reel Drive",
    url_thumb: "https://cdn.hub88.io/microgaming/mgg_5reeldrive.jpg",
  },

  {
    game_id: 15,
    name: "Adelia The Fortune Wielder",
    url_thumb:
      "https://cdn.hub88.io/microgaming/mgg_adeliathefortunewielder.jpg",
  },

  {
    game_id: 16,
    name: "Adventure Palace",
    url_thumb: "https://cdn.hub88.io/microgaming/mgg_adventurepalace.jpg",
  },

  {
    game_id: 16,
    name: "Adventure Palace",
    url_thumb: "https://cdn.hub88.io/microgaming/mgg_adventurepalace.jpg",
  },
];

class SuperSpade extends Component {
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
      gameName: "",
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
      { showLiveStrem: false },
      () => this.expireToken(),
      this.props.history.push({
        pathname: "/casino",
      })
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
export default SuperSpade;
