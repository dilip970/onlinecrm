import React, { Component } from 'react';
import axios from 'axios';
import Navbar1 from '../Navbars/Navbar1';
import Navbar2 from '../Navbars/Navbar2';
import Globals from '../../../Utils/globals';
import CommonTableHeader from '../Headers/CommonHeader';

class BlogInformationList extends Component
{
    constructor(props) {
        super(props);
        this.state = {
        blogcategories : [],
        bloglist:[],
        wbim_category_id:'',
        wbim_status:'',
        wbim_image:'',
        };
    }
    componentDidMount()
    {
        return axios
        .post(Globals.APIURL+'/get-web-blog-categories',{
            wbc_status:'1',
        }).then((categoriesRes) => {  
            let blogcategories = categoriesRes.data.data.web_blog_category_data;
            this.setState({
                blogcategories : blogcategories,
            });
        })        
        .catch(err => {
          console.error(err);
        });
    }
    
    changestatus = async(event) => {
        const data = event.target.value;
        const wbim_status = data.split(',')[0];
        const wbim_id = data.split(',')[1];

        if(window.confirm('Are you sure?')){
            return axios.patch(Globals.APIURL+'/change-blog-information-status/', {
                wbim_status : wbim_status,
                wbim_id : wbim_id,
                ubit_id : localStorage.getItem("superadminid"),
                ubit_token : localStorage.getItem("superadmintoken")
                
            }).then((responseData) => {
                if(responseData.status=="200"){
                    alert("Blog Information status updated successfully");
                    window.location.reload();

                }else{
                    alert("Something went Wrong...");
                }
            });
        }else{
            window.location.reload();
        }
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

    handleInputChange = e => {
        this.setState({
          [e.target.name]: e.target.value,
        });
      };
    handleSubmit = e=>{
        e.preventDefault();
        
        const {wbim_category_id,wbim_status} = this.state;
        var formData ={
            wbim_category_id,
            wbim_status,
            ubit_id : localStorage.getItem("superadminid"),
            ubit_token : localStorage.getItem("superadmintoken")
          }
              return axios.post(Globals.APIURL+'/blog-list', { ...formData })
              .then((Res) => {
                let bloglist = Res.data.data.blog_list;
                this.getBase64FromUrl(Globals.USERFILES+bloglist.wbim_image).then((resD1) => {
                    console.log(Globals.USERFILES+bloglist.wbim_image);
                    this.setState({
                      wbim_image : resD1,
                      bloglist : bloglist
                  });
                })
            })    
      };

    render()
    {
        let style = {
            width : "80px",
            height : "80px",
        }
        let list = this.state.bloglist;
        if(this.state.bloglist)
        {
        
            list = (
                <tbody>
                    {
                        this.state.bloglist.map((bloglist,key) => {
                            return <tr className="gradeU">
                            <td>{++key}</td>
                            <td>{bloglist.wbim_title}</td>
                            <td>{bloglist.wbim_content}</td>
                            <td>  <img style={style} src={Globals.BLOGFILES+bloglist.wbim_image} /></td>
                            <td><a href={`/superadmin/editblog-information/${bloglist.wbim_id}`}><i class="material-icons dp48">mode_edit</i></a></td>

                            <td>
                                <select onChange={this.changestatus} name="t_status" class="form-control">
                                <option selected={bloglist.wbim_status == 1 ? true : false} value={["1" , bloglist.wbim_id]}>Active</option>
                                <option selected={bloglist.wbim_status == 2 ? true : false} value={["2" , bloglist.wbim_id]}>InActive</option>
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
            <CommonTableHeader pageTitle="Blog Information List"/>
            <div id="page-inner">
            <div className="row">
            <div className="col-md-12">
                <div className="card">
                <div className="card-action">
                <form onSubmit={(e)=>this.handleSubmit(e)} className="col s12">
            <div className="col s6">
                <p>Blog Information List:</p>
                <select className="form-control fm" name="wbim_category_id" 
                            onChange={this.handleInputChange} required>
                                <option value="0"> Select Blog Category</option>
                               {
                                   this.state.blogcategories.map((bc,key)=>{
                                        return <option value={bc.wbc_id}>{bc.wbc_name}</option>
                                    })
                               }
                            </select>
                    </div>

                <div className="col s2">
                <p>Status:</p>
                <select className="form-control fm" name="wbim_status" 
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
                            <th>Title</th>
                            <th>Content</th>
                            <th>Image</th>
                            <th>Edit Blog Information</th>
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
export default BlogInformationList;