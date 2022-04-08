import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';
import Navbar1 from '../Navbars/Navbar1';
import Navbar2 from '../Navbars/Navbar2';
import Globals from '../../../Utils/globals';
import CommonTableHeader from '../Headers/CommonHeader';
class MedicineList extends Component
{
    constructor(props) {
        super(props);
        this.state = {
          products:[],
        };
    }

    componentDidMount()
    {

        return axios.get(Globals.APIURL+'/getmedicine/').then((productRes) => {
            let products = productRes.data.data.product;
            this.setState({
                products : products
            });
            window.$('#dataTables-example').DataTable();
        });
    }
    render()
    {
        let list = this.state.products;
        if(this.state.products)
        {
            list = (
                <tbody>
                    {
                        this.state.products.map((products,key) => {
                            return <tr className="gradeU">
                            <td>{++key}</td>
                            <td>{products.productID}</td>
                            <td>{products.tpp_name}</td>
                            <td>{products.composition}</td>
                            <td>{products.manufacturer}</td>
                            <td>{products.packaging}</td>
                            <td>{products.packing_type}</td>
                            <td>{products.tpp_price}</td>
                            <td><a href={`/superadmin/viewmedicine/${products.tpp_id}`}><i class="material-icons dp48">perm_identity</i></a></td>
                            
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
            <CommonTableHeader pageTitle="medicine List"/>
            <div id="page-inner">
            <div className="row">
            <div className="col-md-12">
                <div className="card">
                <div className="card-action">
                    Medicine List
                </div>
                <div className="card-content">
                    <div className="table-responsive">
                    <table className="table table-striped table-bordered table-hover" id="dataTables-example">
                        <thead>
                        <tr>
                            <th>S.No           </th>
                            <th>Product ID     </th>
                            <th>Product Name   </th>
                            <th>Composition    </th>
                            <th>Manufacturer   </th>
                            <th>Packaging      </th>
                            <th>Packing Type   </th>
                            <th>Price          </th>
                            <th>Usage          </th>
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

export default MedicineList;

