import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import Url from "../configure/configure.js";
import LiveStremEvolution from "../vip casino/LiveStremEvolution";
import { Card, Row, Col } from "react-bootstrap";
var jwt = require("jsonwebtoken");
const baseUrl = Url.baseUrl;
const privateKey = "aIjehGjJM38oN2eg89d13voolKEhHQySurtaledrlnE";

const games = [
  {
    game_id: 2163,
    name: "Baccarat Lobby",
    url_thumb: "https://cdn.hub88.io/evolution/evo_livebaccaratlobby.jpg",
  },
  {
    game_id: 2172,
    name: "Lightning Baccarat",
    url_thumb: "https://cdn.hub88.io/evolution/lightning-baccarat-thumb.jpg",
  },
  {
    game_id: 2649,
    name: "Baccarat 2 (vip)",
    url_thumb:
      "https://cdn.coingaming.io/casino-hub88/superspadeclub/baccarat-vip-2.jpg",
  },
  {
    game_id: 2650,
    name: "Baccarat 2 (high-roller)",
    url_thumb:
      "https://cdn.coingaming.io/casino-hub88/superspadeclub/baccarat-highroller-2.jpg",
  },
  {
    game_id: 2651,
    name: "Baccarat 2 (regular)",
    url_thumb:
      "https://cdn.coingaming.io/casino-hub88/superspadeclub/baccarat-regular-2.jpg",
  },
];

class Baccarat extends Component {
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

        <div id="content-wrapper">
          <Row>
            {games && games.length ? (
              games.map((item, index) => {
                return (
                  <Col lg={3} className="px-3 mt-3">
                    <Card
                      onClick={() => {
                        this.liveStremModalOpen(item.game_id, item.name);
                      }}
                    >
                      <img
                        src={item.url_thumb}
                        className="img-fluid"
                        alt="img"
                        onClick={() => {
                          this.liveStremModalOpen(item.game_id, item.name);
                        }}
                      />{" "}
                    </Card>
                  </Col>
                );
              })
            ) : (
                <h1 className="text-white">wait for responce</h1>
              )}
          </Row>
        </div>


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
export default Baccarat;
