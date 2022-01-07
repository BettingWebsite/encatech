import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
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
          <table id="customers1" className="mt-5">
            <thead>
              <tr>
                <th className="text-center px-2 pt-2">No</th>
                <th className="text-center px-2 pt-2">Nation</th>
                <th className="text-center px-2 pt-2">Side</th>
                <th className="text-center px-2 pt-2">Rate</th>
                <th className=" text-center px-2 pt-2">Amount</th>
                {userBetList[0] &&
                userBetList[0].userbet_id.bet_on === "fancy" ? (
                  <th className=" text-center px-2 pt-2">Result Score</th>
                ) : null}
                <th className=" text-center px-2 pt-2">Win/Loss</th>
                <th className="text-center px-2 pt-2">Place Date</th>
                <th className="text-center px-2 pt-2"> Match Date</th>
              </tr>
            </thead>
            <tbody className="font-weight-normal">
              {userBetList && userBetList.length ? (
                userBetList.map((item, index) => {
                  return (
                    <React.Fragment>
                      <tr
                        key={index}
                        className={
                          item.userbet_id.bet_type === "back" ||
                          item.userbet_id.no === "yes"
                            ? "back"
                            : "lay"
                        }
                      >
                        <td className="text-right">{index + 1}</td>
                        <td className="text-center">
                          {item.userbet_id.team_name
                            ? item.userbet_id.team_name
                            : null}
                        </td>
                        <td className="text-center">
                          {item.userbet_id && item.userbet_id.bet_on === "fancy"
                            ? item.userbet_id.no
                            : item.userbet_id.bet_type}
                        </td>
                        <td className="text-center">
                          {item.userbet_id.odds ? item.userbet_id.odds : null}
                        </td>
                        <td className="text-center">
                          {item.userbet_id.stake ? item.userbet_id.stake : null}
                        </td>
                        {item.userbet_id.bet_on === "fancy" ? (
                          <td className="text-center">
                            {score ? score : null}
                          </td>
                        ) : null}
                        <td className="text-center">
                          <span
                            className={
                              item.amount > 0 ? "text-success" : "text-danger"
                            }
                          >
                            <b>
                              {" "}
                              {item.amount
                                ? parseFloat(item.amount).toFixed(2)
                                : null}
                            </b>
                          </span>
                        </td>
                        <td className="text-center">
                          {Moment(
                            item.userbet_id.createdDate
                              ? item.userbet_id.createdDate
                              : null
                          ).format("MM-DD-YYYY HH:mm A")}
                        </td>{" "}
                        <td className="text-center">
                          {Moment(
                            item.userbet_id.createdDate
                              ? item.userbet_id.createdDate
                              : null
                          ).format("MM-DD-YYYY HH:mm A")}
                        </td>{" "}
                      </tr>
                    </React.Fragment>
                  );
                })
              ) : (
                <tr>
                  <td colspan="8">
                    <h6 className="text-center">
                      There are no records to show
                    </h6>
                  </td>
                </tr>
              )}
            </tbody>
          </table>

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
