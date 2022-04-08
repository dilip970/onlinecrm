import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';
import Navbar1 from '../Navbars/Navbar1';
import Navbar2 from '../Navbars/Navbar2';
import Globals from '../../../Utils/globals';
import CommonTableHeader from '../Headers/CommonHeader';
class LabTestTable extends Component
{
    constructor(props) {
        super(props);
        this.state = {
          categories : [],
          labtest:[],
          rbcm_role_id:'',
          dltm_category_id:'',
          dltm_status:'',
          rbcm_status :'',
       };
    }

    componentDidMount()
    {
        return axios
        .post(Globals.APIURL+'/get-role-based-categories',{
            rbcm_role_id: 4,
            rbcm_status :1
        }).then((res) => {  
            this.setState({
                categories : res.data.data.role_based_categories
            });

        })
        .catch(err => {
          console.error(err);
        });
    }

    handleInputChange = e =>{
        this.setState({
            [e.target.name] : e.target.value,
        });
    };

    handleSubmit = e=>{
        e.preventDefault();
        const {dltm_category_id,dltm_status} = this.state;
        var formData ={
            dltm_category_id,
            dltm_status,
          }
              return axios.post(Globals.APIURL+'/get-diagnostics-lab-tests-by-category-id', { ...formData })
              .then((labtestData) => {
                var labtest = labtestData.data.data.diagnostics_lab_tests;
                this.getBase64FromUrl(Globals.DIAGNOSTICSFILES+labtest.dltm_image).then((resD1) => {
                  this.setState({
                    dltm_image : resD1,
                    labtest : labtest
                  }); 
                })                 
          });
      };

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
      changestatus = async(event) => {
        const data = event.target.value;
        const dltm_status = data.split(',')[0];
        const dltm_id = data.split(',')[1];

        if(window.confirm('Are you sure?')){
            return axios.patch(Globals.APIURL+'/change-diagnostic-lab-test-status/', {
                dltm_status : dltm_status,
                dltm_id : dltm_id,
                ubit_id :localStorage.getItem("superadminid"),
                ubit_token: localStorage.getItem("superadmintoken")
            },

            ).then((responseData) => {
                if(responseData.status=="200"){
                    alert("Status updated Successfully...");
                    window.location.reload();
                }else{
                    alert("Something went Wrong...");
                }
            });
        }
    };

    render()
    {
        let style = {
            width : "80px",
            height : "80px",
        }
        let list = this.state.labtest;
        if(this.state.labtest)
        {
            list = (
                <tbody>
                    {
                        this.state.labtest.map((labtest,key) => {
                            return <tr className="gradeU">
                            <td>{++key}</td>
                            <td>{labtest.dltm_name}</td>
                            <td><img style={style} src={Globals.DIAGNOSTICSFILES+labtest.dltm_image} /></td>
                            <td>{labtest.dltm_price}</td>
                            <td>{labtest.ubit_establishment_name}</td>
                            <td><select  onChange={this.changestatus} name="status" class="form-control">
                                <option selected={labtest.dltm_status == 3 ? true : false} value={["3" , labtest.dltm_id]}>Admin Active</option>
                                <option selected={labtest.dltm_status == 4 ? true : false} value={["4" , labtest.dltm_id]}>Admin InActive</option>
                                <option disabled selected={labtest.dltm_status == 1 ? true : false} value={["1" , labtest.dltm_id]}>Diagnostics Active</option>
                                <option disabled selected={labtest.dltm_status == 2 ? true : false} value={["2" , labtest.dltm_id]}>Diagnostics InActive</option>
                                </select>
                            </td>
                            {/* <td><img style={style} src={Globals.RAWURL+products.category_image} /></td>
                            <td><a href={`/superadmin/editpharmacycategory/${products.id}`}><i class="material-icons dp48">mode_edit</i></a></td> */}
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
            <CommonTableHeader pageTitle="Lab Test List"/>
            <div id="page-inner">
            <div className="row">
            <div className="col-md-12">
                <div className="card">
                <div className="card-action">
                <form onSubmit={(e)=>this.handleSubmit(e)} className="col s12">
            <div className="col s6">
                <p>Category List:</p>
                <select className="form-control fm" name="dltm_category_id" 
                            onChange={this.handleInputChange} required>
                                <option value="0"> Select Category</option>
                                {
                                this.state.categories.map((categories,key) => {
                                    return <option value={categories.rbcm_id}>{categories.rbcm_name}</option>
                                })
                            }
                            </select>
                    </div>

                <div className="col s2">
                <p>Status:</p>
                <select className="form-control fm" name="dltm_status" 
                            onChange={this.handleInputChange} required>
                                <option value="0"> Select status</option>
                                <option value="3"> Admin Active</option>
                                <option value="4"> Admin InActive</option>
                                <option value="1"> Diagnostics Active</option>
                                <option value="2"> Diagnostics InActive</option>
                                      
                            </select>
                    </div>
                    <div className="col s2">
                        <br/><br/>
                    <button type="submit" className="btn btn-primary">submit</button>
                    </div>
                </form>
                </div>
                
                <div className="row">
                <div className="card-filter">
                    </div>
                </div>
                <div className="card-content">
                    <div className="table-responsive">
                    <table className="table table-striped table-bordered table-hover" id="dataTables-example">
                        <thead>
                        <tr>
                        <th>S.No</th>
                        <th>Test Name</th>
                        <th>Test Image</th>
                        <th>Test Price</th>                            
                        <th>Diagnostics Name</th>
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
export default LabTestTable;