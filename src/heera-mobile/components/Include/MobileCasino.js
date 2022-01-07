import React, { Component } from "react";
import Nav from "../Include/Nav";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import Url from "../configure/configure.js";
import { Link } from "react-router-dom";
import { Card, Row, Col } from "react-bootstrap";
import Poker from "../vip casino/Poker";
import Baccarat from "./Baccarat";
import BlackJack from "./BlackJack";
import Roulette from "./Roulette";
import Dragontiger from "../HomePage/Dragontiger";
import TeenPatti from "../vip casino/TeenPatti";
import Slots from "../vip casino/Slots";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
const baseUrl = Url.baseUrl;
const privateKey = "aIjehGjJM38oN2eg89d13voolKEhHQySurtaledrlnE";
var jwt = require("jsonwebtoken");
class MobileCasino extends Component {
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
        <Nav />

        <div>
        <ul className="nav nav-tabs nav_top_mobile">
                    <li className="nav-item">
                        <a href="/binary" className= "nav-link" style={{background:"#223577", fontSize:"16px"}}>
                            IPL 2021
                        </a>
                    </li>
                </ul>
          <ul className="nav nav-tabs nav_top_mobile">
            <li className="nav-item">
              <a href="/inplay/cricket" className="nav-link">
                In-play
            </a>
            </li>
            <li className="nav-item router-link-exact-active">
              <a href="/matches/cricket"className="nav-link">
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
        <Tabs className="mt-1">
          <TabList className="flex-row mobile-casino tabpad mt-1">
            <Tab>
              <span className="texttab text-uppercase mt-2">CASINO</span>
            </Tab>
            <Tab>
              <span className="texttab text-uppercase mt-2">SLOT</span>
            </Tab>
            <Tab>
              <span className="texttab text-uppercase mt-2">TEEN PATTI</span>
            </Tab>
            <Tab>
              <span className="texttab text-uppercase mt-2">POKER</span>
            </Tab>
            <Tab>
              <span className="texttab text-uppercase mt-2">BLACKJACK</span>
            </Tab>
            <Tab>
              <span className="texttab text-uppercase mt-2">BACCARAT</span>
            </Tab>
            <Tab>
              <span className="texttab text-uppercase mt-2">ROULETEE</span>
            </Tab>
            <Tab>
              <span className="texttab text-uppercase mt-2"> DRAGON TIGER</span>

            </Tab>
          </TabList>
          <TabPanel>
            <Row className="w-100">
              <Col lg={4} className="px-3">
                <Link to="/super-spade">
                  <Card style={{ cursor: "pointer" }}>
                    <Card.Img
                      src="https://dzm0kbaskt4pv.cloudfront.net/v1/static/img/livecasino/livecasinogaming.jpg"
                      height="140px"
                    />

                    <div
                      className="text-center casino-name"
                    >
                      <h6 className="text-white text-uppercase mt-1">
                        SUPERSPADE CASINO
                      </h6>
                    </div>
                  </Card>
                </Link>
              </Col>
              <Col lg={4} className="px-3 mt-3">
                <Link to="/evolution">
                  <Card>
                    <Card.Img
                      src="https://dzm0kbaskt4pv.cloudfront.net/v1/static/img/livecasino/evolution_casino.png"
                      height="140px"
                    />
                    <div
                      className="text-center casino-name"

                    >
                      <h6 className="text-white text-uppercase mt-1">
                        EVOLUTION CASINO
                      </h6>
                    </div>
                  </Card>
                </Link>
              </Col>
              <Col lg={4} className="px-3 mt-3">
                <Link to="/euzgi_casino">
                  <Card style={{ cursor: "pointer" }}>
                    <Card.Img
                      src="https://dzm0kbaskt4pv.cloudfront.net/v1/static/img/livecasino/euzgi_casino.png"
                      height="140px"
                    />

                    <div
                      className="text-center casino-name"
                    >
                      <h6 className="text-white text-uppercase mt-1">
                        Ezugi CASINO
                      </h6>
                    </div>
                  </Card>
                </Link>
              </Col>
            </Row>{" "}
          </TabPanel>
          <TabPanel className="px-3">
            <h5>Slot</h5>
            <Slots />
          </TabPanel>
          <TabPanel>
            <h4>TeenPatti</h4>
            <TeenPatti />
          </TabPanel>
          <TabPanel>
            <h5>Poker</h5>
            <Poker />
          </TabPanel>
          <TabPanel>
            <h5>BlackJack</h5>
            <BlackJack />
          </TabPanel>
          <TabPanel>
            <h5>Baccarat</h5>
            <Baccarat />
          </TabPanel>
          <TabPanel>

            <h4>
              Roulette
           </h4>
            < Roulette />
          </TabPanel>
          <TabPanel>
            <Dragontiger />
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}
export default MobileCasino;
