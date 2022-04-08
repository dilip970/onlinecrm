import React, { Component } from 'react';
import axios from 'axios';
import Navbar1 from '../Navbars/Navbar1';
import Navbar2 from '../Navbars/Navbar2';
import Globals from '../../../Utils/globals';
import CommonTableHeader from '../Headers/CommonHeader';

class CategoryListRoleBased extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            roles : [],
            rbcm_role_id :'',
            rbcm_name :'',
            rbcm_status:'',
            rbcm_id :'',
            categories:[],
        };
    }

    componentDidMount()
    {
        return axios
        .get(Globals.APIURL+'/roles').then((rolesRes) => {  
            let roles = rolesRes.data.data.roles_data;
            this.setState({
                roles : roles,
            });
        })        
        .catch(err => {
          console.error(err);
        });
    }

    handleInputChange = e => {
        this.setState({
          [e.target.name]: e.target.value,
        });
      };

    handleSubmit = e=>{
        e.preventDefault();
        const {rbcm_role_id,rbcm_status} = this.state;
        var formData ={
            rbcm_status,
            rbcm_role_id,
          }
              return axios.post(Globals.APIURL+'/get-role-based-categories', { ...formData })
              .then((categoriesData) => {
                var categories = categoriesData.data.data.role_based_categories;
                  this.setState({
                      categories : categories
                  });
          });
      };

      changestatus = async(event) => {
        const data = event.target.value;
        const rbcm_status = data.split(',')[0];
        const rbcm_id = data.split(',')[1];

        if(window.confirm('Are you sure?')){
            return axios.patch(Globals.APIURL+'/change-role-based-category-status/'+rbcm_id, {
                rbcm_status : rbcm_status,
                rbcm_id : rbcm_id,
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
    // changeRoles = async(event) => {
    //     const rbcm_role_id = event.target.value;
    //      this.setState({
    //         rbcm_role_id : rbcm_role_id
    //      });
    //         return axios.post(Globals.APIURL+'/get-role-based-categories',{
    //             rbcm_role_id : rbcm_role_id,
    //             ubit_id : localStorage.getItem("superadminid"),
    //             ubit_token : localStorage.getItem("superadmintoken"),
    //         }).then((categoriesData) => {
    //               var categories = categoriesData.data.data.role_based_categories;
    //                 this.setState({
    //                     categories : categories
    //                 });
    //         });
    // };

    render()
    {
        let list = this.state.categories;
        if(this.state.categories)
        {
        list = (
            <tbody>
                {
                    this.state.categories.map((categories,key) => {
                        return <tr className="gradeU">
                        <td>{++key}</td>
                        <td>{categories.rbcm_name}</td>
                        <td></td>
                        <td><a href={`/superadmin/editcategory/${categories.rbcm_id}`}><i class="material-icons dp48">mode_edit</i></a></td>
                        <td>
                        <select onChange={this.changestatus} name="rbcm_status" class="form-control">
                           <option selected={categories.rbcm_status == 1 ? true : false} value={["1" , categories.rbcm_id]}>Active</option>
                            <option selected={categories.rbcm_status == 2 ? true : false} value={["2" , categories.rbcm_id]}>InActive</option>
                         </select>
                        </td>
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
            <CommonTableHeader pageTitle="Category List"/>
            <div id="page-inner">
            <div className="row">
            <div className="col-md-12">
                <div className="card">
                <div className="card-action">
                <form onSubmit={(e)=>this.handleSubmit(e)} className="col s12">
            <div className="col s6">
                <p>Category List:</p>
                <select className="form-control fm" name="rbcm_role_id" 
                            onChange={this.handleInputChange} required>
                                <option value="0"> Select Role</option>
                                {
                                this.state.roles.map((r,key) => {
                                    return <option value={r.r_id}>{r.r_name}</option>
                                })
                            }
                            </select>
                    </div>

                <div className="col s2">
                <p>Status:</p>
                <select className="form-control fm" name="rbcm_status" 
                            onChange={this.handleInputChange} required>
                                <option value="0"> Select status</option>
                                <option value="1"> Active</option>
                                <option value="2"> InActive</option>      
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
                            <th>Category Name</th>
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
export default CategoryListRoleBased;