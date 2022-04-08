import React, { Component } from 'react';
import axios from 'axios';
import Navbar1 from '../Navbars/Navbar1';
import Navbar2 from '../Navbars/Navbar2';
import Globals from '../../../Utils/globals';
import CommonTableHeader from '../Headers/CommonHeader';
class AddSpecialization extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            specialization: '',
            image : '',
            imagename : ''
        };
      }
      handleInputChange = e => {
        this.setState({
          [e.target.name]: e.target.value,
        });
      };
      convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file)
          fileReader.onload = () => {
            resolve(fileReader.result);
          }
          fileReader.onerror = (error) => {
            reject(error);
          }
        })
      }
      handleFileRead = async (event) => {
        const file = event.target.files[0]
        const base64 = await this.convertBase64(file)
        this.setState({
            image : base64,
            imagename : event.target.files[0].name
        });
      }
      handleSubmit = e => {
        e.preventDefault();
        const { specialization, image, imagename } = this.state;
        var formData = {
          specialization,
            image,
            imagename
        };
        return axios
          .post(Globals.APIURL+'/admin/addspecializations/', { ...formData },{
            headers: {
              Authorization: `Bearer ${localStorage.getItem('superadmintoken')}`,
            }
        })
          .then((res) => {
            if(res.data.status=="200"){
                alert("Specialization Added Successfully!!");
                window.location.href='/superadmin/addspecialization';
            }else{
                alert("Specialization Already Exists!!");
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
                <CommonTableHeader pageTitle="Add Specialization form" />
            <div id="page-inner">
            <div className="row">
            <div className="col-lg-12">
                <div className="card">
                <div className="card-action">
                    Add Specialization Form
                </div>
                <div className="card-content">
                    <form onSubmit={(e)=>this.handleSubmit(e)} className="col s12">
                    <div className="row">
                        <div className="input-field col s12">
                          <p>Enter Name:</p>
                        <input pattern="^[a-zA-z\s]+$" title="Input allows only Alphabets, Spaces.."  id="first_name" type="text" name="specialization" required onChange={this.handleInputChange}/>
                        </div>
                    
                        <div className="input-field col s12">
                        <input name="em_image" required accept="image/*" onChange={this.handleFileRead} required type="file"/>
                        </div>
                        
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
export default AddSpecialization;