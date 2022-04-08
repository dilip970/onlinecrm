import React, {Component} from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import SuperAdminLogin from './Containers/Superadmin/Login/Login';
import SuperAdminDashboard from './Containers/Superadmin/Dashboard/Dashboard';
import Globals from './Utils/globals';
import ChangePassword from './Containers/Superadmin/ChangePassword/ChangePassword';
import AddSpecialization from './Containers/Superadmin/Specializations/AddSpecialization';
import SpecializationsTable from './Containers/Superadmin/Tables/SpecializationsTable';
import CountriesTable from './Containers/Superadmin/Tables/CountriesTable';
import StatesTable from './Containers/Superadmin/Tables/StatesTable';
import CitiesTable from './Containers/Superadmin/Tables/CitiesTable';
import DoctorsTable from './Containers/Superadmin/Tables/DoctorsTable';
import ViewDoctor from './Containers/Superadmin/Doctors/ViewDoctor';
import EditSpecialization from './Containers/Superadmin/Specializations/EditSpecialization';
import PharmacyTable from './Containers/Superadmin/Tables/PharmacyTable';
import DiagnosticsTable from './Containers/Superadmin/Tables/DiagnosticsTable';
import LabTestTable from './Containers/Superadmin/Tables/LabTestTable';
import AddRoleBasedCategory from './Containers/Superadmin/Categories/AddRole_BasedCategory';
import CategoryListRoleBased from './Containers/Superadmin/Categories/CategoryList_RoleBaed';
import EditCategory from './Containers/Superadmin/Categories/EditCategory';
import PatientTable from './Containers/Superadmin/Tables/PatientTable';
import ProductsTable from './Containers/Superadmin/Tables/ProductsTable';
import ViewPharmacy from './Containers/Superadmin/Pharmacy/ViewPharmacy';
import ViewDiagnostics from './Containers/Superadmin/Diagnostics/ViewDiagnostics';
import AddTestimonials from './Containers/Superadmin/Testimonials/Add_Testimonials';
import TestimonialTable from './Containers/Superadmin/Testimonials/TestimonialsList';
import EditTestimonials from './Containers/Superadmin/Testimonials/EditTestimonials';
import AddBlogCategory from './Containers/Superadmin/Blogs/AddBlogCategory';
import BlogCategoryTable from './Containers/Superadmin/Blogs/BlogCategoryList';
import EditBlogCategory from './Containers/Superadmin/Blogs/EditBlogCategory';
import AddBlogInformation from './Containers/Superadmin/Blogs/AddBlog_Information';
import BlogInformationList from './Containers/Superadmin/Blogs/BlogInformation_List';
import EditBlogInformation from './Containers/Superadmin/Blogs/EditBlog_Information';
import Products from './Containers/Superadmin/Pharmacy/medicinelist';
// import AddProducts from './Containers/Superadmin/Pharmacy/Addproducts';
import AddProducts from './Containers/Superadmin/Pharmacy/Addproducts';
import MedicineList from './Containers/Superadmin/Pharmacy/medicinelist';
import ViewMedicine from './Containers/Superadmin/Pharmacy/Viewmedicine';

class App extends Component
{
  constructor(props) 
  {
    super(props);
  }
   render()
   {
     return (
      <BrowserRouter>
      <Route exact path="/superadmin/login" component={SuperAdminLogin} />
      { 
      (localStorage.getItem('superadminid')!=null || window.location.href==Globals.APIURL+'superadmin/login') ? 
          <Route exact path="/superadmin/dashboard/:superadminid" component={SuperAdminDashboard} /> : ''
      }
      { 
      (localStorage.getItem('superadminid')!=null || window.location.href==Globals.APIURL+'superadmin/login') ? 
          <Route exact path="/superadmin/change-password" component={ChangePassword} /> : ''
      }
      { 
      (localStorage.getItem('superadminid')!=null || window.location.href==Globals.APIURL+'superadmin/login') ? 
          <Route exact path="/superadmin/addspecialization" component={AddSpecialization} /> : ''
      }
      { 
      (localStorage.getItem('superadminid')!=null || window.location.href==Globals.APIURL+'superadmin/login') ? 
          <Route exact path="/superadmin/specializationslist" component={SpecializationsTable} /> : ''
      }

      { 
      (localStorage.getItem('superadminid')!=null || window.location.href==Globals.APIURL+'superadmin/login') ? 
          <Route exact path="/superadmin/countrieslist" component={CountriesTable} /> : ''
      }
      { 
      (localStorage.getItem('superadminid')!=null || window.location.href==Globals.APIURL+'superadmin/login') ? 
          <Route exact path="/superadmin/stateslist" component={StatesTable} /> : ''
      }
      { 
      (localStorage.getItem('superadminid')!=null || window.location.href==Globals.APIURL+'superadmin/login') ? 
          <Route exact path="/superadmin/citieslist" component={CitiesTable} /> : ''
      }
      { 
      (localStorage.getItem('superadminid')!=null || window.location.href==Globals.APIURL+'superadmin/login') ? 
          <Route exact path="/superadmin/doctorslist" component={DoctorsTable} /> : ''
      }
      { 
      (localStorage.getItem('superadminid')!=null || window.location.href==Globals.APIURL+'superadmin/login') ? 
          <Route exact path="/superadmin/viewdoctor/:ubit_id" component={ViewDoctor} /> : ''
      }
       { 
      (localStorage.getItem('superadminid')!=null || window.location.href==Globals.APIURL+'superadmin/login') ? 
          <Route exact path="/superadmin/viewpharmacy/:ubit_id" component={ViewPharmacy} /> : ''
      }
       { 
      (localStorage.getItem('superadminid')!=null || window.location.href==Globals.APIURL+'superadmin/login') ? 
          <Route exact path="/superadmin/viewdiagnostics/:ubit_id" component={ViewDiagnostics} /> : ''
      }
      { 
      (localStorage.getItem('superadminid')!=null || window.location.href==Globals.APIURL+'superadmin/login') ? 
          <Route exact path="/superadmin/editspecialization/:id" component={EditSpecialization} /> : ''
      }
        { 
      (localStorage.getItem('superadminid')!=null || window.location.href==Globals.APIURL+'superadmin/login') ? 
          <Route exact path="/superadmin/pharmacylist" component={PharmacyTable} /> : ''
      }
      { 
      (localStorage.getItem('superadminid')!=null || window.location.href==Globals.APIURL+'superadmin/login') ? 
          <Route exact path="/superadmin/diagnosticslist" component={DiagnosticsTable} /> : ''
      }
      { 
      (localStorage.getItem('superadminid')!=null || window.location.href==Globals.APIURL+'superadmin/login') ? 
          <Route exact path="/superadmin/labtestlist" component={LabTestTable} /> : ''
      }
      { 
      (localStorage.getItem('superadminid')!=null || window.location.href==Globals.APIURL+'superadmin/login') ? 
          <Route exact path="/superadmin/productslist" component={ProductsTable} /> : ''
      }
            { 
      (localStorage.getItem('superadminid')!=null || window.location.href==Globals.APIURL+'superadmin/login') ? 
          <Route exact path="/superadmin/addrole-basedcategory" component={AddRoleBasedCategory} /> : ''
      }

    { 
      (localStorage.getItem('superadminid')!=null || window.location.href==Globals.APIURL+'superadmin/login') ? 
          <Route exact path="/superadmin/categorylist-rolebased" component={CategoryListRoleBased} /> : ''
      }
            { 
      (localStorage.getItem('superadminid')!=null || window.location.href==Globals.APIURL+'superadmin/login') ? 
          <Route exact path="/superadmin/editcategory/:rbcm_id" component={EditCategory} /> : ''
      }
            { 
      (localStorage.getItem('superadminid')!=null || window.location.href==Globals.APIURL+'superadmin/login') ? 
          <Route exact path="/superadmin/patientlist" component={PatientTable} /> : ''
      }
    { 
      (localStorage.getItem('superadminid')!=null || window.location.href==Globals.APIURL+'superadmin/login') ? 
          <Route exact path="/superadmin/add-testimonials" component={AddTestimonials} /> : ''
      }
          { 
      (localStorage.getItem('superadminid')!=null || window.location.href==Globals.APIURL+'superadmin/login') ? 
          <Route exact path="/superadmin/testimonials-list" component={TestimonialTable} /> : ''
      }
       { 
      (localStorage.getItem('superadminid')!=null || window.location.href==Globals.APIURL+'superadmin/login') ? 
          <Route exact path="/superadmin/edittestimonials/:t_id" component={EditTestimonials} /> : ''
      }
        { 
      (localStorage.getItem('superadminid')!=null || window.location.href==Globals.APIURL+'superadmin/login') ? 
          <Route exact path="/superadmin/addblog-category" component={AddBlogCategory} /> : ''
      }
       { 
      (localStorage.getItem('superadminid')!=null || window.location.href==Globals.APIURL+'superadmin/login') ? 
          <Route exact path="/superadmin/blogcategory-list" component={BlogCategoryTable} /> : ''
      }
     { 
      (localStorage.getItem('superadminid')!=null || window.location.href==Globals.APIURL+'superadmin/login') ? 
          <Route exact path="/superadmin/editblog-category/:wbc_id" component={EditBlogCategory} /> : ''
      }
     { 
      (localStorage.getItem('superadminid')!=null || window.location.href==Globals.APIURL+'superadmin/login') ? 
          <Route exact path="/superadmin/addblog-information" component={AddBlogInformation} /> : ''
      }
                { 
      (localStorage.getItem('superadminid')!=null || window.location.href==Globals.APIURL+'superadmin/login') ? 
          <Route exact path="/superadmin/blog-information-list" component={BlogInformationList} /> : ''
      }
         { 
      (localStorage.getItem('superadminid')!=null || window.location.href==Globals.APIURL+'superadmin/login') ? 
          <Route exact path="/superadmin/editblog-information/:wbim_id" component={EditBlogInformation} /> : ''
      }
       { 
      (localStorage.getItem('superadminid')!=null || window.location.href==Globals.APIURL+'superadmin/login') ? 
          <Route exact path="/superadmin/medicine-list" component={MedicineList} /> : ''
      }
                     { 
      (localStorage.getItem('superadminid')!=null || window.location.href==Globals.APIURL+'superadmin/login') ? 
          <Route exact path="/superadmin/addproducts" component={AddProducts} /> : ''
      }
      { 
      (localStorage.getItem('superadminid')!=null || window.location.href==Globals.APIURL+'superadmin/login') ? 
          <Route exact path="/superadmin/viewmedicine/:tpp_id" component={ViewMedicine} /> : ''
      }

      
      </BrowserRouter>
     );
   }
}
export default App;
