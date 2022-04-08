import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';
import Navbar1 from '../Navbars/Navbar1';
import Navbar2 from '../Navbars/Navbar2';
import Globals from '../../../Utils/globals';
import CommonTableHeader from '../Headers/CommonHeader';

class PatientTable extends Component
{
    constructor(props) {
        super(props);
        this.state = {
          patient : []
        };
    }
    componentDidMount()
    {

        return axios.post(Globals.APIURL+'/get-users-by-role-id/',{
            ubit_role_id:5
        }).then((patientRes) => {
            let patient = patientRes.data.data.user_data_by_role;
            this.setState({
                patient : patient
            });
            window.$('#dataTables-example').DataTable();
        });
    }
    
    changestatus = async(event) => {
        const data = event.target.value;
        const status = data.split(',')[0];
        const id = data.split(',')[1];
        if(window.confirm('Are you sure?')){
            return axios.post(Globals.APIURL+'/admin/patienttatus/'+id+'/', {
                status : status
            },{
                headers : {
                    'Content-Type': 'application/json',
                    Authorization : 'Bearer '+localStorage.getItem("superadmintoken")
                }
            }).then((responseData) => {
                if(responseData.status=="200"){
                    alert("Status updated Successfully...");
                    window.location.reload();
                }else{
                    alert("Something went Wrong...");
                }
            });
        }else{
            window.location.reload();
        }
    };
    render()
    {
        let list = this.state.patient;
        if(this.state.patient)
        {
            let style = {
                width : "100px",
                heigth : "100px"
            }
            let dropdownstyle = {
                width : '100px'
            }
            list = (
                <tbody>
                    {
                        this.state.patient.map((patient,key) => {
                            return <tr className="gradeU">
                            <td>{++key}</td>
                            <td>{patient.ubit_owner_name}</td>
                            <td>{patient.ubit_email}</td>
                            <td>{patient.ubit_mobile_number}</td>
                            <td>{patient.ubit_district_id}</td>
                            <td></td>
                            <td></td>
                            
                            {/* <td><img style={style} src={Globals.RAWURL+patient.profile_picture} /></td>
                            <td><a href={`/superadmin/editpatient/${patient.id}`}><i class="material-icons dp48">mode_edit</i></a></td>
                            <td><a href={`/superadmin/viewpatient/${patient.id}`}><i class="material-icons dp48">perm_identity</i></a></td>
                            <td><select style={dropdownstyle} onChange={this.changestatus} name="status" class="form-control">
                                <option selected={patient.status == 1 ? true : false} value={["1" , patient.id]}>Active</option>
                                <option selected={patient.status == 0 ? true : false} value={["0" , patient.id]}>InActive</option>
                                </select></td> */}
                            </tr>
                        })
                    }
                </tbody>
            );
        }
        return (
            <div id="wrapper">
                <Navbar1 email={localStorage.getItem("superadminemail")}/>
                <Navbar2/>
            <div id="page-wrapper">
            <CommonTableHeader pageTitle="Patient List"/>
            <div id="page-inner">
            <div className="row">
            <div className="col-md-12">
                <div className="card">
                <div className="card-action">
                    Patient List
                </div>
                <div className="card-content">
                    <div className="table-responsive">
                    <table className="table table-striped table-bordered table-hover" id="dataTables-example">
                        <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Profile Photo</th>
                            <th>City</th>
                              <th>Options</th>  
                        </tr>
                        </thead>
                        {list}
                    </table>
                    </div>
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
export default PatientTable;