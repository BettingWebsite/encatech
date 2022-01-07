import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import axios from "axios";
import { Button } from "react-bootstrap";
import { createTheme } from 'react-data-table-component';
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
				<div className="card-header3 w-100 px-2">
					<span>Change Password</span>
				</div>
				<form onSubmit={this.handleSubmit} className="px-3 mt-3">

					<div className="row"><div className="col-md-5"><div className="form-group"><label>New Password</label><input type="password" name="new_password" onChange={this.handleChange} value={this.state.new_password} id="new_password" className="form-control" placeholder="New Password" defaultValue /></div><div className="form-group"><label>Confirm Password</label><input type="password" name="confirm_password" onChange={this.handleChange} value={this.state.confirm_password} id="confirm_password" className="form-control" placeholder="Confirm Password" defaultValue /></div>
						<div className="form-group">
							<Button className="bg w-100 man_btn width-100" value="submit" type="submit" size="sm">Submit</Button>
						</div></div></div>
				</form>
				{this.emptyHtml()}
				{this.responseHtml()}

			</div >

		);
	}
}

export default MyBetList;
