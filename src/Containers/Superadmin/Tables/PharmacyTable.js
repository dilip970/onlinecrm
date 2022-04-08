import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';
import Navbar1 from '../Navbars/Navbar1';
import Navbar2 from '../Navbars/Navbar2';
import Globals from '../../../Utils/globals';
import CommonTableHeader from '../Headers/CommonHeader';

class PharmacyTable extends Component
{
    constructor(props) {
        super(props);
        this.state = {
          pharmacy : [],
          ubit_role_id:'',
          ubit_status:'',
          ubit_id:'',
          ubit_user_id :''

        };
    }
    componentDidMount()
    {

        return axios.post(Globals.APIURL+'/get-users-by-role-id/',{
            ubit_role_id:3
        }).then((pharmacyRes) => {
            let pharmacy = pharmacyRes.data.data.user_data_by_role;
            console.log(pharmacy);

            this.setState({
                pharmacy : pharmacy
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
        let list = this.state.pharmacy;
        if(this.state.pharmacy)
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
                        this.state.pharmacy.map((pharmacy,key) => {
                            return <tr className="gradeU">
                            <td>{++key}</td>
                            <td>{pharmacy.ubit_establishment_name}</td>
                            <td>{pharmacy.ubit_email}</td>
                            <td>{pharmacy.ubit_mobile_number}</td>
                            <td>{pharmacy.ubit_full_address}</td>
                            <td></td>
                            <td>
                                <select style={dropdownstyle} onChange={this.changestatus} name="status" class="form-control">
                                <option selected={pharmacy.ubit_status == 1 ? true : false} value={["1" , pharmacy.ubit_id]}>Active</option>
                                <option selected={pharmacy.ubit_status == 2 ? true : false} value={["2" , pharmacy.ubit_id]}>InActive</option>
                                </select>
                            </td>
                            <td><a href={`/superadmin/viewpharmacy/${pharmacy.ubit_id}`}><i class="material-icons dp48">perm_identity</i></a></td>

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
                <CommonTableHeader pageTitle="Pharmacy List"/>
            <div id="page-inner">
            <div className="row">
            <div className="col-md-12">
                <div className="card">
                <div className="card-action">
                    Pharmacy List
                </div>
                <div className="card-content">
                    <div className="table-responsive">
                    <table className="table table-striped table-bordered table-hover" id="dataTables-example">
                        <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Pharmacy Name</th>
                            
                            <th>Email</th>
                            <th>Phone</th>                            
                            <th>Address</th>
                            
                            <th>Profile Photo</th>
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
export default PharmacyTable;