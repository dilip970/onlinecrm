import React, { Component } from 'react';
class CommonTableHeader extends Component
{
    constructor(props){
        super(props);
        this.state = {
            pageTitle : ''
        }
    }
    componentDidMount()
    {
        this.setState({
            pageTitle : this.props.pageTitle
        })
    }
    render()
    {
        return (
            <div className="header"> 
                <h1 className="page-header">
                    {this.state.pageTitle}
                </h1>
                <ol className="breadcrumb">
                    <li><a href="#">Home</a></li>
                    <li className="active">{this.state.pageTitle}</li>
                    
                </ol> 					
            </div>
        );
    }
}
export default CommonTableHeader;