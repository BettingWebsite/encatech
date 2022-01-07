import React, { Component } from 'react';
import Nav from '../Include/Nav';
import Menu from '../Include/Menu';
import Footer from '../Include/footer';
import Sidebar from '../Include/Sidebar';
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import Moment from 'moment'; 
import Loading from 'react-fullscreen-loading';
import {
	BrowserView,
	MobileView,
	isBrowser,
	isMobile
  } from "react-device-detect";
import Provider from "../vip casino/Provider";
const $ = window.$;
const baseUrl = "http://83.136.253.64:4000";
class Index extends Component {

	constructor(props) {
		super(props);
		var accessToken = localStorage.getItem("token");
		this.state = { accessToken: accessToken,gotoindex:false,loading:true,session_id:"",matchData2:"" ,match_odds:""};

	} 
	goToIndex = () => {
		if (this.state.gotoindex === true) {
			return (
				<Redirect to="/vip-casino" />
			);
		}
	}
	componentDidMount() { 
	
		if(this.props.match.params.id===undefined){
			this.setState({gotoindex:true});
		}
		let headers = {
			Authorization: "Bearer " + this.state.accessToken,
		}; 
		
		// axios.get(baseUrl + '/api/current',{headers}).then((resp) => {  
			
			// if(resp.data.session_id!=undefined){
				
			// 	this.setState({session_id:resp.data.session_id})
			// }
			$(".blockUI").show();
		this.callMattchListApi();
		setTimeout(() => {this.callMattchListApiSetTimeOut()}, 4000);
		
			
		//});  
	}
	
	callMattchListApi = () => {
		/* let Postid = { 
			id: this.props.match.params.id
		};  
		 axios.post(baseUrl + '/api/totalmatchlist',Postid).then((resp) => { 
			var resp = resp.data; 
			var getResult = JSON.parse(resp.data);   
			if(resp.success===true){
				this.setState({matchData:getResult.result,matchDataFound:true});
			}    
		});  */
		this.setState({loading:true});
		let headers = {
			Authorization: "Bearer " + this.state.accessToken,
		}; 
		let Postid = this.props.match.params.id;  
		console.log(Postid);
		var newvalue=""
		
		var data2234 ="";
		var data2234 ="";
		 axios.get(baseUrl + '/api/cricket_data/'+this.props.match.params.id,{headers}).then((resp) => { 
			$(".blockUI").hide();
			var hideMatchList = resp.data.hmlist;
			if(Postid==="tennis"){
				var data2233=JSON.parse(resp.data.showdata.tennis);
				var data2234=JSON.parse(resp.data.showdata.tennis_bookmaker);
			}
			else if(Postid==="cricket"){
				var data2233=JSON.parse(resp.data.showdata.cricket);
				var data2234=JSON.parse(resp.data.showdata.cricket_bookmaker);
			}
			else if(Postid==="soccer"){
				var data2233=JSON.parse(resp.data.showdata.soccer);
				var data2234=JSON.parse(resp.data.showdata.soccer_bookmaker);
			}
			
			
			var resp = resp.data; 
			
			
			var getResult = data2233['myArr']; 
			
			var getResult2 = data2234['myArr1'];   
			
			if(resp.success===true){
			
				this.setState({matchData:getResult,matchData2:getResult2,DataFound:true,loading:false,matchDataFound:true,hideMatchList:hideMatchList});
			} else{
				$(".blockUI").hide();
				this.setState({loading:false,matchDataFound:false});

			}   
		}); 
		
	}

	callMattchListApiSetTimeOut = () => {
		/* let Postid = { 
			id: this.props.match.params.id
		};  
		 axios.post(baseUrl + '/api/totalmatchlist',Postid).then((resp) => { 
			var resp = resp.data; 
			var getResult = JSON.parse(resp.data);   
			if(resp.success===true){
				this.setState({matchData:getResult.result,matchDataFound:true});
			}    
		});  */
		this.setState({loading:true});
		let headers = {
			Authorization: "Bearer " + this.state.accessToken,
		}; 
		let Postid = this.props.match.params.id;  
		console.log(Postid);
		var newvalue=""
		
		var data2234 ="";
		var data2234 ="";
		 axios.get(baseUrl + '/api/cricket_data/'+this.props.match.params.id,{headers}).then((resp) => { 
			$(".blockUI").hide();
			if(Postid==="tennis"){
				var data2233=JSON.parse(resp.data.showdata.tennis);
				var data2234=JSON.parse(resp.data.showdata.tennis_bookmaker);
			}
			else if(Postid==="cricket"){
				var data2233=JSON.parse(resp.data.showdata.cricket);
				var data2234=JSON.parse(resp.data.showdata.cricket_bookmaker);
			}
			else if(Postid==="soccer"){
				var data2233=JSON.parse(resp.data.showdata.soccer);
				var data2234=JSON.parse(resp.data.showdata.soccer_bookmaker);
			}
			
			
			var resp = resp.data; 
			
			
			var getResult = data2233['myArr']; 
			
			var getResult2 = data2234['myArr1'];   
			
			if(resp.success===true){
			
				this.setState({matchData:getResult,matchData2:getResult2,DataFound:true,loading:false,matchDataFound1:true,match_odds:true});
				this.showTableHtml1();
				
			} else{
				$(".blockUI").hide();
				this.setState({loading:false,matchDataFound:false});

			}   
		}); 
		
	}
	
	


	render() {
		var accessToken = this.state.accessToken;
		

		var session_id=localStorage.getItem("session_id")
		if (accessToken === "" || accessToken === null) {
			return (
				<Redirect to="/login" />
			);
		} 
		var change_password=localStorage.getItem("change_password")
		if (change_password!="" && change_password!=null) {
			return (
				<Redirect to="/change_password" />
			);
		}
		
		var popupdta ="";
		if(localStorage.getItem("popup")==1)
		{
			var popupdta=<div className="popop_boxman wow zoomIn animated " style={{ display: "none" }} data-wow-delay="0.1s">
			<div className="popop_box">
			<div className="popop_header">
			<span id="close">x</span>
			</div>
            <img className="img-fluid" src="/img/popup21dim.jpg" /> 
			</div>
		   </div> 
		   localStorage.setItem("popup",2);
		}
		return (
			<div>
				<BrowserView>



				{/* <img src="/img/ajax-loader.gif" /> */}
			{this.goToIndex()}
				<Nav />
				<Menu />
				<div className="blockUI blockMsg blockPage"   ><div className="loading-hold" id="overlay"> <div className="loaderGif"> </div> </div></div>
				<div id="wrapper">
					<Sidebar />
					<div id="content-wrapper">
						<div className="container-fluid">

{/*							<div className="row game_img_man vip-poker">*/}
{/*        <div className="col-3 col-sm-3">*/}
{/*          <a href="/seven-up-seven-down" className="game_img">*/}
{/*            <img className="img-fluid" src="/img/d1.jpg" />*/}
{/*			<div className="new-launch-casino"><img src="/img/offer-patch.png" /></div>*/}
{/*			<div className="casino-name">7up 7down</div>*/}
{/*          </a></div>*/}
{/*        <div className="col-3 col-sm-3">*/}
{/*          <a href="/card-casnio-32" className="game_img">*/}
{/*		  <img src="/img/d2.jpg" className="img-fluid" />*/}
{/*		  <div className="new-launch-casino"><img src="/img/offer-patch.png" /></div>*/}
{/*		  <div className="casino-name">32 Card</div>*/}
{/*          </a></div>*/}
{/*       <div className="col-3 col-sm-3">*/}
{/*          <a href="/one-day-poker" className="game_img">*/}
{/*            <img src="/img/d3.jpg" className="img-fluid" />*/}
{/*<div className="new-launch-casino"><img src="/img/offer-patch.png" /></div>*/}
{/*			<div className="casino-name">One Day Poker</div>*/}
{/*          </a></div>*/}
{/*        <div className="col-3 col-sm-3">*/}
{/*          <a href="teenpatti-one-day" className="game_img"><img src="/img/d4.jpg" className="img-fluid" />*/}
{/*		  <div className="new-launch-casino"><img src="/img/offer-patch.png" /></div>*/}
{/*		  <div className="casino-name">Teenpatti one day</div></a></div>*/}
{/*        <div className="col-3 col-sm-3">*/}
{/*          <a href="teenpatti-t20" className="game_img"><img src="/img/d5.jpg" className="img-fluid" />*/}
{/*		  <div className="new-launch-casino"><img src="/img/offer-patch.png" /></div>*/}
{/*		  <div className="casino-name">Teenpatti 20</div></a></div>*/}
{/*          <div className="col-3 col-sm-3">*/}
{/*            <a href="/andar-bahar" className="game_img"><img src="/img/d6.jpg" className="img-fluid" />*/}
{/*			<div className="new-launch-casino"><img src="/img/offer-patch.png" /></div>*/}
{/*			<div className="casino-name">Andar Bahar</div></a></div>*/}








{/*			{popupdta}*/}






{/*          </div>*/}
<Provider/>
        </div>

					</div>

				</div>
				</BrowserView>
				<MobileView>
				<Nav />
				<Menu />

				<div id="content-wrapper">
   <div className="home_mobile">

      <div className="tab-content">
         <div className="  ">

            <div className="coupon-card coupon-card-first">
               <div className="card-content" id="home_match_data">
                 <div className="row game_img_man vip-poker">
        <div className="col-4 col-sm-3">
          <a href="/seven-up-seven-down" className="game_img">
            <img className="img-fluid" src="/img/d1.jpg" />
			<div className="new-launch-casino"><img src="/img/offer-patch.png" /></div>
			<div className="casino-name">7up 7down</div>
          </a></div>
        <div className="col-4 col-sm-3">
          <a href="/card-casnio-32" className="game_img">
		  <img src="/img/d2.jpg" className="img-fluid" />
		  <div className="new-launch-casino"><img src="/img/offer-patch.png" /></div>
		  <div className="casino-name">32 Card</div>
          </a></div>
       <div className="col-4 col-sm-3">
          <a href="/one-day-poker" className="game_img">
            <img src="/img/d3.jpg" className="img-fluid" />
<div className="new-launch-casino"><img src="/img/offer-patch.png" /></div>
			<div className="casino-name">One Day Poker</div>
          </a></div>
        <div className="col-4 col-sm-3">
          <a href="teenpatti-one-day" className="game_img"><img src="/img/d4.jpg" className="img-fluid" />
		  <div className="new-launch-casino"><img src="/img/offer-patch.png" /></div>
		  <div className="casino-name">Teenpatti one day</div></a></div>
        <div className="col-4 col-sm-3">
          <a href="teenpatti-t20" className="game_img"><img src="/img/d5.jpg" className="img-fluid" />
		  <div className="new-launch-casino"><img src="/img/offer-patch.png" /></div>
		  <div className="casino-name">Teenpatti 20</div></a></div>
          <div className="col-4 col-sm-3">
            <a href="/andar-bahar" className="game_img"><img src="/img/d6.jpg" className="img-fluid" />
			<div className="new-launch-casino"><img src="/img/offer-patch.png" /></div>
			<div className="casino-name">Andar Bahar</div></a></div>








			{popupdta}






          </div>


				 </div>
            </div>
         </div>










      </div>
      <div>
      </div>
   </div>
</div>
				</MobileView><Footer/>
			</div>
			// <Provider/>
		);
	}
}

export default Index;