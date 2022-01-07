import React, { Component } from 'react';
var axios = require('axios');
import {Link,Redirect} from "react-router-dom";
import ReactFlagsSelect from 'react-flags-select';
import 'react-flags-select/css/react-flags-select.css';
import Url from "../configure/configure.js";
import './LoginPage.css';
const baseUrl = Url.baseUrl;
class Register extends Component {
	
  constructor(props) {
    super(props);
    this.state = {respStatus: '',
				  respMessage:"",
				  gotologin:false,
				  emptyField:false,
				  username:"",
				  email:"",
				  password:"",
				  country:"",
				  errMsg:""
				  
				  };

  }	
  
  goToLogin=()=>{
	  if(this.state.gotologin===true) {
		   return(
				<Redirect to="/login" />
				);
	  }
  }
  handleSubmit =(event) => {
    event.preventDefault();
	
	 if(  this.state.username ==="" || this.state.email ==="" || this.state.password ==="" || this.state.country ==="" ){
		 this.setState({emptyField:true,errMsg:"All Fields are required"});
		 return false;
	 }
	 let registerData={
            username:this.state.username,
            email:this.state.email,
            password:this.state.password,
            country:this.state.country,
        };
		if(this.state.password!==this.state.repassword){
			
			 this.setState({emptyField:true,errMsg:"password and re password should be same"});
			return false;
		}

        // setting header
        /* let headers={
            Authorization:"Bearer "+ this.state.tempToken,
        }; */

        axios.post(baseUrl + '/register', registerData).then((resp) => {
            //this.handleModal("close");
			var resp = resp.data;
			if(resp.success === true){
				this.setState({respStatus:resp.success,
							    respMessage:resp.message,
							    username:"",
								email:"",
								password:"",
								country:"",
							   });
				setTimeout(() => {this.setState({ respStatus: "",gotologin:true });}, 2000);
                // login user
               // localStorage.setItem("token", this.state.tempToken);

            }else{
				this.setState({respStatus:resp.success,respMessage:resp.message});
				setTimeout(() => {this.setState({ respStatus: "",gotologin:false });}, 10000);
            }
			
        });

  }
  
  handleChange = (event)=> {
	let {name,value} = event.target;
    this.setState({[name]: value,emptyField:false,errMsg:""});
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
  
   onSelectFlag =(countryCode) =>{
	  
        this.setState({country: countryCode});
    }

  
  render() {
    return (
	
	  <div className="loginman22" style={{paddingTop:" 1px"}}>
		  <div className="container">
			<div className="card card-register mx-auto mmt-55 border-none">
			 <img class="login_logo" src="/img/logo.png"/>
			  <div className="card-header-1">Register an Account</div>
			  <div className="card-body">
				<form autocomplete="off" onSubmit={this.handleSubmit}>
				  
					 <div className="form-group">
						<div className="form-label-group">
						  <input type="text"  onChange={this.handleChange}  value={this.state.username} name="username" id="user_name" className="form-control" placeholder="USER NAME"/>
						 
					   
					  </div>
					  </div>
					 
					 
					  <div className="form-group">
						<div className="form-label-group">
						  <input type="text" onChange={this.handleChange}  value={this.state.email} name="email" id="mail-id" className="form-control" placeholder="E-MAIL ID"  autofocus="autofocus" />
						 </div>
					 </div>
					
					
				  <div className="form-group">
					<div className="form-label-group">
						  <input type="password" onChange={this.handleChange}  value={this.state.password} name="password" id="password" autocomplete="off" className="form-control" placeholder="PASSWORD"  />
					</div>
				  </div>
				  
				  <div className="form-group">
					
						<div className="form-label-group">
						<input type="password" onChange={this.handleChange}  value={this.state.repassword} name="repassword" id="re-password" className="form-control" placeholder="RE-PASSWORD"  />
						</div>
				  </div>
				
				   <div className="form-group">
					<div className="form-label-group">
						  <ReactFlagsSelect searchable={true} className="form-control" onSelect={this.onSelectFlag} />
						</div>
					 </div>
				   <div className="form-group">
					<div className="form-row">
					
					  <div className="col-md-12">
						<div className="form-label-group">
						  <input type="checkbox"  onChange={this.handleChange}  value={this.state.term} name="term" className="" />&nbsp;&nbsp;
						  Terms & conditions.
						</div>
					  </div>
					</div>
				  </div>
					{this.responseHtml()}
					{this.goToLogin()}
					{this.emptyHtml()}
				  <div className="tc"> <button type="submit" className="btn man_btn" onClick={this.handleFormSubmit}>Register</button></div>
				</form>
				<div className="text-center">
				
				  <a className="d-block  mt-3" href="/login">Login Page</a>
				  <a className="d-block " href="/forgot">Forgot Password?</a>
				</div>
			  </div>
			</div>
		  </div>
		  </div>
     
    );
  }
}

export default Register;
