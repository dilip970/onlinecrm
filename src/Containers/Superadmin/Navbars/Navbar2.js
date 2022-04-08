import React, { Component } from 'react';
import Globals from '../../../Utils/globals';
class Navbar2 extends Component
{
    render()
    {
        return (
            <nav className="navbar-default navbar-side" role="navigation">
                <div className="sidebar-collapse">
                    <ul className="nav" id="main-menu">
                    <li>
                        <a className="active-menu waves-effect waves-dark" href={'/superadmin/dashboard/' + localStorage.getItem("superadminid")}><i className="fa fa-dashboard" /> Dashboard</a>
                    </li>

                    <li>
                        <a href="#" className="waves-effect waves-dark"><i className="fa fa-globe"></i> Locations<span class="fa arrow"></span></a>
                        <ul className="nav nav-second-level collapse">
                            <li>
                                <a href="/superadmin/countrieslist">Countries List</a>
                            </li>
                            <li>
                                <a href="/superadmin/stateslist">States List</a>
                            </li>
                            <li>
                                <a href="/superadmin/citieslist">Cities List</a>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <a href="#" className="waves-effect waves-dark"><i className="fa fa-book"></i> Categories<span class="fa arrow"></span></a>
                        <ul className="nav nav-second-level collapse">
                            <li>
                                <a href="/superadmin/addrole-basedcategory">Add Category</a>
                            </li>
                            <li>
                                <a href="/superadmin/categorylist-rolebased"> Category List</a>
                            </li>
                        </ul>
                    </li>
                    
                    <li>
                        <a href="#" className="waves-effect waves-dark"><i className="fa fa-user"></i> Doctors<span class="fa arrow"></span></a>
                        <ul className="nav nav-second-level collapse">
                            <li>
                                <a href="/superadmin/doctorslist">Doctors List</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#" className="waves-effect waves-dark"><i className="fa fa-plus-square"></i> Products<span class="fa arrow"></span></a>
                        <ul className="nav nav-second-level collapse">
                            
                            <li>
                                <a href="/superadmin/addproducts">Add Products</a>
                            </li>
                            <li>
                                <a href="/superadmin/medicine-list">Medicine List</a>
                            </li>
                            <li>
                                <a href="/superadmin/medicine-list">HealthCare Products List</a>
                            </li>

                        </ul>
                    </li>

                    <li>
                        <a href="#" className="waves-effect waves-dark"><i className="fa fa-plus-square"></i> Pharmacists<span class="fa arrow"></span></a>
                        <ul className="nav nav-second-level collapse">
                            
                            <li>
                                <a href="/superadmin/pharmacylist">Pharmacy List</a>
                            </li>
                            <li>
                                <a href="/superadmin/productslist">Products List</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#" className="waves-effect waves-dark"><i className="fa fa-flask"></i> Diagnostics <span class="fa arrow"></span></a>
                        <ul className="nav nav-second-level collapse">
                            
                            <li>
                                <a href="/superadmin/diagnosticslist">Diagnostics List</a>
                            </li>
                            <li>
                                <a href="/superadmin/labtestlist">Lab Test List</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="/superadmin/patientlist" className="waves-effect waves-dark"><i className="fa fa-users" /> Patient List</a>
                    </li>
                    <li>
                        <a href="#" className="waves-effect waves-dark"><i className="fa fa-tag"></i> Testimonials <span class="fa arrow"></span></a>
                        <ul className="nav nav-second-level collapse">
                            
                            <li>
                                <a href="/superadmin/add-testimonials">Add Testimonials</a>
                            </li>
                            <li>
                                <a href="/superadmin/testimonials-list">Testimonials List</a>
                            </li>
                        </ul>
                    </li>
    
                    <li>
                        <a href="#" className="waves-effect waves-dark"><i className="fa fa-cogs"></i> Blogs<span class="fa arrow"></span></a>
                        <ul className="nav nav-second-level collapse">
                            <li>
                                <a href="/superadmin/addblog-category">Add Blog Category</a>
                            </li>
                            <li>
                                <a href="/superadmin/blogcategory-list"> Blogs Category List</a>
                            </li>
                            <li>
                                <a href="/superadmin/addblog-information">Add Blog Information</a>
                            </li>
                            <li>
                                <a href="/superadmin/blog-information-list">Blog Information List</a>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <a href="/superadmin/change-password" className="waves-effect waves-dark"><i className="fa fa-gear fa-fw" /> Change Password</a>
                    </li>
                    <li>
                        <a href="#" onClick={(e) => Globals.superadminlogout(e)} className="waves-effect waves-dark"><i className="fa fa-power-off" /> Logout </a>
                    </li>
                    </ul>
                </div>
            </nav>
        );
    }
}
export default Navbar2;