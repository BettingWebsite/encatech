/* eslint-disable */
import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import "./Loader.css";
import LiveStremEvolution from "./LiveStremEvolution";
import axios from "axios";
import Url from "../configure/configure";
import {Row,Col} from 'react-bootstrap';
const baseUrl = Url.baseUrl;
var jwt = require("jsonwebtoken");
const privateKey = "aIjehGjJM38oN2eg89d13voolKEhHQySurtaledrlnE";
const games = [];
const liveGames = [];
const isLive = false;
const gametype = "Virtual";
// const games = [
//     {
//       game_id: 3920,
//       name: "Teen Patti",
//       url_thumb: "https://cdn.hub88.io/ezugi/ezg_teenpatti.jpg",
//     },
//     {
//       game_id: 3900,
//       name: "Dragon Tiger",
//       url_thumb: "https://cdn.hub88.io/ezugi/ezg_dragontiger.jpg",
//     },
//     {
//       game_id: 3929,
//       name: "Andar Bahar",
//       url_thumb: "/img/14.jpg",
//     },
//     {
//       game_id: 3897,
//       name: "Baccarat",
//       url_thumb: "https://cdn.hub88.io/ezugi/ezg_baccarat.jpg",
//     },
    
//     {
//       game_id:
//         9748,
//       name: "32 CARDS",
//       url_thumb: "/img/32 card.jpg",
//     },
//     {
//       game_id:
//         3924,
//       name: "BlackJack",
//       url_thumb: "/img/3.jpg",
//     },
//     {
//       game_id:
//         9013,
//       name: "Roulette Azure",
//       url_thumb: "/img/15.jpg",
//     },
//     {
//       game_id:
//         3917,
//       name: "Speed Auto Roullete",
//       url_thumb: "/img/5.jpg",
//     },
//     {
//       game_id: 9014,
//       name: "Mega Wheel",
//       url_thumb: "/img/18.jpg",
//     },
  
  
//     {
//       game_id:
//         3565,
//       name: "Teen Patti",
//       url_thumb: "https://cdn.hub88.io/superspadeclub/ssc_teenpatti.jpg",
//     },
//     {
//       game_id: 392,
//       name: "Dragon Tiger (vip)",
//       url_thumb: "https://cdn.coingaming.io/casino-hub88/superspadeclub/dragontiger-vip-thumb.jpg",
//     },
//     {
//       game_id:
//         2656,
//       name: "Andar Bahar (vip)",
//       url_thumb: "https://cdn.coingaming.io/casino-hub88/superspadeclub/andarbahar-vip-thumb.jpg",
//     },
  
//     {
//       game_id:
//         6459,
//       name: "Baccarat",
//       url_thumb: "https://cdn.hub88.io/superspadeclub/ssc_baccarat3.jpg",
//     },
//     {
//       game_id:
//         2649,
//       name: "Baccarat 2",
//       url_thumb: "https://cdn.coingaming.io/casino-hub88/superspadeclub/baccarat-vip-2.jpg",
//     },
//     {
//       game_id: 2643,
//       name: "Roulette (low-roller)",
//       url_thumb: "https://cdn.coingaming.io/casino-hub88/superspadeclub/roulette-lowroller-thumb.jpg",
//     },
// ];
class LiveGame extends Component {
  constructor(props) {
    super(props);
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
      accessToken: localStorage.getItem("token"),
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

    // API Fetch Games

    axios.get("http://superodds.encabook999.com" + "/games/").then((resp) => {
      games = resp.data.Live;
      console.log(games);
      liveGames = resp.data.Live;
      games = games.concat(resp.data.Virtual);
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

  liveStremModalOpen = (id) => {
    this.setState({ showLiveStrem: true }, () => this.saveToken(id));
  };

  liveStremModalClose = () => {
    this.setState(
      { showLiveStrem: false, game_id: "", result: "" }
      //,
      // () => this.expaireToken()
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
    // await axios({
    //   method: "get",
    //   url: "http://18.168.89.144/production/api/v2/save_token",
    //   headers: { "X-Casino-Signature": signature },
    // });
    this.getUrl(id);

    this.setState({ isLoding: false });
  };
  // getUrl = async (id) => {
  //   this.setState({ isLoding: true });
  //   const { token, lobby_url, ip, platform, username } = this.state;
  //   const data = {
  //     user: username,
  //     token: token,
  //     partner_id: "heeraexch",
  //     platform: platform,
  //     lobby_url: lobby_url,
  //     lang: "en",
  //     ip: ip,
  //     game_id: id,
  //   };
  //   let signature = await jwt
  //     .sign(data, privateKey, { algorithm: "HS256", expiresIn: 60 })
  //     .toString("base64");
  //   await axios({
  //     method: "get",
  //     url: "http://18.168.89.144/production/api/v2/game/url",
  //     responseType: "stream",
  //     headers: { "X-Casino-Signature": signature },
  //   }).then((res) => {
  //     this.setState({
  //       result: res,
  //     });
  //   });

  //   this.setState({ isLoding: false });
  // };
  
  getUrl = async (id) => {
    

    for(var i=0;i<liveGames.length;i++)
    {
      if(liveGames[i].GameCode==id)
      {
        this.gametype="Live"
        break;
      }
    }
    // liveGames.map((item) => {
    //   if (item.GameCode == id){ console.log("live: ") 
    //   gameType = "Live"};
      
    // });
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
    // axios.post(url: "http://122.168.190.20:8000/casino_login",game)

    
    let headers = {
      Authorization: "Bearer " + this.state.accessToken,
    };

    const gameData = {
      gameCode: id,
      gameType: gametype,
    };
    
    // console.log("here :"+JSON.stringify(gameData))
    axios
      .post("http://superodds.encabook999.com/casino_login", gameData, { headers })
      .then((res) => {
        // console.log(JSON.stringify(res.data.data.lobby_url));
        this.setState({
          // result: res,
          result: res,
          lobby_url: res.data.data.lobby_url,
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
    const { result, isLoding, showLiveStrem } = this.state;
    return (
     // Render API Data
    <React.Fragment>
    <Row className="game_img_man px-2" style={{ marginTop: "-5px" }}>
      {games && games.length ? (
        games.map((item, index) => {
          return (
            <Col xs={3} key={index}>
              <span className="game_img">
                <img
                  src={item.ImagePath}
                  className="img-fluid"
                  alt="img"
                  onClick={() => {
                    this.liveStremModalOpen(item.GameCode, item.Name);
                  }}
                  style={{ height: "70px", width: "150px" }}
                />{" "}
                <div className="casino-name"> {item.Name}</div>
              </span>
            </Col>
          );
        })
      ) : (
        <Col><h1 className="text-white">wait for responce</h1></Col>
      )}
    </Row>
    <LiveStremEvolution
      show={showLiveStrem}
      handleCloseModel={() => this.liveStremModalClose()}
      result={result}
      isLoding={isLoding}
    />
  </React.Fragment>

      // <React.Fragment>
      //   <Row className="game_img_man px-3" style={{ marginTop: "-5px" }}>
      //     {games && games.length ? (
      //       games.map((item, index) => {
      //         return (
      //           <Col xs={3} key={index}>
      //             <span className="game_img">
      //               <img
      //                 src={item.url_thumb}
      //                 className="img-fluid"
      //                 alt="img"
      //                 onClick={() => {
      //                   this.liveStremModalOpen(item.game_id, item.name);
      //                 }}
      //                 style={{ height: "100px", width: "150px" }}
      //               />{" "}
      //               <div className="casino-name"> {item.name}</div>
      //             </span>
      //           </Col>
      //         );
      //       })
      //     ) : (
      //       <Col><h1 className="text-white">wait for responce</h1></Col>
      //     )}
      //   </Row>
      //   <LiveStremEvolution
      //     show={showLiveStrem}
      //     handleCloseModel={() => this.liveStremModalClose()}
      //     result={result}
      //     isLoding={isLoding}
      //   />
      // </React.Fragment>
    );
  }
}
export default LiveGame;
