import React, { Component } from 'react';
import axios from 'axios';
import Navbar1 from '../Navbars/Navbar1';
import Navbar2 from '../Navbars/Navbar2';
import Globals from '../../../Utils/globals';
import CommonTableHeader from '../Headers/CommonHeader';

class AddRoleBasedCategory extends Component
{
  constructor(props){
    super(props);
    this.state = {
        roles : [],
        rbcm_role_id :'',
        rbcm_name :'',
    }
  }
  componentDidMount()
  {
        return axios.get(Globals.APIURL+'/roles').then((rolesRes) => {
            let roles = rolesRes.data.data.roles_data;
            this.setState({
                roles : roles
            });
        });
  }
  handleInputChange = e =>{
      this.setState({
          [e.target.name] : e.target.value
      })
  }
  handleSubmit = e=>{
      e.preventDefault();
      
      const {rbcm_role_id,rbcm_name} = this.state;
      var formData ={
          rbcm_name,
          rbcm_role_id,
          ubit_id : localStorage.getItem("superadminid"),
          ubit_token : localStorage.getItem("superadmintoken")
        }
            return axios.post(Globals.APIURL+'/save-role-based-category', { ...formData })
            .then((res) => {
                console.log(res)
              if(res.data.status=="200"){
                  alert("category name added successfully.....");
                  window.location.reload();
              }
              else{
                alert("something went wrong...")
              }
            })
            .catch(err => {
              console.error(err);
              alert(err);
    
            });
    };

      
    render()
    {
        return (
            <div id="wrapper">
                <Navbar1 email={localStorage.getItem("superadminemail")}/>
                <Navbar2/>
            <div id="page-wrapper">
            <CommonTableHeader pageTitle="Add Category Role Wise"/>
            <div id="page-inner">
            <div className="row">
            <div className="col-lg-12">
                <div className="card">
                <div className="card-action">
                    Add Category Form
                </div>
                <div className="card-content">
                    <form onSubmit={(e)=>this.handleSubmit(e)} className="col s12">
                    <div className="row" style={{marginBottom :"0px"}}>
                        <div className="input-field col s6">
                          <p>Category Name:</p>
                        <input type="text" id="rbcm_name" name="rbcm_name" 
                        onChange={this.handleInputChange} required />
                        </div>
                    
                        <div className="col s6">
                          <p>Role:</p>
                            <select className="form-control fm" name="rbcm_role_id" 
                            onChange={this.handleInputChange} required>
                                <option value="">Roles</option>
                                {
                                this.state.roles.map((r,key) => {
                                    return <option value={r.r_id}>{r.r_name}</option>
                                })
                            }
                            </select>
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-field col s6">
                        <p>Category Image:</p>
                        <input  type="file" name="document" accept="image/*" />
                        </div>
                        <br /><br />

                        </div>
                        <div className="row">

                    <div className="input-field col s12">
                        <input id="submit" type="submit" />
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
export default AddRoleBasedCategory;