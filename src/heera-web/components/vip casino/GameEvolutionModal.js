import React, { Component } from "react";
import { Modal, Row, Col, Card } from "react-bootstrap";
import FullPageLoader from "../vip casino/FullPageLoader";

class GameEvolutionModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { show, evolution, isLoding } = this.props;
    return (
      <Modal
        style={{ opacity: 1 }}
        show={show}
        onHide={() => this.props.handleCloseModel()}
        size="xl"
        scrollable="true"
      >
        <Modal.Header closeButton className="text-dark text-uppercase">
          Evolution Gaming
        </Modal.Header>
        <Modal.Body style={{ height: "500px" }}>
          {isLoding ? <FullPageLoader /> : null}

          <Row>
            {evolution && evolution.length ? (
              evolution.map((item, index) => {
                return (
                  <Col lg={3} className="px-3 mt-3">
                    <Card
                      onClick={() => {
                        this.props.openLiveStream(item.game_id);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <Card.Img src={item.url_thumb} height="150px" />
                      <Card.Footer
                        className="text-center"
                        style={{ backgroundColor: "#000000" }}
                      >
                        <small className="text-white">{item.name}</small>
                      </Card.Footer>
                    </Card>
                  </Col>
                );
              })
            ) : (
              <h1 className="text-white">wait for responce</h1>
            )}
          </Row>
        </Modal.Body>
      </Modal>
    );
  }
}
export default GameEvolutionModal;
