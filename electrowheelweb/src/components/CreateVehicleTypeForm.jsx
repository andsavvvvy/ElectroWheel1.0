import React, { Component, useState } from 'react';
import VehicleTypesService from '../services/VehicleTypesService';
import { Link } from 'react-router-dom';
import Notification from './Notification';


const CreateVehicleForm = () => {

    const initialFormData = {
        idVehicle_Type: 0,
        description_Vehicle: '',
        price_Per_Minute: 0.0,
       
    };
   
        const [formData, setFormData] = useState(initialFormData);

    const [showNotification, setShowNotification] = useState(false);

       
    const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

   const handleSubmit = async (event) => {
    event.preventDefault();
    try {

      const response = await VehicleTypesService.insertVehicleType(formData);
      console.log(response.data); 
      
      setFormData(initialFormData);
       setShowNotification(true);  
       document.getElementById('form').reset();

      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

        return (
            <div>

            <div className='container'>
                <div className='row'>

                    <div className='card col-md-6 offset-md-3 offset-md-3'>
                       <h3 className='text-center'>Add Vehicle Type</h3>
                        <div className='card-body'>

                            <form id='form'>
                                <div className='form-group'>
                                    <label>Vehicle Type ID</label>
                                    <input placeholder='Type ID' name = 'idVehicle_Type' className='form-control'
                                     onChange= {handleChange} />
                                </div>


                                <div className='form-group'>
                                    <label>Description</label>
                                    <input placeholder='Description' name = 'description_Vehicle' className='form-control'
                                     onChange= {handleChange} />
                                </div>
                                 <div className='form-group'>
                                    <label>Price per Minute</label>
                                    <input placeholder='Price' name = 'price_Per_Minute' className='form-control'
                                     onChange= {handleChange} />
                                </div>

                            

                                <button type="submit" className='btn btn-success' onClick={handleSubmit}>Submit</button>
                                <Link to = '/vehicletypes' className='btn btn-danger' style={{marginLeft: "10px"}}>Cancel</Link>
                            </form>
                             {showNotification && <Notification message={"Submit Succesful"} />}
                        </div>

                    </div>
                </div>
            </div>
                
            </div>
        );
    }

export default CreateVehicleForm;