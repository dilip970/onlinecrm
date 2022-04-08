import React, { Component } from 'react';
import axios from 'axios';
import Navbar1 from '../Navbars/Navbar1';
import Navbar2 from '../Navbars/Navbar2';
import DashboardHeader from '../Headers/DashboardHeader';
import DashboardCards from '../Cards/DashboardCards';
import Globals from '../../../Utils/globals';
class Dashboard extends Component
{
    constructor(props) {
        super(props);
        this.state = {
          totalempcount : '',
          activeempcount : '',
          inactiveempcount : '',
          admincount : ''
        };
    }
    componentDidMount(){
        return axios
        .get(Globals.APIURL+'/superadmin/dashboard/'+localStorage.getItem("superadminid") ,{
          header: {
              'Content-Type': 'application/json',
              'token' : localStorage.getItem("superadmintoken")
          }
    })
        .then((res) => {  
            this.setState({
              totalempcount : 10,
              activeempcount : 10,
              inactiveempcount : 10,
              admincount : 10
            });
        })
        .catch(err => {
          console.error(err);
        });
    }
    render()
    {
        return (
            <div id="wrapper">
                <Navbar1 email={localStorage.getItem("superadminemail")}/>
                <Navbar2/>
            <div id="page-wrapper">
                <DashboardHeader/>
            <div id="page-inner">
                <DashboardCards activeempcount={this.state.activeempcount} inactiveempcount={this.state.inactiveempcount} admincount={this.state.admincount} totalempcount={this.state.totalempcount}/>
            </div>
            </div>
            </div>
        );
    }
}
export default Dashboard;