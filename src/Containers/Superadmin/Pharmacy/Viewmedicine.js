import React, { Component } from 'react';
import axios from 'axios';
import Navbar1 from '../Navbars/Navbar1';
import Navbar2 from '../Navbars/Navbar2';
import Globals from '../../../Utils/globals';
import CommonTableHeader from '../Headers/CommonHeader';

class ViewMedicine extends Component
{
  constructor(props){
    super(props);
    this.state = {
        about_salt :'',
        breastfeeding_info:'',
        category_id:'',
        children_info:'',
        composition:'',
        contra_indications:'',
        created_on:'',
        duration_action:'',
        effect_overdose:'',
        effects_missed_dosage:'',
        expert_advice:'',
        faqs:'',
        half_life:'',
        how_to_use:'',
        id:'',
        indications:'',
        interactions:'',
        manufacturer:'',
        mechanism_action:'',
        oldage_info:'',
        onset_action:'',
        packaging:'',
        packing_type:'',
        pharmacokinets:'',
        precautions:'',
        pregnancy_info:'',
        productID:'',
        product_alcohol_interaction:'',
        product_id:'',
        schedule:'',
        side_effects:'',
        storage_info:'',
        tpp_category_id:'',
        tpp_created_at:'',
        tpp_description:'',
        tpp_discount_percentage:'',
        tpp_id:'',
        tpp_image:'',
        tpp_name:'',
        tpp_pharmacy_id:'',
        tpp_price:'',
        tpp_role_id:'',
        tpp_status:'',
        tpp_updated_at:'',
        typical_dosage:'',
        usages:'',
    }
  }
  componentDidMount()
  {
    return axios.get(Globals.APIURL+'/product-details/'+this.props.match.params.tpp_id+'/').then((res) => {
        let medicine = res.data.data.product[0];
                  
        this.setState({
            about_salt         :   medicine.about_salt,
            breastfeeding_info :   medicine.breastfeeding_info ,
            category_id        :   medicine.category_id,
            children_info      :   medicine.children_info,
            composition        :   medicine.composition,
            contra_indications :   medicine.contra_indications,
            duration_action    :   medicine.duration_action,
            effect_overdose    :   medicine.effect_overdose,
        effects_missed_dosage  :   medicine.effects_missed_dosage,
            expert_advice      :   medicine.expert_advice,
            faqs               :   medicine.faqs,
            tpp_name           :   medicine.tpp_name,
            half_life          :   medicine.half_life,
            how_to_use         :   medicine.how_to_use,
            indications        :   medicine.indications,
            interactions       :   medicine.interactions,
            manufacturer       :   medicine.manufacturer,
            mechanism_action   :   medicine.mechanism_action,
            oldage_info        :   medicine.oldage_info,
            onset_action       :   medicine.onset_action,
            mechanism_action   :   medicine.mechanism_action,
            oldage_info        :   medicine.oldage_info,
            onset_action       :   medicine.onset_action,
            packaging          :   medicine.packaging,
            packing_type       :   medicine.packing_type,
            pharmacokinets     :   medicine.pharmacokinets,
            precautions        :   medicine.precautions,
            pregnancy_info     :   medicine.pregnancy_info,
            productID          :   medicine.productID,
   product_alcohol_interaction :   medicine.product_alcohol_interaction,
            product_id         :   medicine.product_id,
            schedule           :   medicine.schedule,
            side_effects       :   medicine.side_effects,
            storage_info       :   medicine.storage_info,
            tpp_category_id    :   medicine.tpp_category_id,
            tpp_created_at     :   medicine.tpp_created_at,
            tpp_description    :   medicine.tpp_description,
    tpp_discount_percentage    :   medicine.tpp_discount_percentage,
            tpp_id             :   medicine.tpp_id,
            tpp_image          :   medicine.tpp_image,
            tpp_pharmacy_id    :   medicine.tpp_pharmacy_id,
            tpp_price          :   medicine.tpp_price,
            tpp_role_id        :   medicine.tpp_role_id,
            tpp_status         :   medicine.tpp_status,
            typical_dosage     :   medicine.typical_dosage,
            usages             :   medicine.usages,
        })
      })
  }
  handleInputChange = e =>{
      this.setState({
          [e.target.name] : e.target.value
      })
  }
  handleSubmit = e=>{
      e.preventDefault();
      

    };

      
    render()
    {
        return (
            <div id="wrapper">
                <Navbar1 email={localStorage.getItem("superadminemail")}/>
                <Navbar2/>
            <div id="page-wrapper">
            <CommonTableHeader pageTitle="View Medicine"/>
            <div id="page-inner">
            <div className="row">
            <div className="col-lg-12">
                <div className="card">
                <div className="card-action">
                    View Medicine
                </div>
                <div className="card-content">
                    <form onSubmit={(e)=>this.handleSubmit(e)} className="col s12">
                    <div className="row" style={{marginBottom :"0px"}}>
                        <div className="input-field col s6">
                          <strong>Medicine Name:</strong>
                        <input type="text" id="" name="" value= {this.state.tpp_name} required />
                        </div>
                    
                        <div className="input-field col s6">
                          <strong>Indications:</strong>
                        <input type="text" id="" name="" value= {this.state.indications} required />
                        </div>

                        <div className="input-field col s6">
                          <strong>Interactions:</strong>
                        <input type="text" id="" name="" value= {this.state.interactions} required />
                        </div>

                        <div className="input-field col s6">
                          <strong>mechanism_action:</strong>
                        <input type="text" id="" name="" value= {this.state.mechanism_action} required />
                        </div>

                        <div className="input-field col s6">
                          <strong>manufacturer:</strong>
                        <input type="text" id="" name="" value= {this.state.manufacturer} required />
                        </div>

                        <div className="input-field col s6">
                          <strong>composition:</strong>
                        <input type="text" id="" name="" value= {this.state.composition} required />
                        </div>

                        <div className="input-field col s6">
                          <strong>schedule:</strong>
                        <input type="text" id="" name="" value= {this.state.schedule} required />
                        </div>

                        <div className="input-field col s6">
                          <strong>side_effects:</strong>
                        <input type="text" id="" name="" value= {this.state.side_effects} required />
                        </div>

                        <div className="input-field col s6">
                          <strong>storage_info:</strong>
                        <input type="text" id="" name="" value= {this.state.storage_info} required />
                        </div>

                        <div className="input-field col s6">
                          <strong>Description:</strong>
                        <input type="text" id="" name="" value= {this.state.tpp_description} required />
                        </div>

                        <div className="input-field col s6">
                          <strong>Discount:</strong>
                        <input type="text" id="" name="" value= {this.state.tpp_discount_percentage} required />
                        </div>


                        <div className="input-field col s6">
                          <strong>Price:</strong>
                        <input type="text" id="" name="" value= {this.state.tpp_price} required />
                        </div>

                        <div className="input-field col s6">
                          <strong>Usages:</strong>
                        <input type="text" id="" name="" value= {this.state.usages} required />
                        </div>
                    </div>

                        <div className='row'>
                        <div className="input-field col s6">
                          <strong>Image:</strong>
                        <input type="file" id="" name="" value= {this.state.tpp_image} required />
                        </div>

                        </div>

                        <div className='row'>
                        <div className="image_sec col s3">
                            <img src='' style={{width:'100px',height:'100px'}} alt=''/>
                        </div>

                        </div>



                   
                        <div className="row">

                    <div className="input-field col s12">
                        <input id="submit" type="submit" />
                        </div>
                        </div>
                    
                    </form>
                    <div className="clearBoth" />
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
export default ViewMedicine;