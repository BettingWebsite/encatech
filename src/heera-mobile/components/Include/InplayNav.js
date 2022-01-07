/* eslint-disable */
import React, { Component } from "react";
import { Link } from "react-router-dom";

class InplayNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: "",
        };
    }
    componentDidMount = () => {
        const url = window.location.pathname;
        this.setState({ isActive: url });
    };
    render() {
        const { isActive } = this.state;
        return (
            <div>
                 <ul className="nav nav-tabs nav_top_mobile">
                    <li className="nav-item">
                        <a href="/binary" className={`nav-link ${isActive === "/binary" ? 'nav-link1' : ''}`} style={{background:"#223577", fontSize:"16px"}}>
                            IPL 2021
                        </a>
                    </li>
                </ul>
                <ul className="nav nav-tabs nav_top_mobile">
                    <li className="nav-item">
                        <a href="/inplay/cricket" className={`nav-link  ${isActive === "/inplay/cricket" ? 'nav-link1' : ''}`} style={{ borderTop: "2px solid #fff" }}>
                            In-play
            </a>
                    </li>
                    <li className="nav-item router-link-exact-active">
                        <a href="/matches/cricket" className={`nav-link ${isActive === "/matches/cricket" ? 'nav-link1' : ''}`}>
                            Sports
            </a>
                    </li>
                    <li className="nav-item">
                        <a href="/casino" className={`nav-link ${isActive === "/casino" ? 'nav-link1' : ''}`}>
                            Casino + Slot
            </a>
                    </li>
                    {/* <li className="nav-item">
                        <a href="/election" className={`nav-link ${isActive === "/" ? 'nav-link1' : ''}`}>
                            Election
            </a>
                    </li> */}
                    <li className="nav-item">
                        <Link to="/binary" className={`nav-link ${isActive === "/binary" ? 'nav-link1' : ''}`}>
                            Others
            </Link>
                    </li>
                </ul>

            </div>
        );
    }
}

export default InplayNav;
