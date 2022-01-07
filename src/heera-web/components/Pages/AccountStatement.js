import React, { Component } from 'react';
import Nav from '../Include/Nav';
import Menu from '../Include/Menu';
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import Moment from 'moment';
import NumberFormat from 'react-number-format';
import Url from "../configure/configure.js";
const $ = window.$;
const baseUrl = Url.baseUrl;

class AccountStatement extends Component {

	constructor(props) {
		super(props);
		var accessToken = localStorage.getItem("token");
		var user_id = localStorage.getItem("user_id");
		this.state = {
			accessToken: accessToken, collapsed: false,
			getFirstLay: false, getSecondBack: false, user_id: user_id, oddsfirstlay: "",
			matchids: "", BatAmount_second: "", proFitfirstval: "", proFitsecondval: "", getFancybet: false, getFancySecondbet: false,pancypickCall:false
		};
	}

	onFirstLayClick = () => {
		const { getFirstLay } = this.state;
		this.setState(() => ({
			getFirstLay: !getFirstLay
		}));
	};

	onSecondLayClick = () => {
		const { getSecondBack } = this.state;
		this.setState(() => ({
			getSecondBack: !getSecondBack
		}));
	};


	getFancybet = () => {
		if (this.state.getFancybet === true) {
			return (<tr style={{ background: "#F3DCE2" }}>
				<td className="text-center"><a href="#" className="text-danger"> <i className="fa fa-times"></i> </a></td>
				<td id="team_nm">{this.state.teamname1}</td>
				<td style={{ width: "75px" }} >
					<div className="form-group">
						<input value={this.state.amountFancybetBal} name="amountFancybetBal" className="amountint" onChange={this.handleChange} type="number" style={{ float: "left", width: "45px", verticalAlign: "middle" }} id="odds" readOnly required="required" />
					</div>
				</td>
				<td>
					<div className="form-group bet-stake">
						<input value={this.state.amountFancybetFirst} name="amountFancybetFirst" type="text" onChange={this.handleChange} id="btn_val" style={{ width: "52px" }} maxLength="10" required="required" />
					</div>
				</td>  </tr>);
		}
	}
	getFancybetPoint = () => {

		if (this.state.getFancybet === true) {

			return (<tr style={{ background: "#F3DCE2" }}>
				<td colSpan="5" style={{ padding: "5px" }} className="value-buttons">
					<button className="btn btn-success btn_dyn" value="4" onClick={e => this.onTestClickFancyFirst(e)}>4</button>
					<button className="btn btn-success btn_dyn" value="20" onClick={e => this.onTestClickFancyFirst(e)}>20</button>
					<button className="btn btn-success btn_dyn" value="30" onClick={e => this.onTestClickFancyFirst(e)}>30</button>
					<button className="btn btn-success btn_dyn" value="50" onClick={e => this.onTestClickFancyFirst(e)}>50</button>
					<button className="btn btn-success btn_dyn" value="500" onClick={e => this.onTestClickFancyFirst(e)}>500</button>
					<button className="btn btn-success btn_dyn" value="1000" onClick={e => this.onTestClickFancyFirst(e)}>1000</button>
				</td></tr>);
		}
	}


	getFirstLayPoint = () => {

		if (this.state.getFirstLay === true) {

			return (<tr style={{ background: "#F3DCE2" }}>
				<td colSpan="5" style={{ padding: "5px" }} className="value-buttons">
					<button className="btn btn-success btn_dyn" value="4" onClick={e => this.onTestClick(e)}>4</button>
					<button className="btn btn-success btn_dyn" value="20" onClick={e => this.onTestClick(e)}>20</button>
					<button className="btn btn-success btn_dyn" value="30" onClick={e => this.onTestClick(e)}>30</button>
					<button className="btn btn-success btn_dyn" value="50" onClick={e => this.onTestClick(e)}>50</button>
					<button className="btn btn-success btn_dyn" value="500" onClick={e => this.onTestClick(e)}>500</button>
					<button className="btn btn-success btn_dyn" value="1000" onClick={e => this.onTestClick(e)}>1000</button>
				</td></tr>);
		}
	}
	// getFirstLayLiability = () => {

	// 	if (this.state.getFirstLay === true) {

	// 		return (<tr style={{ background: "#F3DCE2" }}>
	// 			<td></td><td></td><td></td><td>Liability</td>
	// 			<td> {this.state.proFitfirstval}</td></tr>);
	// 	}
	// }
	getSecondLayPoint = () => {

		if (this.state.getSecondBack === true) {

			return (<tr style={{ background: "#BEDDF4" }}>
				<td colSpan="5" style={{ padding: "5px" }} className="value-buttons">
					<button className="btn btn-success btn_dyn" value="4" onClick={e => this.onTestClickSecond(e)}>4</button>
					<button className="btn btn-success btn_dyn" value="20" onClick={e => this.onTestClickSecond(e)}>20</button>
					<button className="btn btn-success btn_dyn" value="30" onClick={e => this.onTestClickSecond(e)}>30</button>
					<button className="btn btn-success btn_dyn" value="50" onClick={e => this.onTestClickSecond(e)}>50</button>
					<button className="btn btn-success btn_dyn" value="500" onClick={e => this.onTestClickSecond(e)}>500</button>
					<button className="btn btn-success btn_dyn" value="1000" onClick={e => this.onTestClickSecond(e)}>1000</button>
				</td></tr>);
		}
	}
	getSecondFancybetPoint = () => {

		if (this.state.getFancySecondbet === true) {

			return (<tr style={{ background: "#BEDDF4" }}>
				<td colSpan="5" style={{ padding: "5px" }} className="value-buttons">
					<button className="btn btn-success btn_dyn" value="4" onClick={e => this.onTestClickFancySecond(e)}>4</button>
					<button className="btn btn-success btn_dyn" value="20" onClick={e => this.onTestClickFancySecond(e)}>20</button>
					<button className="btn btn-success btn_dyn" value="30" onClick={e => this.onTestClickFancySecond(e)}>30</button>
					<button className="btn btn-success btn_dyn" value="50" onClick={e => this.onTestClickFancySecond(e)}>50</button>
					<button className="btn btn-success btn_dyn" value="500" onClick={e => this.onTestClickFancySecond(e)}>500</button>
					<button className="btn btn-success btn_dyn" value="1000" onClick={e => this.onTestClickFancySecond(e)}>1000</button>
				</td></tr>);
		}
	}
	// getSecondLayLiability = () => {
	// 	if (this.state.getSecondBack === true) {
	// 		return (<tr style={{ background: "#BEDDF4" }}>
	// 			<td></td><td></td><td></td><td>Liability</td>
	// 			<td>{this.state.proFitsecondval}</td></tr>);
	// 	}
	// }

	getFirstLay = () => {
		if (this.state.getFirstLay === true) {
			return (<tr style={{ background: "#F3DCE2" }}>
				<td className="text-center"><a href="#" className="text-danger"> <i className="fa fa-times"></i> </a></td>
				<td id="team_nm">{this.state.teamname1}</td>
				<td style={{ width: "75px" }} >
					<div className="form-group">
						<input value={this.state.lastPriceTraded1} name="lastPriceTraded1" className="amountint" onChange={this.handleChange} type="text" style={{ float: "left", width: "45px", verticalAlign: "middle" }} id="odds" required="required" readOnly/>
					</div>
				</td>
				<td>
					<div className="form-group bet-stake">
						<input value={this.state.amountshowFirst} name="amountshowFirst" type="text" onChange={this.handleChange} id="btn_val" style={{ width: "52px" }} maxLength="10" required="required" />
					</div>
				</td> <td id="prft" className="text-right"><input value={this.state.proFitfirstval} name="proFitsecondval" onChange={this.handleChange} type="text" readOnly style={{ float: "left", width: "45px", verticalAlign: "middle" }} /></td></tr>);
		}
	}
	getSecondBack = () => {
		if (this.state.getSecondBack === true) {
			return (<tr style={{ background: "#BEDDF4" }}>
				<td className="text-center"><a href="#" className="text-danger"> <i className="fa fa-times"></i> </a></td>
				<td id="team_nm">{this.state.teamname2}</td>
				<td style={{ width: "75px" }} >
					<div className="form-group">
						<input value={this.state.lastPriceTraded2} name="lastPriceTraded2" className="amountint" onChange={this.handleChange} type="number" required="required" maxLength="4" style={{ float: "left", width: "45px", verticalAlign: "middle" }} id="odds" />
					</div>
				</td>
				<td>
					<div className="form-group bet-stake">
						<input id="btn_val" style={{ width: "52px" }} maxLength="10" value={this.state.amountshowSecond} type="text" onChange={this.handleChange} required="required" />
					</div>
				</td>
				<td id="prft" className="text-right"><input value={this.state.proFitsecondval} name="proFitsecondval" onChange={this.handleChange} type="text" readOnly style={{ float: "left", width: "45px", verticalAlign: "middle" }} /></td></tr>);
		}
	}
	getFancySecondbet = () => {
		if (this.state.getFancySecondbet === true) {
			return (<tr style={{ background: "#BEDDF4" }}>
				<td className="text-center"><a href="#" className="text-danger"> <i className="fa fa-times"></i> </a></td>
				<td id="team_nm">{this.state.teamname2}</td>
				<td style={{ width: "75px" }} >
					<div className="form-group">
						<input value={this.state.amountFancybetBalSecond} name="lastPriceTraded2" className="amountint" onChange={this.handleChange} type="number" required="required" maxLength="4" style={{ float: "left", width: "45px", verticalAlign: "middle" }} id="odds" readOnly />
					</div>
				</td>
				<td>
					<div className="form-group bet-stake">
						<input id="btn_val" style={{ width: "52px" }} maxLength="10" value={this.state.amountFancybetSecond} type="text" onChange={this.handleChange} required="required" />
					</div>
				</td> </tr>);
		}
	}

	onTestClick(e) {
		e.preventDefault();
		const buttonValue = e.target.value;
		var minusone = (this.state.lastPriceTraded1 - 1);
		var multiplyval = (minusone * buttonValue);
		var numValue = new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 2 }).format(multiplyval);

		this.setState({
			amountshowFirst: buttonValue,
			proFitfirstval: numValue
		})
	}
	onTestClickSecond(e) {
		e.preventDefault();
		const buttonValue = e.target.value;
		var minusone = (this.state.lastPriceTraded2 - 1);
		var multiplyval = (minusone * buttonValue);
		var numValue = new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 2 }).format(multiplyval);
 
		this.setState({
			amountshowSecond: buttonValue,
			proFitsecondval: numValue
		})
	}

	onTestClickFancyFirst(e) {
		e.preventDefault();
		const buttonValue = e.target.value;
		var minusone = (this.state.lastPriceTraded1 - 1);
		var multiplyval = (minusone * buttonValue);
		var numValue = new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 2 }).format(multiplyval);

		this.setState({
			amountFancybetFirst: buttonValue 
		})
	}
onTestClickFancySecond(e) {
		e.preventDefault();
		const buttonValue = e.target.value;
		var minusone = (this.state.lastPriceTraded1 - 1);
		var multiplyval = (minusone * buttonValue);
		var numValue = new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 2 }).format(multiplyval);

		this.setState({
			amountFancybetSecond: buttonValue 
		})
	}
	cancelCourse = () => {
		window.location = "/matchdetail/" + this.state.matchids;
		//this.setState({ amountshowFirst: "", amountshowSecond: "", proFitfirstval: "", proFitsecondval: "" });
	}

	handleSubmit = (event) => {

		event.preventDefault();
		let savebet = {
			user_id: this.state.user_id,
			team_id: this.state.teamid1,
			team_id_second: this.state.teamid2,
			matchids: this.state.matchids,
			eventName: this.state.eventName,
			Odds: this.state.marketName,
			odds_first_lay: this.state.lastPriceTraded1,
			odds_second_lay: this.state.lastPriceTraded2,
			teamname: this.state.teamname1,
			teamname_second: this.state.teamname2,
			BatAmount: this.state.amountshowFirst,
			proFitfirstval: this.state.proFitfirstval,
			proFitsecondval: this.state.proFitsecondval,
			BatAmount_second: this.state.amountshowSecond,
			eventTypeId: this.state.eventTypeId,

		}; 
		axios.post(baseUrl + '/createbetuser', savebet).then((resp) => {
			if (resp.data.success != false) {
				this.setState({
					respStatus: resp.success,
				});
				window.location.href = "/matchdetail/" + resp.data.result.matchids;
			} else {
				this.setState({
					respMessage: resp.data.message,
				});
			}
		});

	}
	handleFancybetSubmit = (event) => {

		event.preventDefault();
		let savebet = {
			user_id: this.state.user_id,
			team_id: this.state.teamid1,
			team_id_second: this.state.teamid2,
			matchids: this.state.matchids,
			eventName: this.state.eventName,
			Odds: this.state.marketName,
			odds_first_lay: this.state.amountFancybetBal,
			odds_second_lay: this.state.amountFancybetBalSecond,
			teamname: this.state.teamname1,
			teamname_second: this.state.teamname2,
			BatAmount: this.state.amountFancybetFirst*this.state.amountFancybetBal,
			BatAmount_second: this.state.amountFancybetSecond*this.state.amountFancybetBalSecond,
			eventTypeId: this.state.eventTypeId,

		};
		axios.post(baseUrl + '/createbetuser', savebet).then((resp) => {
			if (resp.data.success != false) {
				this.setState({
					respStatus: resp.success,
				});
				window.location.href = "/matchdetail/" + resp.data.result.matchids;
			} else {
				this.setState({
					respMessage: resp.data.message,
				});
			}
		});

	}


	componentDidMount() {
		let headers = {
			Authorization: "Bearer " + this.state.accessToken,
		};
		let matchid = {
			id: this.props.match.params.id
		};
		axios.post(baseUrl + '/matchdetails', matchid).then((resp) => {
			var resp = resp.data;
			var getResult = JSON.parse(resp.data);
			if (resp.success === true) {
				this.setState({
					matchids: getResult.result.market.id,
					eventTypeId: getResult.result.market.eventTypeId,
					eventName: getResult.result.market.eventName,
					eventId: getResult.result.market.eventId,
					eventDetails: getResult.result.market.eventDetails,
					marketName: getResult.result.market.marketName,
					twoteamtotalmatch: getResult.result.market.totalMatched,
					teamname1: getResult.result.selections[0].name,
					teamname2: getResult.result.selections[1].name,
					totalMatched1: getResult.result.selections[0].totalMatched,
					teamid1: getResult.result.selections[0].id,
					teamid2: getResult.result.selections[1].id,
					totalMatched2: getResult.result.selections[1].totalMatched,
					lastPriceTraded1: getResult.result.selections[0].lastPriceTraded,
					lastPriceTraded2: getResult.result.selections[1].lastPriceTraded,
					status1: getResult.result.selections[0].status,
					status2: getResult.result.selections[1].status,
				});
			}
		});
		axios.get(baseUrl + '/userbetlist', { headers }).then((resp) => {
			var resps = resp.data;

			if (resps.success === true) {
				this.setState({ getResults: resps.Betlist, betDataFound: true });
			}
		});
		axios.get(baseUrl + '/fancybetlistFront', { headers }).then((resp) => {
			var resps = resp.data;

			if (resps.success === true) {
				this.setState({ fancybet_getResults: resps.fancybetlist, fancybet_betDataFound: true });
			}
		});

	}

	showTableHtml = () => {
		if (this.state.betDataFound === true) {
			const html = []
			this.state.getResults.map(function (value, i) {
				var inPlayClass = (value.inPlay === true) ? "active" : "";
				html.push(<tr>
					<td style={{ textAlign: "center" }}> {value.teamname}  </td>
					<td style={{ textAlign: "center" }}> {value.odds_lay}  </td>
					<td style={{ textAlign: "center" }}> {value.BatAmount}  </td>
				</tr>);
			})
			return <table className="table coupon-table">
				<thead>
					<tr>
						<th style={{ textAlign: "center" }} > Match Bat</th>
						<th style={{ textAlign: "center" }} > Odds</th>
						<th style={{ textAlign: "center" }} > Stake</th>
					</tr>
				</thead>
				<tbody>{html}</tbody>
			</table>;
		}
	}
	onFancybetClick = (e) => {
		let currVal = e.target.value;
		const { getFancybet } = this.state;
		this.setState(() => ({
			getFancybet: !getFancybet,
			amountFancybetBal:currVal
		}));    
	};
	onFancybetSecondClick = (f) => {
		let currSecVal = f.target.value; 
		const { getFancySecondbet } = this.state;
		this.setState(() => ({
			getFancySecondbet: !getFancySecondbet, 
			amountFancybetBalSecond:currSecVal
			
		}))
		$(".pancypick").click(function(){
			//console.log($(this).children().eq(0).html())
		
		}); 
	};
	showFancyTableHtml = () => {

		if (this.state.fancybet_betDataFound === true) {
			const html = []
		
			for(var a=0;a<this.state.fancybet_getResults.length;a++){
				const value=this.state.fancybet_getResults[a];

				html.push(
					<tr className="bet-info">
						<td className="team-name nation"> <span><strong style={{ color: "font-weight:normal" }} >{value.title}</strong></span>
							<p><span className="float-left book" id="book_175" style={{ color: "black" }}>0</span> <span className="float-right profit" id="profit_175"></span></p>
						</td>
						<td className="lay-color box-w1">
							<button className="bet-sec lay ses_row pancypick" value={value.no_first} onClick={this.onFancybetClick.bind(this)}> 
								<span className="odd Jaya" id={"nofirstpink"+a}>{value.no_first}</span>
								{value.no_second}
							</button></td>
						<td className="text-center back box-w1">
							<button className="bet-sec lay ses_row" value={value.yes_first} onClick={this.onFancybetSecondClick.bind(this)} >
							<span className="odd">{value.yes_first}</span>{value.yes_second}
							</button></td>
						<td className="text-right p-r-10 box-w2"><span>Min/Max</span><br></br> {value.minimum}/{value.maximum}</td>
					</tr>);	 
			}
			/*this.state.fancybet_getResults.map(function (value, i) { 
				html.push(
					<tr className="bet-info">
						<td className="team-name nation"> <span><strong style={{ color: "font-weight:normal" }} >{value.title}</strong></span>
							<p><span className="float-left book" id="book_175" style={{ color: "black" }}>0</span> <span className="float-right profit" id="profit_175"></span></p>
						</td>
						<td className="lay-color box-w1">
							<button className="bet-sec lay ses_row pancypick" onClick={fancyPink}>
								
								<span className="odd Jaya" id={"nofirstpink"+i}>{value.no_first}</span>
								<span className="span1">{value.no_second}</span>
							</button>
						</td>
						<td className="text-center back box-w1"><button className="bet-sec lay ses_row" onClick={fancySkyblue}>
							<span className="odd">{value.yes_first}</span><span className="span1">{value.yes_second}</span></button></td>
						<td className="text-right p-r-10 box-w2"><span>Min/Max</span><br></br> {value.minimum}/{value.maximum}</td>
					</tr>);
			})*/
			return <table className="coupon-table table table-bordered">
				<thead>
					<tr>
						<th></th>
						<th className="text-center  box-w1 lay">No</th>
						<th className="text-center  box-w1 lay">Yes</th>
						<th className="box-w2"></th>
					</tr>
				</thead>

				<tbody>{html} </tbody>
			</table>;
		}
	}
	handleChange = (event) => {
		let { name, value } = event.target;
		this.setState({ [name]: value });
	}
	render() {
		var accessToken = this.state.accessToken;

		if (accessToken === "" || accessToken === null) {
			return (
				<Redirect to="/login" />
			);
		}
		var change_password=localStorage.getItem("change_password")
   if (change_password!=""  && change_password!=null) {
      return (
         <Redirect to="/change_password" />
      );
   }

		return (
			<div>
				<Nav />
				<Menu/>
				<div id="wrapper">
					<ul className="sidebar navbar-nav">
					{/*<li className="nav-item all_sp">
							<span>All Sports</span>
	</li>*/}
						<li>
							<ul className="tree">
								<li className="">
									<a href="/4" style={{ color: "black" }}>  Home</a>
								</li>
								<li className="nav-item nav-link">
									<a href="/4" style={{ color: "black" }}> Cricket</a>
								</li>
								<li className="nav-item nav-link">
									<a href="/2" style={{ color: "black" }}>Tennis</a>
								</li>
								<li className="nav-item nav-link">
									<a href="/1" style={{ color: "black" }}>Football</a>
								</li>
								<li className="nav-item nav-link">
									<a href="/7" style={{ color: "black" }}> Horse Riding</a>
								</li>
							</ul>
						</li>
					</ul>
					<div id="content-wrapper">
						<div className="container-fluid">
						<div className="breadcrumb">Account Statement</div>
						<div className="card">
                  <div className="card-body">
                     <form>
                        <div className="datepicker-wrapper form-group">
                           <input id="date1" className="datepicker-trigger form-control" readonly="" required="" name="start" type="text" value="2020-01-14" />
                           <i className="fas fa-calendar-alt"></i>
                        </div> 
                        <span className="pto">to</span> 
                        <div className="datepicker-wrapper form-group">
                           <input id="date2" className="datepicker-trigger form-control" readonly="" required="" name="end" type="text" value="2020-01-20" />
                           <i className="fas fa-calendar-alt"></i>
                        </div>
                        <div className="select-report d-inline-block pto form-group">
                           <select id="bind_opt_select" className="form-control" name="q">
                              <option value="1" selected="selected">All</option>
                              <option value="2">Deposite/Withdrow Report</option>
                              <option value="3">Game Report</option>
                           </select>
                        </div>
                        <div className="d-inline-block ">
                           <button className="btn btn-primary" value="submit" type="submit">Submit</button>
                        </div>
                     </form>
                     <div className="table-responsive">
                        <div id="account-statement_wrapper" className="dataTables_wrapper ">
                           <div className="row">
                              <div className="col-sm-12 col-md-6">
                                 <div className="dataTables_length" id="account-statement_length">
                                    <label>
                                       Show
                                       <select name="account-statement_length" aria-controls="account-statement" className="form-control form-control-sm">
                                          <option value="10">10</option>
                                          <option value="25">25</option>
                                          <option value="50">50</option>
                                          <option value="100">100</option>
                                       </select>
                                       entries
                                    </label>
                                 </div>
                              </div>
                              <div className="col-sm-12 col-md-6">
                                 <div id="account-statement_filter" className="dataTables_filter">
                                    <label>Search:<input type="search" className="form-control form-control-sm" placeholder="" aria-controls="account-statement" /></label>
                                 </div>
                              </div>
                           </div>
                           <div className="row">
                              <div className="col-sm-12">
                                 <table id="account-statement" className="table table-striped table-bordered" role="grid" aria-describedby="account-statement_info">
                                    <thead>
                                       <tr role="row">
                                          <th className="text-center sorting" tabindex="0" aria-controls="account-statement" rowspan="1" colspan="1" aria-label="Date: activate to sort column ascending" style={{ width: "118px" }} >Date</th>
                                          <th className="text-center sorting" tabindex="0" aria-controls="account-statement" rowspan="1" colspan="1" aria-label="Sr no: activate to sort column ascending" style={{ width: "64px" }}>Sr no</th>
                                          <th className="text-right sorting" tabindex="0" aria-controls="account-statement" rowspan="1" colspan="1" aria-label="Credit: activate to sort column ascending"  style={{ width: "72px" }}>Credit</th>
                                          <th className="text-right sorting" tabindex="0" aria-controls="account-statement" rowspan="1" colspan="1" aria-label="Debit: activate to sort column ascending" style={{ width: "63px" }}>Debit</th>
                                          <th className="text-right sorting" tabindex="0" aria-controls="account-statement" rowspan="1" colspan="1" aria-label="Balance: activate to sort column ascending"  style={{ width: "92px" }}>Balance</th>
                                          <th style={{ width: "501px" }} className="sorting_asc" tabindex="0" aria-controls="account-statement" rowspan="1" colspan="1" aria-label="Remark: activate to sort column descending" aria-sort="ascending">Remark</th>
                                       </tr>
                                    </thead>
                                    <tbody>
                                       <tr role="row" className="odd">
                                          <td className="text-center">2020-01-14</td>
                                          <td></td>
                                          <td className="text-right">0.00</td>
                                          <td className="text-right"></td>
                                          <td className="text-right">0.00</td>
                                          <td className="text-left sorting_1">opening Balance</td>
                                       </tr>
                                    </tbody>
                                 </table>
                              </div>
                           </div>
                           <div className="row">
                              <div className="col-sm-12 col-md-5">
                                 <div className="dataTables_info" id="account-statement_info" role="status" aria-live="polite">Showing 1 to 1 of 1 entries</div>
                              </div>
                              <div className="col-sm-12 col-md-7">
                                 <div className="dataTables_paginate paging_simple_numbers" id="account-statement_paginate">
                                    <ul className="pagination">
                                       <li className="paginate_button page-item previous disabled" id="account-statement_previous"><a href="#" aria-controls="account-statement" data-dt-idx="0" tabindex="0" className="page-link">Previous</a></li>
                                       <li className="paginate_button page-item active"><a href="#" aria-controls="account-statement" data-dt-idx="1" tabindex="0" className="page-link">1</a></li>
                                       <li className="paginate_button page-item next disabled" id="account-statement_next"><a href="#" aria-controls="account-statement" data-dt-idx="2" tabindex="0" className="page-link">Next</a></li>
                                    </ul>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default AccountStatement;
