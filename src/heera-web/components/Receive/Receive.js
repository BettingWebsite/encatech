import React, { Component } from 'react';
import Header from '../Header/Header';
import {Link,Redirect} from "react-router-dom";
import axios from "axios";
import Url from "../configure/configure.js";
const baseUrl = Url.baseUrl;

class Receive extends Component {
	
  constructor(props) {
    super(props);
	var accessToken = localStorage.getItem("token");
    this.state = {accessToken:accessToken,walletaddress:""};
	
  }	
  
  

  componentDidMount() {


        // setting header
         let headers={
            Authorization:"Bearer "+ this.state.accessToken,
        }; 

        axios.get(baseUrl + '/userdetail', {headers}).then((resp) => {
            //this.handleModal("close");
			var resp = resp.data;
			if(resp.success === true){
				this.setState({walletaddress:resp.data.wallet_address
							   });
	

            }
		});
  }
  
  
  render() {
	var accessToken = this.state.accessToken;
	
	if(accessToken==="" || accessToken===null){
		return(
				<Redirect to="/login" />
				);
	}
	
    return (
	<div>
	<Header />
      <div id="page-wrapper">
		<div className="row">
			<div className="col-lg-12">
				<h1 className="page-header">Receive</h1>
			</div>
			
		</div>
		
		<div className="row">
			<div className="col-lg-3 col-md-6">
				<div className="panel panel-primarys">
					<div className="panel-heading">
						<div className="row">
						   <div className="col-md-12">
						   <img src={"https://chart.googleapis.com/chart?chs=225x225&chld=L|1&cht=qr&chl=ethereum:"+this.state.walletaddress} />
						   </div>
							<div className="col-xs-9 text-right">
								<div className="showtxt">Wallet Address</div>
								<div className="showtxt">{this.state.walletaddress} </div>
							</div>
						</div>
					</div>
				   
				</div>
			</div>
	   
			<div className="col-lg-3 col-md-6">
			
			</div>
			<div className="col-lg-3 col-md-6">
				
			</div>
		</div>
	

	
	</div>
	</div>
    );
  }
}

export default Receive;
