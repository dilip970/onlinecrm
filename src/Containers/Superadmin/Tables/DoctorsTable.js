import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';
import Navbar1 from '../Navbars/Navbar1';
import Navbar2 from '../Navbars/Navbar2';
import Globals from '../../../Utils/globals';
import CommonTableHeader from '../Headers/CommonHeader';

class DoctorsTable extends Component
{
    constructor(props) {
        super(props);
        this.state = {
          doctors : [],
          ubit_role_id:'',
          ubit_status:'',
          ubit_id:'',
          ubit_user_id :''
        };
    }
    componentDidMount()
    {
        return axios.post(Globals.APIURL+'/get-users-by-role-id/',{
            ubit_role_id:2
        }).then((doctorsRes) => {
            let doctors = doctorsRes.data.data.user_data_by_role;
            this.setState({
                doctors : doctors
            });
            window.$('#dataTables-example').DataTable();
        });
    }
    
    changestatus = async(event) => {
        const data = event.target.value;
        const ubit_status = data.split(',')[0];
        const ubit_id = data.split(',')[1];

        if(window.confirm('Are you sure?')){
            return axios.patch(Globals.APIURL+'/change-user-status/', {
                ubit_status : ubit_status,
                ubit_user_id : ubit_id,
                ubit_id : localStorage.getItem("superadminid"),
                ubit_token : localStorage.getItem("superadmintoken")
                
            }).then((responseData) => {
                if(responseData.status=="200"){
                    alert("user status modified successfully");
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
        let list = this.state.doctors;
        if(this.state.doctors)
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
                        this.state.doctors.map((doctor,key) => {
                            return <tr className="gradeU">
                            <td>{++key}</td>
                            <td>{doctor.ubit_owner_name}</td>
                            <td>{doctor.ubit_mobile_number}</td>
                            <td>{doctor.ubit_email}</td>
                            <td>{doctor.rbcm_name}</td>
                            <td>{doctor.ubit_owner_file}</td>
                            <td>{doctor.ubit_full_address}</td>
                            <td>
                                <select style={dropdownstyle} onChange={this.changestatus} name="ubit_status" class="form-control">
                                <option selected={doctor.ubit_status == 1 ? true : false} value={["1" , doctor.ubit_id]}>Active</option>
                                <option selected={doctor.ubit_status == 2 ? true : false} value={["2" , doctor.ubit_id]}>InActive</option>
                                </select>
                            </td>
                            <td><a href={`/superadmin/viewdoctor/${doctor.ubit_id}`}><i class="material-icons dp48">perm_identity</i></a></td>
                        
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
            <CommonTableHeader pageTitle="Doctors List"/>
            <div id="page-inner">
            <div className="row">
            <div className="col-md-12">
                <div className="card">
                <div className="card-action">
                    Doctors List
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
                            <th>Specialization</th>
                            <th>Consultation Fee</th>
                            <th>Address</th>
                            <th>Status</th>
                            <th>View Profile</th>
                            
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
export default DoctorsTable;