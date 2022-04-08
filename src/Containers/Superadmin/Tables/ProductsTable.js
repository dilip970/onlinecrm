import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';
import Navbar1 from '../Navbars/Navbar1';
import Navbar2 from '../Navbars/Navbar2';
import Globals from '../../../Utils/globals';
import CommonTableHeader from '../Headers/CommonHeader';
class ProductsTable extends Component
{
    constructor(props) {
        super(props);
        this.state = {
          categories : [],
          products:[],
          rbcm_role_id:'',
          tpp_category_id:'',
          tpp_status:'',
          rbcm_status :'',
          tpp_image:'',
        };
    }

    componentDidMount()
    {
        return axios
        .post(Globals.APIURL+'/get-role-based-categories',{
            rbcm_role_id: 3,
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
    handleInputChange = e =>{
        this.setState({
            [e.target.name] : e.target.value,
        });
    };
    handleSubmit = e=>{
        e.preventDefault();
        const {tpp_category_id,tpp_status} = this.state;
        var formData ={
            tpp_category_id,
            tpp_status,

          }
              return axios.post(Globals.APIURL+'/get-pharmacy-products-by-category-id', { ...formData })
              .then((productsData) => {
                var products = productsData.data.data.products_data;
                this.getBase64FromUrl(Globals.PHARMACYFILES+products.tpp_image).then((resD1) => {
                    console.log(Globals.PHARMACYFILES+products.tpp_image);
                    this.setState({
                    tpp_image : resD1,
                      products : products
                  });
                })
          });
      };
      changestatus = async(event) => {
        const data = event.target.value;
        const tpp_status = data.split(',')[0];
        const tpp_id = data.split(',')[1];

        if(window.confirm('Are you sure?')){
            return axios.patch(Globals.APIURL+'/change-pharmacy-product-status/', {
                tpp_status : tpp_status,
                tpp_id : tpp_id,
                ubit_id :localStorage.getItem("superadminid"),
                ubit_token: localStorage.getItem("superadmintoken")
            },

            ).then((responseData) => {
                if(responseData.status=="200"){
                    alert("Status updated Successfully...");
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
        let list = this.state.products;
        if(this.state.products)
        {
            list = (
                <tbody>
                    {
                        this.state.products.map((products,key) => {
                            return <tr className="gradeU">
                            <td>{++key}</td>
                            <td>{products.tpp_name}</td>
                            <td><img style={style} src={Globals.PHARMACYFILES+products.tpp_image} /></td>
                            <td>{products.tpp_price}</td>
                            <td>{products.ubit_establishment_name}</td>
                            <td><select  onChange={this.changestatus} name="status" class="form-control">
                                <option selected={products.tpp_status == 3 ? true : false} value={["3" , products.tpp_id]}>Admin Active</option>
                                <option selected={products.tpp_status == 4 ? true : false} value={["4" , products.tpp_id]}>Admin InActive</option>
                                <option disabled selected={products.tpp_status == 1 ? true : false} value={["1" , products.tpp_id]}>Pharmacist Active</option>
                                <option disabled selected={products.tpp_status == 2 ? true : false} value={["2" , products.tpp_id]}>Pharmacist InActive</option>
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
            <CommonTableHeader pageTitle="Products List"/>
            <div id="page-inner">
            <div className="row">
            <div className="col-md-12">
                <div className="card">
                <div className="card-action">
                <form onSubmit={(e)=>this.handleSubmit(e)} className="col s12">
            <div className="col s6">
                <p>Category List:</p>
                <select className="form-control fm" name="tpp_category_id" 
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
                <select className="form-control fm" name="tpp_status" 
                            onChange={this.handleInputChange} required>
                                <option value="0"> Select status</option>
                                <option value="3"> Admin Active</option>
                                <option value="4"> Admin InActive</option>
                                <option value="1"> Pharmacist Active</option>
                                <option value="2"> Pharmacist InActive</option>
                                      
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
                            <th>Image</th>
                            <th>Price</th>
                            <th>Pharmacy Name</th>
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

export default ProductsTable;