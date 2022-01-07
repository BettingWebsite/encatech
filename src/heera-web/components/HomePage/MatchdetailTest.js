import React, { Component } from 'react';
import Nav from '../Include/Nav';
import Menu from '../Include/Menu';
import Footer from '../Include/footer';
import Sidebar from '../Include/Sidebar';
import Url from "../configure/configure.js";
import {Redirect } from "react-router-dom";
import axios from "axios";

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
			status:""
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
		
		let matchid = this.props.match.params.id;
		let compareMainAmount = "";
		let current_market_odds = "";
		let type = "unmatch";
		if(this.state.betMatchType==="teamone" && this.state.type==="back"){
			 compareMainAmount = this.state.teamOneFirstBack;
			 current_market_odds = this.state.teamOneFirstBack;
		}
		else if(this.state.betMatchType==="teamone" && this.state.type==="lay"){
			 compareMainAmount = this.state.teamOneFirstLay;
			 current_market_odds = this.state.teamOneFirstLay;
		}
		else if(this.state.betMatchType==="teamtwo" && this.state.type==="back"){
			 compareMainAmount = this.state.teamTwoFirstBack;
			 current_market_odds = this.state.teamTwoFirstBack;
		}
		else if(this.state.betMatchType==="teamtwo" && this.state.type==="lay"){
			 compareMainAmount = this.state.teamTwoFirstLay;
			 current_market_odds = this.state.teamTwoFirstLay;
		}
		else if(this.state.betMatchType==="draw" && this.state.type==="back"){
			 compareMainAmount = this.state.drawFirstBack;
			 current_market_odds = this.state.drawFirstBack;
		}
		else if(this.state.betMatchType==="draw" && this.state.type==="lay"){
			 compareMainAmount = this.state.drawFirstLay;
			 current_market_odds = this.state.drawFirstLay;
		}
		if(compareMainAmount === this.state.oddVal){
			type = "match";
		}
		

		var loss="";
		var new_array=[];
		var loss_team="";
		if(this.state.betMatchType=="teamone"){
			loss=this.state.stackAmount_team2;
			new_array=this.state.stackAmount_team2.split("-");
			loss_team="teamtwo";
		}
		 if(this.state.betMatchType=="teamtwo"){
			loss=this.state.stackAmount_team1;
			new_array=this.state.stackAmount_team1.split("-");
			loss_team="teamone";
		}

		
		
		
		if(isNaN(parseInt(this.state.oddVal)) || this.state.oddVal<=0){
			this.setState({emptyField:true,errMsg:"Enter Valid Odds"});
			return false;
		}
		if(isNaN(parseInt(this.state.stake_amount)) || this.state.stake_amount<=0){
			this.setState({emptyField:true,errMsg:"Enter Stake"});
			return false;
		}		
			
		let savebet = {
			event_id: this.props.match.params.id,
			event_name: this.state.eventName,
			odds: this.state.oddVal,
			stake: this.state.stake_amount,
			profit: this.state.profit,
			bet_type: this.state.type,
			type: type,
			team_name: this.state.teamName,
			selection_id: this.state.betSelectionId,
			market_id: this.state.betMarketId,
			current_market_odds:current_market_odds,
			profit_team:this.state.betMatchType,
			loss_team:loss_team,
			loss:new_array[1],
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
	handleSubmitSession = (event) => {
	
		event.preventDefault();
		let headers = {
			Authorization: "Bearer " + this.state.accessToken,
		};
		
		let matchid = this.props.match.params.id;
		var yes_amount="";
		var no_amount ="";
		
		if(this.state.no==="no"){
				no_amount=this.state.session_input;
		}
		if(this.state.yes==="yes"){
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


	componentDidMount() {
		
		let headers = {
			Authorization: "Bearer " + this.state.accessToken,
		};
		$(".blockUI").show();
		this.callMatchOddsApi();
		 let counter = setInterval(this.callMatchOddsApi , 10000);
		 let matchid = this.props.match.params.id;
		

		
		axios.get(baseUrl + '/fancybetlistFront', { headers }).then((resp) => {
			var resps = resp.data;

			if (resps.success === true) {
				this.setState({ fancybet_getResults: resps.fancybetlist, fancybet_betDataFound: true });
			}
		});
		
		this.getUserCurrentBalance();
		this.callUserBetListApi();
		this.callFancyListApi();

		let counterFancy = setInterval(this.callFancyListApi , 2000);

	}
	
	
	callFancyListApi =()=>{
		let headers = {
			Authorization: "Bearer " + this.state.accessToken,
		};
		
		 let matchid = this.props.match.params.id;
		// this.callMatchOddsApi()
		axios.get(baseUrl + '/fancyapi/'+matchid, { headers }).then((resp) => {
			
			this.setState({ getFancyResults: resp.data.alldata.data, fancyDataFound: true });
		});
		$(".blockUI").hide();
	}
	

	showFancyApiHtml = () => {
		if (this.state.fancyDataFound === true) {
			const html = [];
			
			if(this.state.getFancyResults!==undefined){
				for(let fancyNewData of Object.values(this.state.getFancyResults))
			{
				if(fancyNewData.DisplayMsg!="SUSPENDED"){
					html.push(<tr>
						<td style={{ textAlign: "center" }}> {fancyNewData.headname}  </td>
						<td  className="box-w1 lay-color">
						<button className="bet-sec lay" onClick={this.handleBidClickSession.bind(this, '#faa9ba',fancyNewData.headname,"no",this.state.marketId,fancyNewData.SessInptNo,"")}><span className="odd layprice"> {fancyNewData.SessInptNo}</span>{fancyNewData.NoValume}</button></td>
						
						

						<td  className="box-w1 back-color">
						<button onClick={this.handleBidClickSession.bind(this, '#72bbef',fancyNewData.headname,"",this.state.marketId,fancyNewData.SessInptYes,'yes')} className="bet-sec lay"><span className="odd layprice"> {fancyNewData.SessInptYes}</span>{fancyNewData.YesValume}</button></td>



						<td style={{ textAlign: "center" }}> Min 10 <br/> Max 10000  </td>
					</tr>);
				}else{
					html.push(<tr>
						<td style={{ textAlign: "center" }}> {fancyNewData.headname}  </td>
						<td  className="box-w1 lay-color">
						SUSPENDED
						<button className="bet-sec lay" ><span className="odd layprice"> {fancyNewData.SessInptNo}</span>{fancyNewData.NoValume}</button></td>
						
						
						
						<td  className="box-w1 back-color">
						SUSPENDED
						<button  className="bet-sec lay"><span className="odd layprice"> {fancyNewData.SessInptYes}</span>{fancyNewData.YesValume}</button></td>



						<td style={{ textAlign: "center" }}> Min 10 <br/> Max 10000  </td>
					</tr>);
				}
				//if(fancyNewData.SessInptNo > 0 && fancyNewData.SessInptYes>0) {
					
				//}
			}
			
				
		}
			

				
			
			
			return <table className="coupon-table table table-bordered">
				<thead>
					<tr>
						<th> &nbsp;</th>
						<th className="text-center  box-w1 lay"> No </th>
						<th className="text-center  box-w1 back" style={{backgroundColor:'#72BBEF'}} > Yes </th>
						<th className="box-w2"> &nbsp; </th>
						
					</tr>
				</thead>
				<tbody>{html}</tbody>
			</table>;
		}
	}
	
	
	callUserBetListApi=()=>{
		let headers = {
			Authorization: "Bearer " + this.state.accessToken,
		};
		
		 let matchid = this.props.match.params.id;
		// this.callMatchOddsApi()
		axios.get(baseUrl + '/userbetlist/'+matchid, { headers }).then((resp) => {
			var resps = resp.data;
			var profit12=0;
			var profit13=0;
			if (resps.success === true) {
				
				








				this.setState({ getResults: resps.Betlist, betDataFound: true });
			}
		});
	}
	
	callMatchOddsApi=()=>{
		let headers = {
			Authorization: "Bearer " + this.state.accessToken,
		};
		let matchid = this.props.match.params.id;
		

		
		axios.get(baseUrl + '/usermatchdetail_test/'+matchid+'/'+this.props.match.params.id1, {headers}).then((resp) => {
			var resp = resp.data;
			var resp2 = resp.data1;
			this.setState({loading:false,})
			  
			  var getResult1 = resp.data
			  this.setState({getResult11:resp})
			  
			
			const new_array = {};
			if (resp.success === true) {
			
				Object.values(getResult1).forEach(getResult1 => {
					
				 
				var explode = resp2[0].match_name.split(" v ");
				var getResult12=getResult1.odds;
				var  getResult=JSON.parse(getResult12);
			
					// console.log(getResult.odds);
					// return false;
				if(getResult.status==="CLOSED") {

					


					var loss_team_selectionid="";
					var win_team_selectionid="";
					var win_team ="";
					var looser_team="";
					if(getResult.runners[0].status==="LOSER"){
						var loss_team_selectionid=getResult.runners[0].selectionId;
						var looser_team =explode[0];
					}else{
						var win_team_selectionid=getResult.runners[0].selectionId;
						var win_team =explode[0];
					}
					if(getResult.runners[1].status==="LOSER"){
						var loss_team_selectionid=getResult.runners[1].selectionId;
						var looser_team =explode[1];
					}else{
						var win_team_selectionid=getResult.runners[1].selectionId;
						var win_team =explode[1];
					}



					let savebet = {
						event_id: this.props.match.params.id,
						sport_type: this.state.eventName,
						loss_team_selectionid:loss_team_selectionid,
						win_team_selectionid:win_team_selectionid,
						win_team:win_team,
						looser_team:looser_team,
						market_id: this.state.market_id
					}; 
					
					
					axios.post(baseUrl + '/set_winner_by_result', savebet,{headers}).then((resp) => {
						
					});
				}

				new_array['loading']=false;
				new_array['eventName']=resp2[0].match_name;
				new_array['firstTeamName']=  explode[0];
				new_array['status']=  getResult.status
new_array['secondTeamName']= explode[1];
new_array['marketId']=getResult.marketId;
new_array['teamOneSelectionId']=   getResult.runners[0].selectionId;
new_array['teamOneFirstBack']=     getResult.runners[0].ex.availableToBack[0].price;
new_array['teamOneFirstBackSize']=   getResult.runners[0].ex.availableToBack[0].size;
new_array['teamOneMiddleBack']=     getResult.runners[0].ex.availableToBack[1].price;
new_array['teamOneMiddleBackSize']=  getResult.runners[0].ex.availableToBack[1].size;
new_array['teamOneLastBack']=       getResult.runners[0].ex.availableToBack[2].price;
new_array['teamOneLastBackSize']=   getResult.runners[0].ex.availableToBack[2].size;
new_array['teamOneFirstLay']=       getResult.runners[0].ex.availableToLay[0].price;
new_array['teamOneFirstLaySize']=  getResult.runners[0].ex.availableToLay[0].size;
new_array['teamOneMiddleLay']=     getResult.runners[0].ex.availableToLay[1].price;
new_array['teamOneMiddleLaySize']= getResult.runners[0].ex.availableToLay[1].size;
new_array['teamOneLastLay']=      getResult.runners[0].ex.availableToLay[2].price;
new_array['teamOneLastLaySize']=   getResult.runners[0].ex.availableToLay[2].size;


new_array['teamTwoSelectionId']=  getResult.runners[1].selectionId;
new_array['teamTwoFirstBack']=    getResult.runners[1].ex.availableToBack[0].price;
new_array['teamTwoFirstBackSize']= getResult.runners[1].ex.availableToBack[0].size;
new_array['teamTwoMiddleBack']=    getResult.runners[1].ex.availableToBack[1].price;
new_array['teamTwoMiddleBackSize']=getResult.runners[1].ex.availableToBack[1].size;
new_array['teamTwoLastBack']=      getResult.runners[1].ex.availableToBack[2].price;
new_array['teamTwoLastBackSize']=  getResult.runners[1].ex.availableToBack[2].size;
new_array['teamTwoFirstLay']=     getResult.runners[1].ex.availableToLay[0].price;
new_array['teamTwoFirstLaySize']=  getResult.runners[1].ex.availableToLay[0].size;
new_array['teamTwoMiddleLay']=     getResult.runners[1].ex.availableToLay[1].price;
new_array['teamTwoMiddleLaySize']= getResult.runners[1].ex.availableToLay[1].size;
new_array['teamTwoLastLay']=       getResult.runners[1].ex.availableToLay[2].price;
new_array['teamTwoLastLaySize']=   getResult.runners[1].ex.availableToLay[2].size;







if(getResult.runners[2]!=undefined){
	new_array['draw']= true,

new_array['drawSelectionId']= getResult.runners[2].selectionId;
new_array['drawFirstBack']= getResult.runners[2].ex.availableToBack[0].price;
new_array['drawFirstBackSize']= getResult.runners[2].ex.availableToBack[0].size;
new_array['drawMiddleBack']= getResult.runners[2].ex.availableToBack[1].price;
new_array['drawMiddleBackSize']= getResult.runners[2].ex.availableToBack[1].size;
new_array['drawLastBack']= getResult.runners[2].ex.availableToBack[2].price;
new_array['drawLastBackSize']= getResult.runners[2].ex.availableToBack[2].size;
new_array['drawFirstLay']= getResult.runners[2].ex.availableToLay[0].price;
new_array['drawFirstLaySize']= getResult.runners[2].ex.availableToLay[0].size;
new_array['drawMiddleLay']= getResult.runners[2].ex.availableToLay[1].price;
new_array['drawMiddleLaySize']= getResult.runners[2].ex.availableToLay[1].size;
new_array['drawLastLay']= getResult.runners[2].ex.availableToLay[2].price;
new_array['drawLastLaySize']= getResult.runners[2].ex.availableToLay[2].size;

new_array['status']=  getResult.status









	new_array['drawTeamName']= "The Draw";
	
				}

			});
			this.setState(new_array);
			}else{
				this.setState({loading:false})
			}
			var teamOneSelectionId=this.state.teamOneSelectionId;
			var teamTwoSelectionId=this.state.teamTwoSelectionId;
			var profit12=0;
			var profit13 =0;
			
			if(this.state.getResults!=undefined){
				for(let i=0;i<this.state.getResults.length;i++){
				
					if(this.state.getResults[i].selection_id === teamOneSelectionId){
						profit12= profit12+this.state.getResults[i].profit;
						if(this.state.getResults[i].loss!=undefined){
							profit13=parseFloat(profit13)-parseFloat(this.state.getResults[i].loss)
						}
					}
					else if(this.state.getResults[i].selection_id === teamTwoSelectionId){
						profit13= profit13+this.state.getResults[i].profit;
						if(this.state.getResults[i].loss!=undefined){
							profit12=parseFloat(profit12)-parseFloat(this.state.getResults[i].loss)
						}
					}
					
					
					
					
					 
					 
				}
			}
			
			
this.setState({profit12:profit12,profit13:profit13})	
		});





			
	
					
			





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
		if (this.state.betDataFound === true) {
			const html = []
			var profit12=0;
			var profit13= 0;
			var loss=0;
			//var custom_this=this;
			var teamOneSelectionId=this.state.teamOneSelectionId;
			var teamTwoSelectionId=this.state.teamOneSelectionId;
			for(let i=0;i<this.state.getResults.length;i++){
				var inPlayClass = (this.state.getResults[i].inPlay === true) ? "active" : "";
				html.push(<tr>
					<td style={{ textAlign: "center" }}> {this.state.getResults[i].odds}  </td>
					<td style={{ textAlign: "center" }}> {this.state.getResults[i].stake}  </td>
					<td style={{ textAlign: "center" }}> {this.state.getResults[i].profit}  </td>
				</tr>);
				
				

				
				 
				 
			}
			
				////console.log(this.state.profit12);
				
	
					
			
			
			
			
				
				
			
			
			return <table className="table coupon-table">
				<thead>
					<tr>
						<th style={{ textAlign: "center" }} > Odds</th>
						<th style={{ textAlign: "center" }} > Stake</th>
						<th style={{ textAlign: "center" }} > Profit</th>
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
		if(value<=0){
			return false;
		}
		
		
		var profit = this.state.profit;
		
		var stackAmount = this.state.stake_amount;
			
		//console.log(this.state.type);
		if(this.state.type === "back") {
			
			if(name==="oddVal"){
				profit = parseFloat(value)-1;
				profit = profit.toFixed(2) * stackAmount;
				profit = profit.toFixed(0);
			}
			 if(name==="stake_amount"){
				profit = parseFloat(this.state.oddVal)-1;
				profit = profit.toFixed(2) * value;
				profit = profit.toFixed(0);
			}
			
			if(this.state.betMatchType=="teamone"){
				this.setState({team_profit1:profit})
			}
			 if(this.state.betMatchType=="teamtwo"){
				this.setState({team_profit2:profit})
	
	
			}
			
			if(this.state.betMatchType=="teamone"){
				this.setState({stackAmount_team2:"-"+event.target.value})
			}
			 if(this.state.betMatchType=="teamtwo"){
				this.setState({stackAmount_team1:"-"+event.target.value})
			}
			
			this.setState({ [name]: value,profit:profit,emptyField:false,errMsg:"" });
		}
		else if(this.state.type === "lay") {
			
			
				profit = parseFloat(this.state.oddVal)-1;
				profit = profit.toFixed(2) * value;
				profit = profit.toFixed(0);
			
			if(this.state.betMatchType=="teamone"){
				this.setState({team_profit1:"-"+profit})
			}
			else if(this.state.betMatchType=="teamtwo"){
				this.setState({team_profit2:"-"+profit,})
	
	
			}
	
			if(this.state.betMatchType=="teamone"){
				this.setState({stackAmount_team2:event.target.value})
			}
			else if(this.state.betMatchType=="teamtwo"){
				this.setState({stackAmount_team1:event.target.value})
			}
			this.setState({ [name]: value,profit:event.target.value,emptyField:false,errMsg:"" });
		}
		else {
			profit = value;
			profit = parseFloat(profit).toFixed(0);
			this.setState({ [name]: value,profit:profit,emptyField:false,errMsg:"" });
		}


	
		
	}
	handleChangeStakeamount = (event) => {
		this.setState({stake_amount:event.target.value})
	}
	handleChange_session_input = (event) => {
		this.setState({session_input:event.target.value})
	}
	
	handleButtonsClick = (getAmount) =>{
		var profit = "";
		if(this.state.type === "back") {
			profit = parseFloat(this.state.oddVal)-1;
			profit = profit.toFixed(2) * getAmount;
			
			
			if(this.state.betMatchType=="teamone"){
				this.setState({team_profit1:profit})
			}
			 if(this.state.betMatchType=="teamtwo"){
				this.setState({team_profit2:profit})
	
	
			}
			
			if(this.state.betMatchType=="teamone"){
				this.setState({stackAmount_team2:"-"+getAmount})
			}
			 if(this.state.betMatchType=="teamtwo"){
				this.setState({stackAmount_team1:"-"+getAmount})
			}




			
		}
		else if(this.state.type === "lay"){
			
			profit = parseFloat(this.state.oddVal)-1;
				profit = profit.toFixed(2) * getAmount;
				profit = profit.toFixed(0);
			if(this.state.betMatchType=="teamone"){
				this.setState({team_profit1:"-"+profit})
			}
			else if(this.state.betMatchType=="teamtwo"){
				this.setState({team_profit2:"-"+profit,})
	
	
			}
	
			if(this.state.betMatchType=="teamone"){
				this.setState({stackAmount_team2:getAmount})
			}
			else if(this.state.betMatchType=="teamtwo"){
				this.setState({stackAmount_team1:getAmount})
			}
		}
		
		this.setState({stake_amount:getAmount,profit:profit});
	}
	handleButtonsNewClick = (getAmount) =>{
		
		
		this.setState({stake_amount:getAmount});
	}
	
	handleBidClick = (teamName,oddVal,color,type,selectionId,marketId,getMatchType,status) =>{
		
		


		if(teamName===undefined){
			this.setState({betClick:false,});
		}
		else if(status!="OPEN"){
			this.setState({betClick:false,});
		}
		else
		{
			this.setState({betClick:true,betClick1:false});
		}
			this.setState({
						   teamName:teamName,
						   oddVal:oddVal,
						   color:color,
						   type:type,
						   betSelectionId:selectionId,
						   betMarketId:marketId,
						   betMatchType:getMatchType,
						   stake_amount:"",
						   profit22:"",
						   profit:"",
						   team_profit1:"",
						   team_profit2:"",
						   stackAmount_team1:"",
						   stackAmount_team2:""
						});
	}
	

	handleBidClickSession = (color,headname,no,marketId,SessInptNo,yes) =>{
		
		

//console.log(SessInptNo);
		
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
							<a href="#" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value="1000" onClick={this.handleButtonsClick.bind(this,1000)}>1000</a>
							<a href="#" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value="5000" onClick={this.handleButtonsClick.bind(this,5000)}>5000</a>
							<a href="#" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value="10000" onClick={this.handleButtonsClick.bind(this,10000)}>10000</a>
							<a href="#" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value="25000" onClick={this.handleButtonsClick.bind(this,25000)}>25000</a>
							<a href="#" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value="50000" onClick={this.handleButtonsClick.bind(this,50000)}>50000</a>
							<a href="#" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value="100000" onClick={this.handleButtonsClick.bind(this,100000)}>100000</a>
							<a href="#" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value="200000" onClick={this.handleButtonsClick.bind(this,200000)}>200000</a>
							<a href="#" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value="500000" onClick={this.handleButtonsClick.bind(this,500000)}>500000</a>
							<a href="#" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value="1000000" onClick={this.handleButtonsClick.bind(this,1000000)}>1000000</a>
							<a href="#" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value="2500000" onClick={this.handleButtonsClick.bind(this,2500000)}>2500000</a>
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

	showBidClickSessionHtml = () =>{
		if(this.state.betClick1===true) {
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
							<a href="#" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value="1000" onClick={this.handleButtonsNewClick.bind(this,1000)}>1000</a>
							<a href="#" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value="5000" onClick={this.handleButtonsNewClick.bind(this,5000)}>5000</a>
							<a href="#" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value="10000" onClick={this.handleButtonsNewClick.bind(this,10000)}>10000</a>
							<a href="#" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value="25000" onClick={this.handleButtonsNewClick.bind(this,25000)}>25000</a>
							<a href="#" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value="50000" onClick={this.handleButtonsNewClick.bind(this,50000)}>50000</a>
							<a href="#" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value="100000" onClick={this.handleButtonsNewClick.bind(this,100000)}>100000</a>
							<a href="#" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value="200000" onClick={this.handleButtonsNewClick.bind(this,200000)}>200000</a>
							<a href="#" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value="500000" onClick={this.handleButtonsNewClick.bind(this,500000)}>500000</a>
							<a href="#" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value="1000000" onClick={this.handleButtonsNewClick.bind(this,1000000)}>1000000</a>
							<a href="#" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value="2500000" onClick={this.handleButtonsNewClick.bind(this,2500000)}>2500000</a>
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
	}
	var minimum_bet_limit=	this.state.maxminBet.adminlist;
	if(minimum_bet_limit!=undefined){
		minimum_bet_limit=minimum_bet_limit.minimum_bet_limit;
	}
	
		var accessToken = this.state.accessToken;

		if (accessToken === "" || accessToken === null) {
			return (
				<Redirect to="/login" />
			);
		}
	var newdata11=this.state.getResult11;
	
if(newdata11!=undefined){
	
if(this.state.teamOneLastBack!=undefined){

		
		return (
			
			<div>
			<Nav />
				<Menu />
				<div className="blockUI blockMsg blockPage"  ><div className="loading-hold" id="overlay"> <div className="loaderGif"> </div> </div></div>
				<div id="wrapper">
					<Sidebar />
					<div id="content-wrapper">
						<div className="container-fluid">
							<div className="row">
								<div className="col-md-9 featured-box-detail">
									<div className="coupon-card"> 
										<div className="game-heading"> <span className="card-header-title">MATCH ODDS <a href="#" className=" m-r-5 game-rules-icon blinking" data-id="match"><span><i className="fa fa-info-circle float-right"></i></span></a></span> <span className="float-right m-r-10">Maximum Bet : <span id="maxbetlmt">{maximum_bet_limit}</span></span>
										<span className="float-right m-r-10">minimum Bet : <span id="maxbetlmt">{minimum_bet_limit}</span></span>
										 </div>
										<div className="card-content">
											<div className="table-responsive m-b-10 main-market market-bf" data-marketid="1.167146463">
												<table className="table coupon-table table table-striped table-bordered m-t-10 " >
													<thead>
														<tr>
															<th>Total Match: {this.state.twoteamtotalmatch}</th>
															<th className="box-w1">&nbsp;</th>
															<th className="box-w1">&nbsp;</th>
															<th className="back box-w1">Back</th>
															<th className="lay box-w1">Lay</th>
															<th className="box-w1">&nbsp;</th>
															<th className="box-w1">&nbsp;</th>
														</tr>
													</thead>
													<tbody id="dyn_bind">
														<tr className="bet-info ">
															<td className="team-name nation" >
																<span ><strong>{this.state.firstTeamName}</strong></span>
																<p className="box-w4"><span className="float-right book" id="book_349" style={{ color: "black" }}>{this.state.team_profit1}
																 {this.state.stackAmount_team1}</span> <span className="float-right profit" id="profit_349" style={{ color: "black" }} ></span>
																 </p>
																 
																 
																 <p className="box-w4"><span className="float-left book"  style={{ color: "black" }}>{this.state.profit12}
																</span> <span className="float-left  profit" style={{ color: "black" }} ></span></p>




															</td>
															
															<td className="box-w1 back-color" style={{backgroundColor:'#B2D6F0'}}>
															{status}
																
																<button className="bet-sec back "  onClick={this.handleBidClick.bind(this,this.state.firstTeamName,this.state.teamOneLastBack,'#B2D6F0',"back",this.state.teamOneSelectionId,this.state.marketId,'teamone',this.state.status)}  > <span className="odd backprice">{this.state.teamOneLastBack}</span>{this.state.teamOneLastBackSize}  </button>
															</td>
															<td className="box-w1 back-color" style={{backgroundColor:'#92C9F0'}}>{status}
																<button className="bet-sec back " onClick={this.handleBidClick.bind(this,this.state.firstTeamName,this.state.teamOneMiddleBack,'#92C9F0',"back",this.state.teamOneSelectionId,this.state.marketId,'teamone',this.state.status)} > <span className="odd backprice">{this.state.teamOneMiddleBack}</span> {this.state.teamOneMiddleBackSize} </button>
															</td>
															
															<td className="box-w1 back-color">{status}
																<button className="bet-sec back " onClick={this.handleBidClick.bind(this,this.state.firstTeamName,this.state.teamOneFirstBack,'#92C9F0',"back",this.state.teamOneSelectionId,this.state.marketId,'teamone',this.state.status)} > <span className="odd backprice">{this.state.teamOneFirstBack}</span> {this.state.teamOneFirstBackSize} </button>
															</td>
															
															
															
															<td className="box-w1 lay-color">{status}
																<button className="bet-sec lay" value={this.state.lastPriceTraded1} onClick={this.handleBidClick.bind(this,this.state.firstTeamName,this.state.teamOneFirstLay,'#faa9ba',"lay",this.state.teamOneSelectionId,this.state.marketId,'teamone',this.state.status)}><span className="odd layprice">{this.state.teamOneFirstLay}</span>{this.state.teamOneFirstLaySize}</button>
															</td>
															<td className="box-w1 lay-color" style={{backgroundColor:'#F8BBC8'}}>{status}
																<button className="bet-sec lay" value={this.state.lastPriceTraded1} onClick={this.handleBidClick.bind(this,this.state.firstTeamName,this.state.teamOneMiddleLay,'#F8BBC8',"lay",this.state.teamOneSelectionId,this.state.marketId,'teamone',this.state.status)}><span className="odd layprice">{this.state.teamOneMiddleLay}</span>{this.state.teamOneMiddleLaySize}</button>
															</td>
															<td className="box-w1 lay-color" style={{backgroundColor:'#F6CDD6'}}>{status}
																<button className="bet-sec lay" value={this.state.lastPriceTraded1} onClick={this.handleBidClick.bind(this,this.state.firstTeamName,this.state.teamOneLastLay,'#F6CDD6',"lay",this.state.teamOneSelectionId,this.state.marketId,'teamone',this.state.status)}><span className="odd layprice">{this.state.teamOneLastLay}</span>{this.state.teamOneLastLaySize}</button>
															</td>															
															
														</tr>
														<tr className="bet-info ">
															<td className="team-name nation" id="10301">
																<span><strong>{this.state.secondTeamName}</strong></span>
																<p className="box-w4"><span className="float-right book" id="book_10301" style={{ color: "black" }}>{this.state.team_profit2} {this.state.stackAmount_team2}</span> <span className="float-right profit" id="profit_10301" style={{ color: "black" }}></span></p>
																<p className="box-w4"><span className="float-left book"  style={{ color: "black" }}>{this.state.profit13}
																</span> <span className="float-left  profit" style={{ color: "black" }} ></span></p>
															</td>
															<td className="box-w1 back-color" style={{backgroundColor:'#B2D6F0'}}>{status}
																<button className="bet-sec back "  > <span className="odd backprice" onClick={this.handleBidClick.bind(this,this.state.secondTeamName,this.state.teamTwoLastBack,'#B2D6F0',"back",this.state.teamTwoSelectionId,this.state.marketId,'teamtwo',this.state.status)}>{this.state.teamTwoLastBack}</span>{this.state.teamTwoLastBackSize}</button>
															</td>
															<td className="box-w1 back-color" style={{backgroundColor:'#92C9F0'}}>{status}
																<button className="bet-sec back "  > <span className="odd backprice" onClick={this.handleBidClick.bind(this,this.state.secondTeamName,this.state.teamTwoMiddleBack,'#92C9F0',"back",this.state.teamTwoSelectionId,this.state.marketId,'teamtwo',this.state.status)}>{this.state.teamTwoMiddleBack}</span>{this.state.teamTwoMiddleBackSize}  </button>
															</td>
															
															<td className="box-w1 back-color">{status}
																<button className="bet-sec back "  > <span className="odd backprice" onClick={this.handleBidClick.bind(this,this.state.secondTeamName,this.state.teamTwoFirstBack,'#72bbef',"back",this.state.teamTwoSelectionId,this.state.marketId,'teamtwo',this.state.status)}>{this.state.teamTwoFirstBack}</span>{this.state.teamTwoFirstBackSize}  </button>
															</td>
															
															
															
															<td className="box-w1 lay-color">{status}
																<button className="bet-sec lay" value={this.state.lastPriceTraded1} onClick={this.handleBidClick.bind(this,this.state.secondTeamName,this.state.teamTwoFirstLay,'#FAA9BA',"lay",this.state.teamTwoSelectionId,this.state.marketId,'teamtwo',this.state.status)}><span className="odd layprice">{this.state.teamTwoFirstLay}</span>{this.state.teamTwoFirstLaySize}</button>
															</td>
															<td className="box-w1 lay-color" style={{backgroundColor:'#F8BBC8'}}>{status}
																<button className="bet-sec lay" value={this.state.lastPriceTraded1} onClick={this.handleBidClick.bind(this,this.state.secondTeamName,this.state.teamTwoMiddleLay,'#F8BBC8',"lay",this.state.teamTwoSelectionId,this.state.marketId,'teamtwo',this.state.status)}><span className="odd layprice">{this.state.teamTwoMiddleLay}</span>{this.state.teamTwoMiddleLaySize}</button>
															</td>
															<td className="box-w1 lay-color" style={{backgroundColor:'#F6CDD6'}}>{status}
																<button className="bet-sec lay" value={this.state.lastPriceTraded1} onClick={this.handleBidClick.bind(this,this.state.secondTeamName,this.state.teamTwoLastLay,'#F6CDD6',"lay",this.state.teamTwoSelectionId,this.state.marketId,'teamtwo',this.state.status)}><span className="odd layprice">{this.state.teamTwoLastLay}</span>{this.state.teamTwoLastLaySize}</button>
															</td>	
														</tr>
														{this.showDrawHtml()}
													</tbody>
												</table>
											</div>
											<div className="">

												<div className="row row-12">
													<div className="col-md-12" id="fancyHeadToHide" >
														<div className="fancy-marker-title">
															<h4>Fancy Bet <a href="#" className=" m-r-5 game-rules-icon blinking" data-id="fancy"><span><i className="fa fa-info-circle float-right"></i></span></a></h4>
														</div>
														<div id="div_fancy">
															{this.showFancyApiHtml()}
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
									<div className="card-header m-b-10" data-toggle="collapse" data-target="#demo">
										<h6 className="card-title">Live Match <span className="float-right"><i className="fa fa-tv"></i> live stream started</span> </h6>
									</div>
									<div id="demo" className="collapse show m-b-10">
										
									</div>
									<div className="card m-b-10 place-bet ">
										<div className="card-header">
											<h6 className="card-title d-inline-block">Place Bet</h6>
											<a className="btn btn-secondary float-right change-value" id="cng_btn_val" href="#">Change Button Value</a>
										</div>
									
													
										{this.showBidClickHtml()}
										{this.showBidClickSessionHtml()}		
												
									</div>
									<div className="card m-b-10 place-bet">
										<div className="card-header">
											<h6 className="card-title d-inline-block">My Bet</h6>
											<a className="btn btn-danger float-right change-value" id="cng_btn_val" href="#">ClearAll</a>
										</div>
										<div className="table-responsive hide-box-click " style={{ paddingBottom: "4px", display: "block" }} >

											{this.showTableHtml()}
										</div>
									</div>
									<form onSubmit={this.handleFancybetSubmit} method="post" id="frm_placebet"> 
									<table className="table table-borderedless place-bet">
										<thead>
											<tr>
												<th></th>
												<th style={{ width: "35%", textAlign: "left" }} >(Bet for)</th>
												<th style={{ width: "35%", textAlign: "left" }} >Odds</th>
												<th style={{ width: "35%", textAlign: "left" }} >Stake</th> 
											</tr>
										</thead>
										<tbody>
											{this.getFancybet()}
											{this.getFancybetPoint()}
											<br></br>
											{this.getFancySecondbet()}
											{this.getSecondFancybetPoint()} 
										</tbody>
									</table>
									<div className="col-md-12">
										<button className="btn btn-sm btn-danger float-left" type="button" onClick={this.cancelCourse}>Reset</button>
										<button className="btn btn-sm btn-success float-right" type="submit" id="submit_btn">Submit</button>
										<input id="Odds1" type="hidden" value={this.state.lastPriceTraded1} onChange={this.handleChange} />
										<input id="Odds2" type="hidden" value={this.state.lastPriceTraded2} onChange={this.handleChange} />
										<input id="team_id1" type="hidden" value={this.state.teamid1} onChange={this.handleChange} />
									</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);

		}else{

			return (
					
				<div>
				
					<Nav />
					<Menu />
					<div className="blockUI blockMsg blockPage"  ><div className="loading-hold" id="overlay"> <div className="loaderGif"> </div> </div></div>
					<div id="wrapper">
						<Sidebar />
						<div id="content-wrapper">
							<div className="container-fluid">
								<div className="row">
									<div className="col-md-9 featured-box-detail">
										<div className="coupon-card"> 
											<div className="game-heading"> <span className="card-header-title">MATCH ODDS <a href="#" className=" m-r-5 game-rules-icon blinking" data-id="match"><span><i className="fa fa-info-circle float-right"></i></span></a></span> 
											<span className="float-right m-r-10">Maximum Bet :  <span id="maxbetlmt">{maximum_bet_limit}</span></span>
										<span className="float-right m-r-10">Minimum Bet :<span id="maxbetlmt">{minimum_bet_limit}</span></span>
											
											 </div>
											<div className="card-content">
												<div className="table-responsive m-b-10 main-market market-bf" data-marketid="1.167146463">
													<table className="table coupon-table table table-striped table-bordered m-t-10 " >
														<thead>
															<tr>
																<th>Total Match: {this.state.twoteamtotalmatch}</th>
																<th className="box-w1">&nbsp;</th>
																<th className="box-w1">&nbsp;</th>
																<th className="back box-w1">Back</th>
																<th className="lay box-w1">Lay</th>
																<th className="box-w1">&nbsp;</th>
																<th className="box-w1">&nbsp;</th>
															</tr>
														</thead>
														</table>
												</div>
												<div className="">
		
													<div className="row row-12">
														<div className="col-md-12" id="fancyHeadToHide" >
															<div className="fancy-marker-title">
																<h4>Fancy Bet <a href="#" className=" m-r-5 game-rules-icon blinking" data-id="fancy"><span><i className="fa fa-info-circle float-right"></i></span></a></h4>
															</div>
															<div id="div_fancy">
																{this.showFancyTableHtml()}
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
										<div className="card-header m-b-10" data-toggle="collapse" data-target="#demo">
											<h6 className="card-title">Live Match <span className="float-right"><i className="fa fa-tv"></i> live stream started</span> </h6>
										</div>
										<div id="demo" className="collapse show m-b-10">
											
										</div>
										<div className="card m-b-10 place-bet ">
											<div className="card-header">
												<h6 className="card-title d-inline-block">Place Bet</h6>
												<a className="btn btn-secondary float-right change-value" id="cng_btn_val" href="#">Change Button Value</a>
											</div>
										
														
											{this.showBidClickHtml()}
											{this.showBidClickSessionHtml()}			
													
										</div>
										<div className="card m-b-10 place-bet">
											<div className="card-header">
												<h6 className="card-title d-inline-block">My Bet</h6>
												<a className="btn btn-danger float-right change-value" id="cng_btn_val" href="#">ClearAll</a>
											</div>
											<div className="table-responsive hide-box-click " style={{ paddingBottom: "4px", display: "block" }} >
		
												{this.showTableHtml()}
											</div>
										</div>
										<form onSubmit={this.handleFancybetSubmit} method="post" id="frm_placebet"> 
										<table className="table table-borderedless place-bet">
											<thead>
												<tr>
													<th></th>
													<th style={{ width: "35%", textAlign: "left" }} >(Bet for)</th>
													<th style={{ width: "35%", textAlign: "left" }} >Odds</th>
													<th style={{ width: "35%", textAlign: "left" }} >Stake</th> 
												</tr>
											</thead>
											<tbody>
												{this.getFancybet()}
												{this.getFancybetPoint()}
												<br></br>
												{this.getFancySecondbet()}
												{this.getSecondFancybetPoint()} 
											</tbody>
										</table>
										<div className="col-md-12">
											<button className="btn btn-sm btn-danger float-left" type="button" onClick={this.cancelCourse}>Reset</button>
											<button className="btn btn-sm btn-success float-right" type="submit" id="submit_btn">Submit</button>
											<input id="Odds1" type="hidden" value={this.state.lastPriceTraded1} onChange={this.handleChange} />
											<input id="Odds2" type="hidden" value={this.state.lastPriceTraded2} onChange={this.handleChange} />
											<input id="team_id1" type="hidden" value={this.state.teamid1} onChange={this.handleChange} />
										</div>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		}
}

else{

	return (
			
		<div>
		
			<Nav />
			<Menu />
			<div className="blockUI blockMsg blockPage"   ><div className="loading-hold" id="overlay"> <div className="loaderGif"> </div> </div></div>
			<div id="wrapper">
				<Sidebar />
				<div id="content-wrapper">
					<div className="container-fluid">
						<div className="row">
							<div className="col-md-9 featured-box-detail">
								<div className="coupon-card"> 
									<div className="game-heading"> <span className="card-header-title">MATCH ODDS <a href="#" className=" m-r-5 game-rules-icon blinking" data-id="match"><span><i className="fa fa-info-circle float-right"></i></span></a></span> <span className="float-right m-r-10">Balance <span id="maxbetlmt">{this.state.userCurretBalance}</span></span> </div>
									<div className="card-content">
										<div className="table-responsive m-b-10 main-market market-bf" data-marketid="1.167146463">
											<table className="table coupon-table table table-striped table-bordered m-t-10 " >
												<thead>
													<tr>
														<th>Total Match: {this.state.twoteamtotalmatch}</th>
														<th className="box-w1">&nbsp;</th>
														<th className="box-w1">&nbsp;</th>
														<th className="back box-w1">Back</th>
														<th className="lay box-w1">Lay</th>
														<th className="box-w1">&nbsp;</th>
														<th className="box-w1">&nbsp;</th>
													</tr>
												</thead>
												</table>
										</div>
										<div className="">

											<div className="row row-12">
												<div className="col-md-12" id="fancyHeadToHide" >
													<div className="fancy-marker-title">
														<h4>Fancy Bet <a href="#" className=" m-r-5 game-rules-icon blinking" data-id="fancy"><span><i className="fa fa-info-circle float-right"></i></span></a></h4>
													</div>
													<div id="div_fancy">
														{this.showFancyTableHtml()}
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
								<div className="card-header m-b-10" data-toggle="collapse" data-target="#demo">
									<h6 className="card-title">Live Match <span className="float-right"><i className="fa fa-tv"></i> live stream started</span> </h6>
								</div>
								<div id="demo" className="collapse show m-b-10">
									
								</div>
								<div className="card m-b-10 place-bet ">
									<div className="card-header">
										<h6 className="card-title d-inline-block">Place Bet</h6>
										<a className="btn btn-secondary float-right change-value" id="cng_btn_val" href="#">Change Button Value</a>
									</div>
								
												
									{this.showBidClickHtml()}
									{this.showBidClickSessionHtml()}				
											
								</div>
								<div className="card m-b-10 place-bet">
									<div className="card-header">
										<h6 className="card-title d-inline-block">My Bet</h6>
										<a className="btn btn-danger float-right change-value" id="cng_btn_val" href="#">ClearAll</a>
									</div>
									<div className="table-responsive hide-box-click " style={{ paddingBottom: "4px", display: "block" }} >

										{this.showTableHtml()}
									</div>
								</div>
								<form onSubmit={this.handleFancybetSubmit} method="post" id="frm_placebet"> 
								<table className="table table-borderedless place-bet">
									<thead>
										<tr>
											<th></th>
											<th style={{ width: "35%", textAlign: "left" }} >(Bet for)</th>
											<th style={{ width: "35%", textAlign: "left" }} >Odds</th>
											<th style={{ width: "35%", textAlign: "left" }} >Stake</th> 
										</tr>
									</thead>
									<tbody>
										{this.getFancybet()}
										{this.getFancybetPoint()}
										<br></br>
										{this.getFancySecondbet()}
										{this.getSecondFancybetPoint()} 
									</tbody>
								</table>
								<div className="col-md-12">
									<button className="btn btn-sm btn-danger float-left" type="button" onClick={this.cancelCourse}>Reset</button>
									<button className="btn btn-sm btn-success float-right" type="submit" id="submit_btn">Submit</button>
									<input id="Odds1" type="hidden" value={this.state.lastPriceTraded1} onChange={this.handleChange} />
									<input id="Odds2" type="hidden" value={this.state.lastPriceTraded2} onChange={this.handleChange} />
									<input id="team_id1" type="hidden" value={this.state.teamid1} onChange={this.handleChange} />
								</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div><Footer/>
		</div>
	);
}
	}
}

export default Index;
