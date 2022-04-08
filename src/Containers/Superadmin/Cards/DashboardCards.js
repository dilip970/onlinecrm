import React, { Component } from 'react';
class DashboardCards extends Component
{
    render()
    {
        return (
            <div className="dashboard-cards"> 
                    <div className="row">
                        <div className="col-xs-12 col-sm-6 col-md-3">
                        <div className="card horizontal cardIcon waves-effect waves-dark">
                            <div className="card-image red">
                            <i className="material-icons dp48">account_circle</i>
                            </div>
                            <div className="card-stacked red">
                            <div className="card-content">
                                <h3>{this.props.admincount}</h3> 
                            </div>
                            <div className="card-action">
                                <strong>Doctors</strong>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-3">
                        <div className="card horizontal cardIcon waves-effect waves-dark">
                            <div className="card-image orange">
                            <i className="material-icons dp48">assignment_ind</i>
                            </div>
                            <div className="card-stacked orange">
                            <div className="card-content">
                                <h3>{this.props.totalempcount}</h3> 
                            </div>
                            <div className="card-action">
                                <strong>Patients</strong>
                            </div>
                            </div>
                        </div> 
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-3">
                        <div className="card horizontal cardIcon waves-effect waves-dark">
                            <div className="card-image blue">
                            <i className="material-icons dp48">assignment_late</i>
                            </div>
                            <div className="card-stacked blue">
                            <div className="card-content">
                                <h3>{this.props.inactiveempcount}</h3> 
                            </div>
                            <div className="card-action">
                                <strong>Diagnostics</strong>
                            </div>
                            </div>
                        </div>  
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-3">
                        <div className="card horizontal cardIcon waves-effect waves-dark">
                            <div className="card-image green">
                            <i className="material-icons dp48">work</i>
                            </div>
                            <div className="card-stacked green">
                            <div className="card-content">
                                <h3>{this.props.activeempcount}</h3> 
                            </div>
                            <div className="card-action">
                                <strong>Specializations</strong>
                            </div>
                            </div>
                        </div>  
                        </div>

                        

                        
                    </div>
                </div>
        );
    }
}
export default DashboardCards;