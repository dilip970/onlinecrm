import React, { Component } from 'react';
import axios from 'axios';
import Navbar1 from '../Navbars/Navbar1';
import Navbar2 from '../Navbars/Navbar2';
import Globals from '../../../Utils/globals';
import CommonTableHeader from '../Headers/CommonHeader';

class AddBlogInformation extends Component
{
  constructor(props){
    super(props);
    this.state = {
        blogcategories : [],
        wbim_category_id:'',
        wbim_title:'',
        wbim_image1:'',
        wbim_image2:'',
        wbim_content:'',
        wbc_status:'',
    }
  }
  componentDidMount()
  {
        return axios.post(Globals.APIURL+'/get-web-blog-categories',{
            wbc_status:'1',
        }).then((blogcategoriesRes) => {
            let blogcategories = blogcategoriesRes.data.data.web_blog_category_data;
            this.setState({
                blogcategories : blogcategories
            });
        });
  }
  handleInputChange = e =>{
      this.setState({
          [e.target.name] : e.target.value
      })
  }
  handleSubmit = e=>{
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
            return axios.post(Globals.APIURL+'/save-blog-information', { ...formData })
            .then((res) => {
                console.log(res)
              if(res.data.status=="200"){
                  alert("Blog Information added successfully.....");
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
    convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file)
          fileReader.onload = () => {
            resolve(fileReader.result);
          }
          fileReader.onerror = (error) => {
            reject(error);
          }
        })
      }

    handleFileRead1 = async (event) => {
        const file = event.target.files[0]
        const base64 = await this.convertBase64(file)
        this.setState({
            wbim_image2 : base64,
            wbim_image1 : event.target.files[0].name
        });
      }
      
    render()
    {
        return (
            <div id="wrapper">
                <Navbar1 email={localStorage.getItem("superadminemail")}/>
                <Navbar2/>
            <div id="page-wrapper">
            <CommonTableHeader pageTitle="Add Blog Information"/>
            <div id="page-inner">
            <div className="row">
            <div className="col-lg-12">
                <div className="card">
                <div className="card-action">
                    Add Blog Information
                </div>
                <div className="card-content">
                    <form onSubmit={(e)=>this.handleSubmit(e)} className="col s12">
                    <div className="row" style={{marginBottom :"0px"}}>
                        <div className="input-field col s6">
                          <p>Blog Title:</p>
                        <input type="text" id="wbim_title" name="wbim_title" 
                        onChange={this.handleInputChange} required />
                        </div>
                    
                        <div className="col s6">
                          <p>Blog Category:</p>
                            <select className="form-control fm" name="wbim_category_id" 
                            onChange={this.handleInputChange} required>
                                <option value="">Blog Categories</option>
                                {
                                this.state.blogcategories.map((bc,key) => {
                                    return <option value={bc.wbc_id}>{bc.wbc_name}</option>
                                })
                            }
                            </select>
                        </div>
                    </div>

                         <div className="row">
                         <div className="input-field col s12">
                          <p>Blog Content:</p>
                        <input type="text" id="wbim_content" name="wbim_content"  onChange={this.handleInputChange} required />
                        </div>
                        </div>

                    <div className="row">
                        <div className="input-field col s6">
                        <p> Image:</p>
                        <input  type="file" name="wbim_image1" accept="image/*" onChange={this.handleFileRead1}  required/>
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
export default AddBlogInformation;