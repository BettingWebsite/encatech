import React, { Component } from 'react';
import Nav from '../Include/Nav';
import Menu from '../Include/Menu';
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import Moment from 'moment';
import NumberFormat from 'react-number-format';
import Url from "../configure/configure.js";
import Switch from "react-switch";
const $ = window.$;
const baseUrl = Url.baseUrl;
var speakeasy = require("speakeasy");
var QRCode = require('qrcode');

var secret = speakeasy.generateSecret({name:"Diamond Exchange",issuer:"diamondexchange", length: 30 });
var token = speakeasy.totp({
	secret: secret.base32,
	encoding: 'base32',
  });
class ChangeButtonValue extends Component {

	constructor(props) {
		super(props);
		var accessToken = localStorage.getItem("token");
		var user_id = localStorage.getItem("user_id");
		this.state = {
			accessToken: accessToken, collapsed: false,
			getFirstLay: false, getSecondBack: false, user_id: user_id, oddsfirstlay: "",
			matchids: "", BatAmount_second: "", proFitfirstval: "", proFitsecondval: "", getFancybet: false, getFancySecondbet: false,pancypickCall:false,
			respMessage:"",
			hide:"",
			row_user_status:false,
		};
	}

	
	handleUserStatusChange = (checked) =>{
	  
		this.setState({row_user_status:checked});
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
	
	


	

	


	handleSubmit = (event) => {
		let headers = {
			Authorization: "Bearer " + localStorage.getItem("token"),
		};
		event.preventDefault();
		localStorage.setItem('on_off',this.state.row_user_status);
		var qr_code_id=localStorage.getItem('qr_code_id');
		
		if(qr_code_id==='undefined' || qr_code_id==='null'){
			axios.get(baseUrl + '/qr_authenticator_on_off/'+this.state.row_user_status+"/"+secret.base32,{ headers }).then((resp) => {
				if (resp.data.success=== true) {
					this.setState({
						respStatus: resp.data.success,
						respMessage:resp.data.message,
						hide:1
					});
				
					
				}else{
					this.setState({
						respStatus: resp.data.success,
						respMessage:resp.data.message
					});
					
				}
			});
	
		}else{
			
			axios.get(baseUrl + '/qr_authenticator_on_off_ststus/'+this.state.row_user_status,{ headers }).then((resp) => {
				if (resp.data.success=== true) {
					this.setState({
						respStatus: resp.data.success,
						respMessage:resp.data.message
						
					});
				
					
				}else{
					this.setState({
						respStatus: resp.data.success,
						respMessage:resp.data.message
					});
					
				}
			});
		}
		
	}
	


	componentDidMount() {
		let headers = {
			Authorization: "Bearer " + this.state.accessToken,
		};
		let matchid = {
			id: this.props.match.params.id
		};
	
		var on_off=localStorage.getItem("on_off")
		
		if(on_off==="true"){
			this.setState({row_user_status:true})
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

   var data="";
	if(localStorage.getItem('qr_code_id')==='undefined'){
		QRCode.toDataURL(secret.otpauth_url, function(err, data_url) {
				
	
	
			data='<img src="' + data_url + '">';
			
		});
   }
   
   
   



		return (
			<div>
				<Nav />
				<Menu />
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
   <div className="breadcrumb">Google Authenticator  2FA</div>
   <div className="card">
      <div className="card-body">
         <div className="table-responsive">
            <form onSubmit={this.handleSubmit}>
			<form className="form loginform" onSubmit={this.handleSubmit}>
								{this.responseHtml()}
								<div className="form-group">
									<div className="form-label-group">
									<center><div dangerouslySetInnerHTML={{__html: data}} /></center>
									</div>
								</div>
								<div className="form-group">
									<div className="form-label-group">
									<center><Switch onChange={this.handleUserStatusChange} checked={this.state.row_user_status} /></center>
									</div>
								</div>
								
								
								 <div className="form-group form-label-group">
								<button type="submit" className="btn man_btn width-100">Submit <i className=" ml-2 fas fa-sign-in-alt"></i></button>
								
								 </div>
                          
							</form>
			  
					
            </form>
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

export default ChangeButtonValue;
