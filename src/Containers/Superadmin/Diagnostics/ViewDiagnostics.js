import React, { Component } from 'react';
import axios from 'axios';
import Navbar1 from '../Navbars/Navbar1';
import Navbar2 from '../Navbars/Navbar2';
import Globals from '../../../Utils/globals';
import CommonTableHeader from '../Headers/CommonHeader';

class ViewDiagnostics extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            ubit_id: "",
            ubit_category_id: "",
            ubit_status: "",
            ubit_country_id: "",
            ubit_state_id: "",
            ubit_district_id: "",
            ubit_owner_name: "",
            ubit_owner_file: "",
            ubit_establishment_name: "",
            ubit_license_file: "",
            ubit_full_address: "",
            ubit_email: "",
            ubit_mobile_number: "",
            ubit_description: "",
            ubit_experience_in_years: "",
            ubit_consultation_fee: "",
            rbcm_name: ""
        };
      }
      componentDidMount()
      {
          return axios.post(Globals.APIURL+'/get-user-profile-by-user-id',{
            ubit_id : this.props.match.params.ubit_id
          }).then((diagnosticsRes) => {
            let diagnostics = diagnosticsRes.data.data.user_profile_data[0];
            this.getBase64FromUrl(Globals.USERFILES+diagnostics.ubit_owner_file).then((resD1) => {
              this.getBase64FromUrl(Globals.USERFILES+diagnostics.ubit_license_file).then((resD2) => {

            this.setState({
              ubit_owner_file         :   resD1,
              ubit_license_file       :   resD2,
              ubit_owner_name         :   diagnostics.ubit_owner_name,
              ubit_email              :   diagnostics.ubit_email,
              ubit_mobile_number      :   diagnostics.ubit_mobile_number,
              ubit_status             :   diagnostics.ubit_status,
              ubit_country_id         :   diagnostics.ubit_country_id,
              ubit_state_id           :   diagnostics.ubit_state_id,
              ubit_district_id        :   diagnostics.ubit_district_id,
              ubit_establishment_name :   diagnostics.ubit_establishment_name,
              ubit_full_address       :   diagnostics.ubit_full_address,
              ubit_description        :   diagnostics.ubit_description,
              ubit_experience_in_years:   diagnostics.ubit_experience_in_years,
              ubit_consultation_fee   :   diagnostics.ubit_consultation_fee
            });
            });  
          })
          });
      }
      getBase64FromUrl = async (url) => {
        const data = await fetch(url);
        const blob = await data.blob();
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(blob); 
          reader.onloadend = () => {
            const base64data = reader.result;   
            resolve(base64data);
          }
        });
      }
    render()
    {
        let style = {
            width : "100px",
            height : "100px",
        }
        return (
            <div id="wrapper">
                <Navbar1 email={localStorage.getItem("superadminemail")}/>
                <Navbar2/>
            <div id="page-wrapper">
                <CommonTableHeader pageTitle="View Diagnostics"/>
            <div id="page-inner">
            <div className="row">
            <div className="col-lg-12">
                <div className="card">
                <div className="card-action">
                    View Diagnostics
                </div>
                <div className="card-content">
                    <div className="row">
                        <div className="input-field col s6">
                          <p>Owner Name:</p>
                        <b>{this.state.ubit_owner_name}</b>
                        </div>
                        
                        <div className="input-field col s6">
                          <p>Diagnostics Name:</p>
                        <b>{this.state.ubit_establishment_name}</b>
                        </div>

                        <div className="input-field col s6">
                          <p> Mobile:</p>
                        <b>{this.state.ubit_mobile_number}</b>
                        </div>

                        <div className="input-field col s6">
                          <p> Email:</p>
                        <b>{this.state.ubit_email} </b>
                        </div>

                        <div className="input-field col s6">
                        <p>Address:</p>
                        <b>{this.state.ubit_full_address}</b>
                        </div>

                        <div className="col s6">
                          <p>city:</p>
                            <b>{this.state.ubit_district_id}</b>
                        </div><br /><br />

                        <div className="col s6">
                          <p>State:</p>
                            <b>{this.state.ubit_state_id}</b>
                        </div><br /><br />

                        <div className="col s6">
                          <p>Country:</p>
                            <b>{this.state.ubit_country_id}</b>
                        </div><br /><br />                        
                    
                        <div className="input-field col s6">
                        <p>Profile Photo:</p>
                        <img style={style} src={this.state.ubit_owner_file} />
                        </div>                        

                        <div className="input-field col s6">
                        <p>License Photo:</p>
                        <img style={style} src={this.state.ubit_license_file} />
                        </div>

                        <div className="input-field col s6">
                        <p>Description:</p>
                        <b>{this.state.ubit_description}</b>
                        </div>                        
                    </div>
                  
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
export default ViewDiagnostics;