import React, { Component } from "react";
import { Link } from "react-router-dom";

import { BrowserView, MobileView } from "react-device-detect";
class MobileMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="desktop-hide mob-show mobile-header">
        <div className="">
          <ul className="nav d-flex flex-row justify-content-around text-white">
            {/* <li className="nav-item ml-5">
              <span className="nav d-flex flex-column text-white">
                <i class="fas fa-home mt-2 text-center fa-lg"></i>
                <a href="/matches/tennis" className="text-white mt-1">
                  Home
                </a>
              </span>
            </li>{" "} */}
            <li className="itemhead">
              <a href="/matches/cricket" className="text-white texthead">
                <i class="fas fa-baseball-ball fa-lg text-center"></i>
                <br></br>
                Cricket
              </a>
            </li>{" "}
            <li className="itemhead">
              <a href="/matches/soccer" className="text-white texthead">
                <i class="fas fa-futbol fa-lg text-center"></i>
                <br></br>
                Football
              </a>
            </li>{" "}
            <li className="itemhead">
              <a href="/matches/tennis" className="text-white texthead">
                <i class="fas fa-baseball-ball fa-lg text-center"></i>
                <br></br>
                Tennis
              </a>
            </li>{" "}
            <li className="itemhead">
              <a href="/casino" className="text-white texthead">
                <i class="fas fa-futbol fa-lg text-center"></i>
                <br></br>
                Live Casino
              </a>
            </li>{" "}
            <li className="itemhead">
              <a href="/binary" className="text-white texthead">
                <i class="fas fa-th-list fa-lg text-center"></i>
                <br></br>
                Binary
              </a>
            </li>
            <li className="itemhead">
              <a href="/Slots" className="text-white texthead">
                <i class="fas fa-th-list fa-lg text-center"></i>
                <br></br>
                Slots
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
export default MobileMenu;
