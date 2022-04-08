import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';
import Navbar1 from '../Navbars/Navbar1';
import Navbar2 from '../Navbars/Navbar2';
import SpecializationTableHeader from '../Headers/SpecializationTableHeader';
import EditSpecialization from '../Specializations/EditSpecialization';
import Globals from '../../../Utils/globals';
class SpecializationsTable extends Component
{
    constructor(props) {
        super(props);
        this.state = {
          specializations : [],
          edit : false,
          editspecialization : [],
          status : ''
        };
    }
    editSpecialization = (id) => {
        return axios.get(Globals.APIURL+'/admin/editspecializations/'+id+'/', {
            headers : {
                'Content-Type': 'application/json',
                Authorization : 'Bearer '+localStorage.getItem("superadmintoken")
            }
        }).then((responseData) => {
            let ResData = responseData;
            this.setState({
                edit : true,
                editspecialization : ResData
            });
        });
    };
    changestatus = async(event) => {
        const data = event.target.value;
        const status = data.split(',')[0];
        const id = data.split(',')[1];
        if(window.confirm('Are you sure?')){
            return axios.post(Globals.APIURL+'/admin/specializationsstatus/'+id+'/', {
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
    componentDidMount()
    {
        return axios
        .get(Globals.APIURL+'/admin/addspecializations/',{
            headers: {
              'Content-Type': 'application/json',
              Authorization : 'Bearer '+localStorage.getItem("superadmintoken")
          }
        })
        .then((res) => {  
            this.setState({
                specializations : res.data.data.specialization_data[0]
            });
            window.$('#dataTables-example').DataTable();
        })
        .catch(err => {
          console.error(err);
        });
    }
    render()
    {
        if(this.state.edit==true){
            return (<EditSpecialization sdata={this.state.editspecialization}/>);
        }else{
            let list = this.state.specializations;
        if(this.state.specializations)
        {
            let style = {
                width : "100px",
                heigth : "100px"
            }
            list = (
                <tbody>
                    {
                        this.state.specializations.map((specialization,key) => {
                            return <tr className="gradeU">
                            <td>{++key}</td>
                            <td>{specialization.specialization}</td>
                            <td><img style={style} src={Globals.RAWURL+specialization.image} /></td>
                            <td><a href={`/superadmin/editspecialization/${specialization.id}`}><i class="material-icons dp48">mode_edit</i></a></td>
                            <td><select onChange={this.changestatus} name="status" class="form-control">
                                <option selected={specialization.status == 1 ? true : false} value={["1" , specialization.id]}>Active</option>
                                <option selected={specialization.status == 0 ? true : false} value={["0" , specialization.id]}>InActive</option>
                                </select></td>
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
                <SpecializationTableHeader/>
            <div id="page-inner">
            <div className="row">
            <div className="col-md-12">
                <div className="card">
                <div className="card-action">
                    Specializations List
                </div>
                <div className="card-content">
                    <div className="table-responsive">
                    <table className="table table-striped table-bordered table-hover" id="dataTables-example">
                        <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Edit</th>
                            <th>Status</th>
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
}
export default SpecializationsTable;