import React, { Component } from 'react';
import axios from 'axios';
import Navbar1 from '../Navbars/Navbar1';
import Navbar2 from '../Navbars/Navbar2';
import Globals from '../../../Utils/globals';
import CommonTableHeader from '../Headers/CommonHeader';

class EditBlogCategory extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            wbc_id : '',
            wbc_name :'',
        };
      }
    componentDidMount() {
        window.scrollTo(0, 0);
        return axios
          .get(Globals.APIURL+'/get-blog-category-by-id/'+this.props.match.params.wbc_id,{
            ubit_id : localStorage.getItem("superadminid"),
            ubit_token : localStorage.getItem("superadmintoken")
        })
          .then((res) => {
            var blogcategories = res.data.data.blog_category_info[0];
            
          this.setState({
            wbc_id : blogcategories.wbc_id,
            wbc_name : blogcategories.wbc_name,
        })
          })
    }
    
    handleInputChange = e => {
        this.setState({
          [e.target.name]: e.target.value,
        });
      };


      handleSubmit = e => {
        e.preventDefault();
        const {wbc_id, wbc_name} = this.state;
        var formData = {
            wbc_id,
            wbc_name,
            ubit_id : localStorage.getItem("superadminid"),
            ubit_token : localStorage.getItem("superadmintoken")
  
        };
        console.log(formData);
        return axios
          .patch(Globals.APIURL+'/update-blog-category-by-id',{ ...formData },
          )
          .then((res) => {
              console.log(res)
            if(res.data.status=="200"){
                alert("Blog Category Updated Successfully!!");
                // window.location.href='/superadmin/testimonials-list';
            }else{
                alert("some thing went wrong!!");
            }
          })
          .catch(err => {
            console.error(err);
          });
      };
      render()
      {
          return (
            <div id="wrapper">
            <Navbar1 email={localStorage.getItem("superadminemail")}/>
            <Navbar2/>
        <div id="page-wrapper">
        <CommonTableHeader pageTitle="Edit Blog Category"/>
        <div id="page-inner">
        <div className="row">
        <div className="col-lg-12">
            <div className="card">
            <div className="card-action">
                Edit Blog Category Form
            </div>
            <div className="card-content">
                <form onSubmit={(e)=>this.handleSubmit(e)} className="col s12">
                <div className="row" style={{marginBottom :"0px"}}>
                    <div className="input-field col s6">
                      <p>Blog Category Name:</p>
                    <input type="text" id="wbc_name" name="wbc_name" value={this.state.wbc_name}
                    onChange={this.handleInputChange} required />
                    </div>
                </div>

                <div className="row">
                    <div className="input-field col s6">
                    <p>Blog Category Image:</p>
                    <input  type="file" name="document" accept="image/*" />
                    </div>
                    <br /><br />

                    </div>
                    <div className="row">

                <div className="input-field col s12">
                    <input id="submit" type="submit" />
                    </div>
                    </div>
                
                </form>
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
export default EditBlogCategory;