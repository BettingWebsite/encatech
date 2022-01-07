import React, { Component } from 'react';
import Nav from '../Include/Nav';
import Menu from '../Include/Menu';
import Sidebar from '../Include/Sidebar';
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import Moment from 'moment';
import DataTable, { createTheme } from 'react-data-table-component';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const $ = window.$;
const baseUrl = "http://api.encabook999.com:4000";



createTheme('solarized', {
	text: {
		primary: '#268bd2',
		secondary: '#2aa198',
	},
	background: {
		default: '#002b36',
	},
	context: {
		background: '#cb4b16',
		text: '#FFFFFF',
	},
	divider: {
		default: '#073642',
	},
	action: {
		button: 'rgba(0,0,0,.54)',
		hover: 'rgba(0,0,0,.08)',
		disabled: 'rgba(0,0,0,.12)',
	},
});



class MyBetList extends Component {

	constructor(props) {
		super(props);
		var accessToken = localStorage.getItem("token");
		this.state = {
			accessToken: accessToken,
			betDataFound: false,
			gotoindex: false,
			getResults11: "",
			new_password: "",
			respStatus2: "",
			confirm_password: "",
			errMsg: ""
		};

	}



	emptyHtml = () => {

		if (this.state.emptyField === true) {
			return (
				<div className="alert alert-danger">
					{this.state.errMsg}
				</div>
			)
		}
	}


	handleChange = (event) => {
		let { name, value } = event.target;

		this.setState({ [name]: value, emptyField: false, errMsg: "" });
	}
	responseHtml = () => {
		if (this.state.respStatus === false) {
			return (
				<div className="alert alert-danger">
					{this.state.respMessage}
				</div>
			)
		}
		else if (this.state.respStatus === true) {
			return (
				<div className="alert alert-success">
					{this.state.respMessage}
				</div>
			)
		}
	}

	//this.deleteBet(e.target.value)

	handleSubmit = (event) => {
		event.preventDefault();
		console.log("@@@@", this.state.new_password.match(letters))

		var letters = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
		if (this.state.new_password === "") {
			this.setState({ emptyField: true, errMsg: "Passowrd Is required" });
			return false;
		}
		if (this.state.confirm_password === "") {
			this.setState({ emptyField: true, errMsg: "Confirm Passowrd Is required" });
			return false;
		}

		if (this.state.confirm_password !== this.state.new_password) {
			this.setState({ emptyField: true, errMsg: "Password and Confirm Passowrd Should be Same" });
			return false;
		}
		if (!this.state.confirm_password.match(letters)) {
			this.setState({ emptyField: true, errMsg: "Please enter alphanumeric characters only" });
			return false;
		}

		let registerData = {
			new_password: this.state.new_password,
			confirm_password: this.state.confirm_password,

		};

		let headers = {
			Authorization: "Bearer " + this.state.accessToken,
		};
		axios.post(baseUrl + '/api/change_password_user', registerData, { headers }).then((resp) => {
			var resp = resp.data;
			if (resp.success === true) {
				this.setState({
					respStatus2: resp.success,
					respMessage: resp.message,
					new_password: "",
					confirm_password: "",
				});

			} else {
				this.setState({ respStatus: resp.success, respMessage: resp.message });

			}

		});
	}


	render() {
		var accessToken = this.state.accessToken;


		if (accessToken === "" || accessToken === null) {
			return (
				<Redirect to="/login" />
			);
		}

		if (this.state.respStatus2 != "") {
			return (
				<Redirect to="/login" />
			);
		}
		return (
			<div>


				<Menu />
				<div id="content-wrapper" className="container-fluid"><div className="man_bglight"><h3 className="a_manh hadding_p">Change Password</h3><div className="man_box">
					<form onSubmit={this.handleSubmit}>

						<div className="row"><div className="col-md-5"><div className="form-group"><label>New Password</label><input type="password" name="new_password" onChange={this.handleChange} value={this.state.new_password} id="new_password" className="form-control" placeholder="New Password" defaultValue /></div><div className="form-group"><label>Confirm Password</label><input type="password" name="confirm_password" onChange={this.handleChange} value={this.state.confirm_password} id="confirm_password" className="form-control" placeholder="Confirm Password" defaultValue /></div><div className="form-group"><button className="btn btn-primary" value="submit" type="submit">Submit</button></div></div></div>
					</form>
					{this.emptyHtml()}
					{this.responseHtml()}
				</div></div></div>
			</div>

		);
	}
}

export default MyBetList;
