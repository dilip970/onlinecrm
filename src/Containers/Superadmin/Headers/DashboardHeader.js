import React, { Component } from 'react';
class DashboardHeader extends Component
{
    render()
    {
        return (
            <div className="header"> 
                <h1 className="page-header">
                    Dashboard
                </h1>
                <ol className="breadcrumb">
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Dashboard</a></li>
                    <li className="active">Data</li>
                </ol> 					
            </div>
        );
    }
}
export default DashboardHeader;