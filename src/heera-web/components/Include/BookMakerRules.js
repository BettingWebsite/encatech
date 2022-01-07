/* eslint-disable */
import React, { Component } from "react";
import { Modal, Card } from "react-bootstrap";
class BookMakerRules extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { show } = this.props;
        return (
            <Modal show={show} style={{ opacity: 1 }} size="xl" scrollable="true">
                <Modal.Header className="text-white" className="bg">
                    <div className="bg w-100 d-flex flex-row justify-content-between">
                        <h4 className="text-white"> Rules</h4>
                        <h6 className="text-right">
                            <i
                                class="fa fa-times text-white"
                                aria-hidden="true"
                                onClick={() => this.props.ModalClose()}
                                style={{ cursor: "pointer" }}
                            />
                        </h6>
                    </div>
                </Modal.Header>

                <Modal.Body>
                    <Card className="bg1 w-100">
                        <h3 className="text-white ml-2 mt-1"> Bookmaker </h3>
                    </Card>
                    <div class="list-group px-5 mt-3">
        <table class="table table-bordered1 font-weight-normal">
          <tbody>
            <tr>
              <td>
                <p className="text">
                  {" "}
                  Due to any reason any team will be getting advantage or
                  disadvantage we are not concerned.
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <p className="text">
                  We will simply compare both teams 25 overs score higher score
                  team will be declared winner in ODI (25 over comparison)
                </p>
              </td>
            </tr>{" "}
            <tr>
              <td>
                <p className="text">
                  We will simply compare both teams 10 overs higher score team
                  will be declared winner in T20 matches (10 over comparison)
                </p>
              </td>
            </tr>{" "}
            <tr>
              <td>
                <p className="text1">
                  Total Wickets - Average 12 wickets will be given in case match
                  abandoned or over reduced
                </p>
              </td>
            </tr>{" "}
            <tr>
              <td>
                <p className="text">
                  Any query about the result or rates should be contacted within
                  7 days of the specific event, the same will not be considered
                  valid post 7 days from the event.
                </p>
              </td>
            </tr>{" "}
            <tr>
              <td>
                <p className="text1">
                  Football-Spain LaLiga winner 2019-2020 without Barcelona &
                  Real Madrid
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <p className="text">
                  Highest point scoring team in the league table excluding
                  Barcelona & Real Madrid will be considered as winner of this
                  event
                </p>
              </td>
            </tr>{" "}
            <tr>
              <td>
                <p className="text">
                  If two team ends up with equal points, then result will be
                  given based on the official point table
                </p>
              </td>
            </tr>{" "}
          </tbody>
        </table>
      </div>
    
                </Modal.Body>
            </Modal>
        );
    }
}

export default BookMakerRules;
