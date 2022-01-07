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
const gametype = "Virtual";
const games = [
    {
        "GameCode": "CQ",
        "url_thumb": "http://images.supernowa.net/Document/GameImages/c7a751d979fa495d97a923616c53c596_13-Casino-Queen.png",
        "IsLive": true,
        "IsStop": false,
        "Name": "Casino Queen"
    }
    ,
    {
        "GameCode": "RCQ",
        "url_thumb": "http://images.supernowa.net/Document/GameImages/2594257625a948feaf82aee8447a8cfc_23-RNG-queen.jpg",
        "IsLive": true,
        "IsStop": false,
        "Name": "RNG Casino Queen"
    }
];

class CasinoQueen extends Component {
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
        localStorage.setItem("mycasino", token);
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
    getUrl = async (id) => {



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

                this.setState({
                    result: res,
                    lobby_url: res.data.data.lobby_url,
                });
            });

        this.setState({ isLoding: false });
    };

    render() {
        const { result, isLoding, showLiveStrem, gameName } = this.state;
        return (
            <div>
                <Nav />
                <Menu />
                <div id="wrapper">
                    <Sidebar />
                    <div id="content-wrapper">
                        <Row className="mt-3">
                            {games && games.length ? (
                                games.map((item, index) => {
                                    return (
                                        <Col lg={3} className="px-3 mt-3">
                                            <Card
                                            // onClick={() => {
                                            //   this.liveStremModalOpen(item.GameCode, item.Name);
                                            // }}
                                            >
                                                <img
                                                    src={item.url_thumb}
                                                    className="img-fluid"
                                                    alt="img"
                                                    onClick={() => {
                                                        this.liveStremModalOpen(item.GameCode, item.Name);
                                                    }}
                                                />{" "}
                                            </Card>
                                        </Col>
                                    );
                                })
                            ) : (
                                <h1 className="text-white">wait for response</h1>
                            )}
                        </Row>
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
export default CasinoQueen;
