import React, { Component } from 'react';
import Nav from "../Include/Nav";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
class Election extends Component {
    render() {
        return (
            <div>
                <Nav />
                <Tabs>
                    <TabList className="flex-row mobile-casino tabpad w-100">
                        <Tab>
                            <div className="texttab1 px-2">ODDS</div>
                        </Tab>
                        <Tab>
                            <div className="texttab1 px-2">MATCHED BET</div>
                        </Tab>

                    </TabList>
                    <TabPanel style={{ marginTop: "-15px" }}>
                        <div className="card-header3 px-2 w-100">
                            <span>Assembly Election</span>
                        </div>
                    </TabPanel>
                    <TabPanel style={{ marginTop: "-15px" }}>
                        <table className="table table-bordered1">
                            <thead>
                                <tr>
                                    <th style={{ textAlign: "left" }} colSpan="2">Nation</th>
                                    <th style={{ textAlign: "right" }}>Odds</th>
                                    <th style={{ textAlign: "right" }}>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan="5" className="text-center">
                                        <div className="profit"> No placed bet found !</div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                    </TabPanel>
                </Tabs>


            </div>

        );
    }
}

export default Election;
