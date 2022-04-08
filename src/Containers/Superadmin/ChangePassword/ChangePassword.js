import React, { Component } from 'react';
import axios from 'axios';
import Navbar1 from '../Navbars/Navbar1';
import Navbar2 from '../Navbars/Navbar2';
import Globals from '../../../Utils/globals';
import CommonTableHeader from '../Headers/CommonHeader';
class ChangePassword extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            ubit_old_password: '',
            ubit_new_password: '',
            ubit_confirmpassword : '',
            am_passwordChanged : '',
          message : '',
          ubit_id : localStorage.getItem('superadminid')
        };
    }
    handleInputChange = e => {
        this.setState({
          [e.target.name]: e.target.value,
        });
    };
    handleSubmit = e => {
        e.preventDefault();
        const { ubit_old_password, ubit_new_password, ubit_confirmpassword, ubit_id } = this.state;
        const passwords = {
          ubit_old_password,
          ubit_new_password,
          ubit_confirmpassword,
          ubit_id,
          ubit_token : localStorage.getItem("superadmintoken")
        };
        if(passwords.ubit_new_password!=passwords.ubit_confirmpassword)
        {
            alert("confirm Password should be same with New password!!");
            return false;
        }
        else if(passwords.ubit_new_password==passwords.ubit_old_password){
          alert("New Password do not match with old password!!");
          return false;
        };
        
    
        return axios
          .post(Globals.APIURL+'/change-password/', { ...passwords })
          .then((res) => {
              console.log(res);
            if(res.data.status=="200"){
              this.setState({
                am_passwordChanged : "1",
                message : 'Password Changed Successfully...'
              })
            }else{
                this.setState({
                    am_passwordChanged : "2",
                    message : 'Old password is incorrect...'
                })
            }
          })
          .catch(err => {
            console.error(err);
          });
      };
    render()
    {
        return (
            <div id="wrapper">
                <Navbar1 email={localStorage.getItem("superadminemail")}/>
                <Navbar2/>
            <div id="page-wrapper">
            <CommonTableHeader pageTitle="Change Password"/>
            <div id="page-inner">
            <div className="row">
            <div className="col-lg-12">
                <div className="card">
                <div className="card-action">
                    Change Password Form
                </div>
                {
                    (this.state.am_passwordChanged==2) ? <div class="alert alert-warning">
                    {this.state.message}
                    </div> 
                    : (this.state.am_passwordChanged==1) ? <div class="alert alert-success">
                    {this.state.message}
                    </div> 
                    : ''
                }
                <div className="card-content">
                    <form onSubmit={(e)=>this.handleSubmit(e)} className="col s12">
                    <div className="row">
                        <div className="input-field col s12">
                        <input id="first_name"type="password" name="ubit_old_password" minlength={8} title="Input allows minimum 8 characters" onChange={this.handleInputChange} className="validate" required/>
                        <label htmlFor="first_name">Old Password</label>
                        </div>
                        <div className="input-field col s12">
                        <input id="last_name" type="password" name="ubit_new_password" minlength={8} title="Input allows minimum 8 characters"  onChange={this.handleInputChange} className="validate" required/>
                        <label htmlFor="last_name">New Password</label>
                        </div>
                        <div className="input-field col s12">
                        <input id="last_name"type="password" name="ubit_confirmpassword" minlength={8} title="Input allows minimum 8 characters" onChange={this.handleInputChange} className="validate" required/>
                        <label htmlFor="last_name">Confirm Password</label>
                        </div>
                        <div className="input-field col s12">
                        <input id="submit" type="submit" className="validate" />
                        </div>
                    </div>
                    </form>
                    <div className="clearBoth" />
                </div>
                </div>
            </div>	
            </div>
            </div>
            </div>
            </div>
        );
    }
}
export default ChangePassword;