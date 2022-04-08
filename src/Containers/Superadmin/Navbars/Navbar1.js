import React, { Component } from 'react';
import Globals from '../../../Utils/globals';
class Navbar1 extends Component
{
    render()
    {
        return (
            <div>
                <nav className="navbar navbar-default top-navbar" role="navigation">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle waves-effect waves-dark" data-toggle="collapse" data-target=".sidebar-collapse">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar" />
                    <span className="icon-bar" />
                    <span className="icon-bar" />
                    </button>
                    <a className="navbar-brand waves-effect waves-dark" href={'/superadmin/dashboard/' + localStorage.getItem("superadminid")}><i className="large material-icons">account_box</i> <strong>ADMIN</strong></a>
                    <div id="sideNav" href><i className="material-icons dp48">toc</i></div>
                </div>
                <ul className="nav navbar-top-links navbar-right"> 
                    <li><a className="dropdown-button waves-effect waves-dark" href="#!" data-activates="dropdown1"><i className="fa fa-user fa-fw" /> <b>{this.props.email}</b> <i className="material-icons right">arrow_drop_down</i></a></li>
                </ul>
                </nav>
                <ul id="dropdown1" className="dropdown-content">
                <li><a href="/superadmin/change-password"><i className="fa fa-gear fa-fw" /> Change Password</a>
                </li> 
                <li><a onClick={(e) => Globals.superadminlogout(e)} href="#"><i className="fa fa-sign-out fa-fw" /> Logout</a>
                </li>
                </ul>
            </div>
        );
    }
}
export default Navbar1;