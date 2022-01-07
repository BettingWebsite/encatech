import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import Url from "../configure/configure.js";
import LiveStremEvolution from "./LiveStremEvolution";
import { Row } from "react-bootstrap";
const baseUrl = Url.baseUrl;
const privateKey = "aIjehGjJM38oN2eg89d13voolKEhHQySurtaledrlnE";
var jwt = require("jsonwebtoken");

const games = [
  {
    game_id: 2,
    name: "Astro Legends: Lyra and Erion",
    url_thumb:
      "https://cdn.hub88.io/microgaming/mgg_astrolegendslyraanderion.jpg",
  },
  {
    game_id: 3,
    name: "Crystal Rift",
    url_thumb: "https://cdn.hub88.io/microgaming/mgg_crystalrift.jpg",
  },
  {
    game_id: 4,
    name: "Icy Gems",
    url_thumb:
      "https://cdn.hub88.io/microgaming/mgg_astrolegendslyraanderion.jpg",
  },
  {
    game_id: 5,
    name: "Who wants to be a Millionaire",
    url_thumb:
      "https://cdn.hub88.io/microgaming/mgg_whowantstobeamillionaire.jpg",
  },
  {
    game_id: 5,
    name: "Who wants to be a Millionaire",
    url_thumb:
      "https://cdn.hub88.io/microgaming/mgg_whowantstobeamillionaire.jpg",
  },
  {
    game_id: 8727,
    name: "Crazy Bomber ",

    url_thumb: "https://cdn.hub88.io/spadegaming/CrazyBomber_Thumbnail.jpg",
  },

  {
    game_id: 8218,
    name: "Fiery Sevens",
    url_thumb: "https://cdn.hub88.io/spadegaming/Fiery_sevens_thumb.jpg",
  },
  {
    game_id: 7,
    name: "Action Ops: Snow & Sable",
    url_thumb: "https://cdn.hub88.io/microgaming/mgg_actionopssnowsable.jpg",
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


class Slots extends Component {
  constructor(props) {
    super(props);
    var accessToken = localStorage.getItem("token");
    this.state = {
      isLoding: false,
      Spadegaming: [],
      Microgaming: [],
      OneTouch: [],
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
      offset: 0,
      data: [],
      perPage: 49,
      currentPage: 0,
      isLoding: false,
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
      this.receivedData();
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
        <Row>
          {games.map((item, index) => (
            <React.Fragment>
              <div className="col-4 col-sm-2" key={index}>
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
              </div>
            </React.Fragment>
          ))}
        </Row>
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
export default Slots;
