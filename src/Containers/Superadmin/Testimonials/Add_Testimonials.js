import React, { Component } from 'react';
import axios from 'axios';
import Navbar1 from '../Navbars/Navbar1';
import Navbar2 from '../Navbars/Navbar2';
import Globals from '../../../Utils/globals';
import CommonTableHeader from '../Headers/CommonHeader';

class AddTestimonials extends Component
{
  constructor(props){
    super(props);
    this.state = {
        ubit_id:'',
        ubit_token :'',
        ubit_role_id :'',
        t_name :'',
        t_designation :'',
        t_description :'',
    }
  }
  componentDidMount() {
    window.scrollTo(0, 0);
}
  handleInputChange = e =>{
      this.setState({
          [e.target.name] : e.target.value
      })
  }
  handleSubmit = e=>{
      e.preventDefault();
      
      const {ubit_role_id,t_name,t_designation,t_description} = this.state;
      var formData ={
        ubit_role_id :'1',
        t_name,
        t_designation,
        t_description,   
        ubit_id : localStorage.getItem("superadminid"),
        ubit_token : localStorage.getItem("superadmintoken")
        }
            return axios.post(Globals.APIURL+'/save-testimonial', { ...formData })
            .then((res) => {
                console.log(res)
              if(res.data.status=="200"){
                  alert("testimonial added successfully");
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
            <CommonTableHeader pageTitle="Add Testimonials"/>
            <div id="page-inner">
            <div className="row">
            <div className="col-lg-12">
                <div className="card">
                <div className="card-action">
                    Add Testimonials Form
                </div>
                <div className="card-content">
                    <form onSubmit={(e)=>this.handleSubmit(e)} className="col s12">
                    <div className="row" style={{marginBottom :"0px"}}>
                        <div className="input-field col s6">
                          <p> Name:</p>
                        <input type="text" id="t_name" name="t_name" 
                        onChange={this.handleInputChange} required />
                        </div>
                    
                        <div className="input-field col s6">
                          <p>Designation:</p>
                          <input type="text" id="t_designation" name="t_designation" 
                        onChange={this.handleInputChange} required />
                        </div>
                    </div>

                    <div className="row">

                    <div className=" col s6">
                          <p>Description:</p>
                          <input className="form-control" type="text" id="t_description" name="t_description" onChange={this.handleInputChange} required />
                        </div>

                        <div className="input-field col s6">
                        <p>Image:</p>
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
export default AddTestimonials;