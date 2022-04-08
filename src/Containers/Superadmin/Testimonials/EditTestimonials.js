import React, { Component } from 'react';
import axios from 'axios';
import Navbar1 from '../Navbars/Navbar1';
import Navbar2 from '../Navbars/Navbar2';
import Globals from '../../../Utils/globals';
import CommonTableHeader from '../Headers/CommonHeader';

class EditTestimonials extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            t_id : '',
            t_name :'',
            t_designation :'',
            t_description :'',            
            
        };
      }
    componentDidMount() {
        window.scrollTo(0, 0);
        return axios
          .get(Globals.APIURL+'/get-testimonial-by-id/'+this.props.match.params.t_id,{
            ubit_id : localStorage.getItem("superadminid"),
            ubit_token : localStorage.getItem("superadmintoken")
        })
          .then((res) => {
            var testimonial = res.data.data.testimonial_id_data[0]
            
          this.setState({
            t_id : testimonial.t_id,
            t_name : testimonial.t_name,
            t_designation : testimonial.t_designation,
            t_description: testimonial.t_description
        })
          })
    }
    handleInputChange = e => {
        this.setState({
          [e.target.name]: e.target.value,
        });
      };


      handleSubmit = e => {
        e.preventDefault();
        const {t_id, t_name,t_designation,t_description} = this.state;
        var formData = {
            t_id,
            t_name,
            t_designation,
            t_description,
            ubit_id : localStorage.getItem("superadminid"),
            ubit_token : localStorage.getItem("superadmintoken")
  
        };
        console.log(formData);
        return axios
          .patch(Globals.APIURL+'/update-testimonial-by-id',{ ...formData },
          )
          .then((res) => {
            if(res.data.status=="200"){
                alert("Testimonials Updated Successfully!!");
                // window.location.href='/superadmin/testimonials-list';
            }else{
                alert("Testimonials Already Exists!!");
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
              <CommonTableHeader pageTitle="Edit Testimonials"/>
              <div id="page-inner">
              <div className="row">
              <div className="col-lg-12">
                  <div className="card">
                  <div className="card-action">
                      Edit Testimonials Form
                  </div>
                  <div className="card-content">
                      <form onSubmit={(e)=>this.handleSubmit(e)} className="col s12">
                      <div className="row" style={{marginBottom :"0px"}}>
                          <div className="input-field col s6">
                            <p> Name:</p>
                          <input type="text" id="t_name" name="t_name" value={this.state.t_name}
                          onChange={this.handleInputChange} required />
                          </div>
                      
                          <div className="input-field col s6">
                            <p>Designation:</p>
                            <input type="text" id="t_designation" name="t_designation" value={this.state.t_designation} onChange={this.handleInputChange} required />
                          </div>
                      </div>
  
                      <div className="row">
  
                      <div className=" col s6">
                            <p>Description:</p>
                     <input className="form-control" type="text" id="t_description"
                     
                    value={this.state.t_description} name="t_description" onChange={this.handleInputChange} required />
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
export default EditTestimonials;