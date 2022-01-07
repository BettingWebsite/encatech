/* eslint-disable */
import React, { Component } from "react";
import { Modal, Card } from "react-bootstrap";
class MatchOddsRules extends Component {
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
                        <h3 className="text-white ml-2 mt-1"> Match </h3>
                    </Card>
                    <div class="list-group px-5 mt-3">
                        <table class="table table-bordered font-weight-normal">
                            <tbody>
                                <tr className="bg4 px-3">
                                    <td>
                                        <p className="text text-center text-dark">
                                            No Record Found
                          </p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

export default MatchOddsRules;
