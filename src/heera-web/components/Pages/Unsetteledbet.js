import React, { Component } from "react";
import Nav from "../Include/Nav";
import Menu from "../Include/Menu";
import Footer from "../Include/footer";
import Sidebar from "../Include/Sidebar";
import { Redirect } from "react-router-dom";
import ReactPaginate from "react-paginate";
import axios from "axios";
import Moment from "moment";
const $ = window.$;
const baseUrl = "http://api.encabook999.com:4000";
class MyBetList extends Component {
  constructor(props) {
    super(props);
    var accessToken = localStorage.getItem("token");
    this.state = {
      accessToken: accessToken,
      betDataFound: false,
      gotoindex: false,
      getResults: [],
      startDate: new Date(),
      endDate: new Date(),
      offset: 0,
      data: [],
      perPage: 10,
      currentPage: 0,
      isLoding: false,
    };
  }
  goToIndex = () => {
    if (this.state.gotoindex === true) {
      return <Redirect to="/matches/4" />;
    }
  };
  componentDidMount() {
    this.callMyBetList();
  }
  callMyBetList = () => {
    let headers = {
      Authorization: "Bearer " + this.state.accessToken,
    };
    axios.get(baseUrl + "/api/userbetlist_new", { headers }).then((resp) => {
      var resps = resp.data;
      if (resps.success === true) {
        this.receivedData(resps.Betlist);
      }
    });
  };
  receivedData(tabledata) {
    const data = tabledata;
    const slice = data.slice(
      this.state.offset,
      this.state.offset + this.state.perPage
    );
    this.setState({
      pageCount: Math.ceil(data.length / this.state.perPage),
      isLoding: false,
      getResults: slice
    });
  }
  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;
    this.setState(
       {
          currentPage: selectedPage,
          offset: offset,
       },
       () => {
          this.callMyBetList();
       }
    );
 };
  render() {
    var accessToken = this.state.accessToken;
    if (accessToken === "" || accessToken === null) {
      return <Redirect to="/login" />;
    }
    var change_password = localStorage.getItem("change_password");
    if (change_password != "" && change_password != null) {
      return <Redirect to="/change_password" />;
    }

    const { getResults } = this.state;
    return (
      <div>
        {this.goToIndex()}
        <Nav />
        <Menu />
        <div id="wrapper">
          <Sidebar />
          <div id="content-wrapper">
            <div className="container-fluid re_man_p0">
              <div className="card">
                <div className=" card-header breadcrumb">Un-Setteled Bet</div>
                <div className="card-body">
                  <table id="customers1">
                    <thead>
                      <tr>
                        <th className="text-center">No</th>
                        <th className="text-center">Event Name	</th>
                        <th className="text-center">Nation</th>
                        <th className="text-center">Event Type	</th>
                        <th className="text-center">Side</th>
                        <th className="text-center">Rate</th>
                        <th className="text-center">Amount</th>
                        <th className="text-center">Place Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        getResults && getResults.length ? (
                          getResults.map((item, index) => {
                            return (
                              <tr key={index} className={item.bet_type ==="back" ||item.no ==="yes" ? "back" : "lay"}>
                                <td className="text-center">
                                  {index + 1}
                                </td>
                                <td className="text-center">
                                  {item.match_name ? item.match_name : null}
                                </td>
                                <td className="text-center">

                                  {item.team_name ? item.team_name : null}
                                </td>
                                <td className="text-center">
                                  {item.event_type ? item.event_type : null}
                                </td>
                                <td className="text-center">
                                  {item.bet_type ? item.bet_type : null}
                                </td>
                                <td className="text-center">
                                  {item.odds ? item.odds : null}
                                </td>
                                <td className="text-center">
                                  {item.stake ? item.stake : null}
                                </td>
                                <td className="text-center">
                                  {Moment(
                                    item.createdDate
                                      ? item.createdDate
                                      : null
                                  ).format("YYYY-MM-DD HH:mm")}
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr><td colspan="8"><h6
                            className="text-center">There are no records to show</h6></td></tr>
                        )
                      }
                    </tbody>
                  </table>

                  <div className="d-flex justify-content-end">
                    <ReactPaginate
                      previousLabel={"prev"}
                      nextLabel={"next"}
                      breakLabel={"..."}
                      breakClassName={"break-me"}
                      pageCount={this.state.pageCount}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={5}
                      onPageChange={this.handlePageClick}
                      containerClassName={"pagination"}
                      subContainerClassName={"pages pagination"}
                      activeClassName={"active"}
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default MyBetList;
