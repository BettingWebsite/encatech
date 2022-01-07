import React, { Component } from "react";
import Iframe from "react-iframe";
import { Modal } from "react-bootstrap";
import './liveStremEvloution.css'
import FullPageLoader from "../vip casino/FullPageLoader";
class LiveStreamEvolution extends Component {
  render() {
    const { show, result, isLoding } = this.props;
    return (
      <Modal show={show} style={{ opacity: 1 }} size="xl" >
        <Modal.Header className="text-white" className="bg" style={{ height: "20px" }} style={{ width: "100%" }}>

          <div className="bg w-100 d-flex flex-row justify-content-between" style={{ height: "30px" }}>
            <h5 className="text-white">

              {this.props.gameName ? this.props.gameName : null}
            </h5>
            <h6 className="text-right">
              <i
                class="fa fa-times text-white"
                aria-hidden="true"
                onClick={() => this.props.handleCloseModel()}
                style={{ cursor: "pointer" }}
              />
            </h6>
          </div>
        </Modal.Header>

        <Modal.Body style={{ height: "800px" }}>
          {isLoding ? <FullPageLoader /> : null}
          <Iframe
            url={
              result && result.data && result.data.data.lobby_url ? result.data.data.lobby_url : null
            }
            height="100%"
            width="100%"
            id="myId"
            className="myClassname"
            display="initial"
            position="relative"
          />
        </Modal.Body>
      </Modal>
    );
  }
}
export default LiveStreamEvolution;
