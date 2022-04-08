import React, { Component } from 'react';
import axios from 'axios';
import Navbar1 from '../Navbars/Navbar1';
import Navbar2 from '../Navbars/Navbar2';
import Globals from '../../../Utils/globals';
import CommonTableHeader from '../Headers/CommonHeader';

class AddProducts extends Component
{
    constructor(){
        super();
        this.state = {
            selectedFile:'',
            role_category_id:'',
            category_id:''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        this.setState({
            selectedFile: event.target.files[0],
          })
    }
    submit(){
        const data = new FormData() 
        data.append('file', this.state.selectedFile)
        const {category_id,role_category_id} = this.state;

        var dataa ={
            role_category_id:'3',
            category_id:"0",
        }
        console.log(this.state.selectedFile);

        axios.post(Globals.APIURL+'/upload-medicine-data', data,dataa)
        .then(res => { 
            console.log(res);
        }).catch(err=>{
            console.error(err);
        })

    }

    render()
    {
        return (
            <div id="wrapper">
                <Navbar1 email={localStorage.getItem("superadminemail")}/>
                <Navbar2/>
            <div id="page-wrapper">
            <CommonTableHeader pageTitle="Add Medicines"/>
            <div id="page-inner">
            <div className="row">
            <div className="col-lg-12">
                <div className="card">
                <div className="card-action">
                    Add Medicine Form
                </div>
                <div className="card-content">       

                <div className="row">
                        <div className="input-field col s4">
                        <p>select category:</p>
                        <select className="form-control fm" >
                           <option value="">medicines</option>
                           <option value=''>Healthcare</option>
                        </select>
                     </div>

                     <div className="input-field col s4">
                        <p>select sub category:</p>
                        <select className="form-control fm" >
                           <option value="">baby care</option>
                           <option value=''>hair care</option>
                        </select>
                     </div>

                </div>

                    <div className="row">
                        <div className="input-field col s4">
                        <p>Upload Excel File:</p>
                        <input type="file"  name="file" onChange={this.handleInputChange} />
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-field col s12">
                        <button type="submit" className="btn btn-dark" onClick={()=>this.submit()}>submit</button>
                   </div>
                    </div>

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
export default AddProducts;

