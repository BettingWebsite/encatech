/* eslint-disable */
import React, { Component } from "react";
import { Modal, Card } from "react-bootstrap";
class FancyRulesModal extends Component {
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
                        <h3 className="text-white ml-2 mt-1">Fancy</h3>
                    </Card>
                    <div class="list-group px-5 mt-3">
                        <table class="table table-bordered1 font-weight-normal">
                            <tbody>
                                <tr>
                                    <td>
                                        <p className="text">
                                            {" "}
                            1. All fancy bets will be validated when match has
                            been tied.
                          </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p className="text">
                                            2. All advance fancy will be suspended before toss
                                            or weather condition.
                          </p>
                                    </td>
                                </tr>{" "}
                                <tr>
                                    <td>
                                        <p className="text">
                                            3. In case technical error or any circumstances any
                                            fancy is suspended and does not resume result will
                                            be given all previous bets will be valid (based on
                                            haar/jeet).
                          </p>
                                    </td>
                                </tr>{" "}
                                <tr>
                                    <td>
                                        <p className="text">
                                            4. If any case wrong rate has been given in fancy
                                            that particular bets will be cancelled.
                          </p>
                                    </td>
                                </tr>{" "}
                                <tr>
                                    <td>
                                        <p className="text">
                                            5. In any circumstances management decision will be
                                            final related to all exchange items. Our scorecard
                                            will be considered as valid if there is any mismatch
                                            in online portal
                          </p>
                                    </td>
                                </tr>{" "}
                                <tr>
                                    <td>
                                        <p className="text">
                                            6. In case customer make bets in wrong fancy we are
                                            not liable to delete, no changes will be made and
                                            bets will be consider as confirm bet.
                          </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p className="text">
                                            7. Due to any technical error market is open and
                                            result has came all bets after result will be
                                            deleted.
                          </p>
                                    </td>
                                </tr>{" "}
                                <tr>
                                    <td>
                                        <p className="text">
                                            8. Manual bets are not accepted in our exchange
                          </p>
                                    </td>
                                </tr>{" "}
                                <tr>
                                    <td>
                                        <p className="text">
                                            9.Our exchange will provide 5 second delay in our
                                            tv.
                          </p>
                                    </td>
                                </tr>{" "}
                                <tr>
                                    <td>
                                        <p className="text">
                                            10. Company reserves the right to suspend/void any
                                            id/bets if the same is found to be illegitimate. For
                                            example incase of vpn/robot-use/multiple entry from
                                            same IP and others. Note : only winning bets will be
                                            voided
                          </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p className="text">
                                            11. Once our exchange give username and password it
                                            is your responsibility to change a password.
                          </p>
                                    </td>
                                </tr>{" "}
                                <tr>
                                    <td>
                                        <p className="text">
                                            12. Penalty runs will not be counted in any fancy.
                          </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p className="text">
                                            13. Warning:- live scores and other data on this
                                            site is sourced from third party feeds and may be
                                            subject to time delays and/or be inaccurate. If you
                                            rely on this data to place bets, you do so at your
                                            own risk. Our exchange does not accept
                                            responsibility for loss suffered as a result of
                                            reliance on this data.
                          </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p className="text">
                                            14. Our exchange is not responsible for misuse of
                                            client id.
                          </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p className="text">Test</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p className="text">1 Session:</p>
                                    </td>
                                </tr>{" "}
                                <tr>
                                    <td>
                                        <p className="text1">
                                            1.1 Complete session valid in test.
                          </p>
                                    </td>
                                </tr>{" "}
                                <tr>
                                    <td>
                                        <p className="text1">
                                            1.2 Session is not completed for ex:- India 60 over
                                            run session Ind is running in case India team
                                            declares or all-out at 55 over next 5 over session
                                            will be continue in England inning.
                          </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p className="text1">
                                            1.3 1st day 1st session run minimum 25 over will be
                                            played then result is given otherwise 1st day 1st
                                            session will be deleted.
                          </p>
                                    </td>
                                </tr>{" "}
                                <tr>
                                    <td>
                                        <p className="text1">
                                            1.5 1st day total run minimum 80 over will be played
                                            then result is given otherwise 1st day total run
                                            will be deleted.
                          </p>
                                    </td>
                                </tr>{" "}
                                <tr>
                                    <td>
                                        <p className="text1">
                                            1.6 Test match both advance session is valid.
                          </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p className="text">2 Test lambi/ Inning run:-</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p className="text1">
                                            2.1 Mandatory 70 over played in test lambi paari/
                                            Innings run. If any team all-out or declaration
                                            lambi paari/ innings run is valid.
                          </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p className="text1">
                                            2.2 In case due to weather situation match has been
                                            stopped all lambi trades will be deleted.
                          </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p className="text1">
                                            2.3 In test both lambi paari / inning run is valid
                                            in advance fancy.
                          </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p className="text">
                                            2.3 In test both lambi paari / inning run is valid
                                            in advance fancy.
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

export default FancyRulesModal;
