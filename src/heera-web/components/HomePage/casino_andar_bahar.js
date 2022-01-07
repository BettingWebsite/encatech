import React, { Component } from 'react';
import Nav from '../Include/Nav';
import Menu from '../Include/Menu';
import Footer from '../Include/footer';
import Sidebar from '../Include/Sidebar';
import Url from "../configure/configure.js";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import Moment from 'moment';
import NumberFormat from 'react-number-format';
import Loading from 'react-fullscreen-loading';
import { useClearCache } from "react-clear-cache";
import socketIOClient from "socket.io-client";
import Timer from 'react-compound-timer'
import Modal from "react-bootstrap-modal";

var CryptoJS = require("crypto-js");
const ENDPOINT = "http://172.105.40.76:4010";

const $ = window.$;
const baseUrl = Url.baseUrl;

class Index extends Component {

	constructor(props) {
		super(props);
		var accessToken = localStorage.getItem("token");
		var user_id = localStorage.getItem("user_id");
		this.state = {
			accessToken: accessToken, 
			collapsed: false,
			draw:false,
			getFirstLay: false, 
			getSecondBack: false, 
			user_id: user_id, 
			oddsfirstlay: "",
			matchids: "", 
			BatAmount_second: "", 
			proFitfirstval: "", 
			proFitsecondval: "", 
			getFancybet: false, 
			getFancySecondbet: false,
			pancypickCall:false,
			stake_amount:"",
			respStatus:"",
			respMessage:"",
			emptyField:false,
			loading:true,
			team_profit1:"",
			team_profit2:"",
			new_array : {},
			stackAmount_team1:"",
			stackAmount_team2:"",
			profit22:"",
			profit_team:"",
			loss_team:"",
			profit12:0,
			profit13:0,
			loss:0,
			maxminBet:"",
			fancyDataFound:false,
			getFancyResults:"",
			betClick1:false,
			headname:"",
			SessInptNo:"",
			no:"",
			yes:"",
			status:"",
			buttonvalue_new:"",
			randomElement:""
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
	handleDepoWithdrPopupClose=()=>{
		this.setState({showUserAmountPopup1:false})
	}
	
	handleBidCrossClick123=()=>{
		
		this.setState({showUserAmountPopup1:true})
	}

	currentUserDetail = () => {
		let headers = {
			Authorization: "Bearer " + this.state.accessToken,
		}; 
		axios.get(baseUrl + '/current',{headers}).then((resp) => {  
			var resp= resp.data;
			this.setState({userData:resp})
		});  
	}	
	getUserCurrentBalance = () => {
		let headers = {
			Authorization: "Bearer " + this.state.accessToken,
		}; 
		axios.get(baseUrl + '/maxbet_minbet/'+this.props.match.params.id,{headers}).then((resp) => {  
			var resp= resp.data;
			this.setState({maxminBet:resp})
		});  
	}

	getFancybet = () => {
		if (this.state.getFancybet == true) {
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

		if (this.state.getFancybet == true) {

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

		if (this.state.getFirstLay == true) {
			

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

	// 	if (this.state.getFirstLay == true) {

	// 		return (<tr style={{ background: "#F3DCE2" }}>
	// 			<td></td><td></td><td></td><td>Liability</td>
	// 			<td> {this.state.proFitfirstval}</td></tr>);
	// 	}
	// }
	getSecondLayPoint = () => {

		if (this.state.getSecondBack == true) {

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

		if (this.state.getFancySecondbet == true) {

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
	// 	if (this.state.getSecondBack == true) {
	// 		return (<tr style={{ background: "#BEDDF4" }}>
	// 			<td></td><td></td><td></td><td>Liability</td>
	// 			<td>{this.state.proFitsecondval}</td></tr>);
	// 	}
	// }

	getFirstLay = () => {
		if (this.state.getFirstLay == true) {
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
		if (this.state.getSecondBack == true) {
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
		if (this.state.getFancySecondbet == true) {
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
		let headers = {
			Authorization: "Bearer " + this.state.accessToken,
		};
		
		
			
		let savebet = {
			event_name: "andarbahar",
			odds: this.state.oddVal,
			stake: this.state.stake_amount,
			event_id: this.state.mid,
			team_name: this.state.teamName,
			event_type :"andarbahar",
			type:"unmatch",
			casnio_type:"unmatch"
		}; 
		

		axios.post(baseUrl + '/createbetuser', savebet,{headers}).then((resp) => {
			var resp = resp.data;
			if(resp.success == true){
				this.setState({
					respStatus: resp.success,
					respMessage:resp.message,
					oddVal:"",
					stake_amount:"",
					profit:"",
					team_profit1:"",
					stackAmount_team1:"",
					team_profit2:"",
					stackAmount_team2:""
				});
				setTimeout(() => {this.setState({ respStatus: "" });}, 2000);
			} else {
				this.setState({
					respStatus: resp.success,
					respMessage:resp.message
				});
				setTimeout(() => {this.setState({ respStatus: "" });}, 2000);
			}
		
		});

		

	}
	handleSubmitSession = (event) => {
	
		event.preventDefault();
		let headers = {
			Authorization: "Bearer " + this.state.accessToken,
		};
		
		let matchid = this.props.match.params.id;
		var yes_amount="";
		var no_amount ="";
		
		if(this.state.no=="no"){
				no_amount=this.state.session_input;
		}
		if(this.state.yes=="yes"){
				yes_amount=this.state.session_input;
		}
		let savebet = {
			event_id: this.props.match.params.id,
			event_name: this.state.eventName,
			yes: this.state.yes,
			no: this.state.no,
			market_id: this.state.betMarketId,
			yes_amount:yes_amount,
			no_amount: no_amount,
			stake:this.state.stake_amount,
			headname:this.state.headname
			
			
		}; 
		

		axios.post(baseUrl + '/createbetusersession', savebet,{headers}).then((resp) => {
			var resp = resp.data;
			if(resp.success == true){
				this.setState({
					respStatus: resp.success,
					respMessage:resp.message,
					oddVal:"",
					stake_amount:"",
					profit:"",
					team_profit1:"",
					stackAmount_team1:"",
					team_profit2:"",
					stackAmount_team2:""
				});
				this.getUserCurrentBalance();
				this.showTableHtml();
				setTimeout(() => {this.setState({ respStatus: "" });}, 7000);
			} else {
				this.setState({
					respStatus: resp.success,
					respMessage:resp.message
				});
				setTimeout(() => {this.setState({ respStatus: "" });}, 7000);
			}
			this.callUserBetListApi();
		});

	}
	
	responseHtml = () =>{ 
		if(this.state.respStatus!=""){
			if(this.state.respStatus == false) {
				return (
				<div className="alert alert-danger">
				{this.state.respMessage}
				</div>
				)
			}
			else if(this.state.respStatus == true) {
				 return (
				  <div className="alert alert-success">
				  {this.state.respMessage}
				  </div>
				 )
			}
		}
    } 
  
   
	
	handleFancybetSubmit = (event) => {

		event.preventDefault();
		let savebet = {
			event_id: this.props.match.params.id,
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
		axios.get(baseUrl + '/andarbahar', { headers }).then((resp) => {
			this.setState({casinoresult:resp.data.Betlist})
		})
	

		const socket = socketIOClient(ENDPOINT);
		socket.on("FromAPI10", data => {
		 // console.log(data);
		
		 this.setState({casinodt20:data.data1.data})
		 this.callMatchOddsApi(data.data);
		});






	}
	
	



	
	
	
	callMatchOddsApi=(data)=>{
		const new_array = {};
		new_array['mid']=data.data.t1[0].mid;
		new_array['autotime']=data.data.t1[0].autotime;
		new_array['remark']=data.data.t1[0].remark;
		
		new_array['nation']=data.data.t2[0].nation;
		
		new_array['rate']=data.data.t2[0].rate;

		new_array['nation_1']=data.data.t2[1].nation;
		new_array['rate_1']=data.data.t2[1].rate;


		new_array['nation_2']=data.data.t2[2].nation;
		new_array['rate_2']=data.data.t2[2].rate;
		
		new_array['nation_3']=data.data.t2[3].nation;
		new_array['rate_3']=data.data.t2[3].rate;

		new_array['nation_4']=data.data.t2[4].nation;
		new_array['rate_4']=data.data.t2[4].rate;
		
		new_array['nation_5']=data.data.t2[5].nation;
		new_array['rate_5']=data.data.t2[5].rate;


		new_array['nation_6']=data.data.t2[6].nation;
		new_array['rate_6']=data.data.t2[6].rate;


		new_array['nation_7']=data.data.t2[7].nation;
		new_array['rate_7']=data.data.t2[7].rate;


		new_array['nation_8']=data.data.t2[8].nation;
		new_array['rate_8']=data.data.t2[8].rate;


		new_array['nation_9']=data.data.t2[9].nation;
		new_array['rate_9']=data.data.t2[9].rate;


		new_array['nation_10']=data.data.t2[10].nation;
		new_array['rate_10']=data.data.t2[10].rate;

		
		new_array['nation_11']=data.data.t2[11].nation;
		new_array['rate_11']=data.data.t2[11].rate;


		new_array['nation_12']=data.data.t2[12].nation;
		new_array['rate_12']=data.data.t2[12].rate;

		new_array['nation_13']=data.data.t2[13].nation;
		new_array['rate_13']=data.data.t2[13].rate;

		new_array['nation_14']=data.data.t2[14].nation;
		new_array['rate_14']=data.data.t2[14].rate;


		new_array['nation_15']=data.data.t2[15].nation;
		new_array['rate_15']=data.data.t2[15].rate;

		new_array['nation_16']=data.data.t2[16].nation;
		new_array['rate_16']=data.data.t2[16].rate;

		new_array['nation_17']=data.data.t2[17].nation;
		new_array['rate_17']=data.data.t2[17].rate;

		new_array['nation_18']=data.data.t2[18].nation;
		new_array['rate_18']=data.data.t2[18].rate;

		new_array['nation_19']=data.data.t2[19].nation;
		new_array['rate_19']=data.data.t2[19].rate;

		new_array['nation_20']=data.data.t2[20].nation;
		new_array['rate_20']=data.data.t2[20].rate;

		new_array['nation_21']=data.data.t2[21].nation;
		new_array['rate_21']=data.data.t2[21].rate;

		new_array['nation_22']=data.data.t2[22].nation;
		new_array['rate_22']=data.data.t2[22].rate;

		new_array['nation_23']=data.data.t2[23].nation;
		new_array['rate_23']=data.data.t2[23].rate;

		new_array['nation_24']=data.data.t2[24].nation;
		new_array['rate_24']=data.data.t2[24].rate;

		new_array['nation_25']=data.data.t2[25].nation;
		new_array['rate_25']=data.data.t2[25].rate;

		

		
		
		new_array['ar']=data.data.t3[0].ar;
		new_array['br']=data.data.t3[0].br;
		this.setState(new_array)

		
	}
	showDrawHtml =()=>{
		
		if(this.state.draw==true){
			var status=this.state.status;
			if(status!="OPEN"){
				var status=this.state.status;
			}else{
				var status="";

			}

			return (
				<tr className="bet-info ">
					<td className="team-name nation" >
						<span ><strong>The Draw</strong></span>
						<p className="box-w4"><span className="float-left book" id="book_349" style={{ color: "black" }}>0</span> <span className="float-right profit" id="profit_349" style={{ color: "black" }} ></span></p>
					</td>
					
					<td className="box-w1 back-color" style={{backgroundColor:'#B2D6F0'}}>{status}
						<button className="bet-sec back "  onClick={this.handleBidClick.bind(this,this.state.drawTeamName,this.state.drawLastBack,'#B2D6F0',"back",this.state.drawSelectionId,this.state.marketId,'draw',this.state.status)}> <span className="odd backprice">{this.state.drawLastBack}</span>{this.state.drawLastBackSize}  </button>
					</td>
					<td className="box-w1 back-color" style={{backgroundColor:'#92C9F0'}}>
						<button className="bet-sec back " onClick={this.handleBidClick.bind(this,this.state.drawTeamName,this.state.drawMiddleBack,'#92C9F0',"back",this.state.drawSelectionId,this.state.marketId,'draw',this.state.status)} > <span className="odd backprice">{this.state.drawMiddleBack}</span> {this.state.drawMiddleBackSize} </button>
					</td>
					
					<td className="box-w1 back-color">{status}
						<button className="bet-sec back " onClick={this.handleBidClick.bind(this,this.state.drawTeamName,this.state.drawFirstBack,'#72bbef',"back",this.state.drawSelectionId,this.state.marketId,'draw',this.state.status)} > <span className="odd backprice">{this.state.drawFirstBack}</span> {this.state.drawFirstBackSize} </button>
					</td>
					
					
					
					<td className="box-w1 lay-color">{status}
						<button className="bet-sec lay" onClick={this.handleBidClick.bind(this,this.state.drawTeamName,this.state.drawFirstLay,'#faa9ba',"lay",this.state.drawSelectionId,this.state.marketId,'draw',this.state.status)} value={this.state.lastPriceTraded1} ><span className="odd layprice">{this.state.drawFirstLay}</span>{this.state.drawFirstLaySize}</button>
					</td>
					<td className="box-w1 lay-color" style={{backgroundColor:'#F8BBC8'}}>{status}
						<button className="bet-sec lay" value={this.state.lastPriceTraded1} onClick={this.handleBidClick.bind(this,this.state.drawTeamName,this.state.drawMiddleLay,'#F8BBC8',"lay",this.state.drawSelectionId,this.state.marketId,'draw',this.state.status)} ><span className="odd layprice">{this.state.drawMiddleLay}</span>{this.state.drawMiddleLaySize}</button>
					</td>
					<td className="box-w1 lay-color" style={{backgroundColor:'#F6CDD6'}}>{status}
						<button className="bet-sec lay" value={this.state.lastPriceTraded1} onClick={this.handleBidClick.bind(this,this.state.drawTeamName,this.state.drawLastLay,'#F6CDD6',"lay",this.state.drawSelectionId,this.state.marketId,'draw',this.state.status)}><span className="odd layprice">{this.state.drawLastLay}</span>{this.state.drawLastLaySize}</button>
					</td>															
					
				</tr>
			);
		}
	}
	showTableHtml = () => {
		const html = []
		if(this.state.casinoresult!=undefined && this.state.casinoresult!='' && this.state.casinoresult!=null){
			console.log(this.state.casinoresult);

			for(let i=0;i<this.state.casinoresult.length;i++){
				
				html.push(<tr>
					<td style={{ textAlign: "center" }}> {this.state.casinoresult[i].odds}  </td>
					<td style={{ textAlign: "center" }}> {this.state.casinoresult[i].stake}  </td>
					<td style={{ textAlign: "center" }}> {this.state.casinoresult[i].team_name}  </td>
				</tr>);
				

				
				 
				 
			}
			
				//////console.log(this.state.profit12);
				
	
					
			
			
			
			
				
				
			
			
				return <table className="table coupon-table">
				<thead>
					<tr>
						<th style={{ textAlign: "center" }} > Odds</th>
						<th style={{ textAlign: "center" }} > Stake</th>
						<th style={{ textAlign: "center" }} > Team Name</th>
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
		
		}); 
	};
	handleChange = (event) => {
		let { name, value } = event.target;
		this.setState({ [name]: event.target.value });
		
		
	
	
		
	}
	
	handleChangeStakeamount = (event) => {
		this.setState({stake_amount:event.target.value})
	}
	handleChange_session_input = (event) => {
		this.setState({session_input:event.target.value})
	}
	
	handleButtonsClick = (getAmount) =>{
		var profit = "";
		if(this.state.type == "back") {
			profit = parseFloat(this.state.oddVal)-1;
			profit = profit.toFixed(2) * getAmount;
			
			
			if(this.state.betMatchType="teamone"){
				this.setState({team_profit1:profit})
			}
			 if(this.state.betMatchType="teamtwo"){
				this.setState({team_profit2:profit})
	
	
			}
			
			if(this.state.betMatchType="teamone"){
				this.setState({stackAmount_team2:"-"+getAmount})
			}
			 if(this.state.betMatchType="teamtwo"){
				this.setState({stackAmount_team1:"-"+getAmount})
			}




			
		}
		else if(this.state.type == "lay"){
			
			profit = parseFloat(this.state.oddVal)-1;
				profit = profit.toFixed(2) * getAmount;
				profit = profit.toFixed(0);
			if(this.state.betMatchType="teamone"){
				this.setState({team_profit1:"-"+profit})
			}
			else if(this.state.betMatchType="teamtwo"){
				this.setState({team_profit2:"-"+profit,})
	
	
			}
	
			if(this.state.betMatchType="teamone"){
				this.setState({stackAmount_team2:getAmount})
			}
			else if(this.state.betMatchType="teamtwo"){
				this.setState({stackAmount_team1:getAmount})
			}
		}
		
		this.setState({stake_amount:getAmount,profit:profit});
	}
	handleButtonsNewClick = (getAmount) =>{
		
		
		this.setState({stake_amount:getAmount});
	}
	
	handleBidClick = (nat_Dragon,nat_Dragon_rate,color) =>{
		
		


			this.setState({betClick:true,betClick1:false});
		
			this.setState({
						   teamName:nat_Dragon,
						   oddVal:nat_Dragon_rate,
						   color:color,
						  
						  
						});
	}
	

	handleBidClickSession = (color,headname,no,marketId,SessInptNo,yes) =>{
		
		

////console.log(SessInptNo);
		
			this.setState({betClick1:true,betClick:false,});
		
			this.setState({
						   color:color,
						   headname:headname,
						   session_input:SessInptNo,
						   yes:yes,
						   no:no,
						   stake_amount:"",
						   profit22:"",
						   profit:"",
						   team_profit1:"",
						   team_profit2:"",
						   stackAmount_team1:"",
						   stackAmount_team2:""
						});
	}
	handleBidCrossClick = () =>{
		this.setState({betClick:false,
			betClick1:false,
						   teamName:"",
						   oddVal:"",
						   color:"",
						   type:"",
						   betSelectionId:"",
						   betMarketId:"",
						   betMatchType:"",
						   stake_amount:"",
						   profit:""});
	}
	
	showBidClickHtml = () =>{
		
		
		if(this.state.betClick==true) {
			var button_1 =1000;
			var button_2 =5000;
			var button_3 =10000;
			var button_4 =25000;
			var button_5 =50000;
			var button_6 =100000;
			var button_7 =200000;
			var button_8 =500000;
			var button_9 =1000000;
			var button_10 =2500000;

			
			var value_1 =1000;
			var value_2 =5000;
			var value_3 =10000;
			var value_4 =25000;
			var value_5 =50000;
			var value_6 =100000;
			var value_7 =200000;
			var value_8 =500000;
			var value_9 =1000000;
			var value_10 =2500000;
			

		return (
			<div className="table-responsive hide-box-click " style={{ paddingBottom: "4px", display: "block",background: this.state.color }} >
				<form onSubmit={this.handleSubmit} method="post" id="frm_placebet">
				
					<table className="coupon-table table table-borderedless">
						<thead>
							<tr>
								<th></th>
								<th style={{ width: "35%", textAlign: "left" }} >(Bet for)</th>
								<th style={{ width: "35%", textAlign: "left" }} >Odds</th>
								<th style={{ width: "35%", textAlign: "left" }} >Stake</th>
								<th style={{ width: "35%", textAlign: "right" }} id="profit-head">Profit</th>
							</tr>
						</thead>
					<tbody>
						<tr>
							<td className="text-center"><a href="#;" className="text-danger" onClick={this.handleBidCrossClick}> <i className="fa fa-times"></i> </a></td>
							<td id="team_nm">{this.state.teamName}</td>
							<td style={{ width: "75px" }} >
								<div className="form-group">
								<input value={this.state.type} name="type" type="hidden" />
									<input value={this.state.oddVal} name="oddVal" className="amountint"  onChange={this.handleChange} type="number" required="required" maxLength="4" style={{ float: "left", width: "45px", verticalAlign: "middle" }} id="odds" step="0.01" />
								</div>
							</td>
							<td>
								<div className="form-group bet-stake">
									<input id="btn_val" style={{ width: "52px" }} maxLength="10" value={this.state.stake_amount} name="stake_amount" type="text" onChange={this.handleChange} required="required" />
								</div>
							</td> 
							<td>
							
							</td> 
						</tr>
						<tr>
						  <td colSpan="5" style={{ padding: "5px" }} className="value-buttons">
							<a href="#" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value={value_1} onClick={this.handleButtonsClick.bind(this,value_1)}>{button_1}</a>
							<a href="#" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value={value_2} onClick={this.handleButtonsClick.bind(this,value_2)}>{button_2}</a>
							<a href="#" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value={value_3} onClick={this.handleButtonsClick.bind(this,value_3)}>{button_3}</a>
							<a href="#" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value={value_4} onClick={this.handleButtonsClick.bind(this,value_4)}>{button_4}</a>
							<a href="#" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value={value_5} onClick={this.handleButtonsClick.bind(this,value_5)}>{button_5}</a>
							<a href="#" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value={value_6} onClick={this.handleButtonsClick.bind(this,value_6)}>{button_6}</a>
							<a href="#" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value={value_7} onClick={this.handleButtonsClick.bind(this,value_7)}>{button_7}</a>
							<a href="#" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value={value_8} onClick={this.handleButtonsClick.bind(this,value_8)}>{button_8}</a>
							<a href="#" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value={value_9} onClick={this.handleButtonsClick.bind(this,value_9)}>{button_9}</a>
							<a href="#" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value={value_10} onClick={this.handleButtonsClick.bind(this,value_10)}>{button_10}</a>
							</td>
						</tr>
					  </tbody>
					</table>
					<div className="col-md-12">
					{this.responseHtml()}
						<button className="btn btn-sm btn-danger float-left" type="button" onClick={this.handleBidCrossClick}>Reset</button>
						<button className="btn btn-sm btn-success float-right" type="submit" id="submit_btn">Submit</button>
						
					</div>
				</form>
			</div>
				);
		}
	}

	showBidClickSessionHtml = () =>{
		if(this.state.betClick1==true) {
			var button_1 =1000;
			var button_2 =5000;
			var button_3 =10000;
			var button_4 =25000;
			var button_5 =50000;
			var button_6 =100000;
			var button_7 =200000;
			var button_8 =500000;
			var button_9 =1000000;
			var button_10 =2500000;

			
			var value_1 =1000;
			var value_2 =5000;
			var value_3 =10000;
			var value_4 =25000;
			var value_5 =50000;
			var value_6 =100000;
			var value_7 =200000;
			var value_8 =500000;
			var value_9 =1000000;
			var value_10 =2500000;

			if(this.state.buttonvalue_new.button_1!=undefined){
				button_1 =this.state.buttonvalue_new.button_1;
			}

			if(this.state.buttonvalue_new.button_2!=undefined){
				button_2 =this.state.buttonvalue_new.button_2;
			}

			if(this.state.buttonvalue_new.button_3!=undefined){
				button_3 =this.state.buttonvalue_new.button_3;
			}
			if(this.state.buttonvalue_new.button_4!=undefined){
				button_4 =this.state.buttonvalue_new.button_4;
			}
			if(this.state.buttonvalue_new.button_5!=undefined){
				button_5 =this.state.buttonvalue_new.button_5;
			}
			if(this.state.buttonvalue_new.button_6!=undefined){
				button_6 =this.state.buttonvalue_new.button_6;
			}

			if(this.state.buttonvalue_new.button_7!=undefined){
				button_7 =this.state.buttonvalue_new.button_7;
			}
			if(this.state.buttonvalue_new.button_8!=undefined){
				button_8 =this.state.buttonvalue_new.button_8;
			}
			if(this.state.buttonvalue_new.button_9!=undefined){
				button_9=this.state.buttonvalue_new.button_9;
			}
			if(this.state.buttonvalue_new.button_10!=undefined){
				button_10=this.state.buttonvalue_new.button_10;
			}
			if(this.state.buttonvalue_new.value_1!=undefined){
				value_1 =this.state.buttonvalue_new.value_1;
			}
			
			if(this.state.buttonvalue_new.value_2!=undefined){
				value_2 =this.state.buttonvalue_new.value_2;
			}
			
			if(this.state.buttonvalue_new.value_3!=undefined){
				value_3 =this.state.buttonvalue_new.value_3;
			}
			if(this.state.buttonvalue_new.value_4!=undefined){
				value_4 =this.state.buttonvalue_new.value_4;
			}
			if(this.state.buttonvalue_new.value_5!=undefined){
				value_5 =this.state.buttonvalue_new.value_5;
			}
			if(this.state.buttonvalue_new.value_6!=undefined){
				value_6 =this.state.buttonvalue_new.value_6;
			}
			
			if(this.state.buttonvalue_new.value_7!=undefined){
				value_7 =this.state.buttonvalue_new.value_7;
			}
			if(this.state.buttonvalue_new.value_8!=undefined){
				value_8 =this.state.buttonvalue_new.value_8;
			}
			if(this.state.buttonvalue_new.value_9!=undefined){
				value_9=this.state.buttonvalue_new.value_9;
			}
			if(this.state.buttonvalue_new.value_10!=undefined){
				value_10=this.state.buttonvalue_new.value_10;
			}
			return (
			<div className="table-responsive hide-box-click " style={{ paddingBottom: "4px", display: "block",background: this.state.color }} >
				<form onSubmit={this.handleSubmitSession} method="post" id="frm_placebet">
				
					<table className="coupon-table table table-borderedless">
						<thead>
							<tr>
								<th></th>
								<th style={{ width: "35%", textAlign: "left" }} >(Bet for)</th>
								<th style={{ width: "35%", textAlign: "left" }} >Odds</th>
								<th style={{ width: "35%", textAlign: "left" }} >Stake</th>
								<th style={{ width: "35%", textAlign: "right" }} id="profit-head">Profit</th>
							</tr>
						</thead>
					<tbody>
						<tr>
							<td className="text-center"><a href="#;" className="text-danger" onClick={this.handleBidCrossClick}> <i className="fa fa-times"></i> </a></td>
							<td id="team_nm">{this.state.headname}</td>
							<td style={{ width: "75px" }} >
								<div className="form-group">
								<input value={this.state.no} name="no" type="hidden" />
								<input value={this.state.yes} name="yes" type="hidden" />
									<input value={this.state.SessInptNo} 
									
									name="session_input" value= {this.state.session_input} className="amountint"  onChange={this.handleChange_session_input} type="number" required="required" maxLength="4" style={{ float: "left", width: "45px", verticalAlign: "middle" }} id="odds" step="0.01" />
								</div>
							</td>
							<td>
								<div className="form-group bet-stake">
									<input id="stake_amount" style={{ width: "52px" }} maxLength="10" value={this.state.stake_amount} name="stake_amount" type="text" onChange={this.handleChangeStakeamount} required="required" />
								</div>
							</td> 
							<td>
							{this.state.profit}
							</td> 
						</tr>
						<tr>
						  <td colSpan="5" style={{ padding: "5px" }} className="value-buttons">
							<a href="#" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value={value_1} onClick={this.handleButtonsNewClick.bind(this,value_1)}>{button_1}</a>
							<a href="#" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value={value_2} onClick={this.handleButtonsNewClick.bind(this,value_2)}>{button_2}</a>
							<a href="#" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value={value_3} onClick={this.handleButtonsNewClick.bind(this,value_3)}>{button_3}</a>
							<a href="#" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value={value_4} onClick={this.handleButtonsNewClick.bind(this,value_4)}>{button_4}</a>
							<a href="#" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value={value_5} onClick={this.handleButtonsNewClick.bind(this,value_5)}>{button_5}</a>
							<a href="#" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value={value_6} onClick={this.handleButtonsNewClick.bind(this,value_6)}>{button_6}</a>
							<a href="#" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value={value_7} onClick={this.handleButtonsNewClick.bind(this,value_7)}>{button_7}</a>
							<a href="#" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value={value_8} onClick={this.handleButtonsNewClick.bind(this,value_8)}>{button_8}</a>
							<a href="#" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value={value_9} onClick={this.handleButtonsNewClick.bind(this,value_9)}>{button_9}</a>
							<a href="#" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value={value_10} onClick={this.handleButtonsNewClick.bind(this,value_10)}>{button_10}</a>
							</td>
						</tr>
					  </tbody>
					</table>
					<div className="col-md-12">
					{this.responseHtml()}
					{this.emptyHtml()}
						<button className="btn btn-sm btn-danger float-left" type="button" onClick={this.handleBidCrossClick}>Reset</button>
						<button className="btn btn-sm btn-success float-right" type="submit" id="submit_btn">Submit</button>
						
					</div>
				</form>
			</div>
				);
		}
	}












	render() {
		var status=this.state.status;
		if(status!="OPEN"){
			 status=this.state.status;
		}else{
			status="";
		}
	var maximum_bet_limit=	this.state.maxminBet.adminlist;
	if(maximum_bet_limit!=undefined){
		maximum_bet_limit=maximum_bet_limit.maximum_bet_limit;
	}else{
		maximum_bet_limit ="N/A";
	}
	var minimum_bet_limit=	this.state.maxminBet.adminlist;
	if(minimum_bet_limit!=undefined){
		minimum_bet_limit=minimum_bet_limit.minimum_bet_limit;
	}else{
		minimum_bet_limit ="N/A";
	}
	
		var accessToken = this.state.accessToken;

		if (accessToken == "" || accessToken == null) {
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
	var newdata11=this.state.getResult11;
		var newarray=[];
		if(this.state.casinodt20!=undefined && this.state.casinodt20!='' && this.state.casinodt20!=null)
		{
			
			for(var i=0;i<this.state.casinodt20.length;i++){
			
				newarray.push(<span className="ball-runs ">{this.state.casinodt20[i].result}</span>)
			}
			console.log(newarray);
		
		}
		var image1='/img/card/1.jpg';
		var image2='/img/card/2.jpg';
		var image3='/img/card/3.jpg';
		var image4='/img/card/4.jpg';
		var image5='/img/card/5.jpg';
		var image6='/img/card/6.jpg';
		var image7='/img/card/7.jpg';
		var image8='/img/card/8.jpg';
		var image9='/img/card/9.jpg';
		var image10='/img/card/10.jpg'
		var image11='/img/card/11.jpg';
		var image12='/img/card/12.jpg';
		var image13='/img/card/13.jpg';
		var image14='/img/card/1.jpg';
		var image15='/img/card/2.jpg';
		var image16='/img/card/3.jpg';
		var image17='/img/card/4.jpg';
		var image18='/img/card/5.jpg';
		var image19='/img/card/6.jpg';
		var image20='/img/card/7.jpg';
		var image21='/img/card/8.jpg';
		var image22='/img/card/9.jpg';
		var image23='/img/card/10.jpg';
		var image24='/img/card/11.jpg';
		var image25='/img/card/12.jpg';
		var image26='/img/card/13.jpg';
		if(this.state.ar!=undefined && this.state.ar!="" && this.state.ar!=null){
			var new_value=	this.state.ar.split(",");
			
			if(new_value[0]==0){
				image1='/img/card/patti_back.jpg'
			}

			if(new_value[1]==0){
				image2='/img/card/patti_back.jpg'
			}
			if(new_value[2]==0){
				image3='/img/card/patti_back.jpg'
			}

			if(new_value[3]==0){
				image4='/img/card/patti_back.jpg'
			}
			if(new_value[4]==0){
				image5='/img/card/patti_back.jpg'
			}
			
			if(new_value[5]==0){
				image6='/img/card/patti_back.jpg'
			}

			if(new_value[6]==0){
				image7='/img/card/patti_back.jpg'
			}
			if(new_value[7]==0){
				image8='/img/card/patti_back.jpg'
			}

			if(new_value[8]==0){
				image9='/img/card/patti_back.jpg'
			}
			if(new_value[9]==0){
				image10='/img/card/patti_back.jpg'
			}
			if(new_value[10]==0){
				image11='/img/card/patti_back.jpg'
			}
			if(new_value[11]==0){
				image12='/img/card/patti_back.jpg'
			}
			if(new_value[12]==0){
				image13='/img/card/patti_back.jpg'
			}





















		}

	













			
			
			
		






		if(this.state.br!=undefined && this.state.br!="" && this.state.br!=null){
			var new_value1=	this.state.br.split(",");
			// for(var i=13;i<new_value1.lengthl;i++ ){

			// }
			if(new_value1[0]==0){
				image14='/img/card/patti_back.jpg'
			}
	
			if(new_value1[1]==0){
				image15='/img/card/patti_back.jpg'
			}
			if(new_value1[2]==0){
				image16='/img/card/patti_back.jpg'
			}
	
			if(new_value1[3]==0){
				image17='/img/card/patti_back.jpg'
			}
			if(new_value1[4]==0){
				image18='/img/card/patti_back.jpg'
			}
			
			if(new_value1[5]==0){
				image19='/img/card/patti_back.jpg'
			}
	
			if(new_value1[6]==0){
				image20='/img/card/patti_back.jpg'
			}
			if(new_value1[7]==0){
				image21='/img/card/patti_back.jpg'
			}
	
			if(new_value1[8]==0){
				image22='/img/card/patti_back.jpg'
			}
			if(new_value1[9]==0){
				image23='/img/card/patti_back.jpg'
			}
			if(new_value1[10]==0){
				image24='/img/card/patti_back.jpg'
			}
			if(new_value1[11]==0){
				image25='/img/card/patti_back.jpg'
			}
			if(new_value1[12]==0){
				image26='/img/card/patti_back.jpg'
			}
	
	
	}
		
	var newarray=[];
	if(this.state.casinodt20!=undefined && this.state.casinodt20!='' && this.state.casinodt20!=null)
	{
		console.log(this.state.casinodt20);
		for(var i=0;i<this.state.casinodt20.t1.length;i++){
			var winner ="R";
			
			newarray.push(<span className="ball-runs ">{winner}</span>)
		}
	
	}
	var timer =0;
		
	if(this.state.autotime!=0 && this.state.autotime!=undefined){
		
		
		timer=
		
			<Timer
				initialTime={this.state.autotime * 1000}
				direction="backward"
				timeToUpdate={1}
				checkpoints={[
					{time: 0,
						
					callback: () => this.state.autotime,
					// callback: () => alert('countdown finished'),
					},
				]}
			>
				<Timer.Seconds />
			</Timer>
		 }
		 var new_mid =0;
	
		 if(this.state.mid!=0 && this.state.mid!=undefined){
			 var mid=this.state.mid.split(".");
			 
			 if(mid[1]!=undefined){
				 var new_mid=mid[1];
			 }
		 }

		return (
			
			<div>
			<Nav />
				<Menu />
				
				<div id="wrapper">
					<Sidebar />
					<div id="content-wrapper">
					

						<div className="container-fluid">
							<div className="row">
								<div className="col-md-9 featured-box-detail">
									<div className="coupon-card"> 
										<div className="game-heading">
										<span className="card-header-title"> <b>ANDAR BAHAR</b>
										<a href="#" className=" m-l-5 game-rules-icon rules_a"  onClick={this.handleBidCrossClick123}>RULES</a>
										</span> 
										<span className="float-right m-r-10">Round ID: {new_mid} | Min: 100 | Max: 300000

</span>
										
										 </div>
										<div className="card-content">
										 <div className="casino_video">
 {/* <span class="blinking2"> <i class="fa fa-circle" aria-hidden="true"></i>
Live</span> */}

										
										 <iframe src="https://shivexch.com/tp_tv_159/ab20/"

											 className="live_video" style={{border: 'none'}} allowFullScreen sandbox="allow-scripts allow-presentation allow-same-origin" allow="autoplay; fullscreen; picture-in-picture; xr-spatial-tracking;" />
<div className="timer_v">
<React.Fragment>
	{timer}
	</React.Fragment>
	</div>
										
										{/* <iframe width="560" height="315" src="https://www.youtube.com/embed/DTQl47Jlzcs" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
					</div>					
<div className=" m-b-10 main-market market-bf" data-marketid="1.167146463">
												
	

   <div className="andar_c b-1 ">
      <div className="row ">
         <div  className="col-md-2 br-1 h_ma">
            <h5  className="m-b-0 text-center ">Ander</h5>
         </div>
         <div  className="card-dt col-md-10 text-center pt-2 pb-2">
            <div onClick={this.handleBidClick.bind(this,this.state.nation,this.state.rate,'#faa9ba')} className=" m-r-5 card-image d-inline-block">
               <div  className><img  src={image1} /></div>
               <div  className="ubook text-center m-t-5"><b  style={{color: 'black'}}>0</b></div>
            </div>
            <div  onClick={this.handleBidClick.bind(this,this.state.nation_1,this.state.rate_1,'#faa9ba')} className=" m-r-5 card-image d-inline-block">
               <div  className><img   src={image2} /></div>
               <div  className="ubook text-center m-t-5"><b  style={{color: 'black'}}>0</b></div>
            </div>
            <div  onClick={this.handleBidClick.bind(this,this.state.nation_2,this.state.rate_2,'#faa9ba')} className=" m-r-5 card-image d-inline-block">
               <div  className><img   src={image3} /></div>
               <div  className="ubook text-center m-t-5"><b  style={{color: 'black'}}>0</b></div>
            </div>
            <div onClick={this.handleBidClick.bind(this,this.state.nation_3,this.state.rate_3,'#faa9ba')}  className=" m-r-5 card-image d-inline-block">
               <div  className><img   src={image4} /></div>
               <div  className="ubook text-center m-t-5"><b  style={{color: 'black'}}>0</b></div>
            </div>
            <div onClick={this.handleBidClick.bind(this,this.state.nation_4,this.state.rate_4,'#faa9ba')} className=" m-r-5 card-image d-inline-block">
               <div  className><img   src={image5} /></div>
               <div  className="ubook text-center m-t-5"><b  style={{color: 'black'}}>0</b></div>
            </div>
            <div onClick={this.handleBidClick.bind(this,this.state.nation_5,this.state.rate_5,'#faa9ba')} className=" m-r-5 card-image d-inline-block">
               <div  className><img   src={image6} /></div>
               <div  className="ubook text-center m-t-5"><b  style={{color: 'black'}}>0</b></div>
            </div>
            <div onClick={this.handleBidClick.bind(this,this.state.nation_6,this.state.rate_6,'#faa9ba')}  className=" m-r-5 card-image d-inline-block">
               <div  className><img   src={image7}/></div>
               <div  className="ubook text-center m-t-5"><b  style={{color: 'black'}}>0</b></div>
            </div>
            <div onClick={this.handleBidClick.bind(this,this.state.nation_7,this.state.rate_7,'#faa9ba')}  className=" m-r-5 card-image d-inline-block">
               <div  className><img   src={image8} /></div>
               <div  className="ubook text-center m-t-5"><b  style={{color: 'black'}}>0</b></div>
            </div>
            <div onClick={this.handleBidClick.bind(this,this.state.nation_8,this.state.rate_8,'#faa9ba')}  className=" m-r-5 card-image d-inline-block">
               <div  className><img   src={image9} /></div>
               <div  className="ubook text-center m-t-5"><b  style={{color: 'black'}}>0</b></div>
            </div>
            <div onClick={this.handleBidClick.bind(this,this.state.nation_9,this.state.rate_9,'#faa9ba')}  className=" m-r-5 card-image d-inline-block">
               <div  className><img   src={image10} /></div>
               <div  className="ubook text-center m-t-5"><b  style={{color: 'black'}}>0</b></div>
            </div>
            <div onClick={this.handleBidClick.bind(this,this.state.nation_10,this.state.rate_10,'#faa9ba')} className=" m-r-5 card-image d-inline-block">
               <div  className><img   src={image11} /></div>
               <div  className="ubook text-center m-t-5"><b  style={{color: 'black'}}>0</b></div>
            </div>
            <div onClick={this.handleBidClick.bind(this,this.state.nation_11,this.state.rate_11,'#faa9ba')} className=" m-r-5 card-image d-inline-block">
               <div  className><img   src={image12} /></div>
               <div  className="ubook text-center m-t-5"><b  style={{color: 'black'}}>0</b></div>
            </div>
            <div onClick={this.handleBidClick.bind(this,this.state.nation_12,this.state.rate_12,'#faa9ba')} className=" m-r-5 card-image d-inline-block">
               <div  className><img  src={image13} /></div>
               <div  className="ubook text-center m-t-5"><b  style={{color: 'black'}}>0</b></div>
            </div>
         </div>
      </div>
   </div>
   <div className="bahar_c b-1">
      <div className="row ">
         <div  className="col-md-2 br-1 h_ma">
            <h5  className="text-center ">Bahar</h5>
         </div>
         <div  className="card-dt col-md-10 text-center pt-2 pb-2">
            <div onClick={this.handleBidClick.bind(this,this.state.nation_13,this.state.rate_13,'#faa9ba')} className=" m-r-5 card-image d-inline-block">
               <div  className><img   src={image14} /></div>
               <div  className="ubook text-center m-t-5"><b  style={{color: 'black'}}>0</b></div>
            </div>
            <div  onClick={this.handleBidClick.bind(this,this.state.nation_14,this.state.rate_14,'#faa9ba')} className=" m-r-5 card-image d-inline-block">
               <div  className><img   src={image15} /></div>
               <div  className="ubook text-center m-t-5"><b  style={{color: 'black'}}>0</b></div>
            </div>
            <div  onClick={this.handleBidClick.bind(this,this.state.nation_15,this.state.rate_15,'#faa9ba')} className=" m-r-5 card-image d-inline-block">
               <div  className><img   src={image16} /></div>
               <div  className="ubook text-center m-t-5"><b  style={{color: 'black'}}>0</b></div>
            </div>
            <div onClick={this.handleBidClick.bind(this,this.state.nation_16,this.state.rate_16,'#faa9ba')}  className=" m-r-5 card-image d-inline-block">
               <div  className><img   src={image17} /></div>
               <div  className="ubook text-center m-t-5"><b  style={{color: 'black'}}>0</b></div>
            </div>
            <div onClick={this.handleBidClick.bind(this,this.state.nation_17,this.state.rate_17,'#faa9ba')} className=" m-r-5 card-image d-inline-block">
               <div  className><img   src={image18} /></div>
               <div  className="ubook text-center m-t-5"><b  style={{color: 'black'}}>0</b></div>
            </div>
            <div onClick={this.handleBidClick.bind(this,this.state.nation_18,this.state.rate_18,'#faa9ba')} className=" m-r-5 card-image d-inline-block">
               <div  className><img   src={image19} /></div>
               <div  className="ubook text-center m-t-5"><b  style={{color: 'black'}}>0</b></div>
            </div>
            <div onClick={this.handleBidClick.bind(this,this.state.nation_19,this.state.rate_19,'#faa9ba')}  className=" m-r-5 card-image d-inline-block">
               <div  className><img   src={image20} /></div>
               <div  className="ubook text-center m-t-5"><b  style={{color: 'black'}}>0</b></div>
            </div>
            <div onClick={this.handleBidClick.bind(this,this.state.nation_20,this.state.rate_20,'#faa9ba')}  className=" m-r-5 card-image d-inline-block">
               <div  className><img   src={image21} /></div>
               <div  className="ubook text-center m-t-5"><b  style={{color: 'black'}}>0</b></div>
            </div>
            <div onClick={this.handleBidClick.bind(this,this.state.nation_21,this.state.rate_21,'#faa9ba')}  className=" m-r-5 card-image d-inline-block">
               <div  className><img   src={image22} /></div>
               <div  className="ubook text-center m-t-5"><b  style={{color: 'black'}}>0</b></div>
            </div>
            <div onClick={this.handleBidClick.bind(this,this.state.nation_22,this.state.rate_22,'#faa9ba')}  className=" m-r-5 card-image d-inline-block">
               <div  className><img   src={image23}/></div>
               <div  className="ubook text-center m-t-5"><b  style={{color: 'black'}}>0</b></div>
            </div>
            <div onClick={this.handleBidClick.bind(this,this.state.nation_23,this.state.rate_23,'#faa9ba')} className=" m-r-5 card-image d-inline-block">
               <div  className><img   src={image24} /></div>
               <div  className="ubook text-center m-t-5"><b  style={{color: 'black'}}>0</b></div>
            </div>
            <div onClick={this.handleBidClick.bind(this,this.state.nation_24,this.state.rate_24,'#faa9ba')} className=" m-r-5 card-image d-inline-block">
               <div  className><img  src={image25} /></div>
               <div  className="ubook text-center m-t-5"><b  style={{color: 'black'}}>0</b></div>
            </div>
            <div onClick={this.handleBidClick.bind(this,this.state.nation_25,this.state.rate_25,'#faa9ba')} className=" m-r-5 card-image d-inline-block">
               <div  className><img  s src={image26}/></div>
               <div  className="ubook text-center m-t-5"><b  style={{color: 'black'}}>0</b></div>
            </div>
         </div>
      </div>
   </div>




												
												</div>
<div className="ander_bahar_marquee">												
<marquee>Payout : Bahar 1st Card 25% and All Other Andar-Bahar Cards 100%.</marquee>												
	</div>										<div className="">

												<div className="row row-12">
													<div className="col-md-12" id="fancyHeadToHide" >
														<div className="fancy-marker-title">
															<h4>Last Result<a href="#" className=" m-r-5 game-rules-icon blinking" data-id="fancy"><span><i className="fa fa-info-circle float-right"></i></span></a></h4>
														</div>
						<div className="scorecard m-b-5">
                 
        <p className="text-right ball-by-ball m-t-10"> 
			{newarray}
		</p>
                      
                 
                </div>
													</div>
													<div className="col-md-6 fancy-market">

													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="col-md-3 sidebar-right">
									{/*<div className="card-header m-b-10" data-toggle="collapse" data-target="#demo">
										<h6 className="card-title">Live Match <span className="float-right"><i className="fa fa-tv"></i> live stream started</span> </h6>
										<iframe src="https://bet-fair.co/exchange/tplive1?type=dt20" style={{border: 'none'}} allowFullScreen sandbox="allow-scripts allow-presentation allow-same-origin" allow="autoplay; fullscreen; picture-in-picture; xr-spatial-tracking; encrypted-media" />

									</div>*/}
									
									<div className="card m-b-10 place-bet ">
										<div className="card-header">
											<h6 className="card-title d-inline-block">Place Bet</h6>
											{/*<a className="btn btn-secondary float-right change-value" id="cng_btn_val" href="#">Change Button Value</a>*/}
										</div>
									
													
										{this.showBidClickHtml()}
										{this.showBidClickSessionHtml()}		
												
									</div>
									<div className="card m-b-10 place-bet">
										<div className="card-header">
											<h6 className="card-title d-inline-block">My Bet</h6>
											{/*<a className="btn btn-danger float-right change-value" id="cng_btn_val" href="#">ClearAll</a>*/}
										</div>
										<div className="table-responsive hide-box-click " style={{ paddingBottom: "4px", display: "block" }} >

											{this.showTableHtml()}
										</div>
									</div>
									</div>

									
		
		<Modal show={this.state.showUserAmountPopup1} >
		
			<Modal.Header className="mancolorsite">
			
				<Modal.Title >Rules</Modal.Title>
				<a href="#" className="Close" data-dismiss="modal" onClick={this.handleDepoWithdrPopupClose}><i className="fas fa-times"></i> </a>
			</Modal.Header>
			<Modal.Body className="p-0 rulcebody">
			
			

			</Modal.Body>
			
	
      </Modal>
	  

							</div>
						</div>
					</div>
				</div><Footer/>
			</div>
		);

		



	}
}

export default Index;
