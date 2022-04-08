import React, { Component } from 'react';
import axios from 'axios';
import Navbar1 from '../Navbars/Navbar1';
import Navbar2 from '../Navbars/Navbar2';
import EditSpecializationHeader from '../Headers/EditSpecializationHeader';
import Globals from '../../../Utils/globals';
class EditSpecialization extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            specialization: '',
            image : '',
            imagename : ''
        };
      }
    componentDidMount() {
        window.scrollTo(0, 0);
        return axios
          .get(Globals.APIURL+'/admin/editspecializations/'+this.props.match.params.id+'/',{
            headers: {
              Authorization: `Bearer ${localStorage.getItem('superadmintoken')}`,
            }
        })
          .then((res) => {
            var mydata = res.data[0];
            console.log(mydata.specialization);
            this.getBase64FromUrl(Globals.RAWURL+mydata.image).then((resD) => {
              this.setState({
                  image : resD,
                  specialization : mydata.specialization
              });
          }).catch((err) => {
              console.log(err);
          })
          })
          .catch(err => {
            console.error(err);
          });
    }
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
      handleFileRead = async (event) => {
        const file = event.target.files[0]
        const base64 = await this.convertBase64(file)
        this.setState({
            image : base64,
            imagename : event.target.files[0].name
        });
      }
      handleSubmit = e => {
        e.preventDefault();
        const { specialization, image, imagename } = this.state;
        var formData = {
          specialization,
            image,
            imagename
        };
        return axios
          .post(Globals.APIURL+'/admin/editspecializations/'+this.props.match.params.id+'/', { ...formData },{
            headers: {
              Authorization: `Bearer ${localStorage.getItem('superadmintoken')}`,
            }
        })
          .then((res) => {
            if(res.data.status=="200"){
                alert("Specialization Updated Successfully!!");
                window.location.href='/superadmin/specializationslist';
            }else{
                alert("Specialization Already Exists!!");
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
                <EditSpecializationHeader/>
            <div id="page-inner">
            <div className="row">
            <div className="col-lg-12">
                <div className="card">
                <div className="card-action">
                    Edit Specialization Form
                </div>
                <div className="card-content">
                    <form onSubmit={(e)=>this.handleSubmit(e)} className="col s12">
                    <div className="row">
                        <div className="input-field col s12">
                          <p>Enter Name:</p>
                        <input pattern="^[a-zA-z\s]+$" value={this.state.specialization} title="Input allows only Alphabets, Spaces.."  id="first_name" type="text" name="specialization" required onChange={this.handleInputChange}/>
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
export default EditSpecialization;