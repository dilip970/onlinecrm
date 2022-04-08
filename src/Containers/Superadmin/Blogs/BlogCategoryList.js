import React, { Component } from 'react';
import axios from 'axios';
import Navbar1 from '../Navbars/Navbar1';
import Navbar2 from '../Navbars/Navbar2';
import Globals from '../../../Utils/globals';
import CommonTableHeader from '../Headers/CommonHeader';

class BlogCategoryTable extends Component
{
    constructor(props) {
        super(props);
        this.state = {
        blogcategories : [],
         t_name:'',
         t_designation:'',
         t_description:'',
         t_status:'',
        };
    }
    componentDidMount()
    {
        window.scrollTo(0, 0);
    }
    
    changestatus = async(event) => {
        const data = event.target.value;
        const wbc_status = data.split(',')[0];
        const wbc_id = data.split(',')[1];

        if(window.confirm('Are you sure?')){
            return axios.patch(Globals.APIURL+'/change-blog-category-status/', {
                wbc_status : wbc_status,
                wbc_id : wbc_id,
                ubit_id : localStorage.getItem("superadminid"),
                ubit_token : localStorage.getItem("superadmintoken")
                
            }).then((responseData) => {
                if(responseData.status=="200"){
                    alert("Blog Category status updated successfully");
                    window.location.reload();

                }else{
                    alert("Something went Wrong...");
                }
            });
        }else{
            window.location.reload();
        }
    };
    handleInputChange = e => {
        this.setState({
          [e.target.name]: e.target.value,
        });
      };
    handleSubmit = e=>{
        e.preventDefault();
        
        const {wbc_status} = this.state;
        var formData ={
            wbc_status,
            ubit_id : localStorage.getItem("superadminid"),
            ubit_token : localStorage.getItem("superadmintoken")
          }
              return axios.post(Globals.APIURL+'/get-web-blog-categories/', { ...formData })
              .then((Res) => {
                let blogcategories = Res.data.data.web_blog_category_data;
                this.setState({
                    blogcategories : blogcategories
              })
            })    
      };
  


    render()
    {
        let list = this.state.blogcategories;
        if(this.state.blogcategories)
        {
        
            list = (
                <tbody>
                    {
                        this.state.blogcategories.map((b,key) => {
                            return <tr className="gradeU">
                            <td>{++key}</td>
                            <td>{b.wbc_name}</td>
                            <td><a href={`/superadmin/editblog-category/${b.wbc_id}`}><i class="material-icons dp48">mode_edit</i></a></td>

                            <td>
                                <select onChange={this.changestatus} name="wbc_status" class="form-control">
                                <option selected={b.wbc_status == 1 ? true : false} value={["1" , b.wbc_id]}>Active</option>
                                <option selected={b.wbc_status == 2 ? true : false} value={["2" , b.wbc_id]}>InActive</option>
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
            <CommonTableHeader pageTitle="Blogs Category List"/>
            <div id="page-inner">
            <div className="row">
            <div className="col-md-12">
                <div className="card">
                <div className="card-action">
                <form onSubmit={(e)=>this.handleSubmit(e)} className="col s12">
            <div className="col s6">
                <p>Blogs Category List:</p>
                <select className="form-control fm" name="wbc_status"  onChange={this.handleInputChange} >
                    <option value="0">Select Status</option>
                   <option value="1">Blogs Category Active</option>
                   <option value="2"> Blogs Category InActive</option>
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
                            <th>Name</th>
                            <th>Edit Category</th>
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
export default BlogCategoryTable;