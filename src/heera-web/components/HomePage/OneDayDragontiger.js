import React, { Component } from 'react';
import Nav from '../Include/Nav';
import Menu from '../Include/Menu';
import Footer from '../Include/footer';
import Sidebar from '../Include/Sidebar';
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import Moment from 'moment'; 
const $ = window.$;
const baseUrl = "http://83.136.253.64:4000";
class Dragontiger extends Component {

	constructor(props) {
		super(props);
		var accessToken = localStorage.getItem("token");
		this.state = { accessToken: accessToken };

	} 
	componentDidMount() { 
		let headers = {
			Authorization: "Bearer " + this.state.accessToken,
		}; 
		axios.get(baseUrl + '/api/current',{headers}).then((resp) => {  
				/* if(this.props.match.params.id==1 ){  
					this.callMattchListApi();
				}
				if(this.props.match.params.id==4 ){ 
					this.callMattchListApi(); 
				} 
				if(this.props.match.params.id==2){ 
					this.callMattchListApi(); 
				}
				if(this.props.match.params.id==7){ 
					this.callMattchListApi();
				}  */
		});  
	}
	
	


	render() {
		var accessToken = this.state.accessToken;

		if (accessToken === "" || accessToken === null) {
			return (
				<Redirect to="/login" />
			);
		} 
		return (
			<div>
				<Nav />
				<Menu />
				<div id="wrapper"> 
					<Sidebar />
					<div id="content-wrapper">
						<div className="container-fluid">  
							<div className="tab-content">
								<div id="home" className="container tab-pane active">
									<br />
									<div className="coupon-card coupon-card-first">
										<div className="card-content" id="home_match_data">
											<div className="row">
												<div className="col-md-6" style={{textAlign:'center'}}><img width="400" src={process.env.PUBLIC_URL+"/img/dragon_tiger.jpg"} /></div>
												
												
											</div>
										</div>
									</div>
								</div>
								
								
							</div>
							<div></div>
						</div>
					</div>

				</div><Footer/>
			</div>
		);
	}
}

export default Dragontiger;