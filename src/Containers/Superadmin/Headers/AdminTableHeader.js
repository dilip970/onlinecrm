import React, { Component } from 'react';
class AdminTableHeader extends Component
{
    render()
    {
        return (
            <div className="header"> 
                <h1 className="page-header">
                    Admins List
                </h1>
                <ol className="breadcrumb">
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Admins List</a></li>
                    <li className="active">Data</li>
                </ol> 					
            </div>
        );
    }
}
export default AdminTableHeader;