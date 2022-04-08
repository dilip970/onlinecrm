import React, { Component } from 'react';
class EmployeesTableHeader extends Component
{
    render()
    {
        return (
            <div className="header"> 
                <h1 className="page-header">
                    Specializations List
                </h1>
                <ol className="breadcrumb">
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Employees</a></li>
                    <li className="active">Data</li>
                </ol> 					
            </div>
        );
    }
}
export default EmployeesTableHeader;