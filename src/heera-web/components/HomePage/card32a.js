import React, { Component } from 'react';
import Nav from '../Include/Nav';
import Menu from '../Include/Menu';
import Footer from '../Include/footer';
import Sidebar from '../Include/Sidebar';
import Url from "../configure/configure.js";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Timer from 'react-compound-timer'
import socketIOClient from "socket.io-client";
import Modal from "react-bootstrap-modal";

  
var CryptoJS = require("crypto-js");
const ENDPOINT = "http://172.105.40.76:4009";

const $ = window.$;
const baseUrl = Url.baseUrl;
// Third argument is the inner text


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
		let headers = {
			Authorization: "Bearer " + this.state.accessToken,
		};
		
		
			
		let savebet = {
			event_name: "card32a",
			odds: this.state.oddVal,
			stake: this.state.stake_amount,
			event_id: this.state.mid,
			event_type :"card32a",
			team_name :this.state.teamName,
			casnio_type:"unmatch"

		}; 
		

		axios.post(baseUrl + '/createbetuser', savebet,{headers}).then((resp) => {
			var resp = resp.data;
			if(resp.success === true){
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
				axios.get(baseUrl + '/teenpattit20', { headers }).then((resp) => {
					this.setState({casinoresult:resp.data.Betlist})
				})
				
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
	// handleSubmitSession = (event) => {
	
	// 	event.preventDefault();
	// 	let headers = {
	// 		Authorization: "Bearer " + this.state.accessToken,
	// 	};
		
	// 	let matchid = this.props.match.params.id;
	// 	var yes_amount="";
	// 	var no_amount ="";
		
	// 	if(this.state.no==="no"){
	// 			no_amount=this.state.session_input;
	// 	}
	// 	if(this.state.yes==="yes"){
	// 			yes_amount=this.state.session_input;
	// 	}
	// 	let savebet = {
	// 		event_id: this.props.match.params.id,
	// 		event_name: this.state.eventName,
	// 		yes: this.state.yes,
	// 		no: this.state.no,
	// 		market_id: this.state.betMarketId,
	// 		yes_amount:yes_amount,
	// 		no_amount: no_amount,
	// 		stake:this.state.stake_amount,
	// 		headname:this.state.headname
			
			
	// 	}; 
		

	// 	axios.post(baseUrl + '/createbetusersession', savebet,{headers}).then((resp) => {
	// 		var resp = resp.data;
	// 		if(resp.success === true){
	// 			this.setState({
	// 				respStatus: resp.success,
	// 				respMessage:resp.message,
	// 				oddVal:"",
	// 				stake_amount:"",
	// 				profit:"",
	// 				team_profit1:"",
	// 				stackAmount_team1:"",
	// 				team_profit2:"",
	// 				stackAmount_team2:""
	// 			});
	// 			this.getUserCurrentBalance();
	// 			this.showTableHtml();
	// 				// this.callMatchOddsApi()
	
	// 			setTimeout(() => {this.setState({ respStatus: "" });}, 7000);
	// 		} else {
	// 			this.setState({
	// 				respStatus: resp.success,
	// 				respMessage:resp.message
	// 			});
	// 			setTimeout(() => {this.setState({ respStatus: "" });}, 7000);
	// 		}
	// 		this.callUserBetListApi();
	// 	});

	// }
	
	responseHtml = () =>{ 
      if(this.state.respStatus === false) {
          return (
          <div className="alert alert-danger">
          {this.state.respMessage}
          </div>
          )
        }
        else if(this.state.respStatus === true) {
           return (
            <div className="alert alert-success">
            {this.state.respMessage}
            </div>
           )
        }
     } 
  
   emptyHtml = () =>{
	
      if(this.state.emptyField === true) {
         return (
          <div className="alert alert-danger">
          {this.state.errMsg}
          </div>
         )
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


	// componentDidMount() {
	// 	let headers = {
	// 		Authorization: "Bearer " + this.state.accessToken,
	// 	};

	// 	// axios.get(baseUrl + '/casino-result', { headers }).then((resp) => {
	// 	// 	//console.log(resp.data.Betlist);
	// 	// 	this.setState({casinoresult:resp.data.Betlist})
	// 	// })
	// 	//const { endpoint } = this.state;
	// 	//const socket = socketIOClient(endpoint);
		
	// 	//socket.on("FromAPI", data => console.log(this.sate.data));
		
	// 	axios.get(baseUrl + '/card32a_data', { headers }).then((resp) => {
	// 		this.setState({casinoresult:resp.data.Betlist})
	// 	})
	

	// 	const socket = socketIOClient(ENDPOINT);
	// 	socket.on("FromAPI9", data => {
	// 	  //setResponse(data);
		
	// 	 this.setState({casinodt20:data.data1.data})
	// 	 this.callMatchOddsApi(data.data);
	// 	});





		
		
	// 	// io.on("connection", socket => {
	// 	// 	console.log("New client connected"), setInterval(
	// 	// 	  () => this.callMatchOddsApi (socket),
	// 	// 	  1000
	// 	// 	);
	// 	// 	socket.on("disconnect", () => console.log("Client disconnected"));
	// 	//   });
	// 	//let counter = setInterval(this.callMatchOddsApi , 1000);
	// 	//let counterFancy = setInterval(this.callFancyListApi , 2000);

	// }
	
	

    componentDidMount() {
		//       ======================== hushi code start 0 ==========================
				this.getl7bOdds();
				this.interval = setInterval(() => {
					this.getl7bOdds();
				}, 1000);
				this.getl7brOdds();
				this.interval = setInterval(() => {
					this.getl7brOdds();
				}, 5000);
		//       ======================== hushi code end 0 ==========================
		
				let headers = {
					Authorization: "Bearer " + this.state.accessToken,
				};
		
		
				axios.get(baseUrl + '/card32a_data', {headers}).then((resp) => {
					this.setState({casinoresult: resp.data.Betlist})
				})
		
				var randomElement = "#";
				this.setState({randomElement: randomElement})
				//let counterFancy = setInterval(this.callFancyListApi , 2000);
		
			};
		
			//       ======================== hushi code start 1 ==========================
		
		
			getl7bOdds = () => {
				axios.get("http://13.126.49.41:3000/getdata/32a").then((res) => {
					if (res.data) {
						this.callMatchOddsApi(res.data);
		
					}
				});
		
			};
			getl7brOdds = () => {
				axios.get("http://13.126.49.41:3000/getresult/32a").then((resp) => {
					if (resp.data) {
						this.setState({casinodt20:resp.data});
		
					}
				});
		
			};
			//       ======================== hushi code end 1 ==========================
		


	
	
	
	callMatchOddsApi=(data)=>{
		let headers = {
            Authorization: "Bearer " + this.state.accessToken,
        };
        let matchid = this.props.match.params.id;
        var new_array = [];
		// console.log(data);

		// const new_array = {};
		new_array['mid']=data.data.t1[0].mid
		new_array['min']=data.data.t1[0].min
		new_array['max']=data.data.t1[0].max
		new_array['autotime']=data.data.t1[0].autotime
		new_array['nation']=data.data.t2[0].nation
		new_array['b1']=data.data.t2[0].b1
		new_array['bs1']=data.data.t2[0].bs1
		new_array['l1']=data.data.t2[0].l1
		new_array['ls1']=data.data.t2[0].ls1
		
	
		new_array['nation_1']=data.data.t2[1].nation
		new_array['b1_1']=data.data.t2[1].b1
		new_array['bs1_1']=data.data.t2[1].bs1
		new_array['l1_1']=data.data.t2[1].l1
		new_array['ls1_1']=data.data.t2[1].ls1


		new_array['nation_2']=data.data.t2[2].nation
		new_array['b1_2']=data.data.t2[2].b1
		new_array['bs1_2']=data.data.t2[2].bs1
		new_array['l1_2']=data.data.t2[2].l1
		new_array['ls1_2']=data.data.t2[2].ls1

		new_array['nation_3']=data.data.t2[3].nation
		new_array['b1_3']=data.data.t2[3].b1
		new_array['bs1_3']=data.data.t2[3].bs1
		new_array['l1_3']=data.data.t2[3].l1
		new_array['ls1_3']=data.data.t2[3].ls1
		this.setState(new_array);


			
	}
	showDrawHtml =()=>{
		
		if(this.state.draw===true){
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
			for(let i=0;i<this.state.casinoresult.length;i++){
				
				html.push(<tr>
					<td style={{ textAlign: "center" }}> {this.state.casinoresult[i].odds}  </td>
					<td style={{ textAlign: "center" }}> {this.state.casinoresult[i].stake}  </td>
					<td style={{ textAlign: "center" }}> {this.state.casinoresult[i].team_name}  </td>
				</tr>);
				
				

				
				 
				 
			}
			
				////////console.log(this.state.profit12);
				
	
					
			
			
			
			
				
				
			
			
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
		this.setState({ [name]:event.target.value });
	}
	
	handleChangeStakeamount = (event) => {
		this.setState({stake_amount:event.target.value})
	}
	handleChange_session_input = (event) => {
		this.setState({session_input:event.target.value})
	}
	
	handleButtonsClick = (getAmount) =>{
		// var profit = "";
		// if(this.state.type === "back") {
		// 	profit = parseFloat(this.state.oddVal)-1;
		// 	profit = profit.toFixed(2) * getAmount;
			
			
		// 	if(this.state.betMatchType=="teamone"){
		// 		this.setState({team_profit1:profit})
		// 	}
		// 	 if(this.state.betMatchType=="teamtwo"){
		// 		this.setState({team_profit2:profit})
	
	
		// 	}
			
		// 	if(this.state.betMatchType=="teamone"){
		// 		this.setState({stackAmount_team2:"-"+getAmount})
		// 	}
		// 	 if(this.state.betMatchType=="teamtwo"){
		// 		this.setState({stackAmount_team1:"-"+getAmount})
		// 	}




			
		// }
		// else if(this.state.type === "lay"){
			
		// 	profit = parseFloat(this.state.oddVal)-1;
		// 		profit = profit.toFixed(2) * getAmount;
		// 		profit = profit.toFixed(0);
		// 	if(this.state.betMatchType=="teamone"){
		// 		this.setState({team_profit1:"-"+profit})
		// 	}
		// 	else if(this.state.betMatchType=="teamtwo"){
		// 		this.setState({team_profit2:"-"+profit,})
	
	
		// 	}
	
		// 	if(this.state.betMatchType=="teamone"){
		// 		this.setState({stackAmount_team2:getAmount})
		// 	}
		// 	else if(this.state.betMatchType=="teamtwo"){
		// 		this.setState({stackAmount_team1:getAmount})
		// 	}
		// }
		
		 this.setState({stake_amount:getAmount});
	}
	handleButtonsNewClick = (getAmount) =>{
		
		
		this.setState({stake_amount:getAmount});
	}
	
	handleBidClick = (type,team_name,rate,color) =>{
		this.setState({betClick:true,betClick1:false});
		this.setState({
					teamName:team_name,
					oddVal:rate,
					color:color,
					type:type
		});
	}
	

	handleBidClickSession = (color,headname,no,marketId,SessInptNo,yes) =>{
		
		

//////console.log(SessInptNo);
		
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
		
		
		if(this.state.betClick===true) {
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
							{this.state.profit}
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
					{this.emptyHtml()}
						<button className="btn btn-sm btn-danger float-left" type="button" onClick={this.handleBidCrossClick}>Reset</button>
						<button className="btn btn-sm btn-success float-right" type="submit" id="submit_btn">Submit</button>
						
					</div>
				</form>
			</div>
				);
		}
	}

	
    showBidClickSessionHtml = () => {
        if (this.state.betClick1 === true) {
            var button_1 = 1000;
            var button_2 = 5000;
            var button_3 = 10000;
            var button_4 = 25000;
            var button_5 = 50000;
            var button_6 = 100000;
            var button_7 = 200000;
            var button_8 = 500000;
            var button_9 = 1000000;
            var button_10 = 2500000;


            var value_1 = 1000;
            var value_2 = 5000;
            var value_3 = 10000;
            var value_4 = 25000;
            var value_5 = 50000;
            var value_6 = 100000;
            var value_7 = 200000;
            var value_8 = 500000;
            var value_9 = 1000000;
            var value_10 = 2500000;

            if (this.state.buttonvalue_new.button_1 != undefined) {
                button_1 = this.state.buttonvalue_new.button_1;
            }

            if (this.state.buttonvalue_new.button_2 != undefined) {
                button_2 = this.state.buttonvalue_new.button_2;
            }

            if (this.state.buttonvalue_new.button_3 != undefined) {
                button_3 = this.state.buttonvalue_new.button_3;
            }
            if (this.state.buttonvalue_new.button_4 != undefined) {
                button_4 = this.state.buttonvalue_new.button_4;
            }
            if (this.state.buttonvalue_new.button_5 != undefined) {
                button_5 = this.state.buttonvalue_new.button_5;
            }
            if (this.state.buttonvalue_new.button_6 != undefined) {
                button_6 = this.state.buttonvalue_new.button_6;
            }

            if (this.state.buttonvalue_new.button_7 != undefined) {
                button_7 = this.state.buttonvalue_new.button_7;
            }
            if (this.state.buttonvalue_new.button_8 != undefined) {
                button_8 = this.state.buttonvalue_new.button_8;
            }
            if (this.state.buttonvalue_new.button_9 != undefined) {
                button_9 = this.state.buttonvalue_new.button_9;
            }
            if (this.state.buttonvalue_new.button_10 != undefined) {
                button_10 = this.state.buttonvalue_new.button_10;
            }
            if (this.state.buttonvalue_new.value_1 != undefined) {
                value_1 = this.state.buttonvalue_new.value_1;
            }

            if (this.state.buttonvalue_new.value_2 != undefined) {
                value_2 = this.state.buttonvalue_new.value_2;
            }

            if (this.state.buttonvalue_new.value_3 != undefined) {
                value_3 = this.state.buttonvalue_new.value_3;
            }
            if (this.state.buttonvalue_new.value_4 != undefined) {
                value_4 = this.state.buttonvalue_new.value_4;
            }
            if (this.state.buttonvalue_new.value_5 != undefined) {
                value_5 = this.state.buttonvalue_new.value_5;
            }
            if (this.state.buttonvalue_new.value_6 != undefined) {
                value_6 = this.state.buttonvalue_new.value_6;
            }

            if (this.state.buttonvalue_new.value_7 != undefined) {
                value_7 = this.state.buttonvalue_new.value_7;
            }
            if (this.state.buttonvalue_new.value_8 != undefined) {
                value_8 = this.state.buttonvalue_new.value_8;
            }
            if (this.state.buttonvalue_new.value_9 != undefined) {
                value_9 = this.state.buttonvalue_new.value_9;
            }
            if (this.state.buttonvalue_new.value_10 != undefined) {
                value_10 = this.state.buttonvalue_new.value_10;
            }
            return (
                <div className="table-responsive hide-box-click "
                     style={{paddingBottom: "4px", display: "block", background: this.state.color}}>
                    <form onSubmit={this.handleSubmitSession} method="post" id="frm_placebet">

                        <table className="coupon-table table table-borderedless">
                            <thead>
                            <tr>
                                <th></th>
                                <th style={{width: "35%", textAlign: "left"}}>(Bet for)</th>
                                <th style={{width: "35%", textAlign: "left"}}>Odds</th>
                                <th style={{width: "35%", textAlign: "left"}}>Stake</th>
                                <th style={{width: "35%", textAlign: "right"}} id="profit-head">Profit</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td className="text-center"><a href="#;" className="text-danger"
                                                               onClick={this.handleBidCrossClick}> <i
                                    className="fa fa-times"></i> </a></td>
                                <td id="team_nm">{this.state.headname}</td>
                                <td style={{width: "75px"}}>
                                    <div className="form-group">
                                        <input value={this.state.no} name="no" type="hidden"/>
                                        <input value={this.state.yes} name="yes" type="hidden"/>
                                        <input value={this.state.SessInptNo}

                                               name="session_input" value={this.state.session_input}
                                               className="amountint" onChange={this.handleChange_session_input}
                                               type="number" required="required" maxLength="4"
                                               style={{float: "left", width: "45px", verticalAlign: "middle"}} id="odds"
                                               step="0.01"/>
                                    </div>
                                </td>
                                <td>
                                    <div className="form-group bet-stake">
                                        <input id="stake_amount" style={{width: "52px"}} maxLength="10"
                                               value={this.state.stake_amount} name="stake_amount" type="text"
                                               onChange={this.handleChangeStakeamount} required="required"/>
                                    </div>
                                </td>
                                <td>
                                    {this.state.profit}
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="5" style={{padding: "5px"}} className="value-buttons">
                                    <a href="#" style={{padding: '6px', color: '#000'}}
                                       className="btn btn-success btn_dyn" value={value_1}
                                       onClick={this.handleButtonsNewClick.bind(this, value_1)}>{button_1}</a>
                                    <a href="#" style={{padding: '6px', color: '#000'}}
                                       className="btn btn-success btn_dyn" value={value_2}
                                       onClick={this.handleButtonsNewClick.bind(this, value_2)}>{button_2}</a>
                                    <a href="#" style={{padding: '6px', color: '#000'}}
                                       className="btn btn-success btn_dyn" value={value_3}
                                       onClick={this.handleButtonsNewClick.bind(this, value_3)}>{button_3}</a>
                                    <a href="#" style={{padding: '6px', color: '#000'}}
                                       className="btn btn-success btn_dyn" value={value_4}
                                       onClick={this.handleButtonsNewClick.bind(this, value_4)}>{button_4}</a>
                                    <a href="#" style={{padding: '6px', color: '#000'}}
                                       className="btn btn-success btn_dyn" value={value_5}
                                       onClick={this.handleButtonsNewClick.bind(this, value_5)}>{button_5}</a>
                                    <a href="#" style={{padding: '6px', color: '#000'}}
                                       className="btn btn-success btn_dyn" value={value_6}
                                       onClick={this.handleButtonsNewClick.bind(this, value_6)}>{button_6}</a>
                                    <a href="#" style={{padding: '6px', color: '#000'}}
                                       className="btn btn-success btn_dyn" value={value_7}
                                       onClick={this.handleButtonsNewClick.bind(this, value_7)}>{button_7}</a>
                                    <a href="#" style={{padding: '6px', color: '#000'}}
                                       className="btn btn-success btn_dyn" value={value_8}
                                       onClick={this.handleButtonsNewClick.bind(this, value_8)}>{button_8}</a>
                                    <a href="#" style={{padding: '6px', color: '#000'}}
                                       className="btn btn-success btn_dyn" value={value_9}
                                       onClick={this.handleButtonsNewClick.bind(this, value_9)}>{button_9}</a>
                                    <a href="#" style={{padding: '6px', color: '#000'}}
                                       className="btn btn-success btn_dyn" value={value_10}
                                       onClick={this.handleButtonsNewClick.bind(this, value_10)}>{button_10}</a>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <div className="col-md-12">
                            {this.responseHtml()}
                            {this.emptyHtml()}
                            <button className="btn btn-sm btn-danger float-left" type="button"
                                    onClick={this.handleBidCrossClick}>Reset
                            </button>
                            <button className="btn btn-sm btn-success float-right" type="submit"
                                    id="submit_btn">Submit
                            </button>

                        </div>
                    </form>
                </div>
            );
        }
    }












	render() {

		
		//console.log(this.state.nat_Dragon);
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
		// var new_mid =0;
		// if(this.state.mid!=0 && this.state.mid!=undefined){
		// 	var mid=this.state.mid.split(".");
		// 	if(mid[1]!=undefined){
		// 		var new_mid=mid[1];
		// 	}
		// }
		
		



	// var newdata11=this.state.getResult11;
	// 	var newarray=[];
	// 	if(this.state.casinodt20!=undefined && this.state.casinodt20!='' && this.state.casinodt20!=null)
	// 	{
			
	// 		for(var i=0;i<this.state.casinodt20.t1.length;i++){
	// 			var result="";
	// 			if(this.state.casinodt20.t1[i].result==1){
	// 				result="11"
	// 			}
	// 			if(this.state.casinodt20.t1[i].result==2){
	// 				result="12"
	// 			}
	// 			if(this.state.casinodt20.t1[i].result==3){
	// 				result="13"
	// 			}
	// 			if(this.state.casinodt20.t1[i].result==4){
	// 				result="14"
	// 			}
	// 			newarray.push(<span className="ball-runs ">{result}</span>)
	// 		}
	// 		//console.log(newarray);
		
	// 	}

		
		// var timer =0;
		// var data="";
		//console.log(this.state.autotime);
		var suspendcaino1 ='box-w1  back-color';
		var suspendcaino2 ='box-w1  lay-color';

		var suspendcaino3 ='box-w1  back-color';
		var suspendcaino4 ='box-w1  lay-color';
		// if(this.state.rate <=0){
		// 	var suspendcaino1 ='box-w1  lay-color suspended-casino';
		// }

		// if(this.state.rate_1<=0){
		// 	var suspendcaino2 ='box-w1  lay-color suspended-casino';
		// }

		// if(this.state.rate_3<=0){
		// 	var suspendcaino3 ='box-w1  lay-color suspended-casino';
		// }

		// if(this.state.rate_4<=0){
		// 	var suspendcaino4 ='box-w1  lay-color suspended-casino';
		// }
		if(this.state.autotime<=0){
			var suspendcaino1 ='box-w1  back-color suspended-casino';
			var suspendcaino2 ='box-w1  lay-color suspended-casino';
			var suspendcaino3 ='box-w1  back-color suspended-casino';
			var suspendcaino4 ='box-w1  lay-color suspended-casino';
		}
		var timer = 0;
		  if(this.state.autotime!=0 && this.state.autotime!=undefined){
			
			console.log(this.state.lasttime_b);
			timer=
			
				<Timer
					initialTime={this.state.autotime * 1000}
					direction="backward"
					timeToUpdate={1}
					checkpoints={[
						{time: 0,
							
							callback: () =>this.state.autotime
						// callback: () => alert('countdown finished'),
						},
					]}
				>
					{/* <Text style={{ fontFamily: 'Helvetica Neue' }}>
						<Text style={{ fontSize: 32 }}> */}
							<Timer.Seconds />
						{/* </Text>
						
					</Text> */}
				</Timer>
			 }
		 //else{
		// 	timer=<Timer
		// 		initialTime={0}
		// 		direction="backward"
		// 		timeToUpdate={1}
		// 		checkpoints={[
		// 			{
		// 				time: 0,
		// 			// callback: () => alert('countdown finished'),
		// 			},
		// 		]}
		// 	>
		// 		{/* <Text style={{ fontFamily: 'Helvetica Neue' }}>
		// 			<Text style={{ fontSize: 32 }}> */}
		// 				<Timer.Seconds />
		// 			{/* </Text>
					
		// 		</Text> */}
		// 	</Timer>
		// }

		
//       ======================== hushi code start 2 ==========================

var newdata11 = this.state.getResult11;
var newarray = [];

if (this.state.casinodt20 != undefined && this.state.casinodt20 != '' && this.state.casinodt20 != null) {
	// console.log(this.state.casinodt20);
	if (this.state.casinodt20 != undefined) {
		 console.log(this.state.casinodt20);
		if (this.state.casinodt20.data != undefined) {
			for (var i = 0; i < this.state.casinodt20.data.length; i++) {
				var winner = "";
				if (this.state.casinodt20.data[i].result == 1) {
					winner = "8"
				}
				if (this.state.casinodt20.data[i].result == 2) {
					winner = "9"
				}
				if (this.state.casinodt20.data[i].result == 3) {
					winner = "10"
				}
				if (this.state.casinodt20.data[i].result == 4) {
					winner = "11"
				}
				newarray.push(<span className="ball-runs ">{winner}</span>)
			}
		}


	}

}
//       ======================== hushi code end 2 ==========================



		var new_mid = 0;

        if (this.state.mid != 0 && this.state.mid != undefined) {
            var mid = this.state.mid.split(".");

            if (mid[1] != undefined) {
                var new_mid = mid[1];
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
            <span className="card-header-title"> 32 CARDS 
			
			<a href="#" className=" m-l-5 game-rules-icon rules_a"  onClick={this.handleBidCrossClick123}>RULES</a>
			 
			 </span> 
            <span className="float-right m-r-10">Round ID: {new_mid} | Min: {this.state.min} | Max: {this.state.max} 
            </span>
         </div>
         <div className="card-content">
            <div className="casino_video">
			<iframe className="live_video"
				src="https://vdo.contestgod.com/32a.html"
				style={{border: 'none'}} allowFullScreen
				sandbox="allow-scripts allow-presentation allow-same-origin"
				allow="autoplay; fullscreen; picture-in-picture; xr-spatial-tracking; encrypted-media"/>
                <div className="timer_v">  
<React.Fragment>
	{timer}
	</React.Fragment>
	</div>
			</div>
            <div className="main-market market-bf" data-marketid="1.167146463">
             <div className="row">
             <div className="col-md-6">
               <table className="coupon-table table table-bordered mb-0">
                  <thead>
                     <tr>
                        <th  class="w-50"> &nbsp;</th>
                        <th className="text-center  box-w1 back"> BACK</th>
                        <th className="text-center  box-w1 lay" >Lay  </th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr>
                        <td><span><strong>{this.state.nation}</strong></span></td>
                        <td className={suspendcaino1} >
                           <div className="bet-info  "></div>
                           <button onClick={this.handleBidClick.bind(this,"back",this.state.nation,this.state.b1,'#faa9ba')}  className="bet-sec " >
                           <span className="odd layprice">  {this.state.b1}</span>
						   {this.state.bs1}</button>
                        </td>
                        <td className={suspendcaino2}>
                           <div className="bet-info  "></div>
                           <button className="bet-sec "  onClick={this.handleBidClick.bind(this,"lay",this.state.nation,this.state.l1,'#faa9ba')} >
                           <span className="odd layprice"> {this.state.l1}</span>
						   {this.state.ls1}</button>
                        </td>
                     </tr>
					  <tr>
                        <td><span><strong>{this.state.nation_1}</strong></span></td>
                        <td className={suspendcaino3} >
                           <div className="bet-info  "></div>
                           <button className="bet-sec " onClick={this.handleBidClick.bind(this,"lay",this.state.nation_1,this.state.b1_1,'#faa9ba')}>
                           <span className="odd layprice"> {this.state.b1_1}</span>
						   {this.state.bs_1}</button>
                        </td>
                        <td className={suspendcaino4}>
                           <div className="bet-info  "></div>
                           <button className="bet-sec "  onClick={this.handleBidClick.bind(this,"lay",this.state.nation_1,this.state.l1_1,'#faa9ba')} >
                           <span className="odd layprice"> {this.state.l1_1}</span>
						   {this.state.ls1_1}</button>
                        </td>
                     </tr>
					 
                    
                  </tbody>
               </table>
			   </div>
			  <div className="col-md-6">
			   <table className="coupon-table table table-bordered">
                  <thead>
                     <tr>
                        <th class="w-50"> &nbsp;</th>
                        <th className="text-center  box-w1 back"> BACK</th>
                        <th className="text-center  box-w1 lay" >Lay  </th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr>
                        <td><span><strong>{this.state.nation_2}</strong></span></td>
                        <td className={suspendcaino1} >
                           <div className="bet-info  "></div>
                           <button onClick={this.handleBidClick.bind(this,"back",this.state.nation_2,this.state.b1_2,'#faa9ba')}  className="bet-sec " >
                           <span className="odd layprice">  {this.state.b1_2}</span>
						   {this.state.bs1_2}</button>
                        </td>
                        <td className={suspendcaino2}>
                           <div className="bet-info  "></div>
                           <button className="bet-sec "  onClick={this.handleBidClick.bind(this,"lay",this.state.nation_2,this.state.l1_2,'#faa9ba')} >
                           <span className="odd layprice"> {this.state.l1_2}</span>
						   {this.state.ls1_2}</button>
                        </td>
                     </tr>
                     <tr>
                        <td><span><strong>{this.state.nation_3}</strong></span></td>
                        <td className={suspendcaino3} >
                           <div className="bet-info  "></div>
                           <button className="bet-sec " onClick={this.handleBidClick.bind(this,"lay",this.state.nation_3,this.state.b1_3,'#faa9ba')}>
                           <span className="odd layprice"> {this.state.b1_3}</span>
						   {this.state.bs1_3}</button>
                        </td>
                        <td className={suspendcaino4}>
                           <div className="bet-info  "></div>
                           <button className="bet-sec "  onClick={this.handleBidClick.bind(this,"lay",this.state.nation_3,this.state.l1_3,'#faa9ba')} >
                           <span className="odd layprice"> {this.state.l1_3}</span>
						{this.state.ls1_3}</button>
                        </td>
                     </tr>
                  </tbody>
               </table>
             </div>
			   </div>
			</div>
            <div className="">
               <div className="row row-12">
                  <div className="col-md-12" id="fancyHeadToHide" >
                     <div className="fancy-marker-title">
                        <h4>Last Result<a href="#" 
						className=" m-r-5 game-rules-icon blinking" 
						data-id="fancy"><span><i className="fa fa-info-circle float-right"></i></span></a></h4>
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
      {/*
      <div className="card-header m-b-10" data-toggle="collapse" data-target="#demo">
         <h6 className="card-title">Live Match <span className="float-right"><i className="fa fa-tv"></i> live stream started</span> </h6>
         <iframe src="https://bet-fair.co/exchange/tplive1?type=dt20" style={{border: 'none'}} allowFullScreen sandbox="allow-scripts allow-presentation allow-same-origin" allow="autoplay; fullscreen; picture-in-picture; xr-spatial-tracking; encrypted-media" />
      </div>
      */}
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
</div></div>

<Modal show={this.state.showUserAmountPopup1} >
		
			<Modal.Header className="mancolorsite">
			
				<Modal.Title >Rules</Modal.Title>
				<a href="#" className="Close" data-dismiss="modal" onClick={this.handleDepoWithdrPopupClose}><i className="fas fa-times"></i> </a>
			</Modal.Header>
			<Modal.Body className="p-0 rulcebody">
			<img src="/img/tt_cards_rule.jpg" width="100%"/><br/>
			

			</Modal.Body>
			
	
      </Modal>






					</div>
				</div><Footer/>
			</div>
		);

		



	}
}

export default Index;
