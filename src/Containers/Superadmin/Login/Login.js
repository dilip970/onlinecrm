import React, { Component } from 'react';
import axios from 'axios';
import logo from '../../../Images/usericon.png';
import './Login.css';
import Globals from '../../../Utils/globals';
class Login extends Component
{
  constructor(props) 
  {
    super(props);
    this.state = {
      ubit_email: '',
      ubit_password: '',
      isLoggedIn : '',
      superadminid : ''
    };
  }
  handleInputChange = e => 
  {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { ubit_email, ubit_password } = this.state;
    const loginCredentials = {
      ubit_email,
      ubit_password
    };
    return axios
      .post(Globals.APIURL+'/login/', { ...loginCredentials },{
        header: {
            'Content-Type': 'application/json'
        }
    })
      .then((res) => {
        if(res.data.status===200){
          localStorage.clear();
          localStorage.setItem('superadminid',res.data.data.user_data[0].ubit_id);
          localStorage.setItem('superadminemail',res.data.data.user_data[0].ubit_email);
          localStorage.setItem('superadmintoken',res.data.data.user_data[0].ubit_token);
          this.setState({
            isLoggedIn : "Logged In",
            ubit_email : res.data.data.user_data[0].user,
            superadminid : res.data.data.user_data[0].ubit_id
          })
        }else{
          alert("Login Failed!! Please check username and password and try again.");
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
    render()
    {
      if(localStorage.getItem('superadminid')==this.state.superadminid)
      {
        window.location.href = '/superadmin/dashboard/'+this.state.superadminid;
      }
      else
      {
        return (
          <div className="container">
          <div className="row">
            <div className="col-sm-6 col-md-4 col-md-offset-4 admin_login">
              <h1 className="text-center login-title">SUPER ADMIN LOGIN</h1>
              <div className="account-wall">
                <img className="profile-img" src={logo} alt="" />
                <form onSubmit={(e)=>this.handleSubmit(e)} className="form-signin">
                  <input name="ubit_email" onChange={this.handleInputChange} type="text" className="form-control" placeholder="Email" required autofocus /><br></br>
                  <input name="ubit_password" onChange={this.handleInputChange} type="password" className="form-control" placeholder="Password" required />
                  <button style={{fontSize : '10px'}} className="btn btn-lg btn-primary btn-block" type="submit">
                    Login</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
      }
    }
}
export default Login;