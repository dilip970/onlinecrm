import React, { Component } from 'react';
import axios from 'axios';
import Navbar1 from '../Navbars/Navbar1';
import Navbar2 from '../Navbars/Navbar2';
import Globals from '../../../Utils/globals';
import CommonTableHeader from '../Headers/CommonHeader';
class CountriesTable extends Component
{
    constructor(props) {
        super(props);
        this.state = {
          countries : []
        };
    }
    componentDidMount()
    {

        return axios.get(Globals.APIURL+'/countries/').then((countriesRes) => {
            let countries = countriesRes.data.data.countries_data;
            this.setState({
                countries : countries
            });
            window.$('#dataTables-example').DataTable();
        });
    }
    render()
    {
        let list = this.state.countries;
        if(this.state.countries)
        {
            list = (
                <tbody>
                    {
                        this.state.countries.map((country,key) => {
                            return <tr className="gradeU">
                            <td>{++key}</td>
                            <td>{country.lcm_name}</td>
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
                <CommonTableHeader pageTitle="Countries List"/>
            <div id="page-inner">
            <div className="row">
            <div className="col-md-12">
                <div className="card">
                <div className="card-action">
                    Countries List
                </div>
                <div className="card-content">
                    <div className="table-responsive">
                    <table className="table table-striped table-bordered table-hover" id="dataTables-example">
                        <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Name</th>
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
export default CountriesTable;