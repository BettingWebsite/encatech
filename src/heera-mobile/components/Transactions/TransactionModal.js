import React, { Component } from "react";
import { Modal, Button, Card } from "react-bootstrap";
import Moment from "moment";
class TransactionModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { show, userBetList, score } = this.props;
    return (
      <Modal show={show} style={{ opacity: 1 }} size="xl">
        <Modal.Body>
          {userBetList && userBetList.length ? (
            userBetList.map((item, index) => {
              return (
                <React.Fragment>
                  <Card
                    key={index}
                    className={
                      item.userbet_id.bet_type === "back" ||
                      item.userbet_id.no === "yes"
                        ? "bgback d-flex flex-row justify-content-between font-weight-normal pt-1 pb-1 px-1 mt-1 card11"
                        : "bglay d-flex flex-row justify-content-between font-weight-normal pt-1 pb-1 px-1 mt-1 card11"
                    }
                  >
                    <div
                      className="d-flex flex-column"
                      style={{ width: "200px" }}
                    >
                      <span>
                        -<b>Nation: </b>
                        {item.userbet_id.team_name
                          ? item.userbet_id.team_name +
                            (score ? " / " + score : "")
                          : null}
                      </span>
                      <span>
                        <b>Placed Date: </b>
                        {Moment(
                          item.userbet_id.createdDate
                            ? item.userbet_id.createdDate
                            : null
                        ).format("MM/DD/YYYY HH:mm A")}
                      </span>
                      <span>
                        <b>Matched Date: </b>
                        {Moment(
                          item.userbet_id.createdDate
                            ? item.userbet_id.createdDate
                            : null
                        ).format("MM/DD/YYYY HH:mm A")}
                      </span>
                    </div>
                    <div className="d-flex flex-column">
                      <b>Rate</b>
                      <span className="mt-1 float-right">
                        {item.userbet_id.odds ? item.userbet_id.odds : null}
                      </span>
                    </div>
                    <div className="d-flex flex-column">
                      <b>Amount</b>
                      <span className="mt-1 text-center">
                        {item.userbet_id.stake ? item.userbet_id.stake : null}
                      </span>
                    </div>
                    <div className="d-flex flex-column">
                      <b>W&L</b>
                      <span
                        className={
                          item.amount > 0
                            ? "text-success mt-1 float-right"
                            : "text-danger mt-1 float-right"
                        }
                      >
                        {item.amount ? parseFloat(item.amount).toFixed(0) : null}
                      </span>
                    </div>
                  </Card>
                </React.Fragment>
              );
            })
          ) : (
            <tr>
              <td colspan="7">
                <h6 className="text-center">There are no records to show</h6>
              </td>
            </tr>
          )}
          <div className="d-flex justify-content-end mt-3">
            {" "}
            <Button
              className="bg-danger px-3"
              onClick={() => this.props.ModalClose()}
            >
              Close
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}

export default TransactionModal;
