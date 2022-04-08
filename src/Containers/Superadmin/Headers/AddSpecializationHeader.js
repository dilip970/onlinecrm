import React, { Component } from 'react';
class AddEmployeeHeader extends Component
{
    render()
    {
        return (
            <div className="header"> 
                <h1 className="page-header">
                    Add Specialization
                </h1>
                <ol className="breadcrumb">
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Add Specialization</a></li>
                    <li className="active">Form</li>
                </ol> 					
            </div>
        );
    }
}
export default AddEmployeeHeader;