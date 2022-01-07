import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { Link} from "react-router-dom";
class WelcomeModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userBetList: [],
        };
    }

    render() {
        const { show, userBetList } = this.props;
        return (
            <Modal
                show={show}
                style={{ opacity: 1 }}
                size="lg"
            >
                <Modal.Header className="text-white" className="bg" style={{ height: "50px" }}>
                    <div className="bg w-100 d-flex flex-row justify-content-between">
                        <h5 className="text-white">
                            My Market
                      </h5>
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
                    <table class="table">
                        <thead className="table-borderless">
                            <tr>
                                <th scope="col">Event Type</th>
                                <th scope="col">Event Name</th>
                                <th scope="col">Trade</th>
                            </tr>
                        </thead>
                        <tbody className="font-weight-normal mt-2">
                            {userBetList
                                ? Object.entries(userBetList).map(([key, value]) => {
                                    let date = new Date();
                                    return (
                                        <tr>
                                            <td>
                                                {value.event_type}
                                            </td>
                                            <td>

                                                <Link
                                                    to={{
                                                        pathname:
                                                            "/matchdetail/" +
                                                            key +
                                                            "/" +
                                                            value.event_type + "/"
                                                            +
                                                            "0"
                                                    }}
                                                > {value.match_name}</Link>
                                            </td>
                                            <td>
                                                {value.total_bet}
                                            </td></tr>
                                    )
                                })
                                : (
                                    <tr className="profit font-weight-normal mt-1 mb-1 w-100"> No real-time  records found!</tr>
                                )}


                        </tbody>
                    </table>

                </Modal.Body>
            </Modal>
        );
    }
}

export default WelcomeModal;
