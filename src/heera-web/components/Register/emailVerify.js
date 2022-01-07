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
  
  componentDidMount(){
	  var getCode = this.props.match.params.vcode;
	  let sendData = {emailverify:getCode};
	    axios.post(baseUrl + '/emailverify', sendData).then((resp) => {
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
	
	  <div className="loginman22" style={{paddingTop:" 1px",background: "#DC143C"}}>
		  <div className="container">
			<div className="card card-register mx-auto mmt-55 border-none">
			  <div className="card-header-1"></div>
			  <div className="card-body">
				<div className="form-group">
						<div className="form-label-group">
						 Checking...........
							{this.responseHtml()}
						 
					   
					  </div>
					  </div>
				
			  </div>
			</div>
		  </div>
		  </div>
     
    );
  }
}

export default Register;
