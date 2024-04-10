import React, { Component, useState } from 'react';
import VehiclesService from '../services/VehiclesService';
import { Link } from 'react-router-dom';
import Notification from './Notification';


const CreateVehicleForm = () => {

    const initialFormData = {
        idVehicle: 0,
        idVehicle_Type: 0,
        registerDate: '',
        xcoord: 0.0,
        ycoord: 0.0,
        available: 1
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

      const response = await VehiclesService.insertVehicle(formData);
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
                       <h3 className='text-center'>Add Vehicle</h3>
                        <div className='card-body'>

                            <form id='form'>
                                <div className='form-group'>
                                    <label>Vehicle ID</label>
                                    <input placeholder='Vehicle ID' name = 'idVehicle' className='form-control'
                                     onChange= {handleChange} />
                                </div>

                                

                                 <div className='form-group'>
                                    <label>Vehicle Type</label>
                                    <input placeholder='Vehicle Type ID' name = 'idVehicle_Type' className='form-control'
                                     onChange= {handleChange} />
                                </div>

                                <div className='form-group'>
                                    <label>Register Date</label>
                                    <input placeholder='Register Date' name = 'registerDate' className='form-control'
                                     onChange= {handleChange} />
                                </div>
                                 <div className='form-group'>
                                    <label>Map Coordonates: X axis</label>
                                    <input placeholder='X coordonate' name = 'xcoord' className='form-control'
                                     onChange= {handleChange} />
                                </div>

                                 <div className='form-group'>
                                    <label>Map Coordonates: Y axis</label>
                                    <input placeholder='Y coordonate' name = 'ycoord' className='form-control'
                                     onChange= {handleChange} />
                                </div>

                                <button type="submit" className='btn btn-success' onClick={handleSubmit}>Submit</button>
                                <Link to = '/vehicles' className='btn btn-danger' style={{marginLeft: "10px"}}>Cancel</Link>
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