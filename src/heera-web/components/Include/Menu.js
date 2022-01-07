/* eslint-disable */
import React, { Component } from "react";
import { Link } from "react-router-dom";
class Menu extends Component {
  render() {
    return (
      <div>

        <div className="menu2">
          <ul className="nav d-flex flex-row">
            <li className="nav-item headeritem">
              <a href="/matches/cricket">
                Home
              </a>
            </li>
            {/*<li className="nav-item ">
              <a href="/binary"> Binary</a>
            </li>*/}
{/*            <li className="nav-item ">
              <a href="/matches/cricket">
                Cricket
              </a>
            </li>
*/}
            
            <li className="nav-item ">
              <a href="/matches/cricket">
                Cricket
              </a>
            </li>
            <li className="nav-item newlacunch-menu">
              <a href="/binary">
                <span className="newlacunch-menu" > IPL
                2021</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="/matches/tennis">
                Tennis
              </a>
            </li>
            <li className="nav-item ">
              <a href="/matches/soccer">
                Football
              </a>
            </li>
            <li className="nav-item">
              <a href="/matches/table-tennis">Table Tennis</a>
            </li>
            <li className="nav-item">
              <a href="/matches/Badminton">Badminton</a>
            </li>
            <li className="nav-item">
              <a href="/matches/basketball">
                Basketball</a>
            </li>
            <li className="nav-item ">
              <a href="/matches/volleyball">
                Volleyball</a>
            </li>
            <li className="nav-item ">
              <a href="/matches/Ice-Hockey">
                Ice Hockey</a>
            </li>
            <li className="nav-item ">
              <Link to="/baccarat">
                Baccarat</Link>
            </li>
            

            <li className="nav-item">
              <Link to="/a32-card">
                32 Cards
              </Link>
            </li>
            <li className="nav-item ">
              <Link to="/teen-patti">
                Teen Patti
              </Link>
            </li>
          
            {/* casino/teen-patti-t20" */}
            <li className="nav-item">
              <Link to="/poker">
                Poker
              </Link>
            </li>
            <li className="nav-item ">
              <Link to="/seven">
                Lucky 7
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link to="/vip-casino">
                Live Casino</Link>
            </li> */}
          </ul>
        </div>
      </div>
    );
  }
}

export default Menu;
