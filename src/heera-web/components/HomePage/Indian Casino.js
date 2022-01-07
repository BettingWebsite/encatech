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
class Teenpatti extends Component {

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
		});  
	}
	
	


	render() {
		const { url }=this.props;
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
				<Menu />

				<div id="wrapper">
					<Sidebar />

			<iframe width={800} height={600} src={url}/>

				</div>
			</div>
			);
	}
}

export default Teenpatti;