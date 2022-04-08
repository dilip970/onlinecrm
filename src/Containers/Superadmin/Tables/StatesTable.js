import React, { Component } from 'react';
import axios from 'axios';
import Navbar1 from '../Navbars/Navbar1';
import Navbar2 from '../Navbars/Navbar2';
import Globals from '../../../Utils/globals';
import CommonTableHeader from '../Headers/CommonHeader';
class StatesTable extends Component
{
    constructor(props) {
        super(props);
        this.state = {
          states : [],
          countries:[],
          lsm_country_id:''
        };
    }
    componentDidMount()
    {

        return axios.get(Globals.APIURL+'/countries/').then((countriesRes) => {
            let countries = countriesRes.data.data.countries_data;
            this.setState({
                countries : countries
            });

        });
    }
    
    changeState = async(event) => {
        const lsm_country_id = event.target.value;
         this.setState({
            lsm_country_id : lsm_country_id
         });
            return axios.post(Globals.APIURL+'/states',{
                lsm_country_id:lsm_country_id
            }).then((statesData) => {
                  var states = statesData.data.data.states_data;
                    this.setState({
                        states : states
                    });

            });
    };

    render()
    {
        let list = this.state.states;
        if(this.state.states)
        {

            list = (
                <tbody>
                    {
                        this.state.states.map((state,key) => {
                            return <tr className="gradeU">
                            <td>{++key}</td>
                            <td>{state.lsm_name}</td>
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
                <CommonTableHeader pageTitle="State List"/>
            <div id="page-inner">
            <div className="row">
            <div className="col-md-12">
                <div className="card">
                <div className="card-action">
                    
                    <div className="col s3">
                <select className="form-control fm" name="rbcm_role_id" 
                            onChange={this.changeState} required>
                                <option value="0"> Select Country</option>
                                {
                                this.state.countries.map((c,key) => {
                                    return <option value={c.lcm_id}>{c.lcm_name}</option>
                                })
                            }
                            </select>
                    </div>
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
                            <th>State Name</th>                            
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
export default StatesTable;