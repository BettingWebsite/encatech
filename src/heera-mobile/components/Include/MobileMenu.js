/* eslint-disable */
import React, { Component } from "react";
import { Nav } from "react-bootstrap";
class MobileMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: "cricket",
    };
  }
  componentDidMount = () => {
    const url = window.location.pathname;
    const urlSplit = url.split("/");
    this.setState({ isActive: urlSplit[urlSplit.length - 1] });
  };
  render() {
    const { isActive } = this.state;
    return (
      <div className="desktop-hide mob-show mobile-header">
        <Nav variant="pills" activeKey={isActive}>
          <Nav.Item>
            <Nav.Link
              href="/matches/soccer"
              eventKey="soccer"
              className="text-uppercase mt-1"
            >
              <img src="/img/casino/1.png" height="22" width="22" />
              <br></br>
              <span className=" textmenu"> Football </span>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              href="/matches/tennis"
              eventKey="tennis"
              className="text-uppercase mt-1"
            >
              <img src="/img/casino/2.png" height="22" width="22" />
              <br></br>
              <span className=" textmenu">Tennis </span>
            </Nav.Link>
          </Nav.Item>{" "}
          <Nav.Item>
            <Nav.Link
              href="/matches/cricket"
              eventKey="cricket"
              className="text-uppercase mt-1"
            >
              <img
                src="/img/casino/4.png"
                height="22"
                width="22"
                className="mb-1"
              />
              <br></br>
              <span className=" textmenu">Cricket</span>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              href="/matches/Ice-Hockey"
              eventKey="Ice-Hockey"
              className="text-uppercase mt-1"
            >
              <img src="/img/casino/7524.png" className="mb-1" height="22" width="22" />
              <br></br>
              <span className="textmenu">ICE HOCKEY</span>
            </Nav.Link>
          </Nav.Item>{" "}
          <Nav.Item>
            <Nav.Link
              href="/matches/volleyball"
              eventKey="volleyball"
              className="text-uppercase mt-1"
            >
              <img src="/img/casino/998917.png" className="mb-1" height="22" width="22" />
              <br></br>
              <span className=" textmenu">VollEyBall</span>
            </Nav.Link>
          </Nav.Item>{" "}
          <Nav.Item>
            <Nav.Link
              href="/matches/basketball"
              eventKey="basketball"
              className="text-uppercase mt-1"
            >
              <img
                src="/img/casino/7522.png"
                height="22"
                width="22"
                className="mb-1"
              />
              <br></br>
              <span className=" textmenu">BasketBall</span>
            </Nav.Link>
          </Nav.Item>{" "}
          <Nav.Item>
            <Nav.Link
              href="/matches/Badminton"
              eventKey="Badminton"
              className="text-uppercase mt-1"
            >
              <img
                src="/img/casino/71.png"
                height="22"
                width="22"
                className="mb-1"
              />
              <br></br>
              <span className=" textmenu">BADMINTION</span>
            </Nav.Link>
          </Nav.Item>{" "}
          <Nav.Item>
            <Nav.Link
              href="/"
              eventKey="casino"
              className="text-uppercase mt-1"
            >
              <img
                src="/img/casino/52.png"
                height="22"
                width="22"
                className="mb-1"
              />
              <br></br>
              <span className=" textmenu">KABADDI</span>
            </Nav.Link>
          </Nav.Item>{" "}
          <Nav.Item>
            <Nav.Link
              href="/"
              eventKey="casino"
              className="text-uppercase mt-1"
            >
              <img
                src="/img/casino/BOX.png"
                height="22"
                width="24"
                className="mb-1"
              />
              <br></br>
              <span className=" textmenu">boxING</span>
            </Nav.Link>
          </Nav.Item>{" "}
          <Nav.Item>
            <Nav.Link
              href="/"
              eventKey="casino"
              className="text-uppercase mt-1"
            >
              <img
                src="/img/casino/8.png"
                height="22"
                width="22"
                className="mb-1"
              />
              <br></br>
              <span className=" textmenu">MOTOR SPORT</span>
            </Nav.Link>
          </Nav.Item>{" "}
        </Nav>
      </div>
    );
  }
}
export default MobileMenu;
