import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';
import Navbar1 from '../Navbars/Navbar1';
import Navbar2 from '../Navbars/Navbar2';
import CommonTableHeader from '../Headers/CommonHeader';
import Globals from '../../../Utils/globals';

class DiagnosticsTable extends Component
{
    constructor(props) {
        super(props);
        this.state = {
          diagnostics : [],
          ubit_role_id:'',
          ubit_status:'',
          ubit_id:'',
          ubit_user_id :''
        };
    }
    componentDidMount()
    {
        return axios.post(Globals.APIURL+'/get-users-by-role-id/',{
            ubit_role_id:4
        }).then((diagnosticsRes) => {
            let diagnostics = diagnosticsRes.data.data.user_data_by_role;
            this.setState({
                diagnostics : diagnostics
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
        let list = this.state.diagnostics;
        if(this.state.diagnostics)
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
                        this.state.diagnostics.map((diagnostics,key) => {
                            return <tr className="gradeU">
                            <td>{++key}</td>
                            <td>{diagnostics.ubit_owner_name}</td>
                            <td>{diagnostics.ubit_email}</td>
                            <td>{diagnostics.ubit_mobile_number}</td>
                            <td>{diagnostics.ubit_full_address}</td>
                            <td></td>
                            <td>
                                <select style={dropdownstyle} onChange={this.changestatus} name="status" class="form-control">
                                <option selected={diagnostics.ubit_status == 1 ? true : false} value={["1" , diagnostics.ubit_id]}>Active</option>
                                <option selected={diagnostics.ubit_status == 2 ? true : false} value={["2" , diagnostics.ubit_id]}>InActive</option>
                                </select>
                            </td>
                            <td><a href={`/superadmin/viewdiagnostics/${diagnostics.ubit_id}`}><i class="material-icons dp48">perm_identity</i></a></td>
                            
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
                <CommonTableHeader pageTitle="Diagnostics List"/>
            <div id="page-inner">
            <div className="row">
            <div className="col-md-12">
                <div className="card">
                <div className="card-action">
                    Diagnostics List
                </div>
                <div className="card-content">
                    <div className="table-responsive">
                    <table className="table table-striped table-bordered table-hover" id="dataTables-example">
                        <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Diagnostics Name</th>
                            
                            <th>Email</th>
                            <th>Phone</th>                            
                            <th>Address</th>
                            
                            <th>Profile Photo</th>
                            <th>Status</th>
                            <th>View Tests</th>
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
export default DiagnosticsTable;