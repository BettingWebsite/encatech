import React, { Component } from "react";
import Nav from "../Include/Nav";
import Menu from "../Include/Menu";
import Footer from "../Include/footer";
import Sidebar from "../Include/Sidebar";
import { BrowserView } from "react-device-detect";
import { Card, Row, Col } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import GameEvolutionModal from "./GameEvolutionModal";
import LiveStremEvolution from "./LiveStremEvolution";
import GameEzugiModal from "./GameEzugiModal";
import GameSuperspadeModal from "./GameSuperspadeModal";
import Url from "../configure/configure.js";
import "./myFunction";
import { Link } from "react-router-dom";
import ScriptTag from 'react-script-tag';
import Demo from "./myFunction";
var jwt = require("jsonwebtoken");
const baseUrl = Url.baseUrl;

const privateKey = "aIjehGjJM38oN2eg89d13voolKEhHQySurtaledrlnE";
import "./Loader.css";
class Provider extends Component {
  constructor(props) {
    super(props);
    var accessToken = localStorage.getItem("token");
    this.state = {
      isLoding: false,
      superspade: [],
      ezugi: [],
      evolution: [],
      token: "",
      platform: "",
      lang: "",
      ip: "",
      game_id: "",
      currency: "",
      country: "",
      lobby_url: "",
      result: "",
      showEvolution: false,
      showLiveStrem: false,
      showEzugi: false,
      showSuperspade: false,
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

    <ScriptTag
        type="text/javascript"
        src="https://tvbetframe999.com/assets/frame.js" >

        </ScriptTag>

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
    this.getGameList();
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

  liveStremModalOpen = (id) => {
    this.setState({ showLiveStrem: true }, () => this.saveToken(id));
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
    localStorage.setItem("mycasino",token);
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
    localStorage.removeItem("mycasino");
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

  gameEvolutionModalOpen = () => {
    this.setState({ showEvolution: true });
  };
  gameEvolutionModalClose = () => {
    this.setState({ showEvolution: false });
  };

  gameEzugiModalOpen = () => {
    this.setState({ showEzugi: true });
  };
  gameEzugiModalClose = () => {
    this.setState({ showEzugi: false });
  };
  gameSuperspadeModalOpen = () => {
    this.setState({ showSuperspade: true });
  };
  gameSuperspadeModalClose = () => {
    this.setState({ showSuperspade: false });
  };

  getGameList = async () => {
    this.setState({ isLoding: true });
    const data = {
      partner_id: "heeraexch",
    };
    let signature = await jwt
      .sign(data, privateKey, { algorithm: "HS256", expiresIn: 60 })
      .toString("base64");
    const response = await axios({
      method: "get",
      url: "http://18.168.89.144/production/api/v2/game/list",
      headers: { "X-Casino-Signature": signature },
    });
    if (response && response.data) {
      let evolution = response.data.filter(
        (item) => item.product === "Evolution Gaming"
      );
      let ezugi = response.data.filter((item) => item.product === "Ezugi");

      let superspade = response.data.filter(
        (item) => item.product === "Super Spade Games"
      );

      this.setState({
        ezugi,
        evolution,
        superspade,
        isLoding: false,
      });
    }
  };

  render() {
    const {
      evolution,
      ezugi,
      superspade,
      result,
      isLoding,
      showEvolution,
      showEzugi,
      showSuperspade,
      showLiveStrem,
    } = this.state;
    return (
      <div>
        <BrowserView>
          <Nav />
          <Menu />

          <div id="wrapper">
            <Sidebar />
            <React.Fragment>
            <Demo/>
            {/* <React.Fragment>
              <Row className="mt-3 w-100">
                <Col lg={4} className="px-3 mt-3">
                  <Link to="/super-spade">
                    <Card
                      // onClick={() => {
                      //   this.gameSuperspadeModalOpen();
                      // }}
                      style={{ cursor: "pointer" }}
                    >
                      <Card.Img
                        src="https://dzm0kbaskt4pv.cloudfront.net/v1/static/img/livecasino/livecasinogaming.jpg"
                        height="180px"
                      />

                      <Card.Footer
                        className="text-center casino-name text-uppercase"
                      >
                        <span className="text-white providerCard">SUPERSPADE CASINO</span>
                      </Card.Footer>
                    </Card>
                  </Link>
                </Col>
                <Col lg={4} className="px-3 mt-3">
                  <Link to="/evolution">
                    <Card
                      onClick={() => {
                        this.gameEvolutionModalOpen();
                      }}
                    >
                      <Card.Img
                        src="https://dzm0kbaskt4pv.cloudfront.net/v1/static/img/livecasino/evolution_casino.png"
                        height="180px"
                      />
                      <Card.Footer
                        className="text-center casino-name text-uppercase"
                      >
                        <span className="text-white providerCard">EVOLUTION CASINO</span>
                      </Card.Footer>
                    </Card>
                  </Link>
                </Col>
                <Col lg={4} className="px-3 mt-3">
                  <Link to="/euzgi_casino">
                    <Card
                      onClick={() => {
                        this.gameEzugiModalOpen();
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <Card.Img
                        src="https://dzm0kbaskt4pv.cloudfront.net/v1/static/img/livecasino/euzgi_casino.png"
                        height="180px"
                      />

                      <Card.Footer
                        className="text-center casino-name text-uppercase"
                      >
                        <span className="text-white providerCard">Ezugi CASINO</span>
                      </Card.Footer>
                    </Card>
                  </Link>
                </Col>

              </Row>
              <GameEzugiModal
                show={showEzugi}
                handleCloseModel={() => this.gameEzugiModalClose()}
                ezugi={ezugi}
                isLoding={isLoding}
                openLiveStream={(data) => this.liveStremModalOpen(data)}
              /> */}
              {/* <GameEvolutionModal
                show={showEvolution}
                handleCloseModel={() => this.gameEvolutionModalClose()}
                evolution={evolution}
                isLoding={isLoding}
                openLiveStream={(data) => this.liveStremModalOpen(data)}
              />

              <GameSuperspadeModal
                show={showSuperspade}
                handleCloseModel={() => this.gameSuperspadeModalClose()}
                superspade={superspade}
                isLoding={isLoding}
                openLiveStream={(data) => this.liveStremModalOpen(data)}
              /> */}

              {/* <LiveStremEvolution
                show={showLiveStrem}
                handleCloseModel={() => this.liveStremModalClose()}
                result={result}
                isLoding={isLoding}
              /> */}
            </React.Fragment>
          </div>
          <Footer />
        </BrowserView>
      </div>
    );
  }
}
export default Provider;
