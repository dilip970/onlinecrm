import React, { Component } from 'react';
import axios from 'axios';
import Navbar1 from '../Navbars/Navbar1';
import Navbar2 from '../Navbars/Navbar2';
import EditSpecializationHeader from '../Headers/EditSpecializationHeader';
import Globals from '../../../Utils/globals';
import CommonTableHeader from '../Headers/CommonHeader';

class EditCategory extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            rbcm_id : '',
            rbcm_name : '',
            rbcm_role_id:'',
            ubit_status:''
        };
      }
    componentDidMount() {
        window.scrollTo(0, 0);
        return axios
          .get(Globals.APIURL+'/get-role-based-category-by-id/'+this.props.match.params.rbcm_id,{
            ubit_id : localStorage.getItem("superadminid"),
            ubit_token : localStorage.getItem("superadmintoken")
            

        })
          .then((res) => {
            var category = res.data.data.role_based_category_data[0]
            
          this.setState({
            rbcm_name : category.rbcm_name,
            rbcm_id : category.rbcm_id,
            rbcm_role_id: category.rbcm_role_id
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
        const { rbcm_role_id,rbcm_name,rbcm_id,ubit_status} = this.state;
        var formData = {
            rbcm_id,
            rbcm_role_id,
            rbcm_name,
            ubit_status,
            ubit_id : localStorage.getItem("superadminid"),
            ubit_token : localStorage.getItem("superadmintoken")
  
        };
        console.log(formData);
        return axios
          .patch(Globals.APIURL+'/update-role-based-category/',{ ...formData },
          // rbcm_role_id = this.props.match.params.rbcm_role_id
          )
          .then((res) => {
            if(res.data.status=="200"){
                alert("category Updated Successfully!!");
                // window.location.href='/superadmin/categorylist-rolebased';
            }else{
                alert("category Already Exists!!");
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
                <CommonTableHeader pageTitle ="Edit Category"/>
            <div id="page-inner">
            <div className="row">
            <div className="col-lg-12">
                <div className="card">
                <div className="card-action">
                    Edit category Form
                </div>
                <div className="card-content">
                    <form onSubmit={(e)=>this.handleSubmit(e)} className="col s12">
                    <div className="row">
                        <div className="input-field col s12">
                          <p>Enter Name:</p>
                        <input pattern="^[a-zA-z\s]+$" value={this.state.rbcm_name} title="Input allows only Alphabets, Spaces.."  id="first_name" type="text" name="rbcm_name" required onChange={this.handleInputChange}/>
                        </div>
                    
                        <div className="input-field col s12">
                        <input name="image" accept="image/*" onChange={this.handleFileRead} type="file"/>
                        </div>

                        <img id="image" style={{width: '100px', height:'100px'}} src={this.state.image} />
                        
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
export default EditCategory;