import React, { Component } from "react";
import Nav from "../Include/Nav";
import Menu from "../Include/Menu";
import Footer from "../Include/footer";
import Sidebar from "../Include/Sidebar";
import ReactPaginate from "react-paginate";
import Loader from "../Loader/Loader";
import axios from "axios";
import Moment from "moment";
class CasinoReport extends Component {
  constructor(props) {
    super(props);
    var accessToken = localStorage.getItem("token");
    this.state = {
      accessToken: accessToken,
      CasinoDetail: [],
      isLoding: false,
      offset: 0,
      data: [],
      tabledata: [],
      perPage: 10,
      currentPage: 0,
      isLoding: false,
      user_id: "",
    };
  }
  componentDidMount() {
    this.callCasinoTable();
  }

  callCasinoTable = (user_id) => {
    let user_id = localStorage.getItem("user_id");
    this.setState({ isLoding: true });
    let headers = {
      Authorization: "Bearer " + this.state.accessToken,
    };
    let json = {
      user_id: user_id,
    };
    axios
      .post("http://api.encabook999.com/casinotransactions", json)
      .then((resp) => {
        if (resp.data) {
          this.setState({ tabledata: resp.data }, () => this.receivedData());
        } else {
          this.setState({ isLoding: false });
        }
      });
  };

  receivedData() {
    const data = this.state.tabledata;
    const slice = data.slice(
      this.state.offset,
      this.state.offset + this.state.perPage
    );
    this.setState({
      pageCount: Math.ceil(data.length / this.state.perPage),
      isLoding: false,
      CasinoDetail: slice,
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
        this.receivedData();
      }
    );
  };
  render() {
    const { CasinoDetail, isLoding } = this.state;
    return (
      <div>
        <Nav />
        <Menu />
        <div id="wrapper">
          <Sidebar />
          <div id="content-wrapper">
            <div className="container-fluid re_man_p0">
              <div className="card">
                <div className=" card-header breadcrumb">
                  Casino Report History
                </div>

                <div className="table-responsive">
                  <table id="customers">
                    <thead>
                      <tr>
                        <th scope="col" className="text-center">
                          {" "}
                          <span>Amount</span>
                        </th>
                        <th scope="col" className="text-center">
                          <span>Game Id</span>
                        </th>
                        <th scope="col" className="text-center">
                          <span>Game Name</span>
                        </th>
                        <th scope="col" className="text-center">
                          {" "}
                          <span>Balance</span>
                        </th>

                        <th scope="col" className="text-center">
                          {" "}
                          <span>Remark</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {!isLoding ? (
                        CasinoDetail && CasinoDetail.length ? (
                          CasinoDetail.map((item, index) => {
                            return (
                              <tr key={index} className="text-center">
                                <td className="text-center">
                                  <div>
                                    {item.amount && item.amount
                                      ? item.amount
                                      : null}
                                  </div>
                                </td>
                                <td className="text-center">
                                  <div>
                                    {item.game_id && item.game_id
                                      ? item.game_id
                                      : null}
                                  </div>
                                </td>
                                <td className="text-center">
                                  <div>
                                    {item.game_code ? item.game_code : "-"}
                                  </div>
                                </td>
                                <td className="text-center">
                                  <div>
                                    {item.balance && item.balance
                                      ? item.balance
                                      : null}
                                  </div>
                                </td>

                                <td className="text-center text-uppercase">
                                  <div>
                                    {item.transaction_type &&
                                    item.transaction_type
                                      ? item.transaction_type
                                      : null}
                                  </div>
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr>
                            <td colSpan="8" className="text-center">
                              <h4 className="text-center">Not Found</h4>
                            </td>
                          </tr>
                        )
                      ) : (
                        <tr className="text-center">
                          <td colSpan="8" className="text-center">
                            <Loader />
                          </td>
                        </tr>
                      )}
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

export default CasinoReport;
