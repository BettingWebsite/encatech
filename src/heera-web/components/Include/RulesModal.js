/* eslint-disable */
import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Modal } from "react-bootstrap";
import IPL from "./IPL";
import Bookmaker from "./Bookmaker";
import LounchFavourite from "./LunchFavourite";
import BigBash from "./BigBash";
class RulesModal extends Component {
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

        <Modal.Body style={{ height: "600px" }}>
          <Tabs className="d-flex flex-row">
            <TabList className="d-flex flex-column h-100">
              <Tab className="item list-group-item list-group-item-action">
                Fancy
              </Tab>
              <Tab className="item list-group-item list-group-item-action">
                Match
              </Tab>
              <Tab className="item list-group-item list-group-item-action">
                IPL
              </Tab>
              <Tab className="item list-group-item list-group-item-action">
                Bookmaker
              </Tab>{" "}
              <Tab className="item list-group-item list-group-item-action">
                Teenpatti
              </Tab>{" "}
              <Tab className="item list-group-item list-group-item-action">
                Lunch Favourite
              </Tab>{" "}
              <Tab className="item list-group-item list-group-item-action">
                Kabaddi
              </Tab>{" "}
              <Tab className="item list-group-item list-group-item-action">
                Election
              </Tab>{" "}
              <Tab className="item list-group-item list-group-item-action">
                Motor Sport
              </Tab>{" "}
              <Tab className="item list-group-item list-group-item-action">
                Mixed Martial Arts
              </Tab>{" "}
              <Tab className="item list-group-item list-group-item-action">
                Big Bash League
              </Tab>{" "}
              <Tab className="item list-group-item list-group-item-action">
                Fancy Market 1
              </Tab>
              <Tab className="item list-group-item list-group-item-action">
                CricketCasino
              </Tab>
              <Tab className="item list-group-item list-group-item-action">
                Politics
              </Tab>
              <Tab className="item list-group-item list-group-item-action">
                World Cup
              </Tab>
              <Tab className="item list-group-item list-group-item-action">
                Binary
              </Tab>
              <Tab className="item list-group-item list-group-item-action">
                Khado
              </Tab>
            </TabList>

            <div className="">
              <TabPanel>
                <div className="card2 bg1 w-100 d-flex align-items-center">
                  <h4 className="px-3"> Fancy</h4>
                </div>
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
              </TabPanel>
              <TabPanel>
                <div className="card2 bg1 w-100 d-flex align-items-center">
                  <h4 className="px-3">Match</h4>
                </div>
                <div class="list-group px-5 mt-3">
                  <table class="table table-bordered font-weight-normal">
                    <tbody>
                      <tr className="bg2 px-3">
                        <td>
                          <p className="text text-center text-white">
                            No Record
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </TabPanel>
              <TabPanel>
                <div className="card2 bg1 w-100 d-flex align-items-center">
                  <h4 className="px-3">IPL</h4>
                </div>
                <IPL />
              </TabPanel>
              <TabPanel>
                <div className="card2 bg1 w-100 d-flex align-items-center">
                  <h4 className="px-3">Bookmaker</h4>
                </div>
                <Bookmaker />
              </TabPanel>
              <TabPanel>
                <div className="card2 bg1 w-100 d-flex align-items-center">
                  <h4 className="px-3">Teenpatti</h4>
                </div>

                <div class="list-group px-5 mt-3">
                  <table class="table table-bordered font-weight-normal">
                    <tbody>
                      <tr className="bg2 px-3">
                        <td>
                          <p className="text text-center text-white">
                            No Record
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </TabPanel>
              <TabPanel>
                <div className="card2 bg1 w-100 d-flex align-items-center">
                  <h4 className="px-3">Lunch Favourite</h4>
                </div>
                <LounchFavourite />
              </TabPanel>
              <TabPanel>
                <div className="card2 bg1 w-100 d-flex align-items-center">
                  <h4 className="px-3">Kabaddi</h4>
                </div>
                <div class="list-group px-5 mt-3">
                  <table class="table table-bordered font-weight-normal">
                    <tbody>
                      <tr>
                        <td>
                          <p className="text">
                            1. For Playoffs , Final result of 40 minutes of two
                            halves will be valid in our exchange.
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </TabPanel>
              <TabPanel>
                <div className="card2 bg1 w-100 d-flex align-items-center">
                  <h4 className="px-3">Election</h4>
                </div>

                <div class="list-group px-5 mt-3">
                  <table class="table table-bordered font-weight-normal">
                    <tbody>
                      <tr>
                        <td>
                          <p className="text">
                            1. The final result declared by election commission
                            of India for Loksabha election 2019 will be valid in
                            our exchange.
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="text">
                            2. Accidental issues during Loksabha election 2019
                            will not be counted in our exchange.
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </TabPanel>
              <TabPanel>
                <div className="card2 bg1 w-100 d-flex align-items-center">
                  <h4 className="px-3">Motor Sport</h4>
                </div>

                <div class="list-group px-5 mt-3">
                  <table class="table table-bordered font-weight-normal">
                    <tbody>
                      <tr className="bg2 px-3">
                        <td>
                          <p className="text text-center text-white">
                            No Record Found
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </TabPanel>
              <TabPanel>
                <div className="card2 bg1 w-100 d-flex align-items-center">
                  <h4 className="px-3">Mixed Martial Arts</h4>
                </div>
                <div class="list-group px-5 mt-3">
                  <table class="table table-bordered font-weight-normal">
                    <tbody>
                      <tr className="bg2 px-3">
                        <td>
                          <p className="text text-center text-white">
                            No Record Found
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </TabPanel>
              <TabPanel>
                <div className="card2 bg1 w-100 d-flex align-items-center">
                  <h4 className="px-3">Big Bash League</h4>
                </div>
                <BigBash />
              </TabPanel>
              <TabPanel>
                <div className="card2 bg1 w-100 d-flex align-items-center">
                  <h4 className="px-3">Fancy Market 1</h4>
                </div>

                <div class="list-group px-5 mt-3">
                  <table class="table table-bordered font-weight-normal">
                    <tbody>
                      <tr className="bg2 px-3">
                        <td>
                          <p className="text text-center text-white">
                            No Record Found
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </TabPanel>
              <TabPanel>
                <div className="card2 bg1 w-100 d-flex align-items-center">
                  <h4 className="px-3">CricketCasino</h4>
                </div>

                <div class="list-group px-5 mt-3">
                  <table class="table table-bordered font-weight-normal">
                    <tbody>
                      <tr className="bg2 px-3">
                        <td>
                          <p className="text text-center text-white">
                            No Record Found
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </TabPanel>
              <TabPanel>
                <div className="card2 bg1 w-100 d-flex align-items-center">
                  <h4 className="px-3">Politics</h4>
                </div>

                <div class="list-group px-5 mt-3">
                  <table class="table table-bordered font-weight-normal">
                    <tbody>
                      <tr className="bg2 px-3">
                        <td>
                          <p className="text text-center text-white">
                            No Record Found
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </TabPanel>
              <TabPanel>
                <div className="card2 bg1 w-100 d-flex align-items-center">
                  <h4 className="px-3">World Cup</h4>
                </div>

                <div class="list-group px-5 mt-3">
                  <table class="table table-bordered font-weight-normal">
                    <tbody>
                      <tr className="bg2 px-3">
                        <td>
                          <p className="text text-center text-white">
                            No Record Found
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </TabPanel>
              <TabPanel>
                <div className="card2 bg1 w-100 d-flex align-items-center">
                  <h4 className="px-3">Binary</h4>
                </div>

                <div class="list-group px-5 mt-3">
                  <table class="table table-bordered font-weight-normal">
                    <tbody>
                      <tr>
                        <td>
                          <p className="text">
                            1. All session's bets will be confirmed at market
                            rate only.
                          </p>
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <p className="text">
                            2. All session's settlement price means result can
                            be checked from exchange's official sites.
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="text">
                            3. All session's result will be settlement price
                            provided by exchange after market close.
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="text">
                            4. Every product has two types of prices SPOT and
                            FUTURE. We provide only near month's FUTURE price in
                            Binary Session. You can check it from the official
                            website of that product.
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="text">
                            5. Session's timings : NFY, B-NFY, AXS, ICI, RIL,
                            SBI, TT STL - Monday to Friday 10:00 a.m. to 2:30
                            p.m. GOLD, SILVER, CRUDE - Monday to Friday 11:30
                            a.m. to 10:30 p.m. CMX CRUDE, DOWJONES, NASDAQ, SNP
                            - Monday to Friday 7:30 p.m. to 12:00 a.m.
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </TabPanel>
              <TabPanel>
                <div className="card2 bg1 w-100 d-flex align-items-center">
                  <h4 className="px-3">Khado</h4>
                </div>
                <div class="list-group px-5 mt-3">
                  <table class="table table-bordered font-weight-normal">
                    <tbody>
                      <tr>
                        <td>
                          <p className="text1">
                            Only First inning valid for T20 and one day matches.
                          </p>
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <p className="text1">
                            Same will be work like Lambi. If match abandoned or
                            over reduced, all bets will be deleted.
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="text1">
                            You can choose your own value in this event.
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </TabPanel>
            </div>
          </Tabs>
        </Modal.Body>
      </Modal>
    );
  }
}

export default RulesModal;
