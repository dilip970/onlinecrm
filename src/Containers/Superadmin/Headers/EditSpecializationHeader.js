import React, { Component } from 'react';
class EditSpecializationHeader extends Component
{
    render()
    {
        return (
            <div className="header"> 
                <h1 className="page-header">
                    Edit Specialization
                </h1>
                <ol className="breadcrumb">
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Edit Specialization</a></li>
                    <li className="active">Form</li>
                </ol> 					
            </div>
        );
    }
}
export default EditSpecializationHeader;