import React, { Component } from "react";
import Nav from "../Include/Nav";
import Menu from "../Include/Menu";
import Sidebar from "../Include/Sidebar";
import { Link } from "react-router-dom";
import axios from "axios";
import Moment from "moment";
import { Button } from "react-bootstrap";
class Game extends Component {
    constructor(props) {
        super(props);
        var accessToken = localStorage.getItem("token");
        this.state = {
            accessToken: accessToken,
            isLoading: true,
            tableData: [],
            isActive: "cricket",
        };
    }

    componentDidMount() {
        this.getOddsValue(this.props.match.params.gameid);
    }

    getOddsValue = (matchName) => {
        let headers = {
            Authorization: "Bearer " + this.state.accessToken,
        };
        axios.get(`http://api.encabook999.com/cricket_data/${matchName}`, { headers })
            .then((response) => {
                // localStorage.setItem(matchName, JSON.stringify(response.data));
                this.setState({ tableData: response.data })
            });
    }


    render() {

        const { tableData } = this.state;
        return (
            <div>
                <Nav />
                <Menu />
                <div id="wrapper">
                    <Sidebar />
                    <div id="content-wrapper">
                        <div className="container-fluid">
                            <ul
                                role="tablist"
                                id="home-events"
                                className="nav nav-tabs nav-justified w-100"
                                style={{ marginTop: "2px" }}
                            >
                                <li className="text-left">
                                    <Button className="link2 px-3 texttab5">
                                        <a href="/matches/soccer" className="text-white">
                                            {this.props.match.params.gameid}
                                        </a></Button>
                                </li>
                            </ul>

                            <div className="table-responsive">
                                <table class="table">
                                    <tr>
                                        <td colSpan="4" className="font-weight-normal game1">Game</td>
                                        <td></td>
                                        <td colSpan="1" className="text-center game1">1</td>
                                        <td colSpan="1" className="text-center game1">x</td>
                                        <td colSpan="1" className="text-center game1">2</td>
                                    </tr>

                                    <tbody>

                                        {
                                            tableData && tableData.length ? (
                                                tableData.map((item, index) => {
                                                    return (
                                                        <tr>
                                                            <td colSpan="3">

                                                                <div>

                                                                    <Link
                                                                        to={{
                                                                            pathname:
                                                                                "/matchdetail/" +
                                                                                item.match_id +
                                                                                "/" +
                                                                                item.sport_type + "/"
                                                                                +
                                                                                item.open_date
                                                                        }}
                                                                    >
                                                                        <div className="game"> {item.match_name ? item.match_name : null}/   {Moment(item.open_date ? item.open_date : null).format("lll")} (IST){" "}</div>

                                                                    </Link>
                                                                </div>{" "}
                                                            </td>
                                                            <td>

                                                            </td>
                                                            <td colSpan="4">
                                                                <span className="d-flex flex-row  justify-content-end game">
                                                                    <div className="d-flex flex-row align-items-center">

                                                                        {item.InPlay === true ? <i class="fas fa-circle text-success  mr-2" /> : null}

                                                                        {item.icon_status && item.icon_status.tv && item.icon_status.tv === "Tv" ? <i className="fa fa-tv mr-2"></i> : null}

                                                                        {item.icon_status && item.icon_status.fancy && item.icon_status.fancy === "Fancy" ? <img src='/img/bm.png' height='15' width='20' className="mr-2" /> : null}
                                                                        {item.icon_status && item.icon_status.fancy && item.icon_status.fancy === "Fancy" ? <img src='/img/f.png' height='15' width='20' className="mr-2" /> : null}

                                                                    </div>
                                                                    <button className="back btn_web">
                                                                        <span
                                                                            className="odd"
                                                                        >
                                                                            {item.odds && item.odds[0] && item.odds[0].BackPrice1 ? item.odds[0].BackPrice1 :
                                                                                "-"}
                                                                        </span>
                                                                    </button>
                                                                    <button className="lay btn_web">
                                                                        <span className="odd" >

                                                                            {item.odds && item.odds[0] && item.odds[0].LayPrice1 ? item.odds[0].LayPrice1 :
                                                                                "-"}
                                                                        </span>{" "}
                                                                    </button>{" "}
                                                                    <button className="back btn_web">
                                                                        <span className="odd" >

                                                                            {item.odds && item.odds[2] && item.odds[2].BackPrice1 ? item.odds[2].BackPrice1 :
                                                                                "-"}
                                                                        </span>{" "}
                                                                    </button>
                                                                    <button className="lay btn_web">
                                                                        {" "}
                                                                        <span className="odd" >
                                                                            {item.odds && item.odds[2] && item.odds[2].LayPrice1 ? item.odds[2].LayPrice1 :
                                                                                "-"}
                                                                        </span>{" "}
                                                                    </button>{" "}
                                                                    <button className="back  btn_web">
                                                                        {" "}
                                                                        <span className="odd" >

                                                                            {item.odds && item.odds[1] && item.odds[0].BackPrice1 ? item.odds[1].BackPrice1 :
                                                                                "-"}
                                                                        </span>{" "}
                                                                    </button>{" "}
                                                                    <button className="lay  btn_web">
                                                                        {" "}
                                                                        <span className="odd">
                                                                            {item.odds && item.odds[1] && item.odds[0].LayPrice1 ? item.odds[1].LayPrice1 :
                                                                                "-"}
                                                                        </span>{" "}
                                                                    </button>{" "}
                                                                </span>

                                                            </td>
                                                        </tr>
                                                    );
                                                })
                                            ) : (
                                                <tr className="bg6 px-2"><td colspan="8"><h6 className="mt-1">No real-time records found</h6></td></tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Game;
