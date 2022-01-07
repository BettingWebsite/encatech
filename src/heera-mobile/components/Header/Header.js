import React, { Component } from 'react';
import {Link} from "react-router-dom";
import './Header.css';

class Header extends Component {
  render() {
    return ( 
       <nav className="navbar navbar-default navbar-static-top" role="navigation"  >
            <div className="navbar-default sidebar" role="navigation">
				<div className="sidebar-nav navbar-collapse">
				<img src="/img/logo2.png" width="100px" height="100px"/>
					<ul className="nav" id="side-menu">
						<li><Link to="/"><i className="fa fa-refresh fa-fw"></i>  Refresh Balance</Link></li>
						<li><Link to="/send"><i className="fa fa-share fa-fw"></i> Sendfdsafsaf</Link></li>
						<li><Link to="/receive"><i className="fa fa-download fa-fw"></i>  Receive</Link></li>
						<li><Link to="/transactions"><i className="fa fa-user fa-fw"></i>  Transactions</Link></li>
						<li><Link to="/profile"><i className="fa fa-user fa-fw"></i>  Profile</Link></li>
						<li><Link to="" ><i className="fa fa-sign-out fa-fw"></i>  Logout</Link></li> 
					</ul>
				</div>
				
			</div>
		  
		</nav>
				
    );
  }
}

export default Header;
