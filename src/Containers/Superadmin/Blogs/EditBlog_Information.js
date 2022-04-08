import React, { Component } from 'react';
import axios from 'axios';
import Navbar1 from '../Navbars/Navbar1';
import Navbar2 from '../Navbars/Navbar2';
import Globals from '../../../Utils/globals';
import CommonTableHeader from '../Headers/CommonHeader';

class EditBlogInformation extends Component
{
  constructor(props){
    super(props);
    this.state = {
        blogdata : [],
        wbim_category_id:'',
        wbim_title:'',
        wbim_image :'',
        wbim_image1:'',
        wbim_image2:'',
        wbim_content:'',
        wbc_status:'',
        wbim_id:'',
    }
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    return axios
      .get(Globals.APIURL+'/get-blog-information-by-id/'+this.props.match.params.wbim_id,{
        ubit_id : localStorage.getItem("superadminid"),
        ubit_token : localStorage.getItem("superadmintoken")
    })
      .then((res) => {
        var blogdata = res.data.data.blog_info_data[0];
        
      this.setState({
        wbim_id : blogdata.wbim_id,
        wbim_title : blogdata.wbim_title,
        wbim_content : blogdata.wbim_content,
        wbim_category_id : blogdata.wbim_category_id,
        wbim_image : blogdata.wbim_image,
    })
      })
}

  handleInputChange = e =>{
      this.setState({
          [e.target.name] : e.target.value
      })
  }
  handleSubmit = e =>{
      e.preventDefault();
      
      const {wbim_category_id,wbim_title,wbim_image1,wbim_image2,wbim_content} = this.state;
      var formData ={
        wbim_category_id,
        wbim_title,
        wbim_image1,
        wbim_image2,
        wbim_content,
        ubit_id : localStorage.getItem("superadminid"),
        ubit_token : localStorage.getItem("superadmintoken")
        }
            return axios.patch(Globals.APIURL+'/update-blog-information-by-id', { ...formData })
            .then((res) => {
                console.log(res)
              if(res.data.status=="200"){
                  alert("category name added successfully.....");
                  window.location.reload();
              }
              else{
                alert("something went wrong...")
              }
            })
            .catch(err => {
              console.error(err);
              alert(err);
    
            });
    };

      
    render()
    {
        return (
            <div id="wrapper">
                <Navbar1 email={localStorage.getItem("superadminemail")}/>
                <Navbar2/>
            <div id="page-wrapper">
            <CommonTableHeader pageTitle="Edit Blog Information"/>
            <div id="page-inner">
            <div className="row">
            <div className="col-lg-12">
                <div className="card">
                <div className="card-action">
                    Edit Blog Information
                </div>
                <div className="card-content">
                    <form onSubmit={(e)=>this.handleSubmit(e)} className="col s12">
                    <div className="row" style={{marginBottom :"0px"}}>
                        <div className="input-field col s6">
                          <p>Blog Title:</p>
                        <input type="text" id="wbim_title" name="wbim_title" value={this.state.wbim_title}
                        onChange={this.handleInputChange} required />
                        </div>
                    </div>

                         <div className="row">
                         <div className="input-field col s12">
                          <p>Blog Content:</p>
                        <input type="text" id="wbim_content" name="wbim_content" value={this.state.wbim_content}  onChange={this.handleInputChange} required />
                        </div>
                        </div>

                    <div className="row">
                        <div className="input-field col s6">
                        <p> Image:</p>
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
export default EditBlogInformation;